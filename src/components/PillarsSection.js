import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Button, Card, CardContent, Grid, Tab, Tabs, Paper, Container, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import CodeIcon from '@mui/icons-material/Code';
import PeopleIcon from '@mui/icons-material/People';
import EventIcon from '@mui/icons-material/Event';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import StarIcon from '@mui/icons-material/Star';
import LaunchIcon from '@mui/icons-material/Launch';
import ShieldIcon from '@mui/icons-material/Shield';
import PsychologyIcon from '@mui/icons-material/Psychology';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

// Styled components
const GradientText = styled(Typography)(({ theme }) => ({
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  color: 'transparent',
  backgroundImage: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main}, #F59E0B)`,
}));

const GradientDivider = styled('div')(({ theme }) => ({
  height: 4,
  width: 100,
  background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  borderRadius: theme.shape.borderRadius,
  margin: '0 auto',
  marginBottom: theme.spacing(3),
}));

const StyledTab = styled(Tab)(({ theme, active, color }) => ({
  borderRadius: theme.shape.borderRadius,
  fontWeight: 500,
  transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
  margin: theme.spacing(0, 1),
  background: active ? color : 'rgba(0, 0, 0, 0.04)',
  border: active ? 'none' : '1px solid rgba(0, 0, 0, 0.08)',
  color: active ? '#fff' : theme.palette.text.primary,
  boxShadow: active ? '0 4px 20px rgba(0, 0, 0, 0.15)' : 'none',
  transform: active ? 'scale(1.05) translateY(-2px)' : 'none',
  '&:hover': {
    background: active ? color : 'rgba(0, 0, 0, 0.08)',
  },
}));

const PillarCard = styled(Card)(({ theme, bgcolor }) => ({
  background: bgcolor,
  color: theme.palette.common.white,
  borderRadius: theme.shape.borderRadius * 2,
  overflow: 'hidden',
  position: 'relative',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.5s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.15)',
  },
}));

const OfferCard = styled(Paper)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.shape.borderRadius * 1.5,
  padding: theme.spacing(2),
  border: '1px solid rgba(0, 0, 0, 0.05)',
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: '#ffffff',
    transform: 'scale(1.02) translateY(-2px)',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.08)',
  },
}));

const GradientButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  color: theme.palette.common.white,
  borderRadius: theme.shape.borderRadius * 3,
  padding: theme.spacing(1.5, 4),
  position: 'relative',
  overflow: 'hidden',
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
    transform: 'translateY(-2px)',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
    transition: 'all 0.5s ease',
  },
  '&:hover::after': {
    left: '100%',
  },
}));

// Main component
const PillarsSection = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Explicitly handle tab changes to make sure it's only changed by user clicks
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  // Handle direct tab selection (for mobile grid buttons)
  const handleTabSelect = (tabId) => {
    setActiveTab(tabId);
  };

  useEffect(() => {
    setIsVisible(true);
    
    // No automatic tab change interval here - tabs only change when clicked
    
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
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Calculate parallax effect
  const calculateParallax = (factor) => {
    const x = (mousePosition.x / (sectionRef.current?.offsetWidth || 1)) - 0.5;
    const y = (mousePosition.y / (sectionRef.current?.offsetHeight || 1)) - 0.5;
    return {
      transform: `translate(${x * factor}px, ${y * factor}px)`
    };
  };

  const pillars = [
    {
      id: 0,
      title: "Technical Tracks",
      icon: <CodeIcon fontSize="large" />,
      altIcon: <ShieldIcon />,
      color: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
      description: "Strengthen your technical skills with specialized tracks led by industry experts. Master cutting-edge technologies and future-proof your career in the rapidly evolving tech landscape.",
      items: ["Cybersecurity", "AI/ML", "Cloud Computing", "Data Science", "Software Development"]
    },
    {
      id: 1,
      title: "Non-Technical Tracks",
      icon: <PeopleIcon fontSize="large" />,
      altIcon: <PsychologyIcon />,
      color: `linear-gradient(135deg, ${theme.palette.secondary.dark}, ${theme.palette.secondary.main})`,
      description: "Build essential soft skills and support systems for holistic career development. Navigate challenges confidently with personalized guidance and a supportive community.",
      items: ["Mental Health Programs", "Leadership Development", "Speakers Training", "Career Guidance", "Personal Branding"]
    },
    {
      id: 2,
      title: "Events & Webinars",
      icon: <EventIcon fontSize="large" />,
      altIcon: <LaunchIcon />,
      color: "linear-gradient(135deg, #F59E0B, #FBBF24)",
      description: "Connect, learn, and grow through our diverse events and interactive webinars. Expand your network and gain insights from leaders shaping the future of technology.",
      items: ["Campus Tours", "Industry Visits", "Workshops", "Hackathons", "Weekly Webinars"]
    }
  ];

  return (
    <Box
      ref={sectionRef}
      sx={{
        width: '100%',
        background: 'linear-gradient(135deg, #f8fafc, #f1f5f9)',
        py: { xs: 6, md: 10 },
        px: { xs: 2, sm: 3, md: 4 },
        position: 'relative',
        overflow: 'hidden',
      }}
      id="pillars-section"
    >
      {/* Beautiful Background Elements */}
      <Box sx={{
        position: 'absolute',
        inset: 0,
        opacity: 0.05,
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(99, 102, 241, 0.4) 1px, transparent 0)',
        backgroundSize: '40px 40px',
      }} />
      
      {/* Animated Blobs */}
      <Box sx={{
        position: 'absolute',
        top: -100,
        left: -100,
        width: 400,
        height: 400,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${theme.palette.primary.light}20, transparent 70%)`,
        filter: 'blur(60px)',
        animation: 'float1 15s infinite ease-in-out',
      }} style={calculateParallax(-15)} />
      
      <Box sx={{
        position: 'absolute',
        bottom: -80,
        right: -80,
        width: 350,
        height: 350,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${theme.palette.secondary.light}25, transparent 70%)`,
        filter: 'blur(50px)',
        animation: 'float2 18s infinite ease-in-out',
        animationDelay: '2s',
      }} style={calculateParallax(-10)} />
      
      <Box sx={{
        position: 'absolute',
        top: '40%',
        right: '20%',
        width: 200,
        height: 200,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(245, 158, 11, 0.15), transparent 70%)',
        filter: 'blur(40px)',
        animation: 'float3 12s infinite ease-in-out',
        animationDelay: '1s',
      }} style={calculateParallax(-20)} />

      {/* Decorative Elements */}
      <Box sx={{
        position: 'absolute',
        top: '10%',
        left: '5%',
        opacity: 0.1,
        animation: 'rotating 30s linear infinite',
      }}>
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke={theme.palette.primary.main}>
          <circle cx="12" cy="12" r="10" strokeWidth="1" />
          <circle cx="12" cy="12" r="6" strokeWidth="1" />
          <line x1="12" y1="2" x2="12" y2="4" strokeWidth="1" />
          <line x1="12" y1="20" x2="12" y2="22" strokeWidth="1" />
          <line x1="2" y1="12" x2="4" y2="12" strokeWidth="1" />
          <line x1="20" y1="12" x2="22" y2="12" strokeWidth="1" />
        </svg>
      </Box>
      
      <Box sx={{
        position: 'absolute',
        bottom: '15%',
        right: '8%',
        opacity: 0.1,
        animation: 'pulse 4s infinite ease-in-out',
      }}>
        <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke={theme.palette.secondary.main}>
          <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="1" />
          <path d="M9 3v18" strokeWidth="0.5" />
          <path d="M15 3v18" strokeWidth="0.5" />
          <path d="M3 9h18" strokeWidth="0.5" />
          <path d="M3 15h18" strokeWidth="0.5" />
        </svg>
      </Box>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <Box 
          sx={{
            textAlign: 'center',
            mb: 8,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            opacity: isVisible ? 1 : 0,
            transition: 'all 1s ease',
          }}
        >
          <GradientText 
            variant="h2" 
            component="h2" 
            fontWeight="bold" 
            gutterBottom
            sx={{ 
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
            }}
          >
            Our Pillars
          </GradientText>
          <GradientDivider />
          <Typography 
            variant="h6" 
            color="text.secondary" 
            sx={{ 
              maxWidth: 700, 
              mx: 'auto', 
              mb: 2,
              fontSize: { xs: '1rem', md: '1.25rem' } 
            }}
          >
            Breaking the silicon ceiling with style and sass through our three core pillars
          </Typography>
          
          {/* Added a visual indicator for clickability */}
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 3, opacity: 0.7, fontStyle: 'italic' }}>
            Click on a pillar to learn more
          </Typography>
          
          <Paper 
            elevation={0}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              px: 2, 
              py: 1, 
              mt: 2,
              borderRadius: 50,
              bgcolor: 'rgba(255,255,255,0.9)',
              border: '1px solid rgba(0,0,0,0.05)',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
              animation: 'glow 3s infinite alternate',
            }}
          >
            <EmojiEventsIcon 
              fontSize="small" 
              sx={{ mr: 1, color: theme.palette.primary.main }} 
            />
            <Typography variant="body2" color="text.secondary" fontWeight="medium">
              Empowering women in STEM since 2023
            </Typography>
          </Paper>
        </Box>

        {/* Pillars Tabs */}
        <Box sx={{ mb: 6, display: { xs: 'none', md: 'block' } }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            centered
            TabIndicatorProps={{ style: { display: 'none' } }}
            sx={{ 
              mb: 2,
              '& .MuiTabs-flexContainer': {
                justifyContent: 'center',
                gap: 2
              }
            }}
          >
            {pillars.map((pillar, index) => (
              <StyledTab
                key={pillar.id}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, py: 0.5 }}>
                    {pillar.icon}
                    <Typography>{pillar.title}</Typography>
                  </Box>
                }
                active={activeTab === pillar.id ? 1 : 0}
                color={pillar.color}
                sx={{
                  transform: isVisible 
                    ? (activeTab === pillar.id ? 'scale(1.05) translateY(-2px)' : 'none') 
                    : 'translateY(20px)',
                  opacity: isVisible ? 1 : 0,
                  transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  transitionDelay: `${index * 100}ms`
                }}
              />
            ))}
          </Tabs>
        </Box>

        {/* Mobile Tabs - Improved for better mobile experience */}
        <Box sx={{ 
          mb: 4, 
          display: { xs: 'block', md: 'none' },
          pb: 1
        }}>
          <Grid container spacing={1} justifyContent="center">
            {pillars.map((pillar) => (
              <Grid item xs={4} key={pillar.id}>
                <Button
                  fullWidth
                  onClick={() => handleTabSelect(pillar.id)}
                  sx={{
                    p: 1,
                    borderRadius: 2,
                    flexDirection: 'column',
                    height: '100%',
                    background: activeTab === pillar.id ? pillar.color : 'rgba(0, 0, 0, 0.04)',
                    color: activeTab === pillar.id ? '#fff' : 'text.primary',
                    boxShadow: activeTab === pillar.id ? '0 4px 12px rgba(0, 0, 0, 0.15)' : 'none',
                    border: activeTab === pillar.id ? 'none' : '1px solid rgba(0, 0, 0, 0.08)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: activeTab === pillar.id ? pillar.color : 'rgba(0, 0, 0, 0.08)',
                    }
                  }}
                >
                  <Box sx={{ mb: 0.5 }}>
                    {pillar.icon}
                  </Box>
                  <Typography variant="caption" sx={{ fontWeight: 'medium', display: 'block', lineHeight: 1.2 }}>
                    {pillar.title}
                  </Typography>
                </Button>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Pillar Content - Improved for better mobile responsiveness */}
        <Grid container spacing={{ xs: 2, md: 4 }} alignItems="center" direction={{ xs: 'column-reverse', md: 'row' }}>
          {/* Left Side - Feature Card */}
          <Grid item xs={12} md={5}
            sx={{
              width: '100%',
              transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
              opacity: isVisible ? 1 : 0,
              transition: 'all 0.7s ease',
            }}
          >
            <PillarCard 
              bgcolor={pillars[activeTab].color}
              sx={{
                transition: 'all 0.5s ease-in-out',
                animation: 'cardAppear 0.5s ease-out'
              }}
            >
              {/* Animated shine effect */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                  animation: 'shine 3s infinite',
                }}
              />
              
              {/* Background Pattern */}
              <Box sx={{
                position: 'absolute',
                inset: 0,
                opacity: 0.1,
                backgroundImage: 'repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1) 1px, transparent 1px, transparent 20px)',
                backgroundSize: '20px 20px',
              }} />
              
              {/* Light shine effect */}
              <Box sx={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '100%',
                height: '100%',
                background: 'radial-gradient(circle at top right, rgba(255,255,255,0.2), transparent 70%)',
              }} />
              
              <CardContent sx={{ position: 'relative', zIndex: 1, p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Box 
                    sx={{ 
                      p: 1.5, 
                      bgcolor: 'rgba(255, 255, 255, 0.2)', 
                      borderRadius: '50%', 
                      mr: 2,
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.1)',
                      }
                    }}
                  >
                    {pillars[activeTab].icon}
                  </Box>
                  <Typography variant="h5" fontWeight="bold">
                    {pillars[activeTab].title}
                  </Typography>
                </Box>
                
                <Typography 
                  variant="body1" 
                  sx={{ 
                    mb: 4, 
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontSize: { xs: '0.875rem', md: '1rem' }
                  }}
                >
                  {pillars[activeTab].description}
                </Typography>
                
                <Button 
                  variant="contained" 
                  color="inherit"
                  endIcon={
                    <Box sx={{ position: 'relative', display: 'inline-flex', width: 24, height: 24, overflow: 'hidden' }}>
                      <ArrowForwardIcon sx={{ 
                        position: 'absolute',
                        transition: 'all 0.3s ease',
                        transform: 'translateX(0)',
                        opacity: 1,
                        '.MuiButton-root:hover &': {
                          transform: 'translateX(24px)',
                          opacity: 0
                        }
                      }} />
                      <ArrowForwardIcon sx={{ 
                        position: 'absolute',
                        transition: 'all 0.3s ease',
                        transform: 'translateX(-24px)',
                        opacity: 0,
                        '.MuiButton-root:hover &': {
                          transform: 'translateX(0)',
                          opacity: 1
                        }
                      }} />
                    </Box>
                  }
                  sx={{
                    bgcolor: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    borderRadius: 50,
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.3)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Learn more
                </Button>
              </CardContent>
            </PillarCard>
          </Grid>
          
          {/* Right Side - List of Offerings */}
          <Grid item xs={12} md={7}
            sx={{
              width: '100%',
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              opacity: isVisible ? 1 : 0,
              transition: 'all 0.7s ease',
            }}
          >
            <Card sx={{
              bgcolor: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              borderRadius: 4,
              border: '1px solid rgba(0, 0, 0, 0.05)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
              '&:hover': {
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
              },
              transition: 'all 0.3s ease, box-shadow 0.3s ease',
            }}>
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <StarIcon sx={{ color: '#F59E0B', mr: 1 }} />
                  <Typography variant="h6" fontWeight="medium" color="text.primary">
                    What We Offer
                  </Typography>
                </Box>
                
                <Grid container spacing={2}>
                  {pillars[activeTab].items.map((item, index) => (
                    <Grid item xs={12} sm={6} key={index}
                      sx={{
                        transform: isVisible ? 'translateX(0)' : 'translateX(20px)',
                        opacity: isVisible ? 1 : 0,
                        transition: 'all 0.5s ease',
                        transitionDelay: `${index * 100}ms`,
                      }}
                    >
                      <OfferCard elevation={1} className="offer-item">
                        <Box sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
                          <Box 
                            sx={{ 
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: 36,
                              height: 36,
                              borderRadius: '50%',
                              background: pillars[activeTab].color,
                              mr: 2,
                              color: '#fff',
                              transition: 'transform 0.3s ease',
                              '.offer-item:hover &': {
                                transform: 'scale(1.1) rotate(10deg)'
                              }
                            }}
                          >
                            {index % 2 === 0 ? 
                              <ChevronRightIcon fontSize="small" /> : 
                              pillars[activeTab].altIcon
                            }
                          </Box>
                          <Typography 
                            variant="body1" 
                            color="text.primary" 
                            fontWeight="medium"
                            sx={{ 
                              fontSize: { xs: '0.875rem', md: '1rem' }
                            }}
                          >
                            {item}
                          </Typography>
                        </Box>
                      </OfferCard>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        
        {/* Call to Action */}
        <Box 
          sx={{ 
            textAlign: 'center', 
            mt: { xs: 5, md: 8 },
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            opacity: isVisible ? 1 : 0,
            transition: 'all 1s ease',
            transitionDelay: '500ms',
          }}
        >
          <GradientButton 
            variant="contained" 
            size="large" 
            endIcon={<ArrowForwardIcon />}
            className="cta-button"
            sx={{
              py: { xs: 1, md: 1.5 },
              px: { xs: 3, md: 4 },
              fontSize: { xs: '0.875rem', md: '1rem' }
            }}
          >
            Join Our Community
          </GradientButton>
        </Box>
      </Container>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float1 {
          0% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-30px, 20px) rotate(5deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }
        
        @keyframes float2 {
          0% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(20px, -30px) rotate(-5deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }
        
        @keyframes float3 {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-15px, 10px) scale(1.05); }
          100% { transform: translate(0, 0) scale(1); }
        }
        
        @keyframes shine {
          0% { left: -100%; }
          20% { left: 100%; }
          100% { left: 100%; }
        }
        
        @keyframes glow {
          0% { box-shadow: 0 0 5px rgba(99, 102, 241, 0.2); }
          100% { box-shadow: 0 0 15px rgba(99, 102, 241, 0.4); }
        }
        
        @keyframes cardAppear {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
        
        @keyframes rotating {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        
        .cta-button:hover::after {
          left: 100%;
        }
      `}</style>
    </Box>
  );
};

export default PillarsSection;