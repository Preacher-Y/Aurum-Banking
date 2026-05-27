import { NextResponse } from "next/server";
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
  } catch {
    // Generic message — never reveal whether the email exists
    return NextResponse.json(
      { error: "Invalid email or password." },
      { status: 401 }
    );
  }
}
