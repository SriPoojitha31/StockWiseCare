import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import NotificationCenter from '../pages/NotificationCenter';
import FloatingChatbot from './FloatingChatbot';
import Sidebar from './Sidebar';

const Layout = () => {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            <div key={location.pathname}>
              <Outlet />
            </div>
          </div>
        </main>
      </div>
      <NotificationCenter />
      <FloatingChatbot />
    </div>
  );
};

export default Layout; 