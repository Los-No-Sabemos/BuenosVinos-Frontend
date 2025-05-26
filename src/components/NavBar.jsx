import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

export default function NavBar() {
  const { isLoggedIn, isLoading, user, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logOutUser();
    navigate("/login");
  };

  if (isLoading) return null;

  return (
    <nav className="bg-[#2c1a1d] text-white px-6 py-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        <div className="text-2xl font-serif text-wine font-bold tracking-wide">
          <Link to="/" className="hover:text-[#d4af7f] transition">
            Buenos Vinos
          </Link>
        </div>

        <div className="flex items-center space-x-6 text-base">
          <Link to="/" className="hover:text-[#d4af7f] transition">
            Home
          </Link>
          {isLoggedIn && (
            <>
              <Link to="/add-wine" className="hover:text-[#d4af7f] transition">
                Add Wine
              </Link>
              <Link to="/my-cellar" className="hover:text-[#d4af7f] transition">
                My Cellar
              </Link>
            </>
          )}
          <Link to="/grapes" className="hover:text-[#d4af7f] transition">
            Grapes
          </Link>
          <Link to="/regions" className="hover:text-[#d4af7f] transition">
            Regions
          </Link>
        </div>

        <div className="flex items-center space-x-4 text-sm">
          {isLoggedIn ? (
            <>
              <span className="text-gray-300">
                Welcome, {user?.username || "Enthusiast"}
              </span>
              <button
                onClick={handleLogout}
                className="bg-[#800020] hover:bg-[#a52a2a] px-4 py-1 rounded text-white transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-[#d4af7f] transition">
                Login
              </Link>
              <Link to="/signup" className="hover:text-[#d4af7f] transition">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}