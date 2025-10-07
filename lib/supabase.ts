import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Helper function for vendor registration
export async function registerVendor(
  email: string,
  password: string,
  userData: Record<string, any>
) {
  return await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        ...userData,
        signup_source: 'vendor_registration',
        signup_timestamp: new Date().toISOString()
      }
    }
  })
}

// Helper function for OTP verification
export async function verifyOTP(email: string, token: string) {
  return await supabase.auth.verifyOtp({
    email,
    token,
    type: 'signup'
  })
}

// Helper function to resend OTP
export async function resendOTP(email: string) {
  return await supabase.auth.resend({
    type: 'signup',
    email
  })
}