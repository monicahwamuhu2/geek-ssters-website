// Testimonials data
export const TESTIMONIALS = [
  {
    id: 1,
    name: "Wangari Maathai",
    role: "Computer Science Student, University of Nairobi",
    avatar: "/images/testimonial1.jpg",
    quote: "Joining Geek-ssters transformed my STEM journey. The mentorship and community support gave me the confidence to pursue my passion for AI. The weekly webinars are incredibly insightful!",
    rating: 5,
    program: "Technical Track: AI/ML"
  },
  {
    id: 2,
    name: "Asha Juma",
    role: "Software Engineer, Microsoft",
    avatar: "/images/testimonial2.jpg",
    quote: "As a mentor in the Geek-ssters community, I've witnessed remarkable growth in these young women. Their dedication to breaking the silicon ceiling inspires me daily. The leadership program is truly transformative.",
    rating: 5,
    program: "Non-Technical Track: Leadership Development"
  },
  {
    id: 3,
    name: "Elizabeth Otieno",
    role: "Cloud Engineer, AWS",
    avatar: "/images/testimonial3.jpg",
    quote: "The cloud computing track and networking events helped me land my dream job. Geek-ssters doesn't just teach technical skills; they connect you with opportunities and build your confidence.",
    rating: 5,
    program: "Technical Track: Cloud Computing"
  }
];

// Social media links
export const SOCIAL_LINKS = {
  twitter: "https://twitter.com/geekssters",
  linkedin: "https://linkedin.com/company/geekssters",
  instagram: "https://instagram.com/geekssters",
  github: "https://github.com/geekssters",
  facebook: "https://facebook.com/geekssters"
};

// Statistics for Call To Action section
export const STATISTICS = [
  { 
    id: 1, 
    value: '750+', 
    label: 'Event Registrations', 
    iconName: 'School',
    subtitle: 'For webinars and workshops'
  },
  { 
    id: 2, 
    value: '13', 
    label: 'Volunteer Leaders', 
    iconName: 'Female',
    subtitle: 'Driving our initiatives'
  },
  { 
    id: 3, 
    value: '150+', 
    label: 'Challenge Participants', 
    iconName: 'Code',
    subtitle: 'In our soft skills program'
  },
  { 
    id: 4, 
    value: '40+', 
    label: 'Expert Speakers', 
    iconName: 'Star',
    subtitle: 'Sharing their knowledge'
  }
];

// Footer links
export const FOOTER_LINKS = {
  company: [
    { name: 'About Us', url: '/about' },
    { name: 'Our Mission', url: '/mission' },
    { name: 'Our Impact', url: '/impact' },
    { name: 'Partners', url: '/partners' },
    { name: 'Careers', url: '/careers' }
  ],
  resources: [
    { name: 'Blog', url: '/blog' },
    { name: 'Webinars', url: '/webinars' },
    { name: 'Tutorials', url: '/tutorials' },
    { name: 'FAQs', url: '/faqs' },
    { name: 'Support', url: '/support' }
  ],
  programs: [
    { name: 'Technical Tracks', url: '/technical-tracks', iconName: 'Code' },
    { name: 'Leadership Training', url: '/leadership', iconName: 'School' },
    { name: 'Events & Workshops', url: '/events', iconName: 'Event' },
    { name: 'Mentorship', url: '/mentorship', iconName: 'Campaign' }
  ]
};

// Contact information
export const CONTACT_INFO = [
  { type: 'Email', value: 'geekssters@outlook.com', iconName: 'Mail' },
  { type: 'Website', value: 'www.geekssters.org', iconName: 'Public' },
  { type: 'Location', value: 'Nairobi, Kenya', iconName: 'Location' }
];

// Pillars information
export const PILLARS = [
  {
    id: 0,
    title: "Technical Tracks",
    iconName: "Code",
    altIconName: "Shield",
    color: "primary",
    description: "Strengthen your technical skills with specialized tracks led by industry experts. Master cutting-edge technologies and future-proof your career in the rapidly evolving tech landscape.",
    items: ["Cybersecurity", "AI/ML", "Cloud Computing", "Data Science", "Software Development"]
  },
  {
    id: 1,
    title: "Non-Technical Tracks",
    iconName: "People",
    altIconName: "Psychology",
    color: "secondary",
    description: "Build essential soft skills and support systems for holistic career development. Navigate challenges confidently with personalized guidance and a supportive community.",
    items: ["Mental Health Programs", "Leadership Development", "Speakers Training", "Career Guidance", "Personal Branding"]
  },
  {
    id: 2,
    title: "Events & Webinars",
    iconName: "Event",
    altIconName: "Launch",
    color: "warning",
    description: "Connect, learn, and grow through our diverse events and interactive webinars. Expand your network and gain insights from leaders shaping the future of technology.",
    items: ["Campus Tours", "Industry Visits", "Workshops", "Hackathons", "Weekly Webinars"]
  }
];