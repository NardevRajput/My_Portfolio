import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "./adminApi";
export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleLogin = async () => {
    try {
      setLoading(true);
      const data = await loginAdmin(username, password);
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (error) {
      alert("Invalid credentials");
    }
    setLoading(false);
  };
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="bg-zinc-900 p-8 rounded-xl w-[350px]">
        <h1 className="text-3xl font-bold mb-6">Admin Login</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 mb-4 rounded bg-zinc-800"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 rounded bg-zinc-800"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-orange-500 p-3 rounded font-bold"
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </div>
    </div>
  );
}
