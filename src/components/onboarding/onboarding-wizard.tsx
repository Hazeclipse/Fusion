import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Mail, MessageSquare, Phone, Instagram, Hash, MessageCircle, 
  Linkedin, Chrome, ArrowRight, ArrowLeft, CheckCircle, Plus,
  Sparkles, PartyPopper 
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Channel {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  isPopular?: boolean;
}

const availableChannels: Channel[] = [
  {
    id: 'gmail',
    name: 'Gmail',
    description: 'Connect Gmail for emails and communication',
    icon: <Mail className="h-6 w-6" />,
    color: 'text-gmail',
    isPopular: true
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'Sync your Slack workspaces and channels',
    icon: <MessageSquare className="h-6 w-6" />,
    color: 'text-slack',
    isPopular: true
  },
  {
    id: 'instagram',
    name: 'Instagram DMs',
    description: 'Manage Instagram direct messages',
    icon: <Instagram className="h-6 w-6" />,
    color: 'text-instagram',
    isPopular: true
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    description: 'Connect WhatsApp for personal and business',
    icon: <Phone className="h-6 w-6" />,
    color: 'text-whatsapp',
    isPopular: true
  },
  {
    id: 'discord',
    name: 'Discord',
    description: 'Connect Discord servers and DMs',
    icon: <Hash className="h-6 w-6" />,
    color: 'text-discord'
  },
  {
    id: 'snapchat',
    name: 'Snapchat',
    description: 'Manage Snapchat conversations',
    icon: <MessageCircle className="h-6 w-6" />,
    color: 'text-warning'
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    description: 'Professional messaging and connections',
    icon: <Linkedin className="h-6 w-6" />,
    color: 'text-linkedin'
  },
  {
    id: 'googlechat',
    name: 'Google Chat',
    description: 'Google Workspace messaging',
    icon: <Chrome className="h-6 w-6" />,
    color: 'text-primary'
  }
];

export function OnboardingWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  const [channelAccounts, setChannelAccounts] = useState<Record<string, Array<{email: string, verified: boolean}>>>({});
  const [currentChannelIndex, setCurrentChannelIndex] = useState(0);
  const [currentAccountEmail, setCurrentAccountEmail] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  const handleChannelToggle = (channelId: string) => {
    setSelectedChannels(prev => 
      prev.includes(channelId) 
        ? prev.filter(id => id !== channelId)
        : [...prev, channelId]
    );
  };

  const handleNextStep = () => {
    if (currentStep === 1 && selectedChannels.length === 0) return;
    
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      if (currentStep === 1) {
        // Initialize accounts for selected channels
        const initialAccounts: Record<string, Array<{email: string, verified: boolean}>> = {};
        selectedChannels.forEach(channelId => {
          initialAccounts[channelId] = [];
        });
        setChannelAccounts(initialAccounts);
      }
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const addAccountToChannel = (channelId: string) => {
    if (!currentAccountEmail.trim()) return;
    
    setChannelAccounts(prev => ({
      ...prev,
      [channelId]: [
        ...(prev[channelId] || []),
        { email: currentAccountEmail, verified: false }
      ]
    }));
    setCurrentAccountEmail('');
    
    // Simulate verification after 1 second
    setTimeout(() => {
      setChannelAccounts(prev => ({
        ...prev,
        [channelId]: prev[channelId].map((account, index) => 
          index === prev[channelId].length - 1 
            ? { ...account, verified: true }
            : account
        )
      }));
    }, 1000);
  };

  const handleComplete = () => {
    setShowSuccess(true);
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };

  const currentSelectedChannel = selectedChannels[currentChannelIndex];
  const currentChannel = availableChannels.find(c => c.id === currentSelectedChannel);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex items-center justify-center p-4">
      <div className="w-full max-w-4xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="w-20 h-20 gradient-primary rounded-3xl flex items-center justify-center mx-auto">
            <Sparkles className="h-10 w-10 text-primary-foreground animate-pulse" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Welcome to Fusion</h1>
            <p className="text-xl text-muted-foreground">Let's set up your unified inbox</p>
          </div>
          
          {/* Progress */}
          <div className="max-w-md mx-auto space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Step {currentStep} of {totalSteps}</span>
              <span>{Math.round(progress)}% complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        {showSuccess ? (
          <Card className="shadow-strong border-0 max-w-md mx-auto">
            <CardContent className="p-8 text-center space-y-4">
              <PartyPopper className="h-16 w-16 text-primary mx-auto" />
              <h2 className="text-2xl font-bold text-card-foreground">You're all set! 🎉</h2>
              <p className="text-muted-foreground">Redirecting to your unified inbox...</p>
            </CardContent>
          </Card>
        ) : (
          <Card className="shadow-strong border-0">
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                {currentStep === 1 && "Select your messaging channels!"}
                {currentStep === 2 && "Connect your accounts"}
                {currentStep === 3 && "You're almost done!"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Step 1: Channel Selection */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <p className="text-center text-muted-foreground">
                    Choose the messaging platforms you'd like to connect. You can always add more later!
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-h-96 overflow-y-auto">
                    {availableChannels.map((channel) => (
                      <div
                        key={channel.id}
                        onClick={() => handleChannelToggle(channel.id)}
                        className={cn(
                          "relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-200",
                          "hover:shadow-medium hover:scale-105",
                          selectedChannels.includes(channel.id)
                            ? "border-primary bg-primary/5 shadow-soft"
                            : "border-border bg-card hover:border-primary/50"
                        )}
                      >
                        {channel.isPopular && (
                          <Badge className="absolute -top-2 -right-2 bg-primary text-primary-foreground">
                            Popular
                          </Badge>
                        )}
                        
                        <div className="flex flex-col items-center space-y-3">
                          <div className={cn("p-3 rounded-full bg-muted", channel.color)}>
                            {channel.icon}
                          </div>
                          <div className="text-center">
                            <h3 className="font-semibold text-card-foreground">{channel.name}</h3>
                            <p className="text-xs text-muted-foreground mt-1">{channel.description}</p>
                          </div>
                          <Checkbox 
                            checked={selectedChannels.includes(channel.id)}
                            onChange={() => {}}
                            className="pointer-events-none"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-4">
                      Selected {selectedChannels.length} channel{selectedChannels.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
              )}

              {/* Step 2: Account Connection */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <p className="text-muted-foreground">
                      Let's connect your accounts for each selected channel
                    </p>
                  </div>

                  {currentChannel && (
                    <div className="max-w-md mx-auto space-y-6">
                      <div className="text-center">
                        <div className={cn("w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4", currentChannel.color)}>
                          {currentChannel.icon}
                        </div>
                        <h3 className="text-xl font-semibold">{currentChannel.name}</h3>
                        <p className="text-muted-foreground">{currentChannel.description}</p>
                      </div>

                      {/* Existing accounts */}
                      {channelAccounts[currentChannel.id]?.map((account, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                          <CheckCircle className={cn("h-5 w-5", account.verified ? "text-success" : "text-muted-foreground")} />
                          <span className="flex-1">{account.email}</span>
                          <Badge variant={account.verified ? "default" : "secondary"}>
                            {account.verified ? "Verified" : "Verifying..."}
                          </Badge>
                        </div>
                      ))}

                      {/* Add new account */}
                      <div className="space-y-3">
                        <Label htmlFor="account-email">
                          Add {currentChannel.name} account
                        </Label>
                        <div className="flex gap-2">
                          <Input
                            id="account-email"
                            type="email"
                            placeholder={`your@${currentChannel.name.toLowerCase()}.com`}
                            value={currentAccountEmail}
                            onChange={(e) => setCurrentAccountEmail(e.target.value)}
                          />
                          <Button 
                            onClick={() => addAccountToChannel(currentChannel.id)}
                            disabled={!currentAccountEmail.trim()}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          We'll send a verification message to confirm access
                        </p>
                      </div>

                      {/* Navigation between channels */}
                      <div className="flex items-center justify-between">
                        <Button
                          variant="outline"
                          onClick={() => setCurrentChannelIndex(Math.max(0, currentChannelIndex - 1))}
                          disabled={currentChannelIndex === 0}
                        >
                          <ArrowLeft className="h-4 w-4 mr-2" />
                          Previous
                        </Button>
                        
                        <span className="text-sm text-muted-foreground">
                          {currentChannelIndex + 1} of {selectedChannels.length}
                        </span>
                        
                        <Button
                          variant="outline"
                          onClick={() => setCurrentChannelIndex(Math.min(selectedChannels.length - 1, currentChannelIndex + 1))}
                          disabled={currentChannelIndex === selectedChannels.length - 1}
                        >
                          Next
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 3: Review & Complete */}
              {currentStep === 3 && (
                <div className="space-y-6 text-center">
                  <div>
                    <CheckCircle className="h-16 w-16 text-success mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Setup Complete!</h3>
                    <p className="text-muted-foreground">
                      You've successfully connected {selectedChannels.length} messaging channel{selectedChannels.length !== 1 ? 's' : ''}
                    </p>
                  </div>

                  <div className="grid gap-4 max-w-md mx-auto">
                    {selectedChannels.map(channelId => {
                      const channel = availableChannels.find(c => c.id === channelId);
                      const accounts = channelAccounts[channelId] || [];
                      
                      return (
                        <div key={channelId} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                          <div className={cn("p-2 rounded-lg bg-background", channel?.color)}>
                            {channel?.icon}
                          </div>
                          <div className="flex-1 text-left">
                            <div className="font-medium">{channel?.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {accounts.length} account{accounts.length !== 1 ? 's' : ''} connected
                            </div>
                          </div>
                          <CheckCircle className="h-5 w-5 text-success" />
                        </div>
                      );
                    })}
                  </div>

                  <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                    <p className="text-sm text-card-foreground">
                      <strong>Next:</strong> Your unified inbox is ready! Start managing all your conversations in one place.
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between pt-6">
                <Button
                  variant="outline"
                  onClick={handlePrevStep}
                  disabled={currentStep === 1}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
                
                {currentStep < totalSteps ? (
                  <Button
                    onClick={handleNextStep}
                    disabled={currentStep === 1 && selectedChannels.length === 0}
                  >
                    Continue
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button onClick={handleComplete}>
                    Complete Setup
                    <CheckCircle className="h-4 w-4 ml-2" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
