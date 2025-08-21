import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  User, Settings, Bell, Shield, Eye, CreditCard, Plus, 
  Mail, MessageSquare, Phone, Instagram, Edit3, Trash2,
  Download, X, Upload, Palette, Monitor, Sun, Moon
} from 'lucide-react';
import { cn } from '@/lib/utils';

const tagColors = [
  { name: 'Soft Red', value: '#de4040', preview: 'bg-[#de4040]' },
  { name: 'Soft Blue', value: '#463ed6', preview: 'bg-[#463ed6]' },
  { name: 'Soft Green', value: '#22c55e', preview: 'bg-[#22c55e]' },
  { name: 'Soft Yellow', value: '#eab308', preview: 'bg-[#eab308]' },
  { name: 'Soft Purple', value: '#a855f7', preview: 'bg-[#a855f7]' },
  { name: 'Soft Gray', value: '#6b7280', preview: 'bg-[#6b7280]' },
  { name: 'Soft Orange', value: '#f97316', preview: 'bg-[#f97316]' },
  { name: 'Soft Pink', value: '#ec4899', preview: 'bg-[#ec4899]' }
];

const connectedChannels = [
  { id: 'gmail-1', name: 'Gmail', account: 'john@company.com', icon: Mail, verified: true },
  { id: 'gmail-2', name: 'Gmail', account: 'personal@gmail.com', icon: Mail, verified: true },
  { id: 'slack-1', name: 'Slack', account: 'Tech Team', icon: MessageSquare, verified: true },
  { id: 'whatsapp-1', name: 'WhatsApp', account: 'Personal', icon: Phone, verified: false },
  { id: 'instagram-1', name: 'Instagram', account: '@fusionapp', icon: Instagram, verified: true }
];

export function SettingsPage() {
  const [customTags, setCustomTags] = useState([
    { id: '1', name: 'Urgent', color: '#de4040', priority: 5 },
    { id: '2', name: 'Client', color: '#463ed6', priority: 4 },
    { id: '3', name: 'Personal', color: '#22c55e', priority: 2 }
  ]);
  const [newTagName, setNewTagName] = useState('');
  const [newTagColor, setNewTagColor] = useState('#de4040');
  const [newTagPriority, setNewTagPriority] = useState([3]);
  const [theme, setTheme] = useState('system');
  const [fontSize, setFontSize] = useState([16]);

  const addCustomTag = () => {
    if (!newTagName.trim()) return;
    
    const newTag = {
      id: Date.now().toString(),
      name: newTagName,
      color: newTagColor,
      priority: newTagPriority[0]
    };
    
    setCustomTags([...customTags, newTag]);
    setNewTagName('');
    setNewTagColor('#de4040');
    setNewTagPriority([3]);
  };

  const removeTag = (id: string) => {
    setCustomTags(customTags.filter(tag => tag.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center">
            <Settings className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Settings</h1>
            <p className="text-muted-foreground">Manage your Fusion preferences and account</p>
          </div>
        </div>

        <Tabs defaultValue="account" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="account" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Account
            </TabsTrigger>
            <TabsTrigger value="channels" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Channels
            </TabsTrigger>
            <TabsTrigger value="tags" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Tags
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Privacy
            </TabsTrigger>
            <TabsTrigger value="billing" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Billing
            </TabsTrigger>
          </TabsList>

          {/* Account Settings */}
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your profile and account preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile Picture */}
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="/placeholder-avatar.jpg" />
                    <AvatarFallback className="text-lg">JD</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Photo
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      Recommended: Square image, at least 400x400px
                    </p>
                  </div>
                </div>

                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Display Name</Label>
                    <Input id="username" defaultValue="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="john@company.com" disabled />
                  </div>
                </div>

                {/* Appearance */}
                <Accordion type="single" collapsible>
                  <AccordionItem value="appearance">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <Eye className="h-4 w-4" />
                        Appearance
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <div className="space-y-2">
                        <Label>Theme</Label>
                        <Select value={theme} onValueChange={setTheme}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="light">
                              <div className="flex items-center gap-2">
                                <Sun className="h-4 w-4" />
                                Light
                              </div>
                            </SelectItem>
                            <SelectItem value="dark">
                              <div className="flex items-center gap-2">
                                <Moon className="h-4 w-4" />
                                Dark
                              </div>
                            </SelectItem>
                            <SelectItem value="system">
                              <div className="flex items-center gap-2">
                                <Monitor className="h-4 w-4" />
                                System
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Font Size: {fontSize[0]}px</Label>
                        <Slider
                          value={fontSize}
                          onValueChange={setFontSize}
                          max={20}
                          min={12}
                          step={1}
                          className="w-full"
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <div className="flex gap-2">
                  <Button>Save Changes</Button>
                  <Button variant="destructive">Logout</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Channels */}
          <TabsContent value="channels">
            <Card>
              <CardHeader>
                <CardTitle>Connected Channels</CardTitle>
                <CardDescription>Manage your messaging channel connections</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {connectedChannels.map((channel) => {
                  const Icon = channel.icon;
                  return (
                    <div key={channel.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-background rounded-lg">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="font-medium">{channel.name}</div>
                          <div className="text-sm text-muted-foreground">{channel.account}</div>
                        </div>
                        <Badge variant={channel.verified ? "default" : "secondary"}>
                          {channel.verified ? "Verified" : "Pending"}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit3 className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
                
                <Button variant="outline" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Channel
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tags & Prioritization */}
          <TabsContent value="tags">
            <Card>
              <CardHeader>
                <CardTitle>Custom Tags & Prioritization</CardTitle>
                <CardDescription>Create and manage your custom tags for message organization</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Existing Tags */}
                <div className="space-y-3">
                  <Label>Your Tags</Label>
                  <div className="space-y-2">
                    {customTags.map((tag) => (
                      <div key={tag.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: tag.color }}
                          />
                          <span className="font-medium">{tag.name}</span>
                          <Badge variant="outline">Priority {tag.priority}</Badge>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => removeTag(tag.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Add New Tag */}
                <div className="space-y-4 p-4 bg-muted rounded-lg">
                  <Label>Create New Tag</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="tag-name">Tag Name</Label>
                      <Input
                        id="tag-name"
                        placeholder="e.g., Urgent, Client"
                        value={newTagName}
                        onChange={(e) => setNewTagName(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Color</Label>
                      <div className="grid grid-cols-4 gap-2">
                        {tagColors.map((color) => (
                          <button
                            key={color.value}
                            onClick={() => setNewTagColor(color.value)}
                            className={cn(
                              "w-8 h-8 rounded-full border-2 transition-transform hover:scale-110",
                              color.preview,
                              newTagColor === color.value ? "border-foreground" : "border-transparent"
                            )}
                            title={color.name}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Priority: {newTagPriority[0]}</Label>
                      <Slider
                        value={newTagPriority}
                        onValueChange={setNewTagPriority}
                        max={5}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={addCustomTag} disabled={!newTagName.trim()}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Tag
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Control how and when you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="browser-notifications">Browser Notifications</Label>
                      <p className="text-sm text-muted-foreground">Get notified for new messages</p>
                    </div>
                    <Switch id="browser-notifications" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive email summaries</p>
                    </div>
                    <Switch id="email-notifications" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="high-priority">High Priority Only</Label>
                      <p className="text-sm text-muted-foreground">Only notify for high priority messages</p>
                    </div>
                    <Switch id="high-priority" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy */}
          <TabsContent value="privacy">
            <Card>
              <CardHeader>
                <CardTitle>Privacy & Security</CardTitle>
                <CardDescription>Manage your data and connected applications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Connected Apps</Label>
                      <p className="text-sm text-muted-foreground">5 apps have access to your data</p>
                    </div>
                    <Button variant="outline">Manage Access</Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Data Export</Label>
                      <p className="text-sm text-muted-foreground">Download your data</p>
                    </div>
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Export Data
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Delete Account</Label>
                      <p className="text-sm text-muted-foreground">Permanently delete your account</p>
                    </div>
                    <Button variant="destructive">Delete Account</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing */}
          <TabsContent value="billing">
            <Card>
              <CardHeader>
                <CardTitle>Billing & Subscription</CardTitle>
                <CardDescription>Manage your subscription and billing information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center space-y-4">
                  <div className="text-4xl font-bold text-primary">$29</div>
                  <div className="text-muted-foreground">/month</div>
                  <Badge variant="secondary">Premium Plan</Badge>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                    <h3 className="font-semibold mb-2">Premium Features</h3>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Unlimited messaging channels</li>
                      <li>• Advanced search and filters</li>
                      <li>• Custom tags and automation</li>
                      <li>• Priority support</li>
                      <li>• Call forwarding via Twilio</li>
                    </ul>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-4">
                      Join the waitlist for our premium features
                    </p>
                    <Button className="w-full max-w-sm">
                      Join Premium Waitlist
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
