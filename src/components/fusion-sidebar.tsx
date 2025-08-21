import { useState } from 'react';
import { Mail, MessageSquare, Phone, Instagram, Search, Settings, Plus, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface Channel {
  id: string;
  name: string;
  type: 'gmail' | 'slack' | 'whatsapp' | 'instagram';
  icon: React.ReactNode;
  unreadCount: number;
  isActive: boolean;
  accounts: string[];
}

interface FusionSidebarProps {
  activeChannel: string;
  onChannelChange: (channelId: string) => void;
}

const channels: Channel[] = [
  {
    id: 'gmail',
    name: 'Gmail',
    type: 'gmail',
    icon: <Mail className="h-5 w-5" />,
    unreadCount: 12,
    isActive: true,
    accounts: ['john@company.com', 'personal@gmail.com']
  },
  {
    id: 'slack',
    name: 'Slack',
    type: 'slack',
    icon: <MessageSquare className="h-5 w-5" />,
    unreadCount: 5,
    isActive: true,
    accounts: ['Tech Team', 'Marketing']
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    type: 'whatsapp',
    icon: <Phone className="h-5 w-5" />,
    unreadCount: 8,
    isActive: true,
    accounts: ['Personal', 'Business']
  },
  {
    id: 'instagram',
    name: 'Instagram',
    type: 'instagram',
    icon: <Instagram className="h-5 w-5" />,
    unreadCount: 3,
    isActive: true,
    accounts: ['@fusionapp']
  }
];

export function FusionSidebar({ activeChannel, onChannelChange }: FusionSidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const getChannelColorClass = (type: Channel['type']) => {
    switch (type) {
      case 'gmail': return 'channel-gmail';
      case 'slack': return 'channel-slack';
      case 'whatsapp': return 'channel-whatsapp';
      case 'instagram': return 'channel-instagram';
      default: return '';
    }
  };

  return (
    <div className="w-sidebar h-screen gradient-sidebar border-r border-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">F</span>
          </div>
          <h1 className="text-lg font-semibold text-sidebar-foreground">Fusion</h1>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-sidebar-accent border-sidebar-border text-sidebar-foreground placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Channels */}
      <div className="flex-1 overflow-y-auto p-2">
        <div className="space-y-1">
          {channels.map((channel) => (
            <Button
              key={channel.id}
              variant="ghost"
              onClick={() => onChannelChange(channel.id)}
              className={cn(
                "w-full justify-start gap-3 p-3 h-auto transition-smooth",
                "hover:bg-sidebar-accent/50",
                activeChannel === channel.id && "bg-sidebar-accent text-sidebar-accent-foreground shadow-soft"
              )}
            >
              <div className={cn("flex-shrink-0", getChannelColorClass(channel.type))}>
                {channel.icon}
              </div>
              <div className="flex-1 text-left">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sidebar-foreground">{channel.name}</span>
                  {channel.unreadCount > 0 && (
                    <Badge 
                      variant="secondary" 
                      className="ml-auto bg-primary text-primary-foreground text-xs px-2 py-0 h-5"
                    >
                      {channel.unreadCount}
                    </Badge>
                  )}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {channel.accounts.length} account{channel.accounts.length !== 1 ? 's' : ''}
                </div>
              </div>
            </Button>
          ))}
        </div>

        {/* Add Channel */}
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 p-3 mt-4 text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent/50 transition-smooth"
        >
          <Plus className="h-5 w-5" />
          <span>Add Channel</span>
        </Button>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border/50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-sidebar-accent rounded-lg flex items-center justify-center">
            <User className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-sidebar-foreground">John Doe</div>
            <div className="text-xs text-muted-foreground">john@company.com</div>
          </div>
          <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-sidebar-foreground">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}