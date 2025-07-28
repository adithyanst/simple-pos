"use client";

import { useEffect, useState } from "react";

export default function CheckoutPage() {
  const [cart, setCart] = useState([]);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("cart");
      if (stored) {
        setCart(JSON.parse(stored));
      }
    }
  }, []);

  const removeFromCart = (cartId) => {
    const updatedCart = cart.filter((item) => item.cartId !== cartId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const finishOrder = () => {
    if (!email.trim()) {
      alert("Please enter your email.");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    console.log("Order submitted:", { email, cart });

    // Clear cart
    setCart([]);
    localStorage.removeItem("cart");
    alert("Order placed!");
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 font-bold text-2xl">Checkout</h1>

      {cart.length === 0
        ? <p className="text-gray-600">Your cart is empty.</p>
        : <div className="space-y-6">
            {cart.map((item) => (
              <div key={item.cartId} className="rounded border bg-white p-4 shadow-sm">
                <div className="mb-2 flex items-center justify-between">
                  <h2 className="font-semibold text-lg">{item.name}</h2>
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.cartId)}
                    className="text-red-600 text-sm hover:underline"
                  >
                    Remove
                  </button>
                </div>

                <img src={item.image} alt={item.name} className="mb-3 w-full h-40 object-cover rounded" />
                <p className="mb-2 text-gray-600 text-sm">{item.description}</p>
                <p className="mb-2 font-medium text-sm">₹{item.price}</p>

                {item.selectedCustomizations &&
                  Object.entries(item.selectedCustomizations).map(([category, options]) => (
                    <div key={category} className="mb-1 text-sm">
                      <span className="font-medium capitalize">{category.replace("_", " ")}:</span> {options.join(", ")}
                    </div>
                  ))}
              </div>
            ))}

            {/* Email Input */}
            <div className="mt-6">
              {/** biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
              <label className="mb-2 block font-medium text-sm">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded border px-4 py-2"
              />
            </div>

            {/* Finish Button */}
            <button
              type="button"
              onClick={finishOrder}
              className="mt-4 w-full rounded bg-black py-2 text-white hover:bg-gray-800"
            >
              Finish Order
            </button>
          </div>}
    </div>
  );
}
