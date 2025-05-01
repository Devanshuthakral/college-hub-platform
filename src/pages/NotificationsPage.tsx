
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, Check, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';

interface Notification {
  id: string;
  title: string;
  content: string;
  date: string;
  type: 'announcement' | 'event' | 'poll' | 'feedback' | 'system';
  isRead: boolean;
  link?: string;
}

// Mock notifications
const mockNotifications: Notification[] = [
  {
    id: "notif1",
    title: "New Announcement: Campus Closure",
    content: "The campus will be closed on May 15 for maintenance.",
    date: "2025-05-01T09:30:00Z",
    type: "announcement",
    isRead: false,
    link: "/announcements"
  },
  {
    id: "notif2",
    title: "Event Reminder: Spring Festival",
    content: "Don't forget! The Spring Festival starts tomorrow at 2 PM in the main quad.",
    date: "2025-04-30T14:15:00Z",
    type: "event",
    isRead: true,
    link: "/events"
  },
  {
    id: "notif3",
    title: "New Poll Available: Course Feedback",
    content: "Please participate in the new poll about course satisfaction.",
    date: "2025-04-28T11:00:00Z",
    type: "poll",
    isRead: false,
    link: "/polls"
  },
  {
    id: "notif4",
    title: "Your Feedback Update",
    content: "Your feedback about library hours has been marked as 'Under Review'.",
    date: "2025-04-27T16:45:00Z",
    type: "feedback",
    isRead: false,
    link: "/feedback"
  }
];

const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [notificationSettings, setNotificationSettings] = useState({
    announcements: true,
    events: true,
    polls: true,
    feedback: true,
    system: true,
    emailNotifications: false,
    pushNotifications: true
  });
  const { user } = useAuth();

  const handleMarkAsRead = (id: string) => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => 
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
  };

  const handleDeleteNotification = (id: string) => {
    setNotifications(prevNotifications => 
      prevNotifications.filter(notification => notification.id !== id)
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const handleToggleSetting = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  // Function to get appropriate badge color based on notification type
  const getTypeBadge = (type: Notification['type']) => {
    switch (type) {
      case 'announcement':
        return <Badge variant="default">Announcement</Badge>;
      case 'event':
        return <Badge variant="secondary">Event</Badge>;
      case 'poll':
        return <Badge className="bg-purple-500">Poll</Badge>;
      case 'feedback':
        return <Badge className="bg-emerald-500">Feedback</Badge>;
      case 'system':
        return <Badge variant="outline">System</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Bell className="h-6 w-6 mr-2 text-college-blue" />
          <h1 className="text-3xl font-bold">Notifications</h1>
          {unreadCount > 0 && (
            <Badge className="ml-2 bg-college-red">{unreadCount} unread</Badge>
          )}
        </div>
        {notifications.length > 0 && (
          <Button variant="outline" onClick={handleMarkAllAsRead}>
            Mark all as read
          </Button>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="space-y-4 md:col-span-2">
          <h2 className="text-xl font-semibold">Recent Notifications</h2>
          
          {notifications.length > 0 ? (
            <div className="space-y-4">
              {notifications.map(notification => (
                <Card 
                  key={notification.id} 
                  className={notification.isRead ? "opacity-70" : ""}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <div>
                        <CardTitle className="text-base font-medium">
                          {notification.title}
                          {!notification.isRead && (
                            <span className="ml-2 inline-block w-2 h-2 bg-blue-500 rounded-full"></span>
                          )}
                        </CardTitle>
                        <p className="text-xs text-muted-foreground">
                          {new Date(notification.date).toLocaleString()}
                        </p>
                      </div>
                      {getTypeBadge(notification.type)}
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm">{notification.content}</p>
                  </CardContent>
                  <div className="px-6 pb-4 flex justify-between">
                    {notification.link && (
                      <Button variant="link" size="sm" className="p-0" asChild>
                        <a href={notification.link}>View details</a>
                      </Button>
                    )}
                    <div className="space-x-2">
                      {!notification.isRead && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleMarkAsRead(notification.id)}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                      )}
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDeleteNotification(notification.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center p-8 border rounded-lg bg-gray-50 dark:bg-gray-800/50">
              <Bell className="h-12 w-12 mx-auto text-gray-400 mb-2" />
              <h3 className="text-lg font-medium">No notifications</h3>
              <p className="text-muted-foreground">You're all caught up!</p>
            </div>
          )}
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Notification Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <h3 className="font-medium">Notification Types</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="announcements">Announcements</Label>
                    <Switch 
                      id="announcements" 
                      checked={notificationSettings.announcements} 
                      onCheckedChange={() => handleToggleSetting('announcements')}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="events">Events</Label>
                    <Switch 
                      id="events" 
                      checked={notificationSettings.events} 
                      onCheckedChange={() => handleToggleSetting('events')}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="polls">Polls</Label>
                    <Switch 
                      id="polls" 
                      checked={notificationSettings.polls} 
                      onCheckedChange={() => handleToggleSetting('polls')}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="feedback">Feedback Updates</Label>
                    <Switch 
                      id="feedback" 
                      checked={notificationSettings.feedback} 
                      onCheckedChange={() => handleToggleSetting('feedback')}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="system">System Messages</Label>
                    <Switch 
                      id="system" 
                      checked={notificationSettings.system} 
                      onCheckedChange={() => handleToggleSetting('system')}
                    />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <h3 className="font-medium">Delivery Settings</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email">Email Notifications</Label>
                    <Switch 
                      id="email" 
                      checked={notificationSettings.emailNotifications} 
                      onCheckedChange={() => handleToggleSetting('emailNotifications')}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="push">Push Notifications</Label>
                    <Switch 
                      id="push" 
                      checked={notificationSettings.pushNotifications} 
                      onCheckedChange={() => handleToggleSetting('pushNotifications')}
                    />
                  </div>
                </div>
              </div>
              
              <Button className="w-full">Save Settings</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
