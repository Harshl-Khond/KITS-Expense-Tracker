import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";

function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/signup", form);
      setMessage(res.data.message);
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      if (err.response) setMessage(err.response.data.error);
      else setMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px", background: "var(--bg)" }}>
      <div className="card animate-in" style={{ width: "100%", maxWidth: "400px", padding: "36px 32px" }}>

        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "var(--indigo)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "22px", color: "#fff", marginBottom: "14px" }}>✨</div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--navy)" }}>Create Account</h2>
          <p style={{ color: "var(--slate)", fontSize: "0.875rem", marginTop: "4px" }}>Join the expense management system</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div>
            <label style={{ display: "block", marginBottom: "5px", fontSize: "0.82rem", fontWeight: 500, color: "var(--navy-light)" }}>Full Name</label>
            <input name="name" placeholder="John Doe" onChange={handleChange} className="input" required />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "5px", fontSize: "0.82rem", fontWeight: 500, color: "var(--navy-light)" }}>Email</label>
            <input name="email" type="email" placeholder="you@example.com" onChange={handleChange} className="input" required />
          </div>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "5px" }}>
              <label style={{ fontSize: "0.82rem", fontWeight: 500, color: "var(--navy-light)" }}>Password</label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ background: "none", border: "none", fontSize: "0.75rem", color: "var(--indigo)", cursor: "pointer", fontWeight: 600 }}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "5px", fontSize: "0.82rem", fontWeight: 500, color: "var(--navy-light)" }}>Role</label>
            <select name="role" onChange={handleChange} className="input" required>
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
            </select>
          </div>
          <button type="submit" className="btn btn-indigo" style={{ width: "100%", marginTop: "6px", padding: "11px", opacity: loading ? 0.7 : 1 }} disabled={loading}>
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        {message && (
          <p style={{ textAlign: "center", marginTop: "14px", fontSize: "0.85rem", fontWeight: 500, color: message.toLowerCase().includes("success") || message.toLowerCase().includes("created") ? "var(--green)" : "var(--rose)" }}>
            {message}
          </p>
        )}

        <div style={{ textAlign: "center", marginTop: "18px" }}>
          <button onClick={() => navigate("/login")} className="btn btn-outline" style={{ width: "100%" }}>
            Already have an account? Sign In
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
