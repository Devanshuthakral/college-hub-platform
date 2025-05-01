
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, User, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <header className="bg-white dark:bg-college-900 shadow-sm border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-xl font-bold text-college-blue dark:text-white">
            College<span className="text-college-teal">Hub</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4">
          {user && (
            <>
              <Link to="/announcements" className="text-college-700 dark:text-college-200 hover:text-college-blue hover:dark:text-white transition">
                Announcements
              </Link>
              <Link to="/events" className="text-college-700 dark:text-college-200 hover:text-college-blue hover:dark:text-white transition">
                Events
              </Link>
              <Link to="/polls" className="text-college-700 dark:text-college-200 hover:text-college-blue hover:dark:text-white transition">
                Polls
              </Link>
              <Link to="/feedback" className="text-college-700 dark:text-college-200 hover:text-college-blue hover:dark:text-white transition">
                Feedback
              </Link>
              {/* Notification Button */}
              <Button variant="ghost" size="icon" asChild>
                <Link to="/notifications">
                  <Bell className="h-5 w-5" />
                </Link>
              </Button>
              
              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={logout}
                    className="text-red-500 cursor-pointer"
                  >
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
          
          {!user && (
            <Button asChild variant="default">
              <Link to="/login">Log in</Link>
            </Button>
          )}
        </nav>
        
        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-college-900 py-4 px-4 shadow-lg">
          <nav className="flex flex-col space-y-4">
            {user && (
              <>
                <Link 
                  to="/announcements" 
                  className="text-college-700 dark:text-college-200 hover:text-college-blue hover:dark:text-white transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Announcements
                </Link>
                <Link 
                  to="/events" 
                  className="text-college-700 dark:text-college-200 hover:text-college-blue hover:dark:text-white transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Events
                </Link>
                <Link 
                  to="/polls" 
                  className="text-college-700 dark:text-college-200 hover:text-college-blue hover:dark:text-white transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Polls
                </Link>
                <Link 
                  to="/feedback" 
                  className="text-college-700 dark:text-college-200 hover:text-college-blue hover:dark:text-white transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Feedback
                </Link>
                <Link 
                  to="/notifications" 
                  className="text-college-700 dark:text-college-200 hover:text-college-blue hover:dark:text-white transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Notifications
                </Link>
                <Link 
                  to="/profile" 
                  className="text-college-700 dark:text-college-200 hover:text-college-blue hover:dark:text-white transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Profile
                </Link>
                <Link 
                  to="/dashboard" 
                  className="text-college-700 dark:text-college-200 hover:text-college-blue hover:dark:text-white transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Button 
                  variant="ghost" 
                  className="justify-start p-0 hover:bg-transparent text-red-500"
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                >
                  Log out
                </Button>
              </>
            )}
            
            {!user && (
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full">Log in</Button>
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
