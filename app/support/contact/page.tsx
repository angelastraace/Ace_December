"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, Send, Paperclip, X } from "lucide-react"
import Link from "next/link"
import { Starfield } from "@/components/starfield"
import { GlassCard } from "@/components/glass-card"
import type { TicketFormData } from "../types"

const initialFormData: TicketFormData = {
  email: "",
  subject: "",
  category: "",
  description: "",
  attachments: [],
}

export default function ContactPage() {
  const [formData, setFormData] = useState<TicketFormData>(initialFormData)
  const [attachments, setAttachments] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof TicketFormData, string>>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when field is edited
    if (errors[name as keyof TicketFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files)
      setAttachments((prev) => [...prev, ...newFiles])
    }
  }

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index))
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof TicketFormData, string>> = {}

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.subject) {
      newErrors.subject = "Subject is required"
    }

    if (!formData.category) {
      newErrors.category = "Please select a category"
    }

    if (!formData.description) {
      newErrors.description = "Description is required"
    } else if (formData.description.length < 20) {
      newErrors.description = "Description must be at least 20 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormData(initialFormData)
      setAttachments([])
    }, 1500)
  }

  return (
    <div className="relative min-h-screen bg-black text-white">
      <Starfield starCount={300} />

      <main className="relative z-10 max-w-3xl mx-auto px-6 py-24">
        <Link
          href="/support"
          className="inline-flex items-center text-gray-400 hover:text-purple-400 transition-colors mb-8"
        >
          <ChevronLeft size={16} />
          <span>Back to Support Hub</span>
        </Link>

        <motion.h1
          className="text-4xl font-bold text-center text-transparent bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Contact ACE Support
        </motion.h1>

        <motion.p
          className="text-center text-gray-400 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Our support team is ready to assist you with any questions or issues you may have.
        </motion.p>

        <GlassCard>
          {!isSubmitted ? (
            <motion.form
              onSubmit={handleSubmit}
              className="p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 bg-white/10 border ${
                      errors.email ? "border-red-500" : "border-white/10"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 bg-white/10 border ${
                      errors.subject ? "border-red-500" : "border-white/10"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500`}
                    placeholder="Brief description of your issue"
                  />
                  {errors.subject && <p className="mt-1 text-sm text-red-500">{errors.subject}</p>}
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-1">
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 bg-white/10 border ${
                      errors.category ? "border-red-500" : "border-white/10"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500`}
                  >
                    <option value="">Select a category</option>
                    <option value="account">Account Issues</option>
                    <option value="wallet">Wallet Connection</option>
                    <option value="trading">Trading Problems</option>
                    <option value="deposits">Deposits & Withdrawals</option>
                    <option value="security">Security Concerns</option>
                    <option value="feature">Feature Request</option>
                    <option value="bug">Bug Report</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category}</p>}
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={5}
                    className={`w-full px-4 py-2 bg-white/10 border ${
                      errors.description ? "border-red-500" : "border-white/10"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500`}
                    placeholder="Please provide as much detail as possible about your issue"
                  />
                  {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Attachments (Optional)</label>
                  <div className="flex items-center gap-2">
                    <label
                      htmlFor="attachments"
                      className="px-4 py-2 bg-white/10 border border-white/10 rounded-lg cursor-pointer hover:bg-white/20 transition-colors flex items-center gap-2"
                    >
                      <Paperclip size={16} />
                      <span>Add Files</span>
                      <input type="file" id="attachments" onChange={handleFileChange} multiple className="hidden" />
                    </label>
                    <span className="text-sm text-gray-400">
                      {attachments.length} file{attachments.length !== 1 ? "s" : ""} selected
                    </span>
                  </div>

                  {attachments.length > 0 && (
                    <div className="mt-2 space-y-2">
                      {attachments.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-white/5 rounded-lg px-3 py-2">
                          <span className="text-sm truncate max-w-[80%]">{file.name}</span>
                          <button
                            type="button"
                            onClick={() => removeAttachment(index)}
                            className="text-gray-400 hover:text-red-400 transition-colors"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-purple-500/20 transition-all transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-none flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        <span>Submit Ticket</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.form>
          ) : (
            <motion.div
              className="p-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Ticket Submitted Successfully!</h2>
              <p className="text-gray-300 mb-6">
                Thank you for contacting ACE Support. We've received your ticket and will respond to your email shortly.
              </p>
              <p className="text-gray-300 mb-8">
                Your ticket has been assigned the ID:{" "}
                <span className="font-mono text-purple-400">
                  ACE-
                  {Math.floor(Math.random() * 10000)
                    .toString()
                    .padStart(4, "0")}
                </span>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/support"
                  className="px-6 py-3 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors"
                >
                  Return to Support Hub
                </Link>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white hover:shadow-lg hover:shadow-purple-500/20 transition-all"
                >
                  Submit Another Ticket
                </button>
              </div>
            </motion.div>
          )}
        </GlassCard>
      </main>
    </div>
  )
}
