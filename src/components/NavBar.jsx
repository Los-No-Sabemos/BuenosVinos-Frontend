import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { HiMenu, HiX } from "react-icons/hi";

export default function NavBar() {
  const { isLoggedIn, isLoading, user, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logOutUser();
    navigate("/login");
  };

  const handleButtonHover = (e, hover) => {
    e.currentTarget.style.fontFamily = hover ? "'Sacramento', cursive" : "'Merriweather', serif";
  };

  if (isLoading) return null;

  return (
    <nav className="bg-[#2c1a1d] text-white px-4 sm:px-6 py-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div
          className="text-2xl font-bold tracking-wide"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          <Link to="/" className="hover:text-[#d4af7f] transition">
            Buenos Vinos
          </Link>
        </div>

        <div className="sm:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <HiX className="text-2xl text-white" />
            ) : (
              <HiMenu className="text-2xl text-white" />
            )}
          </button>
        </div>

        <div
          className="hidden sm:flex items-center space-x-6 text-base"
          style={{ fontFamily: "'Merriweather', serif" }}
        >
          <Link to="/" className="hover:text-[#d4af7f] transition">Home</Link>
          {isLoggedIn && (
            <>
              <Link to="/add-wine" className="hover:text-[#d4af7f] transition">Add Wine</Link>
              <Link to="/my-cellar" className="hover:text-[#d4af7f] transition">My Cellar</Link>
            </>
          )}
          <Link to="/grapes" className="hover:text-[#d4af7f] transition">Grapes</Link>
          <Link to="/regions" className="hover:text-[#d4af7f] transition">Regions</Link>
        </div>

        <div
          className="hidden sm:flex items-center space-x-4 text-sm"
          style={{ fontFamily: "'Merriweather', serif" }}
        >
          {isLoggedIn ? (
            <>
              <span className="text-gray-300">
                Welcome, {user?.username || "Enthusiast"}
              </span>
              <button
                onClick={handleLogout}
                className="bg-[#800020] hover:bg-[#a52a2a] px-4 py-1 rounded text-white transition"
                onMouseEnter={(e) => handleButtonHover(e, true)}
                onMouseLeave={(e) => handleButtonHover(e, false)}
                style={{ fontFamily: "'Merriweather', serif" }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-[#d4af7f] transition">Login</Link>
              <Link to="/signup" className="hover:text-[#d4af7f] transition">Signup</Link>
            </>
          )}
        </div>
      </div>

      {menuOpen && (
        <div
          className="sm:hidden mt-4 space-y-2 px-2 text-sm"
          style={{ fontFamily: "'Merriweather', serif" }}
        >
          <Link to="/" className="block hover:text-[#d4af7f]" onClick={() => setMenuOpen(false)}>Home</Link>
          {isLoggedIn && (
            <>
              <Link to="/add-wine" className="block hover:text-[#d4af7f]" onClick={() => setMenuOpen(false)}>Add Wine</Link>
              <Link to="/my-cellar" className="block hover:text-[#d4af7f]" onClick={() => setMenuOpen(false)}>My Cellar</Link>
            </>
          )}
          <Link to="/grapes" className="block hover:text-[#d4af7f]" onClick={() => setMenuOpen(false)}>Grapes</Link>
          <Link to="/regions" className="block hover:text-[#d4af7f]" onClick={() => setMenuOpen(false)}>Regions</Link>

          <div className="border-t border-[#444] pt-2 mt-2">
            {isLoggedIn ? (
              <>
                <span className="block text-gray-300 mb-1">
                  Welcome, {user?.username || "Enthusiast"}
                </span>
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="w-full text-left bg-[#800020] hover:bg-[#a52a2a] px-4 py-2 rounded text-white"
                  onMouseEnter={(e) => handleButtonHover(e, true)}
                  onMouseLeave={(e) => handleButtonHover(e, false)}
                  style={{ fontFamily: "'Merriweather', serif" }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block hover:text-[#d4af7f]" onClick={() => setMenuOpen(false)}>Login</Link>
                <Link to="/signup" className="block hover:text-[#d4af7f]" onClick={() => setMenuOpen(false)}>Signup</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}