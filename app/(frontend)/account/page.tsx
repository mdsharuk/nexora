import type { Metadata } from "next";
import AccountDashboard from "@/components/account";

export const metadata: Metadata = {
  title: "My Account | Nexora Tech",
  description: "Manage your account, orders, wish list, and profile at Nexora Tech.",
};

export default function AccountPage() {
  return <AccountDashboard />;
}
