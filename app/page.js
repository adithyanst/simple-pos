"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ItemModal from "@/components/ItemModal";

export default function Home() {
  const [menu, setMenu] = useState(undefined);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");

  const [showBestsellers, setShowBestsellers] = useState(false);
  const [sortBy, setSortBy] = useState(null);

  const [cart, setCart] = useState([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Sync cart to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function handleAddToCart(itemWithCustomizations) {
    setCart((prev) => [...prev, itemWithCustomizations]);
  }

  useEffect(() => {
    fetch("/api/dummySubwayStore")
      .then((res) => res.json())
      .then((jsonres) => setMenu(jsonres.menu));
  }, []);

  function matchesSearch(item) {
    return (
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  function filterItems(items) {
    const filtered = items.filter(
      (item) =>
        matchesSearch(item) &&
        (filterType === "all" || item.type === filterType) &&
        (!showBestsellers || item.popularity >= 90),
    );

    if (sortBy === "popularity") {
      filtered.sort((a, b) => b.popularity - a.popularity);
    } else if (sortBy === "protein_g") {
      filtered.sort((a, b) => b.protein_g - a.protein_g);
    } else if (sortBy === "spice_level") {
      filtered.sort((a, b) => b.spice_level - a.spice_level);
    } else if (sortBy === "prep_time_min") {
      filtered.sort((a, b) => a.prep_time_min - b.prep_time_min);
    }

    return filtered;
  }

  function renderItems(items, title) {
    const filtered = filterItems(items);
    if (filtered.length === 0) return null;

    return (
      <div className="mb-8">
        <h2 className="mb-4 font-bold text-2xl">{title}</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {filtered.map((item) => (
            <button
              key={item.id}
              type="button"
              className="flex cursor-pointer flex-col rounded-xl bg-white p-4 shadow transition hover:shadow-lg"
              onClick={() => setSelectedItem(item)}
            >
              <img src={item.image} alt={item.name} className="mb-3 h-40 w-full rounded-lg object-cover" />
              <h3 className="font-semibold text-lg">{item.name}</h3>
              <p className="mb-2 text-gray-600 text-sm">{item.description}</p>
              <div className="mb-1 text-gray-800 text-sm">₹{item.price}</div>
              <div className="mb-2 text-gray-500 text-xs capitalize">{item.type}</div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (!menu) return <div className="p-4">Loading...</div>;

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-8">
      <div>
        {/* Search input */}
        <div className="mb-6 w-full">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-md border px-4 py-2 text-lg"
          />
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap items-center gap-2">
          {["all", "vegetarian", "non-vegetarian"].map((type) => (
            <button
              type="button"
              key={type}
              onClick={() => setFilterType(type)}
              className={`rounded border px-4 py-2 ${
                filterType === type
                  ? type === "vegetarian"
                    ? "bg-green-600 text-white"
                    : type === "non-vegetarian"
                      ? "bg-red-600 text-white"
                      : "bg-black text-white"
                  : "text-black hover:bg-gray-100"
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1).replace("-", " ")}
            </button>
          ))}

          <button
            type="button"
            onClick={() => setShowBestsellers((prev) => !prev)}
            className="flex items-center justify-center rounded border px-4 py-2 hover:bg-gray-100"
          >
            <div className={`mr-2 h-3.5 w-3.5 rounded-full ${showBestsellers ? "bg-green-500" : "bg-red-500"}`} />
            Bestseller
          </button>

          <select
            value={sortBy || ""}
            onChange={(e) => setSortBy(e.target.value || null)}
            className="rounded border px-4 py-2 text-black hover:bg-gray-100"
          >
            <option value="">Sort by</option>
            <option value="popularity">Popularity</option>
            <option value="protein_g">Protein</option>
            <option value="spice_level">Spice Level</option>
            <option value="prep_time_min">Prep Time</option>
          </select>
        </div>

        {/* Items */}
        {renderItems(menu.subs, "Subs")}
        {renderItems(menu.wraps, "Wraps")}
        {renderItems(menu.beverages, "Beverages")}
      </div>

      {/* Checkout Button */}
      <div className="mt-auto pt-8">
        <Link href="/checkout">
          <button type="button" className="w-full rounded bg-black py-3 text-white hover:bg-gray-800">
            Go to Checkout
          </button>
        </Link>
      </div>

      {/* Modal */}
      <ItemModal item={selectedItem} onClose={() => setSelectedItem(null)} onAddToCart={handleAddToCart} />
    </div>
  );
}
