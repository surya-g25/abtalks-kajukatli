export const XP_REWARDS = {
  CHALLENGE_COMPLETE: 100, // default base reward
  GITHUB_COMMIT: 30,
  LINKEDIN_POST: 20,
  REFLECTION: 15,
  PERFECT_WEEK: 200,
}

export const DEVELOPER_LEVELS = [
  { level: 1, title: 'Rookie', xpRequired: 0, color: 'neutral', icon: 'User', reward: 'Starter Pack' },
  { level: 2, title: 'Explorer', xpRequired: 300, color: 'blue', icon: 'Compass', reward: 'Custom Avatar Badge' },
  { level: 3, title: 'Builder', xpRequired: 800, color: 'green', icon: 'Hammer', reward: 'Exclusive Themes' },
  { level: 4, title: 'Creator', xpRequired: 1500, color: 'amber', icon: 'PenTool', reward: 'Beta Feature Access' },
  { level: 5, title: 'Engineer', xpRequired: 2500, color: 'purple', icon: 'Cpu', reward: 'Senior Slack Channel access' },
  { level: 6, title: 'Architect', xpRequired: 4000, color: 'rose', icon: 'Layers', reward: '1-on-1 Mentorship session' },
  { level: 7, title: 'Legend', xpRequired: 6000, color: 'yellow', icon: 'Crown', reward: 'Hall of Fame Feature' },
]

export const getLevelFromXp = (xp) => {
  let activeLevel = DEVELOPER_LEVELS[0]
  for (const lvl of DEVELOPER_LEVELS) {
    if (xp >= lvl.xpRequired) {
      activeLevel = lvl
    } else {
      break
    }
  }
  return activeLevel
}

export const getNextLevelInfo = (xp) => {
  const currentLevel = getLevelFromXp(xp)
  const currentIndex = DEVELOPER_LEVELS.findIndex((l) => l.level === currentLevel.level)

  if (currentIndex === -1 || currentIndex === DEVELOPER_LEVELS.length - 1) {
    return {
      nextLevel: null,
      xpNeeded: 0,
      xpInCurrentLevel: xp - currentLevel.xpRequired,
      xpForNextLevel: 1000,
    }
  }

  const nextLevel = DEVELOPER_LEVELS[currentIndex + 1]
  const xpInCurrentLevel = xp - currentLevel.xpRequired
  const xpForNextLevel = nextLevel.xpRequired - currentLevel.xpRequired
  const xpNeeded = nextLevel.xpRequired - xp

  return {
    nextLevel,
    xpNeeded: xpNeeded > 0 ? xpNeeded : 0,
    xpInCurrentLevel,
    xpForNextLevel,
  }
}
