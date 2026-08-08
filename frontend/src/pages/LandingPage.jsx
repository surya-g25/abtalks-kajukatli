import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import PageWrapper from '@/components/layout-primitives/PageWrapper'
import Container from '@/components/layout-primitives/Container'
import HeroSection from '@/components/layout-primitives/HeroSection'
import PageSection from '@/components/layout-primitives/PageSection'
import SectionHeader from '@/components/layout-primitives/SectionHeader'
import SectionTitle from '@/components/layout-primitives/SectionTitle'
import SectionDescription from '@/components/layout-primitives/SectionDescription'
import CardGrid from '@/components/layout-primitives/CardGrid'
import FeatureCard from '@/components/cards/FeatureCard'
import GlassCard from '@/components/cards/GlassCard'
import Button from '@/components/ui/Button'
import Icon from '@/components/common/Icon'

// Scroll-triggered dynamic count-up component
function AnimatedCounter({ value, duration = 1.5, suffix = '' }) {
  const [count, setCount] = useState(0)
  const elementRef = useRef(null)
  const [hasAnimated, setHasAnimated] = useState(false)
  const target = parseInt(value.replace(/[^0-9]/g, ''), 10) || 0

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          let start = 0
          const end = target
          if (start === end) return

          const totalMilliseconds = duration * 1000
          const incrementTime = Math.max(Math.floor(totalMilliseconds / end), 15)
          const startTime = performance.now()

          const timer = setInterval(() => {
            const timePassed = performance.now() - startTime
            const progress = Math.min(timePassed / totalMilliseconds, 1)
            const easedProgress = progress * (2 - progress) // Ease out quad
            const currentCount = Math.floor(easedProgress * end)
            setCount(currentCount)

            if (progress === 1) {
              clearInterval(timer)
            }
          }, incrementTime)

          return () => clearInterval(timer)
        }
      },
      { threshold: 0.1 }
    )

    const currentElement = elementRef.current
    if (currentElement) {
      observer.observe(currentElement)
    }

    return () => {
      if (currentElement) {
        observer.disconnect()
      }
    }
  }, [target, duration, hasAnimated])

  return (
    <span ref={elementRef} className="font-mono font-extrabold text-amber-400">
      {count.toLocaleString()}{suffix}
    </span>
  )
}

// Reusable FAQ Accordion Item Component
function FAQItem({ question, answer, isOpen, onToggle, index }) {
  return (
    <div className="border-b border-neutral-900 last:border-0 pb-4 pt-4 first:pt-0">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between text-left font-bold text-sm sm:text-base text-white hover:text-amber-400 transition-colors py-2 focus:outline-none"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
      >
        <span>{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="text-neutral-500 hover:text-amber-400 shrink-0 ml-4"
        >
          <Icon name="ChevronDown" size={18} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-answer-${index}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mt-2 pr-4 sm:pr-8">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function LandingPage() {
  const [openFAQIndex, setOpenFAQIndex] = useState(null)
  const [activeJourneyStep, setActiveJourneyStep] = useState(0)

  // Social Proof Data
  const socialProofStats = [
    { label: 'Active Students', value: '12800', suffix: '+' },
    { label: 'Total Commits Verified', value: '450000', suffix: '+' },
    { label: 'Recruiter Outreach', value: '180', suffix: '+' },
  ]

  const logos = [
    { name: 'GitHub', icon: 'Github' },
    { name: 'Slack', icon: 'MessageSquare' },
    { name: 'Figma', icon: 'Layers' },
    { name: 'Notion', icon: 'FileText' },
    { name: 'Stripe', icon: 'CreditCard' },
    { name: 'Vercel', icon: 'Cpu' },
  ]

  // How It Works Steps
  const steps = [
    {
      title: 'Join the Challenge',
      description: 'Sign up in seconds, pick your primary coding track, and authorize your GitHub profile to hook up the automated triggers.',
      icon: 'UserPlus',
      color: 'from-blue-500/20 to-indigo-500/20 border-blue-500/30 text-blue-400',
    },
    {
      title: 'Complete Daily Tasks',
      description: 'Receive a curated coding challenge every evening, combined with self-reflection prompts inspired by raw human growth topics.',
      icon: 'Code2',
      color: 'from-amber-500/20 to-yellow-500/20 border-amber-500/30 text-amber-400',
    },
    {
      title: 'Build Public Proof',
      description: 'Commit your solution to GitHub and write a brief reflection on LinkedIn. The platform automatically tracks and verifies both.',
      icon: 'Share2',
      color: 'from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-400',
    },
    {
      title: 'Get Hired & Connect',
      description: 'Build your streak, unlock rare achievements, climb the podium, and present a verified, beautiful portfolio to partner recruiters.',
      icon: 'Briefcase',
      color: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-400',
    },
  ]

  // Benefits List
  const benefits = [
    {
      title: 'Psychological Consistency Drivers',
      description: 'Using high-motivation streak heatmaps and streak-freeze systems so you stay consistent even during dense exam seasons.',
      icon: 'Flame',
    },
    {
      title: 'Verified Public Portfolio',
      description: 'Create a live, interactive profile linking directly to automated, recruiter-verified logs of your daily progress.',
      icon: 'CheckSquare',
    },
    {
      title: 'Holistic Emotional Growth',
      description: 'Go beyond the syntax. Engage with challenges based on ABTalks podcasts, fostering emotional awareness and empathy.',
      icon: 'Heart',
    },
    {
      title: 'Active Community Learning',
      description: 'Pair program, swap feedback, and join Discord lounges with thousands of active coding peers striving for the same goals.',
      icon: 'Users',
    },
    {
      title: 'Direct Talent Matchmaking',
      description: 'Partner tech organizations skip traditional resume stacks, matching directly with users showing high-consistency scores.',
      icon: 'Compass',
    },
    {
      title: 'AI reflection Coaching',
      description: 'Write self-reflection notes and receive helpful, automated growth summaries on your communication dynamics.',
      icon: 'Sparkles',
    },
  ]

  // Student Journey Phases
  const journeyPhases = [
    {
      day: 'Day 1',
      title: 'The Spark',
      description: 'Authorize GitHub, set up your public profile, solve the first "Genesis" challenge, and write your first reflecting statement.',
      badge: 'Genesis Medal',
      xp: '+100 XP',
      difficulty: 'Easy',
    },
    {
      day: 'Day 15',
      title: 'Habit Formation',
      description: 'Establish your daily cadence. Complete 15 challenges, start your activity heatmap burning, and claim your first Streak Freeze.',
      badge: 'Habit Master',
      xp: '+500 XP',
      difficulty: 'Medium',
    },
    {
      day: 'Day 30',
      title: 'The Breakthrough',
      description: 'Navigate the midpoint hump. Tackle complex database systems and express how you handle critical feedback in team tasks.',
      badge: 'Apex Resolver',
      xp: '+1,200 XP',
      difficulty: 'Hard',
    },
    {
      day: 'Day 45',
      title: 'Brand Builder',
      description: 'Publish your progress on LinkedIn. Recruiter analytics start tracking your profile. Reach the elite Gold Communicator level.',
      badge: 'Thought Leader',
      xp: '+2,000 XP',
      difficulty: 'Expert',
    },
    {
      day: 'Day 60',
      title: 'Ultimate Graduation',
      description: 'Solve all 60 tasks. Export a beautiful, recruiter-ready public portfolio. Unlock invitation to VIP partner hire rounds.',
      badge: 'Vanguard Elite',
      xp: '+5,000 XP',
      difficulty: 'Master',
    },
  ]

  // Statistics Data
  const statsList = [
    { label: 'Global Students Joined', value: '12850', suffix: '', icon: 'Users' },
    { label: 'Commits Submitted', value: '240390', suffix: '', icon: 'GitCommit' },
    { label: 'Average Streak Rate', value: '98', suffix: '%', icon: 'Flame' },
    { label: 'Partner Recruiters Active', value: '420', suffix: '+', icon: 'Eye' },
  ]

  // Testimonials Data
  const testimonials = [
    {
      name: 'Sarah K.',
      role: 'Frontend Dev at Vercel (Alum)',
      text: 'The streak system kept me coding even during final exam week. The LinkedIn integration caught the attention of my current team Lead. Absolute game changer.',
      rating: 5,
      avatar: 'SK',
    },
    {
      name: 'Mohammed A.',
      role: 'Full Stack Engineer at Stripe (Alum)',
      text: 'Fusing coding challenges with Anas Bukhash reflection prompts taught me self-awareness. It completely changed how I answer behavioral interview questions.',
      rating: 5,
      avatar: 'MA',
    },
    {
      name: 'Elena R.',
      role: 'Software Architect (Alum)',
      text: 'Having a verified portfolio showing 60 consecutive days of coding and written reflections was my gold ticket. The recruiters literally skipped the first-round test.',
      rating: 5,
      avatar: 'ER',
    },
  ]

  // FAQ Items
  const faqList = [
    {
      question: 'What is the ABTalks 60-Day Challenge?',
      answer: 'It is a structured, gamified platform designed to build coding consistency and communication skills in students. By completing daily code prompts and self-reflection journals inspired by ABTalks episodes, you build a verified portfolio.',
    },
    {
      question: 'Do I need prior coding experience to join?',
      answer: 'No! The challenges scale from entry-level (HTML, CSS, JavaScript basics) up to expert-level system design. The progression is personalized to help you grow step-by-step.',
    },
    {
      question: 'How does the streak system work? What if I miss a day?',
      answer: 'Your streak advances when you submit your solution and reflect on it. If you have an extremely busy day, you can deploy a "Streak Freeze" (purchased with XP earned through completions) to save your record.',
    },
    {
      question: 'How are my coding submissions verified?',
      answer: 'We connect directly to your GitHub repository via API. When you commit your daily code, our automated test suite runs in the background and signs off on your task, rewarding you with XP instantly.',
    },
    {
      question: 'Is it completely free to join?',
      answer: 'Yes! The ABTalks Student Challenge is 100% free for students, funded by our hiring partner network who utilize the verified leaderboard to recruit outstanding talent.',
    },
  ]

  return (
    <PageWrapper title="Home" description="The ultimate 60-day student coding and self-reflection challenge. Join, stay consistent, and land your dream job.">
      {/* 1. Hero Section */}
      <HeroSection glow={true} className="relative select-none pb-20 pt-16 lg:py-32">
        <div className="flex flex-col items-center justify-center max-w-4xl mx-auto">
          {/* Tagline Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-6 shadow-md shadow-amber-500/5"
          >
            <Icon name="Zap" size={13} className="animate-pulse" />
            <span>ABTalks 60-Day Student Challenge</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight sm:leading-none max-w-3xl"
          >
            Master Consistency. <br />
            <span className="bg-gradient-to-r from-amber-400 via-amber-200 to-amber-600 bg-clip-text text-transparent">
              Build in Public. Get Hired.
            </span>
          </motion.h1>

          {/* Short Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-sm sm:text-lg text-neutral-400 max-w-2xl leading-relaxed font-medium"
          >
            The ultimate 60-day challenge for student developers. Connect your GitHub & LinkedIn, complete daily code reflections, build an unignorable public portfolio, and lock in direct recruiter tracks.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <Link to="/dashboard" className="w-full sm:w-auto">
              <Button variant="primary" size="lg" className="w-full sm:w-auto font-bold py-3 px-8 text-sm uppercase tracking-wider rounded-xl">
                Start Your Journey
              </Button>
            </Link>
            <Link to="/challenges" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto font-bold py-3 px-8 text-sm uppercase tracking-wider rounded-xl">
                Explore Challenges
              </Button>
            </Link>
          </motion.div>

          {/* Hero Illustration Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative w-full max-w-3xl mt-16 rounded-2xl glass-panel border border-white/5 overflow-hidden shadow-2xl shadow-black/80 aspect-[16/9] flex flex-col"
          >
            {/* Header bar */}
            <div className="h-8 sm:h-10 bg-neutral-900/80 border-b border-white/5 flex items-center justify-between px-4">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
              </div>
              <div className="text-[10px] sm:text-xs text-neutral-500 font-mono tracking-wide">abtalks-challenge.sh</div>
              <div className="w-6" />
            </div>

            {/* Mockup Workspace */}
            <div className="flex-1 flex overflow-hidden text-left font-mono">
              {/* Sidebar */}
              <div className="w-1/4 bg-neutral-950/60 border-r border-white/5 p-3 flex flex-col gap-2 text-[9px] sm:text-xs text-neutral-400 select-none">
                <div className="font-bold text-[8px] uppercase tracking-wider text-neutral-600 mb-1">Explorer</div>
                <div className="flex items-center gap-1 text-amber-500 font-semibold"><Icon name="FileText" size={11} /> reflection.js</div>
                <div className="flex items-center gap-1"><Icon name="GitFork" size={11} /> commits.log</div>
                <div className="flex items-center gap-1"><Icon name="Award" size={11} /> badges.json</div>
              </div>

              {/* Editor */}
              <div className="flex-1 bg-[#09090b]/80 p-3 sm:p-4 text-[9px] sm:text-xs text-neutral-300 leading-relaxed overflow-hidden">
                <span className="text-neutral-500 block mb-1 select-none">// Day 12: Vulnerability and Team Dynamics</span>
                <span className="text-amber-500">const </span>
                <span className="text-blue-400">challenge </span>
                <span>= </span>
                <span className="text-purple-400">new </span>
                <span className="text-yellow-400">ABTalksChallenge</span>
                <span>({'{'}</span>
                <div className="pl-4">
                  <span>day: </span>
                  <span className="text-green-400">12</span>
                  <span>,</span>
                  <br />
                  <span>theme: </span>
                  <span className="text-green-400">"Handling Criticism"</span>
                  <span>,</span>
                  <br />
                  <span>verifiedCommits: </span>
                  <span className="text-blue-400">true</span>
                  <span>,</span>
                  <br />
                  <span>xpReward: </span>
                  <span className="text-green-400">100</span>
                </div>
                <span>{'}'});</span>
                <br />
                <span className="text-amber-500 block mt-2">challenge.reflect();</span>
                <span className="text-green-400 block mt-1 font-semibold">// "Consistency builds the bridge to your goals."</span>
              </div>
            </div>

            {/* Floating glowing metrics */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="absolute top-1/4 right-4 sm:right-8 bg-neutral-900/90 border border-orange-500/30 p-2 sm:p-3 rounded-xl flex items-center gap-2 sm:gap-3 shadow-xl backdrop-blur-md"
            >
              <div className="p-1.5 sm:p-2 bg-orange-500/10 text-orange-400 rounded-lg">
                <Icon name="Flame" size={18} className="animate-pulse" />
              </div>
              <div className="text-left leading-none">
                <span className="text-[9px] font-extrabold uppercase text-neutral-500 block">Streak</span>
                <span className="text-xs sm:text-sm font-extrabold text-white font-mono">14 Days</span>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
              className="absolute bottom-1/4 left-4 sm:left-8 bg-neutral-900/90 border border-amber-500/30 p-2 sm:p-3 rounded-xl flex items-center gap-2 sm:gap-3 shadow-xl backdrop-blur-md"
            >
              <div className="p-1.5 sm:p-2 bg-amber-500/10 text-amber-400 rounded-lg">
                <Icon name="Zap" size={18} />
              </div>
              <div className="text-left leading-none">
                <span className="text-[9px] font-extrabold uppercase text-neutral-500 block">Level</span>
                <span className="text-xs sm:text-sm font-extrabold text-white font-mono">Lv. 3</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <div className="mt-12 flex flex-col items-center gap-1.5 text-neutral-500 text-[10px] font-extrabold uppercase tracking-widest cursor-pointer hover:text-amber-400 transition-colors select-none">
            <span>Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <Icon name="ArrowDown" size={14} className="text-current" />
            </motion.div>
          </div>
        </div>
      </HeroSection>

      {/* 2. Social Proof Section */}
      <PageSection borderBottom={true} className="bg-neutral-950 py-10 sm:py-16">
        <Container>
          <div className="flex flex-col items-center text-center space-y-6">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-500 block">
              Backed by verified student logs
            </span>

            {/* Metrics Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-12 w-full max-w-4xl py-4">
              {socialProofStats.map((stat, idx) => (
                <div key={idx} className="flex flex-col items-center p-4 bg-neutral-900/35 border border-neutral-900 rounded-2xl">
                  <span className="text-2xl sm:text-3xl font-extrabold text-amber-400">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </span>
                  <span className="text-xs font-semibold text-neutral-400 mt-2">{stat.label}</span>
                </div>
              ))}
            </div>

            {/* Partner logos */}
            <p className="text-neutral-500 text-xs font-semibold mt-4">Our graduates work at leading companies</p>
            <div className="w-full max-w-3xl overflow-hidden py-2 select-none">
              <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-12 opacity-40 hover:opacity-75 transition-opacity duration-300">
                {logos.map((logo, idx) => (
                  <div key={idx} className="flex items-center gap-2 hover:text-white transition">
                    <Icon name={logo.icon} size={18} className="text-neutral-400" />
                    <span className="font-sans font-bold text-xs uppercase tracking-widest text-neutral-400">{logo.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </PageSection>

      {/* 3. How It Works Section */}
      <PageSection borderBottom={true} className="bg-neutral-950/20">
        <Container>
          <SectionHeader
            title={
              <SectionTitle gradient={true} align="center">
                Four Steps to Ultimate Consistency
              </SectionTitle>
            }
            description={
              <SectionDescription align="center" size="lg" className="max-w-2xl mx-auto">
                No complex rules, no fluff. Just a clean habit loop built for growth and job-readiness.
              </SectionDescription>
            }
            align="center"
          />

          {/* Timeline Process Stepper */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12 relative">
            {/* Desktop progress connector line */}
            <div className="hidden md:block absolute top-[45px] left-8 right-8 h-0.5 bg-gradient-to-r from-blue-500/20 via-amber-500/20 to-emerald-500/20 z-0" />

            {steps.map((step, idx) => (
              <GlassCard
                key={idx}
                hoverEffect={true}
                className="relative z-10 flex flex-col justify-between items-start min-h-[200px] bg-neutral-900/40"
              >
                <div>
                  <div className={`p-3 rounded-xl border bg-gradient-to-tr ${step.color} inline-block shadow-md`}>
                    <Icon name={step.icon} size={22} />
                  </div>
                  <h4 className="text-base font-bold text-white tracking-tight mt-4">{step.title}</h4>
                  <p className="text-xs text-neutral-400 leading-relaxed mt-2">{step.description}</p>
                </div>
                <div className="text-[10px] font-extrabold font-mono text-neutral-600 mt-4">
                  0{idx + 1} / STAGE
                </div>
              </GlassCard>
            ))}
          </div>
        </Container>
      </PageSection>

      {/* 4. Features Section */}
      <PageSection borderBottom={true} className="bg-neutral-950">
        <Container>
          <SectionHeader
            title={
              <SectionTitle gradient={true} align="center">
                A Premium Suite Built for Growth
              </SectionTitle>
            }
            description={
              <SectionDescription align="center" className="max-w-2xl mx-auto">
                Everything you need to write code, track stats, build authority, and stay engaged.
              </SectionDescription>
            }
            align="center"
          />

          <CardGrid cols={3} className="mt-8">
            <FeatureCard
              title="Daily Coding Challenges"
              description="Personalized, high-quality development challenges that scale in difficulty as you advance."
              iconName="Target"
              badgeText="New"
            />
            <FeatureCard
              title="GitHub Automated Sync"
              description="Zero screenshots. Hook up your repository, push commits, and watch our tests verify your progress."
              iconName="GitBranch"
            />
            <FeatureCard
              title="LinkedIn Integration"
              description="Build in public seamlessly. Draft and post reflections straight to your professional feed."
              iconName="Linkedin"
            />
            <FeatureCard
              title="Progress Dashboard"
              description="A central command center capturing streak counts, activity patterns, and completed milestones."
              iconName="LayoutDashboard"
            />
            <FeatureCard
              title="Streak Preservation"
              description="Life happens. Use XP to claim streak-freeze elements so you never lose hard-earned consistency tags."
              iconName="Flame"
            />
            <FeatureCard
              title="XP & Levels Engine"
              description="Unlock levels (Bronze to Platinum) as you code, proving your transformation over time."
              iconName="Zap"
            />
            <FeatureCard
              title="Trophy Achievement Badges"
              description="Earn collectible, cryptographic-ready digital medals celebrating your specialized focus."
              iconName="Trophy"
            />
            <FeatureCard
              title="AI Reflection Coaching"
              description="Get automated, emotional intelligence recommendations reviewing your subjective journals."
              iconName="Brain"
            />
            <FeatureCard
              title="Regional Leaderboards"
              description="Maintain a top-10 position and get matched directly with local recruiter pipelines."
              iconName="Crown"
            />
          </CardGrid>
        </Container>
      </PageSection>

      {/* 5. Why Choose ABTalks */}
      <PageSection borderBottom={true} className="bg-neutral-950/20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Col: Headings */}
            <div className="space-y-6">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 inline-block">
                Why ABTalks
              </span>
              <SectionTitle as="h2" size="xl">
                Built to Turn Habits Into Career Assets.
              </SectionTitle>
              <SectionDescription size="lg">
                Unlike simple tutorials that teach syntax and leave you stranded, ABTalks pairs technical consistency with personal growth.
              </SectionDescription>

              <div className="pt-4 flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0">
                    <Icon name="Check" size={14} />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white">Focus on Public Authority</h5>
                    <p className="text-xs text-neutral-400">Verify your work on GitHub and get discovered naturally on LinkedIn.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0">
                    <Icon name="Check" size={14} />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white">Vulnerability & Soft Skills</h5>
                    <p className="text-xs text-neutral-400">Challenges based on emotional intelligence to make you a standout team asset.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Link to="/dashboard">
                  <Button variant="primary" className="font-bold py-2.5 px-6 rounded-lg text-xs uppercase tracking-wider">
                    Claim Free Spot
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Col: Grid of Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.slice(0, 4).map((benefit, idx) => (
                <GlassCard key={idx} hoverEffect={true} className="bg-neutral-900/30 p-5">
                  <div className="p-2.5 rounded-lg bg-neutral-950 border border-neutral-800 text-amber-400 inline-block mb-3">
                    <Icon name={benefit.icon} size={18} />
                  </div>
                  <h4 className="text-sm font-bold text-white tracking-tight">{benefit.title}</h4>
                  <p className="text-[11px] text-neutral-400 leading-relaxed mt-1.5">{benefit.description}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </Container>
      </PageSection>

      {/* 6. Student Journey Stepper */}
      <PageSection borderBottom={true} className="bg-neutral-950">
        <Container>
          <SectionHeader
            title={
              <SectionTitle gradient={true} align="center">
                60 Days of Transformation
              </SectionTitle>
            }
            description={
              <SectionDescription align="center" className="max-w-2xl mx-auto">
                Watch how a typical student evolves from Day 1 registration to Day 60 graduation.
              </SectionDescription>
            }
            align="center"
          />

          {/* Stepper controls */}
          <div className="flex justify-center items-center gap-1.5 sm:gap-3 flex-wrap mt-8">
            {journeyPhases.map((phase, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveJourneyStep(idx)}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-xs font-bold rounded-lg border uppercase tracking-wider transition-all focus:outline-none ${
                  activeJourneyStep === idx
                    ? 'bg-amber-500 border-amber-500 text-neutral-950 shadow-md shadow-amber-500/10'
                    : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                }`}
              >
                {phase.day}
              </button>
            ))}
          </div>

          {/* Active Phase display */}
          <div className="mt-8 max-w-2xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeJourneyStep}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.25 }}
                className="glass-panel p-6 sm:p-8 rounded-2xl border border-neutral-800 relative overflow-hidden"
              >
                {/* Glow ring */}
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

                <div className="flex items-center justify-between gap-4 border-b border-neutral-900/60 pb-4 mb-4">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase text-amber-500 tracking-wider">
                      {journeyPhases[activeJourneyStep].day} — Phase Goal
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mt-1">
                      {journeyPhases[activeJourneyStep].title}
                    </h3>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-500/20 bg-amber-500/10 text-amber-400 uppercase">
                    {journeyPhases[activeJourneyStep].difficulty}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  {journeyPhases[activeJourneyStep].description}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-semibold text-neutral-400 pt-4 border-t border-neutral-900/40">
                  <span className="flex items-center gap-1.5 text-amber-400">
                    <Icon name="Trophy" size={14} />
                    Badge: {journeyPhases[activeJourneyStep].badge}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Icon name="Zap" size={14} />
                    XP Value: {journeyPhases[activeJourneyStep].xp}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Container>
      </PageSection>

      {/* 7. Statistics Section */}
      <PageSection borderBottom={true} className="bg-neutral-950/20">
        <Container>
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
              {statsList.map((stat, idx) => (
                <GlassCard key={idx} hoverEffect={true} className="text-center bg-neutral-900/35">
                  <div className="p-3 bg-neutral-950 border border-neutral-800 rounded-xl text-amber-400 inline-block mb-3">
                    <Icon name={stat.icon} size={22} />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-mono block">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </h3>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-neutral-500 block mt-2">
                    {stat.label}
                  </span>
                </GlassCard>
              ))}
            </div>
          </div>
        </Container>
      </PageSection>

      {/* 8. Testimonials Section */}
      <PageSection borderBottom={true} className="bg-neutral-950">
        <Container>
          <SectionHeader
            title={
              <SectionTitle gradient={true} align="center">
                Loved by Hundreds of Students
              </SectionTitle>
            }
            description={
              <SectionDescription align="center" className="max-w-2xl mx-auto">
                Read how building habits in public helped students shift their mindset and start engineering roles.
              </SectionDescription>
            }
            align="center"
          />

          <CardGrid cols={3} className="mt-8">
            {testimonials.map((test, idx) => (
              <GlassCard key={idx} hoverEffect={true} className="flex flex-col justify-between bg-neutral-900/40 p-6">
                <div>
                  {/* Stars */}
                  <div className="flex items-center gap-1 text-amber-400 mb-4 select-none">
                    {Array.from({ length: test.rating }).map((_, s) => (
                      <Icon key={s} name="Star" size={13} strokeWidth={3} className="fill-current" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-350 leading-relaxed italic">
                    "{test.text}"
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-900/60 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center text-white text-xs font-extrabold font-mono select-none">
                    {test.avatar}
                  </div>
                  <div className="text-left leading-tight">
                    <h5 className="text-xs font-bold text-white">{test.name}</h5>
                    <span className="text-[10px] text-neutral-500 font-semibold">{test.role}</span>
                  </div>
                </div>
              </GlassCard>
            ))}
          </CardGrid>
        </Container>
      </PageSection>

      {/* 9. FAQ Section */}
      <PageSection borderBottom={true} className="bg-neutral-950/20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column: Heading */}
            <div className="space-y-4">
              <span className="text-[10px] font-extrabold uppercase text-amber-500 tracking-wider">
                Support Hub
              </span>
              <SectionTitle as="h2" size="lg">
                Common Inquiries
              </SectionTitle>
              <SectionDescription size="sm">
                Can't find what you're looking for? Reach out directly via our Discord lounge or contact email.
              </SectionDescription>
            </div>

            {/* Right Column: Accordion */}
            <div className="lg:col-span-2 glass-panel p-6 sm:p-8 rounded-2xl border border-neutral-800/80 divide-y divide-neutral-900">
              {faqList.map((faq, idx) => (
                <FAQItem
                  key={idx}
                  index={idx}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openFAQIndex === idx}
                  onToggle={() => setOpenFAQIndex(openFAQIndex === idx ? null : idx)}
                />
              ))}
            </div>
          </div>
        </Container>
      </PageSection>

      {/* 10. Final CTA Section */}
      <PageSection className="bg-neutral-950 py-16 sm:py-24">
        <Container>
          <div className="relative glass-panel rounded-3xl border border-white/5 p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl text-center flex flex-col items-center">
            {/* Ambient Background Radial Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[480px] h-[320px] sm:h-[480px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

            <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-500 mb-4 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
              Unlock Your Potential
            </span>

            <SectionTitle size="xl" className="max-w-2xl text-white">
              Ready to Turn Daily Coding Habits into Career Outcomes?
            </SectionTitle>

            <SectionDescription size="lg" className="mt-4 max-w-xl mx-auto">
              Join 12,000+ students building consistent careers. Claim your daily challenges and start matching with recruiter networks.
            </SectionDescription>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto z-10">
              <Link to="/dashboard" className="w-full sm:w-auto">
                <Button variant="primary" size="lg" className="w-full sm:w-auto font-bold py-3 px-8 text-xs uppercase tracking-wider rounded-xl shadow-lg">
                  Join Challenge Now
                </Button>
              </Link>
              <a href="https://discord.com" target="_blank" rel="noreferrer" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto font-bold py-3 px-8 text-xs uppercase tracking-wider rounded-xl">
                  <Icon name="MessageSquare" size={14} className="mr-1.5" />
                  Join Discord
                </Button>
              </a>
            </div>
          </div>
        </Container>
      </PageSection>
    </PageWrapper>
  )
}
