"use client"

import { useAuth } from "./hooks/useAuth.jsx"
import { ThemeProvider } from "./hooks/useTheme.jsx"
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
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 dark:from-gray-900 dark:to-indigo-950 transition-colors duration-300">
        <Navbar />
        <main className="py-8">
          <HomePage />
        </main>
      </div>
    </ThemeProvider>
  )
}

export default App

