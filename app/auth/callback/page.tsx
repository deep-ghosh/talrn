"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
    "https://jrmvleoxgxuhdwowumcp.supabase.co",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpybXZsZW94Z3h1aGR3b3d1bWNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk4NjUzOTgsImV4cCI6MjA3NTQ0MTM5OH0.CvP6DdjTTa1ocRdLjJHVuMp5ak7W61ZMyh1wH79F_ok"
);

export default function AuthCallback() {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Get the code from URL (Supabase PKCE flow)
        const hashParams = new URLSearchParams(
          window.location.hash.substring(1)
        );
        const searchParams = new URLSearchParams(window.location.search);

        const code = searchParams.get("code");
        const accessToken = hashParams.get("access_token");
        const refreshToken = hashParams.get("refresh_token");

        // Handle PKCE flow (code exchange)
        if (code) {
          const { data, error } = await supabase.auth.exchangeCodeForSession(
            code
          );

          if (error) {
            console.error("Code exchange error:", error);
            setStatus("error");
            setMessage("Email verification failed. Please try again.");
            return;
          }

          if (data.session) {
            const userData = data.session.user.user_metadata;
            const isVendor = userData?.signup_source === "vendor_registration";

            setStatus("success");
            setMessage(
              isVendor
                ? "Email verified successfully! Your vendor application is under review. Our team will contact you within 24-48 hours."
                : "Email verified successfully!"
            );

            // Redirect after 3 seconds
            setTimeout(() => {
              router.push(isVendor ? "/join?verified=true" : "/");
            }, 3000);
          }
        }
        // Handle legacy hash-based flow
        else if (accessToken && refreshToken) {
          const { data, error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });

          if (error) {
            console.error("Session error:", error);
            setStatus("error");
            setMessage("Email verification failed. Please try again.");
            return;
          }

          if (data.session) {
            const userData = data.session.user.user_metadata;
            const isVendor = userData?.signup_source === "vendor_registration";

            setStatus("success");
            setMessage(
              isVendor
                ? "Email verified successfully! Your vendor application is under review. Our team will contact you within 24-48 hours."
                : "Email verified successfully!"
            );

            // Redirect after 3 seconds
            setTimeout(() => {
              router.push(isVendor ? "/join?verified=true" : "/");
            }, 3000);
          }
        } else {
          setStatus("error");
          setMessage("Invalid verification link. Please try again.");
        }
      } catch (err) {
        console.error("Auth callback error:", err);
        setStatus("error");
        setMessage("Something went wrong during verification.");
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F9FF] via-[#FAFBFF] to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center border border-[#E1E5F7]/30">
        <div className="mb-6">
          {status === "loading" && (
            <div className="w-16 h-16 border-4 border-[#4F46E5] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          )}
          {status === "success" && (
            <div className="w-16 h-16 bg-gradient-to-r from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          )}
          {status === "error" && (
            <div className="w-16 h-16 bg-gradient-to-r from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          )}
        </div>

        <h1 className="text-2xl font-bold text-[#1F2937] mb-4">
          {status === "loading" && "Verifying your email..."}
          {status === "success" && "Email Verified! 🎉"}
          {status === "error" && "Verification Failed"}
        </h1>

        <p className="text-[#6B7280] mb-6 leading-relaxed">{message}</p>

        {status === "success" && (
          <div className="space-y-3">
            <div className="w-full h-2 bg-[#F8F9FF] rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#4F46E5] to-[#3B82F6] animate-pulse"></div>
            </div>
            <p className="text-sm text-[#6B7280]">
              Redirecting you automatically...
            </p>
          </div>
        )}

        {status === "error" && (
          <div className="space-y-3">
            <button
              onClick={() => router.push("/")}
              className="w-full bg-gradient-to-r from-[#4F46E5] via-[#6366F1] to-[#3B82F6] text-white rounded-full py-3 px-6 font-semibold hover:shadow-lg transition-all duration-300"
            >
              Return to Homepage
            </button>
            <button
              onClick={() => router.push("/join")}
              className="w-full bg-white text-[#4F46E5] border-2 border-[#4F46E5] rounded-full py-3 px-6 font-semibold hover:bg-[#F8F9FF] transition-all duration-300"
            >
              Try Registration Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
