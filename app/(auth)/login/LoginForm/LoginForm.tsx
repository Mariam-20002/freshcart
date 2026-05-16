"use client";
import Link from "next/link";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Eye, EyeOff } from "lucide-react";
import { FaGoogle } from "react-icons/fa6";
import { SiFacebook } from "react-icons/si";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm, Controller } from "react-hook-form";

import { toast } from "sonner";

import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { LoginSchema, type LoginSchemaType } from "./schema/Login.schema";

import { signIn } from "next-auth/react";
import { addToCart } from "@/app/Apis/cart/actions/addCart.action";
import { addToWishlist } from "@/app/Apis/wishList/action/addWish.action";

export default function LoginForm() {
  const [isLoading, setLoading] = useState(false);

  const { handleSubmit, control, reset } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function handleLogin(data: LoginSchemaType) {
    setLoading(true);
    try {
      const isSuccessfulLogin = await signIn("credentials", {
        redirect: false,
        ...data,
        callbackUrl: "/",
      });

      if (isSuccessfulLogin?.ok) {
        toast.success("Logged in successfully", {
          position: "top-right",
        });

        const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");

        for (const item of guestCart) {
          await addToCart(item.product._id);
        }

        localStorage.removeItem("guestCart");

        const guestWishlist = JSON.parse(
          localStorage.getItem("guestWishlist") || "[]",
        );

        for (const item of guestWishlist) {
          await addToWishlist(item._id);
        }

        localStorage.removeItem("guestWishlist");

        window.location.href = "/cart";

        reset();
      } else {
        toast.error("Incorrect email or password", {
          position: "top-right",
        });
      }
    } catch (error: any) {
      toast.error(error.message, { position: "top-right" });
    } finally {
      setLoading(false);
    }
  }

  const [showPassword, setShowPassword] = useState(false);

  return (
    <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
      <FieldGroup className="space-y-5">
        {/*  Social Buttons */}
        <div className="flex flex-col gap-4">
          <button
            type="button"
            className="flex items-center justify-center gap-3 w-full border border-gray-200 rounded-xl py-3 text-[16px] font-medium text-gray-700 hover:bg-gray-50 transition"
          >
            <FaGoogle className="text-red-500 text-[18px]" />
            Continue with Google
          </button>

          <button
            type="button"
            className="flex items-center justify-center gap-3 w-full border border-gray-200 rounded-xl py-3 text-[16px] font-medium text-gray-700 hover:bg-gray-50 transition"
          >
            <SiFacebook className="text-blue-600 text-[18px]" />
            Continue with Facebook
          </button>
        </div>

        {/* OR */}
        <div className="flex items-center gap-4 my-2">
          <div className="flex-1 h-[1px] bg-gray-200" />

          <span className="text-[11px] text-gray-400 font-medium uppercase tracking-[0.12em]">
            OR CONTINUE WITH EMAIL
          </span>

          <div className="flex-1 h-[1px] bg-gray-200" />
        </div>

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
              <div className="flex items-center justify-between">
                <FieldLabel className="text-sm font-medium">
                  Password<span className="text-red-500">*</span>
                </FieldLabel>

                <Link
                  href="/forgot-password"
                  className="text-[13px] text-green-600 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

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
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 rounded-lg font-medium mt-2 flex items-center justify-center gap-2 bg-green-600 text-white hover:bg-green-700 cursor-pointer transition"
        >
          {isLoading ? (
            <>
              <Spinner className="w-4 h-4" />
              Signing in...
            </>
          ) : (
            "Sign In"
          )}
        </button>

        {/* login link */}
        <p className="text-sm text-center text-gray-500">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="text-green-600 font-medium hover:underline"
          >
            Create account
          </Link>
        </p>
      </FieldGroup>
    </form>
  );
}
