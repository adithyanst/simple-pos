"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [menu, setMenu] = useState(undefined);

  useEffect(() => {
    fetch("/api/dummySubwayStore")
      .then((res) => res.json())
      .then((jsonres) => setMenu(jsonres.menu));
  }, []);

  if (!menu) return <div className="p-4">Loading...</div>;

  const renderItems = (items, title) => (
    <div className="mb-8">
      <h2 className="mb-4 font-bold text-2xl">{title}</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {items.map((item) => (
          <div key={item.id} className="flex flex-col rounded-xl bg-white p-4 shadow">
            <img src={item.image} alt={item.name} className="mb-3 h-40 w-full rounded-lg object-cover" />
            <h3 className="font-semibold text-lg">{item.name}</h3>
            <p className="mb-2 text-gray-600 text-sm">{item.description}</p>
            <div className="mb-1 text-gray-800 text-sm">₹{item.price}</div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {renderItems(menu.subs, "Subs")}
      {renderItems(menu.wraps, "Wraps")}
      {renderItems(menu.beverages, "Beverages")}
    </div>
  );
}
