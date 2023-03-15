import { VerificationToken } from "@prisma/client";
import sgMail from "@sendgrid/mail";

export default async function sendPasswordResetEmail(email: string, token: VerificationToken) {
  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

    // send email with token
    const msg = {
      to: email, // recipient email address
      from: "darylsrobot@gmail.com", // sender email address
      subject: "Reset Your Password", // email subject
      html:
      `<p>Hi,</p><p>We received a request to reset your password for your account, <strong>${email}</strong>. You can reset your password by clicking this button:</p><p><button><a href="${process.env.NEXTAUTH_URL}/reset-password?token=${token}">Reset Password</a></button>`, // email content
    };
    await sgMail.send(msg);
  } catch (err) {
    console.error(err);
  };
};
