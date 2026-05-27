"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { useRouter } from "next/navigation";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const DAYS = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, "0"));
const MIN_AGE = 18;
const YEARS = Array.from({ length: 90 }, (_, i) => new Date().getFullYear() - MIN_AGE - i);

const COUNTRIES = [
  "Algeria", "Angola", "Argentina", "Australia", "Austria",
  "Bahrain", "Bangladesh", "Belgium", "Botswana", "Brazil",
  "Cameroon", "Canada", "Chile", "China", "Colombia", "Côte d'Ivoire",
  "Croatia", "Czech Republic",
  "Democratic Republic of Congo", "Denmark",
  "Egypt", "Ethiopia",
  "Finland", "France",
  "Germany", "Ghana", "Greece",
  "Hong Kong", "Hungary",
  "India", "Indonesia", "Ireland", "Israel", "Italy",
  "Japan", "Jordan",
  "Kenya", "Kuwait",
  "Lebanon", "Libya",
  "Madagascar", "Malawi", "Malaysia", "Mauritius", "Mexico", "Morocco", "Mozambique",
  "Namibia", "Netherlands", "New Zealand", "Niger", "Nigeria", "Norway",
  "Oman",
  "Pakistan", "Peru", "Philippines", "Poland", "Portugal",
  "Qatar",
  "Romania", "Rwanda",
  "Saudi Arabia", "Senegal", "Sierra Leone", "Singapore", "South Africa",
  "South Korea", "Spain", "Sudan", "Sweden", "Switzerland",
  "Taiwan", "Tanzania", "Thailand", "Tunisia", "Turkey",
  "UAE", "Uganda", "United Kingdom", "United States",
  "Venezuela", "Vietnam",
  "Zambia", "Zimbabwe",
  "Other",
];

const STEPS = [
  { label: "Personal Info", heading: "Personal Details", sub: "Tell us about yourself so we can verify your identity." },
  { label: "Address", heading: "Your Address", sub: "Used for account verification and official correspondence." },
];

interface PersonalData {
  firstName: string;
  lastName: string;
  dobMonth: string;
  dobDay: string;
  dobYear: string;
  nationalId: string;
  phone: string;
  gender: string;
}

interface AddressData {
  country: string;
  city: string;
  streetAddress: string;
}

/* ── Field label ─────────────────────────────── */
function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] tracking-[0.15em] uppercase text-[#6a5a4a] mb-2">{children}</p>
  );
}

/* ── Step indicator ──────────────────────────── */
function StepIndicator({ current }: { current: number }) {
  return (
    <div>
      <div className="flex items-start gap-0 mb-8">
        {STEPS.map((s, i) => {
          const idx = i + 1;
          const done = current > idx;
          const active = current === idx;
          return (
            <div key={s.label} className="flex items-start">
              <div className="flex flex-col items-center gap-2.5">
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-all duration-500 ${done ? "bg-[#dcb96e] border-[#dcb96e]" : active ? "bg-[rgba(220,185,110,0.15)] border-[#dcb96e]" : "border-[rgba(220,185,110,0.2)] bg-transparent"}`}>
                  {done && (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#120e09" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12l5 5 9-9" /></svg>
                  )}
                  {active && <span className="w-2 h-2 rounded-full bg-[#dcb96e] block" />}
                </div>
                <span className={`text-[10.5px] tracking-wide text-center w-16 leading-tight transition-colors duration-300 ${active ? "text-[#c8b882]" : done ? "text-[#7a6a58]" : "text-[#4a3e32]"}`}>
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`w-16 h-px mt-2.5 mx-1 transition-all duration-700 ${current > idx ? "bg-[#dcb96e]" : "bg-[rgba(220,185,110,0.15)]"}`} />
              )}
            </div>
          );
        })}
      </div>
      <div className="aurum-eyebrow mb-5">Step {current} of {STEPS.length}</div>
      <h2 className="text-[40px] font-normal leading-[1.08] text-[#ede5d9] mb-5">{STEPS[current - 1].heading}.</h2>
      <div className="w-8 h-px bg-gradient-to-r from-[#dcb96e] to-transparent mb-5" />
      <p className="text-[14px] leading-relaxed text-[#7a6a58] max-w-[260px]">{STEPS[current - 1].sub}</p>
    </div>
  );
}

/* ── Country Select (controlled) ─────────────── */
function CountrySelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [panelStyle, setPanelStyle] = useState<React.CSSProperties>({});

  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const filtered = search
    ? COUNTRIES.filter((c) => c.toLowerCase().includes(search.toLowerCase()))
    : COUNTRIES;

  function computePosition() {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    setPanelStyle({ position: "fixed", top: rect.bottom + 6, left: rect.left, width: rect.width, zIndex: 9999 });
  }

  function openDropdown() { computePosition(); setOpen(true); setSearch(""); }

  useEffect(() => {
    if (!open) return;
    requestAnimationFrame(() => searchRef.current?.focus());

    function handleMouseDown(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node) &&
          triggerRef.current && !triggerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleKeyDown(e: KeyboardEvent) { if (e.key === "Escape") setOpen(false); }
    function handleReposition() { computePosition(); }

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("scroll", handleReposition, true);
    window.addEventListener("resize", handleReposition);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", handleReposition, true);
      window.removeEventListener("resize", handleReposition);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <>
      <div className="aurum-input-shell" style={open ? { borderColor: "rgba(220,185,110,0.38)", background: "rgba(220,185,110,0.04)" } : undefined}>
        <div className="aurum-input-core">
          <svg className="absolute left-4 text-[#dcb96e] opacity-50 shrink-0 pointer-events-none" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
          <button ref={triggerRef} type="button" aria-haspopup="listbox" aria-expanded={open} aria-label="Select country" onClick={openDropdown}
            className="w-full h-[52px] bg-transparent border-0 text-left outline-none cursor-pointer font-[family-name:var(--font-libertinus-serif-display)] text-[14.5px] tracking-[0.5px]"
            style={{ paddingLeft: "48px", paddingRight: "36px", color: value ? "#ede5d9" : "#6b5847" }}>
            {value || "Select your country"}
          </button>
          <div className="absolute right-4 pointer-events-none" style={{ transition: "transform 0.3s cubic-bezier(0.32,0.72,0,1)", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#dcb96e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
          </div>
        </div>
      </div>

      {open && typeof window !== "undefined" && createPortal(
        <div ref={panelRef} className="aurum-dropdown-panel" style={panelStyle}>
          <div className="flex items-center gap-2 px-3 py-2.5 border-b border-[rgba(220,185,110,0.1)]">
            <svg className="shrink-0 text-[#dcb96e] opacity-40" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
            <input ref={searchRef} type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search countries…"
              className="flex-1 bg-transparent border-0 outline-none text-[13px] tracking-wide" style={{ color: "#ede5d9", fontFamily: "inherit" }} />
            {search && (
              <button type="button" onClick={() => setSearch("")} aria-label="Clear search"
                className="shrink-0 transition-colors duration-200" style={{ color: "#5a4e40" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#8a7a6a")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#5a4e40")}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12" /></svg>
              </button>
            )}
          </div>
          <div className="aurum-dropdown-list" role="listbox" aria-label="Countries">
            {filtered.length === 0 ? (
              <div className="px-4 py-8 text-center text-[13px] tracking-wide" style={{ color: "#4a4035" }}>No results for &ldquo;{search}&rdquo;</div>
            ) : filtered.map((country) => {
              const isSelected = value === country;
              return (
                <button key={country} type="button" role="option" aria-selected={isSelected}
                  onClick={() => { onChange(country); setOpen(false); }}
                  className="w-full flex items-center justify-between px-4 py-[11px] text-left text-[13.5px] tracking-wide transition-colors duration-150"
                  style={{ color: isSelected ? "#dcb96e" : "#c8b882", background: "transparent", fontFamily: "inherit", border: 0, cursor: "pointer" }}
                  onMouseEnter={(e) => { if (!isSelected) e.currentTarget.style.background = "rgba(220,185,110,0.07)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}>
                  <span>{country}</span>
                  {isSelected && (
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#dcb96e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12l5 5 9-9" /></svg>
                  )}
                </button>
              );
            })}
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

/* ── Step 1 — Personal info (controlled) ─────── */
function StepPersonal({ data, onChange, onNext }: {
  data: PersonalData;
  onChange: (key: keyof PersonalData, value: string) => void;
  onNext: () => void;
}) {
  return (
    <>
      <div className="mb-8">
        <div className="aurum-eyebrow mb-4">Step 1 of 2</div>
        <h2 className="text-[36px] font-normal leading-[1.1] text-[#ede5d9] mb-2">Personal Details.</h2>
        <p className="text-[14px] text-[#8a7a6a]">Review and complete your personal information.</p>
      </div>

      <div className="space-y-4">
        {/* First + Last name */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <FieldLabel>First Name</FieldLabel>
            <div className="aurum-input-shell">
              <div className="aurum-input-core">
                <svg className="absolute left-4 text-[#dcb96e] opacity-50 shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="5" /><path d="M20 21a8 8 0 0 0-16 0" /></svg>
                <input aria-label="First name" autoComplete="given-name" className="aurum-input" placeholder="First" type="text"
                  value={data.firstName} onChange={(e) => onChange("firstName", e.target.value)} />
              </div>
            </div>
          </div>
          <div>
            <FieldLabel>Last Name</FieldLabel>
            <div className="aurum-input-shell">
              <div className="aurum-input-core">
                <input aria-label="Last name" autoComplete="family-name" className="aurum-input" placeholder="Last" type="text"
                  style={{ paddingLeft: "18px" }} value={data.lastName} onChange={(e) => onChange("lastName", e.target.value)} />
              </div>
            </div>
          </div>
        </div>

        {/* Date of Birth */}
        <div>
          <FieldLabel>Date of Birth</FieldLabel>
          <div className="grid grid-cols-3 gap-2">
            <div className="aurum-input-shell">
              <div className="aurum-input-core">
                <select aria-label="Birth month" className="aurum-select" value={data.dobMonth} onChange={(e) => onChange("dobMonth", e.target.value)}>
                  <option value="" disabled>Month</option>
                  {MONTHS.map((m, i) => <option key={m} value={String(i + 1).padStart(2, "0")}>{m}</option>)}
                </select>
              </div>
            </div>
            <div className="aurum-input-shell">
              <div className="aurum-input-core">
                <select aria-label="Birth day" className="aurum-select" value={data.dobDay} onChange={(e) => onChange("dobDay", e.target.value)}>
                  <option value="" disabled>Day</option>
                  {DAYS.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
            </div>
            <div className="aurum-input-shell">
              <div className="aurum-input-core">
                <select aria-label="Birth year" className="aurum-select" value={data.dobYear} onChange={(e) => onChange("dobYear", e.target.value)}>
                  <option value="" disabled>Year</option>
                  {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* National ID / SSN */}
        <div>
          <FieldLabel>National ID / Social Security Number</FieldLabel>
          <div className="aurum-input-shell">
            <div className="aurum-input-core">
              <svg className="absolute left-4 text-[#dcb96e] opacity-50 shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect width="20" height="14" x="2" y="5" rx="2" /><path d="M2 10h20" /><path d="M6 15h2M10 15h6" /></svg>
              <input aria-label="National ID or Social Security Number" autoComplete="off" className="aurum-input"
                placeholder="SSN or National ID number" type="text" inputMode="numeric"
                value={data.nationalId} onChange={(e) => onChange("nationalId", e.target.value)} />
            </div>
          </div>
          <p className="text-[11.5px] text-[#4a4035] mt-2 pl-1 tracking-wide">US residents: SSN format XXX-XX-XXXX</p>
        </div>

        {/* Phone (optional) */}
        <div>
          <FieldLabel>
            Phone <span className="text-[#4a4035] normal-case tracking-normal ml-1 text-[10px]">(optional)</span>
          </FieldLabel>
          <div className="aurum-input-shell">
            <div className="aurum-input-core">
              <svg className="absolute left-4 text-[#dcb96e] opacity-50 shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.4 2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 5.55 5.55l.96-.96a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21 16.92z" /></svg>
              <input aria-label="Phone number" autoComplete="tel" className="aurum-input" placeholder="+1 555 000 0000" type="tel"
                value={data.phone} onChange={(e) => onChange("phone", e.target.value)} />
            </div>
          </div>
        </div>

        {/* Gender (optional) */}
        <div>
          <FieldLabel>
            Gender <span className="text-[#4a4035] normal-case tracking-normal ml-1 text-[10px]">(optional)</span>
          </FieldLabel>
          <div className="aurum-input-shell">
            <div className="aurum-input-core">
              <svg className="absolute left-4 text-[#dcb96e] opacity-50 shrink-0 pointer-events-none" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="4" /><path d="M16 8l4-4m0 0h-4m4 0v4" /><path d="M8 16l-4 4m0 0h4m-4 0v-4" />
              </svg>
              <select
                aria-label="Gender"
                className="aurum-select aurum-select-iconed"
                value={data.gender}
                onChange={(e) => onChange("gender", e.target.value)}
              >
                <option value="" disabled>Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="non_binary">Non-binary</option>
                <option value="prefer_not_to_say">Prefer not to say</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <button className="aurum-cta-btn w-full mt-8 font-[family-name:var(--font-libertinus-serif-display)]" type="button" onClick={onNext}>
        <span className="tracking-[2.5px] uppercase text-[13px]">Continue</span>
        <span className="aurum-cta-icon">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </span>
      </button>
    </>
  );
}

/* ── Step 2 — Address (controlled) ───────────── */
function StepAddress({ data, onChange, onBack, onSubmit, loading, error }: {
  data: AddressData;
  onChange: (key: keyof AddressData, value: string) => void;
  onBack: () => void;
  onSubmit: () => void;
  loading: boolean;
  error: string | null;
}) {
  return (
    <>
      <div className="mb-8">
        <div className="aurum-eyebrow mb-4">Step 2 of 2</div>
        <h2 className="text-[36px] font-normal leading-[1.1] text-[#ede5d9] mb-2">Your Address.</h2>
        <p className="text-[14px] text-[#8a7a6a]">Used for account verification and correspondence.</p>
      </div>

      <div className="space-y-4">
        <div>
          <FieldLabel>Country</FieldLabel>
          <CountrySelect value={data.country} onChange={(v) => onChange("country", v)} />
        </div>

        <div>
          <FieldLabel>City</FieldLabel>
          <div className="aurum-input-shell">
            <div className="aurum-input-core">
              <svg className="absolute left-4 text-[#dcb96e] opacity-50 shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
              <input aria-label="City" autoComplete="address-level2" className="aurum-input" placeholder="City" type="text"
                value={data.city} onChange={(e) => onChange("city", e.target.value)} />
            </div>
          </div>
        </div>

        <div>
          <FieldLabel>Street Address</FieldLabel>
          <div className="aurum-input-shell">
            <div className="aurum-input-core">
              <svg className="absolute left-4 text-[#dcb96e] opacity-50 shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
              <input aria-label="Street address" autoComplete="street-address" className="aurum-input" placeholder="123 Main Street" type="text"
                value={data.streetAddress} onChange={(e) => onChange("streetAddress", e.target.value)} />
            </div>
          </div>
        </div>
      </div>

      {error && <p className="text-[13px] text-[#e07b6a] tracking-wide mt-4 pl-1">{error}</p>}

      <div className="mt-8 space-y-3">
        <button
          className="aurum-cta-btn w-full font-[family-name:var(--font-libertinus-serif-display)] disabled:opacity-60 disabled:cursor-not-allowed"
          type="button"
          onClick={onSubmit}
          disabled={loading || !data.country || !data.city || !data.streetAddress}
        >
          <span className="tracking-[2.5px] uppercase text-[13px]">{loading ? "Saving…" : "Complete Setup"}</span>
          <span className="aurum-cta-icon">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </span>
        </button>

        <button
          className="w-full flex items-center justify-center gap-2 py-3 text-[13px] tracking-[0.4px] text-[#6a5a4a] hover:text-[#8a7a6a] transition-colors duration-300"
          type="button"
          onClick={onBack}
          disabled={loading}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
          Back to Personal Details
        </button>
      </div>
    </>
  );
}

/* ── Page ────────────────────────────────────── */
export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [prefilling, setPrefilling] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [personal, setPersonal] = useState<PersonalData>({
    firstName: "", lastName: "", dobMonth: "", dobDay: "", dobYear: "",
    nationalId: "", phone: "", gender: "",
  });

  const [address, setAddress] = useState<AddressData>({
    country: "", city: "", streetAddress: "",
  });

  // Prefill firstName/lastName from the user document created at registration
  useEffect(() => {
    fetch("/api/user/me")
      .then((r) => r.json())
      .then((doc) => {
        setPersonal((prev) => ({
          ...prev,
          firstName: doc.firstName ?? "",
          lastName: doc.lastName ?? "",
        }));
      })
      .catch(() => {}) // non-critical — user can type manually
      .finally(() => setPrefilling(false));
  }, []);

  function handlePersonalChange(key: keyof PersonalData, value: string) {
    setPersonal((prev) => ({ ...prev, [key]: value }));
  }

  function handleAddressChange(key: keyof AddressData, value: string) {
    setAddress((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit() {
    setSubmitting(true);
    setError(null);

    const dateOfBirth =
      personal.dobYear && personal.dobMonth && personal.dobDay
        ? `${personal.dobYear}-${personal.dobMonth.padStart(2, "0")}-${personal.dobDay.padStart(2, "0")}`
        : undefined;

    try {
      const res = await fetch("/api/onboarding", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: personal.firstName,
          lastName: personal.lastName,
          ...(dateOfBirth && { dateOfBirth }),
          nationalId: personal.nationalId,
          ...(personal.phone && { phone: personal.phone }),
          ...(personal.gender && { gender: personal.gender }),
          country: address.country,
          city: address.city,
          streetAddress: address.streetAddress,
          onboardingComplete: true,
        }),
      });

      if (!res.ok) throw new Error((await res.json()).error);
      router.push("/dashboard");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-[100dvh] flex font-[family-name:var(--font-libertinus-serif-display)] bg-[#0d0b08] text-[#ede5d9]">

      {/* ── Left brand panel ── */}
      <aside
        className="hidden lg:flex flex-col justify-between w-[42%] min-h-[100dvh] px-14 py-16 relative overflow-hidden bg-[#0d0b08] border-r border-[rgba(220,185,110,0.06)] aurum-noise"
        aria-label="Onboarding progress"
      >
        <div className="pointer-events-none absolute -top-48 -left-48 w-[600px] h-[600px] rounded-full bg-[#dcb96e] opacity-[0.07] blur-[140px]" aria-hidden="true" />
        <div className="pointer-events-none absolute top-1/2 -translate-y-1/2 -right-32 w-[360px] h-[360px] rounded-full bg-[#c9a55a] opacity-[0.04] blur-[100px]" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-40 -right-24 w-[420px] h-[420px] rounded-full bg-[#a3853f] opacity-[0.05] blur-[120px]" aria-hidden="true" />

        <div className="relative z-10 flex items-center gap-3.5">
          <Image src="/icons/Aurum-logo.svg" alt="" width={38} height={40} aria-hidden="true" />
          <span className="text-[17px] tracking-[4px] text-[#ede5d9] uppercase">Aurum</span>
        </div>

        <div className="relative z-10">
          <StepIndicator current={step} />
        </div>

        <div className="relative z-10">
          <div className="flex items-start gap-3">
            <div className="mt-[3px] shrink-0">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(220,185,110,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <p className="text-[12.5px] leading-relaxed text-[#4a4035] tracking-wide">
              Your information is protected with AES-256 encryption and stored in compliance with applicable banking regulations. We never sell or share your personal data.
            </p>
          </div>
        </div>
      </aside>

      {/* ── Right form panel ── */}
      <div className="flex-1 flex items-center justify-center min-h-[100dvh] px-6 sm:px-12 py-24 lg:py-16 bg-[#14120e] relative overflow-hidden aurum-noise">
        <div className="pointer-events-none absolute -top-24 -right-24 w-[500px] h-[500px] rounded-full bg-[#a3853f] opacity-[0.05] blur-[130px]" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-32 -left-20 w-[420px] h-[420px] rounded-full bg-[#dcb96e] opacity-[0.04] blur-[120px]" aria-hidden="true" />
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-[#86642b] opacity-[0.025] blur-[90px]" aria-hidden="true" />

        <div className="lg:hidden absolute top-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5">
          <Image src="/icons/Aurum-logo.svg" alt="Aurum" width={36} height={38} />
          <span className="text-[13px] tracking-[4px] text-[#ede5d9] uppercase">Aurum</span>
        </div>

        <div className="lg:hidden absolute top-24 left-1/2 -translate-x-1/2">
          <span className="aurum-eyebrow">Step {step} of {STEPS.length}</span>
        </div>

        {prefilling ? (
          /* Loading skeleton while fetching user data */
          <div className="relative z-10 w-full max-w-[420px] space-y-4">
            {[80, 48, 48, 48, 48].map((h, i) => (
              <div key={i} className="rounded-xl animate-pulse" style={{ height: h, background: "rgba(220,185,110,0.05)" }} />
            ))}
          </div>
        ) : (
          <div key={step} className="relative z-10 w-full max-w-[420px] aurum-form-animate" style={{ animationDelay: "30ms" }}>
            {step === 1 ? (
              <StepPersonal data={personal} onChange={handlePersonalChange} onNext={() => setStep(2)} />
            ) : (
              <StepAddress data={address} onChange={handleAddressChange} onBack={() => setStep(1)} onSubmit={handleSubmit} loading={submitting} error={error} />
            )}
          </div>
        )}
      </div>
    </main>
  );
}
