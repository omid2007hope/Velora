"use client";

import { Suspense } from "react";
import ProductList from "../component/productListPage/ProductListPage";
import SiteShell from "@/components/layout/SiteShell";

function ProductListPage() {
  return (
    <SiteShell>
      <Suspense fallback={<div className="p-6 text-center">Loading...</div>}>
        <ProductList />
      </Suspense>
    </SiteShell>
  );
}

export default ProductListPage;


