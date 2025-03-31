import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { SessionProvider } from "next-auth/react"; // Import SessionProvider

const poppins_font = Poppins({
  variable: '--font-poppins',
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ICE Network Access Delivery",
  description: "Récupération des accès VPN au réseau Lowcaltech",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth()
  if (!session) redirect("/api/auth/signin")
  return (
    <html lang="en">
      <body
        className={`${poppins_font.variable} mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 antialiased bg-ice-efrei-dark-blue text-white`}
      >
        <SessionProvider session={session}> {/* Wrap children with SessionProvider */}
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
