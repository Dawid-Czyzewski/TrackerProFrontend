import React, { useState } from 'react';
import { User } from '../types';
import LanguageSwitcher from './LanguageSwitcher';
import Sidebar from './layout/Sidebar';
import MobileHeader from './layout/MobileHeader';

interface LayoutProps {
  children: React.ReactNode;
  user: User;
}

const Layout: React.FC<LayoutProps> = ({ children, user }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-black">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 xl:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`fixed xl:static inset-y-0 left-0 z-50 w-64 bg-gray-900 border-r border-gray-800 flex flex-col transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full xl:translate-x-0'
      }`}>
        <Sidebar user={user} onClose={() => setSidebarOpen(false)} />
      </aside>

      <main className="flex-1 overflow-y-auto bg-black p-4 sm:p-6 md:p-8 relative">
        <MobileHeader onMenuClick={() => setSidebarOpen(true)} />

        <div className="hidden xl:block absolute top-4 sm:top-6 md:top-8 right-4 sm:right-6 md:right-8">
          <LanguageSwitcher />
        </div>
        {children}
      </main>
    </div>
  );
};

export default Layout;
