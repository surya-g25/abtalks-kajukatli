export const mainNavigation = [
  {
    id: 'landing',
    title: 'Home',
    icon: 'Home',
    route: '/',
    description: 'Platform overview and landing page',
    visibility: 'public',
    permission: null,
  },
  {
    id: 'dashboard',
    title: 'Dashboard',
    icon: 'LayoutDashboard',
    route: '/dashboard',
    description: 'Personalized user dashboard',
    visibility: 'private',
    permission: null,
  },
  {
    id: 'challenges',
    title: 'Challenges',
    icon: 'Trophy',
    route: '/challenges',
    description: 'Explore active challenges and talks',
    visibility: 'both',
    permission: null,
  },
  {
    id: 'leaderboard',
    title: 'Leaderboard',
    icon: 'BarChart3',
    route: '/leaderboard',
    description: 'Community rankings and achievements',
    visibility: 'both',
    permission: null,
  },
  {
    id: 'achievements',
    title: 'Achievements',
    icon: 'Award',
    route: '/achievements',
    description: 'User milestones and badges',
    visibility: 'private',
    permission: null,
  },
  {
    id: 'profile',
    title: 'Profile',
    icon: 'User',
    route: '/profile',
    description: 'User profile and settings',
    visibility: 'private',
    permission: null,
  },
  {
    id: 'settings',
    title: 'Settings',
    icon: 'Settings',
    route: '/settings',
    description: 'Account preferences and configurations',
    visibility: 'private',
    permission: null,
  },
]

export const mobileBottomNavigation = [
  { id: 'dashboard', title: 'Dashboard', icon: 'LayoutDashboard', route: '/dashboard' },
  { id: 'challenges', title: 'Challenges', icon: 'Trophy', route: '/challenges' },
  { id: 'leaderboard', title: 'Leaderboard', icon: 'BarChart3', route: '/leaderboard' },
  { id: 'profile', title: 'Profile', icon: 'User', route: '/profile' },
]

export const footerNavigation = {
  product: [
    { label: 'Platform Overview', route: '/' },
    { label: 'Challenges', route: '/challenges' },
    { label: 'Leaderboard', route: '/leaderboard' },
  ],
  company: [
    { label: 'About ABTalks', route: '#' },
    { label: 'Community', route: '#' },
    { label: 'Careers', route: '#' },
  ],
  legal: [
    { label: 'Privacy Policy', route: '#' },
    { label: 'Terms of Service', route: '#' },
    { label: 'Cookie Policy', route: '#' },
  ],
  socials: [
    { label: 'GitHub', icon: 'Github', href: 'https://github.com' },
    { label: 'Twitter', icon: 'Twitter', href: 'https://twitter.com' },
    { label: 'Discord', icon: 'MessageSquare', href: 'https://discord.com' },
  ],
}
