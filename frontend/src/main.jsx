import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ErrorBoundary from '@/components/common/ErrorBoundary'
import { ThemeProvider } from '@/context/ThemeProvider'
import { AuthProvider } from '@/context/AuthProvider'
import ToastProvider from '@/components/common/ToastProvider'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <App />
          <ToastProvider />
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>
)

