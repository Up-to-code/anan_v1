import React, { useState, useCallback } from 'react';
import { Drawer } from '@/components/ui2/drawer';
import { Input } from '@/components/ui2/input';
import { Button } from '@/components/ui2/button';
import { ChatWindowProps } from '@/types';
import { User, Send } from 'lucide-react';

// Add type for sender
type MessageSender = 'contact' | 'user';

interface ChatMessage {
  id: string;
  text: string;
  sender: MessageSender;
  time: Date;
}

export const ContactChatWindow: React.FC<ChatWindowProps> = ({
  contact,
  onClose,
  isOpen
}) => {
  // Use a lazy initializer for useState to get a stable FIVE_MINUTES_AGO reference
  const [FIVE_MINUTES_AGO] = useState(() => new Date(Date.now() - 300000));

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: 'Hello! Thanks for reaching out. How can I help you today?',
      sender: 'contact',
      time: FIVE_MINUTES_AGO,
    },
  ]);

  const handleSendMessage = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const msgTime = new Date();
    const newMessage: ChatMessage = {
      id: msgTime.getTime().toString(),
      text: message,
      sender: 'user',
      time: msgTime
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');

    setTimeout(() => {
      const replyTime = new Date();
      const reply: ChatMessage = {
        id: (replyTime.getTime()).toString(),
        text: "Thanks for your message. I'll get back to you shortly with more information.",
        sender: 'contact',
        time: replyTime
      };
      setMessages(prev => [...prev, reply]);
    }, 1000);
  }, [message]);

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-slate-200/50 flex items-center justify-between flex-shrink-0 backdrop-blur-sm bg-white/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100/80 rounded-full flex items-center justify-center backdrop-blur-sm">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">{contact?.name}</h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <p className="text-sm text-slate-500">Online</p>
              </div>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 backdrop-blur-sm">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-900'
                }`}
              >
                <p className="text-sm">{msg.text}</p>
                <p className={`text-xs mt-1 ${
                  msg.sender === 'user' ? 'text-blue-200' : 'text-slate-500'
                }`}>
                  {msg.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-200/50 flex-shrink-0 backdrop-blur-sm bg-white/80">
          <div className="flex gap-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1"
            />
            <Button
              type="submit"
              icon={<Send className="w-4 h-4" />}
            >
              Send
            </Button>
          </div>
        </form>
      </div>
    </Drawer>
  );
};