import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { compare, hash } from "bcryptjs";
import { db } from "~/server/db";
import Cryptr from "cryptr";
import {
  generateJwtToken,
  generateToken,
  sendVerificationEmail,
} from "~/utils/auth";
import { loginInput, signupInput, verifyOtpInput } from "~/utils/validations";

const cryptr = new Cryptr(process.env.CRYPTR_KEY!);

export const authRouter = createTRPCRouter({
  login: publicProcedure.input(loginInput).mutation(async ({ input }) => {
    const user = await db.user.findUnique({
      where: { email: input.email },
    });

    if (!user || !(await compare(input.password, user.password))) {
      throw new Error("Invalid email or password");
    }

    const token = generateJwtToken(user);

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

    await sendVerificationEmail(email, verificationToken);

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
});
