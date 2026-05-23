import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from '@/modules/Home/Home';
import PrivacyPolicy from '@/modules/PrivacyPolicy/PrivacyPolicy';
import { Show } from '@clerk/react';
import RequireDashboardAccess from './components/auth/RequireDashboardAccess';
import Login from '@/modules/Auth/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Protected Dashboard Route */}
        <Route element={<RequireDashboardAccess />}>
          <Route path="/dashboard" element={<Home />} />
        </Route>

        {/* Public Root Route */}
        <Route
          path="/"
          element={
            <>
              <Show when="signed-in">
                <Navigate to="/dashboard" replace />
              </Show>
              <Show when="signed-out">
                <Login />
              </Show>
            </>
          }
        />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
