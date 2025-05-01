
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/components/Header';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-college-50 dark:bg-college-900">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <footer className="bg-white dark:bg-college-800 border-t py-6">
        <div className="container mx-auto px-4 text-center text-college-600 dark:text-college-300">
          <p>&copy; {new Date().getFullYear()} CollegeHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
