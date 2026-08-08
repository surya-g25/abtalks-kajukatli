/* eslint-disable react/only-export-components */
import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import LandingLayout from '@/layouts/LandingLayout'
import AppLayout from '@/layouts/AppLayout'
import ErrorLayout from '@/layouts/ErrorLayout'
import LoadingScreen from '@/components/common/LoadingScreen'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import PublicRoute from '@/components/auth/PublicRoute'

// Lazy loaded page components
const LandingPage = lazy(() => import('@/pages/LandingPage'))
const LoginPage = lazy(() => import('@/pages/LoginPage'))
const SignupPage = lazy(() => import('@/pages/SignupPage'))
const DashboardPage = lazy(() => import('@/pages/DashboardPage'))
const ChallengesPage = lazy(() => import('@/pages/ChallengesPage'))
const LeaderboardPage = lazy(() => import('@/pages/LeaderboardPage'))
const ProfilePage = lazy(() => import('@/pages/ProfilePage'))
const AchievementsPage = lazy(() => import('@/pages/AchievementsPage'))
const SettingsPage = lazy(() => import('@/pages/SettingsPage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))

export const router = createBrowserRouter([
  // 1. Public Landing Page Route
  {
    path: '/',
    element: <LandingLayout />,
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
  // 2. Public Guest-Only Auth Routes (Login / Signup)
  {
    element: <PublicRoute />,
    children: [
      {
        path: '/login',
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <LoginPage />
          </Suspense>
        ),
      },
      {
        path: '/signup',
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <SignupPage />
          </Suspense>
        ),
      },
    ],
  },
  // 3. Protected Application Main Routes
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            path: '/dashboard',
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <DashboardPage />
              </Suspense>
            ),
          },
          {
            path: '/challenges',
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <ChallengesPage />
              </Suspense>
            ),
          },
          {
            path: '/day/:id',
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <ChallengesPage />
              </Suspense>
            ),
          },
          {
            path: '/leaderboard',
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <LeaderboardPage />
              </Suspense>
            ),
          },
          {
            path: '/profile',
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <ProfilePage />
              </Suspense>
            ),
          },
          {
            path: '/achievements',
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <AchievementsPage />
              </Suspense>
            ),
          },
          {
            path: '/settings',
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <SettingsPage />
              </Suspense>
            ),
          },
          {
            path: '/analytics',
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <DashboardPage />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
  // 4. Catch-all 404 Route
  {
    path: '*',
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


