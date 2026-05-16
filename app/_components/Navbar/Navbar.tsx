"use client";
import { useRouter } from "next/navigation";
import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { getCategories } from "@/app/Apis/categories.api";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import { useSearchParams } from "next/navigation";

import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import UserDropdown from "./userDropdown";

import {
  Search,
  Heart,
  ShoppingCart,
  Headphones,
  Truck,
  Gift,
  User,
  UserPlus,
  X,
  Menu,
  LogOut,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export function NavigationMenuDemo() {
  const { data, status } = useSession();

  const { data: cartData } = useQuery({
    queryKey: ["cart"],

    queryFn: async () => {
      const data = await fetch("/api/Cart");

      if (!data.ok) throw new Error("failed to fetch cart");

      return data.json();
    },
  });

  const { data: wishlistData } = useQuery({
    queryKey: ["wishlist"],

    queryFn: async () => {
      const data = await fetch("/api/Wishlist");

      if (!data.ok) throw new Error("failed to fetch cart");

      return data.json();
    },
  });

  interface Category {
    _id: string;
    name: string;
  }
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category");

  const links = [
    { path: "/", element: "home" },
    { path: "/products", element: "shop" },
    { path: "/categories", element: "categories" },
    { path: "/brands", element: "brands" },
  ];

  const [hideTopBar, setHideTopBar] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setHideTopBar(true);
      } else {
        setHideTopBar(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const staticCategories: Category[] = [
    { _id: "1", name: "Electronics" },
    { _id: "2", name: "Women's Fashion" },
    { _id: "3", name: "Men's Fashion" },
    { _id: "4", name: "Beauty & Health" },
  ];

  const [categories, setCategories] = React.useState<Category[]>([]);
  React.useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await getCategories();

        if (data && data.length > 0) {
          setCategories(data);
        } else {
          setCategories(staticCategories);
        }
      } catch (error) {
        console.error(error);
        setCategories(staticCategories);
      }
    }

    fetchCategories();
  }, []);

  const allowedCategories = [
    "Electronics",
    "Women's Fashion",
    "Men's Fashion",
    "Beauty & Health",
  ];

  const filteredCategories = categories.filter((cat: Category) =>
    allowedCategories.some((name) =>
      cat.name.toLowerCase().includes(name.toLowerCase()),
    ),
  );

  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  function handelLogout() {
    signOut({ redirect: true, callbackUrl: "/" });
  }
  const { data: session } = useSession();

  const router = useRouter();

  const [search, setSearch] = React.useState("");

  function handleSearch() {
    if (!search.trim()) return;

    router.push(`/search?q=${search}`);
  }
  return (
    <div className="w-full bg-white ">
      {/*  Top Bar */}
      <div
        className={`hidden md:flex fixed top-0 left-0 w-full z-50 bg-white border-b transition-all duration-100 ${
          hideTopBar
            ? "-translate-y-full opacity-0"
            : "translate-y-0 opacity-100"
        }`}
      >
        <div className="max-w-[1536px] mx-auto w-full px-5 flex justify-between items-center py-2 text-sm text-gray-500">
          {/* left */}
          <div className="flex gap-6 items-center">
            <div className="flex items-center gap-2">
              <Truck size={16} className="text-green-600" />
              <p>Free Shipping on Orders 500 EGP</p>
            </div>

            <div className="flex items-center gap-2">
              <Gift size={16} className="text-green-600" />
              <p>New Arrivals Daily</p>
            </div>
          </div>

          {/* right */}
          <div className="flex items-center gap-6">
            <a href="tel:+18001234567" className="hover:text-green-600">
              +1 (800) 123-4567
            </a>

            <a
              href="mailto:support@freshcart.com"
              className="hover:text-green-600"
            >
              support@freshcart.com
            </a>

            {/* divider */}
            <div className="h-5 w-px bg-gray-300"></div>

            {/* auth */}
            <div className="flex items-center gap-4">
              {status === "loading" ? null : status === "authenticated" ? (
                <>
                  <Link
                    className="flex items-center gap-1 text-sm font-medium text-gray-600 cursor-pointer hover:text-green-600"
                    href="/account"
                  >
                    <span>
                      <User size={15} />
                    </span>

                    <span className="capitalize">{data?.user?.name}</span>
                  </Link>

                  <p
                    onClick={handelLogout}
                    className="flex items-center gap-1 hover:text-red-600 cursor-pointer text-xs font-medium"
                  >
                    <span>
                      <LogOut size={15} />
                    </span>

                    <span>Sign Out</span>
                  </p>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="flex items-center gap-1 hover:text-green-600"
                  >
                    <User size={16} />
                    <span>Sign In</span>
                  </Link>

                  <Link
                    href="/register"
                    className="flex items-center gap-1 hover:text-green-600"
                  >
                    <UserPlus size={16} />
                    <span>Sign Up</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/*  Navbar */}
      <div
        className={`fixed left-0 w-full z-40 bg-white shadow-md transition-all duration-300 ${
          hideTopBar ? "top-0" : "top-0 md:top-[37px]"
        }`}
      >
        <NavigationMenu
          viewport={false}
          className="max-w-[1536px] mx-auto px-5 py-5"
        >
          <div className="flex items-center justify-between w-full">
            {/* logo */}
            <Image
              src="/assets/FreshCart.svg"
              alt="logo"
              width={170}
              height={40}
            />

            {/* search */}
            <div className="hidden md:flex items-center flex-1 max-w-md lg:max-w-xl border rounded-full overflow-hidden">
              <input
                type="text"
                placeholder="Search for products, brands and more..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
                className="flex-1 px-4 py-2 outline-none text-sm"
              />

              <button onClick={handleSearch} className="bg-green-600 px-4 py-2">
                <Search className="text-white" size={18} />
              </button>
            </div>

            {/* links */}
            <NavigationMenuList className="hidden lg:flex gap-6">
              {links.map((link) =>
                link.element === "categories" ? (
                  <NavigationMenuItem key={link.path} className="relative">
                    <NavigationMenuTrigger className="capitalize text-gray-700 hover:text-green-600 text-sm font-medium">
                      categories
                    </NavigationMenuTrigger>

                    <NavigationMenuContent>
                      <div className="w-[200px] p-4">
                        <div className="flex flex-col gap-3">
                          <h4 className="font-semibold text-sm text-gray-500">
                            Shop by Category
                          </h4>

                          <div className="h-px bg-gray-200 my-2"></div>
                          <Link
                            href="/categories"
                            className="block text-sm font-medium hover:text-green-600"
                          >
                            All Categories
                          </Link>

                          {filteredCategories.map((cat: Category) => (
                            <Link
                              key={cat._id}
                              href={`/products?category=${cat._id}`}
                              className={`block text-sm transition ${
                                activeCategory === cat._id
                                  ? "text-green-600 font-bold"
                                  : "text-gray-700 hover:text-green-600"
                              }`}
                            >
                              {cat.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem key={link.path}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={link.path}
                        className="capitalize text-gray-700 hover:text-green-600 text-sm font-medium"
                      >
                        {link.element}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ),
              )}
            </NavigationMenuList>

            {/* right side */}
            <div className="flex items-center gap-4">
              {/* desktop only */}
              <div className="hidden md:flex items-center gap-4">
                {/* support */}
                <Link
                  href="/contact"
                  className="hidden md:flex items-center gap-2 pr-4 mr-4 border-r border-gray-300 text-sm text-gray-600 hover:text-green-600 transition"
                >
                  <Headphones className="text-green-600" size={20} />

                  <div className="leading-tight">
                    <p className="text-xs text-gray-500">Support</p>
                    <p className="font-medium">24/7 Help</p>
                  </div>
                </Link>
                <Link href="/wishlist" className="relative">
                  <Heart
                    className="cursor-pointer text-gray-600 hover:text-green-600"
                    size={22}
                  />

                  {session && (
                    <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[10px] font-semibold flex items-center justify-center">
                      {wishlistData?.count || 0}
                    </span>
                  )}
                </Link>

                <Link href="/cart" className="relative">
                  <ShoppingCart
                    className="cursor-pointer text-gray-600 hover:text-green-600"
                    size={22}
                  />

                  {session && (
                    <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] px-1 rounded-full bg-green-600 text-white text-[10px] font-semibold flex items-center justify-center">
                      {cartData?.numOfCartItems || 0}
                    </span>
                  )}
                </Link>
                {/* Handle UI with status */}

                {status === "loading" ? null : status === "authenticated" ? (
                  <UserDropdown user={data?.user} />
                ) : (
                  <Link
                    href="/login"
                    className="bg-green-600 text-white px-4 py-3 rounded-full text-sm flex items-center gap-2"
                  >
                    <User size={16} />
                    <span>Sign In</span>
                  </Link>
                )}
              </div>

              {/*  mobile only */}
              <div className="flex md:hidden items-center gap-3">
                <Link href="/wishlist" className="relative">
                  <Heart size={20} className="text-gray-600" />

                  {session && (
                    <span className="absolute -top-2 -right-2 min-w-[16px] h-[16px] px-1 rounded-full bg-red-500 text-white text-[9px] font-semibold flex items-center justify-center">
                      {wishlistData?.count || 0}
                    </span>
                  )}
                </Link>

                <Link href="/cart" className="relative">
                  <ShoppingCart size={20} className="text-gray-600" />

                  {session && (
                    <span className="absolute -top-2 -right-2 min-w-[16px] h-[16px] px-1 rounded-full bg-green-600 text-white text-[9px] font-semibold flex items-center justify-center">
                      {cartData?.numOfCartItems || 0}
                    </span>
                  )}
                </Link>

                {/* menu icon */}
                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="bg-green-600 text-white p-2 rounded-full"
                  aria-label="Open mobile menu"
                >
                  <Menu size={20} />
                </button>
              </div>
            </div>
          </div>
        </NavigationMenu>
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            <div className="absolute right-0 top-0 h-full w-[78%] max-w-sm bg-white shadow-xl overflow-y-auto">
              <div className="flex items-center justify-between px-5 py-5 border-b">
                <Image
                  src="/assets/FreshCart.svg"
                  alt="logo"
                  width={150}
                  height={40}
                />

                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="bg-gray-100 text-gray-700 p-2 rounded-full"
                  aria-label="Close mobile menu"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="px-5 py-4 border-b">
                <div className="flex items-center border rounded-xl overflow-hidden">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSearch();
                        setIsMobileMenuOpen(false);
                      }
                    }}
                    className="flex-1 px-4 py-3 outline-none text-sm"
                  />

                  <button
                    onClick={() => {
                      handleSearch();
                      setIsMobileMenuOpen(false);
                    }}
                    className="bg-green-600 px-4 py-3"
                  >
                    <Search className="text-white" size={18} />
                  </button>
                </div>
              </div>

              <div className="flex flex-col px-5 py-6 gap-2">
                {links.map((link) => (
                  <Link
                    key={link.path}
                    href={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`capitalize px-4 py-3 rounded-xl text-base font-medium transition ${
                      link.element === "categories"
                        ? "bg-green-50 text-green-600"
                        : "text-gray-800 hover:bg-gray-50 hover:text-green-600"
                    }`}
                  >
                    {link.element}
                  </Link>
                ))}
              </div>

              <div className="mx-5 h-px bg-gray-200" />

              <div className="flex flex-col px-5 py-6 gap-4">
                <Link
                  href="/wishlist"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-4 text-gray-800 hover:text-green-600"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-red-50">
                    <Heart size={20} className="text-red-500" />
                  </span>
                  <span className="text-base font-medium">Wishlist</span>
                </Link>

                <Link
                  href="/cart"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-4 text-gray-800 hover:text-green-600"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-green-50">
                    <ShoppingCart size={20} className="text-green-600" />
                  </span>
                  <span className="text-base font-medium">Cart</span>
                </Link>
              </div>

              <div className="mx-5 h-px bg-gray-200" />

              <div className="flex flex-col px-5 py-6 gap-4">
                {status === "authenticated" ? (
                  <>
                    <div className="flex items-center gap-4 text-gray-800">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100">
                        <User size={20} className="text-gray-500" />
                      </span>
                      <span className="text-base font-medium capitalize">
                        {data?.user?.name}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        signOut();
                      }}
                      className="flex items-center gap-4 text-left text-red-600"
                    >
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-red-50">
                        <LogOut size={20} />
                      </span>
                      <span className="text-base font-medium">Sign Out</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-4 text-gray-800 hover:text-green-600"
                    >
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100">
                        <User size={20} />
                      </span>
                      <span className="text-base font-medium">Sign In</span>
                    </Link>

                    <Link
                      href="/register"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-4 text-gray-800 hover:text-green-600"
                    >
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-green-50">
                        <UserPlus size={20} className="text-green-600" />
                      </span>
                      <span className="text-base font-medium">Sign Up</span>
                    </Link>
                  </>
                )}
              </div>

              <div className="mx-5 mb-5 rounded-xl border bg-gray-50 p-4">
                <Link
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-4"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-green-100">
                    <Headphones size={20} className="text-green-600" />
                  </span>

                  <div>
                    <p className="font-semibold text-gray-800">Need Help?</p>
                    <p className="text-sm text-green-600">Contact Support</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
