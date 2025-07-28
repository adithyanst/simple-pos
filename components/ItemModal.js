"use client";

export default function ItemModal({ item, onClose }) {
  if (!item) return null;

  const { name, image, description, protein_g, customizations } = item;

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
          <button type="button" className="w-full rounded bg-black py-2 text-white hover:bg-gray-800">
            Add to order
          </button>
        </div>
      </div>
    </div>
  );
}
