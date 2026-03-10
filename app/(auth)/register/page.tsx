import Loading from "@/app/components/loading";
import RegisterWrapper from "@/app/features/register/registerWrapper";
import { Suspense } from "react";

export default function RegisterPage() {
  return (
    <Suspense fallback={<Loading />}>
      <RegisterWrapper />
    </Suspense>
  );
}