import React from "react";

export default function Layout({ title = "", right = null, children }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#ffffff",
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto",
      }}
    >
      {/* ===== Header ===== */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          background: "#ffffff",
          borderBottom: "1px solid #f0f0f0",
          padding: "14px 22px",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {/* COOEE LOGO */}
            <img
              src="/cooee-logo.png"
              alt="Cooee"
              style={{ height: 28, objectFit: "contain" }}
            />

            <span
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: "#111",
              }}
            >
              {title}
            </span>
          </div>

          <div>{right}</div>
        </div>
      </header>

      {/* ===== Main Content ===== */}
      <main
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "28px 16px",
        }}
      >
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #f1f1f1",
            borderRadius: 16,
            padding: 20,
            boxShadow: "0 12px 30px rgba(0,0,0,0.06)",
          }}
        >
          {children}
        </div>
      </main>
    </div>
  );
}
