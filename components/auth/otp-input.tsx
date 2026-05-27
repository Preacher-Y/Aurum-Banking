"use client";

import { useRef } from "react";

interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  disabled?: boolean;
}

export function OtpInput({ value, onChange, length = 6, disabled }: OtpInputProps) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const digits = Array.from({ length }, (_, i) => value[i] ?? "");

  function handleChange(i: number, raw: string) {
    const digit = raw.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[i] = digit;
    onChange(next.join(""));
    if (digit && i < length - 1) refs.current[i + 1]?.focus();
  }

  function handleKeyDown(i: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !digits[i] && i > 0) {
      const prev = [...digits];
      prev[i - 1] = "";
      onChange(prev.join(""));
      refs.current[i - 1]?.focus();
    }
  }

  function handlePaste(e: React.ClipboardEvent) {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    onChange(pasted.padEnd(length, " ").trim());
    refs.current[Math.min(pasted.length, length - 1)]?.focus();
  }

  return (
    <div className="flex gap-2" onPaste={handlePaste}>
      {digits.map((d, i) => (
        <div
          key={i}
          className="aurum-input-shell flex-1"
          style={d ? { borderColor: "rgba(220,185,110,0.38)", background: "rgba(220,185,110,0.04)" } : undefined}
        >
          <div className="aurum-input-core">
            <input
              ref={(el) => { refs.current[i] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={d}
              disabled={disabled}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              onFocus={(e) => e.target.select()}
              className="w-full h-[52px] bg-transparent border-0 text-center text-[22px] tracking-wider outline-none disabled:opacity-40"
              style={{ color: "#ede5d9", caretColor: "#dcb96e", fontFamily: "inherit" }}
              aria-label={`OTP digit ${i + 1}`}
              autoComplete={i === 0 ? "one-time-code" : "off"}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
