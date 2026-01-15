import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import PayslipGenerator from "./pages/Generator";
import PayslipView from "./pages/PayslipView";
import Signup from "./pages/Signup";


import { AuthProvider } from "./context/AuthContext";
import { PayslipProvider } from "./context/PayslipContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PayslipProvider>
          <Routes>
            {/* Default route */}
            <Route path="/" element={<Navigate to="/login" />} />

            {/* Public */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />


            {/* Protected */}
            <Route
              path="/generator"
              element={
                <ProtectedRoute>
                  <PayslipGenerator />
                </ProtectedRoute>
              }
            />

            <Route
              path="/payslip"
              element={
                <ProtectedRoute>
                  <PayslipView />
                </ProtectedRoute>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </PayslipProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
