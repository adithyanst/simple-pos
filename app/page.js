"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [menu, setMenu] = useState(undefined);

  const [selectedItem, setSelectedItem] = useState(null);

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
          <button
            key={item.id}
            type="button"
            className="flex cursor-pointer flex-col rounded-xl bg-white p-4 shadow transition hover:shadow-lg"
            onClick={() => setSelectedItem(item)}
          >
            <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded-lg mb-3" />
            <h3 className="font-semibold text-lg">{item.name}</h3>
            <p className="mb-2 text-gray-600 text-sm">{item.description}</p>
            <div className="mb-1 text-gray-800 text-sm">₹{item.price}</div>
            <div className="mb-2 text-gray-500 text-xs capitalize">{item.type}</div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderModal = () => {
    if (!selectedItem) return null;
    const { name, image, description, protein_g, customizations } = selectedItem;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="relative w-full max-w-md rounded-xl bg-white p-6">
          <button
            onClick={() => setSelectedItem(null)}
            type="button"
            className="absolute top-2 right-3 text-gray-500 text-lg hover:text-black"
          >
            ×
          </button>

          <img src={image} alt={name} className="w-full h-40 object-cover rounded-lg mb-4" />
          <h3 className="font-bold text-xl">{name}</h3>
          <p className="mb-2 text-gray-600 text-sm">{description}</p>
          <p className="mb-4 text-gray-500 text-xs">Protein: {protein_g}g</p>

          {customizations &&
            Object.entries(customizations).map(([category, options]) => (
              <div key={category} className="mb-4">
                <h4 className="mb-1 font-semibold text-sm capitalize">{category.replace("_", " ")}</h4>
                <div className="flex flex-wrap gap-2">
                  {options.map((opt) => (
                    <label key={opt} className="cursor-pointer rounded border px-2 py-1 text-sm hover:bg-gray-100">
                      <input type="checkbox" className="mr-1" /> {opt}
                    </label>
                  ))}
                </div>
              </div>
            ))}

          <div className="mt-6">
            <button className="w-full rounded bg-black py-2 text-white hover:bg-gray-800" type="button">
              Add to order
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {renderItems(menu.subs, "Subs")}
      {renderItems(menu.wraps, "Wraps")}
      {renderItems(menu.beverages, "Beverages")}

      {renderModal()}
    </div>
  );
}
