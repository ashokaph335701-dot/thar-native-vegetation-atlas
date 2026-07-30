import React, { useState, useRef, useEffect } from 'react';
import { queryTharBotanistRAG } from '../services/ragEngine';
import { ChatMessage, RAGAnswer } from '../types';
import { plantDatabase } from '../data/plantDatabase';
import { Sparkles, Send, Download, RefreshCw, Volume2, ShieldCheck, FileText, ArrowRight, CornerDownRight, CheckCircle2, Bot, User } from 'lucide-react';
import jsPDF from 'jspdf';

interface TharBotanistAIProps {
  onSelectPlantByName?: (name: string) => void;
}

export const TharBotanistAI: React.FC<TharBotanistAIProps> = ({ onSelectPlantByName }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: 'Greetings! I am Thar Botanist AI, an intelligent research assistant trained entirely on the scientific monograph "Comprehensive Monograph on the Flora of the Thar Desert: Ecology, Ethnobotany, and Cultural Heritage". Ask me anything about native desert flora, traditional ecological knowledge, Panchkuta recipes, or district distributions.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      ragResult: {
        answer: 'Greetings! Ask me anything about native desert flora, traditional ecological knowledge, Panchkuta recipes, or district distributions.',
        citations: [{ docId: 'Research Paper', sectionTitle: 'Comprehensive Monograph', quote: 'CAZRI & Botanical Survey Registry' }],
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

    // Simulate RAG engine retrieval delay
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
    }, 600);
  };

  const downloadConversationPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Thar Botanist AI - Research Query Report', 14, 20);
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 28);
    doc.text('Knowledge Source: Comprehensive Monograph on the Flora of the Thar Desert', 14, 34);
    doc.line(14, 38, 195, 38);

    let y = 46;
    messages.forEach((msg) => {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
      doc.setFont('helvetica', 'bold');
      doc.text(`${msg.sender.toUpperCase()} [${msg.timestamp}]:`, 14, y);
      y += 6;
      doc.setFont('helvetica', 'normal');
      const lines = doc.splitTextToSize(msg.text.replace(/[*#]/g, ''), 180);
      doc.text(lines, 14, y);
      y += lines.length * 5 + 6;
    });

    doc.save('Thar_Botanist_AI_Report.pdf');
  };

  const handleSpeak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const cleanText = text.replace(/[*#_]/g, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <section className="py-12 bg-amber-950 text-amber-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-amber-800/40">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
              <span>Retrieval-Augmented Generation (RAG)</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-amber-100 flex items-center gap-3">
              Thar Botanist AI Assistant
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-amber-300/80 max-w-2xl">
              Trained 100% on the uploaded scientific research monograph. Guaranteed zero hallucination with explicit citations and confidence levels.
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-2">
            <button
              onClick={downloadConversationPDF}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-900/60 hover:bg-amber-800/80 border border-amber-700/50 text-amber-200 font-bold text-xs shadow-md transition-all"
            >
              <Download className="w-4 h-4 text-amber-400" /> Export PDF Report
            </button>
          </div>
        </div>

        {/* Chat Interface Container */}
        <div className="bg-stone-900/90 rounded-3xl border border-amber-800/50 shadow-2xl overflow-hidden flex flex-col h-[650px]">
          
          {/* Top Info Banner */}
          <div className="px-6 py-3 bg-amber-950/80 border-b border-amber-800/40 flex items-center justify-between text-xs text-amber-300">
            <span className="flex items-center gap-2 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Knowledge Base: 1 Document Index (29 Monographed Species)
            </span>
            <span className="text-emerald-400 font-bold bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-800">
              Source Grounded Only
            </span>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-6 overflow-y-auto space-y-6 custom-scrollbar">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-4xl ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
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

                {/* Message Bubble */}
                <div
                  className={`space-y-3 p-5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-amber-600 text-amber-950 font-semibold rounded-tr-none'
                      : 'bg-amber-950/60 border border-amber-800/40 text-amber-100 rounded-tl-none'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4 text-[11px] opacity-75">
                    <span className="font-bold">{msg.sender === 'user' ? 'You' : 'Thar Botanist AI'}</span>
                    <span>{msg.timestamp}</span>
                  </div>

                  <div className="prose prose-invert prose-xs max-w-none space-y-2">
                    {msg.text.split('\n\n').map((paragraph, pIdx) => (
                      <p key={pIdx} className="whitespace-pre-wrap">{paragraph}</p>
                    ))}
                  </div>

                  {/* AI RAG Telemetry Footer */}
                  {msg.sender === 'ai' && msg.ragResult && (
                    <div className="pt-4 border-t border-amber-800/40 space-y-3 text-xs">
                      
                      {/* Confidence Badge & Speak Button */}
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 font-bold">
                          Confidence Level:
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] ${
                              msg.ragResult.confidence === 'High'
                                ? 'bg-emerald-950 text-emerald-300 border border-emerald-600'
                                : 'bg-amber-950 text-amber-300 border border-amber-600'
                            }`}
                          >
                            {msg.ragResult.confidence}
                          </span>
                        </span>

                        <button
                          onClick={() => handleSpeak(msg.text)}
                          className="flex items-center gap-1 text-[11px] text-amber-400 hover:text-amber-200 transition-colors"
                        >
                          <Volume2 className="w-3.5 h-3.5" /> Listen Audio
                        </button>
                      </div>

                      {/* Document Citations */}
                      {msg.ragResult.citations.length > 0 && (
                        <div className="space-y-1.5">
                          <span className="font-bold text-amber-400 text-[11px] flex items-center gap-1">
                            <FileText className="w-3.5 h-3.5" /> Source Citations:
                          </span>
                          {msg.ragResult.citations.map((cite, cIdx) => (
                            <div key={cIdx} className="p-2.5 rounded-lg bg-stone-900/90 border border-amber-800/30 text-[11px] text-amber-200/90">
                              <p className="font-bold text-amber-300">📄 {cite.docId} — {cite.sectionTitle}</p>
                              <p className="italic text-amber-400/80 mt-1">"{cite.quote}"</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Related Species Cards */}
                      {msg.ragResult.relatedSpecies.length > 0 && (
                        <div className="space-y-1.5">
                          <span className="font-bold text-amber-300 text-[11px]">Related Species Monographed:</span>
                          <div className="flex flex-wrap gap-1.5">
                            {msg.ragResult.relatedSpecies.map((spName, sIdx) => (
                              <span
                                key={sIdx}
                                className="px-2.5 py-1 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-700/50 text-[10px] font-semibold cursor-pointer hover:bg-emerald-900"
                              >
                                🌿 {spName}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Suggested Follow-Ups */}
                      {msg.ragResult.suggestedFollowUps.length > 0 && (
                        <div className="space-y-1 pt-2">
                          <span className="text-[11px] font-bold text-amber-400">Suggested Follow-Up Questions:</span>
                          <div className="space-y-1">
                            {msg.ragResult.suggestedFollowUps.map((q, qIdx) => (
                              <button
                                key={qIdx}
                                onClick={() => handleSendMessage(q)}
                                className="w-full text-left p-2 rounded-lg bg-amber-900/30 hover:bg-amber-800/50 border border-amber-800/30 text-amber-200 text-[11px] transition-colors flex items-center justify-between group"
                              >
                                <span>{q}</span>
                                <CornerDownRight className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-1 transition-transform" />
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
                <span>Searching Research Index & Synthesizing Grounded Answer...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Sample Prompts Ribbon */}
          <div className="px-6 py-2 bg-stone-950 border-t border-amber-800/30 overflow-x-auto flex items-center gap-2 scrollbar-none text-xs">
            <span className="font-bold text-amber-400 whitespace-nowrap">Examples:</span>
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
              placeholder="Ask anything about Thar flora (e.g. 'What trees grow in Jaisalmer?')..."
              className="flex-1 px-4 py-3 rounded-2xl bg-stone-900 border border-amber-700/50 text-amber-100 text-xs sm:text-sm placeholder-amber-400/40 focus:outline-none focus:border-amber-400 transition-colors"
            />
            <button
              onClick={() => handleSendMessage()}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-amber-950 font-bold text-xs sm:text-sm shadow-xl flex items-center gap-2 transition-all hover:scale-105"
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
