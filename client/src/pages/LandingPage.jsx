import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Loader2 } from "lucide-react"

export default function SplashScreen() {
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
      navigate("/login")
    }, 5000) // Redirect after 5 seconds

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="text-center">
        <h1 className="mb-2 text-6xl font-bold text-white">StockWiseCare</h1>
        <p className="text-sm text-slate-300">
          Invest Smart. Give with Heart.
        </p>
        {loading && (
          <div className="mt-8 flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          </div>
        )}
      </div>
    </div>
  )
}
