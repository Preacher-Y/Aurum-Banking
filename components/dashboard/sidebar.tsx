"use client";

import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface SidebarUser {
  firstName: string;
  lastName: string;
  email: string;
}

const NAV = [
  {
    href: "/",
    label: "Home",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    href: "/banks",
    label: "My Banks",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="10" width="18" height="11" rx="1" />
        <path d="M3 10 12 3l9 7" />
        <line x1="12" y1="10" x2="12" y2="21" />
        <line x1="7" y1="15" x2="7" y2="15.01" />
        <line x1="17" y1="15" x2="17" y2="15.01" />
      </svg>
    ),
  },
  {
    href: "/transactions",
    label: "Transaction History",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
  },
  {
    href: "/transfer",
    label: "Payment Transfer",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="17 1 21 5 17 9" />
        <path d="M3 11V9a4 4 0 0 1 4-4h14" />
        <polyline points="7 23 3 19 7 15" />
        <path d="M21 13v2a4 4 0 0 1-4 4H3" />
      </svg>
    ),
  },
  {
    href: "/connect",
    label: "Connect Bank",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
  },
];

export default function Sidebar({ user }: { user: SidebarUser }) {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const initials = `${user.firstName[0] ?? ""}${user.lastName[0] ?? ""}`.toUpperCase();

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      router.push("/landing");
      router.refresh();
    }
  }

  return (
    <aside className="hidden lg:flex flex-col w-[240px] shrink-0 min-h-[100dvh] sticky top-0 bg-[#0d0b08] border-r border-[rgba(220,185,110,0.07)] aurum-noise">

      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-7 border-b border-[rgba(220,185,110,0.06)]">
        <Image src="/icons/Aurum-logo.svg" alt="" width={28} height={30} aria-hidden="true" />
        <span className="text-[15px] tracking-[3.5px] text-[#ede5d9] uppercase">Aurum</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-5 space-y-0.5" aria-label="Main navigation">
        {NAV.map((item) => {
          const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13.5px] tracking-[0.4px] transition-all duration-300 group ${
                active
                  ? "bg-[rgba(220,185,110,0.1)] text-[#dcb96e]"
                  : "text-[#6a5a4a] hover:text-[#c4b07a] hover:bg-[rgba(220,185,110,0.05)]"
              }`}
            >
              <span className={`shrink-0 transition-colors duration-300 ${active ? "text-[#dcb96e]" : "text-[#5a4a3a] group-hover:text-[#c4b07a]"}`}>
                {item.icon}
              </span>
              {item.label}
              {active && (
                <span className="ml-auto w-1 h-1 rounded-full bg-[#dcb96e]" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* User + logout */}
      <div className="px-4 py-5 border-t border-[rgba(220,185,110,0.06)]">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#a3853f] to-[#86642b] flex items-center justify-center shrink-0">
            <span className="text-[12px] tracking-[1px] text-[#120e09] font-semibold">{initials}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] text-[#c8b882] truncate">{user.firstName} {user.lastName}</p>
            <p className="text-[11px] text-[#5a4a3a] truncate">{user.email}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          disabled={loggingOut}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[12.5px] tracking-[0.4px] text-[#5a4a3a] hover:text-[#e07b6a] hover:bg-[rgba(220,80,80,0.06)] transition-all duration-300 disabled:opacity-50"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          {loggingOut ? "Signing out…" : "Sign out"}
        </button>
      </div>
    </aside>
  );
}
