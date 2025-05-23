import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { BellRingIcon as RingIcon, ChevronLeft, LayoutDashboard, User, Palette, Smartphone, Settings, LogOut, Menu, X, Link as LinkIcon } from 'lucide-react';
import Footer from './Footer';
import Navbar from './Navbar';

// Dashboard sidebar navigation item
const NavItem = ({ to, icon, label, onClick }: { to: string; icon: React.ReactNode; label: string; onClick?: () => void }) => {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
          isActive
            ? 'bg-dark-800 text-primary-400'
            : 'text-gray-300 hover:bg-dark-800/50'
        }`
      }
      end={to === '/dashboard'}
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
};

const DashboardLayout: React.FC = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Logout handler
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-dark-900 text-white">
      <Navbar />
      
      <div className="flex pt-16">
        {/* Sidebar */}
        <motion.aside
          initial={false}
          animate={{ width: isSidebarOpen ? '16rem' : '0' }}
          className={`fixed inset-y-0 left-0 z-20 bg-dark-900 border-r border-dark-700 pt-16 transition-all duration-300 ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full">
            {/* User info */}
            <div className="p-4 border-b border-dark-700">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-dark-800 text-primary-400 rounded-full flex items-center justify-center">
                  {user?.name?.charAt(0) || user?.username?.charAt(0) || 'U'}
                </div>
                <div>
                  <p className="font-medium text-white">{user?.name || user?.username}</p>
                  <p className="text-xs text-gray-400">{user?.email}</p>
                </div>
              </div>
            </div>

            {/* Navigation items */}
            <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
              <NavItem
                to="/dashboard"
                icon={<LayoutDashboard size={20} />}
                label="Dashboard"
              />
              <NavItem
                to="/dashboard/profile"
                icon={<User size={20} />}
                label="Edit Profile"
              />
              <NavItem
                to="/dashboard/alte-link"
                icon={<LinkIcon size={20} />}
                label="Alté Link"
              />
              <NavItem
                to="/dashboard/style"
                icon={<Palette size={20} />}
                label="Customize Style"
              />
              <NavItem
                to="/dashboard/nfc-write"
                icon={<Smartphone size={20} />}
                label="Write to Ring"
              />
              <NavItem
                to="/dashboard/settings"
                icon={<Settings size={20} />}
                label="Settings"
              />
            </nav>

            {/* Logout button */}
            <div className="p-4 border-t border-dark-700">
              <button
                onClick={handleLogout}
                className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-gray-300 hover:bg-dark-800/50 transition-colors"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </motion.aside>

        {/* Toggle button */}
        <button
          onClick={toggleSidebar}
          className="fixed left-4 bottom-4 z-30 bg-dark-800 text-white p-2 rounded-full shadow-lg hover:bg-dark-700 transition-colors"
        >
          {isSidebarOpen ? <ChevronLeft size={24} /> : <Menu size={24} />}
        </button>

        {/* Main content */}
        <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
          <div className="container max-w-6xl mx-auto px-4 py-8">
            <Outlet />
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;