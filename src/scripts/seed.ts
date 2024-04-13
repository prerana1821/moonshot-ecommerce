import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
  try {
    for (let i = 0; i < 100; i++) {
      await db.category.create({
        data: {
          name: faker.commerce.department(),
        },
      });
    }

    console.log("Successfully added categories");
  } catch (error) {
    console.log("Error seeding the database categories", error);
  } finally {
    await db.$disconnect();
  }
}

main().catch((error) => {
  console.error("Unexpected error occured:", error);
});
