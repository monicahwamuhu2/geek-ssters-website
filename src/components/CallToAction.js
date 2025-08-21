import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  TextField,
  Paper,
  Fade,
  useTheme,
  alpha,
  Chip,
  //useMediaQuery,
  Snackbar,
  Alert
} from '@mui/material';
import {
  Send,
  ArrowForward
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Styled components
const GradientText = styled(Typography)(({ theme }) => ({
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  color: 'transparent',
  backgroundImage: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  fontWeight: 'bold',
}));

const AnimatedButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
  borderRadius: 30,
  padding: theme.spacing(1.5, 4),
  color: theme.palette.common.white,
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  boxShadow: `0 6px 20px ${alpha(theme.palette.primary.main, 0.4)}`,
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: `0 10px 25px ${alpha(theme.palette.primary.main, 0.5)}`,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
    transition: 'all 0.4s ease',
  },
  '&:hover::after': {
    left: '100%',
  },
}));

const SubscribeWrapper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2), // Reduced padding
  borderRadius: theme.shape.borderRadius * 2,
  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.1)} 0%, ${alpha(theme.palette.secondary.light, 0.1)} 100%)`,
  backdropFilter: 'blur(10px)',
  position: 'relative',
  overflow: 'hidden',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
}));

const FloatingElement = styled(Box)(({ theme, top, left, right, delay, size }) => ({
  position: 'absolute',
  width: size || 100,
  height: size || 100,
  borderRadius: '50%',
  background: `radial-gradient(circle, ${alpha(theme.palette.primary.light, 0.15)}, ${alpha(theme.palette.secondary.light, 0.05)})`,
  filter: 'blur(15px)',
  top,
  left,
  right,
  zIndex: 0,
  animation: `float ${delay || 10}s infinite ease-in-out alternate`,
}));

const CallToAction = () => {
  const theme = useTheme();
  //const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  //const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const sectionRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Check if section is in viewport
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8 && rect.bottom > 0) {
          setIsVisible(true);
        }
      }
    };

    const handleMouseMove = (e) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    // Initial check
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Calculate subtle movement based on mouse position
  const calculateParallax = (factor) => {
    if (!sectionRef.current) return {};
    
    const x = (mousePosition.x / sectionRef.current.offsetWidth) - 0.5;
    const y = (mousePosition.y / sectionRef.current.offsetHeight) - 0.5;
    
    return {
      transform: `translate(${x * factor}px, ${y * factor}px)`
    };
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setIsValidEmail(true);
  };

  const handleSubscribe = () => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    
    if (emailPattern.test(email)) {
      setSnackbarOpen(true);
      setEmail('');
    } else {
      setIsValidEmail(false);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Box
      ref={sectionRef}
      id="join-us"
      sx={{
        position: 'relative',
        backgroundColor: '#f9f4ff',
        py: { xs: 3, md: 5 }, // Further reduced padding
        overflow: 'hidden',
      }}
    >
      {/* Background decorative elements */}
      <Box sx={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        background: 'radial-gradient(circle at 80% 10%, rgba(156, 39, 176, 0.05) 0%, transparent 60%)',
        zIndex: 0,
      }} />

      <Box sx={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        opacity: 0.2,
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%236a1b9a" fill-opacity="0.05" fill-rule="evenodd"%3E%3Ccircle cx="3" cy="3" r="3"/%3E%3Ccircle cx="13" cy="13" r="3"/%3E%3C/g%3E%3C/svg%3E")',
        backgroundSize: '30px 30px',
        zIndex: 0,
      }} />

      {/* Floating elements */}
      <FloatingElement top="5%" left="10%" delay="8" size={120} style={calculateParallax(-15)} />
      <FloatingElement top="60%" left="5%" delay="12" size={80} style={calculateParallax(-10)} />
      <FloatingElement top="20%" right="15%" delay="10" size={150} style={calculateParallax(-20)} />
      <FloatingElement top="70%" right="10%" delay="15" size={100} style={calculateParallax(-15)} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        {/* Section heading */}
        <Fade in={isVisible} timeout={1000}>
          <Box sx={{ textAlign: 'center', mb: { xs: 2, md: 3 } }}> {/* Further reduced margin */}
            <Chip
              label="Join Our Community"
              color="secondary"
              size="medium"
              sx={{
                mb: 1, // Reduced margin
                fontWeight: 'bold',
                px: 2,
                py: 0.5, // Reduced padding
                borderRadius: 6,
                '& .MuiChip-label': {
                  px: 1,
                }
              }}
            />
            <GradientText
              variant="h2"
              component="h2"
              sx={{
                mb: 1, // Reduced margin
                fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.8rem' }, // Slightly smaller
                textAlign: 'center',
              }}
            >
              Break the Silicon Ceiling with Us
            </GradientText>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{
                maxWidth: 700,
                mx: 'auto',
                mb: { xs: 1.5, md: 2 }, // Reduced margin
                px: { xs: 2, md: 0 },
                lineHeight: 1.5, // Tighter line height
                fontSize: { xs: '0.95rem', md: '1.1rem' }, // Slightly smaller
              }}
            >
              Join a vibrant community of women in STEM where you can connect, learn,
              and grow together. Embrace diversity and celebrate your unique talents.
            </Typography>
          </Box>
        </Fade>

        {/* Subscribe section */}
        <Fade in={isVisible} timeout={1000} style={{ transitionDelay: '300ms' }}>
          <SubscribeWrapper>
            <Grid container spacing={2} alignItems="center"> {/* Reduced spacing */}
              <Grid item xs={12} md={6}>
                <Box sx={{ pr: { md: 2 } }}> {/* Reduced padding */}
                  <Typography
                    variant="h4"
                    component="h3"
                    sx={{ 
                      mb: 1, // Reduced margin
                      fontWeight: 'bold',
                      color: theme.palette.primary.dark,
                      fontSize: { xs: '1.3rem', md: '1.8rem' } // Smaller
                    }}
                  >
                    Stay Updated on Our Journey
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mb: 1.5, lineHeight: 1.5 }} // Reduced margin and line height
                  >
                    Subscribe to our newsletter to receive updates on upcoming events, workshops, 
                    and opportunities empowering women in STEM.
                  </Typography>

                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'flex-start',
                    mb: { xs: 1, md: 0 }, // Reduced margin
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: { xs: 1, sm: 0 }, // Less gap
                  }}>
                    <TextField
                      variant="outlined"
                      placeholder="Your email address"
                      fullWidth
                      value={email}
                      onChange={handleEmailChange}
                      error={!isValidEmail}
                      helperText={!isValidEmail ? "Please enter a valid email" : ""}
                      size="small" // Smaller field
                      InputProps={{
                        sx: {
                          borderRadius: '50px',
                          backgroundColor: 'white',
                          pr: { sm: 0 },
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: isValidEmail ? 'rgba(0, 0, 0, 0.1)' : undefined,
                          },
                        }
                      }}
                      sx={{
                        maxWidth: { sm: '70%' },
                        width: { xs: '100%', sm: '70%' },
                        '& .MuiFormHelperText-root': {
                          mx: 2,
                          mt: 0.5,
                        }
                      }}
                    />
                    <AnimatedButton
                      variant="contained"
                      endIcon={<Send />}
                      onClick={handleSubscribe}
                      disableElevation
                      size="medium" // Smaller button
                      sx={{
                        height: 40, // Smaller height
                        ml: { sm: -2 },
                        width: { xs: '100%', sm: 'auto' },
                        zIndex: 1,
                      }}
                    >
                      Subscribe
                    </AnimatedButton>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    position: 'relative',
                  }}
                >
                  {/* Animated elements to show connection */}
                  <Box
                    sx={{
                      position: 'relative',
                      width: '100%',
                      height: { xs: 170, md: 200 }, // Further reduced height
                      overflow: 'hidden',
                      borderRadius: 4,
                      boxShadow: 'rgba(99, 99, 99, 0.2) 0px 8px 24px -3px',
                    }}
                  >
                    <Box
                      sx={{
                        width: '100%',
                        height: '100%',
                        backgroundImage: 'url(/images/community.jpg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        transition: 'transform 0.5s ease',
                        '&:hover': {
                          transform: 'scale(1.05)',
                        },
                        filter: 'brightness(0.9)',
                      }}
                    />
                    
                    <Box
                      sx={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(0deg, rgba(106, 27, 154, 0.4) 0%, rgba(0, 0, 0, 0) 70%)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        p: 2, // Smaller padding
                      }}
                    >
                      <Typography
                        variant="h5"
                        component="div"
                        sx={{
                          color: 'white',
                          fontWeight: 'bold',
                          textShadow: '0 2px 5px rgba(0,0,0,0.2)',
                          fontSize: { xs: '1.2rem', md: '1.5rem' }, // Smaller
                        }}
                      >
                        Join 400+ Members
                      </Typography>
                      <Typography
                        variant="body2" // Smaller text
                        sx={{
                          color: 'white',
                          textShadow: '0 2px 5px rgba(0,0,0,0.2)',
                        }}
                      >
                        Breaking barriers together
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </SubscribeWrapper>
        </Fade>

        {/* Final CTA - Single button */}
        <Fade in={isVisible} timeout={1000} style={{ transitionDelay: '450ms' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: { xs: 2.5, md: 3.5 }, // Adjusted margin
              alignItems: 'center',
            }}
          >
            <Button
              variant="contained"
              color="primary"
              size="large"
              endIcon={<ArrowForward />}
              sx={{
                borderRadius: 30,
                px: 4,
                py: 1.25, // Smaller padding
                background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.dark} 90%)`,
                boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.4)}`,
                '&:hover': {
                  boxShadow: `0 6px 25px ${alpha(theme.palette.primary.main, 0.6)}`,
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
                fontWeight: 'bold',
                fontSize: '0.95rem', // Slightly smaller
              }}
            >
              Become a Member
            </Button>
          </Box>
        </Fade>
      </Container>

      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Thank you for subscribing to our newsletter!
        </Alert>
      </Snackbar>

      {/* CSS for animations */}
      <style jsx="true">{`
        @keyframes float {
          0% { transform: translate(0, 0); }
          50% { transform: translate(-10px, 10px); }
          100% { transform: translate(0, 0); }
        }
        
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(1); opacity: 0.8; }
        }
        
        @keyframes shine {
          0% { left: -100%; }
          50%, 100% { left: 100%; }
        }
      `}</style>
    </Box>
  );
};

export default CallToAction;