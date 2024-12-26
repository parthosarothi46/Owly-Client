import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Link, useNavigate } from "react-router";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { register } = useAuth();

  // Password validation logic
  const validatePassword = (password) => {
    return /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(password);
  };

  // Handle registration
  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    if (!validatePassword(password)) {
      setError(
        "Password must contain at least 6 characters, including uppercase and lowercase letters."
      );
      return;
    }

    setLoading(true);

    try {
      // Use the register function from AuthContext
      await register(email, password, name, photoURL);
      navigate("/"); // Redirect to home after successful registration
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleRegister} className="space-y-4 w-80">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="url"
          placeholder="Photo URL"
          value={photoURL}
          onChange={(e) => setPhotoURL(e.target.value)}
          className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className={`w-full bg-blue-500 text-white py-2 rounded-md ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
          }`}
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
      <p className="mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500 hover:underline">
          Login here
        </Link>
      </p>
    </div>
  );
}

export default RegisterPage;
