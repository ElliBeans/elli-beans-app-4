import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) setError(error.message);
    setLoading(false);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) setError(error.message);
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-center mb-6">Elli Beans Login</h1>

        <form className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring focus:ring-amber-300"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring focus:ring-amber-300"
          />

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 rounded-lg"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <button
            onClick={handleSignup}
            disabled={loading}
            className="border border-amber-500 text-amber-600 font-medium py-2 rounded-lg hover:bg-amber-50"
          >
            {loading ? "Creating..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}
