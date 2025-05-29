import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleUserName = (e) => setUserName(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password, username };

    axios
      .post(`${import.meta.env.VITE_API_URL}/auth/signup`, requestBody)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription =
          error.response?.data?.message || "Signup failed";
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="min-h-screen bg-[#fdfaf6] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 sm:p-8 border border-[#e6d3c5]">
        <h2
          className="text-2xl sm:text-3xl text-center mb-6"
          style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "#800020" }}
        >
          Create Your Account
        </h2>

        <form onSubmit={handleSignupSubmit} className="space-y-4" style={{ fontFamily: "'Lato', sans-serif" }}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium"
              style={{ color: "#800020" }}
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleUserName}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-[#800020] focus:ring-[#800020]"
              required
              style={{ fontFamily: "'Lato', sans-serif" }}
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium"
              style={{ color: "#800020" }}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleEmail}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-[#800020] focus:ring-[#800020]"
              required
              style={{ fontFamily: "'Lato', sans-serif" }}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium"
              style={{ color: "#800020" }}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handlePassword}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-[#800020] focus:ring-[#800020]"
              required
              style={{ fontFamily: "'Lato', sans-serif" }}
            />
          </div>

          {errorMessage && (
            <p className="text-sm text-red-600 text-center mt-2" style={{ fontFamily: "'Lato', sans-serif" }}>
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-[#800020] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#a52a2a] transition duration-200"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            Create Account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600" style={{ fontFamily: "'Lato', sans-serif" }}>
          Already have an account?{" "}
          <Link to="/login" className="text-[#800020] hover:underline font-medium">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;