"use client";
import ProductPage from "../../page/ProductPage.jsx";

export default function ProductDetailPage({ params }) {
  const productId = params?.id;
  return <ProductPage productId={productId} />;
}
