"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function ThankYouPage() {
  const [tentNumber, setTentNumber] = useState(null);

  useEffect(() => {
    // generate a random 2-digit tent number when the page loads
    const number = Math.floor(10 + Math.random() * 90);
    setTentNumber(number);
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-8 bg-white px-6 py-12 text-center text-black">
      <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-black">
        <svg className="h-12 w-12 text-black" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h1 className="font-mono text-xl">your order has been placed!</h1>

      {tentNumber !== null && (
        <div className="font-mono text-lg">
          pick up your tent number <span className="font-bold">({tentNumber})</span> from the counter and have your food
          delivered straight to your table!
        </div>
      )}

      <p className="font-mono text-gray-700 text-sm">a confirmation has been sent to your email</p>

      <div className="w-full">
        <Link href="/">
          <button type="button" className="w-full rounded bg-black py-3 text-white hover:bg-gray-800">
            Start Again{" "}
          </button>
        </Link>
      </div>
    </div>
  );
}
