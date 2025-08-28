import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminLayout } from "./components/layout/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Exceptions from "./pages/Exceptions";
import SystemConfig from "./pages/SystemConfig";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AdminLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/profiles" element={<Users />} />
            <Route path="/users/verifications" element={<Users />} />
            <Route path="/exceptions" element={<Exceptions />} />
            <Route path="/activity" element={<Dashboard />} />
            <Route path="/audit" element={<Dashboard />} />
            <Route path="/analytics" element={<Dashboard />} />
            <Route path="/system/menus" element={<Dashboard />} />
            <Route path="/system/permissions" element={<Dashboard />} />
            <Route path="/system/config" element={<SystemConfig />} />
            <Route path="/communications/notifications" element={<Dashboard />} />
            <Route path="/communications/templates" element={<Dashboard />} />
            <Route path="/communications/languages" element={<Dashboard />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AdminLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
