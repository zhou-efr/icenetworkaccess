import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { SessionProvider } from "next-auth/react"; // Import SessionProvider
import { SideBar } from "@/components/sidebar";
import { User } from "next-auth";
import { getAdmins } from "./api/admin";

const poppins_font = Poppins({
  variable: '--font-poppins',
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ICE Network Access",
  description: "Récupération des accès VPN au réseau Lowcaltech ou INA",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth()
  if (!session) redirect("/api/auth/signin")
  const admins = await getAdmins();
  const isAdmin = admins.includes(session.user?.email as string);
  return (
    <html className="h-full bg-ice-efrei-dark-blue" lang="en">
      <body
        className={`${poppins_font.variable} h-full`}
      >
        <SessionProvider session={session}> 
          <SideBar user= {session.user as User} isAdmin={isAdmin}>
            {children}
          </SideBar>
        </SessionProvider>
      </body>
    </html>
  );
}
