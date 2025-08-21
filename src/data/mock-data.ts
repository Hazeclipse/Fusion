// Mock data for Fusion app demonstration

export const mockThreads = {
  gmail: [
    {
      id: 'gmail-1',
      subject: 'Q4 Budget Review Meeting',
      participants: ['sarah.johnson@company.com', 'mike.chen@company.com', 'alex.smith@company.com'],
      lastMessage: 'Thanks for sharing the updated numbers. I\'ll review them before our meeting tomorrow.',
      lastSender: 'Sarah Johnson',
      timestamp: '2024-01-10T10:30:00Z',
      unreadCount: 2,
      priority: 'high' as const,
      tags: ['Budget', 'Meeting', 'Q4'],
      isRead: false,
      channel: 'Gmail',
      messages: [
        {
          id: 'msg-1',
          sender: 'Mike Chen',
          content: 'Hi team, I\'ve prepared the Q4 budget analysis. The numbers look promising, but we need to discuss the marketing allocation.',
          timestamp: '2 hours ago',
          isRead: true,
          priority: 'high' as const,
          tags: ['Budget', 'Q4']
        },
        {
          id: 'msg-2',
          sender: 'Alex Smith',
          content: 'Great work Mike! I\'ve reviewed the initial draft. Should we schedule a call to go through the details?',
          timestamp: '1 hour ago',
          isRead: true,
          priority: 'high' as const,
          tags: ['Meeting']
        },
        {
          id: 'msg-3',
          sender: 'Sarah Johnson',
          content: 'Thanks for sharing the updated numbers. I\'ll review them before our meeting tomorrow.',
          timestamp: '30 minutes ago',
          isRead: false,
          priority: 'high' as const,
          tags: ['Budget']
        }
      ]
    },
    {
      id: 'gmail-2',
      subject: 'New Product Launch Strategy',
      participants: ['lisa.wong@company.com', 'david.kim@company.com'],
      lastMessage: 'Let\'s aim for a beta release by end of March.',
      lastSender: 'Lisa Wong',
      timestamp: '2024-01-09T15:45:00Z',
      unreadCount: 0,
      priority: 'medium' as const,
      tags: ['Product', 'Launch'],
      isRead: true,
      channel: 'Gmail',
      messages: [
        {
          id: 'msg-4',
          sender: 'David Kim',
          content: 'I\'ve been thinking about our go-to-market strategy. We should focus on enterprise clients first.',
          timestamp: 'Yesterday at 3:45 PM',
          isRead: true,
          priority: 'medium' as const,
          tags: ['Product', 'Strategy']
        },
        {
          id: 'msg-5',
          sender: 'Lisa Wong',
          content: 'Let\'s aim for a beta release by end of March.',
          timestamp: 'Yesterday at 4:20 PM',
          isRead: true,
          priority: 'medium' as const,
          tags: ['Launch']
        }
      ]
    },
    {
      id: 'gmail-3',
      subject: 'IT Security Update Required',
      participants: ['security@company.com'],
      lastMessage: 'Please update your password within 24 hours.',
      lastSender: 'IT Security',
      timestamp: '2024-01-08T09:00:00Z',
      unreadCount: 1,
      priority: 'high' as const,
      tags: ['Security', 'Urgent'],
      isRead: false,
      channel: 'Gmail',
      messages: [
        {
          id: 'msg-6',
          sender: 'IT Security',
          content: 'Please update your password within 24 hours.',
          timestamp: '2 days ago',
          isRead: false,
          priority: 'high' as const,
          tags: ['Security', 'Urgent']
        }
      ]
    }
  ],
  slack: [
    {
      id: 'slack-1',
      subject: '#design-system',
      participants: ['Emma Wilson', 'Tom Rodriguez', 'Priya Patel'],
      lastMessage: 'The new component library is looking great!',
      lastSender: 'Emma Wilson',
      timestamp: '2024-01-10T11:15:00Z',
      unreadCount: 3,
      priority: 'medium' as const,
      tags: ['Design', 'Components'],
      isRead: false,
      channel: 'Slack',
      messages: [
        {
          id: 'msg-7',
          sender: 'Tom Rodriguez',
          content: 'I\'ve updated the button components with the new accessibility guidelines. Ready for review!',
          timestamp: '1 hour ago',
          isRead: true,
          priority: 'medium' as const,
          tags: ['Design', 'Accessibility']
        },
        {
          id: 'msg-8',
          sender: 'Priya Patel',
          content: 'Looks good Tom! I\'ll test these with our current projects.',
          timestamp: '45 minutes ago',
          isRead: true,
          priority: 'medium' as const,
          tags: ['Testing']
        },
        {
          id: 'msg-9',
          sender: 'Emma Wilson',
          content: 'The new component library is looking great!',
          timestamp: '30 minutes ago',
          isRead: false,
          priority: 'medium' as const,
          tags: ['Components']
        }
      ]
    },
    {
      id: 'slack-2',
      subject: '#engineering',
      participants: ['James Liu', 'Maria Santos'],
      lastMessage: 'Deployment successful! 🚀',
      lastSender: 'James Liu',
      timestamp: '2024-01-10T08:30:00Z',
      unreadCount: 0,
      priority: 'low' as const,
      tags: ['Deployment', 'Success'],
      isRead: true,
      channel: 'Slack',
      messages: [
        {
          id: 'msg-10',
          sender: 'Maria Santos',
          content: 'Starting the deployment process now. ETA: 15 minutes.',
          timestamp: '4 hours ago',
          isRead: true,
          priority: 'low' as const,
          tags: ['Deployment']
        },
        {
          id: 'msg-11',
          sender: 'James Liu',
          content: 'Deployment successful! 🚀',
          timestamp: '4 hours ago',
          isRead: true,
          priority: 'low' as const,
          tags: ['Success']
        }
      ]
    }
  ],
  whatsapp: [
    {
      id: 'whatsapp-1',
      subject: 'Family Group',
      participants: ['Mom', 'Dad', 'Sister'],
      lastMessage: 'Don\'t forget about dinner tonight!',
      lastSender: 'Mom',
      timestamp: '2024-01-10T12:00:00Z',
      unreadCount: 5,
      priority: 'low' as const,
      tags: ['Family'],
      isRead: false,
      channel: 'WhatsApp',
      messages: [
        {
          id: 'msg-12',
          sender: 'Dad',
          content: 'What time should we meet?',
          timestamp: '2 hours ago',
          isRead: true,
          priority: 'low' as const,
          tags: ['Family']
        },
        {
          id: 'msg-13',
          sender: 'Sister',
          content: '7 PM works for me!',
          timestamp: '1 hour ago',
          isRead: true,
          priority: 'low' as const,
          tags: ['Family']
        },
        {
          id: 'msg-14',
          sender: 'Mom',
          content: 'Don\'t forget about dinner tonight!',
          timestamp: '30 minutes ago',
          isRead: false,
          priority: 'low' as const,
          tags: ['Family']
        }
      ]
    },
    {
      id: 'whatsapp-2',
      subject: 'Client Project',
      participants: ['John Client', 'Assistant'],
      lastMessage: 'The mockups are ready for review.',
      lastSender: 'Assistant',
      timestamp: '2024-01-09T16:20:00Z',
      unreadCount: 1,
      priority: 'high' as const,
      tags: ['Client', 'Work'],
      isRead: false,
      channel: 'WhatsApp',
      messages: [
        {
          id: 'msg-15',
          sender: 'John Client',
          content: 'When can we expect the first draft?',
          timestamp: 'Yesterday at 4:00 PM',
          isRead: true,
          priority: 'high' as const,
          tags: ['Client']
        },
        {
          id: 'msg-16',
          sender: 'Assistant',
          content: 'The mockups are ready for review.',
          timestamp: 'Yesterday at 4:20 PM',
          isRead: false,
          priority: 'high' as const,
          tags: ['Work']
        }
      ]
    }
  ],
  instagram: [
    {
      id: 'instagram-1',
      subject: 'Brand Collaboration',
      participants: ['@techinfluencer'],
      lastMessage: 'Interested in partnering for our new campaign!',
      lastSender: 'Tech Influencer',
      timestamp: '2024-01-10T09:45:00Z',
      unreadCount: 2,
      priority: 'medium' as const,
      tags: ['Collaboration', 'Marketing'],
      isRead: false,
      channel: 'Instagram',
      messages: [
        {
          id: 'msg-17',
          sender: 'Tech Influencer',
          content: 'Interested in partnering for our new campaign!',
          timestamp: '3 hours ago',
          isRead: false,
          priority: 'medium' as const,
          tags: ['Collaboration', 'Marketing']
        }
      ]
    },
    {
      id: 'instagram-2',
      subject: 'Customer Inquiry',
      participants: ['@happycustomer'],
      lastMessage: 'Love your product! Where can I buy more?',
      lastSender: 'Happy Customer',
      timestamp: '2024-01-09T14:30:00Z',
      unreadCount: 0,
      priority: 'low' as const,
      tags: ['Customer', 'Sales'],
      isRead: true,
      channel: 'Instagram',
      messages: [
        {
          id: 'msg-18',
          sender: 'Happy Customer',
          content: 'Love your product! Where can I buy more?',
          timestamp: 'Yesterday at 2:30 PM',
          isRead: true,
          priority: 'low' as const,
          tags: ['Customer', 'Sales']
        }
      ]
    }
  ]
};

export type MockThread = typeof mockThreads.gmail[0];
export type MockMessage = MockThread['messages'][0];