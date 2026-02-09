import { useEffect, useMemo, useState } from "react";

const emptyForm = {
  name: "",
  sku: "",
  description: "",
  price: "",
  quantity: "",
  category: "",
};

function buildForm(mode, initial) {
  if (mode === "edit" && initial) {
    return {
      name: initial.name || "",
      sku: initial.sku || "",
      description: initial.description || "",
      price: initial.price ?? "",
      quantity: initial.quantity ?? "",
      category: initial.category || "",
    };
  }
  return { ...emptyForm };
}

export default function ProductModal({
  open,
  mode = "create",
  initial,
  onClose,
  onSubmit,
  loading,
}) {
  const initialForm = useMemo(() => buildForm(mode, initial), [mode, initial]);
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setForm(buildForm(mode, initial));
      setError("");
    }
  }, [open, mode, initial]);

  if (!open) return null;

  const update = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.sku || !form.category) {
      return setError("Name, SKU and Category are required");
    }
    if (Number(form.price) <= 0) return setError("Price must be > 0");
    if (Number(form.quantity) < 0) return setError("Quantity cannot be negative");

    await onSubmit({
      ...form,
      price: Number(form.price),
      quantity: Number(form.quantity),
    });
  };

  // ✅ Hard reset styles so global CSS cannot break modal layout
  const labelStyle = {
    all: "unset",
    display: "block",
    fontSize: 13,
    fontWeight: 700,
    color: "#333",
    marginBottom: 6,
  };

  const inputStyle = {
    all: "unset",
    boxSizing: "border-box",
    width: "100%",
    height: 42,
    padding: "0 12px",
    borderRadius: 10,
    border: "1px solid #ddd",
    fontSize: 14,
    background: "#fff",
  };

  const fieldStyle = {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: 0,
  };

  const row2Style = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 16,
  };

  const row3Style = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: 16,
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: 16,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(780px, 100%)",
          background: "#fff",
          borderRadius: 18,
          padding: 24,
          boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
          maxHeight: "85vh",
          overflowY: "auto",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 18,
          }}
        >
          <h3 style={{ margin: 0 }}>
            {mode === "edit" ? "Edit Product" : "Add Product"}
          </h3>

          <button
            type="button"
            style={{
              all: "unset",
              cursor: "pointer",
              padding: "10px 14px",
              borderRadius: 10,
              background: "#111",
              color: "#fff",
              fontWeight: 700,
              fontSize: 14,
            }}
            onClick={onClose}
          >
            Close
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          style={{ display: "grid", gap: 18 }}
        >
          {/* Name + SKU */}
          <div style={row2Style}>
            <div style={fieldStyle}>
              <label style={labelStyle}>Name</label>
              <input
                style={inputStyle}
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
              />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>SKU</label>
              <input
                style={{
                  ...inputStyle,
                  background: mode === "edit" ? "#f6f6f6" : "#fff",
                  cursor: mode === "edit" ? "not-allowed" : "text",
                }}
                value={form.sku}
                onChange={(e) => update("sku", e.target.value)}
                disabled={mode === "edit"}
              />
            </div>
          </div>

          {/* Price + Qty + Category */}
          <div style={row3Style}>
            <div style={fieldStyle}>
              <label style={labelStyle}>Price</label>
              <input
                style={inputStyle}
                type="number"
                value={form.price}
                onChange={(e) => update("price", e.target.value)}
              />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Quantity</label>
              <input
                style={inputStyle}
                type="number"
                value={form.quantity}
                onChange={(e) => update("quantity", e.target.value)}
              />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Category</label>
              <input
                style={inputStyle}
                value={form.category}
                onChange={(e) => update("category", e.target.value)}
              />
            </div>
          </div>

          {/* Description */}
          <div style={fieldStyle}>
            <label style={labelStyle}>Description</label>
            <input
              style={inputStyle}
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              placeholder="Optional"
            />
          </div>

          {error ? (
            <p style={{ margin: 0, color: "crimson", fontWeight: 700 }}>
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            style={{
              all: "unset",
              cursor: loading ? "not-allowed" : "pointer",
              height: 46,
              borderRadius: 12,
              textAlign: "center",
              color: "#fff",
              fontWeight: 800,
              background: "linear-gradient(90deg, #ec4899, #8b5cf6)",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading
              ? "Saving..."
              : mode === "edit"
              ? "Update Product"
              : "Create Product"}
          </button>
        </form>
      </div>
    </div>
  );
}