import { useEffect, useState } from "react";
import api from "../services/api";
import Layout from "../components/Layout";


export default function Products() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [meta, setMeta] = useState({ total: 0, totalPages: 1 });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchProducts = async (nextPage = page) => {
    setLoading(true);
    setError("");

    try {
      const res = await api.get("/api/products", {
        params: { search, page: nextPage, limit },
      });

      // ✅ Your backend returns: { page, limit, total, totalPages, products }
      const data = res.data || {};
      const products = Array.isArray(data.products) ? data.products : [];

      setItems(products);
      setMeta({
        total: Number(data.total ?? products.length),
        totalPages: Number(data.totalPages ?? 1),
      });
    } catch (err) {
      const status = err?.response?.status;

      setError(err?.response?.data?.message || err.message || "Failed to load products");

      // ✅ If token missing/invalid → go back to login
      if (status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/";
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
  <Layout
    title="Products"
    right={
      <button
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/";
        }}
      >
        Logout
      </button>
    }
  >
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <div style={{ flex: 1 }}>
          <input
            placeholder="Search by name / sku / category"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <button
          style={{ width: 140 }}
          onClick={() => {
            setPage(1);
            fetchProducts(1);
          }}
        >
          Search
        </button>
      </div>

      {loading ? <p>Loading...</p> : null}
      {error ? <p style={{ color: "crimson" }}>{error}</p> : null}

      <div style={{ overflowX: "auto" }}>
        <table width="100%" cellPadding="12" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ textAlign: "left", borderBottom: "1px solid #eee" }}>
              <th>Name</th>
              <th>SKU</th>
              <th>Category</th>
              <th>Price</th>
              <th>Qty</th>
            </tr>
          </thead>

          <tbody>
            {items.map((p) => (
              <tr key={p._id} style={{ borderBottom: "1px solid #f5f5f5" }}>
                <td>{p.name}</td>
                <td>{p.sku}</td>
                <td>{p.category}</td>
                <td>{p.price}</td>
                <td>{p.quantity}</td>
              </tr>
            ))}

            {!loading && items.length === 0 ? (
              <tr>
                <td colSpan="5">No products found</td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
          Prev
        </button>

        <span style={{ fontWeight: 600 }}>
          Page {page} / {meta.totalPages} • Total: {meta.total}
        </span>

        <button disabled={page >= meta.totalPages} onClick={() => setPage((p) => p + 1)}>
          Next
        </button>
      </div>
    </div>
  </Layout>
);
}