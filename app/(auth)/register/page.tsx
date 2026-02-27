import RegisterWrapper from "@/app/features/register/registerWrapper";
import { Suspense } from "react";

export default function RegisterPage() {
  return (
    <Suspense fallback={<p>Loading register...</p>}>
      <RegisterWrapper />
    </Suspense>
  );
}