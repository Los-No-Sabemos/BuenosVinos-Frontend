import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { AuthContext } from "../context/auth.context";

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
    <div className="min-h-screen flex flex-col md:flex-row">
     
      <div className="md:w-1/2 h-64 md:h-auto bg-cover bg-center" style={{ backgroundImage: "url('/images/wine-cellar.jpg')" }}>
       
        <div className="w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-white text-3xl md:text-5xl font-serif font-bold text-center px-4">
            Create your own Cellar
          </h1>
        </div>
      </div>

      
      <div className="md:w-1/2 flex items-center justify-center px-6 py-12 bg-[#fdfaf6]">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-serif font-bold text-[#800020] mb-6 text-center">
            Login to Your Collection
          </h2>

          {error && (
            <div className="mb-4 text-sm text-red-600 bg-red-100 px-3 py-2 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#800020]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#800020]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#800020] text-white py-2 rounded hover:bg-[#a52a2a] transition"
            >
              Log In
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Don't have an account?{" "}
            <a href="/signup" className="text-[#800020] hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}