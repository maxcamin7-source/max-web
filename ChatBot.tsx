
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, User, Loader2, Sparkles, ChevronRight } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface Message {
  role: 'user' | 'model';
  text: string;
}

const QUICK_PROMPTS = [
  "Tell me about the 20.2% alpha.",
  "What is the Hawk Investment Club?",
  "What are your wealth management goals?",
  "Tell me about your SAE role."
];

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Hi! I'm Max's AI assistant. I have all the details on his finance background and his work with the Hawk Investment Club. What would you like to know?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (overrideText?: string) => {
    const textToSend = overrideText || input;
    if (!textToSend.trim() || isLoading) return;

    const userText = textToSend.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userText,
        config: {
          systemInstruction: `You are a professional, enthusiastic, and highly knowledgeable AI assistant representing Max Camin, a student at Baylor University.
          
          MAX'S KEY FACTS:
          - Education: Finance and Marketing double major at Baylor University (Class of 2027). GPA: 3.36.
          - Hawk Investment Club: Max is the Founder and President. He manages a $18,000 portfolio of equities. In the first half of 2025, the club outperformed the S&P 500 by 20.2%.
          - SAE Fraternity: Treasurer for the Baylor chapter. Manages a $70,000 semester budget for 49 members.
          - Experience: Financial Planning Intern at Blakelock Financial Group (LPL Financial), assisting with 560 clients.
          - Certifications: Securities Industries Essentials (SIE), Excel Associate.
          - Technical Skills: Quicken, ClientWorks, myICLUB, OmegaFi.
          - Languages: Conversational Spanish.
          - Future: Studying abroad in Madrid, Spain in Spring 2026.
          - Career Goal: A career in Wealth Management, helping families achieve financial freedom.
          
          INSTRUCTIONS:
          - Be professional but approachable. Use "Max" in the third person or "We" if referring to his initiatives.
          - If someone asks about the portfolio, highlight the 20.2% outperformance.
          - If someone asks about his leadership, mention founding the Hawk Investment Club or being SAE Treasurer.
          - Keep answers concise (2-3 sentences max unless detail is requested).
          - If you don't know something, suggest they email Max at maxcamin32@gmail.com.`,
        },
      });

      const aiText = response.text || "I'm sorry, I couldn't quite get that. Could you try rephrasing?";
      setMessages(prev => [...prev, { role: 'model', text: aiText }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "I'm experiencing a brief connection issue. Please try again in a moment!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[350px] sm:w-[400px] h-[500px] bg-white rounded-[2rem] shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-slideUp">
          {/* Header */}
          <div className="bg-[#1a4a3a] p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center border border-white/20">
                <Sparkles size={20} className="text-amber-400" />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm uppercase tracking-widest">Max's AI Assistant</h3>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className="text-emerald-300 text-[10px] font-bold uppercase tracking-wider">Ready to chat</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/60 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}>
                <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-slate-200' : 'bg-emerald-100 text-emerald-700'}`}>
                    {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                  </div>
                  <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-[#1a4a3a] text-white rounded-tr-none shadow-md' 
                      : 'bg-white text-slate-700 border border-slate-200 rounded-tl-none shadow-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start animate-fadeIn">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <Bot size={14} />
                  </div>
                  <div className="bg-white border border-slate-200 p-4 rounded-2xl rounded-tl-none shadow-sm">
                    <Loader2 size={16} className="animate-spin text-emerald-700" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-slate-100">
            {/* Quick Prompts */}
            {messages.length < 3 && !isLoading && (
              <div className="flex flex-wrap gap-2 mb-4">
                {QUICK_PROMPTS.map((prompt) => (
                  <button 
                    key={prompt}
                    onClick={() => handleSend(prompt)}
                    className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-full text-slate-500 hover:border-emerald-700 hover:text-emerald-700 transition-colors flex items-center gap-1"
                  >
                    {prompt}
                    <ChevronRight size={10} />
                  </button>
                ))}
              </div>
            )}

            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl p-2 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me anything..."
                className="flex-1 bg-transparent border-none focus:outline-none px-2 text-sm text-slate-700 placeholder:text-slate-400"
              />
              <button 
                onClick={() => handleSend()}
                disabled={!input.trim() || isLoading}
                className="w-10 h-10 bg-[#1a4a3a] text-white rounded-lg flex items-center justify-center hover:bg-[#153a2d] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                <Send size={18} />
              </button>
            </div>
            <p className="text-[10px] text-center text-slate-400 mt-3 font-medium uppercase tracking-widest">Powered by Gemini AI</p>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`group w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 transform hover:scale-110 active:scale-95 ${
          isOpen ? 'bg-slate-800 rotate-90' : 'bg-[#1a4a3a]'
        }`}
      >
        {isOpen ? (
          <X className="text-white" size={28} />
        ) : (
          <div className="relative">
            <MessageSquare className="text-white" size={28} />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 border-2 border-white rounded-full animate-bounce"></div>
          </div>
        )}
      </button>
    </div>
  );
};

export default ChatBot;
