
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import IdeaGenerator from "./pages/IdeaGenerator";
import NotFound from "./pages/NotFound";
import SubscriptionPage from "./pages/SubscriptionPage";
import UserProfile from "./pages/UserProfile";
import SavedIdeas from "./pages/SavedIdeas";
import AnalyticsPage from "./pages/AnalyticsPage";
import DocumentsPage from "./pages/DocumentsPage";
import BillingPage from "./pages/BillingPage";
import BusinessPlanPage from "./pages/BusinessPlanPage";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider defaultTheme="light">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/idea-generator" element={<IdeaGenerator />} />
            <Route path="/subscription" element={<SubscriptionPage />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/saved-ideas" element={<SavedIdeas />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/documents" element={<DocumentsPage />} />
            <Route path="/billing" element={<BillingPage />} />
            <Route path="/business-plan" element={<BusinessPlanPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
