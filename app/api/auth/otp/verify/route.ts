import { NextResponse } from "next/server";
import { Client, Account } from "node-appwrite";
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

    // Build a scoped client from the session secret to issue a JWT
    const sessionClient = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
      .setSession(session.secret);

    const jwt = await new Account(sessionClient).createJWT();

    // Check onboarding status to decide where the client should redirect
    const userDoc = await databases.getDocument(DATABASE_ID, USER_COLLECTION_ID, userId);
    const redirectTo = userDoc.onboardingComplete ? "/dashboard" : "/onboarding";

    const response = NextResponse.json({
      success: true,
      jwt: jwt.jwt,
      redirectTo,
    });

    response.cookies.set(APPWRITE_COOKIE, session.secret, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: "Invalid or expired code. Please try again." },
      { status: 401 }
    );
  }
}
