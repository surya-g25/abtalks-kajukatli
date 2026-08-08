import Student from '../models/Student.js'

export const getLeaderboard = async (sortBy = 'xp') => {
  try {
    let sortField = 'xp'
    if (sortBy === 'weekly') sortField = 'weeklyXp'
    else if (sortBy === 'monthly') sortField = 'monthlyXp'
    else if (sortBy === 'consistency') sortField = 'consistency'
    else if (sortBy === 'streak') sortField = 'longestStreak'

    const students = await Student.find().sort({ [sortField]: -1 })

    return students.map((s, idx) => {
      let pointsVal = s.xp.toLocaleString()
      if (sortBy === 'weekly') pointsVal = `${(s.weeklyXp || 0).toLocaleString()} XP`
      else if (sortBy === 'monthly') pointsVal = `${(s.monthlyXp || 0).toLocaleString()} XP`
      else if (sortBy === 'consistency') pointsVal = `${s.consistency || 90}%`
      else if (sortBy === 'streak') pointsVal = `${s.longestStreak || 0} days`

      return {
        rank: idx + 1,
        name: s.name,
        points: pointsVal,
        avatar: s.avatar,
        weeklyChange: s.weeklyChange || '+0',
        topPercentage: idx === 0 ? 'Top 1%' : idx === 1 ? 'Top 2%' : idx === 2 ? 'Top 3%' : idx === 3 ? 'Top 5%' : 'Top 8%',
        isYou: s.email === 'alex.rivera@abtalks.dev',
      }
    })
  } catch (error) {
    console.error('Error fetching leaderboard data:', error.message)
    return []
  }
}
