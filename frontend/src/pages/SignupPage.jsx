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
import { useAuth } from '@/context/AuthContext'
import { fadeIn } from '@/utils/motion'

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[A-Za-z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,}$/

const signupSchema = z
  .object({
    name: z.string().min(2, 'Full Name must be at least 2 characters'),
    email: z.string().min(1, 'Email address is required').email('Invalid email address format'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(
        passwordRegex,
        'Password must contain upper & lowercase letters, a number, and a special character'
      ),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    termsAccepted: z.literal(true, {
      errorMap: () => ({ message: 'You must accept the terms & privacy policy' }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export default function SignupPage() {
  const { signup } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const returnPath = location.state?.from || '/dashboard'

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      termsAccepted: false,
    },
  })

  const watchPassword = watch('password', '')

  const passwordChecks = {
    length: watchPassword.length >= 8,
    uppercase: /[A-Z]/.test(watchPassword),
    lowercase: /[a-z]/.test(watchPassword),
    number: /[0-9]/.test(watchPassword),
    special: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(watchPassword),
  }

  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      await signup(data.name, data.email, data.password, data.confirmPassword)
      navigate(returnPath, { replace: true })
    } catch (err) {
      // Toast displayed in AuthProvider
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full bg-neutral-950 flex flex-col justify-center items-center p-4 relative overflow-hidden py-12">
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

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
            <h1 className="text-2xl font-extrabold text-white tracking-tight">Create your Account</h1>
            <p className="text-xs text-neutral-400 font-medium max-w-xs mx-auto">
              Join the ABTalks developer cohort and start leveling up your engineering skills today.
            </p>
          </div>
        </div>

        {/* Main Card */}
        <GlassCard className="p-6 sm:p-8 border border-neutral-800/90 bg-neutral-900/60 backdrop-blur-xl shadow-2xl space-y-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            {/* Full Name */}
            <Input
              label="Full Name"
              type="text"
              placeholder="Alex Rivera"
              leftIcon={<Icon name="User" size={16} />}
              error={errors.name?.message}
              {...register('name')}
            />

            {/* Email Address */}
            <Input
              label="Email Address"
              type="email"
              placeholder="alex.rivera@abtalks.dev"
              leftIcon={<Icon name="Mail" size={16} />}
              error={errors.email?.message}
              {...register('email')}
            />

            {/* Password */}
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

            {/* Live Password Rules Indicator */}
            {watchPassword.length > 0 && (
              <div className="p-3 rounded-lg bg-neutral-950/80 border border-neutral-800/80 space-y-1.5 text-[11px]">
                <p className="font-bold text-neutral-400 uppercase tracking-wider text-[10px]">
                  Password Requirements:
                </p>
                <div className="grid grid-cols-2 gap-1.5 font-medium">
                  <span className={`flex items-center gap-1 ${passwordChecks.length ? 'text-emerald-400' : 'text-neutral-500'}`}>
                    <Icon name={passwordChecks.length ? 'CheckCircle2' : 'Circle'} size={12} />
                    8+ Characters
                  </span>
                  <span className={`flex items-center gap-1 ${passwordChecks.uppercase && passwordChecks.lowercase ? 'text-emerald-400' : 'text-neutral-500'}`}>
                    <Icon name={passwordChecks.uppercase && passwordChecks.lowercase ? 'CheckCircle2' : 'Circle'} size={12} />
                    Upper & Lowercase
                  </span>
                  <span className={`flex items-center gap-1 ${passwordChecks.number ? 'text-emerald-400' : 'text-neutral-500'}`}>
                    <Icon name={passwordChecks.number ? 'CheckCircle2' : 'Circle'} size={12} />
                    At least 1 Number
                  </span>
                  <span className={`flex items-center gap-1 ${passwordChecks.special ? 'text-emerald-400' : 'text-neutral-500'}`}>
                    <Icon name={passwordChecks.special ? 'CheckCircle2' : 'Circle'} size={12} />
                    Special Character
                  </span>
                </div>
              </div>
            )}

            {/* Confirm Password */}
            <Input
              label="Confirm Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••••••"
              leftIcon={<Icon name="Lock" size={16} />}
              error={errors.confirmPassword?.message}
              {...register('confirmPassword')}
            />

            {/* Terms Checkbox */}
            <div className="space-y-1 pt-1">
              <Checkbox
                label="I agree to the Terms of Service and Privacy Policy"
                id="termsAccepted"
                {...register('termsAccepted')}
              />
              {errors.termsAccepted && (
                <p className="text-xs text-red-400 font-medium pl-6">
                  {errors.termsAccepted.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full font-bold shadow-amber-500/20"
              isLoading={isLoading}
            >
              Create Account
            </Button>
          </form>

          {/* Footer Link */}
          <p className="text-center text-xs text-neutral-400 font-medium pt-2 border-t border-neutral-800">
            Already have an account?{' '}
            <Link
              to="/login"
              state={location.state}
              className="text-amber-400 hover:text-amber-300 font-bold hover:underline"
            >
              Sign In
            </Link>
          </p>
        </GlassCard>
      </motion.div>
    </div>
  )
}
