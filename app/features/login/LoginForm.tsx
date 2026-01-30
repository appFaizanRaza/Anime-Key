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
import Button from "@/app/components/button";
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

  /* ------------------ PHONE VS EMAIL DETECTION ------------------ */
  const inputValue = watch("email") || "";
  const isPhoneInput = /^\d*$/.test(inputValue); // digits OR empty only

  /* ------------------ SUBMIT ------------------ */
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

      // ✅ SUCCESS
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
      className="w-full max-w-xl space-y-8 text-white"
    >
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <Input
        {...register("email")}
        placeholder="Enter email or phone number"
        error={errors.email?.message}
        leftAddon={
          isPhoneInput ? (
            <select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className="
                bg-transparent
                text-black
                text-md
                pr-4
                outline-none
                border-b-2
                border-lime-500
                focus:border-lime-500
                cursor-pointer
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
        placeholder="Password"
        error={errors.password?.message}
        rightIcon={
          showPassword ? (
            <FaEyeSlash size={26} className="text-black" />
          ) : (
            <FaEye size={26} className="text-black" />
          )
        }
        onRightIconClick={() => setShowPassword((p) => !p)}
      />

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 rounded-lg bg-lime-600 text-primary font-semibold"
      >
        {isLoading ? "Logging in..." : AUTH_TEXT.login.submitButton}
      </Button>

      <div className="space-y-2">
        <h2 className="text-xl text-lime-400 underline">
          <a href="/register">{AUTH_TEXT.login.createAccount}</a>
        </h2>
        <h2>{AUTH_TEXT.login.forgotPassword}</h2>
      </div>

      <div className="flex items-center my-6 gap-4">
        <div className="flex-1 h-px bg-gray-600" />
        <span className="font-bold text-primary">{AUTH_TEXT.login.or}</span>
        <div className="flex-1 h-px bg-gray-600" />
      </div>

      <Button
        type="button"
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className="w-full bg-white py-3"
        icon={<FcGoogle size={20} />}
      >
        <span className="text-gray-500">{AUTH_TEXT.login.Google}</span>
      </Button>
    </form>
  );
}
