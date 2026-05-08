"use client";

import { useRouter } from "next/navigation";

export default function StoreCreatedPopup({ isVisible, onClose }) {
  const router = useRouter();

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Store Created Successfully!</h2>
        <p className="mb-6">You can now post products to your store.</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Close
          </button>
          <button
            onClick={() => router.push("/seller/products/new")}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Go to Add Product
          </button>
        </div>
      </div>
    </div>
  );
}
