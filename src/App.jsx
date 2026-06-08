import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AuthEntry from "./hooks/AuthEntry";
import DashboardPage from "./pages/Dashboard";
import ContactPage from "./pages/Contact";
import DestinationsPage from "./pages/Destinations";
import NotFoundPage from "./components/NotFoundPage";
import AdminPage from "./pages/Admin";
import { AdminRoute, GuestRoute, ProtectedRoute } from "./components/ProtectedRoute";


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/destinations" element={<DestinationsPage />} />
      <Route path="/auth" element={
        <GuestRoute>
          <AuthEntry />
        </GuestRoute>
      } />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
      } />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/admin" element={
        <AdminRoute>
          <AdminPage />
        </AdminRoute>
      } />


    </Routes>
  );
}