import { groq } from 'next-sanity'

export const VIDEOS_QUERY = groq`
  *[_type == "video"] | order(order desc, publishedAt desc, _createdAt desc) {
    _id,
    title,
    youtubeUrl,
    podcast,
    date,
    duration,
    "thumbnailUrl": thumbnail.asset->url,
    order,
    publishedAt
  }
`

export interface SanityVideo {
  _id: string
  title: string
  youtubeUrl: string
  podcast?: string
  date?: string
  duration?: string
  thumbnailUrl?: string
  order?: number
  publishedAt?: string
}
