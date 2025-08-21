import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  Paper, 
  IconButton, 
  Tooltip,
  useTheme,
  //useMediaQuery,
  Avatar,
  Divider,
  Fade,
  alpha
} from '@mui/material';
import { 
  LinkedIn, 
  Language, 
  Email,
  Groups
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Custom styled components
const TeamMemberCard = styled(Paper)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 3,
  overflow: 'hidden',
  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
  '&:hover': {
    transform: 'translateY(-12px)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.12)',
  },
  position: 'relative',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

const MemberImage = styled(Box)(({ theme }) => ({
  height: 350,
  overflow: 'hidden',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '30%',
    background: 'linear-gradient(to top, rgba(0,0,0,0.3), transparent)',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  '&:hover::after': {
    opacity: 1,
  }
}));

const MemberImageOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: `linear-gradient(to bottom, ${alpha(theme.palette.primary.main, 0)}, ${alpha(theme.palette.primary.main, 0.1)})`,
  transition: 'all 0.3s ease',
  opacity: 0,
  '.MuiPaper-root:hover &': {
    opacity: 1,
  }
}));

const SocialIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: 'white',
  color: theme.palette.primary.main,
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    transform: 'translateY(-3px)',
    boxShadow: '0 5px 10px rgba(0,0,0,0.1)',
  },
  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
}));

const GradientDivider = styled(Divider)(({ theme }) => ({
  margin: '24px auto',
  width: '80px',
  height: '3px',
  background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  borderRadius: '3px',
}));

const TeamSection = () => {
  const theme = useTheme();
  //const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Team members data
  const teamMembers = [
    {
      name: "Ivy Macharia",
      role: "Program Manager",
      image: "/images/ivy.jpg",
      linkedin: "https://www.linkedin.com/in/machariaivy/",
      portfolio: "#",
      email: "ivy@geekssters.com",
      description: "Strategic program lead pioneering innovative STEM initiatives, breaking barriers for women in technology with passion and expertise."
    },
    {
      name: "Monicah Wamuhu",
      role: "Lead Strategist",
      image: "/images/monicah.jpg",
      linkedin: "https://www.linkedin.com/in/monicah-wamuhu/",
      portfolio: "#",
      email: "monicah@geekssters.com",
      description: "Visionary strategist shaping Geek-ssters' direction and impact, driving sustainable growth and fostering inclusive tech communities."
    },
    {
      name: "Jeanne Wanjiru",
      role: " Community Growth manager",
      image: "/images/jeanne.jpg",
      linkedin: "https://www.linkedin.com/in/jeannekilimo/",
      portfolio: "#",
      email: "jeanne@geekssters.com",
      description: "Passionate community builder creating safe, vibrant spaces for women to connect, learn, and excel in their STEM journeys."
    }
  ];

  // Handle mouse movement for parallax effects
  const handleMouseMove = (e) => {
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  // Calculate parallax effect for decorative elements
  const calculateParallax = (factor) => {
    if (!sectionRef.current) return {};
    
    const x = (mousePosition.x / sectionRef.current.offsetWidth) - 0.5;
    const y = (mousePosition.y / sectionRef.current.offsetHeight) - 0.5;
    
    return {
      transform: `translate(${x * factor}px, ${y * factor}px)`
    };
  };

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    // Store the current ref value in a variable
    const currentSection = sectionRef.current;

    if (currentSection) {
      observer.observe(currentSection);
    }

    // Use the stored variable in the cleanup function
    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []);

  return (
    <Box
    ref={sectionRef}
    onMouseMove={handleMouseMove}
    id="team-section"
    sx={{ 
      position: 'relative',
      py: { xs: 8, md: 12 },
      background: theme.palette.background.default,
      overflow: 'hidden',
    }}
  >
      {/* Decorative Elements */}
      <Box 
        sx={{
          position: 'absolute',
          top: -80,
          left: -80,
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(theme.palette.primary.light, 0.2)}, transparent 70%)`,
          filter: 'blur(50px)',
          animation: 'float1 15s infinite ease-in-out',
          zIndex: 0,
        }} 
        style={calculateParallax(-20)}
      />
      
      <Box 
        sx={{
          position: 'absolute',
          bottom: -100,
          right: -100,
          width: 350,
          height: 350,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(theme.palette.secondary.light, 0.15)}, transparent 70%)`,
          filter: 'blur(60px)',
          animation: 'float2 18s infinite ease-in-out',
          animationDelay: '2s',
          zIndex: 0,
        }}
        style={calculateParallax(-15)}
      />
      
      <Box 
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 150,
          height: 150,
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          transform: 'translate(-50%, -50%)',
          zIndex: 0,
          opacity: 0.5,
          animation: 'pulse 5s infinite ease-in-out',
        }}
      />
      
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <Fade in={isVisible} timeout={1000}>
          <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
            <Box sx={{ mb: 1, display: 'inline-block' }}>
              <Avatar 
                sx={{ 
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  color: theme.palette.primary.main,
                  width: 60,
                  height: 60,
                  mb: 2,
                  mx: 'auto',
                  boxShadow: `0 5px 15px ${alpha(theme.palette.primary.main, 0.2)}`,
                }}
              >
                <Groups fontSize="large" />
              </Avatar>
            </Box>
            
            <Typography 
              variant="h3" 
              component="h2" 
              gutterBottom
              sx={{ 
                fontWeight: 800,
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2,
                letterSpacing: '-0.5px',
              }}
            >
              Meet Our Founders
            </Typography>
            
            <GradientDivider />
            
            <Typography 
              variant="body1" 
              color="text.secondary"
              sx={{ 
                maxWidth: 700, 
                mx: 'auto',
                mb: 3,
                fontSize: { xs: '1rem', md: '1.1rem' },
                px: { xs: 2, md: 0 },
              }}
            >
              The visionary leaders breaking the silicon ceiling with style and sass, 
              inspiring a new generation of women in STEM.
            </Typography>
          </Box>
        </Fade>

        {/* Team Members Grid - Side by side layout */}
        <Grid 
          container 
          spacing={4} 
          justifyContent="center"
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            flexWrap: 'nowrap'
          }}
        >
          {teamMembers.map((member, index) => (
            <Grid 
              item 
              xs={12} 
              sm={12} 
              md={4} 
              lg={4}
              key={member.name}
              sx={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
                transition: 'opacity 0.6s ease, transform 0.6s ease',
                transitionDelay: `${index * 200}ms`,
                display: 'flex',
                flexBasis: { md: '33.33%' },
                maxWidth: { md: '33.33%' },
              }}
            >
              <TeamMemberCard elevation={6}>
                <MemberImage>
                  <Box
                    component="img"
                    src={member.image}
                    alt={member.name}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center',
                      transition: 'transform 0.5s ease',
                      '.MuiPaper-root:hover &': {
                        transform: 'scale(1.1)',
                      }
                    }}
                  />
                  <MemberImageOverlay />
                  
                  {/* Social Icons (Positioned on the image) */}
                  <Box 
                    sx={{ 
                      position: 'absolute',
                      top: '15px',
                      right: '15px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 1,
                      opacity: 0,
                      transform: 'translateX(20px)',
                      transition: 'all 0.3s ease',
                      '.MuiPaper-root:hover &': {
                        opacity: 1,
                        transform: 'translateX(0)',
                      }
                    }}
                  >
                    <Tooltip title="LinkedIn" placement="left">
                      <SocialIconButton 
                        href={member.linkedin} 
                        target="_blank" 
                        aria-label="LinkedIn profile"
                        size="small"
                        sx={{ transitionDelay: '0.1s' }}
                      >
                        <LinkedIn fontSize="small" />
                      </SocialIconButton>
                    </Tooltip>
                    
                    <Tooltip title="Portfolio" placement="left">
                      <SocialIconButton 
                        href={member.portfolio} 
                        target="_blank" 
                        aria-label="Portfolio website"
                        size="small"
                        sx={{ transitionDelay: '0.2s' }}
                      >
                        <Language fontSize="small" />
                      </SocialIconButton>
                    </Tooltip>
                    
                    <Tooltip title="Email" placement="left">
                      <SocialIconButton 
                        href={`mailto:${member.email}`} 
                        aria-label="Email address"
                        size="small"
                        sx={{ transitionDelay: '0.3s' }}
                      >
                        <Email fontSize="small" />
                      </SocialIconButton>
                    </Tooltip>
                  </Box>
                </MemberImage>

                {/* Member Details */}
                <Box 
                  sx={{ 
                    p: 3, 
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    flexGrow: 1,
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  {/* Name, Role, Description */}
                  <Box>
                    <Typography 
                      variant="h5" 
                      component="h3" 
                      gutterBottom
                      sx={{ 
                        fontWeight: 700,
                        mb: 0.5,
                        background: `linear-gradient(45deg, ${theme.palette.text.primary}, ${theme.palette.primary.main})`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      {member.name}
                    </Typography>
                    
                    <Typography 
                      variant="subtitle1" 
                      sx={{ 
                        mb: 2,
                        color: theme.palette.secondary.main,
                        fontWeight: 600,
                      }}
                    >
                      {member.role}
                    </Typography>
                    
                    <Divider sx={{ mb: 2, width: '50px' }} />
                    
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ 
                        mb: 2.5,
                        lineHeight: 1.6,
                      }}
                    >
                      {member.description}
                    </Typography>
                  </Box>
                </Box>
              </TeamMemberCard>
            </Grid>
          ))}
        </Grid>
      </Container>
      
      {/* Animation keyframes */}
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
        
        @keyframes pulse {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
          50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.3; }
          100% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
        }
      `}</style>
    </Box>
  );
};

export default TeamSection;