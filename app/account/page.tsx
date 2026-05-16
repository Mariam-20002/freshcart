import { getServerSession } from "next-auth";
import { nextAuthConfig } from "@/app/Auth";
import AccountContent from "./AccountContent";

export default async function AccountPage() {
  const session = await getServerSession(nextAuthConfig);

  return <AccountContent user={session?.user} />;
}
