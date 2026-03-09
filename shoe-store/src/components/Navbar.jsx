import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import logo from "../assets/Cyman Wears (5).png";

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);

  // Get auth state from Redux
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;

      if (current > lastScroll && current > 80) {
        setHidden(true); // hide on scroll down
      } else {
        setHidden(false); // show on scroll up
      }

      setLastScroll(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  return (
    <nav
      className={`
        bg-gray-900 text-white px-6 py-4 flex justify-between items-center
        fixed top-0 left-0 w-full z-50 transition-transform duration-300
        ${hidden ? "-translate-y-full" : "translate-y-0"}
      `}
    >
      <Link to="/" className="flex items-center gap-3">
        <img
          src={logo}
          alt="Cyman Wears Logo"
          className="h-10 w-auto object-contain"
        />
      </Link>

      <div className="flex gap-6 items-center">
        <Link to="/" className="hover:text-blue-400">Home</Link>
        <Link to="/products" className="hover:text-blue-400">Products</Link>

        {/* 🔥 Admin link (only visible when logged in) */}
        {isAuthenticated && (
          <Link
            to="/admin/add-product"
            className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
          >
            Admin
          </Link>
        )}

        <Link to="/login" className="hover:text-blue-400">Login</Link>
        <Link to="/register" className="hover:text-blue-400">Register</Link>
      </div>
    </nav>
  );
}