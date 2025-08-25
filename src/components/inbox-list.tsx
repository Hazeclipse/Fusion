import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, SortDesc } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTags } from '@/contexts/TagsContext';

// Custom tag colors - users define these in settings
const tagColors: Record<string, string> = {
  // Default fallback colors for user-defined tags
  default: '#F0F0F0',
  urgent: '#FFCCCC',      // Soft red
  important: '#CCE5FF',   // Soft blue
  followup: '#E5F2FF',    // Soft light blue
  meeting: '#FFF2CC',     // Soft yellow
  project: '#E5CCFF',     // Soft purple
  personal: '#CCFFCC',    // Soft green
  work: '#FFE5CC',        // Soft orange
  finance: '#FFE5E5',     // Soft pink
};

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
  const { customTags } = useTags();
  
  // Safety check for threads array
  const safeThreads = Array.isArray(threads) ? threads : [];
  
  // Use custom tags from context instead of extracting from threads
  const availableTags = customTags.map(tag => tag.name);
  
  const filteredAndSortedThreads = safeThreads
    .filter(thread => {
      // Safety check for thread properties
      if (!thread || typeof thread !== 'object') return false;
      
      if (searchQuery) {
        const subject = thread.subject || '';
        const lastMessage = thread.lastMessage || '';
        const participants = Array.isArray(thread.participants) ? thread.participants : [];
        
        return subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
               lastMessage.toLowerCase().includes(searchQuery.toLowerCase()) ||
               participants.some(p => String(p).toLowerCase().includes(searchQuery.toLowerCase()));
      }
      return true;
    })
    .filter(thread => {
      if (filterBy === 'unread') return (thread.unreadCount || 0) > 0;
      if (filterBy === 'all') return true;
      return (thread.tags || []).includes(filterBy);
    })
    .sort((a, b) => {
      if (sortBy === 'priority') {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority || 'low'] - priorityOrder[a.priority || 'low'];
      }
      if (sortBy === 'unread') {
        const aUnread = (a.unreadCount || 0) > 0;
        const bUnread = (b.unreadCount || 0) > 0;
        if (aUnread && !bUnread) return -1;
        if (!aUnread && bUnread) return 1;
        return 0;
      }
      
      // Safe timestamp handling
      const timestampA = new Date(a.timestamp || Date.now()).getTime();
      const timestampB = new Date(b.timestamp || Date.now()).getTime();
      return timestampB - timestampA;
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
      <div className="p-4 border-b border-border bg-card shadow-soft shadow-primary/10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground capitalize font-['Poppins']">{channelType} Inbox</h2>
          <Badge variant="secondary" className="bg-primary/10 text-primary shadow-sm shadow-primary/20">
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
        
        <div className="flex gap-2 flex-wrap">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[140px]">
              <SortDesc className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="timestamp">Recent</SelectItem>
              <SelectItem value="priority">Priority</SelectItem>
              <SelectItem value="unread">Unread</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={filterBy} onValueChange={setFilterBy}>
            <SelectTrigger className="w-[140px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tags</SelectItem>
              <SelectItem value="unread">Unread</SelectItem>
              {availableTags.map(tag => (
                <SelectItem key={tag} value={tag}>{tag}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>

      {/* Thread List */}
      <div className="flex-1 overflow-y-auto">
        {filteredAndSortedThreads.map((thread) => {
          // Safety checks for thread properties
          if (!thread || !thread.id) return null;
          
          const threadId = thread.id;
          const priority = thread.priority || 'low';
          const isRead = thread.isRead !== undefined ? thread.isRead : true;
          const unreadCount = thread.unreadCount || 0;
          const participants = Array.isArray(thread.participants) ? thread.participants : [];
          const tags = Array.isArray(thread.tags) ? thread.tags : [];
          
          return (
            <div
              key={threadId}
              onClick={() => onThreadSelect(threadId)}
              className={cn(
                "p-4 border-b border-border cursor-pointer transition-smooth hover:bg-muted/50 hover:shadow-sm hover:shadow-primary/10",
                "border-l-4", priorityColors[priority],
                activeThread === threadId && "bg-muted shadow-sm shadow-primary/20",
                !isRead && "bg-primary-muted/10"
              )}
            >
              <div className="flex gap-3">
                <Avatar className="h-10 w-10 flex-shrink-0">
                  <AvatarFallback>
                    {participants[0]?.charAt(0).toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className={cn(
                      "font-medium truncate text-sm font-['Poppins']",
                      !isRead ? "text-foreground" : "text-muted-foreground"
                    )}>
                      {thread.subject || 'No Subject'}
                    </h3>
                    <div className="flex items-center gap-2 ml-2">
                      {unreadCount > 0 && (
                        <Badge variant="default" className="bg-primary text-primary-foreground text-xs">
                          {unreadCount}
                        </Badge>
                      )}
                      <span className="text-xs text-muted-foreground">
                        {formatTime(String(thread.timestamp || Date.now()))}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground truncate">
                      <span className="font-medium">{thread.lastSender || 'Unknown'}:</span> {thread.lastMessage || 'No message'}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        {participants.length} participant{participants.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                    
                    {/* Show all tags that exist in user-defined tags */}
                    {tags.length > 0 && (
                      <div className="flex gap-1 flex-wrap">
                        {tags
                          .filter(tag => customTags.some(ct => ct.name.toLowerCase() === tag.toLowerCase()))
                          .map((tag) => {
                            const customTag = customTags.find(ct => ct.name.toLowerCase() === tag.toLowerCase());
                            const tagColor = customTag?.color || tagColors.default;
                            return (
                              <Badge
                                key={tag}
                                variant="secondary"
                                className="text-xs"
                                style={{ backgroundColor: tagColor, color: '#374151' }}
                              >
                                {tag}
                              </Badge>
                            );
                          })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        
        {filteredAndSortedThreads.length === 0 && (
          <div className="flex items-center justify-center h-32">
            <p className="text-muted-foreground">No conversations found</p>
          </div>
        )}
      </div>
    </div>
  );
}