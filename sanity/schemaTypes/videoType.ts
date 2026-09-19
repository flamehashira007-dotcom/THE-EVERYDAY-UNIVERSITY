import React from 'react'
import {PlayIcon} from '@sanity/icons/Play'
import {defineField, defineType} from 'sanity'
import {YouTubeInput} from '../components/YouTubeInput'

function extractYouTubeId(urlOrId?: string): string {
  if (!urlOrId) return ''
  const trimmed = urlOrId.trim()
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed
  }
  const match = trimmed.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/
  )
  return match ? match[1] : trimmed
}

export const videoType = defineType({
  name: 'video',
  title: 'Showcase Video',
  type: 'document',
  icon: PlayIcon,
  fields: [
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube URL or Video ID',
      type: 'string',
      description:
        'Paste any YouTube URL or 11-char ID. Click the button to automatically fetch the Title and Channel!',
      components: {
        input: YouTubeInput,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Video Title',
      type: 'string',
      description:
        'Optional. You can type a custom title, click "Get Title from YouTube" above, or leave blank to auto-fetch from YouTube.',
    }),
    defineField({
      name: 'podcast',
      title: 'Podcast / Series Name',
      type: 'string',
      initialValue: 'The Everyday University',
    }),
    defineField({
      name: 'date',
      title: 'Episode / Tag / Date',
      type: 'string',
      placeholder: 'e.g. Episode 1',
    }),
    defineField({
      name: 'duration',
      title: 'Duration / Tag',
      type: 'string',
      placeholder: 'e.g. Full Episode',
    }),
    defineField({
      name: 'thumbnail',
      title: 'Custom Thumbnail (Optional)',
      type: 'image',
      description:
        'Leave empty to automatically use the official YouTube thumbnail.',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order number to sort videos on the website (1, 2, 3...)',
      initialValue: 1,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'date',
      youtubeUrl: 'youtubeUrl',
      media: 'thumbnail',
    },
    prepare(selection) {
      const {title, subtitle, youtubeUrl, media} = selection
      const youtubeId = extractYouTubeId(youtubeUrl)

      const resolvedMedia =
        media ||
        (youtubeId
          ? () =>
              React.createElement('img', {
                src: `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`,
                alt: title || 'YouTube Thumbnail',
                style: {width: '100%', height: '100%', objectFit: 'cover'},
              })
          : PlayIcon)

      return {
        title: title || (youtubeId ? `YouTube (${youtubeId})` : 'Untitled Video'),
        subtitle: subtitle || (youtubeId ? `YouTube ID: ${youtubeId}` : 'The Everyday University'),
        media: resolvedMedia,
      }
    },
  },
})
