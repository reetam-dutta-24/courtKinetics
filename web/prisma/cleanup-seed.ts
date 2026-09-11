// Deletes ALL TrainingSessions (and cascading Rallies) for the given user.
// Use this to remove seed data before treating dashboard numbers as real.

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const email = process.argv[2];
  if (!email) {
    console.error("Usage: npx tsx prisma/cleanup-seed.ts <your-account-email>");
    process.exit(1);
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    console.error(`No user found with email ${email}`);
    process.exit(1);
  }

  const result = await prisma.trainingSession.deleteMany({ where: { userId: user.id } });
  console.log(`Deleted ${result.count} sessions (and their rallies via cascade).`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());