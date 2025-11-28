import { StrictMode } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { Toaster } from "@/components/ui/sonner"
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
import AuthInitializer from './components/login/AuthInitializer.tsx'
// import { Analytics } from "@vercel/analytics/react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <AuthInitializer>
      <Router basename={import.meta.env.BASE_URL}>
        <App />
        {/* <Analytics /> */}
        <Toaster />
      </Router>
      </AuthInitializer>
    </Provider>

  </StrictMode>
);
