"use client"

import { useAuth } from "../hooks/useAuth.jsx"
import { UserProfile } from "../components/UserProfile.jsx"

export function HomePage() {
  const { login, user, isAuthenticated } = useAuth()

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {isAuthenticated ? (
        <UserProfile user={user} />
      ) : (
        <div className="text-center max-w-3xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-3xl mb-4">
              🔐
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Welcome to Auth Demo</h2>
            <p className="text-gray-600 mb-8 text-lg">Securely authenticate with your preferred social accounts</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <button
              onClick={() => login("google")}
              className="flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 transition-all duration-200 group"
            >
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-red-100 text-red-600 group-hover:scale-110 transition-transform duration-200">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              </div>
              <span className="font-medium">Login with Google</span>
            </button>

            <button
              onClick={() => login("github")}
              className="flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 transition-all duration-200 group"
            >
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-900 text-white group-hover:scale-110 transition-transform duration-200">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                  />
                </svg>
              </div>
              <span className="font-medium">Login with GitHub</span>
            </button>

            <button
              onClick={() => login("twitter")}
              className="flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 transition-all duration-200 group"
            >
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-sky-100 text-sky-500 group-hover:scale-110 transition-transform duration-200">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"
                  />
                </svg>
              </div>
              <span className="font-medium">Login with Twitter</span>
            </button>

            <button
              onClick={() => login("facebook")}
              className="flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 transition-all duration-200 group"
            >
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-600 group-hover:scale-110 transition-transform duration-200">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M20.9,2H3.1C2.5,2,2,2.5,2,3.1v17.7C2,21.5,2.5,22,3.1,22h9.6v-7.7h-2.6v-3h2.6V9.2c0-2.6,1.6-4,3.9-4c1.1,0,2.1,0.1,2.3,0.1v2.7h-1.6c-1.3,0-1.5,0.6-1.5,1.5v1.9h3l-0.4,3h-2.6V22h5.1c0.6,0,1.1-0.5,1.1-1.1V3.1C22,2.5,21.5,2,20.9,2z"
                  />
                </svg>
              </div>
              <span className="font-medium">Login with Facebook</span>
            </button>

            <button
              onClick={() => login("linkedin")}
              className="flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 transition-all duration-200 group"
            >
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-700 group-hover:scale-110 transition-transform duration-200">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"
                  />
                </svg>
              </div>
              <span className="font-medium">Login with LinkedIn</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

