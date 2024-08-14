import nodemailer from "nodemailer";

// Configure the transporter
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.BREVO_USER,
    pass: process.env.BREVO_PASSWORD,
  },
});

// Function to send an email
export const sendEmail = async (
  to: string,
  subject: string,
  text: string
): Promise<void> => {
  try {
    await transporter.sendMail({
      from: "sofiyyahabidoye@gmail.com",
      to,
      subject,
      text,
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

// Email Content
export const emailContent = (name: string) => {
    const subject = "Authentication Successful";
  const html = `
    <p>Hello ${name},</p>
    <p>We are pleased to inform you that your recent login attempt was successful.</p>
    <p>If you did not initiate this login, please contact our support team immediately at sofiyyah@gmail.com or +2348101695397.</p>
    <p>Thank you for using our service.</p>
    <p>Best regards,<br>Banking System Services</p>
  `;
  return { subject, html };
};