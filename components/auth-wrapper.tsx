"use client"

import { useState } from "react"
import LoginForm from "@/components/login-form"
import SignupForm from "@/components/signup-form"
import StudyCoachApp from "@/components/study-coach-app"
import Dashboard from "@/components/dashboard"

export type User = {
  id: string
  nickname: string
  email?: string
  studentId: string
  examDate?: string
  studyHours: number
  flashcardTarget: number
  completedOnboarding: boolean
}

export default function AuthWrapper() {
  const [currentView, setCurrentView] = useState<"landing" | "login" | "signup" | "onboarding" | "dashboard">("landing")
  const [user, setUser] = useState<User | null>(null)

  const handleLogin = (userData: User) => {
    setUser(userData)
    setCurrentView("dashboard")
  }

  const handleSignup = (userData: Partial<User>) => {
    // In a real app, this would be an API call to create the user
    const newUser: User = {
      id: Math.random().toString(36).substring(2, 9),
      nickname: userData.nickname || "",
      studentId: userData.studentId || "",
      studyHours: 2,
      flashcardTarget: 20,
      completedOnboarding: false,
    }
    setUser(newUser)
    setCurrentView("onboarding")
  }

  const handleOnboardingComplete = (updatedUserData: Partial<User>) => {
    if (user) {
      const updatedUser = {
        ...user,
        ...updatedUserData,
        completedOnboarding: true,
      }
      setUser(updatedUser)
      setCurrentView("dashboard")
    }
  }

  if (currentView === "landing") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-900 flex flex-col items-center justify-center p-4 text-white">
        <div className="w-full max-w-lg text-center space-y-6">
          {/* Landing page content */}
          <div className="mb-10 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-blue-300 opacity-30 blur-xl"></div>
              <div className="relative bg-blue-100 text-blue-600 p-5 rounded-full">
                <BookOpenIcon size={64} />
              </div>
            </div>
          </div>

          <h1 className="text-5xl font-bold leading-tight">Your Personalised Study Coach</h1>

          <div className="flex items-center justify-center space-x-2 mb-6">
            <SparklesIcon size={20} className="text-yellow-300" />
            <h2 className="text-xl font-medium text-blue-100">Your AI-Powered Learning Assistant</h2>
            <SparklesIcon size={20} className="text-yellow-300" />
          </div>

          <p className="text-lg max-w-md mx-auto text-blue-100">
            Create a customized study plan, generate flashcards, and get personalized help with any subject.
          </p>

          <div className="mt-12 flex gap-4 justify-center">
            <button
              onClick={() => setCurrentView("signup")}
              className="px-8 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Sign Up
            </button>
            <button
              onClick={() => setCurrentView("login")}
              className="px-8 py-3 bg-transparent border border-white text-white rounded-lg font-medium hover:bg-white/10 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Login
            </button>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4 max-w-md mx-auto">
            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
              <h3 className="font-medium">Smart Study Plans</h3>
            </div>
            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
              <h3 className="font-medium">AI Flashcards</h3>
            </div>
            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
              <h3 className="font-medium">24/7 Assistance</h3>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (currentView === "login") {
    return (
      <LoginForm
        onLogin={handleLogin}
        onBackToLanding={() => setCurrentView("landing")}
        onSignupClick={() => setCurrentView("signup")}
      />
    )
  }

  if (currentView === "signup") {
    return (
      <SignupForm
        onSignup={handleSignup}
        onBackToLanding={() => setCurrentView("landing")}
        onLoginClick={() => setCurrentView("login")}
      />
    )
  }

  if (currentView === "onboarding") {
    return <StudyCoachApp initialUser={user} onComplete={handleOnboardingComplete} />
  }

  if (currentView === "dashboard") {
    return <Dashboard user={user!} />
  }

  return null
}

// Icons
import { BookOpenIcon, SparklesIcon } from "lucide-react"
