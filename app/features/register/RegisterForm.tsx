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
        className="w-full space-y-6 text-white"
      >
        {error && <div className="text-red-500 text-sm">{error}</div>}

        {/* Email */}
        <Input
          {...register("email")}
          placeholder={AUTH_TEXT.register.emailLabel}
          error={errors.email?.message}
        />

        {/* Phone */}
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

        {/* First / Last Name */}
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

        {/* Password */}
        <Input
          {...register("password")}
          type={showPassword ? "text" : "password"}
          placeholder={AUTH_TEXT.register.passwordLabel}
          error={errors.password?.message}
          rightIcon={
            showPassword ? (
              <FaEyeSlash size={22} className="text-black" />
            ) : (
              <FaEye size={22} className="text-black" />
            )
          }
          onRightIconClick={() => setShowPassword((p) => !p)}
        />

        {/* Confirm Password */}
        <Input
          {...register("confirmPassword")}
          type={showConfirmPassword ? "text" : "password"}
          placeholder={AUTH_TEXT.register.cnfpasswordLabel}
          error={errors.confirmPassword?.message}
          rightIcon={
            showConfirmPassword ? (
              <FaEyeSlash size={22} className="text-black" />
            ) : (
              <FaEye size={22} className="text-black" />
            )
          }
          onRightIconClick={() => setShowConfirmPassword((p) => !p)}
        />

        {/* DOB */}
        <div>
          <DOBSelect />
        </div>

        {/* Terms */}
        <label className="flex items-start gap-3 text-sm">
          <input
            type="checkbox"
            className="mt-1 h-5 w-5 border border-gray-400"
          />
          <span className="text-lg">
            {AUTH_TEXT.register.terms}{" "}
            <a href="#" className="text-lime-400 underline">
              terms & conditions
            </a>
          </span>
        </label>

        {/* Submit */}
        <Button
          disabled={isLoading}
          className="w-full py-3 bg-lime-500 text-white font-medium rounded-md"
        >
          {isLoading ? "Registering..." : AUTH_TEXT.register.submitButton}
        </Button>

        {/* Footer */}
        <p className="text-lg">
          {AUTH_TEXT.register.hasAccount}{" "}
          <Link
            href={ROUTES.LOGIN}
            className="text-lime-400 underline hover:text-lime-500"
          >
            Login here
          </Link>
        </p>
      </form>
    </>
  );
}
