'use client'

import React, { useMemo, useState } from 'react'
import { HelpCircle, Mail, Calendar as CalendarIcon, ArrowUp, ArrowDown, Bug, Lightbulb } from 'lucide-react'

type FeedbackItem = {
  id: string
  title: string
  description: string
  type: 'bug' | 'idea'
  votes: number
  createdAt: Date
}

export default function HelpCenterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const [items, setItems] = useState<FeedbackItem[]>([
    { id: '1', title: 'Analytics CSV export', description: 'Allow export with custom date range.', type: 'idea', votes: 12, createdAt: new Date() },
    { id: '2', title: 'Webhook retry on 5xx', description: 'Some failed webhooks do not retry.', type: 'bug', votes: 7, createdAt: new Date() },
  ])

  const [filter, setFilter] = useState<'all' | 'bug' | 'idea'>('all')
  const [sort, setSort] = useState<'top' | 'new'>('top')

  const [newTitle, setNewTitle] = useState('')
  const [newDesc, setNewDesc] = useState('')
  const [newType, setNewType] = useState<'bug' | 'idea'>('idea')

  const filtered = useMemo(() => {
    let list = items.filter(i => (filter === 'all' ? true : i.type === filter))
    if (sort === 'top') list = list.sort((a, b) => b.votes - a.votes)
    else list = list.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    return list
  }, [items, filter, sort])

  const vote = (id: string, delta: 1 | -1) => {
    setItems(prev => prev.map(i => (i.id === id ? { ...i, votes: Math.max(0, i.votes + delta) } : i)))
  }

  const addItem = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitle.trim()) return
    setItems(prev => [
      { id: crypto.randomUUID(), title: newTitle.trim(), description: newDesc.trim(), type: newType, votes: 0, createdAt: new Date() },
      ...prev,
    ])
    setNewTitle('')
    setNewDesc('')
    setNewType('idea')
  }

  const onSubmitContact = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Help Center</h1>
          <p className="text-slate-600">Suggest features, report bugs, vote on ideas, or contact us.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-2 space-y-5">
            {/* Submit feedback */}
            <div className="bg-white rounded-xl shadow-sm ring-1 ring-slate-200 p-5">
              <h2 className="text-lg font-semibold text-slate-900 mb-3">Share feedback</h2>
              <form onSubmit={addItem} className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="md:col-span-2 px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="Title" />
                  <select value={newType} onChange={(e) => setNewType(e.target.value as 'bug' | 'idea')} className="px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600">
                    <option value="idea">Feature</option>
                    <option value="bug">Bug</option>
                  </select>
                </div>
                <textarea value={newDesc} onChange={(e) => setNewDesc(e.target.value)} rows={3} className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="Describe the idea or bug..." />
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Submit</button>
              </form>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between">
              <div className="inline-flex rounded-lg ring-1 ring-slate-200 overflow-hidden">
                <button onClick={() => setFilter('all')} className={`px-3 py-1 text-sm ${filter === 'all' ? 'bg-slate-900 text-white' : 'bg-white text-slate-700 hover:bg-slate-50'}`}>All</button>
                <button onClick={() => setFilter('idea')} className={`px-3 py-1 text-sm ${filter === 'idea' ? 'bg-slate-900 text-white' : 'bg-white text-slate-700 hover:bg-slate-50'}`}>Features</button>
                <button onClick={() => setFilter('bug')} className={`px-3 py-1 text-sm ${filter === 'bug' ? 'bg-slate-900 text-white' : 'bg-white text-slate-700 hover:bg-slate-50'}`}>Bugs</button>
              </div>
              <div className="inline-flex rounded-lg ring-1 ring-slate-200 overflow-hidden text-sm">
                <button onClick={() => setSort('top')} className={`px-3 py-1 ${sort === 'top' ? 'bg-white text-slate-900' : 'bg-slate-50 text-slate-600'}`}>Top</button>
                <button onClick={() => setSort('new')} className={`px-3 py-1 ${sort === 'new' ? 'bg-white text-slate-900' : 'bg-slate-50 text-slate-600'}`}>New</button>
              </div>
            </div>

            {/* List */}
            <div className="space-y-3">
              {filtered.map((i) => (
                <div key={i.id} className="bg-white rounded-xl shadow-sm ring-1 ring-slate-200 p-4 flex gap-4 items-start">
                  <div className="flex flex-col items-center rounded-lg bg-slate-50 ring-1 ring-slate-200 overflow-hidden">
                    <button onClick={() => vote(i.id, 1)} className="w-10 h-8 flex items-center justify-center hover:bg-slate-100">
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <div className="w-10 h-8 flex items-center justify-center text-sm font-semibold">{i.votes}</div>
                    <button onClick={() => vote(i.id, -1)} className="w-10 h-8 flex items-center justify-center hover:bg-slate-100">
                      <ArrowDown className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {i.type === 'bug' ? <Bug className="w-4 h-4 text-red-500" /> : <Lightbulb className="w-4 h-4 text-amber-500" />}
                      <h3 className="font-semibold text-slate-900">{i.title}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${i.type === 'bug' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>{i.type === 'bug' ? 'Bug' : 'Feature'}</span>
                    </div>
                    <p className="text-sm text-slate-700">{i.description}</p>
                  </div>
                </div>
              ))}
              {filtered.length === 0 && (
                <div className="text-center text-slate-500 text-sm">No feedback yet.</div>
              )}
            </div>
          </div>

          <aside className="space-y-5">
            <div className="bg-white rounded-xl shadow-sm ring-1 ring-slate-200 p-5">
              <div className="flex items-center gap-2 mb-3">
                <HelpCircle className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-slate-900">FAQ</h3>
              </div>
              <div className="divide-y divide-slate-200 text-slate-700">
                <details className="py-3">
                  <summary className="cursor-pointer font-medium">How do I connect WhatsApp or Telegram?</summary>
                  <p className="mt-2 text-sm">Go to Integrations, choose the platform, and follow the connect steps.</p>
                </details>
                <details className="py-3">
                  <summary className="cursor-pointer font-medium">How can I set up automations?</summary>
                  <p className="mt-2 text-sm">Open Automations, create a new workflow, pick triggers and actions, then enable it.</p>
                </details>
                <details className="py-3">
                  <summary className="cursor-pointer font-medium">Where can I manage billing?</summary>
                  <p className="mt-2 text-sm">Visit Settings → Billing to update payment methods and view invoices.</p>
                </details>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm ring-1 ring-slate-200 p-5">
              <div className="mb-3 font-semibold text-slate-900">Contact us</div>
              <form onSubmit={onSubmitContact} className="space-y-3">
                <input value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="Name" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="Email" />
                <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={4} className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="Message" />
                <button type="submit" className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Send</button>
                {submitted && <p className="text-sm text-green-600">Thanks! We will reply soon.</p>}
              </form>
            </div>

            <div className="bg-white rounded-xl shadow-sm ring-1 ring-slate-200 p-5">
              <div className="mb-2 font-semibold text-slate-900">Schedule a meeting</div>
              <p className="text-sm text-slate-600 mb-3">Prefer live assistance? Book a 15-minute call.</p>
              <a href="#" className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                <CalendarIcon className="w-4 h-4" />
                Pick a time
              </a>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
