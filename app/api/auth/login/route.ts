import { NextResponse } from "next/server";
import { AppwriteException } from "node-appwrite";
import { createAdminClient } from "@/lib/appwrite";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const { account, users } = createAdminClient();

    // Validate credentials — creates a temp session we immediately delete
    const session = await account.createEmailPasswordSession({ email, password });
    await users.deleteSession(session.userId, session.$id);

    // Send OTP for the second factor
    await account.createEmailToken({ userId: session.userId, email });

    return NextResponse.json({ success: true, userId: session.userId });
  } catch (err) {
    // Auth/credential failures → 401
    if (err instanceof AppwriteException && (err.code === 401 || err.code === 404)) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }
    // Everything else is a server-side failure
    console.error("[login]", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
