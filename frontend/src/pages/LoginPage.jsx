import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { toast } from 'sonner'

import GlassCard from '@/components/cards/GlassCard'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Checkbox from '@/components/ui/Checkbox'
import Icon from '@/components/common/Icon'
import Modal from '@/components/ui/Modal'
import { useAuth } from '@/context/AuthContext'
import { fadeIn } from '@/utils/motion'

const loginSchema = z.object({
  email: z.string().min(1, 'Email address is required').email('Invalid email address format'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
})

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [forgotModalOpen, setForgotModalOpen] = useState(false)
  const [forgotEmail, setForgotEmail] = useState('')
  const [isForgotSubmitting, setIsForgotSubmitting] = useState(false)

  const returnPath = location.state?.from || '/dashboard'

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: true,
    },
  })

  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      await login(data.email, data.password)
      navigate(returnPath, { replace: true })
    } catch (err) {
      // Error toast already displayed in AuthProvider
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialLoginMock = (provider) => {
    toast.info(`${provider} authentication is coming soon! Please sign in with email and password.`)
  }

  const handleForgotSubmit = (e) => {
    e.preventDefault()
    if (!forgotEmail || !forgotEmail.includes('@')) {
      toast.error('Please enter a valid email address')
      return
    }
    setIsForgotSubmitting(true)
    setTimeout(() => {
      setIsForgotSubmitting(false)
      setForgotModalOpen(false)
      toast.success(`Password reset instructions have been sent to ${forgotEmail}`)
      setForgotEmail('')
    }, 1000)
  }

  return (
    <div className="min-h-screen w-full bg-neutral-950 flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Dynamic Background Glow Effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        variants={fadeIn}
        initial="initial"
        animate="animate"
        className="w-full max-w-md space-y-6 relative z-10"
      >
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <Link to="/" className="inline-flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center text-neutral-950 font-black text-lg shadow-lg shadow-amber-500/25 group-hover:scale-105 transition-transform">
              AB
            </div>
            <span className="text-2xl font-black tracking-tight text-white group-hover:text-amber-400 transition-colors">
              ABTalks
            </span>
          </Link>
          <div className="space-y-1">
            <h1 className="text-2xl font-extrabold text-white tracking-tight">Welcome Back</h1>
            <p className="text-xs text-neutral-400 font-medium max-w-xs mx-auto">
              Sign in to access your daily cohort missions, streak rewards, and leaderboards.
            </p>
          </div>
        </div>

        {/* Main Card */}
        <GlassCard className="p-6 sm:p-8 border border-neutral-800/90 bg-neutral-900/60 backdrop-blur-xl shadow-2xl space-y-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            {/* Email Field */}
            <Input
              label="Email Address"
              type="email"
              placeholder="alex.rivera@abtalks.dev"
              leftIcon={<Icon name="Mail" size={16} />}
              error={errors.email?.message}
              {...register('email')}
            />

            {/* Password Field */}
            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••••••"
              leftIcon={<Icon name="Lock" size={16} />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="text-neutral-400 hover:text-white transition"
                  aria-label={showPassword ? 'Hide Password' : 'Show Password'}
                >
                  <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={16} />
                </button>
              }
              error={errors.password?.message}
              {...register('password')}
            />

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-xs pt-1">
              <Checkbox
                label="Remember me"
                id="rememberMe"
                {...register('rememberMe')}
              />
              <button
                type="button"
                onClick={() => setForgotModalOpen(true)}
                className="text-amber-400 hover:text-amber-300 font-semibold hover:underline transition"
              >
                Forgot Password?
              </button>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full font-bold shadow-amber-500/20"
              isLoading={isLoading}
            >
              Sign In
            </Button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center justify-center my-4">
            <div className="border-t border-neutral-800 w-full" />
            <span className="bg-neutral-900 px-3 text-[10px] uppercase font-bold text-neutral-500 tracking-wider absolute">
              Or continue with
            </span>
          </div>

          {/* Social OAuth Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={() => handleSocialLoginMock('Google')}
              className="w-full text-xs font-semibold hover:bg-neutral-800/80"
            >
              <Icon name="Globe" size={15} className="text-red-400 mr-1.5" />
              Google
            </Button>
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={() => handleSocialLoginMock('GitHub')}
              className="w-full text-xs font-semibold hover:bg-neutral-800/80"
            >
              <Icon name="Github" size={15} className="text-white mr-1.5" />
              GitHub
            </Button>
          </div>

          {/* Footer Link */}
          <p className="text-center text-xs text-neutral-400 font-medium pt-2">
            Don’t have an account?{' '}
            <Link
              to="/signup"
              state={location.state}
              className="text-amber-400 hover:text-amber-300 font-bold hover:underline"
            >
              Create Account
            </Link>
          </p>
        </GlassCard>
      </motion.div>

      {/* Forgot Password Modal */}
      <Modal
        isOpen={forgotModalOpen}
        onClose={() => setForgotModalOpen(false)}
        title="Reset Password"
      >
        <form onSubmit={handleForgotSubmit} className="space-y-4 pt-2">
          <p className="text-xs text-neutral-400 leading-relaxed font-medium">
            Enter the email address associated with your account and we will send you a password reset link.
          </p>
          <Input
            label="Email Address"
            type="email"
            placeholder="alex.rivera@abtalks.dev"
            value={forgotEmail}
            onChange={(e) => setForgotEmail(e.target.value)}
            leftIcon={<Icon name="Mail" size={16} />}
            required
          />
          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setForgotModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              isLoading={isForgotSubmitting}
            >
              Send Reset Link
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
