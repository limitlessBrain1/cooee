export default function ProductCard({ product, onEdit, onDelete }) {
  return (
    <div
      style={{
        border: "1px solid #f1f1f1",
        borderRadius: 14,
        padding: 14,
        boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
        background: "#fff",
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
        <div style={{ fontWeight: 800, fontSize: 16 }}>{product.name}</div>
        <span
          style={{
            fontSize: 12,
            padding: "4px 10px",
            borderRadius: 999,
            background: "#ffe6f1",
            color: "#ff2b8a",
            fontWeight: 700,
            height: "fit-content",
          }}
        >
          {product.category}
        </span>
      </div>

      <div style={{ color: "#6b7280", fontSize: 13 }}>
        SKU: <b style={{ color: "#111" }}>{product.sku}</b>
      </div>

      {product.description ? (
        <div style={{ color: "#374151", fontSize: 13, lineHeight: 1.4 }}>
          {product.description}
        </div>
      ) : null}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          background: "#fafafa",
          border: "1px solid #f3f3f3",
          borderRadius: 12,
          padding: 10,
          fontSize: 13,
        }}
      >
        <div>
          Price: <b>₹{product.price}</b>
        </div>
        <div>
          Qty: <b>{product.quantity}</b>
        </div>
      </div>

      <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
        <button
          style={{ width: "100%" }}
          onClick={() => onEdit(product)}
        >
          Edit
        </button>

        <button
          style={{
            width: "100%",
            background: "#111",
          }}
          onClick={() => onDelete(product)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
