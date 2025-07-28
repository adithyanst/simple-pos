import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} m-auto mt-3 w-[500px] rounded-md border-1 border-solid px-3 py-4 antialiased`}
      >
        <div className="h-[90vh] overflow-auto p-3">{children}</div>
        <br />
        <footer className="flex items-center justify-between">
          <Link href="/">
            <img src="./subway logo.png" alt="subway logo" className="h-max w-[120px]" />
          </Link>
          <div className="flex items-center gap-[20px]">
            <img src="./payment methods badge.png" alt="subway logo" className="h-max w-[100px]" />
            <Link href="/terms-and-conditions">
              <u>T&C</u>
            </Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
