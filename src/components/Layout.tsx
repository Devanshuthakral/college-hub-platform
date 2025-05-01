
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
      <footer className="bg-white dark:bg-college-800 border-t py-6 mt-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold text-lg mb-3 text-college-blue dark:text-college-200">CollegeHub</h3>
              <p className="text-sm text-college-600 dark:text-college-300">
                Your central platform for college announcements, events, feedback, and more.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-3 text-college-blue dark:text-college-200">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="/dashboard" className="text-college-600 dark:text-college-300 hover:text-college-blue">Dashboard</a></li>
                <li><a href="/announcements" className="text-college-600 dark:text-college-300 hover:text-college-blue">Announcements</a></li>
                <li><a href="/events" className="text-college-600 dark:text-college-300 hover:text-college-blue">Events</a></li>
                <li><a href="/feedback" className="text-college-600 dark:text-college-300 hover:text-college-blue">Feedback</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-3 text-college-blue dark:text-college-200">Contact</h3>
              <p className="text-sm text-college-600 dark:text-college-300">
                Email: support@collegehub.edu<br />
                Phone: (555) 123-4567<br />
                Address: 123 Campus Drive
              </p>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-college-100 dark:border-college-700 text-center text-college-600 dark:text-college-300">
            <p>&copy; {new Date().getFullYear()} CollegeHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
