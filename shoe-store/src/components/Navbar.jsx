import { Link } from "react-router-dom"
import logo from "../assets/Cyman Wears (5).png"   // adjust path as needed

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
      
      <Link to="/" className="flex items-center gap-3">
        <img 
          src={logo} 
          alt="Cyman Wears Logo" 
          className="h-10 w-auto object-contain"
        />
      </Link>

      <div className="flex gap-6">
        <Link to="/" className="hover:text-blue-400">Home</Link>
        <Link to="/products" className="hover:text-blue-400">Products</Link>
        <Link to="/login" className="hover:text-blue-400">Login</Link>
        <Link to="/register" className="hover:text-blue-400">Register</Link>
      </div>
    </nav>
  )
}