import { useEffect, useState } from "react";
import EmployeeLayout from "../layouts/EmployeeLayout";
import { api } from "../api";

function EmployeeDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const email = user?.email;

  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({ total_submitted: 0, total_disbursed: 0, total_pending: 0, pending_count: 0, disbursed_count: 0, total_count: 0 });
  const [expenses, setExpenses] = useState([]);

  const loadData = async () => {
    try {
      const res = await api.get(`/get-employee-summary/${email}`);
      setSummary(res.data);
      const sorted = (res.data.expenses || []).sort((a, b) => (b.date || "").localeCompare(a.date || ""));
      setExpenses(sorted);
    } catch (err) {
      console.log("Error loading dashboard data", err);
      if (err.response?.status === 401) { localStorage.clear(); window.location.href = "/login"; }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  if (loading) {
    return (
      <EmployeeLayout>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
          <p style={{ color: "var(--slate)" }}>Loading dashboard...</p>
        </div>
      </EmployeeLayout>
    );
  }

  const cards = [
    { label: "Total Submitted", value: `₹${summary.total_submitted}`, accent: "indigo", icon: "📋", sub: `${summary.total_count} expenses` },
    { label: "Pending Amount", value: `₹${summary.total_pending}`, accent: "amber", icon: "⏳", sub: `${summary.pending_count} pending` },
    { label: "Disbursed Amount", value: `₹${summary.total_disbursed}`, accent: "green", icon: "✅", sub: `${summary.disbursed_count} approved` },
  ];

  return (
    <EmployeeLayout>
      <div className="animate-in">
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--navy)", marginBottom: "4px" }}>My Dashboard</h1>
        <p style={{ color: "var(--slate)", fontSize: "0.875rem", marginBottom: "28px" }}>Your expense summary</p>

        {/* Summary Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", marginBottom: "32px" }}>
          {cards.map((c, i) => (
            <div key={i} className={`card card-accent-${c.accent}`} style={{ padding: "22px 20px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                <p style={{ fontSize: "0.82rem", fontWeight: 500, color: "var(--slate)", textTransform: "uppercase", letterSpacing: "0.5px" }}>{c.label}</p>
                <span style={{ fontSize: "1.3rem" }}>{c.icon}</span>
              </div>
              <p style={{ fontSize: "1.75rem", fontWeight: 700, color: `var(--${c.accent})` }}>{c.value}</p>
              <p style={{ fontSize: "0.78rem", color: "var(--slate-light)", marginTop: "4px" }}>{c.sub}</p>
            </div>
          ))}
        </div>

        {/* Recent Expenses */}
        <div className="card" style={{ padding: "24px" }}>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--navy)", marginBottom: "16px" }}>Recent Expenses</h2>
          {expenses.length > 0 ? (
            <div style={{ overflowX: "auto" }}>
              <table className="clean-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.slice(0, 8).map((exp) => (
                    <tr key={exp.id}>
                      <td>{exp.date}</td>
                      <td>{exp.description}</td>
                      <td style={{ fontWeight: 600 }}>₹{exp.amount}</td>
                      <td>
                        <span className={`badge ${exp.status === "disbursed" ? "badge-disbursed" : "badge-pending"}`}>
                          {exp.status === "disbursed" ? "Disbursed" : "Pending"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p style={{ color: "var(--slate)", textAlign: "center", padding: "24px 0" }}>No expenses yet</p>
          )}
        </div>
      </div>
    </EmployeeLayout>
  );
}

export default EmployeeDashboard;
