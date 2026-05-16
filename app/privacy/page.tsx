"use client";

import Link from "next/link";

import {
  Shield,
  Database,
  UserCheck,
  Lock,
  Share2,
  Cookie,
  Clock3,
  Mail,
} from "lucide-react";

const privacyArticles = [
  {
    id: "ARTICLE 1",
    title: "Information We Collect",
    icon: Database,
    items: [
      {
        id: "1.1",
        title: "Personal Data",
        desc: "Name, email address, phone number, and shipping address.",
      },
      {
        id: "1.2",
        title: "Payment Data",
        desc: "Credit card information processed securely through our payment providers.",
      },
      {
        id: "1.3",
        title: "Technical Data",
        desc: "IP address, browser type, device information, and access times.",
      },
      {
        id: "1.4",
        title: "Usage Data",
        desc: "Pages viewed, products browsed, and actions taken within our platform.",
      },
    ],
  },

  {
    id: "ARTICLE 2",
    title: "How We Use Your Information",
    icon: UserCheck,
    items: [
      {
        id: "2.1",
        desc: "To process and fulfill your orders.",
      },
      {
        id: "2.2",
        desc: "To send order confirmations and shipping updates.",
      },
      {
        id: "2.3",
        desc: "To provide customer support and respond to inquiries.",
      },
      {
        id: "2.4",
        desc: "To improve our products, services, and user experience.",
      },
      {
        id: "2.5",
        desc: "To send promotional communications (with your consent).",
      },
    ],
  },

  {
    id: "ARTICLE 3",
    title: "Data Protection",
    icon: Lock,
    items: [
      {
        id: "3.1",
        desc: "We implement industry-standard encryption (SSL/TLS) for all data transfers.",
      },
      {
        id: "3.2",
        desc: "Payment information is processed by PCI-compliant payment providers.",
      },
      {
        id: "3.3",
        desc: "We conduct regular security audits and vulnerability assessments.",
      },
      {
        id: "3.4",
        desc: "Access to personal data is restricted to authorized personnel only.",
      },
    ],
  },

  {
    id: "ARTICLE 4",
    title: "Information Sharing",
    icon: Share2,
    items: [
      {
        id: "4.1",
        desc: "We do not sell, trade, or rent your personal information to third parties.",
      },
      {
        id: "4.2",
        desc: "We may share data with trusted service providers who assist in our operations.",
      },
      {
        id: "4.3",
        desc: "We may disclose information when required by law or to protect our rights.",
      },
    ],
  },

  {
    id: "ARTICLE 5",
    title: "Your Rights",
    icon: Shield,
    items: [
      {
        id: "5.1",
        title: "Access",
        desc: "Request a copy of your personal data.",
      },
      {
        id: "5.2",
        title: "Rectification",
        desc: "Request correction of inaccurate data.",
      },
      {
        id: "5.3",
        title: "Erasure",
        desc: "Request deletion of your personal data.",
      },
      {
        id: "5.4",
        title: "Portability",
        desc: "Request your data in a portable format.",
      },
      {
        id: "5.5",
        title: "Opt-out",
        desc: "Unsubscribe from marketing communications at any time.",
      },
    ],
  },

  {
    id: "ARTICLE 6",
    title: "Cookies",
    icon: Cookie,
    items: [
      {
        id: "6.1",
        desc: "We use cookies to enhance your browsing experience and remember preferences.",
      },
      {
        id: "6.2",
        desc: "You can control cookie settings through your browser preferences.",
      },
      {
        id: "6.3",
        desc: "Disabling cookies may affect the functionality of certain features.",
      },
    ],
  },

  {
    id: "ARTICLE 7",
    title: "Data Retention",
    icon: Clock3,
    items: [
      {
        id: "",
        desc: "We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy, or as required by law. Account data is deleted within 30 days of account closure upon request.",
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
            For questions about this Privacy Policy or to exercise your rights,
            contact our Data Protection Officer at{" "}
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

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#22C55E] py-10 lg:py-20">
        {/* Blur */}
        <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

        <div className="container relative z-10 mx-auto px-4">
          {/* Breadcrumb */}
          <div className="mb-10 flex items-center gap-2 text-sm text-white/80">
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>

            <span>/</span>

            <span className="font-medium text-white">Privacy Policy</span>
          </div>

          {/* Hero Content */}
          <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-[20px] bg-white/15 shadow-2xl backdrop-blur-md">
              <Shield className="h-12 w-12 text-white" />
            </div>

            <div>
              <h1 className="text-5xl font-extrabold tracking-tight text-white lg:text-7xl">
                Privacy Policy
              </h1>

              <p className="mt-4 text-xl text-white/90">
                Last updated: February 2026
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="container mx-auto px-4 py-10 lg:py-14">
        {/* Intro */}
        <div className="mb-10 rounded-3xl border border-green-100 bg-[#F0FDF4] p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#22C55E] text-white shadow-md">
              <Shield className="h-7 w-7" />
            </div>

            <div>
              <h2 className="text-3xl font-bold text-[#0F172A]">
                Your Privacy Matters
              </h2>

              <p className="mt-3 max-w-5xl text-[15px] leading-8 text-[#475569]">
                This Privacy Policy describes how FreshCart collects, uses, and
                protects your personal information when you use our services. We
                are committed to ensuring that your privacy is protected.
              </p>
            </div>
          </div>
        </div>

        {/* Articles */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {privacyArticles.map((article) => {
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
                  {article.items.map((item) => (
                    <div key={item.id} className="flex items-start gap-3">
                      <div className="flex h-7 min-w-[28px] items-center justify-center rounded-lg bg-[#F0FDF4] text-xs font-bold text-[#22C55E]">
                        {item.id}
                      </div>

                      <p className="text-[14px] leading-7 text-[#475569]">
                        {"title" in item && item.title && (
                          <span className="font-bold text-[#0F172A]">
                            {item.title}:{" "}
                          </span>
                        )}

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
            ← Back to Home
          </Link>

          <Link
            href="/terms"
            className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-[#22C55E] px-8 text-[15px] font-semibold text-white shadow-lg shadow-green-200 transition hover:bg-[#16A34A]"
          >
            View Terms of Service →
          </Link>
        </div>
      </section>
    </div>
  );
}
