import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Zap, Search, MessageSquare, Mail, Smartphone, Users, Star, ChevronLeft, Bell, BarChart3, CheckCircle } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const handleGetStarted = () => {
    setIsLoading(true);
    // Simulate loading with progress
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          // Use setTimeout to avoid updating during render
          setTimeout(() => navigate('/auth'), 0);
          return 100;
        }
        return prev + 10;
      });
    }, 100);
  };

  const handleViewDemo = () => {
    setIsLoading(true);
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          // Use setTimeout to avoid updating during render
          setTimeout(() => navigate('/dashboard'), 0);
          return 100;
        }
        return prev + 15;
      });
    }, 80);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted flex items-center justify-center">
        <div className="text-center space-y-8 max-w-md mx-auto px-6">
          <div className="w-24 h-24 bg-gradient-to-b from-primary to-accent rounded-3xl flex items-center justify-center mx-auto animate-pulse shadow-2xl shadow-primary/50">
            <span className="text-4xl text-white font-bold font-['Poppins']">F</span>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground font-['Poppins']">Loading Fusion...</h2>
            <p className="text-muted-foreground font-['Poppins']">Preparing your unified inbox</p>
            
            {/* Progress Bar */}
            <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-b from-primary to-accent transition-all duration-300 ease-out"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
            
            <p className="text-sm text-muted-foreground font-['Poppins']">
              {loadingProgress < 100 ? `Loading... ${loadingProgress}%` : 'Almost ready!'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted">
      {/* Navigation Header */}
      <header className="absolute top-0 left-0 right-0 z-50">
        <nav className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-b from-primary to-accent rounded-xl flex items-center justify-center">
                <span className="text-xl text-white font-bold font-['Poppins']">F</span>
              </div>
              <span className="text-2xl font-bold text-foreground font-['Poppins']">Fusion</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a 
                href="#features" 
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-muted-foreground hover:text-primary transition-colors font-['Poppins'] cursor-pointer"
              >
                Features
              </a>
              <a 
                href="#security" 
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('security')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-muted-foreground hover:text-primary transition-colors font-['Poppins'] cursor-pointer"
              >
                Security
              </a>
              <a 
                href="#pricing" 
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-muted-foreground hover:text-primary transition-colors font-['Poppins'] cursor-pointer"
              >
                Pricing
              </a>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/auth')}
                className="text-muted-foreground hover:text-foreground font-['Poppins']"
              >
                Sign In
              </Button>
              <Button 
                onClick={() => navigate('/auth')}
                className="bg-gradient-to-b from-primary to-accent hover:from-primary/80 hover:to-primary/90 font-['Poppins']"
              >
                Get Started
              </Button>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-20 px-6">
        <div className="container mx-auto text-center space-y-12">
          {/* Main Hero */}
          <div className="space-y-8 max-w-5xl mx-auto">
            <div className="space-y-6">
              {/* Hero Badge */}
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-full px-6 py-3 text-sm font-medium text-primary font-['Poppins'] shadow-sm">
                <div className="w-2 h-2 bg-gradient-to-r from-primary to-accent rounded-full animate-pulse"></div>
                <span>🚀 The Future of Communication is Here</span>
              </div>
              
              {/* Main Title */}
              <h1 className="text-6xl md:text-7xl font-bold text-foreground leading-tight font-['Poppins'] tracking-tight">
                <span className="text-foreground/90">Unify Your</span>
                <span className="block bg-gradient-to-b from-primary to-accent bg-clip-text text-transparent leading-none drop-shadow-sm">
                  Messages
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-['Poppins']">
                Transform chaos into clarity. Fusion brings all your messaging channels into one 
                <span className="font-semibold text-foreground"> beautiful, intelligent inbox</span>.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button 
                size="lg" 
                onClick={handleGetStarted}
                className="text-lg px-10 py-6 h-16 bg-gradient-to-b from-primary to-accent hover:from-primary/80 hover:to-primary/90 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200 font-['Poppins']"
              >
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                onClick={handleViewDemo}
                className="text-lg px-10 py-6 h-16 border-2 border-border hover:border-primary text-foreground hover:text-primary hover:bg-primary/10 font-['Poppins']"
              >
                View Live Demo
              </Button>
            </div>
            
            <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-green-500" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-yellow-500" />
                <span>Setup in 2 minutes</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-bold">✓</span>
                </div>
                <span>Free 14-day trial</span>
              </div>
            </div>
          </div>
          
          {/* Hero Visual */}
          <div className="relative max-w-6xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-red-500" />
                    <span className="font-medium text-slate-800">Gmail</span>
                  </div>
                  <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-lg p-4 border border-red-100">
                    <div className="space-y-2">
                      <div className="h-3 bg-red-200 rounded w-3/4"></div>
                      <div className="h-3 bg-red-200 rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <MessageSquare className="w-5 h-5 text-purple-500" />
                    <span className="font-medium text-slate-800">Slack</span>
                  </div>
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-100">
                    <div className="space-y-2">
                      <div className="h-3 bg-purple-200 rounded w-full"></div>
                      <div className="h-3 bg-purple-200 rounded w-2/3"></div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Smartphone className="w-5 h-5 text-green-500" />
                    <span className="font-medium text-slate-800">WhatsApp</span>
                  </div>
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-100">
                    <div className="space-y-2">
                      <div className="h-3 bg-green-200 rounded w-4/5"></div>
                      <div className="h-3 bg-green-200 rounded w-1/3"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-gradient-to-b from-purple-900/20 to-purple-800/30">
        <div className="container mx-auto">
          <div className="text-center space-y-16">
            <div className="space-y-4 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-black/80 font-['Poppins']">
                Why Choose Fusion?
              </h2>
              <p className="text-xl text-foreground font-['Poppins']">
                Built for modern teams who demand efficiency without compromise
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="text-center space-y-4 p-8 rounded-2xl bg-gradient-to-b from-blue-900/20 to-blue-800/30 border border-blue-500/30 shadow-lg shadow-blue-500/20 hover:shadow-2xl hover:shadow-blue-500/40 transform hover:scale-105 transition-all duration-200 cursor-pointer">
                <div className="w-16 h-16 bg-gradient-to-b from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-blue-500/50">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white font-['Poppins']">End-to-End Encrypted</h3>
                <p className="text-blue-100 font-['Poppins']">Your privacy is our priority. Military-grade encryption keeps your conversations secure.</p>
              </div>
              
              <div className="text-center space-y-4 p-8 rounded-2xl bg-gradient-to-b from-purple-900/20 to-purple-800/30 border border-purple-500/30 shadow-lg shadow-purple-500/20 hover:shadow-2xl hover:shadow-purple-500/40 transform hover:scale-105 transition-all duration-200 cursor-pointer">
                <div className="w-16 h-16 bg-gradient-to-b from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-purple-500/50">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white font-['Poppins']">AI-Powered Intelligence</h3>
                <p className="text-purple-100 font-['Poppins']">Smart prioritization and organization that learns from your communication patterns.</p>
              </div>
              
              <div className="text-center space-y-4 p-8 rounded-2xl bg-gradient-to-b from-green-900/20 to-green-800/30 border border-green-500/30 shadow-lg shadow-green-500/20 hover:shadow-2xl hover:shadow-green-500/40 transform hover:scale-105 transition-all duration-200 cursor-pointer">
                <div className="w-16 h-16 bg-gradient-to-b from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-green-500/50">
                  <Search className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white font-['Poppins']">Universal Search</h3>
                <p className="text-green-100 font-['Poppins']">Find any message, file, or conversation across all your channels instantly.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto">
          <div className="text-center space-y-16">
            <div className="space-y-4 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground/80 font-['Poppins']">
                Powerful Features
              </h2>
              <p className="text-xl text-muted-foreground font-['Poppins']">
                Everything you need to manage communication at scale
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="text-center space-y-4 p-6 rounded-2xl bg-white border border-slate-200 shadow-lg hover:shadow-2xl hover:shadow-primary/20 transform hover:scale-105 transition-all duration-200 cursor-pointer">
                <div className="w-16 h-16 bg-gradient-to-b from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto">
                  <MessageSquare className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground font-['Poppins']">Unified Inbox</h3>
                <p className="text-muted-foreground font-['Poppins']">All your messages in one place, organized and easy to manage.</p>
              </div>
              
              <div className="text-center space-y-4 p-6 rounded-2xl bg-white border border-slate-200 shadow-lg hover:shadow-2xl hover:shadow-primary/20 transform hover:scale-105 transition-all duration-200 cursor-pointer">
                <div className="w-16 h-16 bg-gradient-to-b from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto">
                  <Search className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground font-['Poppins']">Smart Search</h3>
                <p className="text-muted-foreground font-['Poppins']">Find any conversation across all channels with intelligent search.</p>
              </div>
              
              <div className="text-center space-y-4 p-6 rounded-2xl bg-white border border-slate-200 shadow-lg hover:shadow-2xl hover:shadow-primary/20 transform hover:scale-105 transition-all duration-200 cursor-pointer">
                <div className="w-16 h-16 bg-gradient-to-b from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground font-['Poppins']">Auto-Organization</h3>
                <p className="text-muted-foreground font-['Poppins']">AI-powered categorization and priority management.</p>
              </div>
              
              <div className="text-center space-y-4 p-6 rounded-2xl bg-white border border-slate-200 shadow-lg hover:shadow-2xl hover:shadow-primary/20 transform hover:scale-105 transition-all duration-200 cursor-pointer">
                <div className="w-16 h-16 bg-gradient-to-b from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground font-['Poppins']">Team Collaboration</h3>
                <p className="text-muted-foreground font-['Poppins']">Share conversations and collaborate seamlessly with your team.</p>
              </div>
              
              <div className="text-center space-y-4 p-6 rounded-2xl bg-white border border-slate-200 shadow-lg hover:shadow-2xl hover:shadow-primary/20 transform hover:scale-105 transition-all duration-200 cursor-pointer">
                <div className="w-16 h-16 bg-gradient-to-b from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto">
                  <Bell className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground font-['Poppins']">Smart Notifications</h3>
                <p className="text-muted-foreground font-['Poppins']">Get notified about what matters most, not every message.</p>
              </div>
              
              <div className="text-center space-y-4 p-6 rounded-2xl bg-white border border-slate-200 shadow-lg hover:shadow-2xl hover:shadow-primary/20 transform hover:scale-105 transition-all duration-200 cursor-pointer">
                <div className="w-16 h-16 bg-gradient-to-b from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground font-['Poppins']">Analytics</h3>
                <p className="text-muted-foreground font-['Poppins']">Track response times and communication patterns.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground/80 font-['Poppins']">
                Enterprise-Grade Security
              </h2>
              <p className="text-xl text-muted-foreground font-['Poppins']">
                Your data is protected with the highest security standards
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-foreground font-['Poppins']">End-to-end encryption for all messages</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-foreground font-['Poppins']">SOC 2 Type II compliance</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-foreground font-['Poppins']">GDPR and CCPA compliant</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-foreground font-['Poppins']">Regular security audits and penetration testing</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center">
                <Shield className="w-32 h-32 text-slate-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto">
          <div className="text-center space-y-16">
            <div className="space-y-4 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground/80 font-['Poppins']">
                Simple, Transparent Pricing
              </h2>
              <p className="text-xl text-muted-foreground font-['Poppins']">
                Choose the plan that fits your team's needs
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:shadow-primary/20 transform hover:scale-105 transition-all duration-200 cursor-pointer">
                <div className="text-center space-y-4">
                  <h3 className="text-2xl font-bold text-foreground font-['Poppins']">Starter</h3>
                  <div className="text-4xl font-bold text-foreground">
                    <span className="text-2xl">$</span>9
                    <span className="text-lg text-muted-foreground">/month</span>
                  </div>
                  <p className="text-muted-foreground">Perfect for small teams</p>
                </div>
                <ul className="space-y-3 mt-8">
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-foreground">Up to 5 team members</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-foreground">3 messaging channels</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-foreground">Basic search & filters</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-foreground">Email support</span>
                  </li>
                </ul>
                <Button className="w-full mt-8 font-['Poppins']">Get Started</Button>
              </div>
              
              <div className="bg-white border-2 border-primary rounded-2xl p-8 shadow-xl hover:shadow-2xl hover:shadow-primary/30 transform hover:scale-105 transition-all duration-200 cursor-pointer relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold">Most Popular</span>
                </div>
                <div className="text-center space-y-4">
                  <h3 className="text-2xl font-bold text-foreground font-['Poppins']">Professional</h3>
                  <div className="text-4xl font-bold text-foreground">
                    <span className="text-2xl">$</span>29
                    <span className="text-lg text-muted-foreground">/month</span>
                  </div>
                  <p className="text-foreground">Great for growing teams</p>
                </div>
                <ul className="space-y-3 mt-8">
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-foreground">Up to 25 team members</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-foreground">Unlimited channels</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-foreground">Advanced AI features</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-foreground">Priority support</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-foreground">Analytics dashboard</span>
                  </li>
                </ul>
                <Button className="w-full mt-8 bg-primary hover:bg-primary/90 font-['Poppins']">Get Started</Button>
              </div>
              
              <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:shadow-primary/20 transform hover:scale-105 transition-all duration-200 cursor-pointer">
                <div className="text-center space-y-4">
                  <h3 className="text-2xl font-bold text-foreground font-['Poppins']">Enterprise</h3>
                  <div className="text-4xl font-bold text-foreground">
                    <span className="text-2xl">$</span>99
                    <span className="text-lg text-muted-foreground">/month</span>
                  </div>
                  <p className="text-foreground">For large organizations</p>
                </div>
                <ul className="space-y-3 mt-8">
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-foreground">Unlimited team members</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-foreground">Custom integrations</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-foreground">Advanced security features</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-foreground">Dedicated account manager</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-foreground">Custom training & onboarding</span>
                  </li>
                </ul>
                <Button className="w-full mt-8 font-['Poppins']">Contact Sales</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-black/80 font-['Poppins']">
              Ready to Transform Your Communication?
            </h2>
            <p className="text-xl text-muted-foreground font-['Poppins']">
              Join thousands of professionals who've already unified their inboxes
            </p>
            <Button 
              size="lg" 
              onClick={handleGetStarted}
              className="text-lg px-12 py-6 h-16 bg-gradient-to-b from-primary to-accent hover:from-primary/80 hover:to-primary/90 shadow-2xl shadow-primary/50 hover:shadow-primary/70 transform hover:scale-105 transition-all duration-200 font-['Poppins']"
            >
              Start Your Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-xl font-bold">F</span>
                </div>
                <span className="text-2xl font-bold">Fusion</span>
              </div>
              <p className="text-slate-400">
                Unifying communication for the modern world
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Product</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Company</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Support</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-400">
            <p>&copy; 2024 Fusion. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;