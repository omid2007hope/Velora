"use client";
import { Suspense } from "react";
import ProductListPage from "../page/ProductListPage.jsx";

function ProductsPageContent() {
  return <ProductListPage />;
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading products...</div>}>
      <ProductsPageContent />
    </Suspense>
  );
}
