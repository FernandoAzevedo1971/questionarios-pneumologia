import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AsthmaQuestionnaires from "./pages/AsthmaQuestionnaires";
import COPDQuestionnaires from "./pages/COPDQuestionnaires";
import BronchiectasisQuestionnaires from "./pages/BronchiectasisQuestionnaires";
import SmokingQuestionnaires from "./pages/SmokingQuestionnaires";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/asthma" element={<AsthmaQuestionnaires />} />
          <Route path="/copd" element={<COPDQuestionnaires />} />
          <Route path="/bronchiectasis" element={<BronchiectasisQuestionnaires />} />
          <Route path="/smoking" element={<SmokingQuestionnaires />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
