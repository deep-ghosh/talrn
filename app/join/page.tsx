"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { registerVendor, verifyOTP, resendOTP } from "@/lib/supabase";
import { validateRegistrationForm, type FormData } from "@/lib/validation";

type RegistrationStep = "form" | "otp" | "success";

export default function JoinPage() {
  const [accountType, setAccountType] = useState<"individual" | "organisation">(
    "individual"
  );
  const [currentStep, setCurrentStep] = useState<RegistrationStep>("form");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    jobTitle: "",
    organisation: "",
    website: "",
    workEmail: "",
    phoneNumber: "",
    city: "",
    corporateRegNumber: "",
    referralCode: "",
  });

  // Check for verification success from callback
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("verified") === "true") {
      setCurrentStep("success");
      setMessage(
        "🎉 Email verified successfully! Your vendor application has been submitted."
      );
    }
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Form validation using comprehensive validation utility
  const validateForm = () => {
    const validation = validateRegistrationForm(
      formData,
      password,
      confirmPassword,
      accountType
    );
    return validation.errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setError(validationErrors.join(", "));
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      // Sign up user with Supabase (this will send confirmation email)
      const { data, error: signUpError } = await registerVendor(
        formData.workEmail,
        password,
        {
          first_name: formData.firstName,
          last_name: formData.lastName,
          account_type: accountType,
          job_title: formData.jobTitle,
          organisation: formData.organisation,
          website: formData.website,
          phone_number: formData.phoneNumber,
          city: formData.city,
          corporate_reg_number: formData.corporateRegNumber,
          referral_code: formData.referralCode,
        }
      );

      if (signUpError) {
        if (signUpError.message.includes("already registered")) {
          setError(
            "This email is already registered. Please try signing in or use a different email."
          );
        } else {
          setError(`Registration failed: ${signUpError.message}`);
        }
      } else {
        // Show message to check email
        setCurrentStep("otp");
        setMessage(
          "📧 Please check your email and click the confirmation link to verify your account."
        );
      }
    } catch (err) {
      setError("❌ Something went wrong. Please try again.");
      console.error("Registration error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOTPVerify = async (otp: string) => {
    setLoading(true);
    setError("");

    try {
      const { data, error } = await verifyOTP(formData.workEmail, otp);

      if (error) {
        setError("Invalid verification code. Please try again.");
        return;
      }

      if (data.user) {
        setCurrentStep("success");
        setMessage(
          "🎉 Email verified successfully! Your vendor application has been submitted."
        );
      }
    } catch (err) {
      setError("Verification failed. Please try again.");
      console.error("OTP verification error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setLoading(true);
    setError("");

    try {
      const { error } = await resendOTP(formData.workEmail);

      if (error) {
        setError("Failed to resend confirmation email. Please try again.");
      } else {
        setMessage("New confirmation email sent. Please check your inbox.");
      }
    } catch (err) {
      setError("Failed to resend confirmation email. Please try again.");
      console.error("Resend email error:", err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setCurrentStep("form");
    setFormData({
      firstName: "",
      lastName: "",
      jobTitle: "",
      organisation: "",
      website: "",
      workEmail: "",
      phoneNumber: "",
      city: "",
      corporateRegNumber: "",
      referralCode: "",
    });
    setPassword("");
    setConfirmPassword("");
    setError("");
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F9FF] via-[#FAFBFF] to-white">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1F2937] mb-6">
              Create your Talrn Account
            </h1>
            <div className="space-y-4">
              <p className="text-lg sm:text-xl text-[#6B7280]">
                Talrn is an exclusive network of the world's top talent.
              </p>
              <p className="text-base sm:text-lg text-[#6B7280]">
                We provide access to top companies and resources that can help
                accelerate your growth.
              </p>
            </div>
          </div>

          {/* Account Type Toggle */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-full p-1 shadow-lg border border-[#E1E5F7]/30">
              <button
                type="button"
                onClick={() => setAccountType("organisation")}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  accountType === "organisation"
                    ? "bg-gradient-to-r from-[#4F46E5] to-[#3B82F6] text-white shadow-lg"
                    : "text-[#6B7280] hover:text-[#374151]"
                }`}
              >
                Organisation
              </button>
              <button
                type="button"
                onClick={() => setAccountType("individual")}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  accountType === "individual"
                    ? "bg-gradient-to-r from-[#4F46E5] to-[#3B82F6] text-white shadow-lg"
                    : "text-[#6B7280] hover:text-[#374151]"
                }`}
              >
                Individual
              </button>
            </div>
          </div>

          {/* Step-based Content */}
          {currentStep === "form" && (
            <div className="bg-white rounded-3xl shadow-xl border border-[#E1E5F7]/30 p-8 sm:p-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Individual Form Fields */}
                {accountType === "individual" && (
                  <>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Input
                          type="text"
                          placeholder="First Name *"
                          value={formData.firstName}
                          onChange={(e) =>
                            handleInputChange("firstName", e.target.value)
                          }
                          className="h-14 rounded-2xl bg-[#F8F9FF] border-[#E1E5F7] text-base px-6 focus:border-[#4F46E5] transition-all"
                          required
                        />
                      </div>
                      <div>
                        <Input
                          type="text"
                          placeholder="Last Name *"
                          value={formData.lastName}
                          onChange={(e) =>
                            handleInputChange("lastName", e.target.value)
                          }
                          className="h-14 rounded-2xl bg-[#F8F9FF] border-[#E1E5F7] text-base px-6 focus:border-[#4F46E5] transition-all"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Input
                          type="email"
                          placeholder="Work email *"
                          value={formData.workEmail}
                          onChange={(e) =>
                            handleInputChange("workEmail", e.target.value)
                          }
                          className="h-14 rounded-2xl bg-[#F8F9FF] border-[#E1E5F7] text-base px-6 focus:border-[#4F46E5] transition-all"
                          required
                        />
                      </div>
                      <div>
                        <Input
                          type="tel"
                          placeholder="Phone number *"
                          value={formData.phoneNumber}
                          onChange={(e) =>
                            handleInputChange("phoneNumber", e.target.value)
                          }
                          className="h-14 rounded-2xl bg-[#F8F9FF] border-[#E1E5F7] text-base px-6 focus:border-[#4F46E5] transition-all"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Input
                          type="text"
                          placeholder="City *"
                          value={formData.city}
                          onChange={(e) =>
                            handleInputChange("city", e.target.value)
                          }
                          className="h-14 rounded-2xl bg-[#F8F9FF] border-[#E1E5F7] text-base px-6 focus:border-[#4F46E5] transition-all"
                          required
                        />
                      </div>
                      <div>
                        <Input
                          type="text"
                          placeholder="Referral code"
                          value={formData.referralCode}
                          onChange={(e) =>
                            handleInputChange("referralCode", e.target.value)
                          }
                          className="h-14 rounded-2xl bg-[#F8F9FF] border-[#E1E5F7] text-base px-6 focus:border-[#4F46E5] transition-all"
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Organisation Form Fields */}
                {accountType === "organisation" && (
                  <>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Input
                          type="text"
                          placeholder="First Name *"
                          value={formData.firstName}
                          onChange={(e) =>
                            handleInputChange("firstName", e.target.value)
                          }
                          className="h-14 rounded-2xl bg-[#F8F9FF] border-[#E1E5F7] text-base px-6 focus:border-[#4F46E5] transition-all"
                          required
                        />
                      </div>
                      <div>
                        <Input
                          type="text"
                          placeholder="Last Name *"
                          value={formData.lastName}
                          onChange={(e) =>
                            handleInputChange("lastName", e.target.value)
                          }
                          className="h-14 rounded-2xl bg-[#F8F9FF] border-[#E1E5F7] text-base px-6 focus:border-[#4F46E5] transition-all"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Input
                          type="text"
                          placeholder="Job title *"
                          value={formData.jobTitle}
                          onChange={(e) =>
                            handleInputChange("jobTitle", e.target.value)
                          }
                          className="h-14 rounded-2xl bg-[#F8F9FF] border-[#E1E5F7] text-base px-6 focus:border-[#4F46E5] transition-all"
                          required
                        />
                      </div>
                      <div>
                        <Input
                          type="text"
                          placeholder="Organization *"
                          value={formData.organisation}
                          onChange={(e) =>
                            handleInputChange("organisation", e.target.value)
                          }
                          className="h-14 rounded-2xl bg-[#F8F9FF] border-[#E1E5F7] text-base px-6 focus:border-[#4F46E5] transition-all"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Input
                          type="url"
                          placeholder="Website *"
                          value={formData.website}
                          onChange={(e) =>
                            handleInputChange("website", e.target.value)
                          }
                          className="h-14 rounded-2xl bg-[#F8F9FF] border-[#E1E5F7] text-base px-6 focus:border-[#4F46E5] transition-all"
                          required
                        />
                      </div>
                      <div className="relative">
                        <Input
                          type="email"
                          placeholder="Work email *"
                          value={formData.workEmail}
                          onChange={(e) =>
                            handleInputChange("workEmail", e.target.value)
                          }
                          className="h-14 rounded-2xl bg-[#F8F9FF] border-[#E1E5F7] text-base px-6 pr-32 focus:border-[#4F46E5] transition-all"
                          required
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#6B7280] pointer-events-none">
                          @website.com
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Input
                          type="tel"
                          placeholder="Phone number *"
                          value={formData.phoneNumber}
                          onChange={(e) =>
                            handleInputChange("phoneNumber", e.target.value)
                          }
                          className="h-14 rounded-2xl bg-[#F8F9FF] border-[#E1E5F7] text-base px-6 focus:border-[#4F46E5] transition-all"
                          required
                        />
                      </div>
                      <div>
                        <Input
                          type="text"
                          placeholder="City *"
                          value={formData.city}
                          onChange={(e) =>
                            handleInputChange("city", e.target.value)
                          }
                          className="h-14 rounded-2xl bg-[#F8F9FF] border-[#E1E5F7] text-base px-6 focus:border-[#4F46E5] transition-all"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Input
                          type="text"
                          placeholder="Corporate Registration Number *"
                          value={formData.corporateRegNumber}
                          onChange={(e) =>
                            handleInputChange(
                              "corporateRegNumber",
                              e.target.value
                            )
                          }
                          className="h-14 rounded-2xl bg-[#F8F9FF] border-[#E1E5F7] text-base px-6 focus:border-[#4F46E5] transition-all"
                          required
                        />
                      </div>
                      <div>
                        <Input
                          type="text"
                          placeholder="Referral code"
                          value={formData.referralCode}
                          onChange={(e) =>
                            handleInputChange("referralCode", e.target.value)
                          }
                          className="h-14 rounded-2xl bg-[#F8F9FF] border-[#E1E5F7] text-base px-6 focus:border-[#4F46E5] transition-all"
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Password Fields */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Input
                      type="password"
                      placeholder="Password *"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-14 rounded-2xl bg-[#F8F9FF] border-[#E1E5F7] text-base px-6 focus:border-[#4F46E5] transition-all"
                      required
                    />
                  </div>
                  <div>
                    <Input
                      type="password"
                      placeholder="Confirm Password *"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="h-14 rounded-2xl bg-[#F8F9FF] border-[#E1E5F7] text-base px-6 focus:border-[#4F46E5] transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Success/Error Messages */}
                {message && (
                  <div className="p-4 rounded-2xl bg-green-50 border border-green-200 text-green-800 text-sm">
                    {message}
                  </div>
                )}
                {error && (
                  <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-sm">
                    {error}
                  </div>
                )}

                {/* Submit Button */}
                <div className="flex justify-center pt-6">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="bg-gradient-to-r from-[#4F46E5] via-[#6366F1] to-[#3B82F6] hover:from-[#4338CA] hover:via-[#5B21B6] hover:to-[#2563EB] disabled:from-gray-400 disabled:via-gray-400 disabled:to-gray-400 text-white rounded-full px-12 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {loading ? (
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Processing...
                      </div>
                    ) : (
                      "Register"
                    )}
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* Email Confirmation Step */}
          {currentStep === "otp" && (
            <div className="max-w-md mx-auto bg-white rounded-3xl shadow-xl p-8 text-center border border-[#E1E5F7]/30">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>

              <h2 className="text-2xl font-bold text-[#1F2937] mb-4">
                Check Your Email
              </h2>

              <p className="text-[#6B7280] mb-6 leading-relaxed">
                We've sent a confirmation link to{" "}
                <strong>{formData.workEmail}</strong>. Please click the link in
                your email to verify your account.
              </p>

              {message && (
                <div className="p-4 rounded-2xl bg-green-50 border border-green-200 text-green-800 text-sm mb-4">
                  {message}
                </div>
              )}
              {error && (
                <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-sm mb-4">
                  {error}
                </div>
              )}

              <button
                onClick={handleResendOTP}
                disabled={loading}
                className="text-[#4F46E5] hover:underline font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Sending..." : "Didn't receive the email? Resend"}
              </button>
            </div>
          )}

          {/* Success Step */}
          {currentStep === "success" && (
            <div className="max-w-md mx-auto bg-white rounded-3xl shadow-xl p-8 text-center border border-[#E1E5F7]/30">
              <div className="w-16 h-16 bg-gradient-to-r from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-6">
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

              <h2 className="text-2xl font-bold text-[#1F2937] mb-4">
                Registration Successful! 🎉
              </h2>

              <p className="text-[#6B7280] mb-6 leading-relaxed">
                Welcome to Talrn! Your vendor application has been submitted
                successfully. Our team will review your application and contact
                you within 24-48 hours.
              </p>

              <div className="space-y-3">
                <Button
                  onClick={() => (window.location.href = "/")}
                  className="w-full bg-gradient-to-r from-[#4F46E5] via-[#6366F1] to-[#3B82F6] text-white rounded-full py-3 px-6 font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Go to Homepage
                </Button>
                <button
                  onClick={resetForm}
                  className="w-full bg-white text-[#4F46E5] border-2 border-[#4F46E5] rounded-full py-3 px-6 font-semibold hover:bg-[#F8F9FF] transition-all duration-300"
                >
                  Register Another Account
                </button>
              </div>
            </div>
          )}

          {/* Additional Info */}
          <div className="text-center mt-8 text-sm text-[#6B7280]">
            <p>
              Already have an account?{" "}
              <a
                href="/login"
                className="text-transparent bg-gradient-to-r from-[#4F46E5] to-[#3B82F6] bg-clip-text hover:underline font-medium"
              >
                Sign in here
              </a>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
