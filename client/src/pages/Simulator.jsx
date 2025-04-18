import { useEffect, useState } from 'react'
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts'

const Simulator = () => {
  const [portfolio, setPortfolio] = useState({
    cash: 100000,
    stocks: [],
    totalValue: 100000,
  })
  const [selectedStock, setSelectedStock] = useState(null)
  const [order, setOrder] = useState({
    type: 'buy',
    quantity: 0,
  })
  const [leaderboard, setLeaderboard] = useState([])
  const [stockData, setStockData] = useState([])

  useEffect(() => {
    // Simulated stock data
    const data = [
      {
        symbol: 'AAPL',
        name: 'Apple Inc.',
        price: 150.25,
        change: 2.5,
        history: [
          { date: '2023-01', price: 130 },
          { date: '2023-02', price: 135 },
          { date: '2023-03', price: 140 },
          { date: '2023-04', price: 145 },
          { date: '2023-05', price: 150 },
          { date: '2023-06', price: 150.25 },
        ],
      },
      {
        symbol: 'MSFT',
        name: 'Microsoft Corporation',
        price: 280.75,
        change: -1.2,
        history: [
          { date: '2023-01', price: 270 },
          { date: '2023-02', price: 275 },
          { date: '2023-03', price: 280 },
          { date: '2023-04', price: 285 },
          { date: '2023-05', price: 282 },
          { date: '2023-06', price: 280.75 },
        ],
      },
      {
        symbol: 'GOOGL',
        name: 'Alphabet Inc.',
        price: 2750.00,
        change: 3.8,
        history: [
          { date: '2023-01', price: 2650 },
          { date: '2023-02', price: 2700 },
          { date: '2023-03', price: 2720 },
          { date: '2023-04', price: 2740 },
          { date: '2023-05', price: 2750 },
          { date: '2023-06', price: 2750 },
        ],
      },
    ]
    setStockData(data)

    // Simulated leaderboard data
    const leaders = [
      { name: 'John Doe', returns: 25.5, rank: 1 },
      { name: 'Jane Smith', returns: 22.3, rank: 2 },
      { name: 'Mike Johnson', returns: 20.1, rank: 3 },
      { name: 'Sarah Wilson', returns: 18.7, rank: 4 },
      { name: 'David Brown', returns: 17.2, rank: 5 },
    ]
    setLeaderboard(leaders)
  }, [])

  const handleOrder = () => {
    if (!selectedStock || order.quantity <= 0) return

    const stock = stockData.find((s) => s.symbol === selectedStock)
    const cost = stock.price * order.quantity

    if (order.type === 'buy' && cost > portfolio.cash) {
      alert('Insufficient funds')
      return
    }

    const newPortfolio = { ...portfolio }
    if (order.type === 'buy') {
      newPortfolio.cash -= cost
      const existingStock = newPortfolio.stocks.find(
        (s) => s.symbol === selectedStock
      )
      if (existingStock) {
        existingStock.quantity += order.quantity
      } else {
        newPortfolio.stocks.push({
          symbol: selectedStock,
          quantity: order.quantity,
          avgPrice: stock.price,
        })
      }
    } else {
      const existingStock = newPortfolio.stocks.find(
        (s) => s.symbol === selectedStock
      )
      if (!existingStock || existingStock.quantity < order.quantity) {
        alert('Insufficient shares')
        return
      }
      newPortfolio.cash += cost
      existingStock.quantity -= order.quantity
      if (existingStock.quantity === 0) {
        newPortfolio.stocks = newPortfolio.stocks.filter(
          (s) => s.symbol !== selectedStock
        )
      }
    }

    // Update total value
    newPortfolio.totalValue =
      newPortfolio.cash +
      newPortfolio.stocks.reduce(
        (total, stock) =>
          total +
          stock.quantity *
            stockData.find((s) => s.symbol === stock.symbol).price,
        0
      )

    setPortfolio(newPortfolio)
    setOrder({ type: 'buy', quantity: 0 })
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Virtual Trading Simulator
        </h1>
        <p className="text-gray-600">
          Practice trading with virtual money and compete on the leaderboard
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Portfolio Overview
            </h3>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Cash Balance</p>
                <p className="text-xl font-semibold text-gray-900">
                  ${portfolio.cash.toLocaleString()}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Stock Value</p>
                <p className="text-xl font-semibold text-gray-900">
                  $
                  {(
                    portfolio.totalValue - portfolio.cash
                  ).toLocaleString()}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Total Value</p>
                <p className="text-xl font-semibold text-gray-900">
                  ${portfolio.totalValue.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {portfolio.stocks.map((stock) => {
                const currentStock = stockData.find(
                  (s) => s.symbol === stock.symbol
                )
                return (
                  <div
                    key={stock.symbol}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {stock.symbol}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {currentStock?.name}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">
                        {stock.quantity} shares
                      </p>
                      <p className="text-sm text-gray-500">
                        Avg: ${stock.avgPrice.toFixed(2)}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Place Order
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Stock
                </label>
                <select
                  value={selectedStock || ''}
                  onChange={(e) => setSelectedStock(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select a stock</option>
                  {stockData.map((stock) => (
                    <option key={stock.symbol} value={stock.symbol}>
                      {stock.symbol} - {stock.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Order Type
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="buy"
                      checked={order.type === 'buy'}
                      onChange={(e) =>
                        setOrder({ ...order, type: e.target.value })
                      }
                      className="mr-2"
                    />
                    Buy
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="sell"
                      checked={order.type === 'sell'}
                      onChange={(e) =>
                        setOrder({ ...order, type: e.target.value })
                      }
                      className="mr-2"
                    />
                    Sell
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  min="1"
                  value={order.quantity}
                  onChange={(e) =>
                    setOrder({ ...order, quantity: parseInt(e.target.value) })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

              <button
                onClick={handleOrder}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Leaderboard
            </h3>
            <div className="space-y-4">
              {leaderboard.map((player) => (
                <div
                  key={player.rank}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center">
                    <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold">
                      {player.rank}
                    </span>
                    <span className="ml-3 font-medium text-gray-900">
                      {player.name}
                    </span>
                  </div>
                  <span className="text-green-600 font-semibold">
                    +{player.returns}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {selectedStock && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Stock Chart
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={
                      stockData.find((s) => s.symbol === selectedStock)?.history
                    }
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="price"
                      stroke="#2563eb"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Simulator 