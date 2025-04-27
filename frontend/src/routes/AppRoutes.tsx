import { Routes, Route, Navigate } from 'react-router-dom';
import { Login } from '../pages/Login';
import Register from '../pages/Register';
import Home from '../pages/Home';
import { useAuth } from '../auth/useAuth';

export default function AppRoutes() {
  const { token } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={token ? <Home /> : <Navigate to="/login" />} />
    </Routes>
  );
}
