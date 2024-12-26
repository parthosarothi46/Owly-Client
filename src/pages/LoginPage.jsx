import { useState } from "react";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { Link, useNavigate } from "react-router";
import { useAuth } from "@/context/AuthContext";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { login, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      navigate("/");
    } catch (err) {
      setError("Google sign-in failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleEmailLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full px-4 py-2 border rounded-md"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full px-4 py-2 border rounded-md"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md"
        >
          Login
        </button>
      </form>
      <button
        onClick={handleGoogleLogin}
        className="mt-4 w-full bg-red-500 text-white py-2 rounded-md"
      >
        Login with Google
      </button>
      <p className="mt-4">
        Don’t have an account?{" "}
        <Link to="/register" className="text-blue-500">
          Register here
        </Link>
      </p>
    </div>
  );
}

export default LoginPage;
