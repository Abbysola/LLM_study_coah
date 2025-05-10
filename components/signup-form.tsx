"use client"

import type React from "react"

import { useState } from "react"
import type { User } from "@/components/auth-wrapper"
import { UserIcon, ArrowLeft, ChevronRight } from "lucide-react"

type SignupFormProps = {
  onSignup: (userData: Partial<User>) => void
  onBackToLanding: () => void
  onLoginClick: () => void
}

export default function SignupForm({ onSignup, onBackToLanding, onLoginClick }: SignupFormProps) {
  const [studentId, setStudentId] = useState("")
  const [nickname, setNickname] = useState("")
  const [email, setEmail] = useState("")
  const [errors, setErrors] = useState<{
    studentId?: string
    nickname?: string
    email?: string
  }>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors: {
      studentId?: string
      nickname?: string
      email?: string
    } = {}

    if (studentId.trim() === "") {
      newErrors.studentId = "Please enter your student ID"
    } else if (studentId.length < 5) {
      newErrors.studentId = "Student ID must be at least 5 characters"
    }

    if (nickname.trim() === "") {
      newErrors.nickname = "Please enter your preferred nickname"
    }

    if (email.trim() === "") {
      newErrors.email = "Please enter your email"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onSignup({ studentId, nickname, email })
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center mb-8">
          <button onClick={onBackToLanding} className="p-2 rounded-full hover:bg-gray-100 transition">
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <h1 className="text-2xl font-bold text-blue-600 mx-auto pr-8">Your Personalised Study Coach</h1>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create Account</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="student-id" className="block text-sm font-medium text-gray-700 mb-1">
              Student ID
            </label>
            <div className="flex items-center">
              <UserIcon className="mr-2 text-blue-500" />
              <input
                id="student-id"
                type="text"
                value={studentId}
                onChange={(e) => {
                  setStudentId(e.target.value)
                  if (errors.studentId) setErrors({ ...errors, studentId: undefined })
                }}
                placeholder="e.g. STUD12345"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            {errors.studentId && <p className="mt-2 text-sm text-red-600">{errors.studentId}</p>}
          </div>

          <div>
            <label htmlFor="nickname" className="block text-sm font-medium text-gray-700 mb-1">
              Preferred Nickname
            </label>
            <input
              id="nickname"
              type="text"
              value={nickname}
              onChange={(e) => {
                setNickname(e.target.value)
                if (errors.nickname) setErrors({ ...errors, nickname: undefined })
              }}
              placeholder="How would you like to be called?"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.nickname && <p className="mt-2 text-sm text-red-600">{errors.nickname}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (errors.email) setErrors({ ...errors, email: undefined })
              }}
              placeholder="your.email@example.com"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
            <p className="mt-2 text-sm text-gray-500">
              We&apos;ll use this to personalize your learning experience and save your progress.
            </p>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Continue <ChevronRight size={20} className="ml-1" />
          </button>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <button type="button" onClick={onLoginClick} className="text-blue-600 hover:underline font-medium">
                Log in
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
