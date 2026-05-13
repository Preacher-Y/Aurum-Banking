import Image from "next/image";
import Link from "next/link";
import { KeyRound, Mail } from "lucide-react";

export default function LoginPage() {
  return (
    <main className="aurum-login-page">
      <div className="aurum-login-stage" aria-label="Aurum banking login">
        <div className="aurum-background" aria-hidden="true">
          <Image
            alt=""
            aria-hidden="true"
            className="aurum-background-primary"
            height={970}
            src="/figma/login/background-primary.svg"
            width={1061}
          />
          <div className="aurum-background-ring-shell">
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

        <section className="aurum-brand" aria-label="Aurum">
          <Image
            src="/icons/Aurum-logo.svg"
            alt="Aurum company logo"
            width={244}
            height={257}
            priority
            className="aurum-brand-mark"
          />
          <p>AURUM</p>
        </section>

        <form
          autoComplete="off"
          className="aurum-login-form"
          aria-label="Login form"
        >
          <div className="aurum-form-shell" aria-hidden="true" />

          <label className="aurum-field aurum-email-field">
            <Mail aria-hidden="true" className="aurum-field-icon" />
            <input
              aria-label="Email"
              autoComplete="email"
              inputMode="email"
              placeholder="Email"
              type="email"
            />
          </label>

          <label className="aurum-field aurum-password-field">
            <KeyRound aria-hidden="true" className="aurum-field-icon" />
            <input
              aria-label="Password"
              autoComplete="current-password"
              placeholder="Password"
              type="password"
            />
          </label>

          <button className="aurum-login-button" type="submit">
            Login
          </button>

          <p className="aurum-signup-copy">
            Don&apos;t Have An Account? <Link href="/signup">Sign Up</Link>
          </p>
        </form>
      </div>
    </main>
  );
}
