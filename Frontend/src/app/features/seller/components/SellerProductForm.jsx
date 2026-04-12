"use client";

import { useSellerProductForm } from "@/app/features/seller/hooks/use-seller-product-form";

const fieldClassName =
  "mt-2 w-full rounded-2xl border border-amber-950/15 bg-orange-50 px-4 py-3 text-sm text-amber-950 outline-none transition placeholder:text-amber-500 focus:border-amber-900 focus:bg-white";

export default function SellerProductForm() {
  const {
    form,
    saving,
    error,
    successMessage,
    updateField,
    handleSubmit,
  } = useSellerProductForm();

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid gap-6 md:grid-cols-2">
        <label className="block text-sm font-medium text-amber-950">
          Product name
          <input
            required
            value={form.name}
            onChange={updateField("name")}
            className={fieldClassName}
            placeholder="Velora Linen Shirt"
          />
        </label>

        <label className="block text-sm font-medium text-amber-950">
          Category
          <input
            required
            value={form.category}
            onChange={updateField("category")}
            className={fieldClassName}
            placeholder="Men"
          />
        </label>

        <label className="block text-sm font-medium text-amber-950">
          Subcategory
          <input
            value={form.subCategory}
            onChange={updateField("subCategory")}
            className={fieldClassName}
            placeholder="Shirts"
          />
        </label>

        <label className="block text-sm font-medium text-amber-950">
          Price
          <input
            required
            min="0"
            step="0.01"
            type="number"
            value={form.price}
            onChange={updateField("price")}
            className={fieldClassName}
            placeholder="79.00"
          />
        </label>

        <label className="block text-sm font-medium text-amber-950">
          Old price
          <input
            min="0"
            step="0.01"
            type="number"
            value={form.oldPrice}
            onChange={updateField("oldPrice")}
            className={fieldClassName}
            placeholder="99.00"
          />
        </label>

        <label className="block text-sm font-medium text-amber-950">
          New price
          <input
            min="0"
            step="0.01"
            type="number"
            value={form.newPrice}
            onChange={updateField("newPrice")}
            className={fieldClassName}
            placeholder="79.00"
          />
        </label>
      </div>

      <label className="block text-sm font-medium text-amber-950">
        Product image URL
        <input
          required
          type="url"
          value={form.imageUrl}
          onChange={updateField("imageUrl")}
          className={fieldClassName}
          placeholder="https://images.example.com/velora-product.jpg"
        />
      </label>

      <label className="block text-sm font-medium text-amber-950">
        Description
        <textarea
          required
          value={form.description}
          onChange={updateField("description")}
          className={`${fieldClassName} min-h-36 resize-y`}
          placeholder="Describe the product, materials, and why shoppers should care."
        />
      </label>

      {error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {successMessage ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {successMessage}
        </div>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex rounded-full bg-amber-950 px-5 py-3 text-sm font-semibold text-orange-50 transition hover:bg-amber-900 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? "Publishing..." : "Publish product"}
        </button>
      </div>
    </form>
  );
}
