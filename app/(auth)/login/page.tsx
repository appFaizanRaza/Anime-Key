import LoginWrapper from "@/app/features/login/loginWrapper";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <Suspense fallback={<p>Loading login...</p>}>
      <LoginWrapper />
    </Suspense>
  );
}