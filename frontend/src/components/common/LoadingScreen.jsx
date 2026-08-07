export default function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-white">
      <div className="flex items-center space-x-3">
        <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
        <span className="text-sm font-medium tracking-wide">Loading...</span>
      </div>
    </div>
  )
}
