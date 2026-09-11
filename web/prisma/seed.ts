// TEMPORARY seed script — inserts realistic dummy sessions/rallies for UI
// verification only. Run cleanup-seed.ts before treating any dashboard
// numbers as real. Never run this against a shared/production database.

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const MODULES = ["anticipation", "mistakes", "doubles", "miss_chances"];
const ERROR_TYPES = ["unforced", "forced", null];

function randomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function main() {
  const email = process.argv[2];
  if (!email) {
    console.error("Usage: npx tsx prisma/seed.ts <your-account-email>");
    process.exit(1);
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    console.error(`No user found with email ${email}`);
    process.exit(1);
  }

  console.log(`Seeding dummy data for ${email}...`);

  for (let s = 0; s < 8; s++) {
    const daysAgo = 56 - s * 7; // spread sessions across the last ~8 weeks
    const recordedAt = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);
    const focusModule = MODULES[s % MODULES.length];

    const trainingSession = await prisma.trainingSession.create({
      data: {
        userId: user.id,
        videoUrl: `https://example.com/seed-video-${s}.mp4`,
        sessionType: s % 3 === 0 ? "doubles" : "singles",
        focusModule,
        status: "ready",
        recordedAt,
      },
    });

    const rallyCount = randomBetween(6, 12);
    // Anticipation lag trends slightly downward over time, for a visible trend line
    const baseLag = 180 - s * 8;

    for (let r = 0; r < rallyCount; r++) {
      await prisma.rally.create({
        data: {
          trainingSessionId: trainingSession.id,
          startTimeSeconds: r * 12,
          endTimeSeconds: r * 12 + randomBetween(4, 10),
          outcome: Math.random() > 0.42 ? "won" : "lost",
          errorType: ERROR_TYPES[randomBetween(0, 2)],
          anticipationLagMs: baseLag + randomBetween(-25, 25),
        },
      });
    }
  }

  console.log("Done. 8 sessions with rallies created.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());