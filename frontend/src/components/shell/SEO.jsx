import { useEffect } from 'react'

/**
 * Utility helper to create or update head meta attributes dynamically
 */
function setMetaTag(attribute, attrValue, content) {
  let element = document.querySelector(`meta[${attribute}="${attrValue}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, attrValue)
    document.head.appendChild(element)
  }
  element.content = content
}

/**
 * Utility helper to create or update head link tags dynamically
 */
function setLinkTag(rel, href) {
  let element = document.querySelector(`link[rel="${rel}"]`)
  if (!element) {
    element = document.createElement('link')
    element.rel = rel
    document.head.appendChild(element)
  }
  element.href = href
}

export function SEO({
  title = 'ABTalks — Elevating Conversations',
  description = 'Production hackathon platform for ABTalks challenges, community leaderboards, and interactive audio/video experiences.',
  keywords = 'ABTalks, podcasts, talks, challenges, community, leaderboard',
}) {
  useEffect(() => {
    // 1. Update document tab title
    document.title = title ? `${title} | ABTalks` : 'ABTalks — Elevating Conversations'

    // 2. Standard Search Metadata
    setMetaTag('name', 'description', description)
    setMetaTag('name', 'keywords', keywords)
    setMetaTag('name', 'robots', 'index, follow')

    // 3. Open Graph Metadata
    setMetaTag('property', 'og:title', title)
    setMetaTag('property', 'og:description', description)
    setMetaTag('property', 'og:type', 'website')
    setMetaTag('property', 'og:url', window.location.href)
    setMetaTag('property', 'og:image', 'https://abtalks.dev/og-image.jpg')

    // 4. Twitter Card Metadata
    setMetaTag('name', 'twitter:card', 'summary_large_image')
    setMetaTag('name', 'twitter:title', title)
    setMetaTag('name', 'twitter:description', description)

    // 5. Canonical Anchors
    setLinkTag('canonical', window.location.href)
  }, [title, description, keywords])

  return null
}

export default SEO
