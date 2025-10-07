// Form validation utilities for the registration system

export interface FormData {
  firstName: string
  lastName: string
  jobTitle: string
  organisation: string
  website: string
  workEmail: string
  phoneNumber: string
  city: string
  corporateRegNumber: string
  referralCode: string
}

export interface ValidationResult {
  isValid: boolean
  errors: string[]
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email.toLowerCase())
}

export function validatePassword(password: string): ValidationResult {
  const errors: string[] = []
  
  if (password.length < 6) {
    errors.push('Password must be at least 6 characters long')
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter')
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

export function validatePhoneNumber(phone: string): boolean {
  // Basic international phone number validation
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''))
}

export function validateUrl(url: string): boolean {
  try {
    new URL(url.startsWith('http') ? url : `https://${url}`)
    return true
  } catch {
    return false
  }
}

export function validateRegistrationForm(
  formData: FormData,
  password: string,
  confirmPassword: string,
  accountType: 'individual' | 'organisation'
): ValidationResult {
  const errors: string[] = []

  // Required fields validation
  if (!formData.firstName.trim()) errors.push('First name is required')
  if (!formData.lastName.trim()) errors.push('Last name is required')
  if (!formData.workEmail.trim()) errors.push('Work email is required')
  if (!password) errors.push('Password is required')
  if (!confirmPassword) errors.push('Please confirm your password')

  // Email validation
  if (formData.workEmail && !validateEmail(formData.workEmail)) {
    errors.push('Please enter a valid email address')
  }

  // Password validation
  if (password) {
    const passwordValidation = validatePassword(password)
    if (!passwordValidation.isValid) {
      errors.push(...passwordValidation.errors)
    }
  }

  // Password confirmation
  if (password && confirmPassword && password !== confirmPassword) {
    errors.push('Passwords do not match')
  }

  // Common required fields for both account types
  if (!formData.phoneNumber.trim()) {
    errors.push('Phone number is required')
  } else if (!validatePhoneNumber(formData.phoneNumber)) {
    errors.push('Please enter a valid phone number')
  }

  if (!formData.city.trim()) {
    errors.push('City is required')
  }

  // Organisation-specific validation
  if (accountType === 'organisation') {
    if (!formData.jobTitle.trim()) {
      errors.push('Job title is required')
    }
    if (!formData.organisation.trim()) {
      errors.push('Organisation name is required')
    }
    if (!formData.website.trim()) {
      errors.push('Website is required')
    } else if (!validateUrl(formData.website)) {
      errors.push('Please enter a valid website URL')
    }
    if (!formData.corporateRegNumber.trim()) {
      errors.push('Corporate registration number is required')
    }
  }

  // Individual users don't need additional validation beyond common fields

  return {
    isValid: errors.length === 0,
    errors
  }
}

export function validateOTP(otp: string): ValidationResult {
  const errors: string[] = []
  
  if (!otp) {
    errors.push('Verification code is required')
  } else if (otp.length !== 6) {
    errors.push('Verification code must be 6 digits')
  } else if (!/^\d{6}$/.test(otp)) {
    errors.push('Verification code must contain only numbers')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}