import { NextResponse } from "next/server";
import { AppwriteException } from "node-appwrite";
import { createAdminClient, APPWRITE_COOKIE, DATABASE_ID, USER_COLLECTION_ID } from "@/lib/appwrite";

export async function POST(req: Request) {
  try {
    const { userId, code } = await req.json();

    if (!userId || !code) {
      return NextResponse.json(
        { error: "User ID and OTP code are required." },
        { status: 400 }
      );
    }

    const { account, databases } = createAdminClient();

    // Verify OTP — creates the real authenticated session
    const session = await account.createSession({ userId, secret: code });

    // Check onboarding status to decide where the client should redirect
    const userDoc = await databases.getDocument(DATABASE_ID, USER_COLLECTION_ID, userId);
    const redirectTo = userDoc.onboardingComplete ? "/" : "/onboarding";

    const response = NextResponse.json({ success: true, redirectTo });

    // JWT is not needed client-side — session cookie is sufficient for all server routes
    response.cookies.set(APPWRITE_COOKIE, session.secret, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    return response;
  } catch (err) {
    if (err instanceof AppwriteException && err.code === 401) {
      return NextResponse.json(
        { error: "Invalid or expired code. Please try again." },
        { status: 401 }
      );
    }
    console.error("[otp/verify]", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
