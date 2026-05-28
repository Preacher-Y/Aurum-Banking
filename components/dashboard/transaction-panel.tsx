"use client";

import { useState } from "react";

type TxStatus = "completed" | "processing" | "declined";

interface Transaction {
  id: string;
  merchant: string;
  initials: string;
  amount: number;
  status: TxStatus;
  date: string;
  category: string;
}

interface Account {
  id: string;
  name: string;
  type: string;
  balance: number;
}

interface Props {
  accounts: Account[];
  transactions: Record<string, Transaction[]>;
}

const STATUS_STYLE: Record<TxStatus, string> = {
  completed: "text-[#76c893]",
  processing: "text-[#dcb96e]",
  declined: "text-[#e07b6a]",
};

const STATUS_DOT: Record<TxStatus, string> = {
  completed: "bg-[#76c893]",
  processing: "bg-[#dcb96e]",
  declined: "bg-[#e07b6a]",
};

const CATEGORY_STYLE: Record<string, string> = {
  Subscriptions: "border-[rgba(100,140,220,0.28)] bg-[rgba(100,140,220,0.08)] text-[#8aabf0]",
  Deposit: "border-[rgba(80,180,110,0.28)] bg-[rgba(80,180,110,0.08)] text-[#76c893]",
  Groceries: "border-[rgba(220,130,60,0.28)] bg-[rgba(220,130,60,0.08)] text-[#e0a070]",
  Transfer: "border-[rgba(220,185,110,0.28)] bg-[rgba(220,185,110,0.08)] text-[#dcb96e]",
};

function categoryStyle(cat: string) {
  return CATEGORY_STYLE[cat] ?? "border-[rgba(140,125,110,0.2)] bg-[rgba(140,125,110,0.06)] text-[#8c7d6e]";
}

function fmt(n: number) {
  const abs = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(Math.abs(n));
  return n >= 0 ? `+${abs}` : `-${abs}`;
}

export default function TransactionPanel({ accounts, transactions }: Props) {
  const [activeId, setActiveId] = useState(accounts[0]?.id ?? "");
  const rows = transactions[activeId] ?? [];

  return (
    <div>
      {/* Header row */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-[20px] font-normal text-[#ede5d9]">Recent transactions</h2>
        <button
          type="button"
          className="text-[12.5px] tracking-[0.4px] text-[#ca9340] hover:text-[#dcb96e] transition-colors duration-300"
        >
          View all
        </button>
      </div>

      {/* Account tabs */}
      <div className="flex gap-0 border-b border-[rgba(220,185,110,0.08)] mb-5 overflow-x-auto no-scrollbar">
        {accounts.map((acc) => (
          <button
            key={acc.id}
            type="button"
            onClick={() => setActiveId(acc.id)}
            className={`px-4 pb-3 pt-1 text-[13px] tracking-[0.3px] whitespace-nowrap border-b-2 transition-all duration-300 ${
              activeId === acc.id
                ? "border-[#dcb96e] text-[#dcb96e]"
                : "border-transparent text-[#5a4a3a] hover:text-[#8c7d6e]"
            }`}
          >
            {acc.name}
          </button>
        ))}
      </div>

      {/* Table */}
      {rows.length === 0 ? (
        <p className="text-[13px] text-[#5a4a3a] py-8 text-center">No transactions found.</p>
      ) : (
        <div className="overflow-x-auto -mx-1">
          <table className="w-full min-w-[520px]">
            <thead>
              <tr className="border-b border-[rgba(220,185,110,0.06)]">
                {["Transaction", "Amount", "Status", "Date", "Category"].map((h) => (
                  <th
                    key={h}
                    className="px-2 pb-3 text-left text-[11px] tracking-[0.6px] uppercase text-[#4a3e32] font-normal"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((tx) => (
                <tr
                  key={tx.id}
                  className="border-b border-[rgba(220,185,110,0.04)] hover:bg-[rgba(220,185,110,0.02)] transition-colors duration-200"
                >
                  {/* Merchant */}
                  <td className="px-2 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2a2218] to-[#1a1610] border border-[rgba(220,185,110,0.1)] flex items-center justify-center shrink-0">
                        <span className="text-[10px] tracking-[0.5px] text-[#a08060]">{tx.initials}</span>
                      </div>
                      <span className="text-[13px] text-[#c8b882] whitespace-nowrap">{tx.merchant}</span>
                    </div>
                  </td>

                  {/* Amount */}
                  <td className={`px-2 py-3.5 text-[13px] font-normal whitespace-nowrap ${tx.amount >= 0 ? "text-[#76c893]" : "text-[#ede5d9]"}`}>
                    {fmt(tx.amount)}
                  </td>

                  {/* Status */}
                  <td className="px-2 py-3.5">
                    <span className={`inline-flex items-center gap-1.5 text-[12px] ${STATUS_STYLE[tx.status]}`}>
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${STATUS_DOT[tx.status]}`} />
                      {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="px-2 py-3.5 text-[12.5px] text-[#5a4a3a] whitespace-nowrap">{tx.date}</td>

                  {/* Category */}
                  <td className="px-2 py-3.5">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full border text-[11px] tracking-[0.3px] whitespace-nowrap ${categoryStyle(tx.category)}`}>
                      {tx.category}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
