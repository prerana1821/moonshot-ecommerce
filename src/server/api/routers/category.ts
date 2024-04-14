import { db } from "~/server/db";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { getAllInput, markInterestInput } from "~/utils/validations";

const findUserByEmail = async (email: string) => {
  return await db.user.findUnique({
    where: { email },
    include: { interests: true },
  });
};

export const categoryRouter = createTRPCRouter({
  getAll: publicProcedure.input(getAllInput).query(async ({ input }) => {
    const user = await findUserByEmail(input.email);
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
    .input(markInterestInput)
    .mutation(async ({ input }) => {
      const { email, categoryId } = input;

      const user = await findUserByEmail(email);
      if (!user) {
        throw new Error("User not found");
      }

      const isInterested = user.interests.some(
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
