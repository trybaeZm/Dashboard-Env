"use client"
import Image from "next/image";
import { FaSearch, FaPlus, FaImage, FaTrashAlt } from "react-icons/fa";
import { MdOutlineMessage, MdKeyboardVoice } from "react-icons/md";
import { LuSendHorizontal } from "react-icons/lu";
import { CiInboxOut } from "react-icons/ci";
import { MessageSquareTextIcon, Sparkles } from "lucide-react";
import { Bars3BottomLeftIcon } from "@heroicons/react/24/outline";
import { useState, useRef, useEffect } from "react";
import TextareaAutosize from 'react-textarea-autosize';

const ChatCard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{ message: string, sender: string }[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim()) {
      setMessages([...messages, { message: message, sender: 'user' }]);
      setMessage('');
      
      // Simulate AI response
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          message: "I understand your query about sales optimization. Based on your current data, I recommend focusing on customer retention strategies and personalized marketing campaigns.", 
          sender: 'bot' 
        }]);
      }, 1000);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  const chatExamples = [
    "According to my products how can I make more sales?",
    "At my current rate how can I optimize to retain customers?",
    "Generate a comprehensive sales report",
    "Analyze customer behavior patterns"
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20">
      {/* Sidebar */}
      <div className={`
        fixed md:relative z-50 h-full transition-all duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 w-80 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg
        border-r border-gray-200/50 dark:border-gray-700/50
      `}>
        <div className="flex flex-col h-full p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                SalesAI
              </h1>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <Bars3BottomLeftIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              className="w-full pl-10 pr-4 py-3 bg-gray-100/50 dark:bg-gray-700/50 rounded-xl border border-gray-200/50 dark:border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
              placeholder="Search conversations..."
            />
          </div>

          {/* Chat History */}
          <div className="flex-1 space-y-2 mb-6">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
              Recent Chats
            </h3>
            {[
              "Understanding Customers",
              "Sales Analytics",
              "Q3 Performance Review",
              "Customer Retention"
            ].map((title, index) => (
              <button
                key={index}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-colors group"
              >
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg group-hover:scale-110 transition-transform">
                  <MdOutlineMessage className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                  {title}
                </span>
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-3 rounded-xl font-medium transition-all transform hover:scale-[1.02] active:scale-[0.98]">
              <FaPlus className="w-4 h-4" />
              New Chat
            </button>
            
            <button className="w-full flex items-center gap-3 p-3 text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 rounded-xl transition-colors">
              <CiInboxOut className="w-5 h-5" />
              <span className="text-sm font-medium">Updates & FAQs</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative">
        {/* Chat Header */}
        {messages.length > 0 && (
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-700/50 p-4">
            <div className="flex items-center justify-between">
              <button 
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors md:hidden"
              >
                <MessageSquareTextIcon className="w-5 h-5" />
                <span className="font-medium hidden md:block">Chat History</span>
              </button>
              
              <div className="flex items-center gap-3">
                <div className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Sales Assistant
                </div>
                <span className="bg-gradient-to-r from-green-400 to-blue-400 text-white text-xs px-2 py-1 rounded-full font-medium">
                  AI Powered
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Messages Area */}
        <div className="flex-1 overflow-hidden">
          {messages.length === 0 ? (
            // Welcome Screen
            <div className="h-full flex items-center justify-center ">
              <div className="text-center max-w-2xl">
                <div className="mb-8">
                  <div className="relative inline-block">
                    <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-blue-400 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                      <Sparkles className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-4 border-white dark:border-gray-900"></div>
                  </div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-blue-600 dark:from-gray-100 dark:to-blue-400 bg-clip-text text-transparent mb-2">
                    Hello! I'm your Sales AI Assistant
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-lg">
                    Ready to help you analyze data and optimize your sales strategy
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  {chatExamples.map((example, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setMessage(example);
                        setTimeout(() => {
                          document.querySelector('form')?.dispatchEvent(
                            new Event('submit', { cancelable: true, bubbles: true })
                          );
                        }, 100);
                      }}
                      className="p-4 text-left bg-white/50 dark:bg-gray-800/50 rounded-xl border border-gray-200/50 dark:border-gray-700/50 hover:border-blue-300 dark:hover:border-blue-600 transition-all hover:shadow-lg group"
                    >
                      <div className="text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {example}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            // Messages List
            <div className="h-full overflow-y-auto p-6 space-y-6">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex dark:text-white ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-2xl ${
                    msg.sender === 'user' 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl rounded-tr-none' 
                      : 'bg-white dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-2xl rounded-tl-none shadow-sm'
                  } p-4`}>
                    <div className="flex items-start gap-3">
                      {msg.sender === 'bot' && (
                        <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <Sparkles className="w-3 h-3 text-white" />
                        </div>
                      )}
                      <div className="text-sm leading-relaxed">
                        {msg.message}
                      </div>
                      {msg.sender === 'user' && (
                        <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-xs">👤</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg p-2">
          <form onSubmit={handleSubmit} className="max-w-4xl  mx-auto">
            <div className=" flex justify-end  gap-4 space-y-2 items-center flex-wrap">
              <TextareaAutosize
                maxRows={6}
                minRows={1}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                className="grow pl-4 pr-12 py-4 bg-gray-100/50 dark:bg-gray-700/50 border border-gray-200/50 dark:border-gray-600/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent resize-none transition-all dark:text-white"
                placeholder="Ask me anything about sales analytics..."
              />
              
              <div className=" grow-0 right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                <button
                  type="button"
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  <FaImage className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  <MdKeyboardVoice className="w-4 h-4" />
                </button>
                <button
                  type="submit"
                  disabled={!message.trim()}
                  className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-110 active:scale-95"
                >
                  <LuSendHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="flex justify-center mt-3">
              <span className="text-xs text-gray-400 dark:text-gray-500">
                Sales AI Assistant • Powered by advanced analytics
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatCard;