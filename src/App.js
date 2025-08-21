// App.js
import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import HeroSection from './components/HeroSection';
import './App.css';
import MissionSection from './components/MissionSection';
import PillarsSection from './components/PillarsSection';
import EventsAndWebinarsSection from './components/Events';
import ImpactSection from './components/Impact';
import TeamSection from './components/Team';

import TestimonialsSection from './components/TestimonialsSection';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';

// Custom theme with purple-based royal palette
const theme = createTheme({
  palette: {
    primary: {
      main: '#6a1b9a', // deep purple
      light: '#9c27b0',
      dark: '#4a148c',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ff9800', // orange for CTAs
      light: '#ffb74d',
      dark: '#f57c00',
      contrastText: '#000000',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#212121',
      secondary: '#757575',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 600,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 30,
          padding: '10px 20px',
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 15px rgba(0,0,0,0.2)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(45deg, #6a1b9a 30%, #9c27b0 90%)',
        },
        containedSecondary: {
          background: 'linear-gradient(45deg, #f57c00 30%, #ff9800 90%)',
        },
      },
    },
  },
});

// HomePage component to contain all the sections
const HomePage = () => {
  return (
    <>
      <HeroSection />
      <MissionSection />
      <PillarsSection />
      <EventsAndWebinarsSection />
      <ImpactSection />
      <TeamSection />
      <TestimonialsSection />
      <CallToAction />
      <Footer />
    </>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
           
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;