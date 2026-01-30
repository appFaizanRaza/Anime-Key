"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Input from "@/app/components/input";
import Button from "@/app/components/button";
import { registerSchema } from "./register.schema";
import { RegisterFormData } from "./register.types";
import { AUTH_TEXT } from "../../constants/label";
import DOBSelect from "@/app/components/dobselect";
import { ROUTES } from "@/app/shared/routes/app.route";

export default function RegisterForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [countryCode, setCountryCode] = useState("+91");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  const dobValue = watch("dob");

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "register",
          email: data.email,
          phone: data.phone,
          password: data.password,
          firstName: data.firstName,
          lastName: data.lastName,
          dob: dobValue || "",
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.message || "Registration failed");
        return;
      }

      // Registration successful, redirect to login
      router.push(ROUTES.LOGIN);
    } catch (err) {
      setError("An error occurred during registration");
      console.error("Registration error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-3xl space-y-6 text-white"
      >
        {error && <div className="text-red-500 mb-4 text-sm">{error}</div>}

        <Input
          {...register("email")}
          placeholder={AUTH_TEXT.register.emailLabel}
          error={errors.email?.message}
        />

        <Input
          {...register("phone")}
          placeholder={AUTH_TEXT.register.phoneLabel}
          error={errors.phone?.message}
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

        <div className="flex gap-2">
          <Input
            {...register("firstName")}
            placeholder={AUTH_TEXT.register.firstLabel}
            error={errors.firstName?.message}
          />

          <Input
            {...register("lastName")}
            placeholder={AUTH_TEXT.register.lastLabel}
            error={errors.lastName?.message}
          />
        </div>

        <Input
          {...register("password")}
          type={showPassword ? "text" : "password"}
          placeholder={AUTH_TEXT.register.passwordLabel}
          error={errors.password?.message}
          rightIcon={
            showPassword ? (
              <FaEyeSlash size={26} className="text-black" />
            ) : (
              <FaEye size={26} className="text-black" />
            )
          }
          onRightIconClick={() => setShowPassword((prev) => !prev)}
        />

        <Input
          {...register("confirmPassword")}
          type={showConfirmPassword ? "text" : "password"}
          placeholder={AUTH_TEXT.register.cnfpasswordLabel}
          error={errors.confirmPassword?.message}
          rightIcon={
            showConfirmPassword ? (
              <FaEyeSlash size={24} className="text-black" />
            ) : (
              <FaEye size={24} className="text-black" />
            )
          }
          onRightIconClick={() => setShowConfirmPassword((prev) => !prev)}
        />

        <div>
          <DOBSelect />
        </div>

        <label className="space-y-8">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 border-2 border-gray-400"
          />{" "}
          <span>
            {AUTH_TEXT.register.terms}{" "}
            <a href="#" className="text-lime-400">
              terms & conditions
            </a>
          </span>
        </label>

        <Button
          disabled={isLoading}
          className="w-full py-3 bg-[rgb(var(--color-primary-lime))] text-white"
        >
          {isLoading ? "Registering..." : AUTH_TEXT.register.submitButton}
        </Button>
        <div className="register-footer">
          <p>
            {AUTH_TEXT.register.hasAccount}{" "}
            <Link
              href={ROUTES.LOGIN}
              className="text-lime-400 underline hover:text-lime-500"
            >
              Login here
            </Link>
          </p>
        </div>
      </form>
    </>
  );
}
