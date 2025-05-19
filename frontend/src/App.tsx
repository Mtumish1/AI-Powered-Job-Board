import React from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route 
} from 'react-router-dom';
import { motion } from 'framer-motion';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import JobDetailsPage from './pages/JobDetailsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import PostJobPage from './pages/PostJobPage';
import VerifyEmailPage from './pages/VerifyEmailPage';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <motion.div 
          className="min-h-screen w-full bg-gradient-to-b from-slate-950 to-slate-900 text-slate-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Navbar />
          <main className="container mx-auto px-4 max-w-7xl">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/job/:id" element={<JobDetailsPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/post-job" element={<PostJobPage />} />
              <Route path="/auth/verify/:token" element={<VerifyEmailPage />} />
            </Routes>
          </main>
          <Footer />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </motion.div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
