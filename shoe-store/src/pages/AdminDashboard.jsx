import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AdminDashboard() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

      <p className="text-gray-600 mb-6">
        Welcome, {user?.name}. Manage your store from here.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <Link
          to="/admin/add-product"
          className="p-6 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
        >
          Add Product
        </Link>

        <Link
          to="/admin/products"
          className="p-6 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
        >
          Manage Products
        </Link>

        <Link
          to="/admin/users"
          className="p-6 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700"
        >
          Manage Users
        </Link>

      </div>
    </div>
  );
}