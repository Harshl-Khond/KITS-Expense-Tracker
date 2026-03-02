import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";

// Lazy load all pages — only loads when navigated to
const Signup = lazy(() => import("./pages/signup.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Unauthorized = lazy(() => import("./pages/Unauthorized"));

const EmployeeDashboard = lazy(() => import("./pages/EmployeeDashboard"));
const Expense = lazy(() => import("./pages/Expense"));
const ShowExpenses = lazy(() => import("./pages/ShowExpenses"));

const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AddFund = lazy(() => import("./pages/AddFund"));
const FundDashboard = lazy(() => import("./pages/FundDashboard"));
const AllExpenses = lazy(() => import("./pages/AllExpenses"));

// Loading fallback
const PageLoader = () => (
  <div style={{
    display: "flex", alignItems: "center", justifyContent: "center",
    minHeight: "100vh", backgroundColor: "#f0f2f5",
  }}>
    <div style={{ textAlign: "center" }}>
      <div style={{
        width: "40px", height: "40px", border: "4px solid #e0e0e0",
        borderTop: "4px solid #52796F", borderRadius: "50%",
        animation: "spin 0.8s linear infinite", margin: "0 auto 12px",
      }} />
      <p style={{ color: "#4F5D5E", fontSize: "1rem" }}>Loading...</p>
    </div>
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Unauthorized Page */}
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* ===========================
              EMPLOYEE PROTECTED ROUTES
           =========================== */}
        <Route
          path="/employee-dashboard"
          element={
            <ProtectedRoute role="employee">
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/expense"
          element={
            <ProtectedRoute role="employee">
              <Expense />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-expenses"
          element={
            <ProtectedRoute role="employee">
              <ShowExpenses />
            </ProtectedRoute>
          }
        />

        {/* ===========================
              ADMIN PROTECTED ROUTES
           =========================== */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-fund"
          element={
            <ProtectedRoute role="admin">
              <AddFund />
            </ProtectedRoute>
          }
        />

        <Route
          path="/fund-dashboard"
          element={
            <ProtectedRoute role="admin">
              <FundDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin-expenses"
          element={
            <ProtectedRoute role="admin">
              <AllExpenses />
            </ProtectedRoute>
          }
        />

      </Routes>
    </Suspense>
  );
}

export default App;
