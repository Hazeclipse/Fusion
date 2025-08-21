import { useState } from 'react';
import { FusionSidebar } from '@/components/fusion-sidebar';
import { InboxList } from '@/components/inbox-list';
import { MessageThread } from '@/components/message-thread';
import { mockThreads } from '@/data/mock-data';

const Index = () => {
  const [activeChannel, setActiveChannel] = useState('gmail');
  const [activeThread, setActiveThread] = useState<string | null>(null);

  const currentThreads = mockThreads[activeChannel as keyof typeof mockThreads] || [];
  const selectedThread = activeThread 
    ? currentThreads.find(thread => thread.id === activeThread)
    : null;

  const handleChannelChange = (channelId: string) => {
    setActiveChannel(channelId);
    setActiveThread(null); // Reset thread selection when changing channels
  };

  const handleThreadSelect = (threadId: string) => {
    setActiveThread(threadId);
  };

  return (
    <div className="h-screen flex bg-background">
      {/* Sidebar */}
      <FusionSidebar 
        activeChannel={activeChannel}
        onChannelChange={handleChannelChange}
      />
      
      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Inbox List */}
        <div className="w-96 border-r border-border">
          <InboxList
            threads={currentThreads}
            activeThread={activeThread}
            onThreadSelect={handleThreadSelect}
            channelType={activeChannel}
          />
        </div>
        
        {/* Message Thread */}
        <div className="flex-1">
          {selectedThread ? (
            <MessageThread thread={selectedThread} />
          ) : (
            <div className="flex items-center justify-center h-full bg-gradient-card">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl text-primary-foreground font-bold">F</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Welcome to Fusion</h3>
                  <p className="text-muted-foreground max-w-md">
                    Your unified messaging hub. Select a conversation from the {activeChannel} inbox to get started.
                  </p>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>🔒 End-to-end encrypted</p>
                  <p>🔍 Smart search & filtering</p>
                  <p>🎯 Priority-based organization</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;