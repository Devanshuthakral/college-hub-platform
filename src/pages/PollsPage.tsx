
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';

interface PollOption {
  id: string;
  text: string;
  votes: number;
}

interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  totalVotes: number;
  createdBy: string;
  createdAt: string;
  expireAt: string;
  hasVoted?: boolean;
}

// Mock data for polls
const mockPolls: Poll[] = [
  {
    id: "poll1",
    question: "What activities would you like to see at the next campus festival?",
    options: [
      { id: "opt1", text: "Live music performances", votes: 125 },
      { id: "opt2", text: "Food trucks and stalls", votes: 80 },
      { id: "opt3", text: "Arts and crafts workshops", votes: 65 },
      { id: "opt4", text: "Sports tournaments", votes: 42 }
    ],
    totalVotes: 312,
    createdBy: "Student Council",
    createdAt: "2025-04-20T10:00:00Z",
    expireAt: "2025-05-05T23:59:59Z"
  },
  {
    id: "poll2",
    question: "Which new course would you be most interested in taking next semester?",
    options: [
      { id: "opt1", text: "Introduction to Artificial Intelligence", votes: 210 },
      { id: "opt2", text: "Sustainable Business Practices", votes: 185 },
      { id: "opt3", text: "Digital Photography", votes: 95 },
      { id: "opt4", text: "Public Speaking", votes: 110 }
    ],
    totalVotes: 600,
    createdBy: "Academic Affairs Office",
    createdAt: "2025-04-25T14:30:00Z",
    expireAt: "2025-05-10T23:59:59Z"
  }
];

const PollsPage: React.FC = () => {
  const [polls, setPolls] = useState<Poll[]>(mockPolls);
  const { user } = useAuth();
  const { toast } = useToast();

  const handleVote = (pollId: string, optionId: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to vote in polls.",
        variant: "destructive",
      });
      return;
    }

    setPolls(currentPolls => 
      currentPolls.map(poll => {
        if (poll.id === pollId) {
          const updatedOptions = poll.options.map(option => {
            if (option.id === optionId) {
              return { ...option, votes: option.votes + 1 };
            }
            return option;
          });
          
          return { 
            ...poll, 
            options: updatedOptions,
            totalVotes: poll.totalVotes + 1,
            hasVoted: true
          };
        }
        return poll;
      })
    );

    toast({
      title: "Vote recorded",
      description: "Your vote has been successfully recorded.",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Polls</h1>
        {(user?.role === 'admin' || user?.role === 'moderator') && (
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Create Poll
          </Button>
        )}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {polls.map(poll => (
          <Card key={poll.id}>
            <CardHeader>
              <CardTitle className="text-lg">{poll.question}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Created by {poll.createdBy}
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {poll.options.map(option => (
                <div key={option.id} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">{option.text}</span>
                    <span className="text-sm text-muted-foreground">
                      {((option.votes / poll.totalVotes) * 100).toFixed(1)}% ({option.votes})
                    </span>
                  </div>
                  <Progress value={(option.votes / poll.totalVotes) * 100} className="h-2" />
                </div>
              ))}
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-sm text-muted-foreground">
                Total votes: {poll.totalVotes}
              </div>
              
              {!poll.hasVoted && (
                <div className="grid grid-cols-2 gap-2 w-full">
                  {poll.options.map(option => (
                    <Button 
                      key={option.id} 
                      variant="outline"
                      size="sm"
                      onClick={() => handleVote(poll.id, option.id)}
                    >
                      Vote: {option.text}
                    </Button>
                  ))}
                </div>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PollsPage;
