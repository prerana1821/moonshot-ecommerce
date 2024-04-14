import { z } from "zod";
import { db } from "~/server/db";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const categoryRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(z.object({ email: z.string() }))
    .query(async ({ input }) => {
      const user = await db.user.findUnique({
        where: { email: input.email },
        include: {
          interests: {
            select: { id: true },
          },
        },
      });
      if (!user) {
        throw new Error("User not found");
      }

      const categories = await db.category.findMany();

      const categoriesWithInterestStatus = categories.map((category) => ({
        ...category,
        checked: user.interests.some((interest) => interest.id === category.id),
      }));

      return categoriesWithInterestStatus;
    }),

  markInterest: publicProcedure
    .input(z.object({ categoryId: z.number(), email: z.string() }))
    .mutation(async ({ input }) => {
      const { email, categoryId } = input;

      console.log(email, categoryId);

      const user = await db.user.findUnique({
        where: { email },
        include: {
          interests: { where: { id: categoryId }, select: { id: true } },
        },
      });
      if (!user) {
        throw new Error("User not found");
      }

      const isInterested = !!user?.interests?.find(
        (interest) => interest.id === categoryId,
      );

      if (isInterested) {
        await db.user.update({
          where: { id: user.id },
          data: { interests: { disconnect: { id: categoryId } } },
        });
      } else {
        await db.user.update({
          where: { id: user.id },
          data: { interests: { connect: { id: categoryId } } },
        });
      }
    }),
});
