
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TagsProvider } from "@/contexts/TagsContext";

// Lazy load components for better performance
const Index = lazy(() => import("./pages/Index"));
const Auth = lazy(() => import("./pages/Auth"));
const Onboarding = lazy(() => import("./pages/Onboarding"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Settings = lazy(() => import("./pages/Settings"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted flex items-center justify-center">
    <div className="text-center space-y-6">
      <div className="w-20 h-20 bg-gradient-to-b from-primary to-accent rounded-3xl flex items-center justify-center mx-auto animate-pulse shadow-2xl shadow-primary/50">
        <span className="text-3xl text-white font-bold font-['Poppins']">F</span>
      </div>
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-foreground font-['Poppins']">Loading Fusion...</h2>
        <p className="text-muted-foreground font-['Poppins']">Preparing your experience</p>
      </div>
    </div>
  </div>
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (replaces cacheTime in v5)
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <TagsProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/settings" element={<Settings />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TagsProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
