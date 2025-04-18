import { useEffect, useState } from 'react'
import {
    PolarAngleAxis,
    PolarGrid,
    PolarRadiusAxis,
    Radar,
    RadarChart,
    ResponsiveContainer,
} from 'recharts'

const Charity = () => {
  const [biasData, setBiasData] = useState([])
  const [tradingHistory, setTradingHistory] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulated bias data
    const data = [
      {
        bias: 'FOMO',
        score: 65,
        description:
          'Fear of Missing Out - Tendency to make impulsive decisions based on market hype',
      },
      {
        bias: 'Loss Aversion',
        score: 45,
        description:
          'Tendency to prefer avoiding losses over acquiring equivalent gains',
      },
      {
        bias: 'Confirmation',
        score: 70,
        description:
          'Seeking information that confirms pre-existing beliefs',
      },
      {
        bias: 'Anchoring',
        score: 55,
        description:
          'Relying too heavily on the first piece of information encountered',
      },
      {
        bias: 'Overconfidence',
        score: 60,
        description:
          'Overestimating the accuracy of one\'s predictions and knowledge',
      },
      {
        bias: 'Recency',
        score: 75,
        description:
          'Giving more weight to recent events over historical data',
      },
    ]
    setBiasData(data)

    // Simulated trading history
    const history = [
      {
        date: '2023-06-15',
        action: 'Buy',
        stock: 'AAPL',
        quantity: 10,
        price: 150.25,
        reason: 'Market momentum',
        bias: 'FOMO',
      },
      {
        date: '2023-06-10',
        action: 'Sell',
        stock: 'MSFT',
        quantity: 5,
        price: 280.75,
        reason: 'Taking profits',
        bias: 'Loss Aversion',
      },
      {
        date: '2023-06-05',
        action: 'Buy',
        stock: 'GOOGL',
        quantity: 2,
        price: 2750.00,
        reason: 'Technical analysis',
        bias: 'Confirmation',
      },
    ]
    setTradingHistory(history)
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
        <h1 className="text-3xl font-bold text-gray-900">Investor IQ Dashboard</h1>
        <p className="text-gray-600">
          Track and improve your cognitive biases in trading decisions
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Cognitive Bias Analysis
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={biasData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="bias" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar
                  name="Bias Score"
                  dataKey="score"
                  stroke="#2563eb"
                  fill="#2563eb"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Bias Descriptions
          </h3>
          <div className="space-y-4">
            {biasData.map((bias) => (
              <div
                key={bias.bias}
                className="p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-gray-900">{bias.bias}</h4>
                  <span
                    className={`px-2 py-1 rounded text-sm font-medium ${
                      bias.score >= 70
                        ? 'bg-red-100 text-red-800'
                        : bias.score >= 50
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    Score: {bias.score}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{bias.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Trading History with Bias Analysis
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reason
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Detected Bias
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tradingHistory.map((trade, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {trade.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        trade.action === 'Buy'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {trade.action}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {trade.stock}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {trade.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${trade.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {trade.reason}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      {trade.bias}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Charity 