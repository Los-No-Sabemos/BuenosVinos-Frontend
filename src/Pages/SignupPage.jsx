import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../services/api"



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
    // Create an object representing the request body
    const requestBody = { email, password, username };

    // Make an axios request to the API
    // If POST request is successful redirect to login page
    // If the request resolves with an error, set the error message in the state
    axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`,requestBody)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response?.data?.message || "signup failed";
        setErrorMessage(errorDescription);
      })
  };

  return (
    <div className="CohortCreatePage p-8 pb-16 mb-10 mt-10 rounded-lg shadow-md flex flex-col h-full relative w-full max-w-3xl mx-auto">
      <div className="flex justify-center bg-white items-center mb-4 pt-8 absolute top-0 left-0 right-0 py-2 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 border-b border-gray-300 shadow-sm"></div>

      <form
        onSubmit={handleSignupSubmit}
        className="grid grid-cols-1 gap-4 overflow-y-auto mt-12 px-4"
      >
        <h3 className="text-2xl font-semibold text-gray-700 mb-6 sticky left-0">
          Sign Up
        </h3>

        <label
          htmlFor="email"
          className="text-gray-600 text-left ml-1 -mb-2 text-l font-bold"
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={handleEmail}
          className="border rounded p-2 w-full mb-6"
          autoComplete="off"
        />

        <label
          htmlFor="password"
          className="text-gray-600 text-left ml-1 -mb-2 text-l font-bold"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={handlePassword}
          className="border rounded p-2 w-full mb-6"
          autoComplete="off"
        />

<label
          htmlFor="name"
          className="text-gray-600 text-left ml-1 -mb-2 text-l font-bold"
        >
          Username
        </label>
        <input
          type="text"
          name="Username"
          id="Userame"
          value={username}
          onChange={handleUserName}
          className="border rounded p-2 w-full mb-6"
          autoComplete="off"
        />        

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4 transition duration-150 ease-in-out"
        >
          Create Account
        </button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p className="mt-10 mb-2">Already have an account?</p>
      <Link to={"/login"}> Log in</Link>
    </div>
  )
}

export default SignupPage;