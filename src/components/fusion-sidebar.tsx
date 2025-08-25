import { useState, useContext } from 'react';
import { Mail, MessageSquare, Phone, Instagram, Search, Settings, Plus, User, ChevronDown, ChevronRight, Hash, Linkedin, MessageCircle, X, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { UNSAFE_NavigationContext as NavigationContext } from 'react-router-dom';
import { ErrorBoundary } from '@/components/ui/error-boundary';

interface ChannelAccount {
  id: string;
  email: string;
  username: string;
  profilePic?: string;
  isActive: boolean;
}

interface Channel {
  id: string;
  name: string;
  type: 'gmail' | 'slack' | 'whatsapp' | 'instagram' | 'discord' | 'linkedin' | 'snapchat' | 'telegram' | 'signal' | 'teams';
  icon: React.ReactNode;
  unreadCount: number;
  isActive: boolean;
  accounts: ChannelAccount[];
  activeAccountId: string;
}

interface FusionSidebarProps {
  activeChannel: string;
  onChannelChange: (channelId: string) => void;
  user?: any;
}

const channels: Channel[] = [
  {
    id: 'gmail',
    name: 'Gmail',
    type: 'gmail',
    icon: <Mail className="h-5 w-5" />,
    unreadCount: 12,
    isActive: true,
    activeAccountId: 'gmail-1',
    accounts: [
      { id: 'gmail-1', email: 'john@company.com', username: 'John Doe', isActive: true },
      { id: 'gmail-2', email: 'personal@gmail.com', username: 'John', isActive: false }
    ]
  },
  {
    id: 'slack',
    name: 'Slack',
    type: 'slack',
    icon: <MessageSquare className="h-5 w-5" />,
    unreadCount: 5,
    isActive: true,
    activeAccountId: 'slack-1',
    accounts: [
      { id: 'slack-1', email: 'john.doe@company.com', username: 'john.doe', isActive: true },
      { id: 'slack-2', email: 'marketing@company.com', username: 'Marketing Team', isActive: false }
    ]
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    type: 'whatsapp',
    icon: <Phone className="h-5 w-5" />,
    unreadCount: 8,
    isActive: true,
    activeAccountId: 'whatsapp-1',
    accounts: [
      { id: 'whatsapp-1', email: '+1234567890', username: 'John', isActive: true },
      { id: 'whatsapp-2', email: '+1987654321', username: 'Business', isActive: false }
    ]
  },
  {
    id: 'instagram',
    name: 'Instagram',
    type: 'instagram',
    icon: <Instagram className="h-5 w-5" />,
    unreadCount: 3,
    isActive: true,
    activeAccountId: 'instagram-1',
    accounts: [
      { id: 'instagram-1', email: '@fusionapp', username: 'Fusion App', isActive: true }
    ]
  }
];

function SidebarContent({ activeChannel, onChannelChange, user }: FusionSidebarProps) {
  const [expandedChannels, setExpandedChannels] = useState<Set<string>>(new Set());
  const [showAddChannelModal, setShowAddChannelModal] = useState(false);
  const [availableChannels, setAvailableChannels] = useState<Channel[]>([
    ...channels,
    { id: 'discord', name: 'Discord', type: 'discord', icon: <Hash className="h-5 w-5" />, unreadCount: 0, isActive: false, activeAccountId: 'discord-1', accounts: [{ id: 'discord-1', email: 'discord@example.com', username: 'Discord', isActive: true }] },
    { id: 'linkedin', name: 'LinkedIn', type: 'linkedin', icon: <Linkedin className="h-5 w-5" />, unreadCount: 0, isActive: false, activeAccountId: 'linkedin-1', accounts: [{ id: 'linkedin-1', email: 'linkedin@example.com', username: 'LinkedIn', isActive: true }] },
    { id: 'snapchat', name: 'Snapchat', type: 'snapchat', icon: <MessageCircle className="h-5 w-5" />, unreadCount: 0, isActive: false, activeAccountId: 'snapchat-1', accounts: [{ id: 'snapchat-1', email: 'snapchat@example.com', username: 'Snapchat', isActive: true }] },
    { id: 'telegram', name: 'Telegram', type: 'telegram', icon: <MessageSquare className="h-5 w-5" />, unreadCount: 0, isActive: false, activeAccountId: 'telegram-1', accounts: [{ id: 'telegram-1', email: 'telegram@example.com', username: 'Telegram', isActive: true }] },
    { id: 'signal', name: 'Signal', type: 'signal', icon: <MessageCircle className="h-5 w-5" />, unreadCount: 0, isActive: false, activeAccountId: 'signal-1', accounts: [{ id: 'signal-1', email: 'signal@example.com', username: 'Signal', isActive: true }] },
    { id: 'teams', name: 'Microsoft Teams', type: 'teams', icon: <MessageSquare className="h-5 w-5" />, unreadCount: 0, isActive: false, activeAccountId: 'teams-1', accounts: [{ id: 'teams-1', email: 'teams@example.com', username: 'Teams', isActive: true }] }
  ]);
  const [connectedChannels, setConnectedChannels] = useState<Set<string>>(new Set(['gmail', 'slack', 'whatsapp', 'instagram']));



  const getChannelColorClass = (type: Channel['type']) => {
    switch (type) {
      case 'gmail': return 'channel-gmail';
      case 'slack': return 'channel-slack';
      case 'whatsapp': return 'channel-whatsapp';
      case 'instagram': return 'channel-instagram';
      default: return '';
    }
  };

  const toggleChannelExpansion = (channelId: string) => {
    const newExpanded = new Set(expandedChannels);
    if (newExpanded.has(channelId)) {
      newExpanded.delete(channelId);
    } else {
      newExpanded.add(channelId);
    }
    setExpandedChannels(newExpanded);
  };

  const getActiveAccount = (channel: Channel) => {
    return channel.accounts.find(acc => acc.id === channel.activeAccountId) || channel.accounts[0];
  };

  return (
    <div className="w-sidebar h-screen gradient-sidebar border-r border-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center gap-3 mb-4">
          <div 
            className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
            onClick={() => window.location.href = '/'}
          >
            <span className="text-primary-foreground font-bold text-sm">F</span>
          </div>
          <h1 
            className="text-lg font-semibold text-sidebar-foreground font-['Poppins'] cursor-pointer hover:text-primary transition-colors"
            onClick={() => window.location.href = '/'}
          >
            Fusion
          </h1>
        </div>
      </div>

      {/* Channels */}
      <div className="flex-1 overflow-y-auto p-2">
        <div className="space-y-1">
          {channels.map((channel) => {
            const activeAccount = getActiveAccount(channel);
            const isExpanded = expandedChannels.has(channel.id);
            
            return (
              <div key={channel.id} className="space-y-1">
                {/* Channel Header */}
                <Button
                  variant="ghost"
                  onClick={() => {
                    onChannelChange(channel.id);
                  }}
                  className={cn(
                    "w-full justify-start gap-3 p-3 h-auto transition-smooth font-['Poppins']",
                    "hover:bg-primary/20 hover:text-primary",
                    activeChannel === channel.id && "bg-sidebar-accent text-sidebar-accent-foreground shadow-soft"
                  )}
                >
                  <div className={cn("flex-shrink-0", getChannelColorClass(channel.type))}>
                    {channel.icon}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sidebar-foreground font-['Poppins']">{channel.name}</span>
                      <div className="flex items-center gap-2">
                        {channel.unreadCount > 0 && (
                          <Badge 
                            variant="secondary" 
                            className="bg-primary text-primary-foreground text-xs px-2 py-0 h-5"
                          >
                            {channel.unreadCount}
                          </Badge>
                        )}
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleChannelExpansion(channel.id);
                          }}
                          className="h-6 w-6 p-0 hover:bg-sidebar-accent/70 rounded flex items-center justify-center cursor-pointer transition-colors"
                        >
                          {isExpanded ? (
                            <ChevronDown className="h-3 w-3" />
                          ) : (
                            <ChevronRight className="h-3 w-3" />
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Active Account Display */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-6 h-6 bg-sidebar-accent rounded-full flex items-center justify-center">
                        {activeAccount.profilePic ? (
                          <img 
                            src={activeAccount.profilePic} 
                            alt={activeAccount.username}
                            className="w-6 h-6 rounded-full object-cover"
                          />
                        ) : (
                          <span className="text-xs font-medium text-sidebar-foreground">
                            {activeAccount.username.charAt(0).toUpperCase()}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground truncate">
                        {activeAccount.email}
                      </span>
                    </div>
                  </div>
                </Button>

                {/* Account Dropdown */}
                {isExpanded && channel.accounts.length > 1 && (
                  <div className="ml-8 space-y-1">
                    {channel.accounts.map((account) => (
                      <DropdownMenu key={account.id}>
                        <DropdownMenuTrigger asChild>
                          <div
                            className={cn(
                              "w-full justify-start gap-2 p-2 h-auto text-xs cursor-pointer rounded hover:bg-sidebar-accent/30 transition-colors",
                              account.id === channel.activeAccountId && "bg-sidebar-accent/50 text-sidebar-accent-foreground"
                            )}
                          >
                            <div className="w-4 h-4 bg-sidebar-accent rounded-full flex items-center justify-center">
                              {account.profilePic ? (
                                <img 
                                  src={account.profilePic} 
                                  alt={account.username}
                                  className="w-4 h-4 rounded-full object-cover"
                                />
                              ) : (
                                <span className="text-xs font-medium text-sidebar-foreground">
                                  {account.username.charAt(0).toUpperCase()}
                                </span>
                              )}
                            </div>
                            <span className="truncate">{account.email}</span>
                          </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-48">
                          <DropdownMenuItem className="text-xs">
                            Switch to this account
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-xs">
                            Edit account
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-xs text-destructive">
                            Remove account
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Add Channel */}
        <Button
          variant="ghost"
          onClick={() => setShowAddChannelModal(true)}
          className="w-full justify-start gap-3 p-3 mt-4 text-muted-foreground hover:text-primary hover:bg-primary/20 transition-smooth font-['Poppins']"
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
            <div className="text-sm font-medium text-sidebar-foreground">
              {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'}
            </div>
            <div className="text-xs text-muted-foreground">
              {user?.email || 'user@example.com'}
            </div>
          </div>
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={() => window.location.href = '/settings'}
            className="text-muted-foreground hover:text-primary hover:bg-primary/20 transition-colors"
          >
            <Settings className="h-4 w-4" />
          </Button>
                </div>
      </div>

      {/* Add Channel Modal */}
      {showAddChannelModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card border border-border rounded-2xl p-6 w-96 max-w-[90vw] max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground font-['Poppins']">Add New Channel</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAddChannelModal(false)}
                className="h-8 w-8 p-0 hover:bg-muted"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Choose a channel to connect to your Fusion inbox:
              </p>

              {availableChannels
                .filter(ch => !connectedChannels.has(ch.id))
                .map(channel => (
                  <div
                    key={channel.id}
                    className="flex items-center gap-3 p-3 border border-border rounded-lg hover:bg-muted/50 hover:border-primary/30 hover:shadow-sm cursor-pointer transition-all duration-200 group"
                    onClick={() => {
                      // Add the channel
                      setConnectedChannels(prev => new Set([...prev, channel.id]));
                      setShowAddChannelModal(false);
                      // In a real app, this would open authentication flow
                      console.log('Adding channel:', channel.name);
                      // Show success feedback (in a real app, this would be a toast)
                      alert(`Successfully added ${channel.name}! In a real app, you would authenticate with your account.`);
                    }}
                  >
                    <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                      <div className="text-muted-foreground group-hover:text-primary transition-colors">
                        {channel.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground">{channel.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        Connect your {channel.name} account
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 hover:bg-primary/10 group-hover:bg-primary/20 transition-colors"
                    >
                      <Plus className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </Button>
                  </div>
                ))}

              {availableChannels.filter(ch => !connectedChannels.has(ch.id)).length === 0 && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-success" />
                  </div>
                  <h3 className="font-medium text-foreground mb-2">All Channels Connected!</h3>
                  <p className="text-sm text-muted-foreground">
                    You've already connected all available messaging channels.
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-end mt-6 pt-4 border-t border-border">
              <Button
                variant="outline"
                onClick={() => setShowAddChannelModal(false)}
                className="font-['Poppins']"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function FusionSidebar({ activeChannel, onChannelChange, user }: FusionSidebarProps) {
  const navigator = useContext(NavigationContext)?.navigator;

  if (!navigator) {
    console.warn('Router context not found. Ensure FusionSidebar is within BrowserRouter.');
    return <div className="p-4 text-red-500">Router not initialized. Check app setup.</div>;
  }

  return (
    <ErrorBoundary
      fallback={<div className="p-4 text-red-500">Sidebar crashed! Try refreshing or go <a href="/" className="text-blue-500">Home</a>.</div>}
    >
      <SidebarContent activeChannel={activeChannel} onChannelChange={onChannelChange} user={user} />
    </ErrorBoundary>
  );
}