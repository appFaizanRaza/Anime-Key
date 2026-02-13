import Providers from "./components/providers";
import { Inter } from "next/font/google";
import "./global.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["100","200","300","400","500","600","700","800","900"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Correctly inject all font variables here
    <html lang="en" className={` ${inter.variable}`}>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
