"use client"
import React from 'react'
import Image from 'next/image'
import { ImageUpload } from '@/components/ui/ImageUpload'
import { ProfileAvatarUpload } from '@/components/ui/ProfileAvatarUpload'
import { FileUpload } from '@/components/ui/FileUpload'

export default function UploadPage() {
  const [url, setUrl] = React.useState('')
  const [fileId, setFileId] = React.useState<string>('')
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [json, setJson] = React.useState<{ id: string; url: string; filename?: string; size?: number; type?: string; source: 'server' | 'local' } | null>(null)

  const handleSubmit = React.useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isSubmitting) return
    setIsSubmitting(true)
    const form = new FormData()
    if (url) form.append('url', url)
    if (fileId) form.append('id', fileId)
    // For demo: log entries
    for (const [k, v] of form.entries()) {
      console.log('FormData', k, v)
    }
    // Simulate submit complete
    setTimeout(() => setIsSubmitting(false), 300)
  }, [isSubmitting, url, fileId])

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-xl mx-auto space-y-6">
        <h1 className="text-2xl font-semibold text-slate-900">Test Upload</h1>

        <section className="space-y-3">
          <h2 className="text-lg font-medium">Profile Avatar</h2>
          <ProfileAvatarUpload value={url} onChange={setUrl} onUploaded={(p) => { setFileId(p.id || ''); setJson({ id: p.id, url: p.url, filename: p.filename, size: p.size, type: p.type, source: p.source }); }} />
        </section>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">Image URL</label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/image.jpg or data:image/png;base64,..."
            className="w-full border rounded px-3 py-2 text-sm"
          />
        </div>
        <ImageUpload
          value={url}
          onChange={setUrl}
          onUploaded={(p) => { setFileId(p.id || ''); setJson({ id: p.id, url: p.url, filename: p.filename, size: p.size, type: p.type, source: p.source }); }}
        />
        {json && (
          <pre className="text-xs bg-slate-50 border p-3 rounded overflow-x-auto">{JSON.stringify(json, null, 2)}</pre>
        )}
        <section className="space-y-3">
          <h2 className="text-lg font-medium">Generic File Upload</h2>
          <FileUpload onUploaded={(p) => setJson({ id: p.id, url: p.url, filename: p.name, size: p.size, type: p.type, source: 'server' })} />
        </section>

        <form onSubmit={handleSubmit} className="space-y-2">
          <input type="hidden" name="url" value={url} />
          <input type="hidden" name="id" value={fileId} />
          <button
            type="submit"
            className="px-3 py-2 rounded bg-blue-600 text-white text-sm disabled:opacity-50"
            disabled={!url || isSubmitting}
          >
            {isSubmitting ? 'Submitting…' : 'Submit'}
          </button>
        </form>
        {url && (
          <div className="space-y-2">
            <p className="text-sm text-slate-600 break-all">URL: {url}</p>
            {fileId && <p className="text-sm text-slate-600 break-all">ID: {fileId}</p>}
            <Image src={url} alt="Uploaded" width={160} height={160} className="h-40 w-40 rounded-lg object-cover border" />
          </div>
        )}
      </div>
    </div>
  )
}