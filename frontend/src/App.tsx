import React from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route 
} from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import JobDetailsPage from './pages/JobDetailsPage';
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
            </Routes>
          </main>
          <Footer />
        </motion.div>
      </Router>
    </ThemeProvider>
  );
}

export default App;