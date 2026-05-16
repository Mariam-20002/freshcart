"use client";

import Link from "next/link";

import {
  FileText,
  BadgeCheck,
  User,
  CreditCard,
  Truck,
  RotateCcw,
  Scale,
  Mail,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

const termsArticles = [
  {
    id: "ARTICLE 1",
    title: "Acceptance of Terms",
    icon: BadgeCheck,
    items: [
      {
        id: "1.1",
        desc: "By accessing or using the Service, you acknowledge that you have read, understood, and agree to be bound by these Terms.",
      },
      {
        id: "1.2",
        desc: "If you do not agree to these Terms, you must not access or use the Service.",
      },
      {
        id: "1.3",
        desc: "We reserve the right to modify these Terms at any time and such modifications shall be effective immediately upon posting.",
      },
    ],
  },

  {
    id: "ARTICLE 2",
    title: "User Eligibility",
    icon: User,
    items: [
      {
        id: "2.1",
        desc: "The Service is intended for users who are at least eighteen (18) years of age.",
      },
      {
        id: "2.2",
        desc: "By using the Service, you represent and warrant that you are of legal age to form a binding contract.",
      },
      {
        id: "2.3",
        desc: "If you are accessing the Service on behalf of a legal entity, you represent that you have the authority to bind such entity.",
      },
    ],
  },

  {
    id: "ARTICLE 3",
    title: "Account Registration",
    icon: FileText,
    items: [
      {
        id: "3.1",
        desc: "You may be required to create an account to access certain features of the Service.",
      },
      {
        id: "3.2",
        desc: "You agree to provide accurate, current, and complete information during registration.",
      },
      {
        id: "3.3",
        desc: "You are solely responsible for maintaining the confidentiality of your account credentials.",
      },
      {
        id: "3.4",
        desc: "You agree to notify us immediately of any unauthorized use of your account.",
      },
    ],
  },

  {
    id: "ARTICLE 4",
    title: "Orders and Payments",
    icon: CreditCard,
    items: [
      {
        id: "4.1",
        desc: "All orders placed through the Service are subject to acceptance and availability.",
      },
      {
        id: "4.2",
        desc: "Prices are subject to change without notice prior to order confirmation.",
      },
      {
        id: "4.3",
        desc: "Payment must be made in full at the time of purchase through approved payment methods.",
      },
      {
        id: "4.4",
        desc: "We reserve the right to refuse or cancel any order at our sole discretion.",
      },
    ],
  },

  {
    id: "ARTICLE 5",
    title: "Shipping and Delivery",
    icon: Truck,
    items: [
      {
        id: "5.1",
        desc: "Shipping times are estimates only and are not guaranteed.",
      },
      {
        id: "5.2",
        desc: "Risk of loss and title for items purchased pass to you upon delivery to the carrier.",
      },
      {
        id: "5.3",
        desc: "We are not responsible for delays caused by carriers, customs, or other factors beyond our control.",
      },
    ],
  },

  {
    id: "ARTICLE 6",
    title: "Returns and Refunds",
    icon: RotateCcw,
    items: [
      {
        id: "6.1",
        desc: "Our return policy allows returns within 14 days of delivery for most items.",
      },
      {
        id: "6.2",
        desc: "Products must be unused and in original packaging.",
      },
      {
        id: "6.3",
        desc: "Refunds will be processed within 5-7 business days after receiving the returned item.",
      },
    ],
  },

  {
    id: "ARTICLE 7",
    title: "Limitation of Liability",
    icon: Scale,
    items: [
      {
        desc: "To the maximum extent permitted by applicable law, FreshCart shall not be liable for any indirect, incidental, special, consequential, or punitive damages.",
      },
    ],
  },

  {
    id: "ARTICLE 8",
    title: "Contact Us",
    icon: Mail,
    items: [
      {
        id: "8.1",
        desc: (
          <>
            If you have any questions about these Terms, please contact us at{" "}
            <a
              href="mailto:support@freshcart.com"
              className="font-medium text-[#16A34A] hover:underline"
            >
              support@freshcart.com
            </a>
          </>
        ),
      },
    ],
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#22C55E] py-16 lg:py-20">
        <div className="absolute -left-20 top-0 h-52 w-52 rounded-full bg-white/10 blur-3xl" />

        <div className="absolute bottom-0 right-0 h-52 w-52 rounded-full bg-white/10 blur-3xl" />

        <div className="container relative z-10 mx-auto px-4">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-sm text-white/80">
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>

            <span>/</span>

            <span className="font-medium text-white">Terms of Service</span>
          </div>

          {/* Hero Content */}
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-[20px] bg-white/15 shadow-2xl backdrop-blur-md">
              <FileText className="h-8 w-8 text-white" />
            </div>

            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-white lg:text-5xl">
                Terms of Service
              </h1>

              <p className="mt-2 text-base text-white/90">
                Last updated: February 2026
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="container mx-auto px-4 py-10 lg:py-14">
        {/* Intro */}
        <div className="mb-10 rounded-3xl border border-[#FCD34D] bg-[#FFF7ED] p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F59E0B] text-white shadow-md">
              <FileText className="h-7 w-7" />
            </div>

            <div>
              <h2 className="text-3xl font-bold text-[#9A3412]">
                Important Notice
              </h2>

              <p className="mt-3 max-w-5xl text-[15px] leading-8 text-[#9A3412]">
                By accessing and using FreshCart, you accept and agree to be
                bound by the terms and provisions of this agreement. Please read
                these terms carefully before using our services.
              </p>
            </div>
          </div>
        </div>

        {/* Articles */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {termsArticles.map((article) => {
            const Icon = article.icon;

            return (
              <div
                key={article.id}
                className="group rounded-3xl border border-[#DCFCE7] bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Header */}
                <div className="mb-5 flex items-start gap-4">
                  <div className="flex h-14 w-14 min-w-[56px] items-center justify-center rounded-2xl bg-[#DCFCE7] text-[#16A34A] transition group-hover:bg-[#22C55E] group-hover:text-white">
                    <Icon className="h-7 w-7" />
                  </div>

                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-[0.15em] text-[#22C55E]">
                      {article.id}
                    </p>

                    <h3 className="mt-1 text-[24px] font-extrabold leading-tight text-[#0F172A]">
                      {article.title}
                    </h3>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-4">
                  {article.items.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      {"id" in item && item.id && (
                        <div className="flex h-7 min-w-[28px] items-center justify-center rounded-lg bg-[#F0FDF4] text-xs font-bold text-[#22C55E]">
                          {item.id}
                        </div>
                      )}

                      <p className="text-[14px] leading-7 text-[#475569]">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 flex flex-col gap-4 border-t border-gray-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/"
            className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-6 text-[15px] font-semibold text-[#0F172A] shadow-sm transition hover:border-[#22C55E] hover:text-[#16A34A]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <Link
            href="/privacy"
            className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-[#22C55E] px-8 text-[15px] font-semibold text-white shadow-lg shadow-green-200 transition hover:bg-[#16A34A]"
          >
            View Privacy Policy
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
