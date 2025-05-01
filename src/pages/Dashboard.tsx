
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getAnnouncements, getEvents, getPolls, getNotifications } from '@/lib/apiService';
import { Announcement, Event, Poll, Notification } from '@/lib/mockData';
import AnnouncementCard from '@/components/AnnouncementCard';
import EventCard from '@/components/EventCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Bell, Calendar, MessageSquare, BarChart } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [announcementsData, eventsData, notificationsData] = await Promise.all([
          getAnnouncements(),
          getEvents(),
          user ? getNotifications(user.id) : Promise.resolve([]),
        ]);
        
        setAnnouncements(announcementsData.slice(0, 3));
        setEvents(eventsData.slice(0, 2));
        setNotifications(notificationsData.filter(n => !n.isRead).slice(0, 5));
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  const userRoleText = {
    admin: 'Faculty Dashboard',
    moderator: 'Moderator Dashboard',
    student: 'Student Dashboard',
  }[user?.role || 'student'];

  const emergencyAnnouncements = announcements.filter(a => a.isEmergency);

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold mb-2">{userRoleText}</h1>
        <p className="text-college-600 dark:text-college-400">
          Welcome back, {user?.name}!
        </p>
      </div>
      
      {emergencyAnnouncements.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-red-600 dark:text-red-400">Emergency Alerts</h2>
          {emergencyAnnouncements.map((announcement) => (
            <Alert key={announcement.id} variant="destructive">
              <AlertTitle>{announcement.title}</AlertTitle>
              <AlertDescription>{announcement.content}</AlertDescription>
            </Alert>
          ))}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Recent Announcements */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center">
              <MessageSquare className="mr-2 h-4 w-4" />
              <CardTitle>Recent Announcements</CardTitle>
            </div>
            <CardDescription>Latest updates from your college</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {announcements.filter(a => !a.isEmergency).map((announcement) => (
              <AnnouncementCard key={announcement.id} announcement={announcement} />
            ))}
          </CardContent>
        </Card>
        
        {/* Upcoming Events */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              <CardTitle>Upcoming Events</CardTitle>
            </div>
            <CardDescription>Events happening soon</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </CardContent>
        </Card>
        
        {/* Notifications */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center">
              <Bell className="mr-2 h-4 w-4" />
              <CardTitle>Notifications</CardTitle>
            </div>
            <CardDescription>Your recent notifications</CardDescription>
          </CardHeader>
          <CardContent>
            {notifications.length > 0 ? (
              <ul className="space-y-3">
                {notifications.map((notification) => (
                  <li key={notification.id} className="flex items-start p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-800">
                    <div className="w-full">
                      <p className="font-medium">{notification.title}</p>
                      <p className="text-sm text-college-600 dark:text-college-400">{notification.content}</p>
                      <p className="text-xs text-college-500 dark:text-college-500 mt-1">
                        {new Date(notification.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-college-500 dark:text-college-400 py-6">No new notifications</p>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Action buttons based on role */}
      {user && (user.role === 'admin' || user.role === 'moderator') && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Management Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 flex flex-col items-center justify-center">
                <MessageSquare className="h-12 w-12 text-college-blue mb-4" />
                <p className="font-medium text-center">Create Announcement</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 flex flex-col items-center justify-center">
                <Calendar className="h-12 w-12 text-college-teal mb-4" />
                <p className="font-medium text-center">Create Event</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 flex flex-col items-center justify-center">
                <BarChart className="h-12 w-12 text-college-gold mb-4" />
                <p className="font-medium text-center">Create Poll</p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
