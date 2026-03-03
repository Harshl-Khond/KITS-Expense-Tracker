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
    { label: "Total Expense", value: `₹${summary.total_submitted}`, accent: "indigo", icon: "📋", sub: `${summary.total_count} expenses` },
    { label: "Pending Expense", value: `₹${summary.total_pending}`, accent: "amber", icon: "⏳", sub: `${summary.pending_count} pending` },
    { label: "Disbursed Expense", value: `₹${summary.total_disbursed}`, accent: "green", icon: "✅", sub: `${summary.disbursed_count} approved` },
  ];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <EmployeeLayout>
      <div className="animate-in dashboard-container">
        <div className="premium-header">
          <h1>{getGreeting()}, {user?.name || 'Employee'}!</h1>
          <p>Your personal expense summary and history</p>
        </div>

        {/* Summary Cards */}
        <div className="stats-grid">
          {cards.map((c, i) => (
            <div key={i} className={`card glass-card hover-lift card-accent-${c.accent}`} style={{ padding: "24px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                <p style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--slate)", textTransform: "uppercase", letterSpacing: "0.8px" }}>{c.label}</p>
                <div style={{ background: `var(--${c.accent}-light)`, padding: '8px', borderRadius: '10px', fontSize: '1.2rem' }}>{c.icon}</div>
              </div>
              <p style={{ fontSize: "2rem", fontWeight: 800, color: `var(--${c.accent})`, letterSpacing: '-1px' }}>{c.value}</p>
              <p style={{ fontSize: "0.75rem", color: "var(--slate-light)", marginTop: "8px", fontWeight: 500 }}>{c.sub}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '40px' }}></div>

        {/* Recent Expenses */}
        <div className="chart-container animate-in" style={{ padding: "24px", animationDelay: '0.1s' }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--navy)", marginBottom: "20px" }}>📑 Recent Expenses</h2>
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
                      <td style={{ fontWeight: 500 }}>{exp.date}</td>
                      <td>{exp.description}</td>
                      <td style={{ fontWeight: 700, color: 'var(--navy)' }}>₹{exp.amount}</td>
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
            <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--slate)' }}>
              <span style={{ fontSize: '3rem', marginBottom: '16px', display: 'block' }}>📭</span>
              <p>No expenses found in your history</p>
            </div>
          )}
        </div>
      </div>
    </EmployeeLayout>
  );
}

export default EmployeeDashboard;
