import { cache } from "react";
import { createSessionClient, createAdminClient, DATABASE_ID, USER_COLLECTION_ID } from "./appwrite";

export const getSessionUser = cache(async () => {
  const { account } = await createSessionClient();
  const authUser = await account.get();
  const { databases } = createAdminClient();
  const doc = await databases.getDocument(DATABASE_ID, USER_COLLECTION_ID, authUser.$id);
  return {
    $id: doc.$id as string,
    firstName: doc.firstName as string,
    lastName: doc.lastName as string,
    email: authUser.email,
    onboardingComplete: doc.onboardingComplete as boolean,
  };
});
