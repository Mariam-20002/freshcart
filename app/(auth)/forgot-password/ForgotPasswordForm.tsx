"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

import { useState } from "react";

import { useForm, Controller } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import { Mail, ArrowLeft, KeyRound, Lock } from "lucide-react";

import {
  forgotPasswordSchema,
  type ForgotPasswordSchemaType,
} from "./schema/forgotPassword.schema";

import { forgotPassword } from "../login/LoginForm/actions/_forgotPassword.action";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";

import { Spinner } from "@/components/ui/spinner";

export default function ForgotPasswordForm() {
  const router = useRouter();

  const [isLoading, setLoading] = useState(false);

  const { handleSubmit, control, reset } = useForm<ForgotPasswordSchemaType>({
    resolver: zodResolver(forgotPasswordSchema),

    defaultValues: {
      email: "",
    },
  });

  async function handleForgotPassword(data: ForgotPasswordSchemaType) {
    setLoading(true);

    try {
      const response = await forgotPassword(data.email);

      if (!response.success) {
        toast.error(response.message);

        return;
      }

      toast.success(response.message);

      sessionStorage.setItem("resetEmail", data.email);

      reset();

      router.push("/verify-reset-code");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      {/* STEPS */}
      <div className="flex items-center justify-center gap-4">
        {/* STEP 1 */}
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-600 shadow-[0_4px_12px_rgba(34,197,94,0.25)]">
            <Mail size={18} className="text-white" />
          </div>

          <div className="h-[2px] w-16 bg-gray-200" />
        </div>

        {/* STEP 2 */}
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
            <KeyRound size={18} className="text-gray-400" />
          </div>

          <div className="h-[2px] w-16 bg-gray-200" />
        </div>

        {/* STEP 3 */}
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
          <Lock size={18} className="text-gray-400" />
        </div>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit(handleForgotPassword)} className="space-y-7">
        <FieldGroup>
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="space-y-2">
                <FieldLabel className="text-[15px] font-semibold text-[#374151]">
                  Email Address
                </FieldLabel>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
                  />

                  <Input
                    {...field}
                    type="email"
                    placeholder="Enter your email address"
                    className="h-14 rounded-2xl border border-[#D1D5DB] bg-white pl-12 pr-4 text-[15px] font-medium placeholder:text-[#9CA3AF] shadow-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:border-green-500"
                  />
                </div>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* BUTTON */}
          <button
            type="submit"
            disabled={isLoading}
            className="mt-1 w-full h-14 rounded-2xl bg-[#16A34A] text-white text-[16px] font-bold hover:bg-[#15803D] transition-all duration-300 disabled:opacity-70 shadow-[0_10px_25px_rgba(34,197,94,0.18)]"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <Spinner className="w-4 h-4" />

                <span className="font-semibold">Sending...</span>
              </div>
            ) : (
              "Send Reset Code"
            )}
          </button>
        </FieldGroup>
      </form>

      {/* BACK */}
      <div className="text-center">
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-[15px] font-medium text-green-600 hover:text-green-700 transition"
        >
          <ArrowLeft size={16} />

          <span>Back to Sign In</span>
        </Link>
      </div>

      {/* DIVIDER */}
      <div className="border-t border-gray-100 pt-6 text-center">
        <p className="text-[15px] text-gray-500">
          Remember your password?{" "}
          <Link
            href="/login"
            className="font-semibold text-green-600 hover:text-green-700 transition"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
