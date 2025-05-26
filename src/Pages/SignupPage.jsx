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
    <div className="min-h-screen bg-[#fdf7f2] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 border border-[#e6d3c5]">
        <h2 className="text-3xl font-serif font-bold text-[#4b2e2e] text-center mb-6">
          Create Your Account
        </h2>

        <form onSubmit={handleSignupSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-[#4b2e2e]"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleUserName}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-[#9a6c4a] focus:ring-[#9a6c4a]"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#4b2e2e]"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleEmail}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-[#9a6c4a] focus:ring-[#9a6c4a]"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[#4b2e2e]"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handlePassword}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-[#9a6c4a] focus:ring-[#9a6c4a]"
              required
            />
          </div>

          {errorMessage && (
            <p className="text-sm text-red-600 text-center mt-2">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-[#764134] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#5e332a] transition duration-200"
          >
            Create Account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#764134] hover:underline font-medium"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;