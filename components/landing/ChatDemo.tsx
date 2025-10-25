"use client";
import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';

export default function ChatDemo() {
  const [chatPlatform, setChatPlatform] = useState('modern');
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hey! How can I help you today?', sender: 'bot', time: '10:30 AM' },
    { id: 2, text: 'I need help with my order', sender: 'user', time: '10:31 AM' },
    { id: 3, text: "I can help with that! What's your order number?", sender: 'bot', time: '10:31 AM' },
  ]);
  const [inputValue, setInputValue] = useState('');

  const platformStyles = {
    whatsapp: {
      bg: 'bg-[#e5ddd5]',
      botBubble: 'bg-white border border-slate-200',
      userBubble: 'bg-[#dcf8c6] border border-[#a8d88a]',
      input: 'border-slate-300',
    },
    telegram: {
      bg: 'bg-[#f4f4f5]',
      botBubble: 'bg-white border border-slate-200',
      userBubble: 'bg-[#e3f2fd] border border-[#90caf9]',
      input: 'border-slate-300',
    },
    modern: {
      bg: 'bg-slate-50',
      botBubble: 'bg-white border border-slate-200',
      userBubble: 'bg-blue-50 border border-blue-200',
      input: 'border-slate-300',
    },
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: inputValue,
        sender: 'user',
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      };
      const updatedMessages = [...messages, newMessage];
      setMessages(updatedMessages);
      setInputValue('');

      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            id: prev.length + 1,
            text: 'Thanks for your message! Our team will respond shortly.',
            sender: 'bot',
            time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
      }, 1000);
    }
  };

  const currentStyle = platformStyles[chatPlatform as keyof typeof platformStyles];

  return (
    <div>
      <div className="mb-4 flex gap-2 justify-center">
        {['whatsapp', 'telegram', 'modern'].map((platform) => (
          <button
            key={platform}
            onClick={() => setChatPlatform(platform)}
            className={`px-4 py-2 rounded-lg font-medium transition-all capitalize ${
              chatPlatform === platform
                ? 'bg-blue-600 text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-600'
            }`}
          >
            {platform}
          </button>
        ))}
      </div>
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-xl">
        <div className="bg-blue-600 text-white px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold">Support Team</div>
              <div className="text-xs text-blue-100 flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></span>
                Online
              </div>
            </div>
          </div>
        </div>
        <div className={`${currentStyle.bg} p-4 h-80 overflow-y-auto`}>
          {messages.map((msg) => (
            <div key={msg.id} className={`mb-3 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs px-4 py-2 rounded-lg ${
                msg.sender === 'user' ? currentStyle.userBubble : currentStyle.botBubble
              }`}>
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
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type a message..."
              className={`flex-1 px-4 py-2 border ${currentStyle.input} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600`}
            />
            <button
              onClick={handleSendMessage}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}