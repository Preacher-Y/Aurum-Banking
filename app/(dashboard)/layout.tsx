import { redirect } from "next/navigation";
import { AppwriteException } from "node-appwrite";
import { getSessionUser } from "@/lib/session";
import Sidebar from "@/components/dashboard/sidebar";

function isAuthError(err: unknown): boolean {
  if (err instanceof AppwriteException) return err.code === 401;
  if (err instanceof Error) return err.message === "No Appwrite session cookie found";
  return false;
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let user;
  try {
    user = await getSessionUser();
  } catch (err) {
    if (isAuthError(err)) redirect("/landing");
    throw err;
  }

  if (!user.onboardingComplete) {
    redirect("/onboarding");
  }

  return (
    <div className="min-h-[100dvh] flex bg-[#0d0b08] text-[#ede5d9] font-[family-name:var(--font-libertinus-serif-display)] overflow-hidden">
      <Sidebar
        user={{
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        }}
      />
      <div className="flex-1 min-w-0 overflow-y-auto">{children}</div>
    </div>
  );
}
