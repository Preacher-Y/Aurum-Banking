import { NextResponse } from "next/server";
import { ID, AppwriteException } from "node-appwrite";
import { createAdminClient, DATABASE_ID, USER_COLLECTION_ID } from "@/lib/appwrite";

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();

    if (!email || !password || !name?.trim()) {
      return NextResponse.json(
        { error: "Name, email, and password are required." },
        { status: 400 }
      );
    }

    const { account, users, databases } = createAdminClient();

    // Create auth user
    let user;
    try {
      user = await account.create({ userId: ID.unique(), email, password, name: name.trim() });
    } catch (err) {
      if (err instanceof AppwriteException && err.code === 409) {
        return NextResponse.json(
          { error: "An account with this email already exists." },
          { status: 409 }
        );
      }
      throw err;
    }

    // Split full name — first word is firstName, remainder is lastName
    const parts = (name as string).trim().split(/\s+/);
    const firstName = parts[0];
    const lastName = parts.slice(1).join(" ");

    // Create profile document — roll back auth user if this fails
    try {
      await databases.createDocument(DATABASE_ID, USER_COLLECTION_ID, user.$id, {
        email,
        firstName,
        lastName,
        accountStatus: "active",
        onboardingComplete: false,
      });
    } catch (docErr) {
      console.error("[register] Document creation failed, rolling back auth user:", docErr);
      await users.delete(user.$id).catch((e) => console.error("[register] Rollback failed:", e));
      return NextResponse.json(
        { error: "Registration failed. Please try again." },
        { status: 500 }
      );
    }

    await account.createEmailToken({ userId: user.$id, email });

    return NextResponse.json({ success: true, userId: user.$id, email: user.email });
  } catch (error) {
    console.error("[register]", error);
    return NextResponse.json(
      { error: "Registration failed. Please try again." },
      { status: 400 }
    );
  }
}
