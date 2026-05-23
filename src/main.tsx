import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ThemeProvider } from './components/ui/theme-provider.tsx';
import Provider from './Provider.tsx';
import { ClerkProvider } from '@clerk/react';
import AuthSync from './components/common/AuthSync.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AuthSync>
          <Provider>
            <App />
          </Provider>
        </AuthSync>
      </ThemeProvider>
    </ClerkProvider>
  </StrictMode>
);
