
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Mail,
  MessageSquare,
  ShieldCheck,
  KeyRound,
} from "lucide-react";

import {
  forgotPassword,
  verifyOtp,
  resetPassword,
} from "./adminApi";

type Method = "EMAIL" | "SMS";
type Step = "request" | "verify" | "reset" | "success";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [method, setMethod] = useState<Method>("EMAIL");
  const [otp, setOtp] = useState("");
  const [requestId, setRequestId] = useState<number | null>(null);
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<Step>("request");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleRequestOtp = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!username.trim()) {
      setError("Please enter your admin username or registered email.");
      return;
    }

    try {
      setLoading(true);

      const response = await forgotPassword(
        username.trim(),
        method
      );

      if (typeof response.requestId !== "number") {
        throw new Error("The server did not return a valid request ID.");
      }

      setRequestId(response.requestId);
      setMessage(
        response.message || "OTP request submitted successfully."
      );
      setStep("verify");
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to request OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (requestId === null) {
      setError("Please request a new OTP first.");
      return;
    }

    if (!/^\d{4,8}$/.test(otp.trim())) {
      setError("Enter the valid numeric OTP.");
      return;
    }

    try {
      setLoading(true);

      const response = await verifyOtp(requestId, otp.trim());

      if (!response.resetToken) {
        throw new Error("The server did not return a reset token.");
      }

      setResetToken(response.resetToken);
      setMessage(
        response.message || "OTP verified successfully."
      );
      setStep("reset");
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "OTP verification failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (newPassword.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await resetPassword(
        resetToken,
        newPassword
      );

      setMessage(
        response.message || "Password reset successfully."
      );
      setStep("success");
      setOtp("");
      setNewPassword("");
      setConfirmPassword("");
      setResetToken("");
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Password reset failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-[#0d0e13] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10";

  const primaryButtonClass =
    "flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-3.5 font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:from-orange-400 hover:to-orange-500 disabled:cursor-not-allowed disabled:opacity-60";

  const title =
    step === "request"
      ? "Forgot Password?"
      : step === "verify"
        ? "Verify OTP"
        : step === "reset"
          ? "Create New Password"
          : "Password Reset Complete";

  const description =
    step === "request"
      ? "Choose your recovery method to reset your admin password."
      : step === "verify"
        ? "Enter the OTP sent using your selected recovery method."
        : step === "reset"
          ? "Choose a new password for your administrator account."
          : "Your password reset request has completed.";

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#08090d] px-4 py-10 text-white">
      <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-orange-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-orange-600/10 blur-[120px]" />

      <div className="relative w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-orange-500/20 bg-orange-500/10">
            {step === "success" ? (
              <ShieldCheck size={34} className="text-orange-400" />
            ) : (
              <KeyRound size={34} className="text-orange-400" />
            )}
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {title.split(" ").slice(0, -1).join(" ")}{" "}
            <span className="text-orange-500">
              {title.split(" ").slice(-1).join("")}
            </span>
          </h1>

          <p className="mt-3 text-sm text-zinc-400">
            {description}
          </p>
        </div>

        <div className="rounded-2xl border border-white/[0.08] bg-[#15161c] p-6 shadow-2xl shadow-black/40 sm:p-9">
          {error && (
            <div
              role="alert"
              className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-300"
            >
              {error}
            </div>
          )}

          {message && (
            <div
              role="status"
              className="mb-5 rounded-xl border border-green-500/20 bg-green-500/10 p-3 text-sm text-green-300"
            >
              {message}
            </div>
          )}

          {step === "request" && (
            <form onSubmit={handleRequestOtp} className="space-y-5">
              <div>
                <label
                  htmlFor="recovery-username"
                  className="mb-2 block text-sm font-medium text-zinc-300"
                >
                  Admin username or registered email
                </label>
                <input
                  id="recovery-username"
                  type="text"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder="Enter your username or email"
                  autoComplete="username"
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <p className="mb-3 text-sm font-medium text-zinc-300">
                  Choose recovery method
                </p>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setMethod("EMAIL")}
                    aria-pressed={method === "EMAIL"}
                    className={`flex items-center justify-center gap-2 rounded-xl border p-3 text-sm transition ${
                      method === "EMAIL"
                        ? "border-orange-500 bg-orange-500/10 text-orange-300"
                        : "border-white/10 text-zinc-400 hover:bg-white/5"
                    }`}
                  >
                    <Mail size={17} />
                    Email
                  </button>

                  <button
                    type="button"
                    onClick={() => setMethod("SMS")}
                    aria-pressed={method === "SMS"}
                    className={`flex items-center justify-center gap-2 rounded-xl border p-3 text-sm transition ${
                      method === "SMS"
                        ? "border-orange-500 bg-orange-500/10 text-orange-300"
                        : "border-white/10 text-zinc-400 hover:bg-white/5"
                    }`}
                  >
                    <MessageSquare size={17} />
                    SMS
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={primaryButtonClass}
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>
            </form>
          )}

          {step === "verify" && (
            <form onSubmit={handleVerifyOtp} className="space-y-5">
              <div>
                <label
                  htmlFor="recovery-otp"
                  className="mb-2 block text-sm font-medium text-zinc-300"
                >
                  Enter OTP
                </label>
                <input
                  id="recovery-otp"
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={8}
                  value={otp}
                  onChange={(event) =>
                    setOtp(event.target.value.replace(/\D/g, ""))
                  }
                  placeholder="Enter verification code"
                  required
                  className={inputClass}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={primaryButtonClass}
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>

              <button
                type="button"
                disabled={loading}
                onClick={() => {
                  setStep("request");
                  setOtp("");
                  setRequestId(null);
                  setError("");
                  setMessage("");
                }}
                className="w-full text-sm text-zinc-400 transition hover:text-orange-400"
              >
                Request a new OTP
              </button>
            </form>
          )}

          {step === "reset" && (
            <form onSubmit={handleResetPassword} className="space-y-5">
              <div>
                <label
                  htmlFor="new-password"
                  className="mb-2 block text-sm font-medium text-zinc-300"
                >
                  New password
                </label>

                <div className="relative">
                  <input
                    id="new-password"
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(event) => setNewPassword(event.target.value)}
                    placeholder="At least 8 characters"
                    autoComplete="new-password"
                    minLength={8}
                    required
                    className={`${inputClass} pr-12`}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                  >
                    {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirm-password"
                  className="mb-2 block text-sm font-medium text-zinc-300"
                >
                  Confirm new password
                </label>
                <input
                  id="confirm-password"
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder="Re-enter your new password"
                  autoComplete="new-password"
                  minLength={8}
                  required
                  className={inputClass}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={primaryButtonClass}
              >
                {loading ? "Resetting password..." : "Reset Password"}
              </button>
            </form>
          )}

          {step === "success" && (
            <button
              type="button"
              onClick={() => navigate("/admin/login")}
              className={primaryButtonClass}
            >
              Back to Admin Login
            </button>
          )}

          {step !== "success" && (
            <div className="mt-6 border-t border-white/[0.07] pt-5">
              <Link
                to="/admin/login"
                className="flex items-center justify-center gap-2 text-sm text-zinc-400 transition hover:text-orange-400"
              >
                <ArrowLeft size={16} />
                Back to Admin Login
              </Link>
            </div>
          )}
        </div>

        <p className="mt-6 text-center text-xs text-zinc-600">
          © {new Date().getFullYear()} Nardev Rajput. All rights reserved.
        </p>
      </div>
    </div>
  );
}
