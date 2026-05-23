import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="min-h-[100dvh] flex font-[family-name:var(--font-libertinus-serif-display)] bg-[#0d0b08] text-[#ede5d9]">

      {/* ── Left brand panel ── */}
      <aside
        className="hidden lg:flex flex-col justify-between w-[42%] min-h-[100dvh] px-14 py-16 relative overflow-hidden bg-[#0d0b08] border-r border-[rgba(220,185,110,0.06)]"
        aria-label="Aurum branding"
      >
        <div className="pointer-events-none absolute -top-48 -left-48 w-[560px] h-[560px] rounded-full bg-[#dcb96e] opacity-[0.05] blur-[130px]" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-40 -right-24 w-[380px] h-[380px] rounded-full bg-[#a3853f] opacity-[0.03] blur-[110px]" aria-hidden="true" />

        <div className="relative z-10 flex items-center gap-3.5 aurum-panel-animate" style={{ animationDelay: "0ms" }}>
          <Image src="/icons/Aurum-logo.svg" alt="" width={38} height={40} aria-hidden="true" />
          <span className="font-[family-name:var(--font-libertinus-serif-display)] text-[17px] tracking-[4px] text-[#ede5d9] uppercase">Aurum</span>
        </div>

        <div className="relative z-10 aurum-panel-animate" style={{ animationDelay: "100ms" }}>
          <div className="aurum-eyebrow mb-8">Private Banking</div>
          <h1 className="text-[52px] font-normal leading-[1.07] text-[#ede5d9] mb-6">
            Where Wealth<br />Meets<br />Precision.
          </h1>
          <div className="w-10 h-px bg-gradient-to-r from-[#dcb96e] to-transparent mb-7" />
          <p className="text-[15px] leading-relaxed text-[#8c7d6e] max-w-[270px] tracking-wide">
            Institutional-grade private banking for those who demand more from their financial partner.
          </p>
        </div>

        <div className="relative z-10 space-y-5 aurum-panel-animate" style={{ animationDelay: "200ms" }}>
          {[
            "Bank-grade encryption & multi-layer security",
            "Real-time portfolio intelligence & analytics",
            "Dedicated private wealth advisor on call",
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
            <div className="aurum-eyebrow mb-5">Member Portal</div>
            <h2 className="text-[38px] font-normal leading-[1.1] text-[#ede5d9] mb-2">
              Welcome back.
            </h2>
            <p className="text-[15px] tracking-[0.3px] text-[#8a7a6a] mb-10">
              Sign in to your private account
            </p>
          </div>

          <form autoComplete="off" aria-label="Login form">
            <div className="space-y-3 aurum-form-animate" style={{ animationDelay: "140ms" }}>
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
                  <input aria-label="Password" autoComplete="current-password" className="aurum-input" placeholder="Password" type="password" />
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-3 mb-5 aurum-form-animate" style={{ animationDelay: "180ms" }}>
              <Link className="text-[13px] tracking-[0.4px] text-[#ca9340] hover:text-[#dcb96e] transition-colors duration-500" href="/forgot-password">
                Forgot password?
              </Link>
            </div>

            <div className="aurum-form-animate" style={{ animationDelay: "220ms" }}>
              <button className="aurum-cta-btn w-full" type="submit">
                <span className="tracking-[2.5px] uppercase text-[14px]">Sign In</span>
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
              Don&apos;t have an account?{" "}
              <Link className="text-[#ca9340] hover:text-[#dcb96e] underline underline-offset-2 transition-colors duration-500" href="/signup">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
