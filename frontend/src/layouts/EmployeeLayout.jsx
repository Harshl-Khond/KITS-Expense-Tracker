import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Footer from "../components/Footer";
import { getPrefetchHandler } from "../prefetch";

const navItems = [
  ["Dashboard", "/employee-dashboard"],
  ["Add Expense", "/expense"],
  ["My Expenses", "/my-expenses"],
];

function EmployeeLayout({ children }) {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);

  const logout = () => { localStorage.clear(); navigate("/login"); };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", display: "flex", flexDirection: "column" }}>
      {/* Navbar */}
      <nav className="navbar">
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", display: "flex", justifyContent: "space-between", alignItems: "center", height: "60px" }}>
          <h1 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff", letterSpacing: "-0.3px" }}>
            💼 Employee Panel
          </h1>

          {/* Desktop */}
          <div className="hidden md:flex" style={{ alignItems: "center", gap: "24px" }}>
            {navItems.map(([label, path]) => (
              <Link key={label} to={path} className="nav-link" onMouseEnter={getPrefetchHandler(path)}>{label}</Link>
            ))}
            <button onClick={logout} className="btn btn-rose btn-sm">Logout</button>
          </div>

          {/* Mobile */}
          <button className="md:hidden" style={{ background: "none", border: "none", color: "#fff", fontSize: "1.5rem", cursor: "pointer" }} onClick={() => setOpenMenu(!openMenu)}>
            {openMenu ? "✕" : "☰"}
          </button>
        </div>

        {openMenu && (
          <div style={{ background: "var(--navy-light)", padding: "12px 24px 16px" }} className="md:hidden">
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {navItems.map(([label, path]) => (
                <Link key={label} to={path} onClick={() => setOpenMenu(false)} onMouseEnter={getPrefetchHandler(path)} style={{ color: "rgba(255,255,255,0.8)", padding: "8px 0", textDecoration: "none", fontSize: "0.9rem" }}>{label}</Link>
              ))}
              <button onClick={logout} className="btn btn-rose btn-sm" style={{ marginTop: "8px" }}>Logout</button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main style={{ flex: 1, paddingTop: "80px", paddingBottom: "24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default EmployeeLayout;
