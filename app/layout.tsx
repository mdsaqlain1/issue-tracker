import "@radix-ui/themes/styles.css";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "./NavBar";
import { Theme } from "@radix-ui/themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Issue Tracker",
  description: "Created by Mohammed Saqlain",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Theme accentColor="iris">
          <NavBar></NavBar>
          <main className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 relative h-screen">{children}</main>
        </Theme>
      </body>
    </html>
  );
}
