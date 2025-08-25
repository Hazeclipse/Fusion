import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { MoreHorizontal, Reply, Star, Archive, Trash2, Send, Plus, Tag, User, MessageSquare, Bell } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { useTags } from '@/contexts/TagsContext';

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
    tags?: string[];
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
  const [showTagManager, setShowTagManager] = useState(false);
  const [selectedTagToAdd, setSelectedTagToAdd] = useState('');
  const [threadTags, setThreadTags] = useState<string[]>(thread.tags || []);
  const { customTags } = useTags();

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

  const handleAddTag = () => {
    if (selectedTagToAdd && !threadTags.includes(selectedTagToAdd)) {
      // Add tag to thread
      const updatedTags = [...threadTags, selectedTagToAdd];
      setThreadTags(updatedTags);
      console.log('Adding tag:', selectedTagToAdd, 'to thread:', thread.id);
      // Here you would typically update the thread in your data store
      setSelectedTagToAdd('');
      setShowTagManager(false);
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const updatedTags = threadTags.filter(tag => tag !== tagToRemove);
    setThreadTags(updatedTags);
    console.log('Removing tag:', tagToRemove, 'from thread:', thread.id);
    // Here you would typically update the thread in your data store
  };

    return (
    <div className="flex flex-col h-full relative">
      {/* Thread Header */}
      <div className="p-6 border-b border-border bg-card shadow-soft flex-shrink-0">
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
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowTagManager(!showTagManager)}
              className="gap-2"
            >
              <Tag className="h-4 w-4" />
              Tags
            </Button>
            <Button variant="ghost" size="sm">
              <Star className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <User className="h-4 w-4 mr-2" />
                  Contact Info
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Select Messages
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Bell className="h-4 w-4 mr-2" />
                  Mute Notifications
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Archive className="h-4 w-4 mr-2" />
                  Archive Thread
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Thread
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Tag Management Section - Absolutely positioned at top */}
      {showTagManager && (
        <div className="absolute top-0 left-0 right-0 p-4 border-b border-border bg-card/95 backdrop-blur-sm z-10">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-foreground">Manage Tags</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowTagManager(false)}
              className="h-6 w-6 p-0"
            >
              ×
            </Button>
          </div>
          
          {/* Current Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {threadTags.length > 0 ? (
              threadTags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="gap-1"
                >
                  {tag}
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1 hover:text-destructive"
                  >
                    ×
                  </button>
                </Badge>
              ))
            ) : (
              <span className="text-sm text-muted-foreground">No tags added yet</span>
            )}
          </div>
          
          {/* Add New Tag */}
          <div className="flex gap-2">
            <Select value={selectedTagToAdd} onValueChange={setSelectedTagToAdd}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select a tag to add" />
              </SelectTrigger>
              <SelectContent>
                {customTags.map(tag => (
                  <SelectItem key={tag.id} value={tag.name}>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: tag.color }}
                      />
                      {tag.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              size="sm"
              onClick={handleAddTag}
              disabled={!selectedTagToAdd}
              className="gap-2"
            >
              <Plus className="h-3 w-3" />
              Add
            </Button>
          </div>
        </div>
      )}

      {/* Messages Container - Full height with scrollable content */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto">
          <div className={cn("p-6 space-y-6 pb-32", showTagManager ? "pt-32" : "pt-6")}>
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
        </div>
      </div>

      {/* Reply Button - Absolutely positioned at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border bg-card z-20">
        <div className="flex justify-center">
          <Button 
            variant="outline" 
            size="lg" 
            onClick={() => setIsReplying(true)}
            className="gap-2 w-full max-w-md h-12 text-lg"
          >
            <Reply className="h-5 w-5" />
            Reply
          </Button>
        </div>
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


    </div>
  );
}