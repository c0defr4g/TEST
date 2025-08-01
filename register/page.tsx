"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Crown, User, Lock, Mail, Eye, EyeOff, UserPlus, ArrowLeft, AlertCircle, CheckCircle, Send } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface RegisteredUser {
  id: string
  username: string
  email: string
  password: string
  registrationDate: string
  isVerified: boolean
  verificationCode: string
}

export default function RegisterPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showVerification, setShowVerification] = useState(false)
  const [verificationCode, setVerificationCode] = useState("")
  const [generatedCode, setGeneratedCode] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [success, setSuccess] = useState("")

  const checkIfUserExists = (email: string, username: string): boolean => {
    const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]")

    return registeredUsers.some(
      (user: RegisteredUser) =>
        user.email.toLowerCase() === email.toLowerCase() || user.username.toLowerCase() === username.toLowerCase(),
    )
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters long"
    }

    if (!formData.email.includes("@") || !formData.email.includes(".")) {
      newErrors.email = "Please enter a valid email address"
    }

    // Check if it's a Gmail address
    if (!formData.email.toLowerCase().includes("gmail.com")) {
      newErrors.email = "Please use a Gmail address for verification"
    }

    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long"
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    if (!formData.agreeToTerms) {
      newErrors.terms = "You must agree to the terms and conditions"
    }

    // Check if user already exists
    if (checkIfUserExists(formData.email, formData.username)) {
      newErrors.exists = "An account with this email or username already exists"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const generateVerificationCode = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString()
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Clear specific error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
    if (errors.exists) {
      setErrors((prev) => ({ ...prev, exists: "" }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    // Simulate registration process
    setTimeout(() => {
      // Generate verification code
      const code = generateVerificationCode()
      setGeneratedCode(code)
      setUserEmail(formData.email)

      // Create new user object (unverified)
      const newUser: RegisteredUser = {
        id: Date.now().toString(),
        username: formData.username,
        email: formData.email,
        password: formData.password,
        registrationDate: new Date().toISOString(),
        isVerified: false,
        verificationCode: code,
      }

      // Save unverified user
      const existingUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]")
      existingUsers.push(newUser)
      localStorage.setItem("registeredUsers", JSON.stringify(existingUsers))

      setSuccess(`Verification code sent to ${formData.email}`)
      setShowVerification(true)
      setIsLoading(false)
    }, 2000)
  }

  const handleVerification = (e: React.FormEvent) => {
    e.preventDefault()

    if (verificationCode === generatedCode) {
      // Mark user as verified
      const users = JSON.parse(localStorage.getItem("registeredUsers") || "[]")
      const updatedUsers = users.map((user: RegisteredUser) =>
        user.email === userEmail ? { ...user, isVerified: true } : user,
      )
      localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers))

      setSuccess("Email verified successfully! You can now login.")

      // Redirect to login page after 2 seconds
      setTimeout(() => {
        router.push("/login")
      }, 2000)
    } else {
      setErrors({ verification: "Invalid verification code. Please try again." })
    }
  }

  const resendCode = () => {
    const newCode = generateVerificationCode()
    setGeneratedCode(newCode)
    setSuccess(`New verification code sent to ${userEmail}`)
    setErrors({})
  }

  if (showVerification) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative w-full max-w-md">
          {/* Back to Register */}
          <Button
            onClick={() => setShowVerification(false)}
            variant="ghost"
            className="text-gray-400 hover:text-orange-400 mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Registration
          </Button>

          {/* Verification Card */}
          <Card className="bg-black/60 backdrop-blur-xl border-orange-500/20 shadow-2xl">
            <CardHeader className="text-center pb-6">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-orange-500/20 p-3 rounded-full">
                  <Mail className="h-8 w-8 text-orange-400" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-white">Verify Your Email</CardTitle>
              <CardDescription className="text-gray-300">We've sent a verification code to {userEmail}</CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {errors.verification && (
                <Alert className="bg-red-500/20 border-red-500/50 text-red-200">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{errors.verification}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="bg-green-500/20 border-green-500/50 text-green-200">
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleVerification} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="verificationCode" className="text-white font-medium">
                    Verification Code
                  </Label>
                  <Input
                    id="verificationCode"
                    type="text"
                    placeholder="Enter 6-digit code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className="bg-black/30 border-orange-500/20 text-white placeholder:text-gray-400 focus:border-orange-400 focus:ring-orange-400/20 text-center text-2xl tracking-widest"
                    maxLength={6}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3"
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Verify Email
                </Button>
              </form>

              <div className="text-center">
                <p className="text-gray-400 text-sm mb-3">Didn't receive the code?</p>
                <Button
                  onClick={resendCode}
                  variant="outline"
                  className="border-orange-500/20 text-white hover:bg-orange-500/10 bg-transparent"
                >
                  <Send className="mr-2 h-4 w-4" />
                  Resend Code
                </Button>
              </div>

              {/* Demo Code Display */}
              <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-3">
                <div className="text-sm text-orange-200/80">
                  <p className="font-medium mb-1">Demo Verification Code:</p>
                  <p className="text-lg font-mono text-orange-400">{generatedCode}</p>
                  <p className="text-xs text-gray-400 mt-1">(In production, this would be sent to your email)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Back to Home */}
        <Link href="/" className="inline-flex items-center text-gray-400 hover:text-orange-400 mb-6 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        {/* Register Card */}
        <Card className="bg-black/60 backdrop-blur-xl border-orange-500/20 shadow-2xl">
          <CardHeader className="text-center pb-6">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-orange-500/20 p-3 rounded-full">
                <Crown className="h-8 w-8 text-orange-400" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-white">Join the City</CardTitle>
            <CardDescription className="text-gray-300">
              Create your account to start your roleplay journey
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {Object.keys(errors).length > 0 && (
              <Alert className="bg-red-500/20 border-red-500/50 text-red-200">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errors.exists || Object.values(errors)[0]}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="bg-green-500/20 border-green-500/50 text-green-200">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username Field */}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-white font-medium">
                  Username
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="Choose a username"
                    value={formData.username}
                    onChange={(e) => handleInputChange("username", e.target.value)}
                    className="pl-10 bg-black/30 border-orange-500/20 text-white placeholder:text-gray-400 focus:border-orange-400 focus:ring-orange-400/20"
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white font-medium">
                  Gmail Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your Gmail address"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="pl-10 bg-black/30 border-orange-500/20 text-white placeholder:text-gray-400 focus:border-orange-400 focus:ring-orange-400/20"
                    required
                  />
                </div>
                <p className="text-xs text-gray-400">We'll send a verification code to your Gmail</p>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className="pl-10 pr-10 bg-black/30 border-orange-500/20 text-white placeholder:text-gray-400 focus:border-orange-400 focus:ring-orange-400/20"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-white font-medium">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    className="pl-10 pr-10 bg-black/30 border-orange-500/20 text-white placeholder:text-gray-400 focus:border-orange-400 focus:ring-orange-400/20"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Terms Agreement */}
              <div className="space-y-2">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
                    className="border-orange-500/20 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500 mt-1"
                  />
                  <Label htmlFor="terms" className="text-sm text-gray-300 cursor-pointer leading-relaxed">
                    I agree to the{" "}
                    <Link href="/terms" className="text-orange-400 hover:text-orange-300">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-orange-400 hover:text-orange-300">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>
              </div>

              {/* Register Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 transition-all duration-200 disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                    Creating Account...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Create Account
                  </div>
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-orange-500/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-black/60 text-gray-400">or</span>
              </div>
            </div>

            {/* Login Link */}
            <div className="text-center">
              <p className="text-gray-300 mb-3">Already have an account?</p>
              <Link href="/login">
                <Button
                  variant="outline"
                  className="w-full border-orange-500/20 text-white hover:bg-orange-500/10 bg-transparent"
                >
                  Sign In Instead
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6 text-gray-400 text-sm">
          <p>&copy; 2025 SMIYA CITY ROLEPLAY. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
