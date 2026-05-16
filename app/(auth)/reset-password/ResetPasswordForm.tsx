"use client";

import { Eye, EyeOff, LockKeyhole } from "lucide-react";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { useForm, Controller } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import {
  resetPasswordSchema,
  type ResetPasswordSchemaType,
} from "./schema/resetPassword.schema";

import { resetPassword } from "../login/LoginForm/actions/_resetPassword.action";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";

import { Spinner } from "@/components/ui/spinner";

export default function ResetPasswordForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");

  const [isLoading, setLoading] = useState(false);

  const { handleSubmit, control, reset } = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(resetPasswordSchema),

    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("resetEmail");

    if (!storedEmail) {
      toast.error("Email not found");

      router.push("/forgot-password");

      return;
    }

    setEmail(storedEmail);
  }, [router]);

  async function handleResetPassword(data: ResetPasswordSchemaType) {
    if (!email) {
      toast.error("Email not found");

      return;
    }

    setLoading(true);

    try {
      const response = await resetPassword(email, data.newPassword);

      if (!response.success) {
        toast.error(response.message);

        return;
      }

      toast.success(response.message);

      sessionStorage.removeItem("resetEmail");

      reset();

      router.push("/login");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <form onSubmit={handleSubmit(handleResetPassword)} className="space-y-5">
      <FieldGroup>
        <Controller
          name="newPassword"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="space-y-3">
              <FieldLabel className="text-[15px] font-semibold text-gray-700">
                New Password
              </FieldLabel>

              <div className="relative">
                <LockKeyhole
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <Input
                  {...field}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  className="h-14 rounded-2xl border border-[#D1D5DB] bg-white pl-12 pr-12 text-[15px] shadow-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:border-green-500"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="confirmPassword"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="space-y-3">
              <FieldLabel className="text-[15px] font-semibold text-gray-700">
                Confirm Password
              </FieldLabel>

              <div className="relative">
                <LockKeyhole
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <Input
                  {...field}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                  className="h-14 rounded-2xl border border-[#D1D5DB] bg-white pl-12 pr-12 text-[15px] shadow-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:border-green-500"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition disabled:opacity-70"
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <Spinner className="w-4 h-4" />
              Resetting...
            </div>
          ) : (
            "Reset Password"
          )}
        </button>
      </FieldGroup>
    </form>
  );
}
