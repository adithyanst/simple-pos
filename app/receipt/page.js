"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ReceiptPage() {
  const searchParams = useSearchParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const id = searchParams.get("id");

  useEffect(() => {
    if (!id) return;

    fetch(`/api/receipt?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        try {
          setItems(JSON.parse(data.cart || "[]"));
          console.log(JSON.parse(data.cart));
        } catch {
          setItems([]);
        } finally {
          setLoading(false);
        }
      });
  }, [id]);

  if (loading) return <p className="p-4">Loading your receipt...</p>;

  if (!items.length) return <p className="p-4 text-red-500">No order found.</p>;

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-6">
      <h1 className="text-center font-bold text-2xl">Thank you for your order!</h1>
      <p className="text-center text-gray-600">Here's your receipt:</p>

      {items.map((item, index) => (
        <div key={index} className="flex gap-4 rounded-xl border bg-white p-4 shadow">
          <img src={item.image} alt={item.name} className="h-24 w-24 rounded-md object-cover" />
          <div className="flex flex-col justify-between">
            <div>
              <div className="font-semibold text-lg">{item.name}</div>
              <p>Price: {item.price}</p>
              <p>Kind: {item.type}</p>
              <p>Protein: {item.protein_g}g</p>
              <br />
              <div className="font-semibold text-md">Selected Customizations:</div>
              {item.customizations &&
                Object.entries(item.selectedCustomizations)
                  .filter(([_, value]) => value && value !== "None")
                  .map(([key, value]) => (
                    <div key={key}>
                      <span className="font-medium">{key}:</span> {value}
                    </div>
                  ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
