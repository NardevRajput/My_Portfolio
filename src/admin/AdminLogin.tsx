import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "./adminApi";
import { Eye, EyeOff, LockKeyhole, ShieldCheck } from "lucide-react";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);

      const data = await loginAdmin(username, password);

      localStorage.setItem("token", data.token);

      navigate("/admin/dashboard");
    } catch (error) {
      alert("Invalid credentials");
    }

    setLoading(false);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#08090d] px-4 py-10 text-white">

      {/* Background Effects */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-orange-500/10 blur-[120px]" />

      <div className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-orange-600/10 blur-[120px]" />

      {/* Login Card */}
      <div className="relative w-full max-w-md">

        {/* Brand Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-orange-500/20 bg-orange-500/10 shadow-lg shadow-orange-500/5">
            <ShieldCheck
              size={34}
              className="text-orange-400"
            />
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Admin <span className="text-orange-500">Login</span>
          </h1>

          <p className="mt-3 text-sm text-zinc-400">
            Welcome back! Sign in to manage your portfolio.
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-2xl border border-white/[0.08] bg-[#15161c] p-6 shadow-2xl shadow-black/40 sm:p-9">

          <div className="mb-7">
            <h2 className="text-xl font-semibold">
              Sign in to your account
            </h2>

            <p className="mt-2 text-sm text-zinc-500">
              Enter your administrator credentials below.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!loading) {
                void handleLogin();
              }
            }}
            className="space-y-5"
          >
            {/* Username */}
            <div>
              <label
                htmlFor="admin-username"
                className="mb-2 block text-sm font-medium text-zinc-300"
              >
                Username
              </label>

              <div className="relative">
                <input
                  id="admin-username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  required
                  className="w-full rounded-xl border border-white/10 bg-[#0d0e13] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="mb-2 flex items-center justify-between gap-3">
                <label
                  htmlFor="admin-password"
                  className="block text-sm font-medium text-zinc-300"
                >
                  Password
                </label>

                <button
                  type="button"
                  onClick={() => navigate("/admin/forgot-password")}
                  className="text-xs font-medium text-orange-400 transition hover:text-orange-300 sm:text-sm"
                >
                  Forgot password?
                </button>
              </div>

              <div className="relative">
                <LockKeyhole
                  size={18}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                />

                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  className="w-full rounded-xl border border-white/10 bg-[#0d0e13] py-3.5 pl-11 pr-12 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 transition hover:text-white"
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-3.5 font-semibold text-white shadow-lg shadow-orange-500/20 transition duration-200 hover:from-orange-400 hover:to-orange-500 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Signing in...
                </>
              ) : (
                "Sign In to Dashboard"
              )}
            </button>
          </form>

          {/* Security Note */}
          <div className="mt-7 flex items-center justify-center gap-2 border-t border-white/[0.07] pt-5 text-xs text-zinc-500">
            <LockKeyhole size={14} className="text-orange-400" />

            <span>Secure administrator access</span>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-zinc-600">
          © {new Date().getFullYear()} Nardev Rajput. All rights reserved.
        </p>
      </div>
    </div>
  );
}