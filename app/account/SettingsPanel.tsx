"use client";

import { useEffect, useState } from "react";
import { User, Lock, Save, Eye, EyeOff } from "lucide-react";

interface AccountUser {
  id?: string;
  name?: string | null;
  email?: string | null;
  token?: string;
}
export default function SettingsPanel({ user }: { user?: AccountUser }) {
  const [loading, setLoading] = useState(false);

  // Profile State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState<boolean | null>(null);

  // Password State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState<boolean | null>(null);

  const [submitted, setSubmitted] = useState(false);
  const [passwordSubmitted, setPasswordSubmitted] = useState(false);
  // Show Password
  const [showPasswords, setShowPasswords] = useState(false);

  // Save Profile
  const handleSaveProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);

    if (!name || !email || !phone) {
      setSuccess(false);
      setMessage("Please fill all fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setSuccess(false);
      setMessage("Please enter a valid email");
      return;
    }

    const phoneRegex = /^01[0125][0-9]{8}$/;

    if (!phoneRegex.test(phone)) {
      setSuccess(false);
      setMessage("Please enter a valid phone number");
      return;
    }

    try {
      setLoading(true);

      if (!user?.token) {
        setSuccess(false);
        setMessage("Please login first");
        return;
      }
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/users/updateMe/",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            token: user.token,
          },

          body: JSON.stringify({
            name,
            email,
            phone,
          }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      setSuccess(true);
      setMessage("Profile updated successfully");
    } catch (error) {
      console.error(error);

      setSuccess(false);

      setMessage(
        error instanceof Error ? error.message : "Failed to update profile",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
    }
  }, [user]);
  // Change Password
  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPasswordSubmitted(true);

    // Empty Fields
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordSuccess(false);
      setPasswordMessage("Please fill all password fields");
      return;
    }

    // Password Length
    if (newPassword.length < 6) {
      setPasswordSuccess(false);
      setPasswordMessage("Password must be at least 6 characters");
      return;
    }

    // Password Match
    if (newPassword !== confirmPassword) {
      setPasswordSuccess(false);
      setPasswordMessage("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      // if (status === "loading") return;

      if (!user?.token) {
        setPasswordSuccess(false);
        setPasswordMessage("Please login first");
        return;
      }
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
            token: user.token,
          },
          body: JSON.stringify({
            currentPassword,
            password: newPassword,
            rePassword: confirmPassword,
          }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      setPasswordSuccess(true);
      setPasswordMessage("Password changed successfully");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error(error);

      setPasswordSuccess(false);

      setPasswordMessage(
        error instanceof Error ? error.message : "Failed to change password",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Account Settings</h2>

        <p className="mt-1 text-sm text-gray-500">
          Update your profile information and change your password
        </p>
      </div>

      {/* PROFILE */}
      <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-600">
              <User size={22} />
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                Profile Information
              </h3>

              <p className="text-sm text-gray-500">
                Update your personal details
              </p>
            </div>
          </div>

          {submitted && message && (
            <div
              className={`mt-6 mb-6 rounded-xl border px-4 py-3 text-sm font-medium ${
                success ||
                message.includes("Please login again") ||
                message.includes("recently changed password")
                  ? "border-green-200 bg-green-50 text-green-700"
                  : "border-red-200 bg-red-50 text-red-700"
              }`}
            >
              {message}
            </div>
          )}
          <form onSubmit={handleSaveProfile} className="mt-6 space-y-4">
            <div>
              <label className="text-xs font-medium text-gray-700">
                Full Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-500"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-gray-700">
                Email Address
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-500"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-gray-700">
                Phone Number
              </label>

              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="01xxxxxxxxx"
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700 disabled:opacity-50"
            >
              <Save size={16} />

              {loading ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>

        {/* ACCOUNT INFO */}
        <div className="bg-gray-50 p-6">
          <h3 className="text-sm font-semibold text-gray-900">
            Account Information
          </h3>

          <div className="mt-4 space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-500">User ID</span>

              <span className="text-gray-400">{user?.id ?? "--"}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-500">Role</span>

              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-600">
                User
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* PASSWORD */}
      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-500">
            <Lock size={22} />
          </div>

          <div>
            <h3 className="font-semibold text-gray-900">Change Password</h3>

            <p className="text-sm text-gray-500">
              Update your account password
            </p>
          </div>
        </div>

        {passwordSubmitted && passwordMessage && (
          <div
            className={`mt-6 mb-6 rounded-xl border px-4 py-3 text-sm font-medium ${
              passwordSuccess
                ? "border-green-200 bg-green-50 text-green-700"
                : "border-red-200 bg-red-50 text-red-700"
            }`}
          >
            {passwordMessage}
          </div>
        )}

        <form onSubmit={handleChangePassword} className="mt-6 space-y-4">
          {[
            {
              label: "Current Password",
              value: currentPassword,
              setter: setCurrentPassword,
            },
            {
              label: "New Password",
              value: newPassword,
              setter: setNewPassword,
            },
            {
              label: "Confirm New Password",
              value: confirmPassword,
              setter: setConfirmPassword,
            },
          ].map((field) => (
            <div key={field.label}>
              <label className="text-xs font-medium text-gray-700">
                {field.label}
              </label>

              <div className="mt-2 flex items-center rounded-xl border border-gray-200 px-4 focus-within:border-green-500">
                <input
                  type={showPasswords ? "text" : "password"}
                  value={field.value}
                  onChange={(e) => field.setter(e.target.value)}
                  placeholder={`Enter your ${field.label.toLowerCase()}`}
                  className="w-full py-3 text-sm outline-none"
                />

                <button
                  type="button"
                  onClick={() => setShowPasswords(!showPasswords)}
                >
                  {showPasswords ? (
                    <EyeOff size={16} className="text-gray-400" />
                  ) : (
                    <Eye size={16} className="text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-orange-600 disabled:opacity-50"
          >
            <Lock size={16} />

            {loading ? "Updating..." : "Change Password"}
          </button>
        </form>
      </section>
    </div>
  );
}
