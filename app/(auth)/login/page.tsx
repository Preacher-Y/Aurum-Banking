import Image from "next/image";
import Link from "next/link";
import { KeyRound, Mail } from "lucide-react";

export default function LoginPage() {
  return (
    <main className="aurum-login-page relative flex-1 min-h-svh overflow-hidden bg-[#14120e] text-[#ede5d9] font-[family-name:var(--font-libertinus-serif-display)]">
      <div
        className="aurum-login-stage absolute top-1/2 left-1/2 h-[662px] w-[1024px] origin-center overflow-hidden"
        aria-label="Aurum banking login"
      >
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <Image
            alt=""
            aria-hidden="true"
            className="aurum-background-primary"
            height={970}
            src="/figma/login/background-primary.svg"
            width={1061}
          />
          <div className="aurum-background-ring-shell flex items-center justify-center">
            <Image
              alt=""
              aria-hidden="true"
              className="aurum-background-ring"
              height={1239}
              src="/figma/login/background-ring.svg"
              width={1239}
            />
          </div>
        </div>

        <section
          className="aurum-brand pointer-events-none absolute top-[139px] left-1/2 z-[2] flex w-[118px] -translate-x-1/2 flex-col items-center text-center"
          aria-label="Aurum"
        >
          <Image
            src="/icons/Aurum-logo.svg"
            alt="Aurum company logo"
            width={244}
            height={257}
            priority
            className="aurum-brand-mark h-auto w-[60px]"
          />
          <p className="mt-[3px] text-[21px] leading-none tracking-[1.9px] text-[#ead9c2]">
            AURUM
          </p>
        </section>

        <form
          autoComplete="off"
          className="aurum-login-form absolute top-[219px] left-[341px] z-[2] h-[294px] w-[337px]"
          aria-label="Login form"
        >
          <div className="aurum-form-shell" aria-hidden="true" />

          <label className="aurum-field aurum-email-field absolute top-[47px] left-[29px] z-[1] flex h-[46px] w-[280px] items-center overflow-hidden rounded-lg bg-[#1a1712] text-[#ede5d9]">
            <Mail
              aria-hidden="true"
              className="absolute left-[13px] size-6 text-[#a98b00] [stroke-width:1.9px]"
            />
            <input
              aria-label="Email"
              autoComplete="email"
              className="h-full w-full border-0 bg-transparent px-[18px] pt-0 pb-px pl-[47px] text-[19px] leading-none tracking-[1.7px] text-[#ede5d9] caret-[#dcb96e] outline-none placeholder:text-[#ede5d9] placeholder:opacity-100"
              inputMode="email"
              placeholder="Email"
              type="email"
            />
          </label>

          <label className="aurum-field aurum-password-field absolute top-[108px] left-[29px] z-[1] flex h-[46px] w-[280px] items-center overflow-hidden rounded-lg bg-[#1a1712] text-[#ede5d9]">
            <KeyRound
              aria-hidden="true"
              className="absolute left-[13px] size-6 text-[#a98b00] [stroke-width:1.9px]"
            />
            <input
              aria-label="Password"
              autoComplete="current-password"
              className="h-full w-full border-0 bg-transparent px-[18px] pt-0 pb-px pl-[47px] text-[19px] leading-none tracking-[1.7px] text-[#ede5d9] caret-[#dcb96e] outline-none placeholder:text-[#ede5d9] placeholder:opacity-100"
              placeholder="Password"
              type="password"
            />
          </label>

          <button
            className="absolute top-[182px] left-[67px] z-[1] h-10 w-[203px] cursor-pointer rounded-lg border-0 bg-linear-to-r from-[#a3853f] via-[#dcb96e] to-[#86642b] text-[21px] leading-none tracking-[1.9px] text-[#1a1712] transition hover:brightness-105 active:translate-y-px"
            type="submit"
          >
            Login
          </button>

          <p className="absolute top-[273px] left-1/2 w-max -translate-x-1/2 text-center text-[14.2px] leading-none tracking-[0.7px] text-[#ede5d9]">
            Don&apos;t Have An Account?{" "}
            <Link
              className="text-[#ca9340] underline underline-offset-1"
              href="/signup"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
