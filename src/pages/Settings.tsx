import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Settings as SettingsIcon, 
  User, 
  MessageSquare, 
  Tag, 
  Bell, 
  Shield, 
  Palette, 
  CreditCard,
  Plus,
  Trash2,
  Edit,
  Mail,
  MessageCircle,
  Phone,
  Instagram,
  Hash,
  Chrome,
  Linkedin
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useTags } from '@/contexts/TagsContext';

interface CustomTag {
  id: string;
  name: string;
  color: string;
  priority: number;
  rules: string[];
}

interface ChannelAccount {
  id: string;
  channel: string;
  email: string;
  username: string;
  profilePic?: string;
  isConnected: boolean;
}

const Settings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { customTags, addCustomTag: addTag, deleteCustomTag, updateCustomTag } = useTags();
  const [user, setUser] = useState<any>(null);
  const [channelAccounts, setChannelAccounts] = useState<ChannelAccount[]>([]);
  const [newTag, setNewTag] = useState({ name: '', color: '#CCE5FF', priority: 3, rules: [] });
  const [fontSize, setFontSize] = useState(16);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Get current user
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        navigate('/auth');
      }
    });

    setChannelAccounts([
      { id: '1', channel: 'gmail', email: 'john@example.com', username: 'John Doe', isConnected: true },
      { id: '2', channel: 'slack', email: 'john.doe@company.com', username: 'john.doe', isConnected: true },
      { id: '3', channel: 'whatsapp', email: '+1234567890', username: 'John', isConnected: true },
    ]);
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const addCustomTag = () => {
    if (newTag.name.trim()) {
      const tag: CustomTag = {
        id: Date.now().toString(),
        name: newTag.name,
        color: newTag.color,
        priority: newTag.priority,
        rules: newTag.rules
      };
      addTag(tag);
      setNewTag({ name: '', color: '#CCE5FF', priority: 3, rules: [] });
      toast({
        title: "Tag created",
        description: `"${tag.name}" tag has been added successfully.`,
      });
    }
  };

  const handleDeleteTag = (tagId: string) => {
    deleteCustomTag(tagId);
    toast({
      title: "Tag deleted",
      description: "Tag has been removed successfully.",
    });
  };

  const updateFontSize = (value: number[]) => {
    setFontSize(value[0]);
    document.documentElement.style.fontSize = `${value[0]}px`;
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const colorPalette = [
    '#FFCCCC', '#CCE5FF', '#FFF2CC', '#E5CCFF', 
    '#CCFFCC', '#FFE5CC', '#F0F0F0'
  ];

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/dashboard')}
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              <div className="w-px h-6 bg-border"></div>
              <div className="flex items-center space-x-3">
                <h1 className="text-2xl font-bold">Settings</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <span className="text-sm text-muted-foreground">
                {user.email}
              </span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* Account Section */}
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="account">
              <AccordionTrigger className="text-lg font-semibold">
                <User className="w-5 h-5 mr-3" />
                Account
              </AccordionTrigger>
              <AccordionContent>
                <Card>
                  <CardContent className="p-6 space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                        <span className="text-2xl text-white font-bold">
                          {user.email?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4 mr-2" />
                          Change Profile Picture
                        </Button>
                        <p className="text-sm text-muted-foreground">
                          Upload a new profile picture
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input id="username" defaultValue={user.email?.split('@')[0]} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" defaultValue={user.email} disabled />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AccordionContent>
            </AccordionItem>

            {/* Channels Section */}
            <AccordionItem value="channels">
              <AccordionTrigger className="text-lg font-semibold">
                <MessageSquare className="w-5 h-5 mr-3" />
                Channels
              </AccordionTrigger>
              <AccordionContent>
                <Card>
                  <CardContent className="p-6 space-y-6">
                    <div className="space-y-4">
                      {channelAccounts.map((account) => (
                        <div key={account.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                              {account.channel === 'gmail' && <Mail className="w-5 h-5 text-red-500" />}
                              {account.channel === 'slack' && <MessageSquare className="w-5 h-5 text-purple-500" />}
                              {account.channel === 'whatsapp' && <Phone className="w-5 h-5 text-green-500" />}
                              {account.channel === 'instagram' && <Instagram className="w-5 h-5 text-pink-500" />}
                              {account.channel === 'discord' && <Hash className="w-5 h-5 text-blue-500" />}
                              {account.channel === 'linkedin' && <Linkedin className="w-5 h-5 text-blue-600" />}
                            </div>
                            <div>
                              <p className="font-medium">{account.username}</p>
                              <p className="text-sm text-muted-foreground">{account.email}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant={account.isConnected ? "default" : "secondary"}>
                              {account.isConnected ? "Connected" : "Disconnected"}
                            </Badge>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-destructive">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <Button variant="outline" className="w-full">
                      <Plus className="w-4 h-4 mr-2" />
                      Add New Channel
                    </Button>
                  </CardContent>
                </Card>
              </AccordionContent>
            </AccordionItem>

            {/* Tags & Prioritization Section */}
            <AccordionItem value="tags">
              <AccordionTrigger className="text-lg font-semibold">
                <Tag className="w-5 h-5 mr-3" />
                Tags & Prioritization
              </AccordionTrigger>
              <AccordionContent>
                <Card>
                  <CardContent className="p-6 space-y-6">
                    {/* Create New Tag */}
                    <div className="space-y-4 p-4 border border-border rounded-lg">
                      <h4 className="font-medium">Create New Tag</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="tagName">Tag Name</Label>
                          <Input 
                            id="tagName" 
                            placeholder="e.g., Urgent, Client, Follow-up"
                            value={newTag.name}
                            onChange={(e) => setNewTag({ ...newTag, name: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Color</Label>
                          <div className="flex flex-wrap gap-2">
                            {colorPalette.map((color) => (
                              <button
                                key={color}
                                onClick={() => setNewTag({ ...newTag, color })}
                                className={`w-8 h-8 rounded-full border-2 ${
                                  newTag.color === color ? 'border-foreground' : 'border-border'
                                }`}
                                style={{ backgroundColor: color }}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Priority Level: {newTag.priority}</Label>
                          <Slider
                            value={[newTag.priority]}
                            onValueChange={(value) => setNewTag({ ...newTag, priority: value[0] })}
                            max={5}
                            min={1}
                            step={1}
                            className="w-full"
                          />
                        </div>
                      </div>
                      <Button onClick={addCustomTag} className="w-full">
                        <Plus className="w-4 h-4 mr-2" />
                        Create Tag
                      </Button>
                    </div>

                    {/* Existing Tags */}
                    <div className="space-y-4">
                      <h4 className="font-medium">Your Tags</h4>
                      {customTags.map((tag) => (
                        <div key={tag.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div 
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: tag.color }}
                            />
                            <span className="font-medium">{tag.name}</span>
                            <Badge variant="secondary">Priority {tag.priority}</Badge>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-destructive"
                            onClick={() => handleDeleteTag(tag.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </AccordionContent>
            </AccordionItem>

            {/* Notifications Section */}
            <AccordionItem value="notifications">
              <AccordionTrigger className="text-lg font-semibold">
                <Bell className="w-5 h-5 mr-3" />
                Notifications
              </AccordionTrigger>
              <AccordionContent>
                <Card>
                  <CardContent className="p-6 space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Browser Notifications</p>
                          <p className="text-sm text-muted-foreground">Get notified in your browser</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Email Alerts</p>
                          <p className="text-sm text-muted-foreground">Receive email notifications</p>
                        </div>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Sound Alerts</p>
                          <p className="text-sm text-muted-foreground">Play sound for new messages</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AccordionContent>
            </AccordionItem>

            {/* Privacy Section */}
            <AccordionItem value="privacy">
              <AccordionTrigger className="text-lg font-semibold">
                <Shield className="w-5 h-5 mr-3" />
                Privacy & Security
              </AccordionTrigger>
              <AccordionContent>
                <Card>
                  <CardContent className="p-6 space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Connected Apps</p>
                          <p className="text-sm text-muted-foreground">Manage third-party access</p>
                        </div>
                        <Button variant="outline" size="sm">View Apps</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Data Export</p>
                          <p className="text-sm text-muted-foreground">Download your data</p>
                        </div>
                        <Button variant="outline" size="sm">Export Data</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Delete Account</p>
                          <p className="text-sm text-muted-foreground">Permanently remove your account</p>
                        </div>
                        <Button variant="destructive" size="sm">Delete</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AccordionContent>
            </AccordionItem>

            {/* Appearance Section */}
            <AccordionItem value="appearance">
              <AccordionTrigger className="text-lg font-semibold">
                <Palette className="w-5 h-5 mr-3" />
                Appearance
              </AccordionTrigger>
              <AccordionContent>
                <Card>
                  <CardContent className="p-6 space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Dark Mode</p>
                          <p className="text-sm text-muted-foreground">Switch between light and dark themes</p>
                        </div>
                        <Switch checked={isDarkMode} onCheckedChange={toggleTheme} />
                      </div>
                      <div className="space-y-2">
                        <Label>Font Size: {fontSize}px</Label>
                        <Slider
                          value={[fontSize]}
                          onValueChange={updateFontSize}
                          max={20}
                          min={12}
                          step={1}
                          className="w-full"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AccordionContent>
            </AccordionItem>

            {/* Billing Section */}
            <AccordionItem value="billing">
              <AccordionTrigger className="text-lg font-semibold">
                <CreditCard className="w-5 h-5 mr-3" />
                Billing & Premium
              </AccordionTrigger>
              <AccordionContent>
                <Card>
                  <CardContent className="p-6 space-y-6">
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto">
                        <span className="text-2xl text-white font-bold">⭐</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">Upgrade to Premium</h3>
                        <p className="text-muted-foreground">Unlock advanced features and unlimited access</p>
                      </div>
                      <div className="text-3xl font-bold text-primary">$29<span className="text-lg text-muted-foreground">/month</span></div>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <p>✓ Unlimited message history</p>
                        <p>✓ Advanced AI prioritization</p>
                        <p>✓ Custom automation rules</p>
                        <p>✓ Priority support</p>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-primary to-accent">
                        Join Waitlist
                      </Button>
                      <p className="text-xs text-muted-foreground">
                        We'll notify you when premium is available
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default Settings;