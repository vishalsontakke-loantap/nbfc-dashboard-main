import { StrictMode } from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { Toaster } from "@/components/ui/sonner"
import App from './App.tsx'
// import { Analytics } from "@vercel/analytics/react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <App />
      {/* <Analytics /> */}
      <Toaster />
    </Router>
  </StrictMode>
);
