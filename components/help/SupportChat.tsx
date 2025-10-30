'use client'

import React, { useState } from 'react'
import { MessageCircle, Send } from 'lucide-react'

type Message = {
  id: number
  text: string
  sender: 'user' | 'bot'
  time: string
}

export function SupportChat({ title = 'Help Center', fullScreen = false }: { title?: string; fullScreen?: boolean }) {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: 'Hi! How can we help you today?', sender: 'bot', time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) }
  ])
  const [inputValue, setInputValue] = useState('')

  const handleSend = () => {
    const trimmed = inputValue.trim()
    if (!trimmed) return
    const now = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    const newMsg: Message = { id: messages.length + 1, text: trimmed, sender: 'user', time: now }
    setMessages(prev => [...prev, newMsg])
    setInputValue('')
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { id: prev.length + 1, text: 'Thanks! Our team will get back shortly.', sender: 'bot', time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) }
      ])
    }, 800)
  }

  return (
    <div className={`${fullScreen ? 'w-full h-screen max-w-none rounded-none border-0' : 'w-full max-w-xl mx-auto'} bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm ${fullScreen ? '' : ''} flex flex-col`}>
      <div className="bg-blue-600 text-white px-4 py-3 flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
          <MessageCircle className="w-5 h-5" />
        </div>
        <div>
          <div className="font-semibold">{title}</div>
          <div className="text-xs text-blue-100">We typically reply in a few minutes</div>
        </div>
      </div>

      <div className={`bg-slate-50 p-4 ${fullScreen ? 'flex-1' : 'h-96'} overflow-y-auto`}>
        {messages.map((msg) => (
          <div key={msg.id} className={`mb-3 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs px-4 py-2 rounded-lg ${msg.sender === 'user' ? 'bg-blue-50 border border-blue-200' : 'bg-white border border-slate-200'}`}>
              <div className="text-sm text-slate-800">{msg.text}</div>
              <div className="text-xs text-slate-500 mt-1">{msg.time}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-4 border-t border-slate-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSend() }}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button
            onClick={handleSend}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            Send
          </button>
        </div>
      </div>
    </div>
  )
}
