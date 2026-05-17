"use client";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Link from "next/link";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { FaGoogle } from "react-icons/fa6";
import { SiFacebook } from "react-icons/si";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerSchema,
  type registerSchemaType,
} from "../schema/register.schema";
import { useForm, Controller } from "react-hook-form";
import { registerFn } from "../Actions/register.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";

export default function RegisterForm() {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  const { handleSubmit, control, reset, watch } = useForm<registerSchemaType>({
    resolver: zodResolver(registerSchema),
    mode: "onSubmit",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
      terms: false,
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  async function handleRegister(data: registerSchemaType) {
    setLoading(true);
    try {
      const isSuccessfulRegister = await registerFn(data);
      if (isSuccessfulRegister) {
        toast.success("user created successfuly", {
          position: "top-right",
        });
        setTimeout(() => router.push("/login"), 500);
        reset();
      }
    } catch (error: any) {
      toast.error(error.message, { position: "top-right" });
    } finally {
      setLoading(false);
    }
  }

  const getPasswordStrength = (password: string) => {
    if (!password) {
      return { label: "Weak", color: "bg-gray-300", width: "0%" };
    }

    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[#?!@$%^&*-]/.test(password)) score++;

    switch (score) {
      case 0:
      case 1:
        return { label: "Weak", color: "bg-red-500", width: "20%" };

      case 2:
        return { label: "Fair", color: "bg-orange-500", width: "40%" };

      case 3:
        return { label: "Good", color: "bg-blue-500", width: "60%" };

      case 4:
        return { label: "Strong", color: "bg-green-400", width: "80%" };

      case 5:
        return { label: "Very Strong", color: "bg-green-600", width: "100%" };

      default:
        return { label: "Weak", color: "bg-gray-300", width: "0%" };
    }
  };

  const password = watch("password");
  const terms = watch("terms");
  const strength = getPasswordStrength(password || "");

  return (
    <form onSubmit={handleSubmit(handleRegister)} className="space-y-6">
      <FieldGroup className="space-y-5">
        {/*  Social Buttons */}
        <div className="flex gap-4">
          <button
            type="button"
            className="flex items-center justify-center gap-2 flex-1 border border-gray-200 rounded-lg py-2.5 text-sm font-medium hover:bg-gray-50 cursor-pointer transition"
          >
            <FaGoogle className="text-red-500 text-lg" />
            Google
          </button>

          <button
            type="button"
            className="flex items-center justify-center gap-2 flex-1 border border-gray-200 rounded-lg py-2.5 text-sm font-medium hover:bg-gray-50 cursor-pointer transition"
          >
            <SiFacebook className="text-blue-600 text-lg" />
            Facebook
          </button>
        </div>

        {/* OR */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-[1px] bg-gray-200" />
          <span>or</span>
          <div className="flex-1 h-[1px] bg-gray-200" />
        </div>

        {/* name */}
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="space-y-2">
              <FieldLabel className="text-sm font-medium">
                Name<span className="text-red-500">*</span>
              </FieldLabel>
              <Input {...field} placeholder="Ali" className="h-11 rounded-lg" />
              {fieldState.error && (
                <p className="text-red-500 text-sm">
                  {fieldState.error.message}
                </p>
              )}
            </Field>
          )}
        />

        {/* email */}
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="space-y-2">
              <FieldLabel className="text-sm font-medium">
                Email<span className="text-red-500">*</span>
              </FieldLabel>
              <Input
                {...field}
                type="email"
                placeholder="ali@example.com"
                className="h-11 rounded-lg"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* password */}
        <Controller
          name="password"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="space-y-2">
              <FieldLabel className="text-sm font-medium">
                Password<span className="text-red-500">*</span>
              </FieldLabel>

              <div className="relative">
                <Input
                  {...field}
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  className="h-11 rounded-lg pr-10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}

              <div className="mt-2">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-gray-200 rounded">
                    <div
                      className={`h-2 rounded ${strength.color}`}
                      style={{ width: strength.width }}
                    />
                  </div>

                  <span className="text-sm font-medium min-w-[50px] text-right">
                    {strength.label}
                  </span>
                </div>

                <p className="text-xs text-gray-400 mt-1">
                  {password.length < 8 && "Must be at least 8 characters"}
                  {!/[A-Z]/.test(password) && " • Add uppercase letter"}
                  {!/[0-9]/.test(password) && " • Add number"}
                  {!/[#?!@$%^&*-]/.test(password) && " • Add special character"}
                </p>
              </div>
            </Field>
          )}
        />
        {/* confirm password */}
        <Controller
          name="rePassword"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="space-y-2">
              <FieldLabel className="text-sm font-medium">
                Confirm Password<span className="text-red-500">*</span>
              </FieldLabel>

              <div className="relative">
                <Input
                  {...field}
                  type={showRePassword ? "text" : "password"}
                  placeholder="********"
                  className="h-11 rounded-lg pr-10"
                />

                <button
                  type="button"
                  onClick={() => setShowRePassword(!showRePassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
                >
                  {showRePassword ? (
                    <FiEyeOff size={18} />
                  ) : (
                    <FiEye size={18} />
                  )}
                </button>
              </div>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* phone */}
        <Controller
          name="phone"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="space-y-2">
              <FieldLabel className="text-sm font-medium">
                Phone Number<span className="text-red-500">*</span>
              </FieldLabel>
              <Input
                {...field}
                type="tel"
                placeholder="+1 234 567 8900"
                className="h-11 rounded-lg"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* checkbox */}
        <Controller
          name="terms"
          control={control}
          rules={{ required: "You must accept the terms and conditions" }}
          render={({ field, fieldState }) => (
            <div className="flex flex-col gap-1 text-sm pt-2">
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                  className="mt-1 accent-green-600"
                />

                <p className="text-gray-500 leading-relaxed">
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="text-green-600 hover:underline"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-green-600 hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </p>
              </div>

              {fieldState.error && (
                <p className="text-red-500 text-sm">
                  {fieldState.error.message}
                </p>
              )}
            </div>
          )}
        />

        {/* submit */}
        <button
          type="submit"
          disabled={!terms || isLoading}
          className={`w-full py-3 rounded-lg font-medium mt-2 transition flex items-center justify-center gap-2
    ${!terms || isLoading
              ? "bg-green-300 cursor-not-allowed opacity-70"
              : "bg-green-600 text-white hover:bg-green-700"
            }
  `}
        >
          {isLoading ? (
            <Spinner className="w-5 h-5 animate-spin" />
          ) : (
            "Create My Account"
          )}
        </button>

        {/* login link */}
        <p className="text-center text-sm text-gray-500 pt-2">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-green-600 font-medium hover:underline"
          >
            Sign In
          </Link>
        </p>
      </FieldGroup>
    </form>
  );
}
