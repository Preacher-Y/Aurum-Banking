import { NextResponse } from "next/server";
import { createSessionClient, createAdminClient, DATABASE_ID, USER_COLLECTION_ID } from "@/lib/appwrite";

export async function GET() {
  try {
    const { account } = await createSessionClient();
    const user = await account.get();

    const { databases } = createAdminClient();
    const doc = await databases.getDocument(DATABASE_ID, USER_COLLECTION_ID, user.$id);

    // Return only fields the onboarding page needs — never expose PII like nationalId
    return NextResponse.json({
      $id: doc.$id,
      firstName: doc.firstName as string,
      lastName: doc.lastName as string,
      onboardingComplete: doc.onboardingComplete as boolean,
    });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
