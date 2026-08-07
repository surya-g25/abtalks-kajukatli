import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ErrorBoundary from '@/components/common/ErrorBoundary'
import { ThemeProvider } from '@/context/ThemeProvider'
import ToastProvider from '@/components/common/ToastProvider'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        <App />
        <ToastProvider />
      </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>
)
