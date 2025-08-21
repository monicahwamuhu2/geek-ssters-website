import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  useMediaQuery,
  Collapse,
  useTheme,
  alpha,
  Paper
} from '@mui/material';
import {
  Twitter as TwitterIcon,
  //Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
  GitHub as GitHubIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  //Public as PublicIcon,
  MailOutline as MailIcon,
  //Phone as PhoneIcon,
  Code as CodeIcon,
  School as SchoolIcon,
  EventNote as EventIcon,
  LocationOn as LocationIcon,
  Campaign as CampaignIcon,
  Favorite as HeartIcon,
  Forum as ForumIcon,
  People as PeopleIcon,
  Feedback as FeedbackIcon,
  CalendarMonth as CalendarIcon,
  StarBorder as StarIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Styled components
const FooterWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  position: 'relative',
  overflow: 'hidden',
  paddingTop: theme.spacing(8),
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
    backgroundSize: '200% 100%',
    animation: 'gradientMove 15s infinite linear',
  },
}));

const FooterContainer = styled(Container)(({ theme }) => ({
  position: 'relative',
  zIndex: 5,
}));

const SocialButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.secondary,
  backgroundColor: alpha(theme.palette.primary.main, 0.08),
  transition: 'all 0.3s ease',
  marginRight: theme.spacing(1),
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    transform: 'translateY(-3px)',
    boxShadow: `0 6px 15px ${alpha(theme.palette.primary.main, 0.3)}`,
  },
}));

const FooterLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.secondary,
  textDecoration: 'none',
  transition: 'all 0.2s ease',
  position: 'relative',
  '&:hover': {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&::after': {
      width: '100%',
      left: 0,
    },
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    width: '0',
    height: '2px',
    bottom: -2,
    right: 0,
    backgroundColor: theme.palette.primary.main,
    transition: 'width 0.3s ease, left 0.3s ease',
  },
}));

const FooterHeading = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  marginBottom: theme.spacing(2),
  position: 'relative',
  display: 'inline-block',
  '&::after': {
    content: '""',
    position: 'absolute',
    width: '30px',
    height: '2px',
    bottom: -5,
    left: 0,
    backgroundColor: theme.palette.secondary.main,
  },
}));

const AccordionHeader = styled(Box)(({ theme, isOpen }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  cursor: 'pointer',
  paddingBottom: theme.spacing(1),
  transition: 'all 0.2s ease',
  '&:hover': {
    color: theme.palette.primary.main,
  },
  '& .icon': {
    transition: 'transform 0.3s ease',
    transform: isOpen ? 'rotate(-180deg)' : 'rotate(0)',
  },
}));

const NewsletterBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2.5),
  borderRadius: theme.shape.borderRadius * 2,
  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0.05)} 0%, ${alpha(theme.palette.primary.main, 0.1)} 100%)`,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  boxShadow: 'none',
  position: 'relative',
  overflow: 'hidden',
}));

const FooterButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 3,
  textTransform: 'none',
  fontWeight: 600,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: `0 6px 15px ${alpha(theme.palette.primary.main, 0.25)}`,
  },
}));

const Logo = styled('img')(({ theme }) => ({
  height: 40,
  marginRight: theme.spacing(1),
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)'
  }
}));

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const currentYear = new Date().getFullYear();
  
  // Contact info
  const contactInfo = [
    { type: 'Email', value: 'geekssters@outlook.com', icon: <MailIcon fontSize="small" /> },
    { type: 'Location', value: 'Nairobi, Kenya', icon: <LocationIcon fontSize="small" /> }
  ];
  
  // State for mobile accordions
  const [openSections, setOpenSections] = useState({
    engage: true,
    learn: false,
    programs: false,
    contact: false
  });

  const toggleSection = (section) => {
    if (isMobile || isTablet) {
      setOpenSections({
        ...openSections,
        [section]: !openSections[section]
      });
    }
  };
  
  // Function to render footer section with accordion for mobile/tablet
  const renderFooterSection = (title, links, section, icon) => {
    return (
      <Box sx={{ mb: 4 }}>
        <AccordionHeader 
          isOpen={openSections[section]} 
          onClick={() => toggleSection(section)}
          sx={{ display: { xs: 'flex', md: section === 'contact' ? 'flex' : 'none' } }}
        >
          <FooterHeading variant="h6">
            {icon && <Box component="span" sx={{ mr: 1, verticalAlign: 'middle' }}>{icon}</Box>}
            {title}
          </FooterHeading>
          {(isMobile || isTablet) && (
            <Box className="icon">
              {openSections[section] ? 
                <KeyboardArrowUpIcon /> : 
                <KeyboardArrowDownIcon />
              }
            </Box>
          )}
        </AccordionHeader>
        
        {/* For desktop, always show content */}
        <Box sx={{ display: { md: section === 'contact' ? 'none' : 'block', xs: 'none' } }}>
          <List dense disablePadding>
            {Array.isArray(links) && links.map((link, index) => (
              <ListItem 
                key={index} 
                disablePadding 
                sx={{ mb: 1 }}
              >
                {link.icon && (
                  <ListItemIcon sx={{ minWidth: 36, color: 'text.secondary' }}>
                    {link.icon}
                  </ListItemIcon>
                )}
                <ListItemText 
                  primary={
                    <FooterLink href={link.url} underline="none">
                      {link.name}
                    </FooterLink>
                  } 
                />
              </ListItem>
            ))}
          </List>
        </Box>
        
        {/* For mobile/tablet, use collapse */}
        <Collapse in={openSections[section]} timeout="auto" unmountOnExit>
          <Box sx={{ pt: 1, pb: 2 }}>
            {section === 'contact' ? (
              <List dense disablePadding>
                {contactInfo.map((info, index) => (
                  <ListItem key={index} disablePadding sx={{ mb: 1.5 }}>
                    <ListItemIcon sx={{ minWidth: 36, color: theme.palette.primary.main }}>
                      {info.icon}
                    </ListItemIcon>
                    <ListItemText 
                      primary={info.type}
                      secondary={info.value}
                      primaryTypographyProps={{ 
                        variant: 'body2',
                        fontWeight: 'medium'
                      }}
                      secondaryTypographyProps={{ 
                        variant: 'body2'
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <List dense disablePadding>
                {Array.isArray(links) && links.map((link, index) => (
                  <ListItem 
                    key={index} 
                    disablePadding 
                    sx={{ mb: 1 }}
                  >
                    {link.icon && (
                      <ListItemIcon sx={{ minWidth: 36, color: 'text.secondary' }}>
                        {link.icon}
                      </ListItemIcon>
                    )}
                    <ListItemText 
                      primary={
                        <FooterLink href={link.url} underline="none">
                          {link.name}
                        </FooterLink>
                      } 
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </Box>
        </Collapse>
      </Box>
    );
  };

  // Updated footer links focused on user retention
  const footerLinks = {
    engage: [
      { name: 'Join Community', url: '/join', icon: <PeopleIcon fontSize="small" /> },
      { name: 'Upcoming Events', url: '/events', icon: <CalendarIcon fontSize="small" /> },
      { name: 'Volunteer', url: '/volunteer', icon: <HeartIcon fontSize="small" /> },
      { name: 'Success Stories', url: '/stories', icon: <StarIcon fontSize="small" /> },
      { name: 'Forum', url: '/forum', icon: <ForumIcon fontSize="small" /> }
    ],
    learn: [
      { name: 'Webinars Library', url: '/webinars', icon: <EventIcon fontSize="small" /> },
      { name: 'Tutorial Hub', url: '/tutorials', icon: <SchoolIcon fontSize="small" /> },
      { name: 'Resources', url: '/resources', icon: <CodeIcon fontSize="small" /> },
      { name: 'Mentorship', url: '/mentorship', icon: <PeopleIcon fontSize="small" /> }
    ],
    programs: [
      { name: 'Technical Tracks', url: '/technical-tracks', icon: <CodeIcon fontSize="small" /> },
      { name: 'Leadership Program', url: '/leadership', icon: <SchoolIcon fontSize="small" /> },
      { name: 'Upcoming Workshops', url: '/workshops', icon: <EventIcon fontSize="small" /> },
      { name: 'Join Next Cohort', url: '/apply', icon: <CampaignIcon fontSize="small" /> }
    ]
  };
  
  // Main render content
  return (
    <FooterWrapper>
      {/* Decorative background elements */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '50%',
          height: '100%',
          opacity: 0.02,
          background: 'url("data:image/svg+xml,%3Csvg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M0 0h16v16H0V0zm8 8v8h8V8H8zm8-8H8v8h8V0z" fill="%236a1b9a" fill-opacity="1" fill-rule="evenodd"/%3E%3C/svg%3E")',
        }}
      />

      <FooterContainer maxWidth="lg">
        <Grid container spacing={4}>
          {/* Column 1 - Logo and Intro */}
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Logo src="/images/logo.jpg" alt="Geek-ssters Logo" />
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    fontWeight: 700,
                    background: 'linear-gradient(45deg, #6a1b9a 30%, #9c27b0 90%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  GEEK-SSTERS
                </Typography>
              </Box>
              <Typography 
                variant="body2" 
                color="text.secondary" 
                sx={{ mb: 2, maxWidth: 350 }}
              >
                A vibrant community of brilliant and ambitious women in STEM, fostering an inclusive space 
                where girls can thrive, connect and excel in science, technology, engineering and mathematics.
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" color="text.primary" gutterBottom>
                  Connect With Us
                </Typography>
                <Box sx={{ display: 'flex', mt: 1 }}>
                  <Tooltip title="Twitter">
                    <SocialButton size="medium" aria-label="Twitter" component="a" href="/community/twitter">
                      <TwitterIcon fontSize="small" />
                    </SocialButton>
                  </Tooltip>
                  <Tooltip title="LinkedIn">
                    <SocialButton size="medium" aria-label="LinkedIn" component="a" href="/community/linkedin">
                      <LinkedInIcon fontSize="small" />
                    </SocialButton>
                  </Tooltip>
                  <Tooltip title="Instagram">
                    <SocialButton size="medium" aria-label="Instagram" component="a" href="/community/instagram">
                      <InstagramIcon fontSize="small" />
                    </SocialButton>
                  </Tooltip>
                  <Tooltip title="GitHub">
                    <SocialButton size="medium" aria-label="GitHub" component="a" href="/community/github">
                      <GitHubIcon fontSize="small" />
                    </SocialButton>
                  </Tooltip>
                </Box>
              </Box>
              
              <NewsletterBox>
                <Box sx={{ position: 'absolute', top: -25, right: -25, opacity: 0.05 }}>
                  <HeartIcon sx={{ fontSize: 120 }} />
                </Box>
                <Typography variant="subtitle1" color="primary.dark" fontWeight="bold" gutterBottom>
                  Stay in the Loop
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Get notified about upcoming events, workshops, and opportunities.
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexDirection: { xs: 'column', sm: 'row' } }}>
                  <FooterButton
                    variant="contained"
                    color="primary"
                    disableElevation
                    sx={{ whiteSpace: 'nowrap' }}
                    href="/newsletter"
                  >
                    Subscribe Now
                  </FooterButton>
                </Box>
              </NewsletterBox>
            </Box>
          </Grid>

          {/* Column 2 - Engage Links */}
          <Grid item xs={12} sm={6} md={2.5}>
            {renderFooterSection('Get Involved', footerLinks.engage, 'engage', <PeopleIcon fontSize="small" />)}
          </Grid>

          {/* Column 3 - Learn */}
          <Grid item xs={12} sm={6} md={2.5}>
            {renderFooterSection('Learn & Grow', footerLinks.learn, 'learn', <SchoolIcon fontSize="small" />)}
          </Grid>

          {/* Column 4 - Programs */}
          <Grid item xs={12} sm={6} md={3}>
            {renderFooterSection('Our Programs', footerLinks.programs, 'programs', <EventIcon fontSize="small" />)}
          </Grid>
          
          {/* Contact section - Only displayed on desktop - Mobile version is in accordion */}
          <Grid item xs={12} md={4} sx={{ display: { xs: 'none', md: 'block' } }}>
            <FooterHeading variant="h6">Contact Us</FooterHeading>
            <List dense disablePadding>
              {contactInfo.map((info, index) => (
                <ListItem key={index} disablePadding sx={{ mb: 1.5 }}>
                  <ListItemIcon sx={{ minWidth: 36, color: theme.palette.primary.main }}>
                    {info.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={info.type}
                    secondary={info.value}
                    primaryTypographyProps={{ 
                      variant: 'body2',
                      fontWeight: 'medium'
                    }}
                    secondaryTypographyProps={{ 
                      variant: 'body2'
                    }}
                  />
                </ListItem>
              ))}
              <ListItem disablePadding sx={{ mt: 3, mb: 1 }}>
                <FooterButton
                  variant="outlined"
                  color="primary"
                  size="small"
                  startIcon={<FeedbackIcon />}
                  href="/contact"
                  sx={{ borderRadius: 4 }}
                >
                  Send us a message
                </FooterButton>
              </ListItem>
            </List>
          </Grid>
          
          {/* Contact accordion for mobile */}
          <Grid item xs={12} sx={{ display: { xs: 'block', md: 'none' } }}>
            {renderFooterSection('Contact Us', null, 'contact', <MailIcon fontSize="small" />)}
          </Grid>
        </Grid>

        <Divider sx={{ my: 3, opacity: 0.6 }} />
        
        {/* Bottom section */}
        <Grid container spacing={2} justifyContent="space-between" alignItems="center" sx={{ pb: 3 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="body2" color="text.secondary">
              © {currentYear} Geek-ssters. Breaking the silicon ceiling with style and sass.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' }, gap: 2, flexWrap: 'wrap' }}>
              <FooterLink href="/about" variant="body2">About Us</FooterLink>
              <FooterLink href="/mission" variant="body2">Our Mission</FooterLink>
              <FooterLink href="/team" variant="body2">Our Team</FooterLink>
            </Box>
          </Grid>
        </Grid>
      </FooterContainer>
      
      {/* Animations CSS */}
      <style jsx="true">{`
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0); }
        }
      `}</style>
    </FooterWrapper>
  );
};

export default Footer;