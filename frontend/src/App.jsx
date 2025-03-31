"use client"

import { useAuth } from "./hooks/useAuth.jsx"
import { Navbar } from "./components/Navbar"
import { HomePage } from "./pages/HomePage"
import { LoadingSpinner } from "./components/LoadingSpinner"
import "./app.css"

function App() {
  const { loading } = useAuth()

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50">
      <Navbar />
      <main className="py-8">
        <HomePage />
      </main>
    </div>
  )
}

export default App

