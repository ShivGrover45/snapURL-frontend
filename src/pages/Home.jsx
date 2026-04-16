import { useState } from "react"
import { Copy, Link, BarChart2, Check } from "lucide-react"
import { shortenUrl, getAnalytics } from "@/api/api"

export default function Home() {
  const [url, setUrl] = useState("")
  const [shortUrl, setShortUrl] = useState(null)
  const [shortID, setShortID] = useState("")
  const [analytics, setAnalytics] = useState(null)
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState(null)

  const handleShorten = async () => {
    if (!url) return
    setLoading(true)
    setError(null)
    try {
      const res = await shortenUrl(url)
      setShortUrl(res.data)
    } catch (err) {
      setError("Something went wrong. Check the URL and try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl.link)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleAnalytics = async () => {
    if (!shortID) return
    setAnalytics(null)
    try {
      const res = await getAnalytics(shortID)
      setAnalytics(res.data)
    } catch (err) {
      setAnalytics({ error: "No data found for this ID." })
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-xl mx-auto px-6 py-16">

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-1">
            <Link size={18} />
            <span className="font-medium text-base">SnapURL</span>
          </div>
          <p className="text-sm text-muted-foreground">Shorten links. Track clicks.</p>
        </div>

        {/* Shorten Card */}
        <div className="rounded-xl border border-border bg-card p-5 mb-3">
          <p className="text-[11px] uppercase tracking-widest text-muted-foreground mb-3">
            Shorten a URL
          </p>
          <div className="flex gap-2">
            <input
              className="flex-1 bg-muted border border-border rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-ring placeholder:text-muted-foreground"
              placeholder="Paste your long URL here..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleShorten()}
            />
            <button
              onClick={handleShorten}
              disabled={loading}
              className="bg-foreground text-background text-sm font-medium px-4 py-2 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? "..." : "Shorten"}
            </button>
          </div>
          {error && (
            <p className="text-xs text-red-400 mt-2">{error}</p>
          )}
        </div>

        {/* Result Card */}
        {shortUrl && (
          <div className="rounded-xl border border-green-500/40 bg-card p-5 mb-3">
            <p className="text-[11px] uppercase tracking-widest text-green-500 mb-3">
              Your short link
            </p>
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-medium truncate">{shortUrl.link}</span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-xs text-muted-foreground border border-border rounded-lg px-3 py-1.5 hover:bg-muted transition-colors shrink-0"
              >
                {copied ? <Check size={12} /> : <Copy size={12} />}
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        )}

        {/* Analytics Card */}
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-[11px] uppercase tracking-widest text-muted-foreground mb-3">
            Analytics
          </p>
          <div className="flex gap-2 mb-4">
            <input
              className="flex-1 bg-muted border border-border rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-ring placeholder:text-muted-foreground"
              placeholder="Enter short ID..."
              value={shortID}
              onChange={(e) => setShortID(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAnalytics()}
            />
            <button
              onClick={handleAnalytics}
              className="text-sm border border-border px-4 py-2 rounded-lg hover:bg-muted transition-colors"
            >
              Check
            </button>
          </div>

          {analytics && !analytics.error && (
            <div className="bg-muted rounded-lg p-4">
              <div className="flex justify-between items-center mb-3 pb-3 border-b border-border">
                <span className="text-sm text-muted-foreground">Total visits</span>
                <span className="text-2xl font-medium">{analytics.totalVisits}</span>
              </div>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {analytics.analytics.map((visit, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">
                      {new Date(visit.timestamp).toLocaleString()}
                    </span>
                    <span className="text-[10px] bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-full">
                      visit
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {analytics?.error && (
            <p className="text-xs text-red-400">{analytics.error}</p>
          )}
        </div>

      </div>
    </div>
  )
}