import React, { useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Grid,
  alpha
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// This wrapper will ensure proper spacing from the navbar
const HeroWrapper = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(2),
  background: theme.palette.background.default,
  overflow: 'visible',
  position: 'relative',
  [theme.breakpoints.up('sm')]: {
    paddingTop: theme.spacing(4),
  },
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(3),
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    width: '40%',
    height: '100%',
    background: `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.05)} 0%, ${alpha(theme.palette.primary.main, 0.1)} 100%)`,
    clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 25% 100%)',
    zIndex: 0,
    [theme.breakpoints.down('md')]: {
      width: '100%',
      clipPath: 'none',
      opacity: 0.05,
    },
  },
}));

const HeroContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  position: 'relative',
  color: theme.palette.text.primary,
  overflow: 'hidden',
  minHeight: 'calc(100vh - 120px)',
  [theme.breakpoints.down('sm')]: {
    minHeight: 'auto',
  },
  [theme.breakpoints.up('md')]: {
    minHeight: 'calc(85vh - 70px)',
  },
}));

// Subtle background shape
const BackgroundShape = styled(Box)(({ theme }) => ({
  position: 'absolute',
  right: 0,
  top: '10%',
  width: '50%',
  height: '80%',
  background: alpha(theme.palette.background.paper, 0.5),
  clipPath: 'polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%)',
  zIndex: 0,
  [theme.breakpoints.down('md')]: {
    width: '40%',
  },
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));

const FloatingCircle = styled(Box)(({ theme, size, top, left, right, delay }) => ({
  position: 'absolute',
  width: size,
  height: size,
  borderRadius: '50%',
  background: alpha(theme.palette.secondary.main, 0.15),
  top,
  left,
  right,
  zIndex: 0,
  animation: `float 8s ease-in-out ${delay} infinite`,
  '@keyframes float': {
    '0%, 100%': {
      transform: 'translateY(0)',
    },
    '50%': {
      transform: 'translateY(-20px)',
    },
  },
}));

const HeroImageContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 2,
  [theme.breakpoints.up('md')]: {
    justifyContent: 'flex-end',
    paddingRight: theme.spacing(4),
  },
}));

const HeroImage = styled('img')(({ theme }) => ({
  maxWidth: '100%',
  maxHeight: '450px',
  objectFit: 'contain',
  borderRadius: 24,
  boxShadow: '0 20px 50px rgba(0, 0, 0, 0.15)',
  transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  transform: 'perspective(1000px) rotateY(-5deg) translateZ(0)',
  filter: 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.08))',
  '&:hover': {
    transform: 'perspective(1000px) rotateY(-2deg) translateZ(20px)',
  },
  [theme.breakpoints.up('md')]: {
    maxHeight: '520px',
  },
}));

const ScrollButton = styled(Box)(({ theme }) => ({
  width: 45,
  height: 45,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  color: theme.palette.common.white,
  boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
  margin: '0 auto',
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    width: 50,
    height: 50,
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(3),
  },
  transition: 'all 0.3s ease',
  zIndex: 5,
  animation: 'pulse 2s infinite',
  '@keyframes pulse': {
    '0%': {
      transform: 'translateY(0)',
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
    },
    '50%': {
      transform: 'translateY(-10px)',
      boxShadow: '0 15px 25px rgba(0, 0, 0, 0.15)',
    },
    '100%': {
      transform: 'translateY(0)',
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
    },
  },
  '&:hover': {
    background: theme.palette.primary.dark,
    transform: 'translateY(-5px)',
    boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)',
    animation: 'none',
  },
}));

const PrimaryButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.dark} 90%)`,
  color: theme.palette.common.white,
  transition: 'all 0.3s ease',
  boxShadow: `0 8px 20px ${alpha(theme.palette.primary.main, 0.4)}`,
  overflow: 'hidden',
  position: 'relative',
  zIndex: 1,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: `linear-gradient(45deg, ${theme.palette.primary.dark} 30%, ${theme.palette.primary.main} 90%)`,
    zIndex: -1,
    transition: 'opacity 0.3s ease',
    opacity: 0,
  },
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: `0 12px 25px ${alpha(theme.palette.primary.main, 0.5)}`,
    '&::before': {
      opacity: 1,
    },
  },
  '& .MuiButton-endIcon': {
    marginLeft: theme.spacing(1),
    transition: 'transform 0.3s ease',
  },
  '&:hover .MuiButton-endIcon': {
    transform: 'translateX(4px)',
  },
}));

const SecondaryButton = styled(Button)(({ theme }) => ({
  borderColor: theme.palette.primary.main,
  color: theme.palette.primary.main,
  borderWidth: 2,
  position: 'relative',
  overflow: 'hidden',
  zIndex: 1,
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: alpha(theme.palette.primary.main, 0.1),
    zIndex: -1,
    transform: 'scaleX(0)',
    transformOrigin: 'right',
    transition: 'transform 0.3s ease',
  },
  '&:hover': {
    borderWidth: 2,
    borderColor: theme.palette.primary.main,
    background: 'transparent',
    transform: 'translateY(-3px)',
    boxShadow: `0 5px 15px ${alpha(theme.palette.primary.main, 0.2)}`,
    '&::after': {
      transform: 'scaleX(1)',
      transformOrigin: 'left',
    },
  },
}));

// Animation keyframes
const keyframes = `
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const HeroSection = () => {
  const theme = useTheme();
  
  // Add animation keyframes to document
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = keyframes;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  const scrollToContent = () => {
    const nextSection = document.getElementById('mission-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Fallback if selector doesn't exist
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
      });
    }
  };

  return (
    <HeroWrapper id="hero-section">
      {/* Floating decorative elements */}
      <FloatingCircle size="100px" top="15%" left="5%" delay="0s" />
      <FloatingCircle size="60px" top="60%" left="15%" delay="1s" />
      <FloatingCircle size="80px" top="20%" right="10%" delay="2s" />
      
      <HeroContainer>
        <BackgroundShape />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, py: { xs: 3, sm: 4, md: 6 }, px: { xs: 2, sm: 3, md: 3 } }}> 
          <Grid 
            container 
            spacing={{ xs: 2, sm: 3, md: 4 }}
            alignItems="center" 
            sx={{ 
              position: 'relative',
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              flexWrap: { xs: 'wrap', md: 'nowrap' },
              margin: { xs: '0 auto', md: 0 },
              width: '100%'
            }}>
            
            {/* Content on the left */}
            <Grid 
              item 
              xs={12} 
              md={6} 
              sx={{ 
                width: { xs: '100%', md: '50%' }, 
                flexShrink: 0,
                order: { xs: 1, md: 1 },
                px: { xs: 2, sm: 3, md: 2 }
              }}>
              <Box sx={{ 
                mb: { xs: 3, md: 5 },
                pr: { md: 5 },
                position: 'relative',
                zIndex: 3,
                textAlign: { xs: 'center', sm: 'left' },
                maxWidth: { xs: '100%', md: '100%' }
              }}>
                <Typography 
                  variant="subtitle1" 
                  component="div" 
                  sx={{ 
                    mb: 1.5,
                    fontWeight: 600,
                    color: theme.palette.primary.main,
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    animation: 'slideUp 1s ease-out',
                    display: 'inline-block',
                    position: 'relative',
                    paddingLeft: '10px',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      left: 0,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '3px',
                      height: '100%',
                      background: theme.palette.primary.main,
                      borderRadius: '3px',
                    },
                  }}
                >
                  Welcome to Geek-ssters
                </Typography>
                <Typography 
                  variant="h2" 
                  component="h1" 
                  sx={{ 
                    mb: 2.5,
                    fontWeight: 800,
                    fontSize: { xs: '1.8rem', sm: '2.4rem', md: '3rem', lg: '3.5rem' },
                    lineHeight: { xs: 1.2, md: 1.1 },
                    animation: 'slideUp 1s ease-out 0.2s backwards',
                    background: `linear-gradient(45deg, ${theme.palette.text.primary} 30%, ${theme.palette.primary.main} 90%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: '-0.5px',
                    wordBreak: 'break-word',
                  }}
                >
                  Breaking the Silicon Ceiling with Style and Sass
                </Typography>
                <Typography 
                  variant="body1" 
                  component="div" 
                  sx={{ 
                    mb: { xs: 3, md: 4 },
                    fontSize: { xs: '1rem', md: '1.1rem' },
                    fontWeight: 400,
                    color: theme.palette.text.secondary,
                    maxWidth: '600px',
                    animation: 'slideUp 1s ease-out 0.4s backwards',
                    lineHeight: 1.6,
                  }}
                >
                  A vibrant community of brilliant and ambitious women in STEM, fostering an inclusive space where girls can thrive, connect, and excel in science, technology, engineering, and mathematics.
                </Typography>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    gap: { xs: 2, sm: 2.5 },
                    flexWrap: { xs: 'wrap', sm: 'nowrap' },
                    animation: 'slideUp 1s ease-out 0.6s backwards',
                    width: '100%',
                    justifyContent: { xs: 'center', sm: 'flex-start' },
                  }}
                >
                  <PrimaryButton 
                    variant="contained" 
                    size="large"
                    endIcon={<ArrowForwardIcon />}
                    onClick={() => {
                      const joinSection = document.getElementById('join-us');
                      if (joinSection) {
                        joinSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    sx={{
                      px: { xs: 2.5, sm: 3.5 },
                      py: 1.5,
                      borderRadius: '30px',
                      fontSize: { xs: '0.9rem', sm: '1rem' },
                      fontWeight: 600,
                      minWidth: { xs: '150px', sm: '180px' },
                      mb: { xs: 1, sm: 0 },
                      width: { xs: '100%', sm: 'auto' },
                    }}
                  >
                    Join Our Community
                  </PrimaryButton>
                  <SecondaryButton 
                    variant="outlined" 
                    color="primary"
                    onClick={() => {
                      const missionSection = document.getElementById('mission-section');
                      if (missionSection) {
                        missionSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    sx={{ 
                      px: { xs: 2.5, sm: 3.5 },
                      py: 1.5,
                      borderRadius: '30px',
                      fontWeight: 600,
                      minWidth: { xs: '140px', sm: '160px' },
                      width: { xs: '100%', sm: 'auto' },
                    }}
                    size="large"
                  >
                    Learn More
                  </SecondaryButton>
                </Box>
              </Box>
            </Grid>
            
            {/* Image on the right */}
            <Grid 
              item 
              xs={12} 
              md={6} 
              sx={{ 
                width: { xs: '100%', md: '50%' },
                flexShrink: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                minHeight: { xs: '260px', sm: '300px', md: 'auto' },
                order: { xs: 2, md: 2 },
                mt: { xs: 0, md: 0 },
                px: { xs: 2, sm: 3, md: 2 }
              }}>
              <HeroImageContainer sx={{ mt: { xs: 2, md: 0 } }}>
                <HeroImage
                  src="/images/hero.png"
                  alt="Women in STEM"
                  sx={{ 
                    animation: 'fadeIn 1.5s ease-out',
                    display: 'block',
                    width: '100%',
                    maxWidth: { xs: '360px', sm: '420px', md: '480px' },
                    height: 'auto'
                  }}
                  onError={(e) => {
                    console.error('Image failed to load');
                    e.target.src = '/logo.png';
                    e.target.style.maxWidth = '300px';
                  }}
                />
              </HeroImageContainer>
            </Grid>
          </Grid>
          
          {/* Scroll Button below content */}
          <ScrollButton onClick={scrollToContent}>
            <ExpandMoreIcon fontSize="medium" />
          </ScrollButton>
        </Container>
      </HeroContainer>
    </HeroWrapper>
  );
};

export default HeroSection;