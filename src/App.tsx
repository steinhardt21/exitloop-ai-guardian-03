import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Invite from "./pages/Invite";
import NotFound from "./pages/NotFound";
import AdminPreview from "./pages/AdminPreview";
import IncomingPreview from "./pages/IncomingPreview";
import OutgoingPreview from "./pages/OutgoingPreview";

const queryClient = new QueryClient();

// Get Clerk publishable key from environment variables
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPubKey) {
  throw new Error("Missing Clerk Publishable Key");
}

// Protected route component that redirects authenticated users to dashboard
const ProtectedIndex = () => {
  const { user, isLoading } = useAuth();
  
  // Show loading while checking auth status
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-exitloop-purple mx-auto mb-4"></div>
          <p className="text-gray-600">Caricamento...</p>
        </div>
      </div>
    );
  }
  
  // If user is authenticated, redirect to dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  
  // If not authenticated, show landing page
  return <Index />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route 
        path="/" 
        element={<ProtectedIndex />}
      />
      <Route 
        path="/invite" 
        element={<Invite />}
      />
      <Route 
        path="/dashboard" 
        element={
          <SignedIn>
            <Dashboard />
          </SignedIn>
        } 
      />
      {/* Preview routes for screenshots (no auth required) */}
      <Route path="/AdminPreview" element={<AdminPreview />} />
      <Route path="/IncomingPreview" element={<IncomingPreview />} />
      <Route path="/OutgoingPreview" element={<OutgoingPreview />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <ClerkProvider publishableKey={clerkPubKey}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ClerkProvider>
);

export default App;