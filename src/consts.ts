import type { IconMap, SocialLink, Site } from '@/types'

export const SITE: Site = {
  title: 'Communication Complexity Capstone',
  description: 'Communication Complexity Capstone Report',
  href: 'https://rybplayer.github.io/capstone/',
  author: 'Communication Complexity Capstone',
  locale: 'en-US',
  featuredPostCount: 1,
  featuredProjectCount: 1,
  postsPerPage: 10,
}

export const NAV_LINKS: SocialLink[] = [
  { href: '/', label: 'Home' },
  { href: '/introduction', label: 'Introduction' },
  { href: '/two-party', label: 'Two-Party' },
  { href: '/multi-party', label: 'Multi-Party' },
  { href: '/conclusion', label: 'Conclusion' },
]

export const SOCIAL_LINKS: SocialLink[] = []

export const ICON_MAP: IconMap = {
  Website: 'lucide:globe',
  GitHub: 'lucide:github',
  LinkedIn: 'lucide:linkedin',
  Email: 'lucide:mail',
  RSS: 'lucide:rss',
}
