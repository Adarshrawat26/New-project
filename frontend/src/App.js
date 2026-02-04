/**
 * Main Application Component
 * Root component with navigation and routing
 */
import { useState } from 'react';
import {
  AttendanceTrackerPage,
  DashboardPage,
  EmployeeListPage,
} from './pages/index.js';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'employees':
        return <EmployeeListPage />;
      case 'attendance':
        return <AttendanceTrackerPage />;
      default:
        return <DashboardPage />;
    }
  };

  const navItems = [
    { 
      id: 'dashboard', 
      label: 'Dashboard',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5">
          <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
          <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        </svg>
      )
    },
    { 
      id: 'employees', 
      label: 'Employees',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5">
          <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
          <rect width="20" height="14" x="2" y="6" rx="2"></rect>
        </svg>
      )
    },
    { 
      id: 'attendance', 
      label: 'Attendance',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5">
          <path d="M8 2v4"></path>
          <path d="M16 2v4"></path>
          <rect width="18" height="18" x="3" y="4" rx="2"></rect>
          <path d="M3 10h18"></path>
        </svg>
      )
    },
  ];

  return (
    <div className="flex h-screen">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-white text-gray-900 border-r border-gray-200">
        {/* Header */}
        <div className="px-6 py-6">
          <h1 className="text-xl font-bold tracking-tight text-gray-900">HRMS</h1>
          <p className="text-sm text-gray-500 mt-1 font-light">Management System</p>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1 px-3 space-y-1 flex-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                currentPage === item.id
                  ? 'bg-[#E94B35] text-white'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setCurrentPage(item.id)}
              title={item.label}
            >
              {item.icon}
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-6 py-6 border-t border-gray-200">
          <p className="text-xs text-gray-500">Version 1.0.0</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col lg:h-auto">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white text-gray-900 px-4 py-4 flex justify-between items-center border-b border-gray-200 shadow-sm">
          <div>
            <h1 className="text-lg font-bold tracking-tight">HRMS</h1>
            <p className="text-xs text-gray-500">Management System</p>
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-gray-700 hover:text-[#E85D31] transition-colors font-bold text-lg"
          >
            Menu
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-gray-200 shadow-md">
            <nav className="flex flex-col gap-2 p-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    currentPage === item.id
                      ? 'bg-[#E94B35] text-white'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => {
                    setCurrentPage(item.id);
                    setMobileMenuOpen(false);
                  }}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        )}

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto">
          {renderPage()}
        </div>
      </main>
    </div>
  );
}

export default App;
