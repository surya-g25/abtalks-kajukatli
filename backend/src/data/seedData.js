export const mockStudent = {
  name: 'Alex Rivera',
  email: 'alex.rivera@abtalks.dev',
  avatar: '',
  level: 12,
  xp: 2450,
  currentStreak: 14,
  longestStreak: 21,
  streakFreeze: { active: 1, available: 2 },
  title: 'Code Alchemist',
  rank: 4,
  bio: 'Full-stack React & Node.js Developer in ABTalks cohort.',
  github: 'alexrivera',
  linkedin: 'alexrivera',
}

export const mockChallengeDay14 = {
  dayNumber: 14,
  title: 'Build a Custom Hook for Async Data Fetching with Auto-retry',
  category: 'React & Async Logic',
  difficulty: 'Intermediate',
  timeEstimate: '45 mins',
  xpReward: 150,
  progress: 80,
  description: 'Master async lifecycle state management, exponential backoff strategy, cancellation tokens, and automated retry error handling in modern React applications.',
  problemStatement: 'Standard useEffect data fetching often leads to unhandled rejection states, memory leaks on unmounted components, and lack of automatic retry support when third-party APIs experience intermittent dropped packets.',
  expectedOutcome: 'A fully tested useAsync(asyncFn, options) hook that returns { data, error, isLoading, retry, cancel } with automatic retry logic and unit test coverage.',
  learningGoals: [
    'Design a reusable useAsync hook supporting data, error, isLoading, isError, and isSuccess states.',
    'Implement exponential backoff retry algorithms with configurable max retry attempts.',
    'Handle race conditions and memory leaks by implementing AbortController cleanup functions.',
    'Publish a clean GitHub repository with typed interfaces and unit test coverage.',
  ],
  skillsCovered: ['React 19', 'Custom Hooks', 'Async / Await', 'Error Handling', 'TypeScript', 'State Machines'],
  prerequisites: ['React Hooks Basics', 'JavaScript Promises', 'Fetch API'],
  proTips: 'Always pass an AbortController.signal to fetch calls inside the hook cleanup return function to prevent updating state on unmounted React components.',
  resources: [
    {
      title: 'Official React Docs — Custom Hooks',
      type: 'Documentation',
      url: 'https://react.dev/learn/reusing-logic-with-custom-hooks',
      description: 'Comprehensive guidelines on state extraction, hook composition, and effect cleanup patterns.',
    },
    {
      title: 'MDN Web Docs — AbortController Signal',
      type: 'Reference',
      url: 'https://developer.mozilla.org/en-US/docs/Web/API/AbortController',
      description: 'Standard browser API for cancelling fetch HTTP requests to avoid unmounted React component state updates.',
    },
  ],
  tasks: [
    { id: 1, text: 'Read Instructions & Requirements Spec', completed: true },
    { id: 2, text: 'Setup React Project Boilerplate & Files', completed: true },
    { id: 3, text: 'Write useAsync Hook State Machine Logic', completed: true },
    { id: 4, text: 'Implement Exponential Backoff Retry Policy', completed: true },
    { id: 5, text: 'Run Unit Tests & Verify AbortController', completed: true },
    { id: 6, text: 'Push Commits to Public GitHub Repository', completed: true },
    { id: 7, text: 'Post Learning Reflection on LinkedIn (#ABTalks)', completed: false },
    { id: 8, text: 'Submit Final Code & Claim XP Reward', completed: false },
  ],
  isCompleted: false,
}

export const mockLeaderboard = [
  { rank: 1, name: 'Sarah Chen', points: '3,890', avatar: '', weeklyChange: '+1', topPercentage: 'Top 1%' },
  { rank: 2, name: 'Marcus Vance', points: '3,450', avatar: '', weeklyChange: '+0', topPercentage: 'Top 2%' },
  { rank: 3, name: 'Devon Lane', points: '3,120', avatar: '', weeklyChange: '-1', topPercentage: 'Top 3%' },
  { rank: 4, name: 'Alex Rivera (You)', points: '2,450', avatar: '', weeklyChange: '+2', topPercentage: 'Top 5%', isYou: true },
  { rank: 5, name: 'Priya Sharma', points: '2,210', avatar: '', weeklyChange: '+1', topPercentage: 'Top 8%' },
]

export const mockAchievements = [
  { title: 'First Commit', description: 'Pushed your first verified code snippet.', iconName: 'GitCommit', unlocked: true, category: 'Commits', rarity: 'Common' },
  { title: '7-Day Warrior', description: 'Maintained a 7-day daily learning streak.', iconName: 'Flame', unlocked: true, category: 'Streaks', rarity: 'Rare' },
  { title: '30-Day Legend', description: 'Complete 30 consecutive active days.', iconName: 'Crown', unlocked: false, category: 'Streaks', rarity: 'Epic' },
  { title: 'Consistency King', description: 'Finished 25 missions with 100% completion.', iconName: 'Trophy', unlocked: false, category: 'Missions', rarity: 'Legendary' },
  { title: 'Night Owl', description: 'Submitted a challenge between 12 AM and 4 AM.', iconName: 'Moon', unlocked: true, category: 'Timing', rarity: 'Common' },
  { title: 'LinkedIn Creator', description: 'Shared 5 learning milestones on LinkedIn.', iconName: 'Share2', unlocked: true, category: 'Social', rarity: 'Rare' },
  { title: 'Open Source Explorer', description: 'Contributed to an open repository challenge.', iconName: 'Globe', unlocked: false, category: 'Open Source', rarity: 'Epic' },
]

export const mockStatistics = {
  completedChallenges: 28,
  githubCommits: 142,
  linkedinPosts: 18,
  hoursStudied: 64.5,
  xpEarned: 2450,
  averageCompletionRate: 94,
}

export const mockProgress = {
  activeDays: 42,
  missedDays: 3,
  currentStreak: 14,
  weeklyActivity: [
    { day: 'Mon', xp: 250, tasks: 4, consistency: 90 },
    { day: 'Tue', xp: 320, tasks: 5, consistency: 95 },
    { day: 'Wed', xp: 180, tasks: 3, consistency: 85 },
    { day: 'Thu', xp: 400, tasks: 6, consistency: 100 },
    { day: 'Fri', xp: 350, tasks: 5, consistency: 92 },
    { day: 'Sat', xp: 500, tasks: 7, consistency: 100 },
    { day: 'Sun', xp: 450, tasks: 6, consistency: 98 },
  ],
  heatmapData: Array.from({ length: 63 }, (_, i) => ({
    level: i % 7 === 0 ? 0 : i % 5 === 0 ? 1 : i % 3 === 0 ? 3 : i % 2 === 0 ? 4 : 2,
    count: (i % 5) * 2,
    date: `2026-06-${(i % 30) + 1}`,
  })),
}
