export const calculateStreak = (lastActiveDateStr, currentStreak = 0, longestStreak = 0, streakFreeze = { active: 0, available: 0 }) => {
  const todayStr = new Date().toISOString().split('T')[0]

  if (!lastActiveDateStr) {
    return {
      currentStreak: 1,
      longestStreak: Math.max(longestStreak, 1),
      streakFreeze,
      lastActiveDate: todayStr,
      status: 'started',
    }
  }

  // Parse strings as dates (using YYYY-MM-DD for consistency)
  const lastActive = new Date(lastActiveDateStr.split('T')[0])
  const current = new Date(todayStr)

  // Difference in days
  const diffTime = current.getTime() - lastActive.getTime()
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays <= 0) {
    // Already active today
    return {
      currentStreak,
      longestStreak,
      streakFreeze,
      lastActiveDate: lastActiveDateStr,
      status: 'already_active',
    }
  } else if (diffDays === 1) {
    // Consecutive day
    const newStreak = currentStreak + 1
    return {
      currentStreak: newStreak,
      longestStreak: Math.max(longestStreak, newStreak),
      streakFreeze,
      lastActiveDate: todayStr,
      status: 'incremented',
    }
  } else {
    // Missed days
    const missedDays = diffDays - 1
    if (streakFreeze.available >= missedDays) {
      // Freeze applied to preserve streak
      const updatedFreeze = {
        ...streakFreeze,
        available: streakFreeze.available - missedDays,
        active: (streakFreeze.active || 0) + missedDays,
      }
      // Streak continues
      const newStreak = currentStreak + 1
      return {
        currentStreak: newStreak,
        longestStreak: Math.max(longestStreak, newStreak),
        streakFreeze: updatedFreeze,
        lastActiveDate: todayStr,
        status: 'frozen',
      }
    } else {
      // Streak broken, reset
      return {
        currentStreak: 1,
        longestStreak,
        streakFreeze,
        lastActiveDate: todayStr,
        status: 'broken',
      }
    }
  }
}
