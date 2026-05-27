import { Client, Account, Users, Databases } from "node-appwrite";
import { cookies } from "next/headers";

export const APPWRITE_COOKIE = process.env.APPWRITE_COOKIE_ID!;
export const DATABASE_ID = process.env.APPWRITE_DATABASE_ID!;
export const USER_COLLECTION_ID = process.env.APPWRITE_USER_COLLECTION_ID!;

export function createAdminClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
    .setKey(process.env.APPWRITE_SECRET!);

  return {
    client,
    account: new Account(client),
    users: new Users(client),
    databases: new Databases(client),
  };
}

export async function createSessionClient() {
  const cookieStore = await cookies();
  const session = cookieStore.get(APPWRITE_COOKIE)?.value;

  if (!session) throw new Error("No Appwrite session cookie found");

  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
    .setSession(session);

  return {
    client,
    account: new Account(client),
  };
}
