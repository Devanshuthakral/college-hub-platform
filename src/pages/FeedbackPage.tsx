
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Plus, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';

interface Feedback {
  id: string;
  title: string;
  content: string;
  category: string;
  upvotes: number;
  downvotes: number;
  createdBy: string;
  createdAt: string;
  isAnonymous: boolean;
  status: 'pending' | 'reviewing' | 'implemented' | 'declined';
}

// Mock data for feedback
const mockFeedback: Feedback[] = [
  {
    id: "feedback1",
    title: "Extend library hours during exam week",
    content: "The current library closing time is too early during finals week. Many students need a quiet place to study late into the night.",
    category: "Facilities",
    upvotes: 86,
    downvotes: 5,
    createdBy: "Anonymous",
    createdAt: "2025-04-22T15:45:00Z",
    isAnonymous: true,
    status: 'reviewing'
  },
  {
    id: "feedback2",
    title: "More vegetarian options in the cafeteria",
    content: "The cafeteria has limited vegetarian meal choices. Adding more vegetarian and vegan options would cater to more dietary preferences.",
    category: "Food Services",
    upvotes: 72,
    downvotes: 14,
    createdBy: "Jane Smith",
    createdAt: "2025-04-24T09:15:00Z",
    isAnonymous: false,
    status: 'implemented'
  }
];

const FeedbackPage: React.FC = () => {
  const [feedbackList, setFeedbackList] = useState<Feedback[]>(mockFeedback);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [newFeedback, setNewFeedback] = useState({
    title: '',
    content: '',
    category: 'Facilities',
    isAnonymous: false
  });
  const { user } = useAuth();
  const { toast } = useToast();

  const handleVote = (feedbackId: string, voteType: 'up' | 'down') => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to vote on feedback.",
        variant: "destructive",
      });
      return;
    }

    setFeedbackList(currentList => 
      currentList.map(feedback => {
        if (feedback.id === feedbackId) {
          if (voteType === 'up') {
            return { ...feedback, upvotes: feedback.upvotes + 1 };
          } else {
            return { ...feedback, downvotes: feedback.downvotes + 1 };
          }
        }
        return feedback;
      })
    );

    toast({
      title: "Vote recorded",
      description: "Your vote has been successfully recorded.",
    });
  };

  const handleSubmitFeedback = () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to submit feedback.",
        variant: "destructive",
      });
      return;
    }

    if (!newFeedback.title || !newFeedback.content) {
      toast({
        title: "Missing information",
        description: "Please provide both a title and content for your feedback.",
        variant: "destructive",
      });
      return;
    }

    const newFeedbackItem: Feedback = {
      id: `feedback${Date.now()}`,
      title: newFeedback.title,
      content: newFeedback.content,
      category: newFeedback.category,
      upvotes: 0,
      downvotes: 0,
      createdBy: newFeedback.isAnonymous ? "Anonymous" : user.name,
      createdAt: new Date().toISOString(),
      isAnonymous: newFeedback.isAnonymous,
      status: 'pending'
    };

    setFeedbackList([newFeedbackItem, ...feedbackList]);
    setNewFeedback({
      title: '',
      content: '',
      category: 'Facilities',
      isAnonymous: false
    });
    setShowFeedbackForm(false);

    toast({
      title: "Feedback submitted",
      description: "Your feedback has been successfully submitted.",
    });
  };

  const getStatusBadge = (status: Feedback['status']) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline">Pending Review</Badge>;
      case 'reviewing':
        return <Badge variant="secondary">Under Review</Badge>;
      case 'implemented':
        return <Badge variant="default">Implemented</Badge>;
      case 'declined':
        return <Badge variant="destructive">Declined</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Feedback</h1>
        <Button onClick={() => setShowFeedbackForm(!showFeedbackForm)}>
          <Plus className="mr-2 h-4 w-4" /> Submit Feedback
        </Button>
      </div>
      
      {showFeedbackForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Submit New Feedback</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <input
                id="title"
                className="w-full p-2 border rounded-md"
                value={newFeedback.title}
                onChange={(e) => setNewFeedback({...newFeedback, title: e.target.value})}
                placeholder="Brief summary of your feedback"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="content">Feedback Details</Label>
              <Textarea
                id="content"
                value={newFeedback.content}
                onChange={(e) => setNewFeedback({...newFeedback, content: e.target.value})}
                placeholder="Please provide detailed information about your feedback"
                rows={4}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                className="w-full p-2 border rounded-md"
                value={newFeedback.category}
                onChange={(e) => setNewFeedback({...newFeedback, category: e.target.value})}
              >
                <option value="Facilities">Facilities</option>
                <option value="Food Services">Food Services</option>
                <option value="Courses">Courses</option>
                <option value="Events">Events</option>
                <option value="Technology">Technology</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="anonymous"
                checked={newFeedback.isAnonymous}
                onCheckedChange={(checked) => setNewFeedback({...newFeedback, isAnonymous: checked})}
              />
              <Label htmlFor="anonymous">Submit anonymously</Label>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex space-x-2">
              <Button onClick={handleSubmitFeedback}>Submit</Button>
              <Button variant="outline" onClick={() => setShowFeedbackForm(false)}>Cancel</Button>
            </div>
          </CardFooter>
        </Card>
      )}
      
      <div className="space-y-4">
        {feedbackList.map(feedback => (
          <Card key={feedback.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{feedback.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Submitted by {feedback.createdBy} • {new Date(feedback.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <Badge>{feedback.category}</Badge>
                  {getStatusBadge(feedback.status)}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p>{feedback.content}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex items-center space-x-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleVote(feedback.id, 'up')}
                  className="flex items-center space-x-1"
                >
                  <ThumbsUp className="h-4 w-4" />
                  <span>{feedback.upvotes}</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleVote(feedback.id, 'down')}
                  className="flex items-center space-x-1"
                >
                  <ThumbsDown className="h-4 w-4" />
                  <span>{feedback.downvotes}</span>
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FeedbackPage;
