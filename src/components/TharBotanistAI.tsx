import React, { useState, useRef, useEffect } from 'react';
import { queryTharBotanistRAG } from '../services/ragEngine';
import { ChatMessage, RAGAnswer } from '../types';
import { Sparkles, Send, Bot, User, FileText, X, MessageSquare } from 'lucide-react';

export const TharBotanistAI: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: 'Hello! I am "Thar Botanist", your AI assistant. Ask me anything about native trees, shrubs, plants, and vegetables of the Thar Desert! I answer strictly from the research documents.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      ragResult: {
        answer: 'Hello! Ask me anything about native trees, shrubs, plants, and vegetables of the Thar Desert!',
        citations: [{ docId: 'Research Monograph', sectionTitle: 'Comprehensive Flora Monograph', quote: 'Verified CAZRI & BSI Research' }],
        confidence: 'High',
        relatedSpecies: ['Prosopis cineraria', 'Tecomella undulata', 'Lasiurus scindicus'],
        suggestedFollowUps: [
          'What trees grow naturally in Bikaner?',
          'What is Khejri?',
          'Which shrubs are found in Jaisalmer?',
          'What native plants grow on sand dunes?',
          'Which native vegetables are found in the Thar Desert?'
        ]
      }
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const exampleQuestions = [
    'What trees grow naturally in Bikaner?',
    'What is Khejri?',
    'Which shrubs are found in Jaisalmer?',
    'What native plants grow on sand dunes?',
    'Which native vegetables are found in the Thar Desert?'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isTyping, isOpen]);

  const handleSendMessage = (queryText?: string) => {
    const textToSubmit = queryText || inputQuery;
    if (!textToSubmit.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSubmit,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!queryText) setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      const ragResult: RAGAnswer = queryTharBotanistRAG(textToSubmit);

      // If confidence is low or no citations found, output strict fallback text
      const isUnmatched = ragResult.confidence === 'Low' && ragResult.citations.length === 0;
      const finalAnswerText = isUnmatched
        ? 'Information not available in the current knowledge base.'
        : ragResult.answer;

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: finalAnswerText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        ragResult: isUnmatched ? undefined : ragResult
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 500);
  };

  return (
    <>
      {/* Floating Chatbot Action Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold shadow-2xl flex items-center gap-2.5 transition-transform duration-300 hover:scale-110 border border-emerald-400/40"
      >
        <Bot className="w-6 h-6 text-emerald-200" />
        <span className="hidden sm:inline text-xs font-extrabold tracking-wide">Thar Botanist AI</span>
        <Sparkles className="w-4 h-4 text-emerald-200 animate-spin" />
      </button>

      {/* Floating Chat Window Modal */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[92vw] sm:w-[420px] h-[540px] bg-stone-900/98 rounded-3xl border border-amber-700/60 shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl animate-fadeIn text-amber-50">
          
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950 border-b border-amber-800/40 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-800 border border-emerald-500/40 flex items-center justify-center text-emerald-200">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-amber-100">Thar Botanist</h3>
                <p className="text-[10px] text-emerald-400 font-semibold">Grounded Research AI Assistant</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full hover:bg-amber-950 text-amber-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 custom-scrollbar text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 max-w-[88%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
              >
                {/* Avatar */}
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-[10px] font-bold ${
                    msg.sender === 'user'
                      ? 'bg-amber-500 text-amber-950'
                      : 'bg-emerald-800 text-emerald-100 border border-emerald-500/40'
                  }`}
                >
                  {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                {/* Bubble */}
                <div
                  className={`p-3.5 rounded-2xl leading-relaxed space-y-2 ${
                    msg.sender === 'user'
                      ? 'bg-amber-600 text-amber-950 font-bold rounded-tr-none'
                      : 'bg-amber-950/70 border border-amber-800/40 text-amber-100 rounded-tl-none'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>

                  {/* Citation Reference */}
                  {msg.sender === 'ai' && msg.ragResult && msg.ragResult.citations.length > 0 && (
                    <div className="pt-2 border-t border-amber-800/40 text-[10px] text-amber-300 font-semibold flex items-center gap-1">
                      <FileText className="w-3 h-3 text-emerald-400" />
                      <span>Reference: {msg.ragResult.citations[0].sectionTitle}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-amber-400 animate-pulse">
                <Bot className="w-4 h-4 text-emerald-400" />
                <span>Searching research documents...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Example Questions Ribbon */}
          <div className="px-3 py-2 bg-stone-950 border-t border-amber-800/30 overflow-x-auto flex items-center gap-1.5 scrollbar-none text-[11px]">
            <span className="font-bold text-amber-400 shrink-0">Examples:</span>
            {exampleQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                className="px-2.5 py-1 rounded-full bg-amber-900/50 hover:bg-amber-800/70 border border-amber-700/40 text-amber-200 whitespace-nowrap transition-all"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-amber-950/95 border-t border-amber-800/40 flex items-center gap-2">
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask Thar Botanist..."
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-stone-900 border border-amber-700/50 text-amber-100 text-xs placeholder-amber-400/50 focus:outline-none focus:border-amber-400"
            />
            <button
              onClick={() => handleSendMessage()}
              className="p-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}
    </>
  );
};
