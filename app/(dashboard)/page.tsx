import { getSessionUser } from "@/lib/session";
import TransactionPanel from "@/components/dashboard/transaction-panel";

// ── Static demo data ─────────────────────────────────────────────────
const ACCOUNTS = [
  { id: "a1", name: "Private Checking", type: "Checking", balance: 18_485.20 },
  { id: "a2", name: "Premium Savings", type: "Savings", balance: 6_200.00 },
];

const TRANSACTIONS: Record<
  string,
  { id: string; merchant: string; initials: string; amount: number; status: "completed" | "processing" | "declined"; date: string; category: string }[]
> = {
  a1: [
    { id: "t1", merchant: "Spotify Premium", initials: "SP", amount: -15.00, status: "processing", date: "Wed 1:00 pm", category: "Subscriptions" },
    { id: "t2", merchant: "Wire from Alex M.", initials: "AM", amount: 3_500.00, status: "completed", date: "Wed 8:12 am", category: "Deposit" },
    { id: "t3", merchant: "Apple iCloud", initials: "AC", amount: -0.99, status: "completed", date: "Tue 11:30 pm", category: "Subscriptions" },
    { id: "t4", merchant: "Whole Foods Market", initials: "WF", amount: -127.40, status: "completed", date: "Tue 6:45 pm", category: "Groceries" },
    { id: "t5", merchant: "Netflix", initials: "NF", amount: -15.49, status: "completed", date: "Mon 9:00 pm", category: "Subscriptions" },
  ],
  a2: [
    { id: "t6", merchant: "Auto-save Transfer", initials: "AT", amount: 500.00, status: "completed", date: "Mon 12:00 am", category: "Deposit" },
    { id: "t7", merchant: "Interest Credit", initials: "IC", amount: 18.40, status: "completed", date: "Sun 12:00 am", category: "Deposit" },
    { id: "t8", merchant: "Savings Goal Draw", initials: "SG", amount: -250.00, status: "completed", date: "Fri 3:00 pm", category: "Transfer" },
  ],
};

const BUDGETS = [
  { label: "Subscriptions", spent: 31.48, cap: 100, color: "#7ba8f0" },
  { label: "Groceries", spent: 255.40, cap: 500, color: "#dcb96e" },
  { label: "Savings Goal", spent: 450.00, cap: 600, color: "#7ac98a" },
];

const CARD = {
  name: "AURUM GOLD",
  number: "4821 •••• •••• 7391",
  expiry: "09/28",
};

const totalBalance = ACCOUNTS.reduce((s, a) => s + a.balance, 0);

// ── Helpers ───────────────────────────────────────────────────────────
function fmt(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
}

// ── Donut chart (pure SVG) ────────────────────────────────────────────
function DonutChart() {
  const r = 44;
  const cx = 60;
  const cy = 60;
  const circ = 2 * Math.PI * r; // ≈ 276.46

  const slices = ACCOUNTS.map((a) => ({
    pct: a.balance / totalBalance,
    color: a.id === "a1" ? "#dcb96e" : "#a3853f",
  }));

  const GAP = 5; // gap in px between slices
  let offset = 0;

  return (
    <svg width="120" height="120" viewBox="0 0 120 120" role="img" aria-label="Account balance distribution">
      {/* Track */}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(220,185,110,0.08)" strokeWidth="9" />
      {slices.map((s, i) => {
        const dash = circ * s.pct - GAP;
        const currentOffset = offset;
        // strokeDashoffset: positive shifts start backward (shows nothing), we need to start at currentOffset
        // Dashoffset = circ - currentOffset means the dash starts at currentOffset
        const dashOffset = circ - currentOffset;
        offset += circ * s.pct;
        return (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={s.color}
            strokeWidth="9"
            strokeDasharray={`${Math.max(dash, 0)} ${circ}`}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            transform={`rotate(-90 ${cx} ${cy})`}
          />
        );
      })}
      <text x={cx} y={cy - 6} textAnchor="middle" fill="#ede5d9" fontSize="16" fontFamily="inherit">{ACCOUNTS.length}</text>
      <text x={cx} y={cy + 9} textAnchor="middle" fill="#6a5a4a" fontSize="8.5" fontFamily="inherit" letterSpacing="1">ACCOUNTS</text>
    </svg>
  );
}

// ── Right panel ───────────────────────────────────────────────────────
function BankCard({ user }: { user: { firstName: string; lastName: string } }) {
  return (
    <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#1a1510] via-[#211c14] to-[#0d0b08] border border-[rgba(220,185,110,0.15)] p-5 h-[168px] select-none">
      {/* noise */}
      <div className="absolute inset-0 opacity-[0.04] bg-[url('/noise.svg')] bg-[length:180px_180px]" />
      {/* glow */}
      <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-[#dcb96e] opacity-[0.08] blur-[40px]" />

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-start justify-between mb-auto">
          <span className="text-[11px] tracking-[2.5px] text-[#dcb96e] opacity-80 uppercase">{CARD.name}</span>
          {/* NFC icon */}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(220,185,110,0.45)" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
            <path d="M5 12.55a11 11 0 0 1 14.08 0" />
            <path d="M1.42 9a16 16 0 0 1 21.16 0" />
            <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
            <circle cx="12" cy="20" r="0.5" fill="currentColor" />
          </svg>
        </div>

        <div className="mt-3">
          <p className="text-[13px] tracking-[2px] text-[#c8b882] mb-3">{CARD.number}</p>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[10px] text-[#5a4a3a] uppercase tracking-[0.8px] mb-0.5">Cardholder</p>
              <p className="text-[12px] tracking-[1px] text-[#ede5d9]">
                {user.firstName.toUpperCase()} {user.lastName.toUpperCase()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-[#5a4a3a] uppercase tracking-[0.8px] mb-0.5">Expires</p>
              <p className="text-[12px] tracking-[1px] text-[#ede5d9]">{CARD.expiry}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BudgetList() {
  return (
    <div className="space-y-4">
      {BUDGETS.map((b) => {
        const pct = Math.min((b.spent / b.cap) * 100, 100);
        const remaining = fmt(b.cap - b.spent);
        return (
          <div key={b.label}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[13px] text-[#8c7d6e]">{b.label}</span>
              <span className="text-[12px] text-[#6a5a4a]">{remaining} left</span>
            </div>
            <div className="h-1.5 rounded-full bg-[rgba(220,185,110,0.07)] overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${pct}%`, background: b.color }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────
export default async function DashboardPage() {
  const user = await getSessionUser();

  return (
    <div className="flex min-h-[100dvh]">

      {/* ── Center content ─────────────────────────────────────── */}
      <div className="flex-1 min-w-0 px-8 py-9 lg:pr-6">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-[32px] font-normal text-[#ede5d9] mb-1.5">
            Welcome,{" "}
            <span className="text-[#dcb96e]">{user.firstName}</span>
          </h1>
          <p className="text-[14px] text-[#6a5a4a] tracking-wide">
            Access &amp; manage your account and transactions efficiently.
          </p>
        </div>

        {/* Balance overview */}
        <div className="flex items-center gap-6 bg-[rgba(220,185,110,0.03)] border border-[rgba(220,185,110,0.09)] rounded-2xl p-6 mb-8">
          <DonutChart />
          <div className="flex-1">
            <p className="text-[13px] tracking-[0.5px] text-[#6a5a4a] mb-0.5">
              {ACCOUNTS.length} Bank Accounts
            </p>
            <p className="text-[12px] tracking-[0.3px] text-[#5a4a3a] mb-1">Total Current Balance</p>
            <p className="text-[34px] font-normal text-[#ede5d9] leading-tight">{fmt(totalBalance)}</p>
          </div>
          <button
            type="button"
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full border border-[rgba(220,185,110,0.2)] text-[12.5px] tracking-[0.4px] text-[#dcb96e] hover:bg-[rgba(220,185,110,0.07)] transition-colors duration-300"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add bank
          </button>
        </div>

        {/* Recent transactions */}
        <TransactionPanel accounts={ACCOUNTS} transactions={TRANSACTIONS} />
      </div>

      {/* ── Right panel ─────────────────────────────────────────── */}
      <aside className="hidden xl:flex flex-col w-[300px] shrink-0 border-l border-[rgba(220,185,110,0.07)] px-6 py-9 space-y-8 overflow-y-auto">

        {/* User profile */}
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#a3853f] to-[#86642b] flex items-center justify-center mb-3">
            <span className="text-[18px] tracking-[1.5px] text-[#120e09] font-semibold">
              {user.firstName[0]}{user.lastName[0]}
            </span>
          </div>
          <p className="text-[16px] text-[#ede5d9]">{user.firstName} {user.lastName}</p>
          <p className="text-[12px] text-[#5a4a3a] mt-0.5">{user.email}</p>
        </div>

        {/* My Banks */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-[13px] tracking-[0.4px] text-[#8c7d6e]">My Banks</span>
            <button
              type="button"
              className="flex items-center gap-1 text-[12px] text-[#ca9340] hover:text-[#dcb96e] transition-colors duration-300"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Add bank
            </button>
          </div>
          <div className="space-y-2">
            <BankCard user={user} />
            {/* Second card peek */}
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[rgba(220,185,110,0.03)] border border-[rgba(220,185,110,0.07)]">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#1e1a14] to-[#14120e] border border-[rgba(220,185,110,0.12)] flex items-center justify-center shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(220,185,110,0.5)" strokeWidth="1.5" aria-hidden="true">
                  <rect x="3" y="10" width="18" height="11" rx="1" />
                  <path d="M3 10 12 3l9 7" />
                </svg>
              </div>
              <div>
                <p className="text-[12.5px] text-[#c8b882]">Premium Savings</p>
                <p className="text-[11px] text-[#5a4a3a]">{fmt(ACCOUNTS[1].balance)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* My Budgets */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-[13px] tracking-[0.4px] text-[#8c7d6e]">My budgets</span>
            <button
              type="button"
              className="text-[#5a4a3a] hover:text-[#8c7d6e] transition-colors duration-300"
              aria-label="Budget options"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <circle cx="12" cy="5" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="12" cy="19" r="1.5" />
              </svg>
            </button>
          </div>
          <BudgetList />
        </div>
      </aside>
    </div>
  );
}
