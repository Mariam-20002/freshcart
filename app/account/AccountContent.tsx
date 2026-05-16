"use client";

import Container from "@/components/ui/Container";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { useRouter, useSearchParams } from "next/navigation";
import SettingsPanel from "./SettingsPanel";
import AddressesPanel from "./AddressesPanel";
import { User, MapPin, Settings, ChevronRight } from "lucide-react";

type AccountTab = "addresses" | "settings";

interface AccountUser {
  id?: string;
  name?: string | null;
  email?: string | null;
  token?: string;
  accessToken?: string;
}

export default function AccountContent({ user }: { user?: AccountUser }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const accountUser: AccountUser | undefined = user
    ? {
        ...user,
        token: user.token || user.accessToken || "",
      }
    : undefined;

  const activeTab: AccountTab =
    searchParams.get("tab") === "addresses" ? "addresses" : "settings";

  const changeTab = (tab: AccountTab) => {
    router.push(`/account?tab=${tab}`);
  };

  return (
    <>
      <div className="w-full bg-gradient-to-r from-[#16A34A] via-[#22C55E] to-[#4ADE80] py-12">
        <div className="max-w-[1536px] mx-auto px-6 text-white">
          <Breadcrumb />

          <div className="flex items-center gap-4 mt-2">
            <div className="bg-white/20 p-3 rounded-xl text-xl">
              <User size={24} />
            </div>

            <div>
              <h1 className="text-4xl font-bold">My Account</h1>
              <p className="text-base opacity-90 mt-1">
                Manage your addresses and account settings
              </p>
            </div>
          </div>
        </div>
      </div>

      <Container>
        <section className="py-12">
          <div className="grid grid-cols-1 lg:grid-cols-[288px_1fr] gap-8">
            <aside>
              <nav className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
                <h2 className="text-sm font-semibold text-gray-900 px-2 mb-3">
                  My Account
                </h2>

                <button
                  type="button"
                  onClick={() => changeTab("addresses")}
                  className={`w-full flex items-center justify-between rounded-xl px-3 py-3 text-sm transition ${
                    activeTab === "addresses"
                      ? "bg-green-50 text-green-600 font-medium"
                      : "text-gray-600 hover:bg-gray-50 hover:text-green-600"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                        activeTab === "addresses"
                          ? "bg-green-600 text-white"
                          : "bg-gray-100"
                      }`}
                    >
                      <MapPin size={16} />
                    </span>
                    My Addresses
                  </span>
                  <ChevronRight size={16} />
                </button>

                <button
                  type="button"
                  onClick={() => changeTab("settings")}
                  className={`mt-2 w-full flex items-center justify-between rounded-xl px-3 py-3 text-sm transition ${
                    activeTab === "settings"
                      ? "bg-green-50 text-green-600 font-medium"
                      : "text-gray-600 hover:bg-gray-50 hover:text-green-600"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                        activeTab === "settings"
                          ? "bg-green-600 text-white"
                          : "bg-gray-100"
                      }`}
                    >
                      <Settings size={16} />
                    </span>
                    Settings
                  </span>
                  <ChevronRight size={16} />
                </button>
              </nav>
            </aside>

            {activeTab === "settings" ? (
              <SettingsPanel user={accountUser} />
            ) : (
              <AddressesPanel user={accountUser} />
            )}
          </div>
        </section>
      </Container>
    </>
  );
}
