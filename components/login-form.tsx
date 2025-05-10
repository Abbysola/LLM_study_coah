"use client"

import type React from "react"

import { useState } from "react"
import type { User } from "@/components/auth-wrapper"
import { ArrowLeft, ChevronRight, UserIcon, Lock } from "lucide-react"

type LoginFormProps = {
  onLogin: (userData: User) => void
  onBackToLanding: () => void
  onSignupClick: () => void
}

export default function LoginForm({ onLogin, onBackToLanding, onSignupClick }: LoginFormProps) {
  const [studentId, setStudentId] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (studentId.trim() === "" || password.trim() === "") {
      setError("Please enter both student ID and password")
      return
    }

    // In a real app, this would be an API call to authenticate the user
    // For demo purposes, we'll just simulate a successful login
    const mockUser: User = {
      id: "user123",
      nickname: "Demo User",
      studentId: studentId,
      studyHours: 2,
      flashcardTarget: 20,
      completedOnboarding: true,
    }

    onLogin(mockUser)
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

        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Welcome Back</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">{error}</div>}

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
                  if (error) setError("")
                }}
                placeholder="e.g. STUD12345"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="flex items-center">
              <Lock className="mr-2 text-blue-500" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  if (error) setError("")
                }}
                placeholder="Enter your password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex justify-end mt-2">
              <button type="button" className="text-sm text-blue-600 hover:underline">
                Forgot password?
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Log In <ChevronRight size={20} className="ml-1" />
          </button>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <button type="button" onClick={onSignupClick} className="text-blue-600 hover:underline font-medium">
                Sign up
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
