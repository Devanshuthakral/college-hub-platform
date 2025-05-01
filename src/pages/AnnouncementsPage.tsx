
import React, { useState, useEffect } from 'react';
import { getAnnouncements } from '@/lib/apiService';
import { Announcement } from '@/lib/mockData';
import AnnouncementCard from '@/components/AnnouncementCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Plus } from 'lucide-react';

const AnnouncementsPage: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [filteredAnnouncements, setFilteredAnnouncements] = useState<Announcement[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const data = await getAnnouncements();
        setAnnouncements(data);
        setFilteredAnnouncements(data);
      } catch (error) {
        console.error('Error fetching announcements:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  useEffect(() => {
    let filtered = [...announcements];
    
    // Apply filter
    if (filter === 'emergency') {
      filtered = filtered.filter(a => a.isEmergency);
    } else if (filter === 'urgent') {
      filtered = filtered.filter(a => a.isUrgent && !a.isEmergency);
    } else if (filter === 'normal') {
      filtered = filtered.filter(a => !a.isUrgent && !a.isEmergency);
    }
    
    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        a => a.title.toLowerCase().includes(query) || 
             a.content.toLowerCase().includes(query) ||
             (a.department && a.department.toLowerCase().includes(query)) ||
             (a.tags && a.tags.some(tag => tag.toLowerCase().includes(query)))
      );
    }
    
    setFilteredAnnouncements(filtered);
  }, [searchQuery, filter, announcements]);

  if (isLoading) {
    return <div className="text-center py-10">Loading announcements...</div>;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Announcements</h1>
        {(user?.role === 'admin' || user?.role === 'moderator') && (
          <Button>
            <Plus className="mr-2 h-4 w-4" /> New Announcement
          </Button>
        )}
      </div>
      
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search announcements..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select
          value={filter}
          onValueChange={setFilter}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Announcements</SelectItem>
            <SelectItem value="emergency">Emergency Only</SelectItem>
            <SelectItem value="urgent">Urgent Only</SelectItem>
            <SelectItem value="normal">Regular Only</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {/* Emergency Announcements */}
      {filteredAnnouncements.some(a => a.isEmergency) && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-red-600 dark:text-red-400">Emergency Alerts</h2>
          {filteredAnnouncements
            .filter(a => a.isEmergency)
            .map(announcement => (
              <AnnouncementCard key={announcement.id} announcement={announcement} />
            ))
          }
        </div>
      )}
      
      {/* Regular Announcements */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">All Announcements</h2>
        {filteredAnnouncements.length > 0 ? (
          filteredAnnouncements
            .filter(a => !a.isEmergency)
            .map(announcement => (
              <AnnouncementCard key={announcement.id} announcement={announcement} />
            ))
        ) : (
          <div className="text-center py-10 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <p className="text-gray-500 dark:text-gray-400">No announcements found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnnouncementsPage;
