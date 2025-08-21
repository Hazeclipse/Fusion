import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { MoreHorizontal, Reply, Star, Archive, Trash2, Send } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  sender: string;
  avatar?: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  priority: 'high' | 'medium' | 'low';
  tags: string[];
}

interface MessageThreadProps {
  thread: {
    id: string;
    subject: string;
    messages: Message[];
    participants: string[];
    timestamp: string;
    channel: string;
  };
}

const priorityColors = {
  high: 'priority-high',
  medium: 'priority-medium',
  low: 'priority-low'
};

const tagColors = [
  'bg-blue-100 text-blue-800',
  'bg-green-100 text-green-800',
  'bg-purple-100 text-purple-800',
  'bg-orange-100 text-orange-800',
  'bg-red-100 text-red-800'
];

export function MessageThread({ thread }: MessageThreadProps) {
  const [replyText, setReplyText] = useState('');
  const [isReplying, setIsReplying] = useState(false);

  const getPriorityColor = (priority: Message['priority']) => {
    return priorityColors[priority];
  };

  const handleReply = () => {
    if (replyText.trim()) {
      // Handle reply logic here
      console.log('Sending reply:', replyText);
      setReplyText('');
      setIsReplying(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Thread Header */}
      <div className="p-6 border-b border-border bg-card shadow-soft">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-foreground mb-2">{thread.subject}</h2>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>{thread.participants.length} participants</span>
              <span>Last activity: {new Date(thread.timestamp).toLocaleDateString()}</span>
              <Badge variant="outline" className="text-xs">
                {thread.channel}
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Star className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Archive className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Thread
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {thread.messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex gap-4 p-4 rounded-lg transition-smooth",
              !message.isRead && "bg-primary-muted/20"
            )}
          >
            <Avatar className="h-10 w-10 flex-shrink-0">
              <AvatarImage src={message.avatar} alt={message.sender} />
              <AvatarFallback>{message.sender.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-foreground">{message.sender}</span>
                  <span className="text-sm text-muted-foreground">{message.timestamp}</span>
                  <div className={cn("w-2 h-2 rounded-full", getPriorityColor(message.priority))} />
                </div>
                <Button variant="ghost" size="sm" onClick={() => setIsReplying(true)}>
                  <Reply className="h-4 w-4" />
                </Button>
              </div>
              
              <p className="text-foreground leading-relaxed">{message.content}</p>
              
              {message.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {message.tags.map((tag, index) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className={cn("text-xs", tagColors[index % tagColors.length])}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Reply Section */}
      {isReplying && (
        <div className="p-6 border-t border-border bg-card">
          <div className="space-y-4">
            <Textarea
              placeholder="Type your reply..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              rows={3}
              className="resize-none"
            />
            <div className="flex justify-between">
              <Button
                variant="ghost"
                onClick={() => setIsReplying(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleReply}
                disabled={!replyText.trim()}
                className="gradient-primary text-primary-foreground"
              >
                <Send className="h-4 w-4 mr-2" />
                Send Reply
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Reply Button */}
      {!isReplying && (
        <div className="p-6 border-t border-border">
          <Button
            onClick={() => setIsReplying(true)}
            variant="outline"
            className="w-full"
          >
            <Reply className="h-4 w-4 mr-2" />
            Reply
          </Button>
        </div>
      )}
    </div>
  );
}