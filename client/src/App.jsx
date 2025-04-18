import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Pages
import AIInsights from './pages/AIInsights';
import Chatbot from './pages/Chatbot';
import ChatHistory from './pages/ChatHistory';
import ForgotPassword from './pages/ForgotPassword';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';
import Simulator from './pages/Simulator';
import Profile from './pages/Profile';
import Notifications from './pages/Notifications';
import Workflow from './pages/Workflow';
import Charity from './pages/Charity';
import Files from './pages/Files';
import Leaderboard from './pages/Leaderboard';
import Help from './pages/Help';
import Settings from './pages/Settings';

// Components
import Layout from './components/Layout';
import { DashboardSidebar } from './components/DashboardSidebar';

// Home component for dashboard index
const Home = () => <div className="p-6 bg-white rounded-lg shadow-md">
  <h1 className="text-2xl font-bold mb-4">Welcome to StockWiseCare Dashboard</h1>
  <p className="text-gray-600">Your financial insights and portfolio management center.</p>
</div>;

const App = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-gray-100">
      <ToastContainer position="top-right" autoClose={5000} />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/dashboard" />} />
        <Route path="/forgot-password" element={!isAuthenticated ? <ForgotPassword /> : <Navigate to="/dashboard" />} />
        <Route path="/reset-password/:token" element={!isAuthenticated ? <ResetPassword /> : <Navigate to="/dashboard" />} />

        {/* Protected routes with DashboardSidebar */}
        <Route path="/dashboard" element={isAuthenticated ? <Layout sidebar={<DashboardSidebar />} /> : <Navigate to="/login" />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="workflow" element={<Workflow />} />
          <Route path="ai-settings" element={<AIInsights />} />
          <Route path="charity" element={<Charity />} />
          <Route path="files" element={<Files />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          <Route path="help" element={<Help />} />
          <Route path="settings" element={<Settings />} />
          
          {/* Original routes */}
          <Route path="ai-insights" element={<AIInsights />} />
          <Route path="simulator" element={<Simulator />} />
          <Route path="chatbot" element={<Chatbot />} />
          <Route path="chat-history" element={<ChatHistory />} />
        </Route>

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;