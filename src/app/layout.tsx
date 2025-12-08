import type { Metadata } from "next";
import { Schibsted_Grotesk } from "next/font/google";
import { Toaster } from "sonner";
import { AuthProvider } from "./providers/AuthProvider";
import { NextAuthSessionProvider } from "./providers/NextAuthSessionProvider";
import { QueryProvider } from "./providers/QueryProvider";
import { MainLayout } from "./layouts/Main/Main";
import { MobileBlock } from "@/shared/ui/MobileBlock/MobileBlock";
import "./globals.css";
import "@/shared/styles/main.scss";

const schibstedGrotesk = Schibsted_Grotesk({
  variable: "--font-schibsted-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600"]
})

export const metadata: Metadata = {
  title: "MINTARION",
  description: "",
  icons: {
    icon: "./favicon.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${schibstedGrotesk.variable} antialiased`}
      >
        <QueryProvider>
          <NextAuthSessionProvider>
            <AuthProvider>
              <Toaster />
              <MobileBlock>
                <MainLayout routes={[
                  "/sign-up", "/sign-in",
                  "/chart", "/news", "/tools", "/articles", "/learning", "/exchange",
                  "/account"
                ]}>
                  {children}
                </MainLayout>
              </MobileBlock>
            </AuthProvider>
          </NextAuthSessionProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
