"use client";

import { useEffect, useRef, useState } from "react";
import { User, LogOut, Heart, Package, Settings, MapPin } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import type { Session } from "next-auth";

type UserDropdownProps = {
  user?: Session["user"];
};

export default function UserDropdown({ user }: UserDropdownProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const closeDropdown = () => setOpen(false);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition"
        aria-label="Open user menu"
      >
        <User size={20} />
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-72 bg-white shadow-xl rounded-2xl border border-gray-200 p-4 z-50">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
              <User size={20} />
            </div>

            <div className="min-w-0">
              <p className="font-medium text-gray-800 truncate">
                {user?.name || "User"}
              </p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
          </div>

          <div className="h-px bg-gray-200 my-2" />

          <div className="flex flex-col gap-2 text-sm">
            <Link
              href="/account?tab=addresses"
              onClick={closeDropdown}
              className="flex items-center gap-3 p-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-green-600 transition"
            >
              <User size={16} />
              My Profile
            </Link>

            <Link
              href="/allorders"
              onClick={closeDropdown}
              className="flex items-center gap-3 p-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-green-600 transition"
            >
              <Package size={16} />
              My Orders
            </Link>

            <Link
              href="/wishlist"
              onClick={closeDropdown}
              className="flex items-center gap-3 p-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-green-600 transition"
            >
              <Heart size={16} />
              My Wishlist
            </Link>

            <Link
              href="/account?tab=addresses"
              onClick={closeDropdown}
              className="flex items-center gap-3 p-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-green-600 transition"
            >
              <MapPin size={16} />
              Addresses
            </Link>

            <Link
              href="/account?tab=settings"
              onClick={closeDropdown}
              className="flex items-center gap-3 p-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-green-600 transition"
            >
              <Settings size={16} />
              Settings
            </Link>
          </div>

          <div className="h-px bg-gray-200 my-3" />

          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex items-center gap-3 p-2 rounded-lg text-red-500 hover:bg-red-50 transition text-sm w-full"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
