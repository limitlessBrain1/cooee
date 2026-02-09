import { useState } from "react";
import api from "../services/api";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const update = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) return setError("Email and password are required");
    if (form.password.length < 6) return setError("Password must be at least 6 characters");

    try {
      setLoading(true);

      // ✅ backend register endpoint
      const res = await api.post("/api/auth/register", form);

      // if your backend returns token on register:
      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
        window.location.href = "/products";
        return;
      }

      // else go to login page
      window.location.href = "/";
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Register failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 16 }}>
      <div style={{ width: "min(420px, 100%)", background: "#fff", borderRadius: 16, padding: 22 }}>
        <h2 style={{ marginTop: 0 }}>Create Account</h2>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
          <div>
            <label>Name</label>
            <input value={form.name} onChange={(e) => update("name", e.target.value)} />
          </div>

          <div>
            <label>Email</label>
            <input value={form.email} onChange={(e) => update("email", e.target.value)} />
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => update("password", e.target.value)}
            />
          </div>

          {error ? <p style={{ color: "crimson", margin: 0 }}>{error}</p> : null}

          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Sign up"}
          </button>
        </form>

        <p style={{ marginTop: 12, marginBottom: 0 }}>
          Already have an account?{" "}
          <a href="/" style={{ fontWeight: 700 }}>
            Login
          </a>
        </p>
      </div>
    </div>
  );
}