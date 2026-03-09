import AdminAddProduct from "../pages/AdminAddProduct";
import ProtectedRoute from "../components/ProtectedRoute";

<Route
  path="/admin/add-product"
  element={
    <ProtectedRoute adminOnly={true}>
      <AdminAddProduct />
    </ProtectedRoute>
  }
/>