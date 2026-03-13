import AuthHeader from "../components/headers/authHeader";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full flex bg-background-dark">
      <AuthHeader />
      {children}
    </div>
  );
}
