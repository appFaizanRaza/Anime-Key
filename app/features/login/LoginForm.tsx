"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "./login.schema";
import { LoginFormValues } from "./login.types";
import { FcGoogle } from "react-icons/fc";
import Button from "@/app/components/button";
import Input from "@/app/components/input";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { AUTH_TEXT } from "@/app/constants/label";
import { signIn } from "next-auth/react";

export default function LoginForm() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log("Login Data:", data);
  };

  const [showPassword, setShowPassword] = useState(false);
  const [countryCode, setCountryCode] = useState("+91");

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-2xl space-y-8 text-white"
      >
        <Input
          {...register("email")}
          placeholder={AUTH_TEXT.login.emailLabel}
          error={errors.email?.message}
          leftAddon={
            <select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className="bg-transparent text-md outline-none text-black inset-0"
            >
              <option value="+91">+91</option>
              <option value="+1">+1</option>
              <option value="+44">+44</option>
            </select>
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
          onRightIconClick={() => setShowPassword(!showPassword)}
        />
        <Button
          type="submit"
          className="w-full py-3 bg-[rgb(var(--color-primary-lime))] text-white"
        >
          LOGIN
        </Button>
        <div className="space-y-2">
          <h2 className="text-sm text-var(--color-primary-lime))]">
            <a href="/register">CREATE A NEW ACCOUNT</a>
          </h2>
          <h2 className="text-sm">FORGOT PASSWORD ?</h2>
        </div>
        <div className="flex items-center my-6 gap-4">
          <div className="flex-1 h-px bg-gray-600" />

          <span className="text-body font-bold text-primary">
            {AUTH_TEXT.login.or}
          </span>
          <div className="flex-1 h-px bg-gray-600" />
        </div>
        <Button
          onClick={() => signIn("google")}
          className="w-full bg-white py-3"
          icon={<FcGoogle size={20} />}
        >
          <span className="text-gray-500">{AUTH_TEXT.login.Google}</span>
        </Button>
      </form>
    </>
  );
}
