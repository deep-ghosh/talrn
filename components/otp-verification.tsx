"use client"

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'

interface OTPVerificationProps {
  onVerify: (otp: string) => Promise<void>
  onResend: () => Promise<void>
  email: string
  loading?: boolean
  error?: string
}

export default function OTPVerification({ 
  onVerify, 
  onResend, 
  email, 
  loading = false, 
  error = '' 
}: OTPVerificationProps) {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [countdown, setCountdown] = useState(60)
  const [canResend, setCanResend] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      setCanResend(true)
    }
  }, [countdown])

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return // Only allow single digit

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }

    // Auto submit when all 6 digits are entered
    if (newOtp.every(digit => digit !== '') && !loading) {
      onVerify(newOtp.join(''))
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text')
    const digits = pastedData.replace(/\D/g, '').slice(0, 6)
    
    if (digits.length === 6) {
      const newOtp = digits.split('')
      setOtp(newOtp)
      if (!loading) {
        onVerify(digits)
      }
    }
  }

  const handleResend = async () => {
    if (canResend && !loading) {
      setCountdown(60)
      setCanResend(false)
      setOtp(['', '', '', '', '', ''])
      await onResend()
    }
  }

  const handleManualSubmit = () => {
    const otpString = otp.join('')
    if (otpString.length === 6 && !loading && /^\d{6}$/.test(otpString)) {
      onVerify(otpString)
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-3xl shadow-xl p-8 border border-[#E1E5F7]/30">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-[#4F46E5] to-[#3B82F6] rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 3.26a2 2 0 001.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-[#1F2937] mb-2">Verify Your Email</h2>
        <p className="text-[#6B7280] text-sm">
          We've sent a 6-digit verification code to{' '}
          <span className="font-semibold text-[#4F46E5]">{email}</span>
        </p>
      </div>

      <div className="space-y-6">
        {/* OTP Input Fields */}
        <div className="flex justify-center space-x-3">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => { inputRefs.current[index] = el }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className={`w-12 h-12 text-center text-xl font-bold border-2 rounded-xl transition-all duration-200 ${
                digit 
                  ? 'border-[#4F46E5] bg-[#F8F9FF] text-[#4F46E5]' 
                  : 'border-[#E1E5F7] hover:border-[#4F46E5]/50 focus:border-[#4F46E5]'
              } focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20`}
              disabled={loading}
            />
          ))}
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-red-600 text-sm text-center">{error}</p>
          </div>
        )}

        {/* Manual Submit Button */}
        <Button
          onClick={handleManualSubmit}
          disabled={loading || otp.some(digit => !digit)}
          className="w-full bg-gradient-to-r from-[#4F46E5] via-[#6366F1] to-[#3B82F6] hover:from-[#4338CA] hover:via-[#5B21B6] hover:to-[#2563EB] text-white rounded-full py-3 px-6 font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Verifying...</span>
            </div>
          ) : (
            'Verify Code'
          )}
        </Button>

        {/* Resend Section */}
        <div className="text-center space-y-3">
          <p className="text-[#6B7280] text-sm">
            Didn't receive the code?
          </p>
          {canResend ? (
            <button
              onClick={handleResend}
              disabled={loading}
              className="text-[#4F46E5] font-semibold hover:underline disabled:opacity-50"
            >
              Resend Code
            </button>
          ) : (
            <p className="text-[#6B7280] text-sm">
              Resend available in{' '}
              <span className="font-semibold text-[#4F46E5]">
                {Math.floor(countdown / 60)}:{(countdown % 60).toString().padStart(2, '0')}
              </span>
            </p>
          )}
        </div>

        {/* Additional Instructions */}
        <div className="bg-[#F8F9FF] border border-[#E1E5F7] rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <svg className="w-5 h-5 text-[#4F46E5] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="text-sm text-[#6B7280]">
              <p className="font-medium text-[#374151] mb-1">Tips:</p>
              <ul className="space-y-1 text-xs">
                <li>• Check your spam/junk folder if you don't see the email</li>
                <li>• The code will expire in 10 minutes</li>
                <li>• You can paste the full 6-digit code at once</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}