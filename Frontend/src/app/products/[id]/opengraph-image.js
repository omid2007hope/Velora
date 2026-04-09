import { ImageResponse } from "next/og";
import { getProductById } from "@/app/lib/server-api";

export const runtime = "edge";
export const alt = "Velora product preview";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

function formatPrice(product) {
  const price = product?.newPrice ?? product?.price;

  if (!Number.isFinite(Number(price))) {
    return "Discover the latest drop";
  }

  return `$${Number(price).toFixed(2)}`;
}

export default async function ProductOpenGraphImage({ params }) {
  const result = await getProductById(params?.id).catch(() => ({
    product: null,
  }));
  const product = result.product;

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "56px",
        background:
          "linear-gradient(145deg, #1c1917 0%, #78350f 55%, #fdba74 100%)",
        color: "#fff7ed",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 28,
          textTransform: "uppercase",
          letterSpacing: "0.18em",
        }}
      >
        <span>Velora</span>
        <span style={{ opacity: 0.82 }}>{product?.category || "Product"}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div
          style={{
            display: "flex",
            maxWidth: 920,
            fontSize: 74,
            fontWeight: 700,
            lineHeight: 1.04,
          }}
        >
          {product?.name || "Curated style, ready to shop"}
        </div>
        <div
          style={{
            display: "flex",
            maxWidth: 880,
            fontSize: 28,
            lineHeight: 1.35,
            opacity: 0.92,
          }}
        >
          {product?.description ||
            "Browse the latest clothing, watches, and accessories from Velora."}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 44,
            fontWeight: 700,
          }}
        >
          {formatPrice(product)}
        </div>
        <div
          style={{
            display: "flex",
            border: "1px solid rgba(255, 247, 237, 0.35)",
            borderRadius: 9999,
            padding: "16px 26px",
            fontSize: 24,
          }}
        >
          Velora Store
        </div>
      </div>
    </div>,
    size,
  );
}
