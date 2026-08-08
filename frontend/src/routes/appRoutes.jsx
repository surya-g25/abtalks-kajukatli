/* eslint-disable react/only-export-components */
import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import LandingLayout from '@/layouts/LandingLayout'
import AppLayout from '@/layouts/AppLayout'
import ErrorLayout from '@/layouts/ErrorLayout'
import LoadingScreen from '@/components/common/LoadingScreen'

// Lazy loaded page components
const LandingPage = lazy(() => import('@/pages/LandingPage'))
const DashboardPage = lazy(() => import('@/pages/DashboardPage'))
const ChallengesPage = lazy(() => import('@/pages/ChallengesPage'))
const LeaderboardPage = lazy(() => import('@/pages/LeaderboardPage'))
const ProfilePage = lazy(() => import('@/pages/ProfilePage'))
const AchievementsPage = lazy(() => import('@/pages/AchievementsPage'))
const SettingsPage = lazy(() => import('@/pages/SettingsPage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))

export const router = createBrowserRouter([
  // Public Landing Routes
  {
    path: '/',
    element: <LandingLayout />,
    errorElement: (
      <Suspense fallback={<LoadingScreen />}>
        <NotFoundPage />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <LandingPage />
          </Suspense>
        ),
      },
    ],
  },
  // Application Main Routes (Shared App Shell Layout)
  {
    element: <AppLayout />,
    errorElement: (
      <Suspense fallback={<LoadingScreen />}>
        <NotFoundPage />
      </Suspense>
    ),
    children: [
      {
        path: 'dashboard',
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <DashboardPage />
          </Suspense>
        ),
      },
      {
        path: 'challenges',
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <ChallengesPage />
          </Suspense>
        ),
      },
      {
        path: 'leaderboard',
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <LeaderboardPage />
          </Suspense>
        ),
      },
      {
        path: 'profile',
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <ProfilePage />
          </Suspense>
        ),
      },
      {
        path: 'achievements',
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <AchievementsPage />
          </Suspense>
        ),
      },
      {
        path: 'settings',
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <SettingsPage />
          </Suspense>
        ),
      },
    ],
  },
  // Error & Catch-all Routes
  {
    element: <ErrorLayout />,
    children: [
      {
        path: '*',
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <NotFoundPage />
          </Suspense>
        ),
      },
    ],
  },
])
