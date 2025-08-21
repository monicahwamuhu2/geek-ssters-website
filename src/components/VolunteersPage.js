import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Grid,  
  IconButton, 
  Tooltip, 
  Avatar,
  Card,
  CardContent,
  Chip,
  Divider,
  Button,
  useTheme,
  useMediaQuery,
  alpha,
  Fade,
  Grow
} from '@mui/material';
import { 
  LinkedIn, 
  GitHub,
  Twitter,
  ArrowBack,
  Favorite,
  Code,
  VolunteerActivism,
  
  Event
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

// Custom styled components
const PageWrapper = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${alpha(theme.palette.background.default, 0.8)}, ${alpha(theme.palette.background.paper, 0.9)})`,
  minHeight: '100vh',
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
  position: 'relative',
  overflow: 'hidden',
}));

const GradientText = styled(Typography)(({ theme }) => ({
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  color: 'transparent',
  backgroundImage: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
}));

const GradientDivider = styled(Divider)(({ theme }) => ({
  margin: '24px auto',
  width: '80px',
  height: '3px',
  background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  borderRadius: '3px',
}));

const VolunteerCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  overflow: 'hidden',
  transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  background: alpha(theme.palette.background.paper, 0.9),
  backdropFilter: 'blur(10px)',
  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.15)',
  }
}));

const VolunteerAvatar = styled(Avatar)(({ theme }) => ({
  width: 100,
  height: 100,
  margin: '0 auto',
  border: `4px solid ${theme.palette.background.paper}`,
  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
  }
}));

const CategoryChip = styled(Chip)(({ theme, colorCode }) => ({
  fontWeight: 500,
  background: alpha(colorCode || theme.palette.primary.main, 0.1),
  color: colorCode || theme.palette.primary.main,
  border: `1px solid ${alpha(colorCode || theme.palette.primary.main, 0.3)}`,
  '&:hover': {
    background: alpha(colorCode || theme.palette.primary.main, 0.2),
  }
}));

const BackToTeamButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 3,
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(3),
  background: alpha(theme.palette.background.paper, 0.9),
  backdropFilter: 'blur(10px)',
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(4),
  marginTop: theme.spacing(2),
  '&:hover': {
    background: alpha(theme.palette.background.paper, 1),
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
    transform: 'translateY(-3px)',
  },
  transition: 'all 0.3s ease',
}));

// Sample volunteer data - Replace with your actual data
const volunteers = [
  {
    id: 1,
    name: "Jane Doe",
    role: "Technical Track Lead",
    avatar: "/images/volunteers/jane.jpg",
    category: "Technical",
    expertise: ["Web Development", "Python", "AI/ML"],
    bio: "Jane leads our technical track with expertise in web development and machine learning. She's passionate about helping women build their technical skills.",
    linkedIn: "https://linkedin.com/in/jane-doe",
    github: "https://github.com/janedoe",
    twitter: "https://twitter.com/janedoe"
  },
  {
    id: 2,
    name: "Emily Smith",
    role: "Community Manager",
    avatar: "/images/volunteers/emily.jpg",
    category: "Non-Technical",
    expertise: ["Community Building", "Event Planning", "Social Media"],
    bio: "Emily manages our vibrant community, organizing events and keeping everyone connected through our social platforms.",
    linkedIn: "https://linkedin.com/in/emily-smith",
    github: null,
    twitter: "https://twitter.com/emilysmith"
  },
  {
    id: 3,
    name: "Alice Johnson",
    role: "Workshop Facilitator",
    avatar: "/images/volunteers/alice.jpg",
    category: "Events",
    expertise: ["Public Speaking", "Workshop Design", "Career Coaching"],
    bio: "Alice designs and leads workshops that help women develop both technical and soft skills essential for success in STEM.",
    linkedIn: "https://linkedin.com/in/alice-johnson",
    github: "https://github.com/alicej",
    twitter: "https://twitter.com/alicej"
  },
  {
    id: 4,
    name: "David Wang",
    role: "Cybersecurity Mentor",
    avatar: "/images/volunteers/david.jpg",
    category: "Technical",
    expertise: ["Cybersecurity", "Network Security", "Ethical Hacking"],
    bio: "David mentors women interested in cybersecurity, sharing his expertise to help bridge the gender gap in this critical field.",
    linkedIn: "https://linkedin.com/in/david-wang",
    github: "https://github.com/davidwang",
    twitter: null
  },
  {
    id: 5,
    name: "Sophie Turner",
    role: "Content Creator",
    avatar: "/images/volunteers/sophie.jpg",
    category: "Non-Technical",
    expertise: ["Content Strategy", "Technical Writing", "Digital Marketing"],
    bio: "Sophie creates engaging content that educates and inspires women in tech, breaking down complex topics into accessible information.",
    linkedIn: "https://linkedin.com/in/sophie-turner",
    github: null,
    twitter: "https://twitter.com/sophiet"
  },
  {
    id: 6,
    name: "Michael Brown",
    role: "Webinar Host",
    avatar: "/images/volunteers/michael.jpg",
    category: "Events",
    expertise: ["Public Speaking", "Facilitation", "Interview Skills"],
    bio: "Michael hosts our webinar series, bringing engaging discussions and valuable insights to our community through virtual events.",
    linkedIn: "https://linkedin.com/in/michael-brown",
    github: "https://github.com/michaelb",
    twitter: "https://twitter.com/michaelb"
  },
  {
    id: 7,
    name: "Rachel Lee",
    role: "Data Science Lead",
    avatar: "/images/volunteers/rachel.jpg",
    category: "Technical",
    expertise: ["Data Science", "Statistics", "R Programming"],
    bio: "Rachel leads our data science initiatives, helping women develop skills in data analysis and visualization.",
    linkedIn: "https://linkedin.com/in/rachel-lee",
    github: "https://github.com/rachellee",
    twitter: "https://twitter.com/rachellee"
  },
  {
    id: 8,
    name: "Olivia Garcia",
    role: "Leadership Coach",
    avatar: "/images/volunteers/olivia.jpg",
    category: "Non-Technical",
    expertise: ["Leadership Development", "Career Strategy", "Mentoring"],
    bio: "Olivia coaches women on leadership skills, helping them navigate career challenges and develop their authentic leadership style.",
    linkedIn: "https://linkedin.com/in/olivia-garcia",
    github: null,
    twitter: "https://twitter.com/oliviag"
  }
];

// Category data with icons and colors
const categories = [
  {
    id: "all",
    label: "All Volunteers",
    count: volunteers.length,
    icon: <Favorite />,
    color: "#6a1b9a" // primary color
  },
  {
    id: "Technical",
    label: "Technical Track",
    count: volunteers.filter(v => v.category === "Technical").length,
    icon: <Code />,
    color: "#1565c0" // blue
  },
  {
    id: "Non-Technical",
    label: "Non-Technical Track",
    count: volunteers.filter(v => v.category === "Non-Technical").length,
    icon: <VolunteerActivism />,
    color: "#c62828" // red
  },
  {
    id: "Events",
    label: "Events & Webinars",
    count: volunteers.filter(v => v.category === "Events").length,
    icon: <Event />,
    color: "#2e7d32" // green
  }
];

const VolunteersPage = () => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const [activeFilter, setActiveFilter] = useState("all");
  const [isVisible, setIsVisible] = useState(false);
  const [filteredVolunteers, setFilteredVolunteers] = useState(volunteers);
  const sectionRef = useRef(null);

  // Apply filter when activeFilter changes
  useEffect(() => {
    if (activeFilter === "all") {
      setFilteredVolunteers(volunteers);
    } else {
      setFilteredVolunteers(volunteers.filter(volunteer => volunteer.category === activeFilter));
    }
  }, [activeFilter]);

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

  // Handle category filter change
  const handleFilterChange = (categoryId) => {
    setActiveFilter(categoryId);
  };

  // Find the color for a specific category
  const getCategoryColor = (categoryName) => {
    const category = categories.find(cat => cat.id === categoryName);
    return category ? category.color : theme.palette.primary.main;
  };

  return (
    <PageWrapper>
      {/* Background decorative elements */}
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
        <Box 
          sx={{
            position: 'absolute',
            top: '-10%',
            right: '-5%',
            width: '40%',
            height: '40%',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${alpha(theme.palette.primary.light, 0.1)}, transparent 70%)`,
            filter: 'blur(50px)',
          }}
        />
        
        <Box 
          sx={{
            position: 'absolute',
            bottom: '-10%',
            left: '-5%',
            width: '40%',
            height: '40%',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${alpha(theme.palette.secondary.light, 0.1)}, transparent 70%)`,
            filter: 'blur(60px)',
          }}
        />
        
        <Box 
          sx={{
            position: 'absolute',
            inset: 0,
            opacity: 0.02,
            backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />
      </Box>
      
      <Container maxWidth="lg" ref={sectionRef} sx={{ position: 'relative', zIndex: 1 }}>
        {/* Page Header */}
        <Fade in={isVisible} timeout={800}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Avatar 
              sx={{ 
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                color: theme.palette.primary.main,
                width: 80,
                height: 80,
                mb: 3,
                mx: 'auto',
                boxShadow: `0 5px 15px ${alpha(theme.palette.primary.main, 0.2)}`,
              }}
            >
              <VolunteerActivism sx={{ fontSize: 40 }} />
            </Avatar>
            
            <GradientText 
              variant="h2" 
              component="h1" 
              gutterBottom
              sx={{ 
                fontWeight: 800,
                mb: 2,
                fontSize: { xs: '2rem', sm: '2.75rem', md: '3.5rem' },
              }}
            >
              Our Amazing Volunteers
            </GradientText>
            
            <GradientDivider />
            
            <Typography 
              variant="h6" 
              color="text.secondary"
              sx={{ 
                maxWidth: 800, 
                mx: 'auto',
                mb: 4,
                px: { xs: 2, md: 0 },
              }}
            >
              Meet the passionate individuals who donate their time and expertise to help break 
              the silicon ceiling and empower women in STEM.
            </Typography>
          </Box>
        </Fade>

        {/* Back button - Now positioned below the header */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <BackToTeamButton
            variant="contained"
            startIcon={<ArrowBack />}
            component={Link}
            to="/"
          >
            Back to Home
          </BackToTeamButton>
        </Box>
            
        {/* Category filters */}
        <Box 
          sx={{ 
            display: 'flex', 
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: { xs: 1, sm: 2 },
            mb: 6,
            mt: 2,
            px: { xs: 1, sm: 2, md: 0 }
          }}
        >
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeFilter === category.id ? "contained" : "outlined"}
              color="primary"
              startIcon={isSmall ? null : category.icon}
              onClick={() => handleFilterChange(category.id)}
              size={isSmall ? "small" : "medium"}
              sx={{
                borderRadius: 4,
                px: { xs: 1.5, sm: 2 },
                py: { xs: 0.75, sm: 1 },
                bgcolor: activeFilter === category.id ? category.color : 'transparent',
                borderColor: category.color,
                color: activeFilter === category.id ? 'white' : category.color,
                '&:hover': {
                  bgcolor: activeFilter === category.id 
                    ? category.color 
                    : alpha(category.color, 0.1),
                },
                boxShadow: activeFilter === category.id 
                  ? `0 4px 12px ${alpha(category.color, 0.4)}` 
                  : 'none',
                transition: 'all 0.3s ease',
                fontSize: { xs: '0.75rem', sm: '0.875rem' },
                whiteSpace: 'nowrap',
              }}
            >
              {isSmall ? category.label : `${category.label} (${category.count})`}
            </Button>
          ))}
        </Box>
        
        {/* Volunteers Grid */}
        <Grid container spacing={3}>
          {filteredVolunteers.map((volunteer, index) => (
            <Grid 
              item 
              xs={12} 
              sm={6} 
              md={4} 
              lg={3} 
              key={volunteer.id}
              sx={{ display: 'flex' }}
            >
              <Grow
                in={isVisible}
                timeout={500 + (index % 8) * 100}
                style={{ transformOrigin: 'center top', width: '100%' }}
              >
                <VolunteerCard>
                  <Box sx={{ position: 'relative', pt: 3, pb: 1, textAlign: 'center' }}>
                    <VolunteerAvatar
                      src={volunteer.avatar}
                      alt={volunteer.name}
                      sx={{ mb: 2 }}
                    />
                    
                    <Typography 
                      variant="h6" 
                      component="h3"
                      sx={{ 
                        fontWeight: 600,
                        mb: 0.5,
                        px: 2,
                        height: '3.6em', // Fixed height for name (accommodates up to 2 lines)
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {volunteer.name}
                    </Typography>
                    
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ 
                        mb: 1,
                        height: '1.5em', // Fixed height for role
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {volunteer.role}
                    </Typography>
                    
                    <CategoryChip 
                      label={volunteer.category} 
                      size="small"
                      colorCode={getCategoryColor(volunteer.category)}
                      icon={
                        volunteer.category === "Technical" ? <Code fontSize="small" /> :
                        volunteer.category === "Non-Technical" ? <VolunteerActivism fontSize="small" /> :
                        <Event fontSize="small" />
                      }
                    />
                  </Box>
                  
                  <CardContent 
                    sx={{ 
                      pt: 0.5, 
                      flexGrow: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Box sx={{ mb: 2 }}>
                      <Typography 
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          height: '4.5em', // Fixed height for bio
                          lineHeight: 1.5,
                        }}
                      >
                        {volunteer.bio}
                      </Typography>
                    </Box>
                    
                    {/* Expertise tags */}
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        flexWrap: 'wrap', 
                        gap: 0.5, 
                        mb: 2,
                        height: '3em', // Fixed height for expertise tags
                        overflow: 'hidden',
                      }}
                    >
                      {volunteer.expertise.map((skill, idx) => (
                        <Chip
                          key={idx}
                          label={skill}
                          size="small"
                          variant="outlined"
                          sx={{ 
                            fontSize: '0.7rem',
                            height: 22,
                            borderRadius: 1.5,
                            mb: 0.5,
                          }}
                        />
                      ))}
                    </Box>
                    
                    {/* Social links */}
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        justifyContent: 'center',
                        gap: 1.5,
                        mt: 'auto',
                        pt: 1,
                        height: '40px', // Fixed height for social links
                      }}
                    >
                      {volunteer.linkedIn && (
                        <Tooltip title="LinkedIn">
                          <IconButton 
                            size="small" 
                            href={volunteer.linkedIn}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{ 
                              color: '#0077B5',
                              '&:hover': { bgcolor: alpha('#0077B5', 0.1) }
                            }}
                          >
                            <LinkedIn fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}
                      
                      {volunteer.github && (
                        <Tooltip title="GitHub">
                          <IconButton 
                            size="small"
                            href={volunteer.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{ 
                              color: '#333',
                              '&:hover': { bgcolor: alpha('#333', 0.1) }
                            }}
                          >
                            <GitHub fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}
                      
                      {volunteer.twitter && (
                        <Tooltip title="Twitter">
                          <IconButton 
                            size="small"
                            href={volunteer.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{ 
                              color: '#1DA1F2',
                              '&:hover': { bgcolor: alpha('#1DA1F2', 0.1) }
                            }}
                          >
                            <Twitter fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}
                    </Box>
                  </CardContent>
                </VolunteerCard>
              </Grow>
            </Grid>
          ))}
        </Grid>
        
        {/* Empty state when no volunteers match the filter */}
        {filteredVolunteers.length === 0 && (
          <Box 
            sx={{ 
              textAlign: 'center', 
              py: 8,
              bgcolor: alpha(theme.palette.background.paper, 0.5),
              borderRadius: 4,
            }}
          >
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No volunteers found in this category
            </Typography>
            <Button 
              variant="outlined" 
              color="primary"
              onClick={() => setActiveFilter('all')}
              sx={{ mt: 2 }}
            >
              View all volunteers
            </Button>
          </Box>
        )}
        
        {/* Call to Action - Join as Volunteer */}
        <Fade in={isVisible} timeout={1000}>
          <Box 
            sx={{ 
              mt: 10, 
              mb: 4, 
              p: { xs: 3, md: 4 },
              textAlign: 'center',
              borderRadius: 4,
              background: `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.1)}, ${alpha(theme.palette.secondary.light, 0.1)})`,
              backdropFilter: 'blur(10px)',
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
            }}
          >
            <Typography 
              variant="h4" 
              component="h2" 
              gutterBottom 
              fontWeight="bold"
              sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' } }}
            >
              Want to join our volunteer team?
            </Typography>
            <Typography 
              variant="body1" 
              color="text.secondary"
              sx={{ 
                maxWidth: 700, 
                mx: 'auto',
                mb: 4
              }}
            >
              Share your skills and help us empower more women in STEM. Whether you have technical expertise
              or other valuable skills, there's a place for you in our community.
            </Typography>
            <Button 
              variant="contained" 
              color="secondary"
              size="large"
              sx={{ 
                px: { xs: 3, md: 4 }, 
                py: 1.5,
                borderRadius: 4,
                boxShadow: `0 8px 20px ${alpha(theme.palette.secondary.main, 0.3)}`,
                '&:hover': {
                  boxShadow: `0 12px 25px ${alpha(theme.palette.secondary.main, 0.4)}`,
                  transform: 'translateY(-3px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Apply to Volunteer
            </Button>
          </Box>
        </Fade>
      </Container>
    </PageWrapper>
  );
};

export default VolunteersPage;