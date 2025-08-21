import React, { useEffect, useRef, useState } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Card, 
  CardContent, 
  Avatar, 
  useTheme, 
  alpha,
  Rating,
  Chip,
  Grid,
  Paper

} from '@mui/material';
import { FormatQuote } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Styled components
const TestimonialCard = styled(Card)(({ theme }) => ({
  height: '100%',
  borderRadius: theme.shape.borderRadius * 2,
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.2)',
  },
  // Ensure the cards have equal width on desktop
  flex: '1 1 0',
  minWidth: 0,
}));

const QuoteIcon = styled(FormatQuote)(({ theme, position }) => ({
  position: 'absolute',
  fontSize: 80,
  opacity: 0.07,
  color: theme.palette.primary.main,
  transform: position === 'top' ? 'rotate(0deg)' : 'rotate(180deg)',
  ...(position === 'top' 
    ? { top: -15, left: -15 } 
    : { bottom: -15, right: -15 }),
}));

const TestimonialAvatar = styled(Avatar)(({ theme }) => ({
  width: 60,
  height: 60,
  border: `3px solid ${theme.palette.background.paper}`,
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.1)',
  },
}));

const GradientText = styled(Typography)(({ theme }) => ({
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  color: 'transparent',
  backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  display: 'inline-block',
}));

const TestimonialsSection = () => {
  const theme = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  
  // Sample testimonials - reduced to just three
  const testimonials = [
    {
      id: 1,
      name: "Wangari Maathai",
      role: "Computer Science Student, University of Nairobi",
      quote: "Joining Geek-ssters transformed my STEM journey. The mentorship and community support gave me the confidence to pursue my passion for AI. The weekly webinars are incredibly insightful!",
      rating: 5,
      program: "Technical Track: AI/ML"
    },
    {
      id: 2,
      name: "Asha Juma",
      role: "Software Engineer, Microsoft",
      quote: "As a mentor in the Geek-ssters community, I've witnessed remarkable growth in these young women. Their dedication to breaking the silicon ceiling inspires me daily. The leadership program is truly transformative.",
      rating: 5,
      program: "Non-Technical Track: Leadership Development"
    },
    {
      id: 3,
      name: "Elizabeth Otieno",
      role: "Cloud Engineer, AWS",
      quote: "The cloud computing track and networking events helped me land my dream job. Geek-ssters doesn't just teach technical skills; they connect you with opportunities and build your confidence.",
      rating: 5,
      program: "Technical Track: Cloud Computing"
    }
  ];
  
  useEffect(() => {
    // Observer for scroll animations
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = sectionRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <Box
    ref={sectionRef}
    id="testimonials-section"
    sx={{
      py: { xs: 4, md: 6 },
      background: `linear-gradient(to bottom, ${theme.palette.background.default}, ${alpha(theme.palette.primary.light, 0.05)})`,
      position: 'relative',
      overflow: 'hidden',
    }}
  >
      {/* Background Elements */}
      <Box 
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.04,
          backgroundImage: 'radial-gradient(circle, rgba(106, 27, 154, 0.4) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          zIndex: 0,
        }}
      />
      
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          right: '-10%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(theme.palette.primary.light, 0.2)}, transparent 70%)`,
          filter: 'blur(60px)',
          opacity: 0.5,
          animation: 'float 15s infinite ease-in-out',
          zIndex: 0,
        }}
      />
      
      <Box
        sx={{
          position: 'absolute',
          bottom: '10%',
          left: '-5%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(theme.palette.secondary.light, 0.15)}, transparent 70%)`,
          filter: 'blur(50px)',
          opacity: 0.5,
          animation: 'float 18s infinite ease-in-out reverse',
          animationDelay: '2s',
          zIndex: 0,
        }}
      />

      <Container 
        maxWidth="lg" 
        sx={{ 
          position: 'relative', 
          zIndex: 1,
          overflow: 'visible' 
        }}
      >
        {/* Section Header - Reduced margins */}
        <Box 
          sx={{
            textAlign: 'center',
            mb: { xs: 3, md: 4 }, // Reduced margin
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 1s ease-out',
          }}
        >
          <Chip 
            label="SUCCESS STORIES" 
            sx={{ 
              mb: 1.5, // Reduced margin
              fontWeight: 'bold',
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              color: 'white',
              '& .MuiChip-label': {
                px: 2,
              }
            }} 
          />
          
          <Typography 
            variant="h3" // Changed from h2 to h3 for less space
            component="h2" 
            gutterBottom
            fontWeight="bold"
            sx={{ 
              fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' }, // Reduced font size
              mb: 1, // Reduced margin
            }}
          >
            <GradientText>Voices of Our Community</GradientText>
          </Typography>
          
          <Typography 
            variant="body1" // Changed from h6 to body1 for less space
            color="text.secondary" 
            sx={{ 
              maxWidth: 700,
              mx: 'auto',
              mb: 1.5, // Reduced margin
              fontSize: { xs: '0.9rem', md: '1rem' } // Reduced font size
            }}
          >
            Hear from the women who are breaking the silicon ceiling
            with style and sass in their STEM journeys
          </Typography>
        </Box>

        {/* Testimonials Paper - Reduced padding */}
        <Paper
          elevation={0}
          sx={{
            background: alpha(theme.palette.background.paper, 0.7),
            backdropFilter: 'blur(8px)',
            borderRadius: 4,
            p: { xs: 2, md: 3 }, // Reduced padding
            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
            position: 'relative',
            overflow: 'hidden',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 1s ease-out 0.2s',
          }}
        >
          {/* Desktop View - Horizontal Row */}
          <Box 
            sx={{ 
              display: { xs: 'none', md: 'flex' },
              flexDirection: 'row',
              gap: 2,
              width: '100%'
            }}
          >
            {testimonials.map((testimonial, idx) => (
              <Box
                key={testimonial.id}
                sx={{
                  flex: 1,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'all 1s ease-out',
                  transitionDelay: `${0.1 + idx * 0.2}s`,
                }}
              >
                <TestimonialCard sx={{ height: '100%' }}>
                  <CardContent sx={{ position: 'relative', p: 2.5, height: '100%' }}> {/* Reduced padding */}
                    <QuoteIcon position="top" />
                    <QuoteIcon position="bottom" />
                    
                    <Box sx={{ display: 'flex', mb: 1.5, alignItems: 'center' }}> {/* Reduced margin */}
                      <TestimonialAvatar 
                        src={`/images/testimonial${idx+1}.jpg`} 
                        alt={testimonial.name}
                        sx={{ 
                          bgcolor: theme.palette.primary.main,
                          color: 'white',
                          fontWeight: 'bold',
                          fontSize: '1.25rem' // Reduced font size
                        }}
                      >
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </TestimonialAvatar>
                      <Box sx={{ ml: 1.5 }}> {/* Reduced margin */}
                        <Typography variant="h6" fontWeight="bold" sx={{ fontSize: '1rem' }}> {/* Reduced font size */}
                          {testimonial.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}> {/* Reduced font size */}
                          {testimonial.role}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Typography 
                      variant="body2" // Changed from body1 to body2 for more compact text
                      sx={{ 
                        fontStyle: 'italic',
                        mb: 1.5, // Reduced margin
                        color: 'text.primary',
                        lineHeight: 1.5, // Reduced line height
                        fontSize: '0.85rem' // Reduced font size
                      }}
                    >
                      "{testimonial.quote}"
                    </Typography>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
                      <Rating 
                        value={testimonial.rating} 
                        readOnly 
                        size="small"
                        sx={{ color: theme.palette.secondary.main, fontSize: '0.8rem' }} // Reduced size
                      />
                      
                      <Chip 
                        size="small" 
                        label={testimonial.program}
                        sx={{ 
                          background: alpha(theme.palette.primary.main, 0.1),
                          color: theme.palette.primary.main,
                          fontWeight: 'medium',
                          height: 22, // Reduced height
                          fontSize: '0.7rem', // Reduced font size
                          '& .MuiChip-label': { px: 1 } // Reduced padding
                        }}
                      />
                    </Box>
                  </CardContent>
                </TestimonialCard>
              </Box>
            ))}
          </Box>

          {/* Mobile View - Vertical Stack */}
          <Grid 
            container 
            spacing={2}
            sx={{ display: { xs: 'flex', md: 'none' } }}
          > 
            {testimonials.map((testimonial, idx) => (
              <Grid 
                item 
                xs={12}
                key={testimonial.id}
                sx={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'all 1s ease-out',
                  transitionDelay: `${0.1 + idx * 0.2}s`,
                }}
              >
                <TestimonialCard>
                  <CardContent sx={{ position: 'relative', p: 2.5, height: '100%' }}> {/* Reduced padding */}
                    <QuoteIcon position="top" />
                    <QuoteIcon position="bottom" />
                    
                    <Box sx={{ display: 'flex', mb: 1.5, alignItems: 'center' }}> {/* Reduced margin */}
                      <TestimonialAvatar 
                        src={`/images/testimonial${idx+1}.jpg`} 
                        alt={testimonial.name}
                        sx={{ 
                          bgcolor: theme.palette.primary.main,
                          color: 'white',
                          fontWeight: 'bold',
                          fontSize: '1.25rem' // Reduced font size
                        }}
                      >
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </TestimonialAvatar>
                      <Box sx={{ ml: 1.5 }}> {/* Reduced margin */}
                        <Typography variant="h6" fontWeight="bold" sx={{ fontSize: '1rem' }}> {/* Reduced font size */}
                          {testimonial.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}> {/* Reduced font size */}
                          {testimonial.role}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Typography 
                      variant="body2" // Changed from body1 to body2 for more compact text
                      sx={{ 
                        fontStyle: 'italic',
                        mb: 1.5, // Reduced margin
                        color: 'text.primary',
                        lineHeight: 1.5, // Reduced line height
                        fontSize: '0.85rem' // Reduced font size
                      }}
                    >
                      "{testimonial.quote}"
                    </Typography>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
                      <Rating 
                        value={testimonial.rating} 
                        readOnly 
                        size="small"
                        sx={{ color: theme.palette.secondary.main, fontSize: '0.8rem' }} // Reduced size
                      />
                      
                      <Chip 
                        size="small" 
                        label={testimonial.program}
                        sx={{ 
                          background: alpha(theme.palette.primary.main, 0.1),
                          color: theme.palette.primary.main,
                          fontWeight: 'medium',
                          height: 22, // Reduced height
                          fontSize: '0.7rem', // Reduced font size
                          '& .MuiChip-label': { px: 1 } // Reduced padding
                        }}
                      />
                    </Box>
                  </CardContent>
                </TestimonialCard>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translate(0, 0); }
          50% { transform: translate(-20px, 20px); }
          100% { transform: translate(0, 0); }
        }
      `}</style>
    </Box>
  );
};

export default TestimonialsSection;