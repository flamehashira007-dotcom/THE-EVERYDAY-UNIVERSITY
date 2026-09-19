import React, { useState } from 'react'
import { StringInputProps, set, unset, useClient, useFormValue } from 'sanity'
import { SparklesIcon } from '@sanity/icons/Sparkles'
import { apiVersion } from '../env'

export function YouTubeInput(props: StringInputProps) {
  const { onChange, value = '', readOnly, schemaType } = props
  const [loading, setLoading] = useState(false)
  const [statusMessage, setStatusMessage] = useState<string | null>(null)

  const documentId = useFormValue(['_id']) as string | undefined
  const client = useClient({ apiVersion })

  const handleFetchMetadata = async () => {
    if (!value || !value.trim()) {
      setStatusMessage('Please enter a YouTube URL or video ID first.')
      return
    }

    setLoading(true)
    setStatusMessage(null)

    try {
      const match = value.match(
        /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/
      )
      const youtubeId = match ? match[1] : value.trim()

      const res = await fetch(`/api/youtube-meta?id=${encodeURIComponent(youtubeId)}`)
      if (!res.ok) {
        throw new Error('Video details could not be found on YouTube.')
      }

      const data = await res.json()

      if (data.title && documentId) {
        const cleanDocId = documentId.replace(/^drafts\./, '')
        const draftId = `drafts.${cleanDocId}`

        await client
          .patch(draftId)
          .setIfMissing({ _type: 'video' })
          .set({
            title: data.title,
            podcast: data.author || 'The Everyday University',
          })
          .commit({ autoGenerateArrayKeys: true })

        setStatusMessage(`Auto-filled title: "${data.title}"`)
      }
    } catch (err: any) {
      console.error(err)
      setStatusMessage(err.message || 'Failed to fetch title from YouTube.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <input
          type="text"
          value={value}
          onChange={(e) => {
            const nextValue = e.currentTarget.value
            onChange(nextValue ? set(nextValue) : unset())
          }}
          disabled={readOnly}
          placeholder={schemaType.placeholder || 'https://www.youtube.com/watch?v=...'}
          style={{
            flex: 1,
            padding: '10px 14px',
            fontSize: '14px',
            borderRadius: '4px',
            border: '1px solid #333',
            backgroundColor: '#121217',
            color: '#fff',
            outline: 'none',
          }}
        />
        <button
          type="button"
          onClick={handleFetchMetadata}
          disabled={loading || !value || readOnly}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '10px 16px',
            fontSize: '13px',
            fontWeight: 700,
            borderRadius: '4px',
            backgroundColor: '#facc15',
            color: '#000',
            border: 'none',
            cursor: loading || !value || readOnly ? 'not-allowed' : 'pointer',
            opacity: loading || !value || readOnly ? 0.6 : 1,
            transition: 'opacity 0.2s',
            whiteSpace: 'nowrap',
          }}
        >
          <SparklesIcon style={{ width: 16, height: 16 }} />
          <span>{loading ? 'Fetching...' : 'Get Title from YouTube'}</span>
        </button>
      </div>

      {statusMessage && (
        <div
          style={{
            fontSize: '12px',
            padding: '6px 10px',
            borderRadius: '4px',
            backgroundColor: statusMessage.startsWith('Auto-filled')
              ? 'rgba(34, 197, 94, 0.15)'
              : 'rgba(234, 179, 8, 0.15)',
            color: statusMessage.startsWith('Auto-filled') ? '#4ade80' : '#facc15',
            border: `1px solid ${
              statusMessage.startsWith('Auto-filled')
                ? 'rgba(34, 197, 94, 0.3)'
                : 'rgba(234, 179, 8, 0.3)'
            }`,
          }}
        >
          {statusMessage}
        </div>
      )}
    </div>
  )
}
