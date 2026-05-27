import { NextResponse } from "next/server";
import { createSessionClient, APPWRITE_COOKIE } from "@/lib/appwrite";

export async function POST() {
  try {
    const { account } = await createSessionClient();
    await account.deleteSession({ sessionId: "current" });
  } catch {
    // Session already expired — still clear the cookie below
  }

  const response = NextResponse.json({ success: true });
  response.cookies.delete(APPWRITE_COOKIE);
  return response;
}
