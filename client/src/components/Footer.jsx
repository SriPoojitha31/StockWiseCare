const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">StockWiseCare</h3>
            <p className="text-gray-300">
              Your AI-Powered Investment and Charity Platform
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-300 hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="/portfolio" className="text-gray-300 hover:text-white">
                  Portfolio
                </a>
              </li>
              <li>
                <a href="/charity" className="text-gray-300 hover:text-white">
                  Charity
                </a>
              </li>
              <li>
                <a href="/chatbot" className="text-gray-300 hover:text-white">
                  Chatbot
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <p className="text-gray-300">
              Email: support@stockwisecare.com
              <br />
              Phone: +1 (555) 123-4567
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} StockWiseCare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer 