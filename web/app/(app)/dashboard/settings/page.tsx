import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import { ThemeSwitcher } from "@/components/ui/ThemeSwitcher";
import { DeleteAccountButton } from "@/components/settings/DeleteAccountButton";
import { updateProfile } from "./actions";
import { ProfileForm } from "@/components/settings/ProfileForm";

const prisma = new PrismaClient();

export default async function SettingsPage() {
  const session = await auth();
  const userId = session!.user!.id;

  const [user, profile] = await Promise.all([
    prisma.user.findUnique({ where: { id: userId } }),
    prisma.playerProfile.findUnique({ where: { userId } }),
  ]);
  if (!profile) redirect("/onboarding");

  return (
    <main className="section-stack max-w-2xl" aria-labelledby="settings-heading">
      <header>
        <h1 id="settings-heading" className="text-heading-1">Settings</h1>
        <p className="text-body-muted mt-1">Manage your profile, preferences, and account.</p>
      </header>

      <section aria-label="Profile details" className="card-base">
        <h2 className="text-heading-3 mb-6">Profile</h2>
        <ProfileForm
  name={user?.name ?? ""}
  yearsPlaying={profile.yearsPlaying}
  skillLevel={profile.skillLevel}
  playStyle={profile.playStyle}
  dominantHand={profile.dominantHand}
  racquet={profile.racquet ?? ""}
/>
      </section>

      <section aria-label="Theme preference" className="card-base">
        <h2 className="text-heading-3 mb-4">Theme</h2>
        <ThemeSwitcher />
      </section>

      <section aria-label="Danger zone" className="card-base border-red-500/20">
        <h2 className="text-heading-3 mb-4">Danger zone</h2>
        <DeleteAccountButton />
      </section>
    </main>
  );
}