"use client";

import { useState, FormEvent } from "react";
import { signUp, signIn } from "@/lib/auth-client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User, 
  ArrowRight, 
  Check, 
  Shield,
  MessageCircle
} from "lucide-react";

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const { email, password, name } = formData;

    if (!email || !password || !name) {
      setError("All fields are required");
      setIsLoading(false);
      return;
    }

    try {
      const result = await signUp.email({
        email,
        password,
        name,
      });

      if (result.error) {
        setError(result.error.message ?? "Sign up failed");
      } else {
        window.location.href = "/dashboard";
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setError("");
    
    try {
      const result = await signIn.social({
        provider: "google",
      });
      
      if (result.error) {
        setError(result.error.message ?? "Google sign in failed");
      }

    } catch (err) {
      setError("Failed to sign in with Google");
    } finally {
      setGoogleLoading(false);
      redirect("/dashboard");
    }
  };

  const passwordStrength = {
    length: formData.password.length >= 6,
    uppercase: /[A-Z]/.test(formData.password),
    number: /[0-9]/.test(formData.password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password),
  };

  const strengthScore = Object.values(passwordStrength).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row">
        {/* Left Side - Brand & Features */}
        <div className="lg:w-1/2 bg-slate-50 text-slate-900 p-8 lg:p-12 border-r border-slate-200">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-semibold">ChatConnect</span>
          </div>

          <div className="max-w-md">
            <h1 className="text-3xl font-semibold leading-tight mb-6">
              Join thousands of teams using ChatConnect
            </h1>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Start your 14-day free trial. No credit card required.
            </p>

            <div className="space-y-3 mb-8">
              {[
                "Unified messaging across all platforms",
                "AI-powered response suggestions",
                "Enterprise-grade security",
                "24/7 customer support"
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <span className="text-slate-700">{feature}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="flex space-x-6 text-sm text-slate-600">
              {[
                { value: "50k+", label: "Users" },
                { value: "98%", label: "Satisfaction" },
                { value: "24/7", label: "Support" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-lg font-semibold text-slate-900">{stat.value}</div>
                  <div>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Sign Up Form */}
        <div className="lg:w-1/2 p-8 lg:p-12">
          <div className="max-w-md mx-auto">
            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center justify-center mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-semibold text-slate-900">ChatConnect</span>
              </div>
            </div>

            <div className="text-left mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-2">
                Create account
              </h2>
              <p className="text-slate-600">
                Start your 14-day free trial
              </p>
            </div>

            {error && (
              <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Full name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="w-full pl-10 pr-4 py-3 bg-white border border-slate-300 rounded-lg transition-colors outline-none text-slate-900 placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    required
                    disabled={isLoading || googleLoading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-3 bg-white border border-slate-300 rounded-lg transition-colors outline-none text-slate-900 placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    required
                    disabled={isLoading || googleLoading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Create a password"
                    className="w-full pl-10 pr-12 py-3 bg-white border border-slate-300 rounded-lg transition-colors outline-none text-slate-900 placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    required
                    minLength={6}
                    disabled={isLoading || googleLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                
                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="mt-3 space-y-2 p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-medium text-slate-700">Password strength</span>
                      <span className="text-slate-500">{strengthScore}/4</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-1.5">
                      <div 
                        className={`h-1.5 rounded-full transition-all ${
                          strengthScore === 0 ? 'bg-red-500 w-1/4' :
                          strengthScore === 1 ? 'bg-orange-500 w-2/4' :
                          strengthScore === 2 ? 'bg-yellow-500 w-3/4' :
                          strengthScore >= 3 ? 'bg-green-500 w-full' : ''
                        }`}
                      ></div>
                    </div>
                    <div className="grid grid-cols-2 gap-1 text-xs">
                      {[
                        { key: 'length', text: '6+ characters' },
                        { key: 'uppercase', text: 'Uppercase letter' },
                        { key: 'number', text: 'Number' },
                        { key: 'special', text: 'Special character' }
                      ].map((req) => (
                        <div key={req.key} className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full ${
                            passwordStrength[req.key as keyof typeof passwordStrength] 
                              ? 'bg-green-500' 
                              : 'bg-slate-300'
                          }`} />
                          <span className={
                            passwordStrength[req.key as keyof typeof passwordStrength] 
                              ? 'text-green-700' 
                              : 'text-slate-500'
                          }>
                            {req.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <button 
                type="submit" 
                disabled={isLoading || googleLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Start free trial
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="my-6 flex items-center">
              <div className="flex-1 border-t border-slate-200"></div>
              <span className="px-4 text-sm text-slate-500">or</span>
              <div className="flex-1 border-t border-slate-200"></div>
            </div>

            <button 
              onClick={handleGoogleSignIn}
              disabled={isLoading || googleLoading}
              className="w-full border border-slate-300 hover:border-slate-400 bg-white text-slate-700 py-3 px-4 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {googleLoading ? (
                <div className="w-4 h-4 border-2 border-slate-600 border-t-transparent rounded-full animate-spin" />
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              )}
              Continue with Google
            </button>

            <div className="mt-6 p-3 bg-slate-50 rounded-lg border border-slate-200">
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-slate-800 font-medium">Your data is secure</p>
                  <p className="text-xs text-slate-600 mt-1">
                    We use bank-level encryption and never share your personal information.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-slate-600 text-sm">
                Already have an account?{" "}
                <Link 
                  href="/sign-in" 
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </div>

            <div className="mt-4 text-center">
              <p className="text-xs text-slate-500">
                By creating an account, you agree to our{" "}
                <a href="/terms" className="text-slate-700 hover:text-slate-900 font-medium">Terms</a>
                {" "}and{" "}
                <a href="/privacy" className="text-slate-700 hover:text-slate-900 font-medium">Privacy Policy</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}