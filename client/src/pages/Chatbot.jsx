import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChatHistory, sendMessage } from '../features/chatbot/chatbotSlice';

const Chatbot = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.chatbot);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await dispatch(fetchChatHistory()).unwrap();
        setChatHistory(response);
      } catch (err) {
        console.error('Failed to fetch chat history:', err);
      }
    };
    fetchHistory();
  }, [dispatch]);

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage = {
      message: message.trim(),
      isUser: true,
      timestamp: new Date().toISOString()
    };

    setChatHistory(prev => [...prev, userMessage]);
    setMessage('');

    try {
      const response = await dispatch(sendMessage(message)).unwrap();
      const botMessage = {
        message: response.message || "I'm sorry, I couldn't process that request.",
        isUser: false,
        timestamp: new Date().toISOString()
      };
      setChatHistory(prev => [...prev, botMessage]);
    } catch (err) {
      console.error('Failed to send message:', err);
      const errorMessage = {
        message: "Sorry, I'm having trouble connecting right now. Please try again later.",
        isUser: false,
        timestamp: new Date().toISOString()
      };
      setChatHistory(prev => [...prev, errorMessage]);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto">
      <div className="bg-indigo-600 text-white p-4 rounded-t-lg">
        <h1 className="text-xl font-bold">WebTracker Assistant</h1>
        <p className="text-sm opacity-80">Ask me anything about your portfolio and investments</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {chatHistory.length === 0 ? (
          <div className="flex justify-center items-center h-full">
            <div className="text-center text-gray-500">
              <p className="text-lg font-medium">Welcome to WebTracker Assistant!</p>
              <p className="mt-2">I can help you with:</p>
              <ul className="mt-2 text-left list-disc list-inside">
                <li>Portfolio analysis and recommendations</li>
                <li>Market trends and insights</li>
                <li>Investment strategies</li>
                <li>Charity integration options</li>
              </ul>
              <p className="mt-4">How can I assist you today?</p>
            </div>
          </div>
        ) : (
          chatHistory.map((chat, index) => (
            <div
              key={index}
              className={`flex ${chat.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  chat.isUser
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-900 shadow'
                }`}
              >
                <p>{chat.message}</p>
                <p className="text-xs opacity-70 mt-1">
                  {new Date(chat.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSubmit} className="p-4 border-t bg-white">
        <div className="flex space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              'Send'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chatbot; 