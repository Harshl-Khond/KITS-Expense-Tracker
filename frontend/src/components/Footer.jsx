function Footer() {
  return (
    <footer style={{ background: "var(--navy)", padding: "20px 0", marginTop: "auto" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.82rem", fontWeight: 500 }}>
          © {new Date().getFullYear()} Expense Management System
        </p>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", marginTop: "4px" }}>
          Designed & Developed by{" "}
          <a href="https://kitstechsolutions.com/" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "underline" }}>
            KITS
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
