import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { compare, hash } from "bcryptjs";
import { SignJWT } from "jose";
import { db } from "~/server/db";
import { z } from "zod";
import Cryptr from "cryptr";
import * as nodemailer from "nodemailer";
import { generateToken, getJwtSecretKey } from "~/utils/auth";

const jwtExpires = 60 * 60 * 24 * 5;
const cryptr = new Cryptr(process.env.CRYPTR_KEY!);

const loginInput = z.object({
  email: z.string().email(),
  password: z.string(),
});

const signupInput = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

const verifyOtpInput = z.object({
  pin: z.string(),
  email: z.string().email(),
  encryptedToken: z.string(),
});

export const authRouter = createTRPCRouter({
  login: publicProcedure.input(loginInput).mutation(async ({ input }) => {
    const user = await db.user.findUnique({
      where: { email: input.email },
    });

    if (!user || !(await compare(input.password, user.password))) {
      throw new Error("Invalid email or password");
    }

    const token = await new SignJWT({
      id: user.id,
      email: user.email,
      name: user.name,
      password: user.password,
      isVerified: user.isVerified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime(`${jwtExpires}s`)
      .sign(getJwtSecretKey());

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        isVerified: user.isVerified,
      },
      token,
      success: true,
      message: "User login successfully",
    };
  }),

  signup: publicProcedure.input(signupInput).mutation(async ({ input }) => {
    const { name, email, password } = input;

    const existingUser = await db.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    const hashedPassword = await hash(password, 12);

    const newUser = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const verificationToken = generateToken();

    const encryptedToken = cryptr.encrypt(verificationToken);

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
      text: `Your verification token is: ${verificationToken}`,
    };

    await transporter.sendMail(mailOptions);

    return {
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        isVerified: newUser.isVerified,
      },
      token: encryptedToken,
      success: true,
      message: "User signed up successfully",
    };
  }),

  verifyOtp: publicProcedure
    .input(verifyOtpInput)
    .mutation(async ({ input }) => {
      const { pin, email, encryptedToken } = input;

      try {
        const decryptedToken = cryptr.decrypt(encryptedToken);

        if (pin !== decryptedToken) {
          throw new Error("Invalid OTP");
        }

        await db.user.update({
          where: {
            email,
          },
          data: {
            isVerified: true,
          },
        });

        return { message: "OTP Successfully Verified", success: true };
      } catch (error) {
        throw new Error("Internal Error");
      }
    }),

  getCurrentUser: publicProcedure
    .input(z.object({ email: z.string() }))
    .query(async ({ input }) => {
      try {
        const user = await db.user.findUnique({
          where: {
            email: input.email,
          },
          include: {
            interests: true,
          },
        });

        return {
          ...user,
          password: undefined,
        };
      } catch (error) {
        return null;
      }
    }),
});
