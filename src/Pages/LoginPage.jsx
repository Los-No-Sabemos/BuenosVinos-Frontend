import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { AuthContext } from "../context/auth.context";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", { email, password });

      storeToken(response.data.authToken);
      authenticateUser();
      navigate("/");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-col md:flex-row flex-1">
        <div
          className="md:w-1/2 h-64 sm:h-80 md:h-auto bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://summit-cellars.com/wp-content/uploads/2019/01/DSC_4595HDR.jpg)",
          }}
          aria-label="Wine cellar background"
          role="img"
        >
          <div className="w-full h-full bg-black bg-opacity-50 flex items-center justify-center px-4">
            <motion.h1
              className="text-white text-2xl sm:text-3xl md:text-4xl text-center"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              Create your own Cellar
            </motion.h1>
          </div>
        </div>

        <div className="md:w-1/2 flex items-center justify-center px-6 py-12 bg-[#fdfaf6]">
          <div className="w-full max-w-md">
            <h2
              className="text-2xl sm:text-3xl mb-6 text-center"
              style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "#800020" }}
            >
              Login to Your Collection
            </h2>

            {error && (
              <div className="mb-4 text-sm text-red-600 bg-red-100 px-3 py-2 rounded" role="alert">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#800020]"
                  style={{ fontFamily: "'Lato', sans-serif" }}
                  autoComplete="email"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#800020]"
                  style={{ fontFamily: "'Lato', sans-serif" }}
                  autoComplete="current-password"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#800020] text-white py-2 rounded hover:bg-[#a52a2a] transition"
                style={{ fontFamily: "'Lato', sans-serif", fontWeight: 600 }}
              >
                Log In
              </button>
            </form>

            <p className="text-center text-sm text-gray-600 mt-6" style={{ fontFamily: "'Lato', sans-serif" }}>
              Don't have an account?{" "}
              <a href="/signup" className="text-[#800020] hover:underline focus:outline-none focus:ring-2 focus:ring-[#800020] rounded">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}