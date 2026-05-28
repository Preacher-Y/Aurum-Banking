"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { OtpInput } from "@/components/auth/otp-input";

function maskEmail(email: string) {
  const atIndex = email.indexOf("@");
  if (atIndex <= 0) return email;
  const local = email.slice(0, atIndex);
  const domain = email.slice(atIndex + 1);
  return `${local[0]}${"*".repeat(Math.max(local.length - 2, 2))}${local.at(-1)}@${domain}`;
}

export default function LoginPage() {
  const router = useRouter();

  const [step, setStep] = useState<"credentials" | "otp">("credentials");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  async function handleCredentials(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? data?.message ?? "Sign in failed.");
      setUserId(data.userId);
      setStep("otp");
    } catch (err) {
      setError((err as Error)?.message ?? "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  }

  async function handleOtp(e: React.FormEvent) {
    e.preventDefault();
    if (otp.length < 6) return;
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, code: otp }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? data?.message ?? "Verification failed.");
      router.push(data.redirectTo ?? "/");
    } catch (err) {
      setError((err as Error)?.message ?? "An unexpected error occurred.");
      setOtp("");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-[100dvh] flex font-[family-name:var(--font-libertinus-serif-display)] bg-[#0d0b08] text-[#ede5d9]">

      {/* ── Left brand panel ── */}
      <aside
        className="hidden lg:flex flex-col justify-between w-[42%] min-h-[100dvh] px-14 py-16 relative overflow-hidden bg-[#0d0b08] border-r border-[rgba(220,185,110,0.06)] aurum-noise"
        aria-label="Aurum branding"
      >
        <div className="pointer-events-none absolute -top-48 -left-48 w-[560px] h-[560px] rounded-full bg-[#dcb96e] opacity-[0.05] blur-[130px]" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-40 -right-24 w-[380px] h-[380px] rounded-full bg-[#a3853f] opacity-[0.03] blur-[110px]" aria-hidden="true" />

        <div className="relative z-10 flex items-center gap-3.5 aurum-panel-animate" style={{ animationDelay: "0ms" }}>
          <Image src="/icons/Aurum-logo.svg" alt="" width={38} height={40} aria-hidden="true" />
          <span className="text-[17px] tracking-[4px] text-[#ede5d9] uppercase">Aurum</span>
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
      <div className="flex-1 flex items-center justify-center min-h-[100dvh] px-6 sm:px-12 py-24 lg:py-16 bg-[#14120e] relative overflow-hidden aurum-noise">
        <div className="pointer-events-none absolute -top-24 -right-24 w-[500px] h-[500px] rounded-full bg-[#a3853f] opacity-[0.05] blur-[130px]" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-32 -left-20 w-[420px] h-[420px] rounded-full bg-[#dcb96e] opacity-[0.04] blur-[120px]" aria-hidden="true" />

        <div className="lg:hidden absolute top-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5">
          <Image src="/icons/Aurum-logo.svg" alt="Aurum" width={44} height={46} />
          <span className="text-[15px] tracking-[4px] text-[#ede5d9] uppercase">Aurum</span>
        </div>

        {/* key forces re-animation when switching steps */}
        <div key={step} className="relative z-10 w-full max-w-[380px] aurum-form-animate" style={{ animationDelay: "60ms" }}>

          {step === "credentials" ? (
            <>
              <div className="mb-10">
                <div className="aurum-eyebrow mb-5">Member Portal</div>
                <h2 className="text-[38px] font-normal leading-[1.1] text-[#ede5d9] mb-2">Welcome back.</h2>
                <p className="text-[15px] tracking-[0.3px] text-[#8a7a6a]">Sign in to your private account</p>
              </div>

              <form onSubmit={handleCredentials} autoComplete="off" aria-label="Login form">
                <div className="space-y-3">
                  <div className="aurum-input-shell">
                    <div className="aurum-input-core">
                      <svg className="absolute left-4 text-[#dcb96e] opacity-50 shrink-0" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                      <input aria-label="Email address" autoComplete="email" className="aurum-input" inputMode="email" placeholder="Email address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                  </div>

                  <div className="aurum-input-shell">
                    <div className="aurum-input-core">
                      <svg className="absolute left-4 text-[#dcb96e] opacity-50 shrink-0" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                      <input aria-label="Password" autoComplete="current-password" className="aurum-input" placeholder="Password" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} style={{ paddingRight: "44px" }} required />
                      <button type="button" tabIndex={-1} onClick={() => setShowPassword((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#dcb96e] opacity-40 hover:opacity-70 transition-opacity duration-200" aria-label={showPassword ? "Hide password" : "Show password"}>
                        {showPassword ? (
                          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" />
                          </svg>
                        ) : (
                          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-3 mb-5">
                  <Link className="text-[13px] tracking-[0.4px] text-[#ca9340] hover:text-[#dcb96e] transition-colors duration-500" href="/forgot-password">
                    Forgot password?
                  </Link>
                </div>

                {error && <p className="text-[13px] text-[#e07b6a] tracking-wide mb-4 pl-1">{error}</p>}

                <button className="aurum-cta-btn w-full disabled:opacity-60 disabled:cursor-not-allowed" type="submit" disabled={loading}>
                  <span className="tracking-[2.5px] uppercase text-[14px]">{loading ? "Verifying…" : "Sign In"}</span>
                  <span className="aurum-cta-icon">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </span>
                </button>
              </form>

              <div className="mt-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-1 h-px bg-[rgba(220,185,110,0.07)]" />
                  <span className="text-[11px] tracking-[0.18em] text-[#5a4e40] uppercase">or</span>
                  <div className="flex-1 h-px bg-[rgba(220,185,110,0.07)]" />
                </div>
                <p className="text-center text-[14px] tracking-[0.3px] text-[#7a6a58]">
                  Don&apos;t have an account?{" "}
                  <Link className="text-[#ca9340] hover:text-[#dcb96e] underline underline-offset-2 transition-colors duration-500" href="/signup">Create account</Link>
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="mb-8">
                <div className="aurum-eyebrow mb-5">2-Step Verification</div>
                <h2 className="text-[38px] font-normal leading-[1.1] text-[#ede5d9] mb-3">
                  Check your<br />email.
                </h2>
                <p className="text-[15px] tracking-[0.3px] text-[#8a7a6a]">We sent a 6-digit code to</p>
                <p className="text-[15px] tracking-[0.3px] text-[#c8b882] mt-0.5">{maskEmail(email)}</p>
              </div>

              <form onSubmit={handleOtp} aria-label="OTP verification form">
                <OtpInput value={otp} onChange={setOtp} disabled={loading} />

                {error && <p className="text-[13px] text-[#e07b6a] tracking-wide mt-4 pl-1">{error}</p>}

                <button className="aurum-cta-btn w-full mt-6 disabled:opacity-60 disabled:cursor-not-allowed" type="submit" disabled={loading || otp.length < 6}>
                  <span className="tracking-[2.5px] uppercase text-[14px]">{loading ? "Verifying…" : "Confirm Code"}</span>
                  <span className="aurum-cta-icon">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </span>
                </button>
              </form>

              <button type="button" onClick={() => { setStep("credentials"); setOtp(""); setError(null); }} className="w-full flex items-center justify-center gap-2 mt-6 py-3 text-[13px] tracking-[0.4px] text-[#6a5a4a] hover:text-[#8a7a6a] transition-colors duration-300">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
                Back to sign in
              </button>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
