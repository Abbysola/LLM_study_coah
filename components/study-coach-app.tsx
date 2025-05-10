"use client"
import { useState } from "react"
import { Calendar, ChevronRight, Clock, CheckCircle, Upload, FileText, X } from "lucide-react"
import type { User } from "@/components/auth-wrapper"

type StudyCoachAppProps = {
  initialUser: User | null
  onComplete: (userData: Partial<User>) => void
}

export default function StudyCoachApp({ initialUser, onComplete }: StudyCoachAppProps) {
  // Onboarding flow state
  const [step, setStep] = useState(1)
  const [examDate, setExamDate] = useState("")
  const [studyHours, setStudyHours] = useState(initialUser?.studyHours || 2)
  const [flashcardTarget, setFlashcardTarget] = useState(initialUser?.flashcardTarget || 20)
  const [completed, setCompleted] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1)
    } else {
      setCompleted(true)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleComplete = () => {
    onComplete({
      examDate,
      studyHours,
      flashcardTarget,
      completedOnboarding: true,
    })
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">When&apos;s your study deadline?</h2>
            <p className="text-gray-600">This helps us create a personalized learning timeline for you.</p>
            <div className="flex items-center">
              <Calendar className="mr-2 text-blue-500" />
              <input
                type="date"
                value={examDate}
                onChange={(e) => setExamDate(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <p className="text-sm text-gray-500">Optional: Skip if you don&apos;t have a specific deadline date.</p>
          </div>
        )
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">How many hours can you study daily?</h2>
            <p className="text-gray-600">Be realistic - consistency is better than burnout.</p>
            <div className="flex items-center">
              <Clock className="mr-2 text-blue-500" />
              <div className="w-full">
                <input
                  type="range"
                  min="0.5"
                  max="8"
                  step="0.5"
                  value={studyHours}
                  onChange={(e) => setStudyHours(Number.parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <span>0.5h</span>
                  <span>2h</span>
                  <span>4h</span>
                  <span>6h</span>
                  <span>8h</span>
                </div>
                <p className="text-center text-lg font-medium text-blue-600 mt-4">{studyHours} hours per day</p>
              </div>
            </div>
          </div>
        )
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">How many flashcards can you review daily?</h2>
            <p className="text-gray-600">Flashcards are a proven way to retain information.</p>
            <div className="flex items-center">
              <div className="w-full">
                <input
                  type="range"
                  min="5"
                  max="100"
                  step="5"
                  value={flashcardTarget}
                  onChange={(e) => setFlashcardTarget(Number.parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <span>5</span>
                  <span>25</span>
                  <span>50</span>
                  <span>75</span>
                  <span>100</span>
                </div>
                <p className="text-center text-lg font-medium text-blue-600 mt-4">
                  {flashcardTarget} flashcards per day
                </p>
              </div>
            </div>
          </div>
        )
      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Upload your study materials</h2>
            <p className="text-gray-600">Add PDF files to create personalized study plans and flashcards.</p>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
              <input
                type="file"
                id="file-upload"
                accept=".pdf"
                className="hidden"
                multiple
                onChange={(e) => {
                  if (e.target.files) {
                    const newFiles = Array.from(e.target.files)
                    setUploadedFiles([...uploadedFiles, ...newFiles])
                  }
                }}
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">
                  <span className="font-medium text-blue-600">Click to upload</span> or drag and drop PDFs here
                </p>
                <p className="text-xs text-gray-500 mt-1">PDF files only (Max 50MB per file)</p>
              </label>
            </div>

            {uploadedFiles.length > 0 && (
              <div className="mt-4">
                <h3 className="font-medium text-gray-700 mb-2">Uploaded files:</h3>
                <ul className="space-y-2">
                  {uploadedFiles.map((file, index) => (
                    <li key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center">
                        <FileText className="mr-2 text-blue-500" size={18} />
                        <span className="text-sm truncate max-w-xs">{file.name}</span>
                      </div>
                      <button
                        onClick={() => {
                          setUploadedFiles(uploadedFiles.filter((_, i) => i !== index))
                        }}
                        className="text-gray-500 hover:text-red-500"
                      >
                        <X size={18} />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <p className="text-sm text-gray-500">Optional: You can always add more materials later.</p>
          </div>
        )
      default:
        return null
    }
  }

  const renderProgressBar = () => {
    return (
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                i === step
                  ? "border-blue-600 bg-blue-600 text-white"
                  : i < step
                    ? "border-blue-600 bg-blue-100 text-blue-600"
                    : "border-gray-300 bg-gray-100 text-gray-500"
              }`}
            >
              {i}
            </div>
          ))}
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${((step - 1) / 3) * 100}%` }}
          ></div>
        </div>
      </div>
    )
  }

  const renderCompletionScreen = () => {
    return (
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <CheckCircle size={80} className="text-green-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">You&apos;re all set!</h2>
        <div className="bg-gray-50 p-6 rounded-lg text-left">
          <h3 className="font-medium text-gray-700 mb-4">Your Study Plan:</h3>
          <ul className="space-y-3">
            {examDate && (
              <li className="flex items-center">
                <Calendar className="mr-2 text-blue-500" size={20} />
                <span>
                  Study Deadline: <span className="font-medium">{new Date(examDate).toLocaleDateString()}</span>
                </span>
              </li>
            )}
            <li className="flex items-center">
              <Clock className="mr-2 text-blue-500" size={20} />
              <span>
                Daily Study Goal: <span className="font-medium">{studyHours} hours</span>
              </span>
            </li>
            <li className="flex items-center">
              <CheckCircle className="mr-2 text-blue-500" size={20} />
              <span>
                Daily Flashcard Target: <span className="font-medium">{flashcardTarget} cards</span>
              </span>
            </li>
            {uploadedFiles.length > 0 && (
              <li className="flex items-center">
                <FileText className="mr-2 text-blue-500" size={20} />
                <span>
                  Study Materials:{" "}
                  <span className="font-medium">
                    {uploadedFiles.length} file{uploadedFiles.length !== 1 ? "s" : ""} uploaded
                  </span>
                </span>
              </li>
            )}
          </ul>
        </div>
        <p className="text-gray-600">Your personalized study plan is ready! Click below to start learning.</p>
        <button
          onClick={handleComplete}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Go to Dashboard
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-center mb-8">
          <h1 className="text-2xl font-bold text-blue-600">Your Personalised Study Coach</h1>
        </div>

        {!completed ? (
          <>
            {renderProgressBar()}
            {renderStep()}

            <div className="mt-8 flex justify-between">
              {step > 1 ? (
                <button onClick={handleBack} className="px-4 py-2 text-gray-600 hover:text-gray-800 transition">
                  Back
                </button>
              ) : (
                <div></div>
              )}
              <button
                onClick={handleNext}
                className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                {step === 4 ? "Finish" : "Next"}
                <ChevronRight size={20} className="ml-1" />
              </button>
            </div>
          </>
        ) : (
          renderCompletionScreen()
        )}
      </div>
    </div>
  )
}
