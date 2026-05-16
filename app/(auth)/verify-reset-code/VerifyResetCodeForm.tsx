"use client";

import { useState } from "react";

import Link from "next/link";

import { useRouter } from "next/navigation";

import { useForm, Controller } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import { Shield, ArrowLeft } from "lucide-react";
import { forgotPassword } from "../login/LoginForm/actions/_forgotPassword.action";
import {
  verifyResetCodeSchema,
  type VerifyResetCodeSchemaType,
} from "./schema/verifyResetCode.schema";

import { verifyResetCode } from "../login/LoginForm/actions/_verifyResetCode.action";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";

import { Spinner } from "@/components/ui/spinner";

export default function VerifyResetCodeForm() {
  const router = useRouter();

  const [isLoading, setLoading] = useState(false);

  const { handleSubmit, control } = useForm<VerifyResetCodeSchemaType>({
    resolver: zodResolver(verifyResetCodeSchema),

    defaultValues: {
      resetCode: "",
    },
  });

  async function handleVerifyCode(data: VerifyResetCodeSchemaType) {
    setLoading(true);

    try {
      const response = await verifyResetCode(data.resetCode);

      if (!response.success) {
        toast.error(response.message);

        return;
      }

      toast.success(response.message);

      router.push("/reset-password");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      {/* FORM */}
      <form onSubmit={handleSubmit(handleVerifyCode)} className="space-y-7">
        <FieldGroup>
          <Controller
            name="resetCode"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="space-y-2">
                <FieldLabel className="text-[15px] font-semibold text-[#374151]">
                  Verification Code
                </FieldLabel>

                <div className="relative">
                  <Shield
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
                  />

                  {/* DOTS */}
                  {!field.value && (
                    <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 gap-3 pointer-events-none">
                      {Array.from({ length: 6 }).map((_, index) => (
                        <div
                          key={index}
                          className="h-3 w-3 rounded-full bg-[#9CA3AF]"
                        />
                      ))}
                    </div>
                  )}

                  <Input
                    {...field}
                    type="text"
                    maxLength={6}
                    className="h-14 rounded-2xl border border-[#D1D5DB] bg-white pl-12 text-center text-[22px] tracking-[18px] font-bold shadow-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:border-green-500"
                  />
                </div>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* RESEND */}
          <div className="text-center">
            <p className="text-[15px] text-gray-500">
              Didn&apos;t receive the code?{" "}
              <button
                type="button"
                disabled={isLoading}
                onClick={async () => {
                  const email = sessionStorage.getItem("resetEmail");

                  if (!email) {
                    toast.error("Email not found. Please try again.");

                    return;
                  }

                  try {
                    setLoading(true);

                    const response = await forgotPassword(email);

                    if (!response.success) {
                      toast.error(response.message);

                      return;
                    }

                    toast.success("A new code has been sent");
                  } catch (error) {
                    toast.error("Failed to resend code");
                  } finally {
                    setLoading(false);
                  }
                }}
                className="font-semibold text-green-600 hover:text-green-700 transition disabled:opacity-60"
              >
                Resend Code
              </button>
            </p>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-14 rounded-2xl bg-[#16A34A] text-white text-[16px] font-bold hover:bg-[#15803D] transition-all duration-300 disabled:opacity-70 shadow-[0_10px_25px_rgba(34,197,94,0.18)]"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <Spinner className="w-4 h-4" />

                <span>Verifying...</span>
              </div>
            ) : (
              "Verify Code"
            )}
          </button>
        </FieldGroup>
      </form>

      {/* BACK */}
      <div className="text-center">
        <Link
          href="/forgot-password"
          className="inline-flex items-center gap-2 text-[15px] font-medium text-gray-500 hover:text-green-600 transition"
        >
          <ArrowLeft size={16} />

          <span>Change email address</span>
        </Link>
      </div>
    </div>
  );
}
