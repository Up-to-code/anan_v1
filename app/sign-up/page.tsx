"use client";

import { useState, FormEvent } from "react";
import { signUp, signIn } from "@/lib/auth-client";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;

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

  return (
    <div className="min-h-screen flex">
      {/* Image Section */}
      <div className="hidden lg:block lg:w-1/2 bg-gradient-to-br from-gray-900 to-gray-700">
        <div className="h-full flex items-center justify-center p-12">
          <div className="text-center text-white">
            <div className="w-24 h-24 bg-white/10 rounded-3xl flex items-center justify-center mb-8 mx-auto backdrop-blur-sm">
              <span className="text-3xl font-light text-white">+</span>
            </div>
            <h2 className="text-4xl font-light mb-4">Welcome</h2>
            <p className="text-gray-300 text-lg font-light">
              Join thousands of users already with us
            </p>
          </div>
        </div>
      </div>

      {/* Auth Card Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-semibold text-white">+</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                Create Account
              </h1>
              <p className="text-gray-500 text-sm">
                Get started with your account
              </p>
            </div>

            {error && (
              <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Full name"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl transition-colors outline-none text-gray-900 placeholder-gray-500 focus:border-gray-500"
                  required
                  disabled={isLoading || googleLoading}
                />
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl transition-colors outline-none text-gray-900 placeholder-gray-500 focus:border-gray-500"
                  required
                  disabled={isLoading || googleLoading}
                />
              </div>

              <div>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl transition-colors outline-none text-gray-900 placeholder-gray-500 focus:border-gray-500"
                  required
                  minLength={6}
                  disabled={isLoading || googleLoading}
                />
                <p className="mt-2 text-xs text-gray-400">
                  At least 6 characters
                </p>
              </div>

              <button 
                type="submit" 
                disabled={isLoading || googleLoading}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 px-4 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            <div className="my-6 flex items-center">
              <div className="flex-1 border-t border-gray-200"></div>
              <span className="px-4 text-sm text-gray-400">Or</span>
              <div className="flex-1 border-t border-gray-200"></div>
            </div>

            <button 
              onClick={handleGoogleSignIn}
              disabled={isLoading || googleLoading}
              className="w-full border border-gray-300 hover:border-gray-400 bg-white text-gray-700 py-3 px-4 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {googleLoading ? (
                <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin" />
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

            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                By creating an account, you agree to our{" "}
                <a href="/terms" className="text-gray-700 hover:text-gray-900 font-medium">Terms</a>
                {" "}and{" "}
                <a href="/privacy" className="text-gray-700 hover:text-gray-900 font-medium">Privacy</a>
              </p>
            </div>

            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm">
                Already have an account?{" "}
                <Link 
                  href="/sign-in" 
                  className="text-gray-900 hover:text-gray-700 font-medium"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}