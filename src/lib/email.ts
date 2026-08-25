import { Resend } from "resend";

const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "Our Mission";
const from = process.env.EMAIL_FROM ?? "Pledges <pledges@example.com>";

export async function sendPledgeConfirmation(pledge: {
  email: string;
  amount: number;
}) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.log(
      `[email] RESEND_API_KEY not set, skipping confirmation email to ${pledge.email} (£${pledge.amount})`
    );
    return;
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from,
      to: pledge.email,
      subject: `Thank you for your pledge of £${pledge.amount}`,
      html: `
        <p>Thank you for pledging <strong>£${pledge.amount}</strong> to ${siteName}.</p>
        <p>We'll be in touch about next steps. If you have any questions in the meantime, just reply to this email.</p>
      `,
    });
  } catch (error) {
    // Email delivery failing should never block a successful pledge submission.
    console.error("[email] Failed to send pledge confirmation:", error);
  }
}
