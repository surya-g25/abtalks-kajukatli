import { useEffect } from 'react'

export function SEO({
  title = 'ABTalks — Elevating Conversations',
  description = 'Production hackathon platform for ABTalks challenges, community leaderboards, and interactive audio/video experiences.',
  keywords = 'ABTalks, podcasts, talks, challenges, community, leaderboard',
}) {
  useEffect(() => {
    document.title = title ? `${title} | ABTalks` : 'ABTalks — Elevating Conversations'

    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]')
    if (!metaDesc) {
      metaDesc = document.createElement('meta')
      metaDesc.name = 'description'
      document.head.appendChild(metaDesc)
    }
    metaDesc.content = description

    // Update meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]')
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta')
      metaKeywords.name = 'keywords'
      document.head.appendChild(metaKeywords)
    }
    metaKeywords.content = keywords
  }, [title, description, keywords])

  return null
}

export default SEO
