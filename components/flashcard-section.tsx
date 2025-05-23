"use client"

import { useState } from "react"
import { BookOpen, ChevronLeft, ChevronRight, Plus, Search, Settings, Shuffle } from "lucide-react"

type Flashcard = {
  id: string
  front: string
  back: string
  category: string
  lastReviewed?: Date
  difficulty: "easy" | "medium" | "hard"
}

// Mock data for flashcards
const mockFlashcards: Flashcard[] = [
  {
    id: "1",
    front: "What is Big O Notation?",
    back: "Big O notation is a mathematical notation that describes the limiting behavior of a function when the argument tends towards a particular value or infinity. In computer science, it's used to classify algorithms according to how their run time or space requirements grow as the input size grows.",
    category: "Algorithms",
    difficulty: "medium",
  },
  {
    id: "2",
    front: "What is a Stack data structure?",
    back: "A stack is a linear data structure that follows the Last In First Out (LIFO) principle. The last item to be inserted is the first one to be deleted. Basic operations include push (insert) and pop (remove).",
    category: "Data Structures",
    difficulty: "easy",
  },
  {
    id: "3",
    front: "What is a Queue data structure?",
    back: "A queue is a linear data structure that follows the First In First Out (FIFO) principle. The first item to be inserted is the first one to be deleted. Basic operations include enqueue (insert) and dequeue (remove).",
    category: "Data Structures",
    difficulty: "easy",
  },
  {
    id: "4",
    front: "What is a Binary Search Tree?",
    back: "A binary search tree is a node-based binary tree data structure that has the following properties: The left subtree of a node contains only nodes with keys lesser than the node's key. The right subtree of a node contains only nodes with keys greater than the node's key.",
    category: "Data Structures",
    difficulty: "hard",
  },
  {
    id: "5",
    front: "What is the time complexity of quicksort?",
    back: "The average time complexity of quicksort is O(n log n), where n is the number of items being sorted. In the worst case, it's O(n²), but this is rare with good pivot selection strategies.",
    category: "Algorithms",
    difficulty: "medium",
  },
]

export default function FlashcardSection() {
  const [currentDeck, setCurrentDeck] = useState<"all" | "algorithms" | "data-structures">("all")
  const [currentView, setCurrentView] = useState<"browse" | "study">("browse")
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // Filter flashcards based on current deck and search query
  const filteredFlashcards = mockFlashcards.filter((card) => {
    const matchesDeck =
      currentDeck === "all" ||
      (currentDeck === "algorithms" && card.category === "Algorithms") ||
      (currentDeck === "data-structures" && card.category === "Data Structures")

    const matchesSearch =
      searchQuery === "" ||
      card.front.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.back.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesDeck && matchesSearch
  })

  const handleNextCard = () => {
    if (currentCardIndex < filteredFlashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1)
      setIsFlipped(false)
    }
  }

  const handlePrevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1)
      setIsFlipped(false)
    }
  }

  const handleShuffleCards = () => {
    setCurrentCardIndex(0)
    setIsFlipped(false)
    // In a real app, you would shuffle the array here
  }

  const renderBrowseView = () => {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search flashcards..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full sm:w-64"
            />
          </div>

          <div className="flex items-center space-x-2">
            <select
              value={currentDeck}
              onChange={(e) => setCurrentDeck(e.target.value as any)}
              className="p-2 border border-gray-300 rounded-lg"
            >
              <option value="all">All Decks</option>
              <option value="algorithms">Algorithms</option>
              <option value="data-structures">Data Structures</option>
            </select>

            <button
              onClick={() => setCurrentView("study")}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center"
            >
              <BookOpen size={18} className="mr-2" />
              Study
            </button>

            <button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50">
              <Plus size={18} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredFlashcards.map((card) => (
            <div key={card.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
              <div className="flex items-start justify-between mb-2">
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${
                    card.category === "Algorithms" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {card.category}
                </span>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${
                    card.difficulty === "easy"
                      ? "bg-green-100 text-green-800"
                      : card.difficulty === "medium"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                  }`}
                >
                  {card.difficulty.charAt(0).toUpperCase() + card.difficulty.slice(1)}
                </span>
              </div>

              <h3 className="font-medium mb-2 line-clamp-2">{card.front}</h3>
              <p className="text-sm text-gray-600 line-clamp-3">{card.back}</p>
            </div>
          ))}
        </div>

        {filteredFlashcards.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No flashcards found. Try a different search or create new ones.</p>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center mx-auto">
              <Plus size={18} className="mr-2" />
              Create Flashcard
            </button>
          </div>
        )}
      </div>
    )
  }

  const renderStudyView = () => {
    if (filteredFlashcards.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-500">No flashcards available for study. Try a different deck or create new ones.</p>
          <div className="mt-4 flex justify-center space-x-4">
            <button
              onClick={() => setCurrentView("browse")}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
            >
              Back to Browse
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center">
              <Plus size={18} className="mr-2" />
              Create Flashcard
            </button>
          </div>
        </div>
      )
    }

    const currentCard = filteredFlashcards[currentCardIndex]

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentView("browse")}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition flex items-center"
          >
            <ChevronLeft size={18} className="mr-1" />
            Back
          </button>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">
              {currentCardIndex + 1} of {filteredFlashcards.length}
            </span>

            <button
              onClick={handleShuffleCards}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50"
              title="Shuffle cards"
            >
              <Shuffle size={18} />
            </button>

            <button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50" title="Settings">
              <Settings size={18} />
            </button>
          </div>
        </div>

        <div
          className="relative bg-white border border-gray-200 rounded-xl p-6 shadow-sm mx-auto max-w-2xl aspect-video cursor-pointer"
          onClick={() => setIsFlipped(!isFlipped)}
          style={{ perspective: "1000px" }}
        >
          <div
            className="absolute inset-0 flex items-center justify-center p-6 backface-hidden transition-transform duration-500"
            style={{
              transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
              backfaceVisibility: "hidden",
            }}
          >
            <h3 className="text-xl font-medium text-center">{currentCard.front}</h3>
          </div>

          <div
            className="absolute inset-0 flex items-center justify-center p-6 backface-hidden transition-transform duration-500"
            style={{
              transform: isFlipped ? "rotateY(0deg)" : "rotateY(-180deg)",
              backfaceVisibility: "hidden",
            }}
          >
            <p className="text-gray-800">{currentCard.back}</p>
          </div>

          <div className="absolute bottom-3 right-3 text-sm text-gray-500">Click to flip</div>
        </div>

        <div className="flex justify-center space-x-4 pt-4">
          <button
            onClick={handlePrevCard}
            disabled={currentCardIndex === 0}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={18} className="mr-1" />
            Previous
          </button>

          <button
            onClick={handleNextCard}
            disabled={currentCardIndex === filteredFlashcards.length - 1}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
            <ChevronRight size={18} className="ml-1" />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      {currentView === "browse" ? renderBrowseView() : renderStudyView()}
    </div>
  )
}
