"use client";

import { useAuth } from "../hooks/useAuth.jsx";
import { useTheme } from "../hooks/useTheme.jsx";
import { UserCircle, LogOut, Github, Sun, Moon } from "lucide-react";

export function Navbar() {
  const { user, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg dark:from-indigo-900 dark:to-purple-900">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold tracking-tight">
              <span className="inline-block mr-2">🔐</span>
              Auth Demo
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/krishna-nishant/mern-oauth-authentication"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-white/80 hover:text-white transition-colors duration-200 text-sm"
            >
              <Github className="h-4 w-4" />
              <span>GitHub Repo</span>
            </a>
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label={
                darkMode ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {darkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>

            {user && (
              <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center gap-2 bg-white/10 rounded-full py-1.5 px-4 backdrop-blur-sm">
                  <UserCircle className="h-5 w-5 text-white/80" />
                  <span className="text-white/90 font-medium">
                    {user.displayName || "User"}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white rounded-full py-1.5 px-4 transition-all duration-200 backdrop-blur-sm"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
