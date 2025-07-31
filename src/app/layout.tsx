import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Motion x Next.js App Router page transitions",
  description:
    "A starter project demonstrating how to use Motion's upcoming AnimateView component to create page transitions with the Next.js App Router.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* <AnimateView>{children}</AnimateView> */}
        {children}
      </body>
    </html>
  );
}
