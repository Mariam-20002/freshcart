"use client";

import Link from "next/link";
import { useState } from "react";

import {
  FaHeadset,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaPaperPlane,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaSpinner,
  FaCheck,
} from "react-icons/fa";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setLoading(true);
    setSuccess(false);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setLoading(false);
    setSuccess(true);

    form.reset();
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* HERO */}
      <section className="bg-[#22C55E] py-10">
        <div className="container mx-auto  px-4">
          {/* breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-[13px] text-white/80">
            <Link href="/" className="hover:text-white">
              Home
            </Link>

            <span>/</span>

            <span className="font-medium text-white">Contact Us</span>
          </div>

          {/* hero content */}
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15">
              <FaHeadset className="text-[26px] text-white" />
            </div>

            <div>
              <h1 className="text-[34px] font-bold text-white">Contact Us</h1>

              <p className="mt-2 text-[14px] text-white/90">
                We’d love to hear from you. Get in touch with our team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="container mx-auto  px-4 py-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* LEFT */}
          <div className="space-y-5">
            {/* CARD */}
            {[
              {
                icon: <FaPhoneAlt size={16} />,
                title: "Phone",
                desc: "Mon-Fri from 8am to 6pm",
                value: "+1 (800) 123-4567",
              },
              {
                icon: <FaEnvelope size={16} />,
                title: "Email",
                desc: "We'll respond within 24 hours",
                value: "support@freshcart.com",
              },
              {
                icon: <FaMapMarkerAlt size={16} />,
                title: "Office",
                desc: "123 Commerce Street\nNew York, NY 10001\nUnited States",
              },
              {
                icon: <FaClock size={16} />,
                title: "Business Hours",
                desc: "Monday - Friday: 8am - 6pm\nSaturday: 9am - 4pm\nSunday: Closed",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-600">
                    {item.icon}
                  </div>

                  <div>
                    <h3 className="text-[18px] font-semibold text-[#0F172A]">
                      {item.title}
                    </h3>

                    <p className="mt-2 whitespace-pre-line text-[13px] leading-6 text-[#64748B]">
                      {item.desc}
                    </p>

                    {item.value && (
                      <p className="mt-2 text-[18px] font-bold text-[#16A34A]">
                        {item.value}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* SOCIAL */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <h3 className="mb-4 text-[18px] font-semibold text-[#0F172A]">
                Follow Us
              </h3>

              <div className="flex items-center gap-3">
                {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map(
                  (Icon, index) => (
                    <button
                      key={index}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-[14px] text-gray-500 transition hover:bg-green-600 hover:text-white"
                    >
                      <Icon />
                    </button>
                  ),
                )}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-2">
            {/* FORM */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              {/* SUCCESS MESSAGE */}
              {success && (
                <div className="mb-6 flex items-start gap-3 rounded-2xl border border-green-200 bg-[#F0FDF4] p-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <FaCheck size={12} />
                  </div>

                  <div>
                    <h4 className="text-[15px] font-bold text-green-700">
                      Message sent successfully!
                    </h4>

                    <p className="mt-1 text-[13px] text-green-600">
                      We’ll get back to you as soon as possible.
                    </p>
                  </div>
                </div>
              )}

              {/* HEADER */}
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-600">
                  <FaHeadset size={16} />
                </div>

                <div>
                  <h2 className="text-[26px] font-bold text-[#0F172A]">
                    Send us a Message
                  </h2>

                  <p className="mt-1 text-[13px] text-[#64748B]">
                    Fill out the form and we&apos;ll get back to you
                  </p>
                </div>
              </div>

              {/* FORM */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* ROW */}
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  {/* NAME */}
                  <div>
                    <label className="mb-2 block text-[14px] font-medium text-[#0F172A]">
                      Full Name
                    </label>
                    <input
                      required
                      type="text"
                      name="name"
                      autoComplete="name"
                      placeholder="John Doe"
                      className="h-12 w-full rounded-xl border border-gray-200 px-4 text-[14px] outline-none transition focus:border-[#16A34A] focus:ring-2 focus:ring-green-100"
                    />
                  </div>

                  {/* EMAIL */}
                  <div>
                    <label className="mb-2 block text-[14px] font-medium text-[#0F172A]">
                      Email Address
                    </label>

                    <input
                      required
                      type="email"
                      name="email"
                      autoComplete="email"
                      placeholder="john@example.com"
                      className="h-12 w-full rounded-xl border border-gray-200 px-4 text-[14px] outline-none transition focus:border-[#16A34A] focus:ring-2 focus:ring-green-100"
                    />
                  </div>
                </div>

                {/* SUBJECT */}
                <div>
                  <label className="mb-2 block text-[14px] font-medium text-[#0F172A]">
                    Subject
                  </label>

                  <div className="relative">
                    <select
                      required
                      defaultValue=""
                      className="
                        h-12
                        w-full
                        appearance-none
                        rounded-xl
                        border
                        border-gray-200
                        bg-white
                        px-4
                        pr-12
                        text-[14px]
                        outline-none
                        transition
                        focus:border-[#16A34A]
                        focus:ring-2
                        focus:ring-green-100
                      "
                    >
                      <option value="" disabled hidden>
                        Select a subject
                      </option>

                      <option>General Inquiry</option>
                      <option>Order Support</option>
                      <option>Shipping Question</option>
                      <option>Returns & Refunds</option>
                      <option>Product Information</option>
                      <option>Feedback & Suggestions</option>
                      <option>Other</option>
                    </select>

                    <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[12px] text-gray-500">
                      ▼
                    </div>
                  </div>
                </div>

                {/* MESSAGE */}
                <div>
                  <label className="mb-2 block text-[14px] font-medium text-[#0F172A]">
                    Message
                  </label>

                  <textarea
                    required
                    rows={5}
                    placeholder="How can we help you?"
                    className="min-h-[140px] w-full rounded-xl border border-gray-200 p-4 text-[14px] outline-none transition focus:border-[#16A34A] focus:ring-2 focus:ring-green-100"
                  />
                </div>

                {/* BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  className="
                    inline-flex
                    h-11
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-[#16A34A]
                    px-6
                    text-[14px]
                    font-semibold
                    text-white
                    transition
                    hover:bg-green-700
                    disabled:cursor-not-allowed
                    disabled:opacity-70
                  "
                >
                  {loading ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* HELP CENTER */}
            <div className="mt-6 rounded-2xl bg-[#F0FDF4] p-5">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-green-600 shadow-sm">
                  ?
                </div>

                <div>
                  <h3 className="text-[18px] font-semibold text-[#0F172A]">
                    Looking for quick answers?
                  </h3>

                  <p className="mt-2 max-w-[700px] text-[13px] leading-6 text-[#64748B]">
                    Check out our Help Center for frequently asked questions
                    about orders, shipping, returns, and more.
                  </p>

                  <Link
                    href="/help"
                    className="mt-3 inline-flex items-center gap-2 text-[14px] font-semibold text-green-600 hover:text-green-700"
                  >
                    Visit Help Center →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
