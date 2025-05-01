
import {
  users,
  announcements,
  events,
  polls,
  feedbacks,
  notifications,
  User,
  Announcement,
  Event,
  Poll,
  Feedback,
  Notification
} from './mockData';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Authentication
export const login = async (email: string, password: string): Promise<{ user: User; token: string } | null> => {
  await delay(800);
  const user = users.find(u => u.email === email);
  
  if (user) {
    // In a real app, you would verify the password here
    // This is just a mock that succeeds with any password
    return {
      user,
      token: `mock-jwt-token-${user.id}`
    };
  }
  return null;
};

export const getCurrentUser = async (token: string): Promise<User | null> => {
  await delay(300);
  // In a real app, you would decode the JWT token
  // This is just a mock that extracts the user ID
  const userId = token.split('-').pop();
  return users.find(u => u.id === userId) || null;
};

// Announcements
export const getAnnouncements = async (): Promise<Announcement[]> => {
  await delay(500);
  return [...announcements].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
};

export const createAnnouncement = async (announcement: Omit<Announcement, 'id' | 'createdAt'>): Promise<Announcement> => {
  await delay(600);
  const newAnnouncement: Announcement = {
    ...announcement,
    id: `${announcements.length + 1}`,
    createdAt: new Date().toISOString()
  };
  announcements.unshift(newAnnouncement);
  return newAnnouncement;
};

// Events
export const getEvents = async (): Promise<Event[]> => {
  await delay(500);
  return [...events].sort((a, b) => 
    new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );
};

export const createEvent = async (event: Omit<Event, 'id'>): Promise<Event> => {
  await delay(600);
  const newEvent: Event = {
    ...event,
    id: `${events.length + 1}`
  };
  events.push(newEvent);
  return newEvent;
};

export const rsvpToEvent = async (eventId: string, userId: string): Promise<Event> => {
  await delay(300);
  const event = events.find(e => e.id === eventId);
  if (!event) {
    throw new Error('Event not found');
  }
  event.rsvpCount += 1;
  return event;
};

// Polls
export const getPolls = async (): Promise<Poll[]> => {
  await delay(500);
  return [...polls].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
};

export const createPoll = async (poll: Omit<Poll, 'id' | 'createdAt' | 'totalVotes'>): Promise<Poll> => {
  await delay(600);
  const newPoll: Poll = {
    ...poll,
    id: `${polls.length + 1}`,
    createdAt: new Date().toISOString(),
    totalVotes: 0
  };
  polls.push(newPoll);
  return newPoll;
};

export const votePoll = async (pollId: string, optionId: string): Promise<Poll> => {
  await delay(300);
  const poll = polls.find(p => p.id === pollId);
  if (!poll) {
    throw new Error('Poll not found');
  }
  const option = poll.options.find(o => o.id === optionId);
  if (!option) {
    throw new Error('Option not found');
  }
  option.votes += 1;
  poll.totalVotes += 1;
  return poll;
};

// Feedback
export const getFeedback = async (): Promise<Feedback[]> => {
  await delay(500);
  return [...feedbacks].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
};

export const createFeedback = async (feedback: Omit<Feedback, 'id' | 'createdAt' | 'upvotes' | 'downvotes' | 'resolved'>): Promise<Feedback> => {
  await delay(600);
  const newFeedback: Feedback = {
    ...feedback,
    id: `${feedbacks.length + 1}`,
    createdAt: new Date().toISOString(),
    upvotes: 0,
    downvotes: 0,
    resolved: false
  };
  feedbacks.push(newFeedback);
  return newFeedback;
};

export const voteFeedback = async (feedbackId: string, vote: 'up' | 'down'): Promise<Feedback> => {
  await delay(300);
  const feedback = feedbacks.find(f => f.id === feedbackId);
  if (!feedback) {
    throw new Error('Feedback not found');
  }
  if (vote === 'up') {
    feedback.upvotes += 1;
  } else {
    feedback.downvotes += 1;
  }
  return feedback;
};

export const resolveFeedback = async (feedbackId: string): Promise<Feedback> => {
  await delay(300);
  const feedback = feedbacks.find(f => f.id === feedbackId);
  if (!feedback) {
    throw new Error('Feedback not found');
  }
  feedback.resolved = true;
  return feedback;
};

// Notifications
export const getNotifications = async (userId: string): Promise<Notification[]> => {
  await delay(400);
  return [...notifications].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
};

export const markNotificationAsRead = async (notificationId: string): Promise<Notification> => {
  await delay(200);
  const notification = notifications.find(n => n.id === notificationId);
  if (!notification) {
    throw new Error('Notification not found');
  }
  notification.isRead = true;
  return notification;
};
