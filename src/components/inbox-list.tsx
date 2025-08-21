import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, SortDesc } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ThreadSummary {
  id: string;
  subject: string;
  participants: string[];
  lastMessage: string;
  lastSender: string;
  timestamp: string;
  unreadCount: number;
  priority: 'high' | 'medium' | 'low';
  tags: string[];
  isRead: boolean;
  channel: string;
}

interface InboxListProps {
  threads: ThreadSummary[];
  activeThread: string | null;
  onThreadSelect: (threadId: string) => void;
  channelType: string;
}

const priorityColors = {
  high: 'border-l-priority-high',
  medium: 'border-l-priority-medium',
  low: 'border-l-priority-low'
};

// Removed bright tag colors - using soft pastels instead

export function InboxList({ threads, activeThread, onThreadSelect, channelType }: InboxListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('timestamp');
  const [filterBy, setFilterBy] = useState('all');

  const filteredAndSortedThreads = threads
    .filter(thread => {
      if (searchQuery) {
        return thread.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
               thread.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()) ||
               thread.participants.some(p => p.toLowerCase().includes(searchQuery.toLowerCase()));
      }
      return true;
    })
    .filter(thread => {
      if (filterBy === 'unread') return thread.unreadCount > 0;
      if (filterBy === 'high') return thread.priority === 'high';
      if (filterBy === 'medium') return thread.priority === 'medium';
      if (filterBy === 'low') return thread.priority === 'low';
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'priority') {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-border bg-card shadow-soft">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground capitalize">{channelType} Inbox</h2>
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            {threads.length} conversations
          </Badge>
        </div>
        
        {/* Search and Filters */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          
          <div className="flex gap-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[140px]">
                <SortDesc className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="timestamp">Recent</SelectItem>
                <SelectItem value="priority">Priority</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={filterBy} onValueChange={setFilterBy}>
              <SelectTrigger className="w-[120px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="unread">Unread</SelectItem>
                <SelectItem value="high">High Priority</SelectItem>
                <SelectItem value="medium">Medium Priority</SelectItem>
                <SelectItem value="low">Low Priority</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Thread List */}
      <div className="flex-1 overflow-y-auto">
        {filteredAndSortedThreads.map((thread) => (
          <div
            key={thread.id}
            onClick={() => onThreadSelect(thread.id)}
            className={cn(
              "p-4 border-b border-border cursor-pointer transition-smooth hover:bg-muted/50",
              "border-l-4", priorityColors[thread.priority],
              activeThread === thread.id && "bg-muted",
              !thread.isRead && "bg-primary-muted/10"
            )}
          >
            <div className="flex gap-3">
              <Avatar className="h-10 w-10 flex-shrink-0">
                <AvatarFallback>
                  {thread.participants[0]?.charAt(0).toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className={cn(
                    "font-medium truncate",
                    !thread.isRead ? "text-foreground" : "text-muted-foreground"
                  )}>
                    {thread.subject}
                  </h3>
                  <div className="flex items-center gap-2 ml-2">
                    {thread.unreadCount > 0 && (
                      <Badge variant="default" className="bg-primary text-primary-foreground text-xs">
                        {thread.unreadCount}
                      </Badge>
                    )}
                    <span className="text-xs text-muted-foreground">
                      {formatTime(thread.timestamp)}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground truncate">
                    <span className="font-medium">{thread.lastSender}:</span> {thread.lastMessage}
                  </p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      {thread.participants.length} participant{thread.participants.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  
                  {thread.tags.length > 0 && (
                    <div className="flex gap-1">
                      {thread.tags.slice(0, 2).map((tag, index) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className={cn("text-xs", tagColors[index % tagColors.length])}
                        >
                          {tag}
                        </Badge>
                      ))}
                      {thread.tags.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{thread.tags.length - 2}
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {filteredAndSortedThreads.length === 0 && (
          <div className="flex items-center justify-center h-32">
            <p className="text-muted-foreground">No conversations found</p>
          </div>
        )}
      </div>
    </div>
  );
}