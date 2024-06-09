import Navbar            from '@/components/Navbar';
import type { Metadata } from "next";
import { Inter }         from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PokeDex",
  description: "Next.js 14 PokeDex with Infinite Scrolling",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-800 text-white`}>
      <Navbar />
      {children}</body>
    </html>
  );
}
