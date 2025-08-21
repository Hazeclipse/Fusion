import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <div className="w-24 h-24 gradient-primary rounded-3xl flex items-center justify-center mx-auto">
            <span className="text-4xl text-primary-foreground font-bold">F</span>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-6xl font-bold text-foreground">
              Unify Your Messages
            </h1>
            <h2 className="text-4xl font-light text-muted-foreground">
              Never Miss a Beat
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Fusion brings all your messaging channels into one beautiful, unified inbox. 
              Gmail, Slack, WhatsApp, Instagram - all in perfect harmony.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="text-lg px-8 py-4 h-14"
              onClick={() => navigate('/auth')}
            >
              Get Started Free
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-4 h-14"
              onClick={() => navigate('/dashboard')}
            >
              View Demo
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="space-y-3">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto">
                <span className="w-3 h-3 bg-success rounded-full"></span>
              </div>
              <h3 className="text-lg font-semibold">End-to-End Encrypted</h3>
              <p className="text-muted-foreground">Your privacy is paramount</p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto">
                <span className="w-3 h-3 bg-primary rounded-full"></span>
              </div>
              <h3 className="text-lg font-semibold">Smart Organization</h3>
              <p className="text-muted-foreground">AI-powered priority sorting</p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto">
                <span className="w-3 h-3 bg-accent rounded-full"></span>
              </div>
              <h3 className="text-lg font-semibold">Universal Search</h3>
              <p className="text-muted-foreground">Find anything, anywhere</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;