import { NextResponse } from "next/server";
import { AppwriteException } from "node-appwrite";
import { createSessionClient, createAdminClient, DATABASE_ID, USER_COLLECTION_ID } from "@/lib/appwrite";

const ALLOWED_FIELDS = [
  "firstName", "lastName", "dateOfBirth", "nationalId",
  "phone", "gender", "country", "city", "streetAddress",
] as const;

export async function PATCH(req: Request) {
  try {
    const { account } = await createSessionClient();
    const user = await account.get();

    const body = await req.json();

    // Only allow known onboarding fields — onboardingComplete is always set server-side
    const sanitized: Record<string, unknown> = {};
    for (const field of ALLOWED_FIELDS) {
      if (field in body && body[field] !== undefined && body[field] !== null && body[field] !== "") {
        sanitized[field] = body[field];
      }
    }
    sanitized.onboardingComplete = true;

    const { databases } = createAdminClient();
    await databases.updateDocument(DATABASE_ID, USER_COLLECTION_ID, user.$id, sanitized);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[onboarding]", err);
    if (err instanceof AppwriteException && err.code === 401) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }
    return NextResponse.json(
      { error: "Failed to save your information. Please try again." },
      { status: 500 }
    );
  }
}
