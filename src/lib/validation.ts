import { z } from "zod";

export const PLEDGE_AMOUNTS = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000] as const;

export type PledgeAmount = (typeof PLEDGE_AMOUNTS)[number];

// Loose on purpose: accepts UK and most international formats
// (optional leading +, digits, spaces, hyphens, parens) without
// forcing a specific country's dialing pattern.
const PHONE_REGEX = /^[+]?[0-9\s\-()]{7,20}$/;

export const pledgeInputSchema = z.object({
  amount: z
    .number({ error: "Choose one of the preset pledge amounts" })
    .refine((value) => (PLEDGE_AMOUNTS as readonly number[]).includes(value), {
      message: "Choose one of the preset pledge amounts",
    }),
  email: z.email({ message: "Enter a valid email address" }),
  phone: z
    .string()
    .trim()
    .min(1, { message: "Phone number is required" })
    .regex(PHONE_REGEX, { message: "Enter a valid phone number" }),
  licenseDetails: z
    .string()
    .max(200, { message: "Keep this under 200 characters" })
    .optional()
    .or(z.literal("")),
  consent: z.literal(true, {
    error: "You must agree to be contacted about this pledge",
  }),
});

export type PledgeInput = z.infer<typeof pledgeInputSchema>;
