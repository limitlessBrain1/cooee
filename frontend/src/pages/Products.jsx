import { useEffect, useState, useCallback } from "react";
import api from "../services/api";
import Layout from "../components/Layout.jsx";
import ProductModal from "../components/ProductModal.jsx";

export default function Products() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("newest"); // newest | price_asc | price_desc
  const [page, setPage] = useState(1);
  const limit = 10;

  const [meta, setMeta] = useState({ total: 0, totalPages: 1 });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [selected, setSelected] = useState(null);
  const [saving, setSaving] = useState(false);

  const fetchProducts = useCallback(
    async ({ nextPage = page } = {}) => {
      setLoading(true);
      setError("");

      try {
        // ✅ FIX: backend uses /api/v1/products
        const res = await api.get("/api/v1/products", {
          params: { search, category, sort, page: nextPage, limit },
        });

        const data = res.data;
        const products = Array.isArray(data)
          ? data
          : Array.isArray(data?.products)
          ? data.products
          : [];

        setItems(products);

        if (Array.isArray(data)) {
          setMeta({ total: products.length, totalPages: 1 });
        } else {
          setMeta({
            total: Number(data.total ?? products.length),
            totalPages: Number(data.totalPages ?? 1),
          });
        }
      } catch (err) {
        const status = err?.response?.status;
        setError(
          err?.response?.data?.message || err.message || "Failed to load products"
        );

        if (status === 401) {
          localStorage.removeItem("token");
          window.location.href = "/";
        }
      } finally {
        setLoading(false);
      }
    },
    [page, search, category, sort]
  );

  useEffect(() => {
    fetchProducts({ nextPage: page });
  }, [page, fetchProducts]);

  const openCreate = () => {
    setSelected(null);
    setModalMode("create");
    setModalOpen(true);
  };

  const openEdit = (p) => {
    setSelected(p);
    setModalMode("edit");
    setModalOpen(true);
  };

  const handleSubmit = async (payload) => {
    setSaving(true);
    setError("");

    try {
      if (modalMode === "create") {
        // ✅ FIX: backend uses /api/v1/products
        await api.post("/api/v1/products", payload);
      } else {
        if (!selected?._id) throw new Error("Missing product id");
        // ✅ FIX: backend uses /api/v1/products/:id
        await api.put(`/api/v1/products/${selected._id}`, payload);
      }

      setModalOpen(false);
      setPage(1);
      await fetchProducts({ nextPage: 1 });
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || "Save failed";

      if (msg.includes("E11000") && msg.toLowerCase().includes("sku")) {
        setError("SKU already exists. Please use a unique SKU.");
      } else {
        setError(msg);
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (p) => {
    const id = p?._id;

    if (!id) {
      setError("Missing product id (_id). Cannot delete.");
      return;
    }

    const ok = window.confirm(`Delete "${p.name}"?`);
    if (!ok) return;

    setError("");

    try {
      // ✅ FIX: backend uses /api/v1/products/:id
      await api.delete(`/api/v1/products/${id}`);
      setPage(1);
      await fetchProducts({ nextPage: 1 });
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Delete failed");
    }
  };

  const categories = Array.from(
    new Set(items.map((p) => p.category).filter(Boolean))
  );

  return (
    <Layout
      title="Products"
      right={
        <div style={{ display: "flex", gap: 10 }}>
          <button style={{ width: 140 }} onClick={openCreate}>
            + Add Product
          </button>
          <button
            style={{ width: 110, background: "#111" }}
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/";
            }}
          >
            Logout
          </button>
        </div>
      }
    >
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 14 }}>
        <input
          style={{ flex: 1, minWidth: 220 }}
          placeholder="Search by name / sku / category"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ minWidth: 180 }}
        >
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          style={{ minWidth: 180 }}
        >
          <option value="newest">Newest</option>
          <option value="price_asc">Price: Low → High</option>
          <option value="price_desc">Price: High → Low</option>
        </select>

        <button
          style={{ width: 120 }}
          onClick={() => {
            setPage(1);
            fetchProducts({ nextPage: 1 });
          }}
        >
          Apply
        </button>
      </div>

      {loading ? <p>Loading...</p> : null}
      {error ? <p style={{ color: "crimson", margin: 0 }}>{error}</p> : null}

      <div style={{ overflowX: "auto", border: "1px solid #eee", borderRadius: 14 }}>
        <table
          width="100%"
          cellPadding="12"
          style={{ borderCollapse: "collapse", background: "#fff" }}
        >
          <thead>
            <tr style={{ textAlign: "left", borderBottom: "1px solid #eee" }}>
              <th>Name</th>
              <th>SKU</th>
              <th>Category</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {items.map((p) => {
              const lowStock = Number(p.quantity) < 10;

              return (
                <tr
                  key={p._id}
                  style={{
                    borderBottom: "1px solid #f4f4f4",
                    background: lowStock ? "#fff3f3" : "transparent",
                  }}
                >
                  <td style={{ fontWeight: 600 }}>{p.name}</td>
                  <td>{p.sku}</td>
                  <td>{p.category}</td>
                  <td>{p.price}</td>
                  <td>
                    {p.quantity}{" "}
                    {lowStock ? (
                      <span style={{ color: "crimson", fontWeight: 700 }}>
                        (Low)
                      </span>
                    ) : null}
                  </td>

                  <td>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button onClick={() => openEdit(p)}>Edit</button>
                      <button
                        onClick={() => handleDelete(p)}
                        style={{ background: "#111" }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}

            {!loading && items.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ padding: 16 }}>
                  No products found
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 14,
        }}
      >
        <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
          Prev
        </button>

        <span style={{ fontWeight: 600 }}>
          Page {page} / {meta.totalPages} • Total: {meta.total}
        </span>

        <button
          disabled={page >= meta.totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>

      <ProductModal
        key={`${modalMode}-${selected?._id || "new"}`}
        open={modalOpen}
        mode={modalMode}
        initial={selected}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        loading={saving}
      />
    </Layout>
  );
}