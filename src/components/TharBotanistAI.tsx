import React, { useState, useRef, useEffect } from 'react';
import { queryTharBotanistRAG } from '../services/ragEngine';
import { ChatMessage, RAGAnswer } from '../types';
import { Sparkles, Send, Bot, User, CheckCircle2, ShieldCheck, FileText, CornerDownRight } from 'lucide-react';

export const TharBotanistAI: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: 'Hello! I am Thar Botanist AI. Ask me any question about the native plants, trees, grasses, or traditional knowledge of Rajasthan\'s Thar Desert! I answer directly from scientific research.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      ragResult: {
        answer: 'Hello! Ask me any question about the native plants, trees, grasses, or traditional knowledge of Rajasthan\'s Thar Desert!',
        citations: [{ docId: 'Research Monograph', sectionTitle: 'Comprehensive Flora Monograph', quote: 'Verified CAZRI & BSI Research' }],
        confidence: 'High',
        relatedSpecies: ['Prosopis cineraria', 'Tecomella undulata', 'Lasiurus scindicus'],
        suggestedFollowUps: [
          'What trees naturally grow in Jaisalmer?',
          'Which plants survive with less than 150 mm rainfall?',
          'What is the ecological importance of Khejri?',
          'Difference between Rohida and Khejri.'
        ]
      }
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const samplePrompts = [
    'What trees naturally grow in Jaisalmer?',
    'Which plants survive with less than 150 mm rainfall?',
    'What is the ecological importance of Khejri?',
    'What grasses are found on sand dunes?',
    'Which shrubs support desert birds?',
    'Difference between Rohida and Khejri.',
    'Which native plants improve soil fertility?',
    'Medicinal plants of the Thar.'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

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

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: ragResult.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        ragResult
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 500);
  };

  return (
    <section className="py-10 bg-stone-950 text-amber-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-900/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold shadow-lg">
            <Sparkles className="w-4 h-4 text-emerald-400 animate-spin" />
            <span>Source Grounded Research AI</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-amber-100">
            Thar Botanist AI Assistant
          </h2>
          <p className="text-xs sm:text-sm text-amber-300/80">
            Type any question in simple natural language. Answers are 100% grounded in scientific research!
          </p>
        </div>

        {/* Main Chat Box */}
        <div className="bg-stone-900/90 rounded-3xl border border-amber-800/50 shadow-2xl overflow-hidden flex flex-col h-[600px]">
          
          {/* Chat Messages */}
          <div className="flex-1 p-6 overflow-y-auto space-y-6 custom-scrollbar">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-3xl ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
              >
                {/* Avatar */}
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                    msg.sender === 'user'
                      ? 'bg-amber-500 text-amber-950 shadow-md'
                      : 'bg-emerald-800 text-emerald-100 shadow-md border border-emerald-500/40'
                  }`}
                >
                  {msg.sender === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                </div>

                {/* Message Content */}
                <div
                  className={`space-y-3 p-5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-amber-600 text-amber-950 font-bold rounded-tr-none'
                      : 'bg-amber-950/60 border border-amber-800/40 text-amber-100 rounded-tl-none'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4 text-[11px] opacity-75">
                    <span className="font-bold">{msg.sender === 'user' ? 'You' : 'Thar Botanist AI'}</span>
                    <span>{msg.timestamp}</span>
                  </div>

                  <div className="prose prose-invert prose-xs max-w-none space-y-2">
                    {msg.text.split('\n\n').map((paragraph, pIdx) => (
                      <p key={pIdx} className="whitespace-pre-wrap leading-relaxed">{paragraph}</p>
                    ))}
                  </div>

                  {/* Citation & Follow-Ups */}
                  {msg.sender === 'ai' && msg.ragResult && (
                    <div className="pt-3 border-t border-amber-800/40 space-y-2 text-xs">
                      {msg.ragResult.citations.length > 0 && (
                        <div className="text-[11px] text-amber-300 font-semibold flex items-center gap-1">
                          <FileText className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Source: {msg.ragResult.citations[0].sectionTitle}</span>
                        </div>
                      )}

                      {msg.ragResult.suggestedFollowUps.length > 0 && (
                        <div className="space-y-1 pt-1">
                          <span className="text-[11px] font-bold text-amber-400">Suggested Questions:</span>
                          <div className="flex flex-wrap gap-1.5">
                            {msg.ragResult.suggestedFollowUps.map((q, qIdx) => (
                              <button
                                key={qIdx}
                                onClick={() => handleSendMessage(q)}
                                className="text-left px-2.5 py-1 rounded-lg bg-amber-900/40 hover:bg-amber-800/60 border border-amber-800/40 text-amber-200 text-[11px] transition-colors"
                              >
                                {q}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-3 text-xs text-amber-400 animate-pulse">
                <Bot className="w-5 h-5 text-emerald-400" />
                <span>Searching Research Monograph & Synthesizing Clear Answer...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Ribbon */}
          <div className="px-4 py-2 bg-stone-950 border-t border-amber-800/30 overflow-x-auto flex items-center gap-2 scrollbar-none text-xs">
            <span className="font-bold text-amber-400 shrink-0">Try Asking:</span>
            {samplePrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                className="px-3 py-1 rounded-full bg-amber-900/40 hover:bg-amber-800/60 border border-amber-700/40 text-amber-200 text-[11px] whitespace-nowrap transition-all"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-4 bg-amber-950/95 border-t border-amber-800/40 flex items-center gap-3">
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask any question (e.g. 'What trees grow in Jaisalmer?')..."
              className="flex-1 px-4 py-3 rounded-2xl bg-stone-900 border border-amber-700/50 text-amber-100 text-xs sm:text-sm placeholder-amber-400/40 focus:outline-none focus:border-amber-400"
            />
            <button
              onClick={() => handleSendMessage()}
              className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold text-xs sm:text-sm shadow-xl flex items-center gap-2 transition-all hover:scale-105"
            >
              <span>Ask AI</span>
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
