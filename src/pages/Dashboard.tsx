import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FusionSidebar } from '@/components/fusion-sidebar';
import { InboxList } from '@/components/inbox-list';
import { MessageThread } from '@/components/message-thread';
import { mockThreads } from '@/data/mock-data';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeChannel, setActiveChannel] = useState('gmail');
  const [activeThread, setActiveThread] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get current user and set up auth listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        navigate('/auth');
      }
    });

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        navigate('/auth');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  if (!user) {
    return null; // Will redirect to auth
  }

  const currentThreads = mockThreads[activeChannel as keyof typeof mockThreads] || [];
  const selectedThread = activeThread 
    ? currentThreads.find(thread => thread.id === activeThread)
    : null;

  const handleChannelChange = (channelId: string) => {
    setActiveChannel(channelId);
    setActiveThread(null);
  };

  const handleThreadSelect = (threadId: string) => {
    setActiveThread(threadId);
  };

  return (
    <div className="h-screen flex bg-background">
      <FusionSidebar 
        activeChannel={activeChannel}
        onChannelChange={handleChannelChange}
        user={user}
      />
      
      <div className="flex-1 flex">
        <div className="w-96 border-r border-border">
          <InboxList
            threads={currentThreads}
            activeThread={activeThread}
            onThreadSelect={handleThreadSelect}
            channelType={activeChannel}
          />
        </div>
        
        <div className="flex-1">
          {selectedThread ? (
            <MessageThread thread={selectedThread} />
          ) : (
            <div className="flex items-center justify-center h-full bg-gradient-card">
              <div className="text-center space-y-6 max-w-md">
                <div className="w-20 h-20 gradient-primary rounded-3xl flex items-center justify-center mx-auto">
                  <span className="text-3xl text-primary-foreground font-bold">F</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">
                    Your inboxes, unified and stress-free
                  </h3>
                  <p className="text-muted-foreground text-lg">
                    Select a conversation from your {activeChannel} inbox to get started.
                  </p>
                </div>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p className="flex items-center justify-center gap-2">
                    <span className="w-2 h-2 bg-success rounded-full"></span>
                    End-to-end encrypted
                  </p>
                  <p className="flex items-center justify-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    Smart search & filtering
                  </p>
                  <p className="flex items-center justify-center gap-2">
                    <span className="w-2 h-2 bg-accent rounded-full"></span>
                    Priority-based organization
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;