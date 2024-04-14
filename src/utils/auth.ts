import { SignJWT } from "jose";
import * as nodemailer from "nodemailer";
import { type UserI } from "~/utils/types";
import { JWT_EXPIRES } from "~/utils/constants";

export function generateToken() {
  const token = Math.floor(Math.random() * 90000000) + 10000000;
  return token.toString();
}

export function getJwtSecretKey() {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT Secret key is not defined.");
  }

  const enc: Uint8Array = new TextEncoder().encode(secret);
  return enc;
}

export const generateJwtToken = (user: UserI) => {
  return new SignJWT({
    id: user.id,
    email: user.email,
    name: user.name,
    isVerified: user.isVerified,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${JWT_EXPIRES}s`)
    .sign(getJwtSecretKey());
};

export const sendVerificationEmail = async (
  email: string,
  verificationToken: string,
) => {
  const transporter = nodemailer.createTransport({
    service: "SendinBlue",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
    secure: false,
  });

  const mailOptions = {
    from: process.env.MAIL_USER,
    to: email,
    subject: "Email Verification - Moonshot Ecommerce",
    text: `Hey, 
                Your verification token is: ${verificationToken} 
            Thanks,
            Prerana`,
  };

  await transporter.sendMail(mailOptions);
};
