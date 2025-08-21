import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  CardActions, 
  Button, 
  Tabs, 
  Tab, 
  Chip,
  Divider,
  IconButton,
  useTheme,
  alpha,
  Fade,
  Grow,
  Zoom,
  useMediaQuery
} from '@mui/material';
import { 
  EventNote, 
  CalendarMonth, 
  Videocam, 
  People, 
  LocationOn, 
  ArrowForward, 
  ArrowBack, 
  Share,
  Bookmark,
  Close
} from '@mui/icons-material';
import {
  Dialog,
  DialogTitle,
  DialogContent
} from '@mui/material';

// Real events data based on the PDFs
const eventsData = [
  {
    id: 1,
    title: "Power of Soft Skills in STEM",
    date: "February 2024",
    type: "physical",
    location: "MMU University of Kenya",
    image: "/images/physical.jpg",
    participants: 40,
    registrations: 34,
    speakers: 4,
    partner: "WIE IEEE MMU-K",
    description: "A collaborative event focused on the importance of soft skills in STEM careers, featuring expert speakers and interactive sessions.",
    isUpcoming: false
  },
  {
    id: 2,
    title: "Weekly Webinar Series",
    date: "November 2024",
    type: "online",
    image: "/images/web0.jpg",
    participants: 350,
    registrations: 600,
    speakers: 4,
    partner: "Be Audacious Tech Community",
    description: "Four speakers per week discussing various STEM topics with approximately 50% turnout ratio.",
    isUpcoming: false
  },
  {
    id: 3,
    title: "Weekly Webinar Series Season 2",
    date: "February 2025",
    type: "online",
    image: "/images/web0.jpg",
    participants: 150,
    registrations: 190,
    speakers: 4,
    partner: "Be Audacious Tech Community",
    description: "Resumption of weekly webinar series with improved attendance rate of 75%.",
    isUpcoming: false
  },
  {
    id: 4,
    title: "Soft Skills Challenge Cohort",
    date: "August 2023",
    type: "online",
    image: "/images/softskills.jpg",
    participants: 150,
    completion: "50%",
    duration: "4 weeks per cohort",
    cohorts: 2,
    description: "A 4-week challenge focused on developing essential soft skills for STEM professionals with over 50% completion rate.",
    isUpcoming: false
  }
];

// Webinar data for specific webinars in the series
const webinarSeriesDetails = {
  2: [ // Weekly Webinar Series (ID: 2)
    {
      id: 'w1',
      title: "How to build a supportive network in tech as a student",
      date: "November 7, 2024",
      speaker: "Grace Ngari",
      speakerTitle: "ML Engineer",
      description: "Strategies to build meaningful relationships and open doors to exciting opportunities",
      image: "/images/web1.jpg",
      attendees: 85
    },
    {
      id: 'w3',
      title: "Tech Careers beyond coding",
      date: "November 14, 2024",
      speaker: "Bettirose Ngugi",
      speakerTitle: "Senior Product Manager at Microsoft",
      description: "Exploring roles in strategy, design, analysis and user experience",
      image: "/images/web2.jpg",
      attendees: 83
    },
    {
      id: 'w2',
      title: "Overcoming imposter syndrome and thriving in tech",
      date: "November 21, 2024",
      speaker: "Cindy Wanjiru Munene",
      speakerTitle: "Founder & CEO Everything data",
      description: "Invaluable tips and insights to help you unlock your full potential by overcoming imposter syndrome",
      image: "/images/web3.jpg",
      attendees: 94
    },
    {
      id: 'w4',
      title: "Adapting to rapid technological change",
      date: "November 27, 2024",
      speaker: "Marion Karanja",
      speakerTitle: "Solutions Engineer, Salesforce",
      description: "Exploring strategies to adapt and thrive in the face of rapid technological advancements.",
      image: "/images/web4.jpg",
      attendees: 77
    }
  ],
  3: [ // Weekly Webinar Series Season 2 (ID: 3)
    {
      id: 'w5',
      title: "Personal branding and linkedin for career growth",
      date: "February 20, 2025",
      speaker: "Mary Nasike Maonga",
      speakerTitle: "Employee experience and people Operations Lead at International Maritime Organization",
      description: "Learn how to position yourself for better opportunities,professional visibility and career success all through linkedin",
      image: "/images/web5.jpg",
      attendees: 80
    },
    {
      id: 'w6',
      title: "Power of mentorship and networking",
      date: "February 27, 2025",
      speaker: "Philominah Ngau",
      speakerTitle: "Software Developer",
      description: "How mentorship and networking can unlock doors in your career",
      image: "/images/web6.jpg",
      attendees: 70
    },
    {
      id: 'w7',
      title: "Mastering Leadership and Communication in tech",
      date: "March 6, 2025",
      speaker: "Lorna Juma",
      speakerTitle: "Oracle Academy Program Manager, Africa",
      description: "Game changing insights to help you lead, collaborate and thrive in the tech world",
      image: "/images/web7.jpg",
      attendees: 80
    }
  ]
};

const EventsAndWebinarsSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const [tabValue, setTabValue] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedWebinarSeries, setSelectedWebinarSeries] = useState(null);
  const [featuredEventIndex, setFeaturedEventIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  
  // Filter events based on tab
  const upcomingEvents = eventsData.filter(event => event.isUpcoming);
  const pastEvents = eventsData.filter(event => !event.isUpcoming);
  const displayedEvents = tabValue === 0 ? eventsData : tabValue === 1 ? upcomingEvents : pastEvents;
  
  // For featured event carousel - since there are no upcoming events, use the past events
  const featuredEvents = [eventsData[0], eventsData[1]];

  // For staggered card animation
  const [visibleCards, setVisibleCards] = useState([]);
  
  useEffect(() => {
    // Show cards with staggered animation effect
    const timer = setTimeout(() => {
      displayedEvents.forEach((_, index) => {
        setTimeout(() => {
          setVisibleCards(prev => [...prev, index]);
        }, index * 100);
      });
    }, 300);
    
    return () => {
      clearTimeout(timer);
      setVisibleCards([]);
    };
  }, [displayedEvents]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handlePrevFeatured = () => {
    setAnimate(false);
    setTimeout(() => {
      setFeaturedEventIndex(prev => 
        prev === 0 ? featuredEvents.length - 1 : prev - 1
      );
      setAnimate(true);
    }, 200);
  };

  const handleNextFeatured = () => {
    setAnimate(false);
    setTimeout(() => {
      setFeaturedEventIndex(prev => 
        prev === featuredEvents.length - 1 ? 0 : prev + 1
      );
      setAnimate(true);
    }, 200);
  };

  // Automatic carousel for featured events
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(false);
      setTimeout(() => {
        setFeaturedEventIndex(prev => 
          prev === featuredEvents.length - 1 ? 0 : prev + 1
        );
        setAnimate(true);
      }, 200);
    }, 5000);
    return () => clearInterval(interval);
  }, [featuredEvents.length]);

  const gradientOverlay = `linear-gradient(to top, 
    ${alpha(theme.palette.background.paper, 1)} 0%, 
    ${alpha(theme.palette.background.paper, 0.8)} 50%, 
    ${alpha(theme.palette.background.paper, 0.4)} 80%, 
    ${alpha(theme.palette.background.paper, 0)} 100%)`;

  // CSS for rotating circles animation
  const rotatingCircleStyles = {
    position: 'absolute',
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
    animation: 'rotate 120s linear infinite',
    zIndex: 0,
  };

  // Inject keyframes for rotation animation
  const keyframes = `
    @keyframes rotate {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    @keyframes rotateCounter {
      from { transform: rotate(0deg); }
      to { transform: rotate(-360deg); }
    }
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-15px); }
      100% { transform: translateY(0px); }
    }
    .event-card {
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      height: 100%;
    }
    .event-card:hover {
      transform: translateY(-5px);
      box-shadow: ${theme.shadows[8]};
    }
    .event-card:hover .card-media {
      transform: scale(1.05);
    }
    .card-media {
      transition: transform 0.5s ease;
    }
    
    /* Uniform card heights */
    .event-card-content {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    
    .webinar-grid-item {
      display: flex;
    }
    
    .webinar-card {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    
    .webinar-card-content {
      flex-grow: 1;
    }
    
    /* Make sure images are same height */
    .uniform-image {
      height: 140px;
      object-fit: cover;
      width: 100%;
    }
    
    @media (max-width: 600px) {
      .webinar-card {
        flex-direction: column;
      }
      
      .webinar-media-container {
        width: 100% !important;
      }
      
      .webinar-content-container {
        width: 100% !important;
      }
    }
  `;

  // Function to handle clicking on a webinar series
  const handleWebinarSeriesClick = (eventId) => {
    setSelectedWebinarSeries(eventId);
  };

  // Function to go back from webinar details to events list
  const handleBackToEvents = () => {
    setSelectedWebinarSeries(null);
  };

  return (
    <Box
    id="events-section"
    sx={{
      backgroundColor: theme.palette.background.paper,
      py: 8,
      position: 'relative',
      overflow: 'hidden',
    }}
  >
      {/* Inject CSS keyframes */}
      <style>{keyframes}</style>
      
      {/* Background decorative elements */}
      <Box 
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          opacity: 0.07,
          background: 'url(https://images.unsplash.com/photo-1557853197-aefb550b6fdc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)',
          backgroundSize: 'cover',
        }}
      />
      
      {/* Animated geometric shapes */}
      <Box 
        sx={{
          ...rotatingCircleStyles,
          top: '-10%',
          right: '-5%',
        }}
      />
      
      <Box 
        sx={{
          ...rotatingCircleStyles,
          bottom: '-15%',
          left: '-10%',
          width: '400px',
          height: '400px',
          border: `2px solid ${alpha(theme.palette.secondary.main, 0.15)}`,
          animation: 'rotateCounter 90s linear infinite',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Section heading */}
        <Fade in={true} timeout={1000}>
          <Box sx={{ mb: 6, textAlign: 'center' }}>
            <Typography 
              variant="overline" 
              color="secondary"
              sx={{ 
                letterSpacing: 4, 
                fontWeight: 'bold', 
                display: 'block',
                mb: 1
              }}
            >
              CONNECT & GROW
            </Typography>
            <Typography 
              variant="h3" 
              component="h2" 
              gutterBottom
              sx={{ 
                fontWeight: 800,
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2,
                fontSize: isMobile ? '2rem' : '3rem'
              }}
            >
              Events & Webinars
            </Typography>
            <Typography 
              variant="subtitle1" 
              color="text.secondary"
              sx={{ 
                maxWidth: 700, 
                mx: 'auto',
                mb: 3,
                px: isMobile ? 2 : 0
              }}
            >
              Explore our past events and webinars. Stay tuned for upcoming opportunities to connect 
              with like-minded women in STEM, gain valuable insights, and advance your career.
            </Typography>
          </Box>
        </Fade>

        {/* Featured event carousel */}
        <Zoom in={true} timeout={800}>
          <Box 
            sx={{ 
              mb: 8, 
              position: 'relative',
              height: isMobile ? 350 : 400,
              borderRadius: 4,
              overflow: 'hidden',
              boxShadow: theme.shadows[10]
            }}
          >
            {featuredEvents.map((event, index) => (
              <Fade 
                key={event.id} 
                in={index === featuredEventIndex && animate} 
                timeout={500}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  display: index === featuredEventIndex ? 'block' : 'none'
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url(${event.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <Box 
                    sx={{ 
                      position: 'absolute', 
                      top: 0, 
                      left: 0, 
                      width: '100%', 
                      height: '100%',
                      background: gradientOverlay,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      p: isMobile ? 3 : 4
                    }}
                  >
                    <Chip 
                      label="Featured" 
                      color="primary" 
                      size="small"
                      icon={<EventNote />}
                      sx={{ mb: 2, alignSelf: 'flex-start' }}
                    />
                    <Typography 
                      variant="h4" 
                      component="h3" 
                      sx={{ 
                        color: 'text.primary', 
                        fontWeight: 700, 
                        mb: 1,
                        fontSize: isMobile ? '1.5rem' : '2.125rem'
                      }}
                    >
                      {event.title}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, flexWrap: 'wrap' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mr: 3, mb: isMobile ? 1 : 0 }}>
                        <CalendarMonth sx={{ fontSize: 20, mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body1" color="text.secondary">
                          {event.date}
                        </Typography>
                      </Box>
                      {event.location && (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <LocationOn sx={{ fontSize: 20, mr: 1, color: 'text.secondary' }} />
                          <Typography variant="body1" color="text.secondary">
                            {event.location}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                    <Typography 
                      variant="body1" 
                      color="text.secondary" 
                      sx={{ 
                        mb: 3, 
                        maxWidth: isMobile ? '100%' : '80%',
                        display: isMobile && event.description.length > 100 ? '-webkit-box' : 'block',
                        WebkitLineClamp: isMobile ? 2 : 'unset',
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {event.description}
                    </Typography>
                    <Button 
                      variant="contained" 
                      color="secondary" 
                      endIcon={<ArrowForward />}
                      sx={{ alignSelf: 'flex-start' }}
                    >
                      Learn More
                    </Button>
                  </Box>
                </Box>
              </Fade>
            ))}
            
            <Box sx={{ position: 'absolute', bottom: 20, right: 20, zIndex: 2 }}>
              <IconButton 
                onClick={handlePrevFeatured} 
                sx={{ 
                  backgroundColor: alpha(theme.palette.background.paper, 0.8),
                  '&:hover': { backgroundColor: alpha(theme.palette.background.paper, 0.9) },
                  mr: 1
                }}
              >
                <ArrowBack />
              </IconButton>
              <IconButton 
                onClick={handleNextFeatured}
                sx={{ 
                  backgroundColor: alpha(theme.palette.background.paper, 0.8),
                  '&:hover': { backgroundColor: alpha(theme.palette.background.paper, 0.9) }
                }}
              >
                <ArrowForward />
              </IconButton>
            </Box>
            
            <Box 
              sx={{ 
                position: 'absolute', 
                bottom: 20, 
                left: 20, 
                zIndex: 2,
                display: 'flex'
              }}
            >
              {featuredEvents.map((_, index) => (
                <Box
                  key={index}
                  sx={{
                    height: 4,
                    width: index === featuredEventIndex ? 24 : 12,
                    borderRadius: 2,
                    backgroundColor: theme.palette.primary.main,
                    mr: 1,
                    cursor: 'pointer',
                    opacity: index === featuredEventIndex ? 1 : 0.5,
                    transition: 'all 0.3s ease'
                  }}
                  onClick={() => {
                    setAnimate(false);
                    setTimeout(() => {
                      setFeaturedEventIndex(index);
                      setAnimate(true);
                    }, 200);
                  }}
                />
              ))}
            </Box>
          </Box>
        </Zoom>

        {/* Event tabs and grid */}
        <Box sx={{ mb: 4 }}>
          {selectedWebinarSeries ? (
            <>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                <Button 
                  startIcon={<ArrowBack />} 
                  color="secondary" 
                  variant="outlined"
                  onClick={handleBackToEvents}
                  sx={{ mr: 2 }}
                >
                  Back to Events
                </Button>
                <Typography variant="h5" fontWeight={600}>
                  {eventsData.find(e => e.id === selectedWebinarSeries)?.title}
                </Typography>
              </Box>
              
              <Grid container spacing={3}>
                {webinarSeriesDetails[selectedWebinarSeries]?.map((webinar, index) => (
                  <Grid item xs={12} sm={12} md={6} key={webinar.id} className="webinar-grid-item">
                    <Grow
                      in={true}
                      timeout={400 + index * 100}
                      style={{ width: '100%' }}
                    >
                      <Card 
                        className="event-card webinar-card"
                        sx={{ 
                          display: 'flex',
                          flexDirection: isTablet ? 'column' : 'row',
                          overflow: 'hidden',
                          borderLeft: index % 2 === 0 ? `4px solid ${theme.palette.primary.main}` : `4px solid ${theme.palette.secondary.main}`,
                          height: '100%'
                        }}
                      >
                        <Box 
                          className="webinar-media-container"
                          sx={{ 
                            width: isTablet ? '100%' : '30%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: alpha(theme.palette.background.default, 0.5)
                          }}
                        >
                          <CardMedia
                            className="card-media uniform-image"
                            component="img"
                            sx={{ 
                              height: isTablet ? 140 : '100%',
                              objectFit: 'cover',
                              maxHeight: 180
                            }}
                            image={webinar.image}
                            alt={webinar.title}
                          />
                        </Box>
                        <Box 
                          className="webinar-content-container"
                          sx={{ 
                            width: isTablet ? '100%' : '70%',
                            display: 'flex',
                            flexDirection: 'column'
                          }}
                        >
                          <CardContent className="webinar-card-content">
                            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                              {webinar.date}
                            </Typography>
                            <Typography variant="h6" component="h3" gutterBottom fontWeight={600}>
                              {webinar.title}
                            </Typography>
                            <Box sx={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              mb: 2, 
                              p: 1, 
                              backgroundColor: alpha(theme.palette.background.default, 0.5),
                              borderRadius: 1
                            }}>
                              <Box 
                                sx={{ 
                                  width: 40, 
                                  height: 40, 
                                  borderRadius: '50%', 
                                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  mr: 1.5
                                }}
                              >
                                <Typography variant="h6" color="primary">
                                  {webinar.speaker.split(' ').map(n => n[0]).join('')}
                                </Typography>
                              </Box>
                              <Box>
                                <Typography variant="subtitle2" fontWeight={600} sx={{ lineHeight: 1.2 }}>
                                  {webinar.speaker}
                                </Typography>
                                <Typography 
                                  variant="caption" 
                                  color="text.secondary"
                                  sx={{
                                    display: 'block',
                                    lineHeight: 1.4,
                                    mt: 0.5,
                                    textOverflow: 'ellipsis',
                                    overflow: 'hidden',
                                    whiteSpace: webinar.speakerTitle.length > 30 ? 'normal' : 'nowrap'
                                  }}
                                >
                                  {webinar.speakerTitle}
                                </Typography>
                              </Box>
                            </Box>
                            <Typography 
                              variant="body2" 
                              color="text.secondary"
                              sx={{
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                mb: 2
                              }}
                            >
                              {webinar.description}
                            </Typography>
                            <Box sx={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              p: 1,
                              borderRadius: 1,
                              backgroundColor: alpha(theme.palette.success.light, 0.1)
                            }}>
                              <People fontSize="small" sx={{ color: theme.palette.success.main, mr: 1 }} />
                              <Typography variant="body2" fontWeight={500} color="success.main">
                                {webinar.attendees} attendees
                              </Typography>
                            </Box>
                          </CardContent>
                          <CardActions sx={{ pt: 0, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', pb: 2 }}>
                            <Button 
                              variant="outlined" 
                              size="small" 
                              color="primary"
                              startIcon={<Videocam />}
                              sx={{ borderRadius: 4, px: 2, mb: isMobile ? 1 : 0 }}
                            >
                              Watch Recording
                            </Button>
                            
                            <Button 
                              variant="text" 
                              size="small" 
                              color="secondary"
                              startIcon={<Share />}
                              sx={{ borderRadius: 4 }}
                            >
                              Share
                            </Button>
                          </CardActions>
                        </Box>
                      </Card>
                    </Grow>
                  </Grid>
                ))}
              </Grid>
            </>
          ) : (
            <>
              <Tabs 
                value={tabValue} 
                onChange={handleTabChange}
                centered
                textColor="secondary"
                indicatorColor="secondary"
                sx={{ 
                  mb: 4,
                  '& .MuiTab-root': {
                    minWidth: isMobile ? 'auto' : 120,
                    fontWeight: 600,
                    borderRadius: 2,
                    mx: isMobile ? 0.5 : 1,
                    px: isMobile ? 1 : 2,
                    '&.Mui-selected': {
                      color: theme.palette.secondary.main,
                    }
                  }
                }}
              >
                <Tab label={isMobile ? "All" : "All Events"} icon={<EventNote />} iconPosition="start" />
                <Tab label="Upcoming" icon={<CalendarMonth />} iconPosition="start" />
                <Tab label={isMobile ? "Past" : "Past Events"} icon={<Videocam />} iconPosition="start" />
              </Tabs>
              
              {/* Display "No upcoming events" message if in upcoming tab and no events */}
              {tabValue === 1 && upcomingEvents.length === 0 ? (
                <Box 
                  sx={{ 
                    width: '100%', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    justifyContent: 'center',
                    py: 8
                  }}
                >
                  <CalendarMonth sx={{ fontSize: 64, color: alpha(theme.palette.primary.main, 0.3), mb: 2 }} />
                  <Typography variant="h5" color="text.secondary" gutterBottom>
                    No upcoming events scheduled
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', maxWidth: 500, mb: 3 }}>
                    We're currently planning exciting new events for the Geek-ssters community.
                    Check back soon or sign up for notifications to be the first to know!
                  </Typography>
                  <Button 
                    variant="outlined" 
                    color="secondary"
                    startIcon={<CalendarMonth />}
                  >
                    Get Event Updates
                  </Button>
                </Box>
              ) : (
                <Grid container spacing={3}>
                  {/* Featured/Larger Card for "All Events" tab first item */}
                  {tabValue === 0 && displayedEvents.length > 0 && (
                    <Grid item xs={12} md={8} key={displayedEvents[0].id}>
                      <Grow
                        in={visibleCards.includes(0)}
                        timeout={500}
                        style={{ transformOrigin: '0 0 0' }}
                      >
                        <Card 
                          className="event-card"
                          sx={{ 
                            display: 'flex', 
                            flexDirection: 'column',
                            position: 'relative',
                            overflow: 'hidden',
                          }}
                        >
                          <Box sx={{ position: 'relative' }}>
                            <CardMedia
                              className="card-media"
                              component="img"
                              height={isMobile ? "220" : "260"}
                              image={displayedEvents[0].image}
                              alt={displayedEvents[0].title}
                            />
                            <Chip 
                              label={displayedEvents[0].type.charAt(0).toUpperCase() + displayedEvents[0].type.slice(1)} 
                              size="small"
                              color={displayedEvents[0].type === 'physical' ? 'primary' : displayedEvents[0].type === 'hybrid' ? 'warning' : 'info'}
                              sx={{ 
                                position: 'absolute', 
                                top: 16, 
                                right: 16,
                              }}
                            />
                          </Box>
                          <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                            <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                              {displayedEvents[0].title}
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <CalendarMonth sx={{ fontSize: 18, mr: 0.5, color: 'text.secondary' }} />
                                <Typography variant="body1" color="text.secondary">
                                  {displayedEvents[0].date}
                                </Typography>
                              </Box>
                              {displayedEvents[0].location && (
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                  <LocationOn sx={{ fontSize: 18, mr: 0.5, color: 'text.secondary' }} />
                                  <Typography variant="body1" color="text.secondary">
                                    {displayedEvents[0].location}
                                  </Typography>
                                </Box>
                              )}
                              {displayedEvents[0].participants && (
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                  <People sx={{ fontSize: 18, mr: 0.5, color: 'text.secondary' }} />
                                  <Typography variant="body1" color="text.secondary">
                                    {displayedEvents[0].participants} attendees
                                  </Typography>
                                </Box>
                              )}
                            </Box>
                            <Typography 
                              variant="body1" 
                              color="text.secondary" 
                              sx={{ 
                                mt: 1, 
                                mb: 2,
                                display: isMobile ? '-webkit-box' : 'block',
                                WebkitLineClamp: isMobile ? 3 : 'unset',
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden'
                              }}
                            >
                              {displayedEvents[0].description}
                            </Typography>
                            
                            {displayedEvents[0].partner && (
                              <Chip 
                                label={`Partner: ${displayedEvents[0].partner}`} 
                                size="small" 
                                variant="outlined" 
                                sx={{ mt: 1 }}
                              />
                            )}
                          </CardContent>
                          
                          <Divider />
                          
                          <CardActions>
                            <Button 
                              variant="contained"
                              color="primary" 
                              sx={{ mr: 'auto' }}
                              onClick={() => setSelectedEvent(displayedEvents[0])}
                              endIcon={<ArrowForward />}
                            >
                              {displayedEvents[0].title.includes("Webinar") ? "View Webinar Details" : "Learn More"}
                            </Button>
                            <IconButton size="small" aria-label="share">
                              <Share fontSize="small" />
                            </IconButton>
                            <IconButton size="small" aria-label="bookmark">
                              <Bookmark fontSize="small" />
                            </IconButton>
                          </CardActions>
                        </Card>
                      </Grow>
                    </Grid>
                  )}
                  
                  {/* Regular cards */}
                  {displayedEvents.map((event, index) => (
                    // Skip the first item on All Events tab as it's shown in the featured card
                    (tabValue !== 0 || index !== 0) && (
                      <Grid item xs={12} sm={6} md={tabValue === 0 ? 4 : 4} key={event.id}>
                        <Grow
                          in={visibleCards.includes(index)}
                          timeout={500 + (index % displayedEvents.length) * 100}
                          style={{ transformOrigin: '0 0 0' }}
                        >
                          <Card 
                            className="event-card"
                            sx={{ 
                              display: 'flex', 
                              flexDirection: 'column',
                              position: 'relative',
                              overflow: 'hidden',
                            }}
                          >
                            <Box sx={{ position: 'relative' }}>
                              <CardMedia
                                className="card-media uniform-image"
                                component="img"
                                height="140"
                                image={event.image}
                                alt={event.title}
                              />
                              <Chip 
                                label={event.type.charAt(0).toUpperCase() + event.type.slice(1)} 
                                size="small"
                                color={event.type === 'physical' ? 'primary' : event.type === 'hybrid' ? 'warning' : 'info'}
                                sx={{ 
                                  position: 'absolute', 
                                  top: 12, 
                                  right: 12,
                                }}
                              />
                            </Box>
                            <CardContent sx={{ flexGrow: 1, pb: 1, display: 'flex', flexDirection: 'column' }}>
                              <Typography 
                                variant="h6" 
                                component="h3" 
                                gutterBottom 
                                sx={{ 
                                  fontWeight: 600,
                                  height: '2.6em',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  display: '-webkit-box',
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: 'vertical'
                                }}
                              >
                                {event.title}
                              </Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <CalendarMonth sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary" sx={{ mr: 2 }}>
                                  {event.date}
                                </Typography>
                              </Box>
                              {event.location && (
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                  <LocationOn sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                                  <Typography variant="body2" color="text.secondary">
                                    {event.location}
                                  </Typography>
                                </Box>
                              )}
                              <Typography 
                                variant="body2" 
                                color="text.secondary" 
                                sx={{ 
                                  mt: 1, 
                                  mb: 1,
                                  flexGrow: 1,
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  display: '-webkit-box',
                                  WebkitLineClamp: 3,
                                  WebkitBoxOrient: 'vertical',
                                  height: '4.5em'
                                }}
                              >
                                {event.description}
                              </Typography>
                              
                              {event.partner && (
                                <Chip 
                                  label={`Partner: ${event.partner}`} 
                                  size="small" 
                                  variant="outlined" 
                                  sx={{ mt: 1, alignSelf: 'flex-start' }}
                                />
                              )}
                            </CardContent>
                            
                            <Divider />
                            
                            <CardActions>
                              <Button 
                                size="small" 
                                color="primary" 
                                sx={{ mr: 'auto' }}
                                onClick={() => setSelectedEvent(event)}
                              >
                                {event.title.includes("Webinar") ? "View Webinars" : "Learn More"}
                              </Button>
                              {event.title.includes("Webinar") && (
                                <Button
                                  size="small"
                                  variant="text"
                                  color="secondary"
                                  onClick={() => handleWebinarSeriesClick(event.id)}
                                >
                                  See All
                                </Button>
                              )}
                              <IconButton size="small" aria-label="share">
                                <Share fontSize="small" />
                              </IconButton>
                              <IconButton size="small" aria-label="bookmark">
                                <Bookmark fontSize="small" />
                              </IconButton>
                            </CardActions>
                            
                            {!event.isUpcoming && event.participants && (
                              <Box 
                                sx={{ 
                                  position: 'absolute',
                                  top: 140 - 16,
                                  left: 16,
                                  display: 'flex',
                                  alignItems: 'center',
                                  backgroundColor: alpha(theme.palette.background.paper, 0.9),
                                  px: 1,
                                  py: 0.5,
                                  borderRadius: 1,
                                  boxShadow: 1
                                }}
                              >
                                <People fontSize="small" sx={{ mr: 0.5, color: theme.palette.primary.main }} />
                                <Typography variant="caption" fontWeight="medium">
                                  {event.participants} attendees
                                </Typography>
                              </Box>
                            )}
                          </Card>
                        </Grow>
                      </Grid>
                    )
                  ))}
                </Grid>
              )}
            </>
          )}
        </Box>

        {/* Call to Action */}
        <Fade in={true} timeout={1500}>
          <Box 
            sx={{ 
              textAlign: 'center', 
              mt: 6, 
              py: 5, 
              px: isMobile ? 2 : 3,
              borderRadius: 4,
              background: `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.1)} 0%, ${alpha(theme.palette.secondary.light, 0.1)} 100%)`,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
            }}
          >
            <Typography 
              variant="h5" 
              component="h3" 
              gutterBottom 
              fontWeight={600}
              sx={{ fontSize: isMobile ? '1.25rem' : '1.5rem' }}
            >
              Interested in our upcoming events?
            </Typography>
            <Typography 
              variant="body1" 
              color="text.secondary" 
              sx={{ mb: 3, maxWidth: 700, mx: 'auto' }}
            >
              Stay updated on future Geek-ssters events and webinars. 
              Join our community to break the silicon ceiling with style and sass!
            </Typography>
            <Box 
              sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                gap: 2,
                flexDirection: isMobile ? 'column' : 'row',
                alignItems: 'center'
              }}
            >
              <Button 
                variant="contained" 
                color="primary" 
                size="large"
                sx={{ px: 4 }}
              >
                Join Our Community
              </Button>
              <Button 
                variant="outlined" 
                color="secondary" 
                size="large"
                sx={{ px: 4 }}
              >
                Get Notified
              </Button>
            </Box>
          </Box>
        </Fade>
      </Container>
      
      {/* Event Detail Modal */}
      {selectedEvent && (
        <Dialog
          open={Boolean(selectedEvent)}
          onClose={() => setSelectedEvent(null)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle 
            sx={{ 
              pb: 0,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Typography variant="h6" sx={{ pr: 2 }}>
              {selectedEvent.title}
            </Typography>
            <IconButton onClick={() => setSelectedEvent(null)}>
              <Close />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Box sx={{ mb: 2, mt: 2 }}>
              <img 
                src={selectedEvent.image} 
                alt={selectedEvent.title} 
                style={{ 
                  width: '100%', 
                  height: 'auto', 
                  maxHeight: '300px', 
                  objectFit: 'cover', 
                  borderRadius: '8px'
                }} 
              />
            </Box>
            <Typography variant="body1" paragraph>
              {selectedEvent.description}
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
              <Chip 
                icon={<CalendarMonth />} 
                label={selectedEvent.date} 
                variant="outlined" 
                color="primary" 
              />
              {selectedEvent.location && (
                <Chip 
                  icon={<LocationOn />} 
                  label={selectedEvent.location} 
                  variant="outlined" 
                />
              )}
              {selectedEvent.participants && (
                <Chip 
                  icon={<People />} 
                  label={`${selectedEvent.participants} attendees`} 
                  variant="outlined" 
                  color="success"
                />
              )}
              {selectedEvent.partner && (
                <Chip 
                  label={`Partner: ${selectedEvent.partner}`} 
                  variant="outlined" 
                />
              )}
            </Box>
            {selectedEvent.title.includes("Webinar") && (
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => {
                  setSelectedEvent(null);
                  handleWebinarSeriesClick(selectedEvent.id);
                }}
                startIcon={<Videocam />}
              >
                View All Webinars in This Series
              </Button>
            )}
          </DialogContent>
        </Dialog>
      )}
    </Box>
  );
};

export default EventsAndWebinarsSection;