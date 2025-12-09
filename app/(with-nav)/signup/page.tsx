"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Eye, EyeOff, ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import ParticleBackground from "@/components/particle-background"

export default function SignupPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    agreeTerms: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    if (!formData.firstName) {
      newErrors.firstName = "First name is required"
    }

    if (!formData.lastName) {
      newErrors.lastName = "Last name is required"
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "You must agree to the terms and conditions"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      // Here you would typically call your API to register the user
      // For now, we'll just simulate a delay and redirect
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Redirect to dashboard after successful signup
      router.push("/dashboard")
    } catch (error) {
      console.error("Signup error:", error)
      setErrors({ form: "An error occurred during signup. Please try again." })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#001219] flex flex-col">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="stars-container absolute inset-0 z-0">
          <div className="stars"></div>
          <div className="stars2"></div>
          <div className="stars3"></div>
        </div>
        <ParticleBackground />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between border-b border-gray-800 bg-black/20 px-4 py-4 backdrop-blur-md md:px-6">
        <Link href="/" className="flex items-center space-x-2">
          <ArrowLeft className="h-5 w-5 text-teal-500" />
          <span className="text-teal-500 font-medium">Back to Home</span>
        </Link>
      </header>

      {/* Main content */}
      <main className="flex-1 relative z-10 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-black/40 border-gray-800 backdrop-blur-md">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              <Image src="/images/ace-coin.png" alt="ACE Exchange" width={60} height={60} className="animate-pulse" />
            </div>
            <CardTitle className="text-2xl text-center text-white">Create Your Account</CardTitle>
            <CardDescription className="text-center text-gray-400">
              Enter your details below to create your ACE Exchange account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-white">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`bg-gray-900/50 border-gray-700 text-white ${errors.firstName ? "border-red-500" : ""}`}
                  />
                  {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-white">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`bg-gray-900/50 border-gray-700 text-white ${errors.lastName ? "border-red-500" : ""}`}
                  />
                  {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john.doe@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={`bg-gray-900/50 border-gray-700 text-white ${errors.email ? "border-red-500" : ""}`}
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className={`bg-gray-900/50 border-gray-700 text-white pr-10 ${errors.password ? "border-red-500" : ""}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-white">
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`bg-gray-900/50 border-gray-700 text-white ${errors.confirmPassword ? "border-red-500" : ""}`}
                />
                {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="agreeTerms"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onCheckedChange={(checked) => {
                    setFormData((prev) => ({ ...prev, agreeTerms: checked === true }))
                    if (errors.agreeTerms) {
                      setErrors((prev) => ({ ...prev, agreeTerms: "" }))
                    }
                  }}
                />
                <label
                  htmlFor="agreeTerms"
                  className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${errors.agreeTerms ? "text-red-500" : "text-white"}`}
                >
                  I agree to the{" "}
                  <Link href="/terms" className="text-teal-400 hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-teal-400 hover:underline">
                    Privacy Policy
                  </Link>
                </label>
              </div>
              {errors.agreeTerms && <p className="text-sm text-red-500">{errors.agreeTerms}</p>}

              {errors.form && <p className="text-sm text-red-500 text-center">{errors.form}</p>}

              <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white" disabled={loading}>
                {loading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-400">
              Already have an account?{" "}
              <Link href="/login" className="text-teal-400 hover:underline">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}
