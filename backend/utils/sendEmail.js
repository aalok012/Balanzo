import nodemailer from "nodemailer";
import ApiError from "./ApiError.js";

const requireEnv = (key) => {
  const value = process.env[key];
  if (!value) throw new ApiError(500, `Missing ${key} for email sending.`);
  return value;
};

export const sendEmail = async ({ to, subject, text, html }) => {
  const host = requireEnv("SMTP_HOST");
  const port = Number(requireEnv("SMTP_PORT"));
  const user = requireEnv("SMTP_USER");
  const pass = requireEnv("SMTP_PASS");
  const from = process.env.EMAIL_FROM || user;
  const secure = String(process.env.SMTP_SECURE || "").toLowerCase() === "true";

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });

  await transporter.sendMail({
    from,
    to,
    subject,
    text,
    html,
  });
};

