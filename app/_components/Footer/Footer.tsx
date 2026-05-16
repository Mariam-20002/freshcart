import Link from "next/link";
import Image from "next/image";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { Phone, Mail, MapPin } from "lucide-react";
export default function Footer() {
  return (
    <div className="bg-[#0B1A2B] text-gray-300">
      <div className="max-w-[1536px] mx-auto px-5">
        <div className="w-full px-6 md:px-16 py-12 grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-10 ">
          {/* LEFT */}
          <div className="space-y-4 max-w-[350px]">
            <div className="bg-white px-4 py-2 rounded-md inline-block">
              <Image
                src="/assets/FreshCart.svg"
                alt="logo"
                width={170}
                height={40}
                className="object-contain"
              />
            </div>

            <p className="text-[14px] text-gray-400 leading-[22px] max-w-[430px]">
              FreshCart is your one-stop destination for quality products. From
              fashion to electronics, we bring you the best brands at
              competitive prices with a seamless shopping experience.
            </p>

            <div className="space-y-3 text-sm text-gray-400">
              {/* PHONE */}
              <a
                href="tel:+18001234567"
                className="flex items-center gap-2 hover:text-white transition"
              >
                <Phone size={16} className="text-green-500" />
                <span>+1(800) 123-4567</span>
              </a>

              {/* EMAIL */}
              <a
                href="mailto:support@freshcart.com"
                className="flex items-center gap-2 hover:text-white transition"
              >
                <Mail size={16} className="text-green-500" />
                <span>support@freshcart.com</span>
              </a>

              <div className="flex items-start gap-2">
                <MapPin size={16} className="text-green-500 mt-1" />
                <span>123 Commerce Street, New York, NY 10001</span>
              </div>
            </div>

            {/* Social */}
            <div className="flex gap-3 mt-4">
              <Link
                href="#"
                className="w-9 h-9 flex items-center justify-center bg-[#13263F] rounded-full hover:bg-green-600 transition"
              >
                <FaFacebookF size={16} />
              </Link>

              <Link
                href="#"
                className="w-9 h-9 flex items-center justify-center bg-[#13263F] rounded-full hover:bg-green-600 transition"
              >
                <FaTwitter size={16} />
              </Link>

              <Link
                href="#"
                className="w-9 h-9 flex items-center justify-center bg-[#13263F] rounded-full hover:bg-green-600 transition"
              >
                <FaInstagram size={16} />
              </Link>

              <Link
                href="#"
                className="w-9 h-9 flex items-center justify-center bg-[#13263F] rounded-full hover:bg-green-600 transition"
              >
                <FaYoutube size={16} />
              </Link>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-white font-semibold mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products" className="hover:text-green-500">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-green-500">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/brands" className="hover:text-green-500">
                  Brands
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=6439d2d167d9aa4ca970649f"
                  className="hover:text-green-500"
                >
                  Electronics
                </Link>
              </li>

              <li>
                <Link
                  href="/products?category=6439d5b90049ad0b52b90048"
                  className="hover:text-green-500"
                >
                  Men's Fashion
                </Link>
              </li>

              <li>
                <Link
                  href="/products?category=6439d58a0049ad0b52b9003f"
                  className="hover:text-green-500"
                >
                  Women's Fashion
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-white font-semibold mb-4">Account</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/account" className="hover:text-green-500">
                  My Account
                </Link>
              </li>
              <li>
                <Link href="/allorders" className="hover:text-green-500">
                  Order History
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="hover:text-green-500">
                  Wishlist
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-green-500">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-green-500">
                  Sign In
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-green-500">
                  Create Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contact" className="hover:text-green-500">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/help" className="hover:text-green-500">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-green-500">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-green-500">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="hover:text-green-500">
                  Track Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="hover:text-green-500">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-green-500">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-green-500">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-[#1c2d45]">
        <div className="max-w-[1536px] mx-auto px-5 py-4 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
          <p>© 2026 FreshCart. All rights reserved.</p>

          <div className="flex gap-4 mt-2 md:mt-0">
            <span>Visa</span>
            <span>Mastercard</span>
            <span>PayPal</span>
          </div>
        </div>
      </div>
    </div>
  );
}
