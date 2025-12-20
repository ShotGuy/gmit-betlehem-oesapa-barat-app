import { Eye, EyeOff, Lock, LogIn, User } from "lucide-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import PageTitle from "@/components/ui/PageTitle";
import { useAuth } from "@/contexts/AuthContext";
import authService from "@/services/authService";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const { login, isAuthenticated, user } = useAuth();
  const router = useRouter();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      const redirectUrl = authService.getRoleRedirectUrl(user.role);

      router.push(redirectUrl);
    }
  }, [isAuthenticated, user, router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (loginError) {
      setLoginError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.identifier.trim() || !formData.password.trim()) {
      setLoginError("Email/Username dan password wajib diisi");
      toast.error("Email/Username dan password wajib diisi");

      return;
    }

    setIsLoading(true);
    setLoginError(""); // Clear any previous error

    try {
      await login(formData);
      // If login is successful, the user will be redirected by the useEffect hook
    } catch (error) {
      // Handle login error without refreshing the page
      const errorMessage = error.message || "Login gagal. Silakan coba lagi.";

      setLoginError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden bg-gray-900">

      {/* Premium Abstract Background */}
      <div className="absolute inset-0 z-0">
        {/* Base Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-amber-950/40" />

        {/* Animated Orbs */}
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-amber-600/20 rounded-full blur-[120px] animate-pulse-slow mix-blend-screen" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[120px] animate-pulse-slow animation-delay-2000 mix-blend-screen" />

        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      </div>

      <PageTitle
        description="GMIT Jemaat Betlehem Oesapa Barat (JBOB) - Login Portal."
        title="Masuk - GMIT Betlem Oesapa Barat"
      />

      {/* Glassmorphism Card */}
      <div className="relative z-10 w-full max-w-md">

        {/* Header Section */}
        <div className="text-center mb-8 animate-fade-in-up">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl rotate-3 shadow-2xl flex items-center justify-center mb-6 ring-4 ring-white/10 backdrop-blur-md">
            <LogIn className="h-10 w-10 text-white transform -rotate-3" />
          </div>

          <h2 className="font-serif text-4xl font-bold text-white mb-2 tracking-wide drop-shadow-lg">
            Selamat Datang
          </h2>
          <p className="text-amber-200/80 font-medium tracking-widest text-sm uppercase">
            Portal GMIT Betlehem Oesapa Barat
          </p>
        </div>

        {/* Login Form Container */}
        <div className="bg-white/10 backdrop-blur-xl shadow-2xl rounded-3xl p-8 border border-white/10 relative overflow-hidden animate-fade-in-up delay-100">

          {/* Subtle shine effect */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email/Username Input */}
            <div className="group">
              <label
                className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2"
                htmlFor="identifier"
              >
                Identitas Pengguna
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-amber-500/80 group-focus-within:text-amber-400 transition-colors" />
                </div>
                <input
                  required
                  autoComplete="username"
                  className={`block w-full pl-12 pr-4 py-3.5 bg-gray-900/50 border ${loginError ? "border-red-500/50" : "border-gray-700/50"
                    } rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 focus:bg-gray-900/80 transition-all duration-300 sm:text-sm`}
                  disabled={isLoading}
                  id="identifier"
                  name="identifier"
                  placeholder="Email atau Username"
                  type="text"
                  value={formData.identifier}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="group">
              <label
                className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2"
                htmlFor="password"
              >
                Kata Sandi
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-amber-500/80 group-focus-within:text-amber-400 transition-colors" />
                </div>
                <input
                  required
                  autoComplete="current-password"
                  className={`block w-full pl-12 pr-12 py-3.5 bg-gray-900/50 border ${loginError ? "border-red-500/50" : "border-gray-700/50"
                    } rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 focus:bg-gray-900/80 transition-all duration-300 sm:text-sm`}
                  disabled={isLoading}
                  id="password"
                  name="password"
                  placeholder="Masukkin kata sandi"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <button
                  aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white transition-colors focus:outline-none"
                  disabled={isLoading}
                  type="button"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {loginError && (
              <div className="text-red-200 text-sm text-center py-3 px-4 bg-red-900/30 border border-red-500/30 rounded-xl animate-shake">
                {loginError}
              </div>
            )}

            {/* Submit Button */}
            <div>
              <button
                className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-bold tracking-wider uppercase rounded-xl text-white bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-400 hover:to-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-amber-500 shadow-lg shadow-amber-900/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:-translate-y-1"
                disabled={isLoading}
                type="submit"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                    Memproses...
                  </>
                ) : (
                  <>
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                      <LogIn className="h-5 w-5 text-amber-300 group-hover:text-amber-100 transition-colors" />
                    </span>
                    Masuk Sekarang
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Footer Link */}
        <p className="text-center mt-8 text-gray-400 text-sm">
          Belum punya akun? <span className="text-amber-400 hover:text-amber-300 cursor-pointer transition-colors font-semibold">Hubungi Administrator</span>
        </p>

      </div>
    </div>
  );
}
