"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "./login.schema";
import { LoginFormValues } from "./login.types";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/app/components/button";
import Input from "@/app/components/input";
import { AUTH_TEXT } from "@/app/constants/label";
import { COUNTRY_CODES } from "@/app/constants/countrycode";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [countryCode, setCountryCode] = useState("+91");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const inputValue = watch("email") || "";
  const isPhoneInput = /^\d*$/.test(inputValue);

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      const isPhone = /^\d+$/.test(data.email.trim());

      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "login",
          email: isPhone ? null : data.email,
          phone: isPhone ? data.email : null,
          password: data.password,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result.message || "Login failed");
        return;
      }

      // ✅ LOGIN SUCCESS → HOME
      router.push("/");
    } catch {
      setError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-xl space-y-6 text-form"
    >
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <Input
        {...register("email")}
        placeholder={AUTH_TEXT.login.emailLabel}
        error={errors.email?.message}
        autoComplete="new-password"
        leftAddon={
          isPhoneInput ? (
            <select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className="
                bg-transparent
                text-md
                pr-4
                outline-none
                border-b-2
                border-button
                cursor-pointer
                text-center
              "
            >
              {COUNTRY_CODES.map((item) => (
                <option key={item.code} value={item.code}>
                  {item.code}
                </option>
              ))}
            </select>
          ) : null
        }
      />

      <Input
        {...register("password")}
        type={showPassword ? "text" : "password"}
        placeholder={AUTH_TEXT.login.passwordLabel}
        error={errors.password?.message}
        rightIcon={
          showPassword ? (
            <FaEye size={22} className="text-black" />
          ) : (
            <FaEyeSlash size={22} className="text-black" />
          )
        }
        onRightIconClick={() => setShowPassword((p) => !p)}
      />

      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        disabled={isLoading}
      >
        {isLoading ? "Logging in..." : AUTH_TEXT.login.submitButton}
      </Button>

      <div className="space-y-2">
        <h2 className="text-button underline">
          <a href="/register">{AUTH_TEXT.login.createAccount}</a>
        </h2>
        <h2>{AUTH_TEXT.login.forgotPassword}</h2>
      </div>

      <div className="flex items-center my-6 gap-4">
        <div className="flex-1 h-px bg-gray-600" />
        <span className="font-bold text-or">{AUTH_TEXT.login.or}</span>
        <div className="flex-1 h-px bg-gray-600" />
      </div>

      <Button
        type="button"
        variant="secondary"
        size="lg"
        fullWidth
        onClick={() => signIn("google", { callbackUrl: "/" })}
        icon={<FcGoogle size={20} />}
      >
        <span className="text-google font-roboto">
          {AUTH_TEXT.login.Google}
        </span>
      </Button>
    </form>
  );
}
