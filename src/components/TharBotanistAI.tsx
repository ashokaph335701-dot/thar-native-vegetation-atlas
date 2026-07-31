import React, { useState, useRef, useEffect } from 'react';
import { queryTharBotanistRAG } from '../services/ragEngine';
import { ChatMessage, RAGAnswer } from '../types';
import { Sparkles, Send, Bot, User, FileText, X } from 'lucide-react';

export const TharBotanistAI: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: 'Greetings! I am "Thar Botanist", your AI assistant. Ask me anything about native trees, shrubs, plants, and vegetables of the Thar Desert! I answer strictly from the research documents.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      ragResult: {
        answer: 'Greetings! Ask me anything about native trees, shrubs, plants, and vegetables of the Thar Desert!',
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
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-[#556B2F] hover:bg-[#465826] text-white font-nav font-semibold shadow-2xl flex items-center gap-2.5 transition-transform duration-300 hover:scale-105 border border-[#FAF8F3]/30"
      >
        <Bot className="w-6 h-6 text-amber-200" />
        <span className="hidden sm:inline text-xs font-nav font-semibold tracking-wide">Thar Botanist AI</span>
        <Sparkles className="w-4 h-4 text-amber-200 animate-spin" />
      </button>

      {/* Floating Chat Window Modal */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[92vw] sm:w-[420px] h-[540px] bg-[#FAF8F3] rounded-3xl border border-[#E8D8B5] premium-shadow-lg flex flex-col overflow-hidden backdrop-blur-xl animate-fadeIn text-[#333333]">
          
          {/* Header */}
          <div className="p-4 bg-[#4A3B2A] text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#556B2F] flex items-center justify-center text-white">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif-heading font-bold text-lg text-white">Thar Botanist</h3>
                <p className="text-[10px] text-amber-200 font-nav font-medium">Grounded Research AI Assistant</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full hover:bg-white/10 text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 custom-scrollbar text-xs font-sans">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 max-w-[88%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
              >
                {/* Avatar */}
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-[10px] font-bold ${
                    msg.sender === 'user'
                      ? 'bg-[#B65A3C] text-white'
                      : 'bg-[#556B2F] text-white'
                  }`}
                >
                  {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                {/* Bubble */}
                <div
                  className={`p-3.5 rounded-2xl leading-relaxed space-y-2 ${
                    msg.sender === 'user'
                      ? 'bg-[#B65A3C] text-white font-medium rounded-tr-none'
                      : 'bg-[#F5F1E8] border border-[#E8D8B5] text-[#333333] rounded-tl-none'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>

                  {/* Citation Reference */}
                  {msg.sender === 'ai' && msg.ragResult && msg.ragResult.citations.length > 0 && (
                    <div className="pt-2 border-t border-[#E8D8B5] text-[10px] text-[#556B2F] font-semibold flex items-center gap-1 font-nav">
                      <FileText className="w-3 h-3 text-[#6B8E23]" />
                      <span>Reference: {msg.ragResult.citations[0].sectionTitle}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-[#556B2F] animate-pulse font-nav font-medium">
                <Bot className="w-4 h-4 text-[#556B2F]" />
                <span>Searching research monograph...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Example Questions Ribbon */}
          <div className="px-3 py-2 bg-[#F5F1E8] border-t border-[#E8D8B5] overflow-x-auto flex items-center gap-1.5 scrollbar-none text-[11px] font-sans">
            <span className="font-nav font-semibold text-[#4A3B2A] shrink-0">Examples:</span>
            {exampleQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                className="px-2.5 py-1 rounded-full bg-[#FAF8F3] hover:bg-[#E8D8B5] border border-[#E8D8B5] text-[#4A3B2A] whitespace-nowrap transition-all font-nav text-[11px]"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-[#FAF8F3] border-t border-[#E8D8B5] flex items-center gap-2">
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask Thar Botanist..."
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#F5F1E8] border border-[#E8D8B5] text-[#333333] text-xs placeholder-[#333333]/40 focus:outline-none focus:border-[#556B2F] font-sans"
            />
            <button
              onClick={() => handleSendMessage()}
              className="p-2.5 rounded-xl bg-[#556B2F] hover:bg-[#465826] text-white font-bold transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}
    </>
  );
};
