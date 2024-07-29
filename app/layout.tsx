import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "drtslrdsct",
  description: "never ask Darts Lord of anything...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"/>
      </head>
      <body className={'font-montserrat bg-black'}>
        <SessionProvider>{children}</SessionProvider>
        <Toaster />
      </body>
    </html>
  );
}
