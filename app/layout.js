import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "AllLinks",
  description: "Paste your link to make it easy for others to find you on different plateform",
  icons: {
    icon: "/Logo.svg",
  },
};


export default function RootLayout({ children }) {

  return (
    <html lang="en">

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased relative`} >
        <div className="absolute h-full w-full bg-[radial-gradient(#d5d5d5_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] -z-10"></div>

        <Navbar />
        {children}
        <Footer />
      </body>

    </html>
  );
}
