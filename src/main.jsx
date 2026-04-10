import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { QueryProvider } from './providers/QueryProvider.jsx';
import { ToastProvider } from './contexts/ToastContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </QueryProvider>
  </StrictMode>,
);
