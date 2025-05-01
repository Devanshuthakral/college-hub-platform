
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import AuthGuard from "@/components/AuthGuard";
import LoginPage from "@/pages/LoginPage";
import Dashboard from "@/pages/Dashboard";
import AnnouncementsPage from "@/pages/AnnouncementsPage";
import EventsPage from "@/pages/EventsPage";
import PollsPage from "@/pages/PollsPage";
import FeedbackPage from "@/pages/FeedbackPage";
import NotificationsPage from "@/pages/NotificationsPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            
            <Route path="/" element={<Layout />}>
              {/* Redirect root path to dashboard or login */}
              <Route index element={<Navigate to="/dashboard" replace />} />
              
              {/* Protected routes */}
              <Route path="dashboard" element={
                <AuthGuard>
                  <Dashboard />
                </AuthGuard>
              } />
              
              <Route path="announcements" element={
                <AuthGuard>
                  <AnnouncementsPage />
                </AuthGuard>
              } />
              
              <Route path="events" element={
                <AuthGuard>
                  <EventsPage />
                </AuthGuard>
              } />
              
              <Route path="polls" element={
                <AuthGuard>
                  <PollsPage />
                </AuthGuard>
              } />
              
              <Route path="feedback" element={
                <AuthGuard>
                  <FeedbackPage />
                </AuthGuard>
              } />
              
              <Route path="notifications" element={
                <AuthGuard>
                  <NotificationsPage />
                </AuthGuard>
              } />
              
              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
