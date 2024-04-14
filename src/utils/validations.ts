import { z } from "zod";

export const loginInput = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const signupInput = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export const verifyOtpInput = z.object({
  pin: z.string(),
  email: z.string().email(),
  encryptedToken: z.string(),
});

export const getAllInput = z.object({ email: z.string().email() });

export const markInterestInput = z.object({
  categoryId: z.number(),
  email: z.string().email(),
});
