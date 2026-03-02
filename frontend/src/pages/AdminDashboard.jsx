import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import { api } from "../api";

function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({ total_fund: 0, total_expenses: 0, balance: 0, pending_count: 0 });

  const loadSummary = async () => {
    try {
      const res = await api.get("/get-summary");
      setSummary(res.data);
    } catch (err) {
      console.log("Error loading summary:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadSummary(); }, []);

  if (loading) {
    return (
      <AdminLayout>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
          <p style={{ color: "var(--slate)", fontSize: "1rem" }}>Loading dashboard...</p>
        </div>
      </AdminLayout>
    );
  }

  const cards = [
    { label: "Total Funds", value: `₹${summary.total_fund}`, accent: "teal", icon: "💎" },
    { label: "Total Disbursed", value: `₹${summary.total_expenses}`, accent: "rose", icon: "📤" },
    { label: "Available Balance", value: `₹${summary.balance}`, accent: "green", icon: "🏦" },
    { label: "Pending Requests", value: summary.pending_count, accent: "amber", icon: "⏳" },
  ];

  return (
    <AdminLayout>
      <div className="animate-in">
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--navy)", marginBottom: "4px" }}>Dashboard</h1>
        <p style={{ color: "var(--slate)", fontSize: "0.875rem", marginBottom: "28px" }}>Overview of all activities</p>

        {/* Summary Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", marginBottom: "32px" }}>
          {cards.map((c, i) => (
            <div key={i} className={`card card-accent-${c.accent}`} style={{ padding: "22px 20px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                <p style={{ fontSize: "0.82rem", fontWeight: 500, color: "var(--slate)", textTransform: "uppercase", letterSpacing: "0.5px" }}>{c.label}</p>
                <span style={{ fontSize: "1.3rem" }}>{c.icon}</span>
              </div>
              <p style={{ fontSize: "1.75rem", fontWeight: 700, color: `var(--${c.accent})` }}>{c.value}</p>
            </div>
          ))}
        </div>

        {/* Quick Info */}
        <div className="card" style={{ padding: "24px" }}>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--navy)", marginBottom: "8px" }}>📈 Quick Summary</h2>
          <p style={{ color: "var(--slate)", fontSize: "0.875rem", lineHeight: 1.6 }}>
            You have <strong style={{ color: "var(--amber)" }}>{summary.pending_count}</strong> pending expense requests awaiting approval.
            The total disbursed amount is <strong style={{ color: "var(--rose)" }}>₹{summary.total_expenses}</strong> with
            a remaining balance of <strong style={{ color: "var(--green)" }}>₹{summary.balance}</strong>.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminDashboard;
