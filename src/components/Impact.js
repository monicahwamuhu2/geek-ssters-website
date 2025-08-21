import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Button,
  useTheme,
  alpha,
  Divider,
  Fade,
  Grow,
  Zoom
} from '@mui/material';
import { 
  People, 
  Group, 
  EventAvailable, 
  ShowChart,
  ArrowForward
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Styled components
const GlowingButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  color: theme.palette.common.white,
  borderRadius: 30,
  position: 'relative',
  overflow: 'hidden',
  padding: theme.spacing(1.5, 4),
  fontWeight: 600,
  boxShadow: `0 8px 20px ${alpha(theme.palette.primary.main, 0.3)}`,
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
    transition: 'all 0.5s ease',
  },
  '&:hover': {
    boxShadow: `0 12px 25px ${alpha(theme.palette.primary.main, 0.4)}`,
    transform: 'translateY(-3px)',
    '&::after': {
      left: '100%',
    }
  }
}));

const ImpactCounter = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius * 2,
  backgroundColor: alpha(theme.palette.background.paper, 0.8),
  backdropFilter: 'blur(10px)',
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.06)',
  transition: 'all 0.4s ease',
  height: '100%',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
    '& .counter-number': {
      color: theme.palette.primary.main
    }
  }
}));

// Animated background blob
const AnimatedCircle = styled(Box)(({ theme, delay, size, top, left, color }) => ({
  position: 'absolute',
  borderRadius: '50%',
  width: size,
  height: size,
  top,
  left,
  background: color,
  filter: 'blur(60px)',
  opacity: 0.07,
  animation: `float ${10 + delay}s infinite alternate ease-in-out`,
  animationDelay: `${delay}s`,
}));

// Main component
const ImpactSection = () => {
  const theme = useTheme();
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    // Set visible after the component mounts to trigger animations
    setVisible(true);
  }, []);

  // Counter data
  const counterData = [
    { icon: <People />, value: "750+", label: "Program Registrations" },
    { icon: <Group />, value: "40+", label: "Expert Speakers" },
    { icon: <EventAvailable />, value: "7+", label: "Events & Webinars" },
    { icon: <ShowChart />, value: "50%", label: "Completion Rate" }
  ];

  return (
    <Box
    component="section"
    id="impact-section"
    sx={{
      py: { xs: 8, md: 12 },
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: 'background.default',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
    }}
  >
      {/* Background elements */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: 'hidden',
          zIndex: 0,
        }}
      >
        {/* Animated gradient background */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.03,
            background: `radial-gradient(circle at 20% 30%, ${theme.palette.primary.light}, transparent 70%), 
                         radial-gradient(circle at 80% 70%, ${theme.palette.secondary.light}, transparent 70%)`,
            animation: 'gradientShift 15s ease infinite alternate',
          }}
        />

        {/* Particle dots */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            opacity: 0.04,
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(106, 27, 154, 0.8) 1px, transparent 0)',
            backgroundSize: '30px 30px',
          }}
        />

        {/* Animated blobs */}
        <AnimatedCircle
          color={theme.palette.primary.main}
          size="200px"
          top="10%"
          left="5%"
          delay={0}
        />
        <AnimatedCircle
          color={theme.palette.secondary.main}
          size="250px"
          top="60%"
          left="70%"
          delay={2}
        />
        <AnimatedCircle
          color="#F59E0B"
          size="150px"
          top="30%"
          left="85%"
          delay={4}
        />
      </Box>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Section header */}
        <Fade in={visible} timeout={1000}>
          <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
            <Typography 
              variant="overline" 
              component="div" 
              color="secondary"
              sx={{ 
                fontWeight: 600, 
                letterSpacing: 2,
                mb: 1
              }}
            >
              MEASURABLE SUCCESS
            </Typography>
            
            <Typography 
              variant="h2" 
              component="h2" 
              sx={{ 
                fontWeight: 800,
                mb: 2,
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
              }}
            >
              Our Impact
            </Typography>
            
            <Divider 
              sx={{ 
                width: '80px', 
                height: '4px', 
                mx: 'auto', 
                my: 3,
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                borderRadius: '2px'
              }} 
            />
            
            <Typography 
              variant="h6" 
              color="text.secondary"
              sx={{ 
                maxWidth: '800px', 
                mx: 'auto',
                mb: 2,
                fontSize: { xs: '1rem', md: '1.25rem' }
              }}
            >
              Since our founding in 2023, we've been breaking barriers and creating opportunities for women in STEM. 
              Our programs have touched hundreds of lives, building a thriving community of future tech leaders.
            </Typography>
          </Box>
        </Fade>

        {/* Key Metrics Counter */}
        <Box sx={{ mb: { xs: 8, md: 10 } }}>
          <Grid container spacing={3} justifyContent="center">
            {counterData.map((counter, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Grow
                  in={visible}
                  timeout={800 + (index * 200)}
                  style={{ transformOrigin: 'center center' }}
                >
                  <ImpactCounter>
                    <Box 
                      sx={{ 
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 1,
                        color: theme.palette.primary.main,
                        fontSize: { xs: '1.5rem', md: '2rem' }
                      }}
                    >
                      {counter.icon}
                    </Box>
                    <Typography 
                      variant="h3" 
                      className="counter-number"
                      sx={{ 
                        fontWeight: 700,
                        fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' },
                        mb: 0.5,
                        background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {counter.value}
                    </Typography>
                    <Typography 
                      variant="subtitle2" 
                      color="text.secondary"
                      align="center"
                      sx={{ 
                        fontWeight: 500,
                        fontSize: { xs: '0.75rem', md: '0.875rem' }
                      }}
                    >
                      {counter.label}
                    </Typography>
                  </ImpactCounter>
                </Grow>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Timeline showcase preview */}
        <Zoom in={visible} timeout={1500} style={{ transitionDelay: '700ms' }}>
          <Box 
            sx={{ 
              textAlign: 'center', 
              mt: 8, 
              pt: 4,
              pb: 3,
              px: { xs: 2, md: 6 },
              borderRadius: theme.shape.borderRadius * 3,
              background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <Typography 
              variant="h4" 
              component="h3" 
              gutterBottom
              sx={{ 
                fontWeight: 700,
                mb: 2,
                fontSize: { xs: '1.5rem', md: '2rem' }
              }}
            >
              Our Vision for Growth
            </Typography>
            
            <Typography 
              variant="body1" 
              color="text.secondary"
              sx={{ 
                mb: 4,
                maxWidth: '800px',
                mx: 'auto'
              }}
            >
              We're committed to expanding our reach and impact. By 2025, we aim to empower 
              over 2,000 women in STEM through mentorship, skill development, and community building.
            </Typography>
            
            <GlowingButton 
              variant="contained"
              endIcon={<ArrowForward />}
              size="large"
              sx={{ mb: 2 }}
            >
              Partner With Us
            </GlowingButton>
          </Box>
        </Zoom>
      </Container>

      {/* Animations */}
      <style jsx>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        
        @keyframes float {
          0% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(10px); }
          100% { transform: translateY(0px) translateX(0px); }
        }
        
        @keyframes shine {
          0% { left: -100%; }
          20% { left: 100%; }
          100% { left: 100%; }
        }
      `}</style>
    </Box>
  );
};

export default ImpactSection;