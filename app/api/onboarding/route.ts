import { NextResponse } from "next/server";
import { createSessionClient, createAdminClient, DATABASE_ID, USER_COLLECTION_ID } from "@/lib/appwrite";

export async function PATCH(req: Request) {
  try {
    const { account } = await createSessionClient();
    const user = await account.get();

    const body = await req.json();
    const { databases } = createAdminClient();

    await databases.updateDocument(
      DATABASE_ID,
      USER_COLLECTION_ID,
      user.$id,
      body
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error)?.message ?? "Failed to save onboarding data." },
      { status: 400 }
    );
  }
}
