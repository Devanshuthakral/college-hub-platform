
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'moderator' | 'student';
  avatar?: string;
  department?: string;
  year?: number;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  createdBy: string;
  createdAt: string;
  department?: string;
  isEmergency: boolean;
  isUrgent: boolean;
  tags?: string[];
}

export interface Event {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  organizer: string;
  department?: string;
  rsvpCount: number;
  tags?: string[];
}

export interface Poll {
  id: string;
  question: string;
  options: {
    id: string;
    text: string;
    votes: number;
  }[];
  createdBy: string;
  createdAt: string;
  endDate: string;
  totalVotes: number;
}

export interface Feedback {
  id: string;
  title: string;
  content: string;
  createdBy: string | null; // null if anonymous
  createdAt: string;
  category: string;
  upvotes: number;
  downvotes: number;
  resolved: boolean;
}

export interface Notification {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  type: 'announcement' | 'event' | 'poll' | 'feedback';
  relatedId: string;
  isRead: boolean;
}

// Mock Users
export const users: User[] = [
  {
    id: '1',
    name: 'Prof. Sarah Johnson',
    email: 'sarah.johnson@college.edu',
    role: 'admin',
    avatar: '/placeholder.svg',
    department: 'Computer Science',
  },
  {
    id: '2',
    name: 'Alex Rodriguez',
    email: 'alex.rodriguez@college.edu',
    role: 'moderator',
    avatar: '/placeholder.svg',
    department: 'Student Council',
  },
  {
    id: '3',
    name: 'Jamie Smith',
    email: 'jamie.smith@college.edu',
    role: 'student',
    avatar: '/placeholder.svg',
    year: 2,
  },
];

// Mock Announcements
export const announcements: Announcement[] = [
  {
    id: '1',
    title: 'Campus Wi-Fi Maintenance',
    content: 'Wi-Fi services will be unavailable tonight from 2AM to 4AM due to critical infrastructure updates.',
    createdBy: '1',
    createdAt: '2025-04-28T10:30:00Z',
    department: 'IT Services',
    isEmergency: false,
    isUrgent: true,
    tags: ['maintenance', 'IT'],
  },
  {
    id: '2',
    title: 'EMERGENCY: Campus Closure Due to Weather',
    content: 'Due to expected severe weather conditions, all campus activities are cancelled tomorrow, May 2nd. Updates will be posted as available.',
    createdBy: '1',
    createdAt: '2025-05-01T08:15:00Z',
    isEmergency: true,
    isUrgent: true,
    tags: ['emergency', 'weather', 'closure'],
  },
  {
    id: '3',
    title: 'New Programming Club Session',
    content: 'Join us for a session on React and Python web development this Friday at the Tech Hub.',
    createdBy: '2',
    createdAt: '2025-04-29T14:45:00Z',
    department: 'Programming Club',
    isEmergency: false,
    isUrgent: false,
    tags: ['club', 'programming', 'event'],
  },
];

// Mock Events
export const events: Event[] = [
  {
    id: '1',
    title: 'Spring Career Fair',
    description: 'Annual career fair with representatives from over 50 companies. Bring your resume!',
    startDate: '2025-05-15T09:00:00Z',
    endDate: '2025-05-15T16:00:00Z',
    location: 'Main Campus Hall',
    organizer: 'Career Services',
    rsvpCount: 230,
    tags: ['career', 'networking'],
  },
  {
    id: '2',
    title: 'AI Workshop Series',
    description: 'Learn about the latest in artificial intelligence and machine learning in this 3-day workshop.',
    startDate: '2025-05-10T13:00:00Z',
    endDate: '2025-05-12T16:00:00Z',
    location: 'Tech Building, Room 305',
    organizer: 'CS Department',
    department: 'Computer Science',
    rsvpCount: 45,
    tags: ['workshop', 'AI', 'CS'],
  },
  {
    id: '3',
    title: 'Student Council Elections',
    description: 'Cast your vote for the next student council representatives.',
    startDate: '2025-05-20T08:00:00Z',
    endDate: '2025-05-20T18:00:00Z',
    location: 'Various Campus Locations',
    organizer: 'Student Affairs',
    rsvpCount: 0,
    tags: ['elections', 'student council'],
  },
];

// Mock Polls
export const polls: Poll[] = [
  {
    id: '1',
    question: 'What food options would you like to see added to the cafeteria?',
    options: [
      { id: 'a', text: 'More vegan options', votes: 145 },
      { id: 'b', text: 'International cuisine', votes: 210 },
      { id: 'c', text: 'Healthy snack bar', votes: 187 },
      { id: 'd', text: 'Late night options', votes: 230 },
    ],
    createdBy: '1',
    createdAt: '2025-04-25T12:00:00Z',
    endDate: '2025-05-10T23:59:59Z',
    totalVotes: 772,
  },
  {
    id: '2',
    question: 'Which programming workshop topic interests you most?',
    options: [
      { id: 'a', text: 'Web Development', votes: 87 },
      { id: 'b', text: 'Mobile App Development', votes: 65 },
      { id: 'c', text: 'Data Science', votes: 93 },
      { id: 'd', text: 'Game Development', votes: 72 },
    ],
    createdBy: '2',
    createdAt: '2025-04-27T09:30:00Z',
    endDate: '2025-05-05T23:59:59Z',
    totalVotes: 317,
  },
];

// Mock Feedback
export const feedbacks: Feedback[] = [
  {
    id: '1',
    title: 'Library Hours Extension Request',
    content: 'Could we extend library hours during finals week? Current hours are too limited.',
    createdBy: '3',
    createdAt: '2025-04-26T15:20:00Z',
    category: 'Facilities',
    upvotes: 56,
    downvotes: 3,
    resolved: false,
  },
  {
    id: '2',
    title: 'Wi-Fi Connectivity Issues in Dorm B',
    content: 'The Wi-Fi in Dorm B has been spotty for the past week, especially in the evenings.',
    createdBy: null, // Anonymous feedback
    createdAt: '2025-04-29T18:45:00Z',
    category: 'IT Services',
    upvotes: 32,
    downvotes: 0,
    resolved: true,
  },
];

// Mock Notifications
export const notifications: Notification[] = [
  {
    id: '1',
    title: 'New Announcement',
    content: 'Campus Wi-Fi Maintenance scheduled',
    createdAt: '2025-04-28T10:31:00Z',
    type: 'announcement',
    relatedId: '1',
    isRead: false,
  },
  {
    id: '2',
    title: 'Event Reminder',
    content: 'AI Workshop Series starts tomorrow',
    createdAt: '2025-05-09T09:00:00Z',
    type: 'event',
    relatedId: '2',
    isRead: true,
  },
  {
    id: '3',
    title: 'Urgent Alert',
    content: 'Campus closed tomorrow due to weather',
    createdAt: '2025-05-01T08:16:00Z',
    type: 'announcement',
    relatedId: '2',
    isRead: false,
  },
];
