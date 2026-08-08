async function runVerification() {
  console.log('--- STARTING BACKEND AI LAYER VERIFICATION ---')
  const baseUrl = 'http://localhost:5001/api'

  const aiTypes = [
    { type: 'reflection', options: {} },
    { type: 'linkedin', options: { length: 'short' } },
    { type: 'linkedin', options: { length: 'long' } },
    { type: 'resume', options: {} },
    { type: 'summary', options: {} },
    { type: 'suggestions', options: {} },
    { type: 'helper', options: {} },
    { type: 'weekly-report', options: {} },
    { type: 'career-coach', options: {} },
  ]

  for (const item of aiTypes) {
    try {
      const res = await fetch(`${baseUrl}/ai/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: item.type,
          options: item.options,
        }),
      })

      const body = await res.json()
      if (res.status === 200) {
        console.log(`✔ [POST] ${item.type} (options: ${JSON.stringify(item.options)}) - Success`)
        // Log brief snippet of generated output
        const lines = body.data?.text?.split('\n').filter((l) => l.trim()) || []
        console.log(`   Sample: "${lines[0] || ''}"`)
      } else {
        console.error(`❌ [POST] ${item.type} (status: ${res.status}) - Failed:`, body.message)
      }
    } catch (err) {
      console.error(`❌ [POST] ${item.type} - Exception: ${err.message}`)
    }
  }

  console.log('\n--- BACKEND AI VERIFICATION COMPLETE ---')
}

runVerification()
