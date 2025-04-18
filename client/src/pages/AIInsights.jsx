import { useEffect, useState } from 'react'
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts'

const AIInsights = () => {
  const [sentimentData, setSentimentData] = useState([])
  const [predictions, setPredictions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulated sentiment data
    const sentiment = [
      { sector: 'Technology', sentiment: 0.8, volume: 1500 },
      { sector: 'Healthcare', sentiment: 0.6, volume: 1200 },
      { sector: 'Finance', sentiment: 0.4, volume: 900 },
      { sector: 'Energy', sentiment: 0.3, volume: 800 },
      { sector: 'Consumer', sentiment: 0.5, volume: 1100 },
    ]
    setSentimentData(sentiment)

    // Simulated predictions
    const preds = [
      {
        stock: 'AAPL',
        currentPrice: 150.25,
        predictedPrice: 165.50,
        confidence: 0.85,
        timeframe: '1 month',
      },
      {
        stock: 'MSFT',
        currentPrice: 280.75,
        predictedPrice: 295.25,
        confidence: 0.78,
        timeframe: '1 month',
      },
      {
        stock: 'GOOGL',
        currentPrice: 2750.00,
        predictedPrice: 2850.00,
        confidence: 0.72,
        timeframe: '1 month',
      },
    ]
    setPredictions(preds)
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">AI Insights</h1>
        <p className="text-gray-600">
          Powered by HuggingFace's DistilBERT analyzing 50+ news/social sources
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Sector Sentiment Analysis
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sentimentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="sector" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="sentiment"
                  fill="#2563eb"
                  name="Sentiment Score"
                />
                <Bar
                  dataKey="volume"
                  fill="#10b981"
                  name="News Volume"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Market Predictions
          </h3>
          <div className="space-y-4">
            {predictions.map((pred) => (
              <div
                key={pred.stock}
                className="p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-lg font-medium text-gray-900">
                    {pred.stock}
                  </h4>
                  <span
                    className={`px-2 py-1 rounded text-sm font-medium ${
                      pred.confidence >= 0.8
                        ? 'bg-green-100 text-green-800'
                        : pred.confidence >= 0.6
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {Math.round(pred.confidence * 100)}% confidence
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Current Price</p>
                    <p className="text-lg font-medium text-gray-900">
                      ${pred.currentPrice.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Predicted Price</p>
                    <p className="text-lg font-medium text-green-600">
                      ${pred.predictedPrice.toFixed(2)}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Timeframe: {pred.timeframe}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Key Market Insights
        </h3>
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">
              Technology Sector Momentum
            </h4>
            <p className="text-blue-700">
              Strong positive sentiment in tech sector driven by AI and cloud
              computing trends. Volume of news articles increased by 25% this week.
            </p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-medium text-green-900 mb-2">
              Healthcare Innovation
            </h4>
            <p className="text-green-700">
              Growing interest in biotech and medical devices. Social media
              sentiment indicates strong investor confidence in healthcare
              startups.
            </p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg">
            <h4 className="font-medium text-yellow-900 mb-2">
              Energy Sector Transition
            </h4>
            <p className="text-yellow-700">
              Mixed sentiment in energy sector as traditional companies adapt to
              renewable energy trends. Watch for potential volatility.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AIInsights 