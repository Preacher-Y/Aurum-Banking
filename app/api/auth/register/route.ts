import { NextResponse } from "next/server";
import { ID } from "node-appwrite";
import { createAdminClient, DATABASE_ID, USER_COLLECTION_ID } from "@/lib/appwrite";

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Name, email, and password are required." },
        { status: 400 }
      );
    }

    const { account, databases } = createAdminClient();

    const user = await account.create({ userId: ID.unique(), email, password, name });

    // Split full name — first word is firstName, remainder is lastName
    const parts = name.trim().split(/\s+/);
    const firstName = parts[0];
    const lastName = parts.slice(1).join(" ");

    // Create the user profile document — $id = Appwrite user ID, $createdAt managed by Appwrite
    await databases.createDocument(
      DATABASE_ID,
      USER_COLLECTION_ID,
      user.$id,
      {
        email,
        firstName,
        lastName,
        accountStatus: "active",
        onboardingComplete: false,
      }
    );

    // Send OTP to verify the email address
    await account.createEmailToken({ userId: user.$id, email });

    return NextResponse.json({ success: true, userId: user.$id, email: user.email });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error)?.message ?? "Registration failed." },
      { status: 400 }
    );
  }
}
