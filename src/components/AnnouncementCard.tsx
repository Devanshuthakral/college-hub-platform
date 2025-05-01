
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Announcement } from '@/lib/mockData';
import { AlertTriangle, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface AnnouncementCardProps {
  announcement: Announcement;
}

const AnnouncementCard: React.FC<AnnouncementCardProps> = ({ announcement }) => {
  const { title, content, createdAt, createdBy, department, isEmergency, isUrgent, tags } = announcement;
  
  // Format date
  const formattedDate = formatDistanceToNow(new Date(createdAt), { addSuffix: true });
  
  // Determine if we should apply emergency or urgent styling
  const cardClass = isEmergency
    ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
    : isUrgent
    ? 'border-college-gold bg-amber-50 dark:bg-amber-900/20'
    : '';

  return (
    <Card className={`mb-4 card-hover ${cardClass}`}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            {isEmergency && (
              <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
            )}
            {isUrgent && !isEmergency && (
              <Info className="h-5 w-5 text-amber-500 mr-2" />
            )}
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
          {department && (
            <Badge variant="outline" className="ml-2">
              {department}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-college-700 dark:text-college-300">{content}</p>
      </CardContent>
      <CardFooter className="pt-2 flex flex-wrap items-center justify-between text-xs text-college-500 dark:text-college-400">
        <div>
          {formattedDate} 
        </div>
        <div className="flex flex-wrap gap-1 mt-2 sm:mt-0">
          {tags?.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
};

export default AnnouncementCard;
