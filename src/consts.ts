import type { IconMap, SocialLink, Site } from '@/types'

export const SITE: Site = {
  title: 'Ryan Y. Batubara',
  description: "Ryan Batubara's Website",
  href: 'https://ryanbatubara.dev',
  author: 'Ryan Batubara',
  locale: 'en-US',
  featuredPostCount: 1,
  featuredProjectCount: 1,
  postsPerPage: 10,
}

export const NAV_LINKS: SocialLink[] = [
  {
    href: '/blog',
    label: 'blog',
  },
  {
    href: '/projects',
    label: 'projects',
  },
  {
    href: '/talks',
    label: 'talks',
  },
  {
    href: '/resources',
    label: 'resources',
  },
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    href: 'https://github.com/rybplayer',
    label: 'GitHub',
  },
  {
    href: 'mailto:ryan.y.batubara@gmail.com',
    label: 'Email',
  },
  {
    href: 'https://linkedin.com/in/ryanbatubara',
    label: 'LinkedIn',
  },
  {
    href: '/rss.xml',
    label: 'RSS',
  },
]

export const ICON_MAP: IconMap = {
  Website: 'lucide:globe',
  GitHub: 'lucide:github',
  LinkedIn: 'lucide:linkedin',
  Email: 'lucide:mail',
  RSS: 'lucide:rss',
}
