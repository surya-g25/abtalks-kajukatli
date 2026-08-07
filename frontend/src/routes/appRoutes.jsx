import { createBrowserRouter } from 'react-router-dom'
import LandingLayout from '@/layouts/LandingLayout'
import AppLayout from '@/layouts/AppLayout'
import ErrorLayout from '@/layouts/ErrorLayout'

import LandingPage from '@/pages/LandingPage'
import DashboardPage from '@/pages/DashboardPage'
import ChallengesPage from '@/pages/ChallengesPage'
import LeaderboardPage from '@/pages/LeaderboardPage'
import ProfilePage from '@/pages/ProfilePage'
import AchievementsPage from '@/pages/AchievementsPage'
import SettingsPage from '@/pages/SettingsPage'
import NotFoundPage from '@/pages/NotFoundPage'

export const router = createBrowserRouter([
  // Public Landing Routes
  {
    path: '/',
    element: <LandingLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
    ],
  },
  // Application Main Routes (Shared App Shell Layout)
  {
    element: <AppLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: 'dashboard',
        element: <DashboardPage />,
      },
      {
        path: 'challenges',
        element: <ChallengesPage />,
      },
      {
        path: 'leaderboard',
        element: <LeaderboardPage />,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
      },
      {
        path: 'achievements',
        element: <AchievementsPage />,
      },
      {
        path: 'settings',
        element: <SettingsPage />,
      },
    ],
  },
  // Error & Catch-all Routes
  {
    element: <ErrorLayout />,
    children: [
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
])
