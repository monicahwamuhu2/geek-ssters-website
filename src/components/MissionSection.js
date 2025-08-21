import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Container, Fade } from '@mui/material';
import { Heart } from 'lucide-react';

const VisionMission = () => {
  const [activeSection, setActiveSection] = useState('vision');
  const [particles, setParticles] = useState([]);

  // Generate background particles for subtle animation
  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 15; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 5 + 2,
          duration: Math.random() * 20 + 10,
          delay: Math.random() * 5,
          opacity: Math.random() * 0.5 + 0.1
        });
      }
      setParticles(newParticles);
    };
    
    generateParticles();
  }, []);

  const getBackgroundGradient = (section) => {
    const gradients = {
      vision: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      mission: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)'
    };
    return gradients[section] || gradients.vision;
  };

  return (
    <Container 
      maxWidth="lg" 
      id="mission-section"
      className="mission-section"
      sx={{ 
        py: { xs: 3, sm: 4, md: 6 },
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Animated background particles */}
      {particles.map((particle) => (
        <Box
          key={particle.id}
          sx={{
            position: 'absolute',
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            borderRadius: '50%',
            background: activeSection === 'vision' 
              ? 'rgba(102, 126, 234, 0.3)'
              : 'rgba(106, 17, 203, 0.3)',
            opacity: particle.opacity,
            animation: `float ${particle.duration}s ease-in-out ${particle.delay}s infinite alternate`,
            zIndex: 0
          }}
        />
      ))}

      {/* Section title */}
      <Typography 
        variant="h3" 
        align="center" 
        sx={{ 
          mb: { xs: 2.5, sm: 3 },
          fontWeight: 'bold',
          fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' },
          background: 'linear-gradient(90deg, #6a11cb, #2575fc)',
          backgroundClip: 'text',
          textFillColor: 'transparent',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          animation: 'gradient 8s ease infinite',
          backgroundSize: '300% 300%',
        }}
      >
        Our Core Values
      </Typography>

      {/* Section Selector */}
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          mb: { xs: 3, sm: 4 },
          flexWrap: { xs: 'wrap', sm: 'nowrap' },
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '-10px',
            left: '10%',
            width: '80%',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, rgba(138, 43, 226, 0.5), transparent)'
          }
        }}
      >
        {['vision', 'mission'].map((section) => (
          <Box
            key={section}
            onClick={() => setActiveSection(section)}
            sx={{
              px: { xs: 1.5, sm: 2.5, md: 4 },
              py: 1.5,
              mx: { xs: 0.5, sm: 1, md: 2 },
              mb: { xs: 1, sm: 0 },
              borderRadius: '20px',
              cursor: 'pointer',
              background: activeSection === section 
                ? getBackgroundGradient(section)
                : 'transparent',
              color: activeSection === section ? 'white' : 'text.primary',
              textTransform: 'uppercase',
              fontWeight: 'bold',
              letterSpacing: '1px',
              boxShadow: activeSection === section ? 3 : 0,
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.05)',
              },
              position: 'relative',
              zIndex: 5
            }}
          >
            <Typography variant="body1" fontWeight="bold" fontSize={{ xs: '0.85rem', sm: '0.95rem', md: '1rem' }}>
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Vision Section */}
      {activeSection === 'vision' && (
        <Fade in={activeSection === 'vision'} timeout={800}>
          <Box>
            <Card
              sx={{ 
                borderRadius: 4, 
                py: { xs: 2, sm: 2.5 },
                px: { xs: 1.5, sm: 2 },
                background: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                overflow: 'hidden',
                position: 'relative',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.02)',
                  boxShadow: '0 15px 35px rgba(0, 0, 0, 0.15)'
                },
                zIndex: 1
              }}
            >
              <Box className="card-blob"
                sx={{
                  position: 'absolute',
                  top: '-20%',
                  right: '-15%',
                  width: '300px',
                  height: '300px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%)',
                  filter: 'blur(40px)',
                  animation: 'pulse 15s infinite alternate',
                  zIndex: 0
                }}
              />
              <Box className="card-blob-2"
                sx={{
                  position: 'absolute',
                  bottom: '-10%',
                  left: '-10%',
                  width: '200px',
                  height: '200px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(118, 75, 162, 0.2) 0%, rgba(102, 126, 234, 0.2) 100%)',
                  filter: 'blur(40px)',
                  animation: 'pulse 10s infinite alternate-reverse',
                  zIndex: 0
                }}
              />
              <CardContent sx={{ position: 'relative', zIndex: 1, p: { xs: 1.5, sm: 2 } }}>
                <Typography 
                  variant="h3" 
                  gutterBottom 
                  color="primary"
                  sx={{ 
                    fontWeight: 'bold',
                    textAlign: 'center',
                    mb: { xs: 2, sm: 3 },
                    textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    animation: 'fadeInDown 0.6s ease',
                    fontSize: { xs: '1.6rem', sm: '2rem', md: '2.5rem' }
                  }}
                >
                  Our Vision
                </Typography>
                <Box 
                  sx={{ 
                    textAlign: 'center',
                    position: 'relative',
                    p: { xs: 1.5, sm: 2, md: 3 },
                    animation: 'fadeIn 0.8s ease 0.3s both',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: '20%',
                      width: '60%',
                      height: '2px',
                      background: 'linear-gradient(90deg, transparent, rgba(138, 43, 226, 0.5), transparent)'
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: '20%',
                      width: '60%',
                      height: '2px',
                      background: 'linear-gradient(90deg, transparent, rgba(138, 43, 226, 0.5), transparent)'
                    }
                  }}
                >
                  <Typography 
                    variant="h6" 
                    component="p"
                    sx={{ 
                      lineHeight: 1.7,
                      fontWeight: 'medium',
                      fontStyle: 'italic',
                      fontSize: { xs: '0.9rem', sm: '1rem', md: '1.15rem' }
                    }}
                  >
                    Empowering and Inspiring Girls and Female Students in STEM, Building a Thriving and
                    Inclusive Community that Provides a Safe and Supportive Environment for their Growth,
                    Excellence, and Future Success in Joining the Growing Community of Women in STEM
                  </Typography>
                </Box>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'center',
                  mt: { xs: 2, sm: 3 },
                  opacity: 0.8,
                  animation: 'fadeInUp 1s ease 0.6s both'
                }}>
                  <Heart size={24} color="#764ba2" />
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Fade>
      )}

      {/* Mission Section */}
      {activeSection === 'mission' && (
        <Fade in={activeSection === 'mission'} timeout={800}>
          <Box>
            <Card
              sx={{ 
                borderRadius: 4, 
                py: { xs: 2, sm: 2.5 },
                px: { xs: 1.5, sm: 2 },
                background: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                overflow: 'hidden',
                position: 'relative',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.02)',
                  boxShadow: '0 15px 35px rgba(0, 0, 0, 0.15)'
                },
                zIndex: 1
              }}
            >
              <Box className="card-blob"
                sx={{
                  position: 'absolute',
                  top: '-15%',
                  left: '-10%',
                  width: '250px',
                  height: '250px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(106, 17, 203, 0.2) 0%, rgba(37, 117, 252, 0.2) 100%)',
                  filter: 'blur(40px)',
                  animation: 'pulse 12s infinite alternate',
                  zIndex: 0
                }}
              />
              <Box className="card-blob-2"
                sx={{
                  position: 'absolute',
                  bottom: '-15%',
                  right: '-5%',
                  width: '280px',
                  height: '280px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(37, 117, 252, 0.2) 0%, rgba(106, 17, 203, 0.2) 100%)',
                  filter: 'blur(40px)',
                  animation: 'pulse 15s infinite alternate-reverse',
                  zIndex: 0
                }}
              />
              <CardContent sx={{ position: 'relative', zIndex: 1, p: { xs: 1.5, sm: 2 } }}>
                <Typography 
                  variant="h3" 
                  gutterBottom 
                  color="primary"
                  sx={{ 
                    fontWeight: 'bold',
                    textAlign: 'center',
                    mb: { xs: 2, sm: 3 },
                    textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    animation: 'fadeInDown 0.6s ease',
                    fontSize: { xs: '1.6rem', sm: '2rem', md: '2.5rem' }
                  }}
                >
                  Our Mission
                </Typography>
                <Box 
                  sx={{ 
                    textAlign: 'center',
                    position: 'relative',
                    p: { xs: 1.5, sm: 2, md: 3 },
                    animation: 'fadeIn 0.8s ease 0.3s both',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: '20%',
                      width: '60%',
                      height: '2px',
                      background: 'linear-gradient(90deg, transparent, rgba(106, 17, 203, 0.5), transparent)'
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: '20%',
                      width: '60%',
                      height: '2px',
                      background: 'linear-gradient(90deg, transparent, rgba(37, 117, 252, 0.5), transparent)'
                    }
                  }}
                >
                  <Typography 
                    variant="h6" 
                    component="p"
                    sx={{ 
                      lineHeight: 1.7,
                      fontWeight: 'medium',
                      fontStyle: 'italic',
                      fontSize: { xs: '0.9rem', sm: '1rem', md: '1.15rem' }
                    }}
                  >
                    Our mission is to break barriers, embrace diversity, and celebrate the unique talents and
                    perspectives that women bring to the table. Whether you're a coding enthusiast, a research
                    expert, or simply curious about the wonders of STEM, we're here to support your journey.
                  </Typography>
                </Box>
                <Box
                  sx={{ 
                    mt: { xs: 2, sm: 3 }, 
                    textAlign: 'center',
                    p: { xs: 1.5, sm: 2 },
                    borderRadius: 6,
                    background: 'rgba(106, 17, 203, 0.05)',
                    animation: 'fadeInUp 0.6s ease 0.6s both',
                    border: '1px dashed rgba(106, 17, 203, 0.3)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: -100,
                      width: '50%',
                      height: '100%',
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                      transform: 'skewX(-20deg)',
                      animation: 'shine 3s infinite',
                    }
                  }}
                >
                  <Typography 
                    variant="h6" 
                    fontWeight="bold"
                    color="secondary"
                    sx={{ 
                      letterSpacing: 1,
                      fontSize: { xs: '0.85rem', sm: '0.95rem', md: '1.1rem' }
                    }}
                  >
                    Breaking the silicon ceiling with style and sass!
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Fade>
      )}

      {/* CSS Animations */}
      <Box
        sx={{
          '@keyframes fadeIn': {
            '0%': {
              opacity: 0,
            },
            '100%': {
              opacity: 1,
            },
          },
          '@keyframes fadeInDown': {
            '0%': {
              opacity: 0,
              transform: 'translateY(-20px)',
            },
            '100%': {
              opacity: 1,
              transform: 'translateY(0)',
            },
          },
          '@keyframes fadeInUp': {
            '0%': {
              opacity: 0,
              transform: 'translateY(20px)',
            },
            '100%': {
              opacity: 1,
              transform: 'translateY(0)',
            },
          },
          '@keyframes pulse': {
            '0%': {
              transform: 'scale(1)',
            },
            '50%': {
              transform: 'scale(1.1)',
            },
            '100%': {
              transform: 'scale(1)',
            },
          },
          '@keyframes float': {
            '0%': {
              transform: 'translateY(0) translateX(0)',
            },
            '50%': {
              transform: 'translateY(10px) translateX(10px)',
            },
            '100%': {
              transform: 'translateY(-10px) translateX(-10px)',
            },
          },
          '@keyframes shine': {
            '0%': {
              left: '-100%',
            },
            '20%': {
              left: '100%',
            },
            '100%': {
              left: '100%',
            },
          },
          '@keyframes gradient': {
            '0%': {
              backgroundPosition: '0% 50%',
            },
            '50%': {
              backgroundPosition: '100% 50%',
            },
            '100%': {
              backgroundPosition: '0% 50%',
            },
          }
        }}
      />
    </Container>
  );
}

export default VisionMission;