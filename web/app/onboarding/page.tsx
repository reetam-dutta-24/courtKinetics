import { OnboardingWizard } from "@/components/onboarding/OnboardingWizard";

export default function OnboardingPage() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:flex relative items-center justify-center p-12 overflow-hidden">
        <div className="glow-bg-radial" />
        <div className="relative z-10 max-w-md text-center">
          <span className="text-heading-3 text-gradient-accent block mb-4">CourtKinetics</span>
          <h2 className="text-heading-1">A few quick questions.</h2>
          <p className="text-body-muted mt-4">
            This context helps make sense of your metrics later — none of it is shared or used outside this app.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center p-6 sm:p-12">
        <OnboardingWizard />
      </div>
    </div>
  );
}