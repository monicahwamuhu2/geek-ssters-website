// components/NavBar.js
import React, { useState, useEffect, useMemo } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  Container,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material/styles';

// Logo for the navbar
const Logo = styled('img')(({ theme }) => ({
  height: 40,
  marginRight: theme.spacing(1),
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)'
  }
}));

// Transparent navbar that becomes solid on scroll
const TransparentAppBar = styled(AppBar)(({ theme, scrolled }) => ({
  background: scrolled 
    ? theme.palette.background.paper 
    : 'transparent',
  boxShadow: scrolled 
    ? '0 4px 20px rgba(0,0,0,0.1)' 
    : 'none',
  transition: 'all 0.3s ease',
  color: scrolled 
    ? theme.palette.text.primary 
    : theme.palette.common.white,
  backdropFilter: scrolled ? 'blur(10px)' : 'none',
  borderBottom: scrolled 
    ? `1px solid ${theme.palette.divider}` 
    : 'none',
}));

const NavButton = styled(Button)(({ theme, scrolled, active }) => ({
  color: scrolled 
    ? theme.palette.text.primary 
    : theme.palette.common.white,
  margin: theme.spacing(0, 1),
  fontWeight: active ? 600 : 500,
  position: 'relative',
  '&:hover': {
    backgroundColor: scrolled 
      ? 'rgba(106, 27, 154, 0.08)' 
      : 'rgba(255, 255, 255, 0.1)',
  },
  '&::after': active ? {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    width: '30%',
    height: '2px',
    backgroundColor: theme.palette.secondary.main,
    transform: 'translateX(-50%)',
  } : {}
}));

const BrandTypography = styled(Typography)(({ theme, scrolled }) => ({
  fontWeight: 700,
  letterSpacing: '0.5px',
  background: scrolled 
    ? 'linear-gradient(45deg, #6a1b9a 30%, #9c27b0 90%)' 
    : 'none',
  WebkitBackgroundClip: scrolled ? 'text' : 'unset',
  WebkitTextFillColor: scrolled ? 'transparent' : 'inherit',
  transition: 'all 0.3s ease'
}));

const JoinButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  padding: theme.spacing(0.75, 2.5),
  fontWeight: 600,
  boxShadow: '0 4px 10px rgba(156, 39, 176, 0.3)',
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: '0 6px 15px rgba(156, 39, 176, 0.4)',
    transform: 'translateY(-2px)'
  }
}));

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [activePage, setActivePage] = useState('hero-section');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Navigation items with corresponding section IDs - memoized to prevent recreation on each render
  const navItems = useMemo(() => [
    { name: 'Home', id: 'hero-section' },
    { name: 'Mission', id: 'mission-section' },
    { name: 'Pillars', id: 'pillars-section' },
    { name: 'Events', id: 'events-section' },
    { name: 'Impact', id: 'impact-section' }, 
    { name: 'Team', id: 'team-section' },
    { name: 'Testimonials', id: 'testimonials-section' }
  ], []);

  // Handle scroll effect and active section detection
  useEffect(() => {
    const handleScroll = () => {
      // Check if page is scrolled for navbar appearance
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
      
      // Determine which section is currently in view
      const sections = navItems.map(item => {
        const element = document.getElementById(item.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          return {
            id: item.id,
            name: item.name,
            // Consider section in view if its top is near viewport top (accounting for navbar height)
            top: rect.top,
            bottom: rect.bottom,
            inView: rect.top <= 100 && rect.bottom > 100
          };
        }
        return { id: item.id, name: item.name, top: 0, bottom: 0, inView: false };
      }).filter(section => section.top !== 0 || section.bottom !== 0); // Filter out sections that don't exist

      // Find the section that's currently in view, or the one closest to the top
      let activeSection = sections.find(section => section.inView);
      
      if (!activeSection && sections.length > 0) {
        // If no section is exactly in view, find the one closest to being in view
        activeSection = sections.reduce((closest, section) => {
          const sectionDistance = Math.abs(section.top);
          const closestDistance = Math.abs(closest.top);
          return sectionDistance < closestDistance ? section : closest;
        });
      }
      
      if (activeSection && activeSection.id !== activePage) {
        setActivePage(activeSection.id);
      } else if (window.scrollY <= 100) {
        // Near the top of the page, set Home as active
        setActivePage('hero-section');
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Call once on mount to set initial active section
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled, navItems, activePage]);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavClick = (sectionId) => {
    // Scroll to the section
    const element = document.getElementById(sectionId);
    if (element) {
      // Calculate offset to account for fixed navbar height
      const navbarHeight = 80; // Adjust this value based on your navbar height
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      setActivePage(sectionId);
    }
    handleClose();
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActivePage('hero-section');
  };

  return (
    <TransparentAppBar position="fixed" scrolled={scrolled ? 1 : 0}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <Box 
              component="a" 
              onClick={handleLogoClick}
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                textDecoration: 'none', 
                color: 'inherit',
                cursor: 'pointer'
              }}
            >
              <Logo src="/images/logo.jpg" alt="Geek-ssters Logo" />
              <BrandTypography 
                variant="h6" 
                component="div"
                scrolled={scrolled ? 1 : 0}
              >
                GEEK-SSTERS
              </BrandTypography>
            </Box>
          </Box>

          {isMobile ? (
            <>
              <IconButton
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={handleMenu}
                sx={{ 
                  ml: 2,
                  border: scrolled ? 'none' : '1px solid rgba(255,255,255,0.3)',
                  '&:hover': {
                    backgroundColor: scrolled 
                      ? 'rgba(106, 27, 154, 0.08)' 
                      : 'rgba(255, 255, 255, 0.1)',
                  }
                }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{
                  elevation: 3,
                  sx: {
                    mt: 1.5,
                    width: 200,
                    borderRadius: 2,
                    '& .MuiMenuItem-root': {
                      px: 2,
                      py: 1.5,
                      typography: 'body1',
                      borderRadius: 1,
                      mx: 1,
                      my: 0.5,
                      '&.active': {
                        backgroundColor: 'rgba(156, 39, 176, 0.08)',
                        color: 'secondary.main',
                        fontWeight: 600
                      }
                    }
                  }
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                {navItems.map((item) => (
                  <MenuItem 
                    key={item.id} 
                    onClick={() => handleNavClick(item.id)}
                    className={activePage === item.id ? 'active' : ''}
                    sx={{ textDecoration: 'none' }}
                  >
                    {item.name}
                  </MenuItem>
                ))}
                <Box sx={{ px: 2, py: 1.5 }}>
                  <Button 
                    variant="contained" 
                    color="secondary"
                    fullWidth
                    sx={{ mt: 1 }}
                    onClick={() => handleNavClick('join-us')}
                  >
                    Join Us
                  </Button>
                </Box>
              </Menu>
            </>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {navItems.map((item) => (
                <NavButton 
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  scrolled={scrolled ? 1 : 0}
                  active={activePage === item.id ? 1 : 0}
                >
                  {item.name}
                </NavButton>
              ))}
              <JoinButton 
                variant="contained" 
                color="secondary"
                sx={{ ml: 2 }}
                onClick={() => handleNavClick('join-us')}
              >
                Join Us
              </JoinButton>
            </Box>
          )}
        </Toolbar>
      </Container>
    </TransparentAppBar>
  );
};

export default NavBar;