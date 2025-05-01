
import React from 'react';
import { format } from 'date-fns';
import { Event } from '@/lib/mockData';
import { Calendar, MapPin, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { rsvpToEvent } from '@/lib/apiService';
import { useAuth } from '@/contexts/AuthContext';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const { title, description, startDate, endDate, location, organizer, rsvpCount, tags } = event;
  const { toast } = useToast();
  const { user } = useAuth();
  
  // Format date
  const formattedStartDate = format(new Date(startDate), 'PPP');
  const formattedStartTime = format(new Date(startDate), 'h:mm a');
  const formattedEndTime = format(new Date(endDate), 'h:mm a');
  const isMultiDay = format(new Date(startDate), 'yyyy-MM-dd') !== format(new Date(endDate), 'yyyy-MM-dd');
  
  const handleRSVP = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to RSVP for events.",
        variant: "destructive",
      });
      return;
    }

    try {
      await rsvpToEvent(event.id, user.id);
      toast({
        title: "RSVP Successful",
        description: "You've successfully registered for this event.",
      });
    } catch (error) {
      toast({
        title: "RSVP Failed",
        description: "There was a problem with your RSVP. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="mb-4 card-hover">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg">{title}</CardTitle>
          {organizer && (
            <Badge variant="outline">
              {organizer}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-college-700 dark:text-college-300">{description}</p>
        
        <div className="flex items-center text-xs text-college-600 dark:text-college-400">
          <Calendar className="h-4 w-4 mr-1" />
          <span>
            {formattedStartDate}, {formattedStartTime} - {isMultiDay ? format(new Date(endDate), 'PPP') + ',' : ''} {formattedEndTime}
          </span>
        </div>
        
        <div className="flex items-center text-xs text-college-600 dark:text-college-400">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{location}</span>
        </div>
        
        <div className="flex items-center text-xs text-college-600 dark:text-college-400">
          <Users className="h-4 w-4 mr-1" />
          <span>{rsvpCount} attending</span>
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap items-center justify-between">
        <div className="flex flex-wrap gap-1 mb-2 sm:mb-0">
          {tags?.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <Button size="sm" onClick={handleRSVP}>RSVP</Button>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
