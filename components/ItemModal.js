"use client";

import { useEffect, useState } from "react";

export default function ItemModal({ item, onClose, onAddToCart }) {
  const [selectedOptions, setSelectedOptions] = useState({});

  useEffect(() => {
    setSelectedOptions({});
  }, [item]);

  if (!item) return null;

  const { name, image, description, protein_g } = item;
  const customizations = item.customizations || {};

  function toggleOption(category, option) {
    const isRadio = category === "bread";

    setSelectedOptions((prev) => {
      if (isRadio) {
        return { ...prev, [category]: option };
      }

      const categoryOptions = new Set(prev[category] || []);
      if (categoryOptions.has(option)) {
        categoryOptions.delete(option);
      } else {
        categoryOptions.add(option);
      }

      return {
        ...prev,
        [category]: Array.from(categoryOptions),
      };
    });
  }

  function handleAddToCart() {
    const { name, image, description, price, protein_g } = item;

    const cartItem = {
      name,
      image,
      description,
      price,
      protein_g,
      selectedCustomizations: selectedOptions,
      cartId: Date.now(),
    };

    onAddToCart(cartItem);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000080] bg-opacity-50">
      <div className="relative w-full max-w-md rounded-xl bg-white p-6">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 text-lg hover:text-black"
        >
          ×
        </button>

        <img src={image} alt={name} className="w-full h-40 object-cover rounded-lg mb-4" />
        <h3 className="font-bold text-xl">{name}</h3>
        <p className="mb-2 text-gray-600 text-sm">{description}</p>
        <p className="mb-4 text-gray-500 text-xs">Protein: {protein_g}g</p>

        {Object.keys(customizations).length > 0 &&
          Object.entries(customizations).map(([category, options]) => {
            const isRadio = category === "bread";
            return (
              <div key={category} className="mb-4">
                <h4 className="mb-1 font-semibold text-sm capitalize">{category.replace("_", " ")}</h4>
                <div className="flex flex-wrap gap-2">
                  {options.map((opt) => (
                    <label key={opt} className="cursor-pointer rounded border px-2 py-1 text-sm hover:bg-gray-100">
                      <input
                        type={isRadio ? "radio" : "checkbox"}
                        name={isRadio ? category : `${category}-${opt}`}
                        checked={
                          isRadio
                            ? selectedOptions[category] === opt
                            : selectedOptions[category]?.includes(opt) || false
                        }
                        onChange={() => toggleOption(category, opt)}
                        className="mr-1"
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>
            );
          })}

        <div className="mt-6">
          <button
            type="button"
            className="w-full rounded bg-black py-2 text-white hover:bg-gray-800"
            onClick={handleAddToCart}
          >
            Add to order
          </button>
        </div>
      </div>
    </div>
  );
}
