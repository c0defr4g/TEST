"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Crown, User, Lock, Eye, EyeOff, LogIn, UserPlus, ArrowLeft, Shield, AlertCircle, Mail } from "lucide-react"
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

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  useEffect(() => {
    // Load saved credentials if remember me was checked
    const savedEmail = localStorage.getItem("rememberedEmail")
    const savedPassword = localStorage.getItem("rememberedPassword")
    const rememberMe = localStorage.getItem("rememberMe") === "true"

    if (savedEmail && savedPassword && rememberMe) {
      setFormData({
        email: savedEmail,
        password: savedPassword,
        rememberMe: true,
      })
    }
  }, [])

  const validateCredentials = (email: string, password: string): RegisteredUser | null => {
    const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]")

    // Find user by email
    const user = registeredUsers.find((user: RegisteredUser) => user.email.toLowerCase() === email.toLowerCase())

    if (!user) {
      return null
    }

    // Check if email is verified
    if (!user.isVerified) {
      setError("Please verify your email address before logging in. Check your Gmail for the verification code.")
      return null
    }

    // Check password
    if (user.password === password) {
      return user
    }

    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess("")

    // Basic validation
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields")
      setIsLoading(false)
      return
    }

    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address")
      setIsLoading(false)
      return
    }

    // Simulate loading time
    setTimeout(() => {
      // Validate credentials against stored data
      const validUser = validateCredentials(formData.email, formData.password)

      if (validUser) {
        // Save remember me preferences
        if (formData.rememberMe) {
          localStorage.setItem("rememberedEmail", formData.email)
          localStorage.setItem("rememberedPassword", formData.password)
          localStorage.setItem("rememberMe", "true")
        } else {
          localStorage.removeItem("rememberedEmail")
          localStorage.removeItem("rememberedPassword")
          localStorage.removeItem("rememberMe")
        }

        // Save current session
        const sessionData = {
          id: validUser.id,
          username: validUser.username,
          email: validUser.email,
          loginTime: new Date().toISOString(),
          isLoggedIn: true,
        }

        localStorage.setItem("currentUser", JSON.stringify(sessionData))
        localStorage.setItem("isAuthenticated", "true")

        setSuccess(`Welcome back, ${validUser.username}!`)

        // Redirect to home page after 1 second
        setTimeout(() => {
          router.push("/")
        }, 1000)
      } else {
        if (!error) {
          // Only set this error if no other error was set (like email verification)
          setError("Invalid email or password. Please check your credentials and try again.")
        }
      }

      setIsLoading(false)
    }, 1500)
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (error) setError("")
    if (success) setSuccess("")
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

        {/* Login Card */}
        <Card className="bg-black/60 backdrop-blur-xl border-orange-500/20 shadow-2xl">
          <CardHeader className="text-center pb-6">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-orange-500/20 p-3 rounded-full">
                <Crown className="h-8 w-8 text-orange-400" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-white">Welcome Back</CardTitle>
            <CardDescription className="text-gray-300">Sign in to access SMIYA CITY ROLEPLAY</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {error && (
              <Alert className="bg-red-500/20 border-red-500/50 text-red-200">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="bg-green-500/20 border-green-500/50 text-green-200">
                <Shield className="h-4 w-4" />
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white font-medium">
                  Email
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="pl-10 bg-black/30 border-orange-500/20 text-white placeholder:text-gray-400 focus:border-orange-400 focus:ring-orange-400/20"
                    required
                  />
                </div>
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
                    placeholder="Enter your password"
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

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={formData.rememberMe}
                    onCheckedChange={(checked) => handleInputChange("rememberMe", checked as boolean)}
                    className="border-orange-500/20 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                  />
                  <Label htmlFor="remember" className="text-sm text-gray-300 cursor-pointer">
                    Remember me
                  </Label>
                </div>
                <Link
                  href="/forgot-password"
                  className="text-sm text-orange-400 hover:text-orange-300 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 transition-all duration-200 disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <LogIn className="mr-2 h-4 w-4" />
                    Sign In
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

            {/* Register Link */}
            <div className="text-center">
              <p className="text-gray-300 mb-3">Don't have an account?</p>
              <Link href="/register">
                <Button
                  variant="outline"
                  className="w-full border-orange-500/20 text-white hover:bg-orange-500/10 bg-transparent"
                >
                  <UserPlus className="mr-2 h-4 w-4" />
                  Create Account
                </Button>
              </Link>
            </div>

            {/* Email Verification Info */}
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
              <div className="flex items-center mb-2">
                <Mail className="h-4 w-4 text-blue-400 mr-2" />
                <span className="text-sm font-medium text-blue-200">Email Verification Required</span>
              </div>
              <div className="text-xs text-blue-200/80">
                <p>New accounts must verify their Gmail address before logging in.</p>
                <p>Check your email for the verification code after registration.</p>
              </div>
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
