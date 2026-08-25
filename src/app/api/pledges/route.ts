import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { pledgeInputSchema } from "@/lib/validation";
import { sendPledgeConfirmation } from "@/lib/email";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Request body must be valid JSON" },
      { status: 400 }
    );
  }

  const parsed = pledgeInputSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", fieldErrors: z.flattenError(parsed.error).fieldErrors },
      { status: 400 }
    );
  }

  const { amount, email, phone, licenseDetails } = parsed.data;

  const pledge = await prisma.pledge.create({
    data: {
      amount,
      email,
      phone,
      licenseDetails: licenseDetails || null,
    },
  });

  await sendPledgeConfirmation({ email: pledge.email, amount: pledge.amount });

  return NextResponse.json({ pledge }, { status: 201 });
}
