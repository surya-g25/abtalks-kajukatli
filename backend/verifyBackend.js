async function runVerification() {
  console.log('--- STARTING BACKEND API VERIFICATION ---')
  const baseUrl = 'http://localhost:5001/api'

  const endpoints = [
    { name: 'Health Check', url: '/health' },
    { name: 'Dashboard Data', url: '/dashboard' },
    { name: 'Challenges List', url: '/challenges' },
    { name: 'Challenge Day 14', url: '/challenges/14' },
    { name: 'Achievements List', url: '/achievements' },
    { name: 'Statistics Data', url: '/statistics' },
    { name: 'Progress Heatmap', url: '/progress' },
    { name: 'Missions List', url: '/missions' },
    { name: 'Leaderboard (XP)', url: '/leaderboard?sortBy=xp' },
    { name: 'Leaderboard (Weekly)', url: '/leaderboard?sortBy=weekly' },
  ]

  for (const ep of endpoints) {
    try {
      const res = await fetch(baseUrl + ep.url)
      if (res.status === 200) {
        const body = await res.json()
        console.log(`✔ [GET] ${ep.name} (status: 200) - Success`)
      } else {
        console.error(`❌ [GET] ${ep.name} (status: ${res.status}) - Failed`)
      }
    } catch (err) {
      console.error(`❌ [GET] ${ep.name} - Exception: ${err.message}`)
    }
  }

  // Verification of Submission Endpoint
  console.log('\n--- TESTING CHALLENGE SUBMISSION ---')
  const submissionPayload = {
    dayNumber: 14,
    githubRepo: 'testuser/async-retry-hook',
    commitUrl: 'https://github.com/testuser/async-retry-hook/commit/f8d9b1a',
    linkedinUrl: 'testuser/posts/learning-hooks-day14',
    reflection: 'Learning exponential backoff, cancellations and useEffect cleanup was extremely helpful in building high-quality, auto-retry React custom hooks.',
  }

  try {
    const res = await fetch(baseUrl + '/submissions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submissionPayload),
    })

    const body = await res.json()
    if (res.status === 201) {
      console.log('✔ Challenge submitted successfully!')
      console.log('Response Message:', body.message)
      console.log('Submission XP awarded:', body.data?.xpEarned)
    } else {
      console.error(`❌ Submission failed (status: ${res.status}):`, body.message || body)
    }
  } catch (err) {
    console.error('❌ Submission exception:', err.message)
  }

  // Fetch Dashboard Again to see if XP & Levels have updated
  console.log('\n--- FETCHING DASHBOARD AFTER SUBMISSION ---')
  try {
    const res = await fetch(baseUrl + '/dashboard')
    const body = await res.json()
    if (res.status === 200) {
      const student = body.data.student
      console.log(`Student XP: ${student.xp} (Level: ${student.level}, Title: ${student.title})`)
      console.log(`Current Streak: ${student.currentStreak} days`)
      console.log(`Weekly Activity (XP growth):`, body.data.progress?.weeklyActivity)
    }
  } catch (err) {
    console.error('❌ Fetching dashboard post-submission exception:', err.message)
  }

  console.log('\n--- BACKEND VERIFICATION COMPLETE ---')
}

runVerification()
