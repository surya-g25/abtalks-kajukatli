import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '@/layouts/MainLayout'
import NotFoundPage from '@/pages/NotFoundPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: (
          <div className="flex items-center justify-center min-h-[80vh]">
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">ABTalks Platform</h1>
              <p className="text-sm text-neutral-400">Foundation Architecture Ready</p>
            </div>
          </div>
        ),
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
])
