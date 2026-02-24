"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Input from "@/app/components/input";
import { Button } from "@/app/components/button";
import { registerSchema } from "./register.schema";
import { RegisterFormData } from "./register.types";
import { AUTH_TEXT } from "../../constants/label";
import DOBSelect from "@/app/components/dobselect";
import { ROUTES } from "@/app/shared/routes/app.route";
import { COUNTRY_CODES } from "@/app/constants/countrycode";

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
        className="w-full space-y-4 text-white"
      >
        {error && <div className="text-red-500 text-sm">{error}</div>}

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
              className="bg-transparent
                                  text-black
                                  text-md
                                  pr-4
                                  outline-none
                                  border-b-2
                                  border-lime-500
                                  focus:border-lime-500
                                  cursor-pointer"
            >
              {COUNTRY_CODES.map((item) => (
                <option key={item.code} value={item.code}>
                  {item.code}
                </option>
              ))}
            </select>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <FaEye size={22} className="text-black" />
            ) : (
              <FaEyeSlash size={22} className="text-black" />
            )
          }
          onRightIconClick={() => setShowPassword((p) => !p)}
        />

        <Input
          {...register("confirmPassword")}
          type={showConfirmPassword ? "text" : "password"}
          placeholder={AUTH_TEXT.register.cnfpasswordLabel}
          error={errors.confirmPassword?.message}
          rightIcon={
            showConfirmPassword ? (
              <FaEye size={22} className="text-black" />
            ) : (
              <FaEyeSlash size={22} className="text-black" />
            )
          }
          onRightIconClick={() => setShowConfirmPassword((p) => !p)}
        />

        <div className="flex">
          <DOBSelect />
        </div>

        <div className="space-y-6 mt-8">
          <label className="flex items-start gap-2 text-sm">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 border border-gray-400"
            />
            <span className="text-terms">
              {AUTH_TEXT.register.terms}{" "}
              <a href="#" className="text-button underline">
                terms & conditions
              </a>
            </span>
          </label>

          <Button variant="primary" size="lg" fullWidth disabled={isLoading}>
            {isLoading ? "Registering..." : AUTH_TEXT.register.submitButton}
          </Button>

          <p className="text-login">
            {AUTH_TEXT.register.hasAccount}{" "}
            <Link
              href={ROUTES.LOGIN}
              className="text-button underline hover:text-button"
            >
              Login here
            </Link>
          </p>
        </div>

      </form>
    </>
  );
}
