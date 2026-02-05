import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date) {
  return Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(date)
}

export function calculateWordCountFromHtml(
  html: string | null | undefined,
): number {
  if (!html) return 0
  const textOnly = html.replace(/<[^>]+>/g, '')
  return textOnly.split(/\s+/).filter(Boolean).length
}

export function readingTime(wordCount: number): string {
  const readingTimeMinutes = Math.max(1, Math.round(wordCount / 200))
  return `${readingTimeMinutes} min read`
}

export function getHeadingMargin(depth: number): string {
  const margins: Record<number, string> = {
    2: 'ml-4',
    3: 'ml-8',
    4: 'ml-12',
    5: 'ml-16',
    6: 'ml-20',
  }
  return margins[depth] || ''
}

export function withBase(path: string): string {
  const rawBaseUrl = import.meta.env.BASE_URL
  const baseUrl = rawBaseUrl.endsWith('/') ? rawBaseUrl : `${rawBaseUrl}/`
  if (path.startsWith('/')) {
    return `${baseUrl}${path.slice(1)}`
  }
  return path
}
