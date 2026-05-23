import Image from "next/image";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <main className="min-h-[100dvh] flex font-[family-name:var(--font-libertinus-serif-display)] bg-[#0d0b08] text-[#ede5d9]">

      {/* ── Left brand panel ── */}
      <aside
        className="hidden lg:flex flex-col justify-between w-[42%] min-h-[100dvh] px-14 py-16 relative overflow-hidden bg-[#0d0b08] border-r border-[rgba(220,185,110,0.06)]"
        aria-label="Aurum branding"
      >
        <div className="pointer-events-none absolute -top-48 -left-48 w-[560px] h-[560px] rounded-full bg-[#dcb96e] opacity-[0.05] blur-[130px]" aria-hidden="true" />
        <div className="pointer-events-none absolute bottom-0 right-0 w-[420px] h-[420px] rounded-full bg-[#86642b] opacity-[0.03] blur-[120px]" aria-hidden="true" />

        <div className="relative z-10 flex items-center gap-3.5 aurum-panel-animate" style={{ animationDelay: "0ms" }}>
          <Image src="/icons/Aurum-logo.svg" alt="" width={38} height={40} aria-hidden="true" />
          <span className="font-[family-name:var(--font-libertinus-serif-display)] text-[17px] tracking-[4px] text-[#ede5d9] uppercase">Aurum</span>
        </div>

        <div className="relative z-10 aurum-panel-animate" style={{ animationDelay: "100ms" }}>
          <div className="aurum-eyebrow mb-8">Welcome to Aurum</div>
          <h1 className="text-[52px] font-normal leading-[1.07] text-[#ede5d9] mb-6">
            Begin Your<br />Private<br />Journey.
          </h1>
          <div className="w-10 h-px bg-gradient-to-r from-[#dcb96e] to-transparent mb-7" />
          <p className="text-[15px] leading-relaxed text-[#8c7d6e] max-w-[270px] tracking-wide">
            Open your private account in minutes. Join a community of discerning investors who trust Aurum.
          </p>
        </div>

        <div className="relative z-10 space-y-5 aurum-panel-animate" style={{ animationDelay: "200ms" }}>
          {[
            "Zero account setup fees, ever",
            "Full FDIC insured deposits up to $250k",
            "24/7 concierge banking support",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="mt-[7px] w-1 h-1 rounded-full bg-[#dcb96e] shrink-0 block" />
              <span className="text-[14px] tracking-wide text-[#7a6a58] leading-snug">{item}</span>
            </div>
          ))}
        </div>
      </aside>

      {/* ── Right form panel ── */}
      <div className="flex-1 flex items-center justify-center min-h-[100dvh] px-6 sm:px-12 py-24 lg:py-16 bg-[#14120e] relative overflow-hidden">
        <div className="pointer-events-none absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-[#a3853f] opacity-[0.025] blur-[120px]" aria-hidden="true" />

        <div className="lg:hidden absolute top-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5">
          <Image src="/icons/Aurum-logo.svg" alt="Aurum" width={44} height={46} />
          <span className="font-[family-name:var(--font-libertinus-serif-display)] text-[15px] tracking-[4px] text-[#ede5d9] uppercase">Aurum</span>
        </div>

        <div className="relative z-10 w-full max-w-[380px]">
          <div className="aurum-form-animate" style={{ animationDelay: "60ms" }}>
            <div className="aurum-eyebrow mb-5">Create Account</div>
            <h2 className="text-[38px] font-normal leading-[1.1] text-[#ede5d9] mb-2">
              Join Aurum.
            </h2>
            <p className="text-[15px] tracking-[0.3px] text-[#8a7a6a] mb-10">
              Set up your private account today
            </p>
          </div>

          <form autoComplete="off" aria-label="Sign up form">
            <div className="space-y-3 aurum-form-animate" style={{ animationDelay: "140ms" }}>
              <div className="aurum-input-shell">
                <div className="aurum-input-core">
                  <svg className="absolute left-4 text-[#dcb96e] opacity-50 shrink-0" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="8" r="5" />
                    <path d="M20 21a8 8 0 0 0-16 0" />
                  </svg>
                  <input aria-label="Full name" autoComplete="name" className="aurum-input" placeholder="Full name" type="text" />
                </div>
              </div>

              <div className="aurum-input-shell">
                <div className="aurum-input-core">
                  <svg className="absolute left-4 text-[#dcb96e] opacity-50 shrink-0" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <input aria-label="Email address" autoComplete="email" className="aurum-input" inputMode="email" placeholder="Email address" type="email" />
                </div>
              </div>

              <div className="aurum-input-shell">
                <div className="aurum-input-core">
                  <svg className="absolute left-4 text-[#dcb96e] opacity-50 shrink-0" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <input aria-label="Password" autoComplete="new-password" className="aurum-input" placeholder="Password" type="password" />
                </div>
              </div>

              <div className="aurum-input-shell">
                <div className="aurum-input-core">
                  <svg className="absolute left-4 text-[#dcb96e] opacity-50 shrink-0" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  <input aria-label="Confirm password" autoComplete="new-password" className="aurum-input" placeholder="Confirm password" type="password" />
                </div>
              </div>
            </div>

            <div className="mt-6 aurum-form-animate" style={{ animationDelay: "220ms" }}>
              <button className="aurum-cta-btn w-full" type="submit">
                <span className="tracking-[2.5px] uppercase text-[14px]">Create Account</span>
                <span className="aurum-cta-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </button>
            </div>
          </form>

          <div className="aurum-form-animate mt-10" style={{ animationDelay: "280ms" }}>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-[rgba(220,185,110,0.07)]" />
              <span className="text-[11px] tracking-[0.18em] text-[#5a4e40] uppercase">or</span>
              <div className="flex-1 h-px bg-[rgba(220,185,110,0.07)]" />
            </div>
            <p className="text-center text-[14px] tracking-[0.3px] text-[#7a6a58]">
              Already have an account?{" "}
              <Link className="text-[#ca9340] hover:text-[#dcb96e] underline underline-offset-2 transition-colors duration-500" href="/login">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
