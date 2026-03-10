import Loading from "@/app/components/loading";
import LoginWrapper from "@/app/features/login/loginWrapper";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <Suspense fallback={<Loading />}>
      <LoginWrapper />
    </Suspense>
  );
}