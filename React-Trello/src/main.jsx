import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { TareasProvider } from './contexts/tasks.jsx'
import { ThemeProvider } from './contexts/theme.jsx';

createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <TareasProvider>
      <App />
    </TareasProvider>
  </ThemeProvider>
)
