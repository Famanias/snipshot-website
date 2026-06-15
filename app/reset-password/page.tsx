"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Key, CheckCircle, AlertCircle, Eye, EyeOff, Loader2 } from "lucide-react";
import { fadeInUp, staggerContainer, scaleIn, buttonHover, buttonTap } from "@/components/motion/variants";

function parseEmailAndTokenFromHash(): { email: string | null; token: string | null } {
  if (typeof window === "undefined") return { email: null, token: null };
  const hash = window.location.hash.slice(1);
  const params = new URLSearchParams(hash);
  const token = params.get("access_token");
  if (!token) return { email: null, token: null };
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return { email: payload?.email ?? null, token };
  } catch {
    return { email: null, token };
  }
}

export default function ResetPasswordPage() {
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [hasCheckedHash, setHasCheckedHash] = useState(false);

  useEffect(() => {
    const { email, token } = parseEmailAndTokenFromHash();
    setEmail(email);
    setToken(token);
    setHasCheckedHash(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!token) {
      setError("Invalid or expired reset session. Please request a new password reset link from the SnipShot app.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error("Supabase credentials are not configured on the server.");
      }

      // Supabase GoTrue Auth API update user endpoint (PUT /user)
      const res = await fetch(`${supabaseUrl.replace(/\/$/, "")}/auth/v1/user`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "apikey": supabaseAnonKey,
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.msg || data?.error_description || "Failed to reset password.");
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!hasCheckedHash) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Loader2 className="h-8 w-8 animate-spin text-cyan" />
      </div>
    );
  }

  // If no token exists in hash, show recovery invalid link state
  if (!token) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 py-24 relative overflow-hidden bg-black">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="w-[600px] h-[600px] rounded-full bg-red-500/5 blur-[120px] opacity-50" />
        </div>

        <motion.div
          className="relative z-10 flex flex-col items-center text-center max-w-md w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 backdrop-blur-md"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div variants={scaleIn} className="flex items-center gap-2 mb-8">
            <img src="/icon.svg" alt="SnipShot Logo" className="h-6 w-6" />
            <span className="text-lg font-bold uppercase tracking-tight text-white">SnipShot</span>
          </motion.div>

          <AlertCircle className="h-14 w-14 text-red-400 mb-4" strokeWidth={1.5} />
          
          <h1 className="text-2xl font-bold text-white mb-3">Invalid Link</h1>
          <p className="text-gray-400 text-sm mb-8 leading-relaxed">
            This password reset link is invalid or has expired. Please return to the SnipShot desktop application and request a new password reset link.
          </p>

          <motion.a
            href="/"
            className="w-full inline-flex items-center justify-center gap-2 clip-corner bg-cyan px-6 py-3 text-sm font-bold uppercase tracking-wider text-black hover:bg-cyan-dark transition-colors"
            whileHover={buttonHover}
            whileTap={buttonTap}
          >
            Back to Homepage
          </motion.a>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-24 relative overflow-hidden bg-black">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="w-[600px] h-[600px] rounded-full bg-cyan/10 blur-[120px] opacity-50" />
      </div>

      <motion.div
        className="relative z-10 flex flex-col items-center max-w-md w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 backdrop-blur-md"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8">
          <img src="/icon.svg" alt="SnipShot Logo" className="h-6 w-6" />
          <span className="text-lg font-bold uppercase tracking-tight text-white">SnipShot</span>
        </div>

        {success ? (
          <motion.div
            className="flex flex-col items-center text-center w-full animate-fade-in"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <CheckCircle className="h-16 w-16 text-cyan mb-4" strokeWidth={1.5} />
            <h1 className="text-2xl font-bold text-white mb-3">Password Updated</h1>
            <p className="text-gray-400 text-sm mb-8 leading-relaxed">
              Your password has been reset successfully. You can now return to the SnipShot desktop application and log in using your new credentials.
            </p>
            <button
              onClick={() => window.close()}
              className="w-full inline-flex items-center justify-center gap-2 clip-corner bg-cyan px-6 py-3 text-sm font-bold uppercase tracking-wider text-black hover:bg-cyan-dark transition-colors cursor-pointer"
            >
              Close this window
            </button>
          </motion.div>
        ) : (
          <div className="w-full">
            <h1 className="text-2xl font-bold text-white mb-2 text-center">Reset Password</h1>
            <p className="text-gray-400 text-xs text-center mb-6">
              Create a new password for {email ? <span className="text-cyan font-medium">{email}</span> : "your account"}.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="flex items-start gap-2 bg-red-950/30 border border-red-900/50 rounded-lg p-3 text-red-200 text-xs">
                  <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
                  <span>{error}</span>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-400">New Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-2.5 pl-3 pr-10 text-white text-sm focus:outline-none focus:border-cyan disabled:opacity-50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white focus:outline-none"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-400">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={isLoading}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-2.5 pl-3 pr-10 text-white text-sm focus:outline-none focus:border-cyan disabled:opacity-50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white focus:outline-none"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 clip-corner bg-cyan py-3 mt-6 text-sm font-bold uppercase tracking-wider text-black hover:bg-cyan-dark disabled:bg-zinc-800 disabled:text-zinc-500 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Resetting...
                  </>
                ) : (
                  <>
                    <Key className="h-4 w-4" />
                    Reset Password
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </motion.div>
    </div>
  );
}
