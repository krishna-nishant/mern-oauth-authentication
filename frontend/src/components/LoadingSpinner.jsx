export function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-50 to-purple-50">
      <div className="relative">
        <div className="h-16 w-16 rounded-full border-t-4 border-b-4 border-indigo-600 animate-spin"></div>
        <div className="h-16 w-16 rounded-full border-r-4 border-l-4 border-purple-600 animate-spin absolute inset-0"></div>
      </div>
    </div>
  )
}

