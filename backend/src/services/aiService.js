import Student from '../models/Student.js'
import Challenge from '../models/Challenge.js'
import Statistics from '../models/Statistics.js'
import Progress from '../models/Progress.js'

// Simple helper to simulate delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const generateAIContent = async (type, options = {}) => {
  // Simulating network delay to represent external model API call
  await delay(800)

  // 1. Fetch dynamic student context from MongoDB
  let student = await Student.findOne({ email: 'alex.rivera@abtalks.dev' })
  if (!student) {
    student = await Student.findOne()
  }

  const studentId = student?._id
  const dayNumber = Number(options.dayNumber || 14)

  // Fetch challenge, statistics, progress
  const challenge = await Challenge.findOne({ dayNumber })
  const stats = await Statistics.findOne({ studentId })
  const progress = await Progress.findOne({ studentId })

  const challengeTitle = challenge?.title || 'Build a Custom Hook for Async Data Fetching with Auto-retry'
  const skillsList = challenge?.skillsCovered?.join(', ') || 'React 19, Custom Hooks, Async/Await, Error Handling, TypeScript'
  const completedTasksCount = challenge?.tasks?.filter((t) => t.completed).length || 6
  const totalTasksCount = challenge?.tasks?.length || 8

  // 2. Dispatch to specific generator
  switch (type) {
    case 'reflection':
      return generateReflection(challengeTitle, skillsList, completedTasksCount, totalTasksCount)

    case 'linkedin':
      return generateLinkedInPost(challengeTitle, skillsList, dayNumber, options.length || 'medium')

    case 'resume':
      return generateResumeBullets(challengeTitle, skillsList)

    case 'summary':
      return generateLearningSummary(challengeTitle, skillsList, challenge)

    case 'suggestions':
      return generateImprovementSuggestions(student, stats)

    case 'helper':
      return generateChallengeHelper(challenge)

    case 'weekly-report':
      return generateWeeklyReport(student, stats, progress)

    case 'career-coach':
      return generateCareerCoach(student, stats)

    default:
      throw new Error(`Unsupported AI generation type: ${type}`)
  }
}

// FEATURE 1: Daily Reflection
function generateReflection(title, skills, completed, total) {
  return `### TODAY'S LEARNING SUMMARY
Successfully engineered a custom async lifecycle state machine for the "${title}" mission. Completed ${completed}/${total} specifications, verifying state transitions across loading, error, and resolved conditions.

### KEY CONCEPTS MASTERED
- **State Machine Reducer**: Structured state transitions (Idle → Loading → Success/Error) to prevent unexpected UI rendering.
- **Race Condition Prevention**: Implemented AbortController to discard async responses on component unmount.
- **Exponential Backoff**: Programmed progressive retry delays (1s, 2s, 4s, etc.) to handle network jitter.

### COMMON MISTAKES ENCOUNTERED
- Attempted to update React state variables *after* component unmounted (resolved by returning abort signals inside useEffect cleanup).
- Confused delay multipliers causing exponential stack overflows during auto-retry loops (fixed by capping retry counts).

### PERSONAL TAKEAWAYS
Abstracting async state into custom hooks drastically simplifies UI codebases, reducing boilerplate and centralizing error-handling retry strategies.`
}

// FEATURE 2: LinkedIn Post
function generateLinkedInPost(title, skills, day, length) {
  const hashtags = '\n\n#ReactJS #SoftwareEngineering #WebDevelopment #JavaScript #ABTalks'

  if (length === 'short') {
    return `🚀 Day ${day} of the 60-Day Cohort Challenge!

Designed and built an enterprise-grade async hook supporting automatic retries with exponential backoff and cleanup handlers. Centralizing state hooks makes React interfaces cleaner and network calls robust.

On to Day ${day + 1}! 💻⚡${hashtags}`
  }

  if (length === 'long') {
    return `🔥 Day ${day} Cohort Milestone: Leveling up React State Management!

Today's coding challenge was complex: build a custom hook for async fetching with auto-retry. It is easy to write fetch in a useEffect, but writing code that manages intermittent connection loss, prevents memory leaks, and delays retries requires systematic state engineering.

Key elements implemented:
1️⃣ AbortController integration to cancel pending fetch queries on component unmount.
2️⃣ Configurable exponential backoff algorithms (100ms → 200ms → 400ms retry intervals).
3️⃣ Clean state structure (data, error, isLoading, isSuccess) that maps directly to the UI.

This exercise helped me understand React's render cycles, cleanup functions, and async hooks composition. Thanks to #ABTalks for the push!

Next up: global state optimization. Let's keep building! 🚀💻${hashtags}`
  }

  // Medium (Default)
  return `🚀 Day ${day} / 60: Custom React Hook for Async Fetching with Auto-retry!

Today I tackled: "${title}".
Instead of relying on boilerplate fetch blocks, I built a custom hook useAsync that cleanly isolates promise states, retries failed requests with exponential backoff delays, and cancels requests on unmount.

What I learned:
✔ composing custom hooks using ${skills}
✔ managing cleanup functions using AbortController to prevent memory leaks

Grateful for the support of my cohort peers. Onward! ⚡💻${hashtags}`
}

// FEATURE 3: Resume Bullets
function generateResumeBullets(title, skills) {
  return `- **Engineered** a production-ready custom React hook (useAsync) leveraging AbortController request cancellation, reducing unmounted state leaks and UI errors by 30%.
- **Implemented** a client-side exponential backoff retry policy for API queries, optimizing user experience under network instability.
- **Designed** a robust state machine in TypeScript to control loading, success, and error states, ensuring reliable UI transitions.
- **Improved** async codebase modularity by encapsulating data fetching logic, reducing template boilerplate code by 45%.`
}

// FEATURE 4: Learning Summary
function generateLearningSummary(title, skills, challenge) {
  const goals = challenge?.learningGoals?.map((g) => `- ${g}`).join('\n') || '- Mastering custom hook composition.\n- Handling async closures.\n- Preventing race conditions.'

  return `### WHAT WAS LEARNED TODAY
Understood how to modularize side effects in React by abstracting Promise logic from view files. Learned to model async states as strict state machines to prevent loading/error overlaps.

### KEY SKILLS GAINED
- Custom Hook Composition
- Cleanup Effects & Abort Signal Listeners
- Exponential Backoff Mathematics
- TypeScript Generics in Hook return types

### TECHNOLOGIES USED
- React 19 / Vite
- ES6 Promises & AbortControllers
- TypeScript / Node.js
- Jest / React Testing Library

### RECOMMENDED FUTURE TOPICS
- React Server Components (RSC) and async data streaming.
- Global client caching libraries (e.g. React Query / SWR) and request deduplication.`
}

// FEATURE 5: Improvement Suggestions
function generateImprovementSuggestions(student, stats) {
  const level = student?.level || 12
  const completed = stats?.completedChallenges || 28

  return `### TOMORROW'S GOAL
Implement global caching (SWR/React Query styles) on top of today's custom useAsync hook. Cache requests to prevent redundant server hits.

### NEXT SKILLS TO DEVELOP
- **Cache Invalidation**: How to prune cache stores when updating local states.
- **Suspense Transitions**: Integrating async hook loading states with React 19 Suspense boundaries.

### PRACTICE TOPICS
- Build a search bar component with debounced API queries, tying it into your useAsync hook.
- Implement offline fallback synchronization using LocalStorage or IndexedDB.

### PROJECT IDEAS
Create a dashboard module that queries weather APIs, retries on packet drops, caches results for 10 minutes, and works completely offline.

### LEARNING PATH RECOMMENDED (Level ${level})
Custom Hook Basics (Completed) ➔ Async State Machines (Active) ➔ Cache Layer Injection (Next) ➔ React Server Components (RSC)`
}

// FEATURE 6: Challenge Helper (Hints & Guidelines)
function generateChallengeHelper(challenge) {
  const title = challenge?.title || 'Build a Custom Hook'

  return `### STUDY HINTS FOR TODAY
1. **The Cleanup Function**: When building useAsync, return a cleanup function from your useEffect. Inside this cleanup, trigger \`abortController.abort()\` to cancel active requests.
2. **Exponential Backoff**: Wait time = \`delay * Math.pow(2, attemptCount)\`. Use a helper function with \`setTimeout\` wrapped in a Promise to block execution during retries.
3. **The Closure Trap**: Ensure that \`asyncFn\` or dependencies passed to the hook are stable (use \`useCallback\` on the consumer side) to prevent infinite fetch triggers.

### RELEVANT CONCEPT EXPLANATIONS
- **AbortController**: A standard Web API allowing you to signal cancellation to HTTP requests. When aborted, fetch throws an \`AbortError\` which your hook must catch and ignore.
- **Backoff Delay Jitter**: Adding random variance (jitter) to retry backoffs prevents multiple client connections from hammering backend databases simultaneously.

### COMMON CODING MISTAKES
- Forgetting to reset \`error\` state when a new fetch operation starts.
- Forgetting to return a cancel token, leading to race conditions where older requests overwrite newer data.

### BEST PRACTICES
Always define TypeScript interfaces for your hook parameters and return properties, ensuring compiler safety across all cohort project integrations.`
}

// FEATURE 7: Weekly Report
function generateWeeklyReport(student, stats, progress) {
  const name = student?.name?.split(' ')[0] || 'Student'
  const currentStreak = student?.currentStreak || 14
  const completed = stats?.completedChallenges || 28
  const xp = stats?.xpEarned || 2450
  const consistency = student?.consistency || 94

  return `### WEEKLY COHORT PERFORMANCE ANALYSIS (Hi ${name}!)

### METRICS SUMMARY
- **Completed Challenges**: ${completed}
- **XP Accumulated**: ${xp} XP
- **Active streak**: ${currentStreak} days
- **Consistency Score**: ${consistency}%

### STRENGTHS DETECTED
- **High Consistency**: You have maintained a steady learning velocity with a solid ${consistency}% consistency rating.
- **Async Logic Mastery**: Submissions demonstrate clean promise closures and correct cleanup routines.

### AREA OF IMPROVEMENT
- **Commit Granularity**: You tend to push large single commits. Try to break your work into smaller, logical feature-level pushes.
- **Social Engagement**: Share more milestones! Social engineering helps build professional network visibility.

### STRATEGIC STUDY PLAN
Focus on advanced state management and React 19 transitions next week. Aim for an extra 100 XP streak bonus by pushing code daily before 10 PM.`
}

// FEATURE 8: Career Coach
function generateCareerCoach(student, stats) {
  const level = student?.level || 12
  const commits = stats?.githubCommits || 142
  const posts = stats?.linkedinPosts || 18

  return `### ABTALKS PORTFOLIO & CAREER REPORT

### PORTFOLIO RECOMMENDATIONS
- **Feature useAsync**: Highlight today's custom useAsync hook in your portfolio readme, detailing the exponential backoff algorithm and request abort logic with a GIF.
- **Project Structure**: Clean up backend folders to match MVC standards. Highlight routing, controllers, and services separation.

### GITHUB IMPROVEMENT TARGETS (Current Commits: ${commits})
- Write detailed commit descriptions instead of generic words (e.g. "feat: add abort signals to useAsync hook" vs "fix hook").
- Pin your best repositories with clear visual diagrams (Mermaid.js charts) in the readme.

### LINKEDIN STRATEGY (Current Posts: ${posts})
- Publish short case studies describing how you solved specific bugs.
- Tag cohort peers to drive comment visibility and engineering feedback.

### INTERVIEW PREPARATION TOPICS (Level ${level})
- Explain React's fiber architecture, rendering lifecycle, and batching.
- Describe how abort controllers work and how they prevent front-end race conditions.
- Contrast Client-side state vs Server-side query caches.`
}
