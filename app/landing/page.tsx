import Image from "next/image";
import Link from "next/link";

const FEATURES = [
  {
    tag: "Security",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Fortress-Grade Protection",
    body: "Military-grade AES-256 encryption, biometric authentication, and real-time fraud monitoring protect every transaction, every account, every moment.",
    tags: ["AES-256", "Biometric Auth", "Real-time Monitoring", "Zero-trust"],
    large: true,
  },
  {
    tag: "Analytics",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: "Intelligent Portfolio Insights",
    body: "Real-time analytics keep you fully informed of every movement in your portfolio.",
    large: false,
  },
  {
    tag: "Advisory",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="8" r="5" />
        <path d="M20 21a8 8 0 0 0-16 0" />
      </svg>
    ),
    title: "Dedicated Private Advisory",
    body: "Your personal wealth advisor, available 24/7 — one point of contact for every financial decision.",
    large: false,
  },
];

const STATS = [
  { value: "$2B+", label: "Assets under management" },
  { value: "50K+", label: "Private clients worldwide" },
  { value: "99.9%", label: "Platform availability" },
  { value: "24/7", label: "Expert support" },
];

const STEPS = [
  {
    number: "01",
    title: "Create your account",
    body: "Complete our secure digital onboarding in under 5 minutes. No paperwork, no branch visits required.",
  },
  {
    number: "02",
    title: "Fund & connect",
    body: "Link your existing accounts, transfer assets, or make an initial deposit to activate your full suite of services.",
  },
  {
    number: "03",
    title: "Grow & manage",
    body: "Access private banking analytics, advisory support, and wealth tools from the very first day.",
  },
];

export default function HomePage() {
  return (
    <div className="bg-[#0d0b08] text-[#ede5d9] overflow-x-hidden">

      {/* ── Floating nav ───────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-5 px-4 pointer-events-none">
        <nav className="pointer-events-auto flex items-center gap-6 sm:gap-8 px-4 sm:px-5 py-2.5 rounded-full bg-[#14120e]/90 backdrop-blur-xl border border-[rgba(220,185,110,0.1)] shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <Image src="/icons/Aurum-logo.svg" alt="Aurum" width={22} height={23} />
            <span className="font-[family-name:var(--font-libertinus-serif-display)] text-[14px] tracking-[3.5px] text-[#ede5d9] uppercase">Aurum</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {[["#features", "Features"], ["#security", "Security"], ["#how-it-works", "How It Works"]].map(([href, label]) => (
              <a key={label} href={href} className="text-[13px] text-[#7a6a58] hover:text-[#c8b882] transition-colors duration-300">
                {label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link href="/login" className="hidden sm:block text-[13px] text-[#7a6a58] hover:text-[#ede5d9] transition-colors duration-300">
              Sign In
            </Link>
            <Link
              href="/signup"
              className="flex items-center gap-2 pl-4 pr-1.5 py-1.5 rounded-full bg-gradient-to-r from-[#a3853f] via-[#dcb96e] to-[#86642b] text-[#120e09] text-[12px] tracking-[1.5px] uppercase font-[family-name:var(--font-libertinus-serif-display)] transition-all duration-500 hover:brightness-110 active:scale-[0.97]"
            >
              Open Account
              <span className="w-7 h-7 rounded-full bg-[rgba(18,14,9,0.18)] flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          </div>
        </nav>
      </header>

      {/* ── Hero ───────────────────────────────────── */}
      <section className="relative min-h-[100dvh] flex flex-col items-center justify-center px-6 pt-36 pb-24 text-center">
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[560px] rounded-full bg-[#dcb96e] opacity-[0.04] blur-[160px]" aria-hidden="true" />
        <div className="pointer-events-none absolute bottom-0 left-0 w-[500px] h-[400px] rounded-full bg-[#a3853f] opacity-[0.03] blur-[130px]" aria-hidden="true" />
        <div className="pointer-events-none absolute bottom-0 right-0 w-[400px] h-[360px] rounded-full bg-[#86642b] opacity-[0.025] blur-[120px]" aria-hidden="true" />

        <div className="relative z-10 aurum-form-animate" style={{ animationDelay: "0ms" }}>
          <div className="aurum-eyebrow mx-auto mb-10">The Gold Standard in Private Banking</div>
        </div>

        <h1
          className="relative z-10 font-[family-name:var(--font-libertinus-serif-display)] text-[52px] sm:text-[68px] lg:text-[92px] font-normal leading-[1.04] text-[#ede5d9] max-w-[960px] mb-8 aurum-form-animate"
          style={{ animationDelay: "80ms" }}
        >
          Private Wealth,<br />Crafted to<br />Perfection.
        </h1>

        <p
          className="relative z-10 text-[16px] sm:text-[17px] leading-relaxed text-[#8c7d6e] max-w-[500px] mb-12 aurum-form-animate"
          style={{ animationDelay: "160ms" }}
        >
          Institutional-grade private banking for those who demand precision, security, and exceptional service in every interaction.
        </p>

        <div
          className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4 mb-14 aurum-form-animate"
          style={{ animationDelay: "230ms" }}
        >
          <Link
            href="/signup"
            className="aurum-cta-btn font-[family-name:var(--font-libertinus-serif-display)]"
            style={{ minWidth: "220px" }}
          >
            <span className="tracking-[2.5px] uppercase text-[13px]">Open Account</span>
            <span className="aurum-cta-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </Link>
          <Link
            href="/login"
            className="text-[14px] tracking-[0.4px] text-[#7a6a58] hover:text-[#c8b882] transition-colors duration-300 underline underline-offset-2"
          >
            Sign in to existing account
          </Link>
        </div>

        <div
          className="relative z-10 flex flex-wrap items-center justify-center gap-2.5 aurum-form-animate"
          style={{ animationDelay: "310ms" }}
        >
          {["FDIC Insured", "AES-256 Encrypted", "SOC 2 Certified", "24/7 Support"].map((badge) => (
            <span
              key={badge}
              className="px-3 py-1.5 rounded-full border border-[rgba(220,185,110,0.12)] text-[11.5px] tracking-[0.5px] text-[#5a4e40]"
            >
              {badge}
            </span>
          ))}
        </div>

        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 aurum-form-animate"
          style={{ animationDelay: "420ms" }}
          aria-hidden="true"
        >
          <div className="w-px h-14 bg-gradient-to-b from-[rgba(220,185,110,0.35)] to-transparent mx-auto" />
        </div>
      </section>

      {/* ── Features ───────────────────────────────── */}
      <section id="features" className="px-5 sm:px-8 lg:px-16 py-28">
        <div className="max-w-[620px] mb-16">
          <div className="aurum-eyebrow mb-6">Our Services</div>
          <h2 className="font-[family-name:var(--font-libertinus-serif-display)] text-[36px] lg:text-[54px] font-normal leading-[1.07] text-[#ede5d9]">
            Banking designed for those<br className="hidden lg:block" /> who expect more.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-[rgba(220,185,110,0.08)] border border-[rgba(220,185,110,0.08)] rounded-2xl overflow-hidden">
          {/* Primary feature — large, spans 2 rows on desktop */}
          <div className="lg:row-span-2 bg-[#0d0b08] p-10 lg:p-14 flex flex-col justify-between gap-10">
            <div>
              <div className="w-11 h-11 mb-8 flex items-center justify-center rounded-xl border border-[rgba(220,185,110,0.16)] bg-[rgba(220,185,110,0.05)] text-[#dcb96e]">
                {FEATURES[0].icon}
              </div>
              <div className="aurum-eyebrow mb-5">{FEATURES[0].tag}</div>
              <h3 className="font-[family-name:var(--font-libertinus-serif-display)] text-[30px] lg:text-[38px] font-normal leading-[1.12] text-[#ede5d9] mt-2 mb-5">
                {FEATURES[0].title}
              </h3>
              <p className="text-[15px] leading-relaxed text-[#7a6a58] max-w-[380px]">
                {FEATURES[0].body}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {FEATURES[0].tags!.map((t) => (
                <span key={t} className="px-3 py-1 rounded-full border border-[rgba(220,185,110,0.12)] text-[12px] text-[#5a4e40] tracking-wide">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Feature 2 */}
          <div className="bg-[#0d0b08] p-10 flex flex-col gap-5 border-b border-b-[rgba(220,185,110,0.08)]">
            <div className="w-11 h-11 flex items-center justify-center rounded-xl border border-[rgba(220,185,110,0.16)] bg-[rgba(220,185,110,0.05)] text-[#dcb96e]">
              {FEATURES[1].icon}
            </div>
            <div>
              <div className="aurum-eyebrow mb-4">{FEATURES[1].tag}</div>
              <h3 className="font-[family-name:var(--font-libertinus-serif-display)] text-[24px] font-normal leading-[1.2] text-[#ede5d9] mt-2 mb-3">
                {FEATURES[1].title}
              </h3>
              <p className="text-[14px] leading-relaxed text-[#7a6a58]">{FEATURES[1].body}</p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="bg-[#0d0b08] p-10 flex flex-col gap-5">
            <div className="w-11 h-11 flex items-center justify-center rounded-xl border border-[rgba(220,185,110,0.16)] bg-[rgba(220,185,110,0.05)] text-[#dcb96e]">
              {FEATURES[2].icon}
            </div>
            <div>
              <div className="aurum-eyebrow mb-4">{FEATURES[2].tag}</div>
              <h3 className="font-[family-name:var(--font-libertinus-serif-display)] text-[24px] font-normal leading-[1.2] text-[#ede5d9] mt-2 mb-3">
                {FEATURES[2].title}
              </h3>
              <p className="text-[14px] leading-relaxed text-[#7a6a58]">{FEATURES[2].body}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats strip ────────────────────────────── */}
      <div id="security" className="border-y border-[rgba(220,185,110,0.07)] bg-[#14120e]">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-[rgba(220,185,110,0.07)]">
          {STATS.map((stat) => (
            <div key={stat.label} className="px-8 py-14 text-center">
              <div className="font-[family-name:var(--font-libertinus-serif-display)] text-[46px] lg:text-[56px] font-normal text-[#dcb96e] leading-none mb-3">
                {stat.value}
              </div>
              <div className="text-[13px] tracking-wide text-[#5a4e40]">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── How it works ───────────────────────────── */}
      <section id="how-it-works" className="px-5 sm:px-8 lg:px-16 py-28">
        <div className="max-w-[520px] mb-16">
          <div className="aurum-eyebrow mb-6">Get Started</div>
          <h2 className="font-[family-name:var(--font-libertinus-serif-display)] text-[36px] lg:text-[54px] font-normal leading-[1.07] text-[#ede5d9]">
            Open your account<br className="hidden lg:block" /> in three steps.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-[rgba(220,185,110,0.08)] border border-[rgba(220,185,110,0.08)] rounded-2xl overflow-hidden">
          {STEPS.map((step) => (
            <div key={step.number} className="bg-[#0d0b08] p-10 lg:p-12">
              <div className="font-[family-name:var(--font-libertinus-serif-display)] text-[60px] font-normal text-[rgba(220,185,110,0.1)] leading-none mb-8 select-none">
                {step.number}
              </div>
              <h3 className="font-[family-name:var(--font-libertinus-serif-display)] text-[22px] font-normal leading-[1.25] text-[#ede5d9] mb-4">
                {step.title}
              </h3>
              <p className="text-[14px] leading-relaxed text-[#7a6a58]">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA section ────────────────────────────── */}
      <section className="relative px-6 py-36 text-center overflow-hidden bg-[#14120e] border-y border-[rgba(220,185,110,0.06)]">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
          <div className="w-[700px] h-[500px] rounded-full bg-[#dcb96e] opacity-[0.04] blur-[140px]" />
        </div>

        <div className="relative z-10 max-w-[580px] mx-auto">
          <div className="aurum-eyebrow mx-auto mb-8">Begin Today</div>
          <h2 className="font-[family-name:var(--font-libertinus-serif-display)] text-[42px] lg:text-[64px] font-normal leading-[1.06] text-[#ede5d9] mb-6">
            Begin your private<br />journey today.
          </h2>
          <p className="text-[16px] leading-relaxed text-[#8c7d6e] mb-14 max-w-[420px] mx-auto">
            Join thousands of discerning clients who trust Aurum with their wealth and financial future.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link
              href="/signup"
              className="aurum-cta-btn font-[family-name:var(--font-libertinus-serif-display)]"
              style={{ minWidth: "240px" }}
            >
              <span className="tracking-[2.5px] uppercase text-[13px]">Open Your Account</span>
              <span className="aurum-cta-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
            <Link
              href="/login"
              className="text-[14px] tracking-[0.4px] text-[#6a5a4a] hover:text-[#8a7a6a] transition-colors duration-300"
            >
              Already a member? Sign in
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────── */}
      <footer className="px-5 sm:px-8 lg:px-16 pt-16 pb-10 bg-[#0d0b08]">
        <div className="flex flex-col lg:flex-row justify-between gap-12 mb-14">
          <div className="flex flex-col gap-5 max-w-[300px]">
            <Link href="/" className="flex items-center gap-2.5">
              <Image src="/icons/Aurum-logo.svg" alt="" width={26} height={28} aria-hidden="true" />
              <span className="font-[family-name:var(--font-libertinus-serif-display)] text-[14px] tracking-[3.5px] text-[#ede5d9] uppercase">Aurum</span>
            </Link>
            <p className="text-[12.5px] leading-relaxed text-[#4a4035]">
              Aurum Banking is a regulated financial institution. Member FDIC. Deposits insured up to $250,000 per depositor.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-16 gap-y-8">
            {[
              { heading: "Platform", links: ["Features", "Security", "Pricing", "API"] },
              { heading: "Company", links: ["About", "Careers", "Press", "Contact"] },
              { heading: "Legal", links: ["Privacy Policy", "Terms of Service", "Cookie Policy"] },
            ].map((col) => (
              <div key={col.heading} className="flex flex-col gap-3.5">
                <span className="text-[11px] tracking-[0.16em] uppercase text-[#5a4e40] mb-0.5">
                  {col.heading}
                </span>
                {col.links.map((link) => (
                  <a key={link} href="#" className="text-[13.5px] text-[#6a5a4a] hover:text-[#c8b882] transition-colors duration-300">
                    {link}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-[rgba(220,185,110,0.05)] pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <p className="text-[12px] text-[#3d3028]">© 2025 Aurum Banking. All rights reserved.</p>
          <p className="text-[12px] text-[#3d3028]">NMLS #000000 · Licensed in all 50 states</p>
        </div>
      </footer>
    </div>
  );
}
