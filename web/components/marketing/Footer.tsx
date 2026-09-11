import { GitBranch, Globe, Mail } from "lucide-react";

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

const FOOTER_LINKS: Record<string, FooterLink[]> = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Reviews", href: "#testimonials" },
    { label: "Sign In", href: "/api/auth/signin" },
  ],
  Research: [
    { label: "The Hypotheses", href: "#features" },
    { label: "Methodology", href: "#how-it-works" },
    { label: "GitHub Repository", href: "https://github.com/reetam-dutta-24/courtKinetics", external: true },
  ],
  Connect: [
    { label: "GitHub", href: "https://github.com/reetam-dutta-24", external: true },
    { label: "LinkedIn", href: "#", external: true },
    { label: "Email", href: "mailto:rdutta_be23@thapar.edu" },
  ],
};

export function Footer() {
  return (
    <footer className="footer-surface border-t border-border">
      <div className="page-container py-16">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          <div className="col-span-2 sm:col-span-1">
            <span className="text-heading-3 text-gradient-accent">CourtKinetics</span>
            <p className="text-small mt-3 max-w-xs">
              A hypothesis-driven pose-estimation system for badminton performance analysis.
              Built with MediaPipe, FastAPI, and Next.js.
            </p>
            <div className="flex gap-3 mt-5">
              <a
                href="https://github.com/reetam-dutta-24/courtKinetics"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center hover:bg-accent/15 hover:text-accent transition-colors"
              >
                <GitBranch size={16} />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center hover:bg-accent/15 hover:text-accent transition-colors"
              >
                <Globe size={16} />
              </a>
              <a
                href="mailto:rdutta_be23@thapar.edu"
                aria-label="Email"
                className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center hover:bg-accent/15 hover:text-accent transition-colors"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <span className="text-label">{heading}</span>
              <ul className="mt-4 flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="text-small hover:text-accent transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-small">
            © {new Date().getFullYear()} CourtKinetics. A hypothesis-driven research project, not a commercial product.
          </span>
          <span className="text-small">Built by Reetam Dutta</span>
        </div>
      </div>
    </footer>
  );
}