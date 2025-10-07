import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User,
  Loader
} from 'lucide-react';
import { chatResponses } from '../data/mockData';
import './ChatPanel.css';

const ChatPanel = ({ isOpen, onClose, policyTitle }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Initialize with welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage = {
        id: Date.now(),
        type: 'ai',
        content: `Hello! I'm here to help you understand "${policyTitle}". You can ask me questions about eligibility, benefits, application process, or any other details about this policy.`,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, policyTitle, messages.length]);

  const simulateAIResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    // Find matching response based on keywords
    let response = "I understand you're asking about this policy. Let me provide you with the most relevant information based on the policy document.";
    
    if (message.includes('eligible') || message.includes('eligibility')) {
      response = chatResponses["who is eligible"][0];
    } else if (message.includes('benefit') || message.includes('what do i get')) {
      response = chatResponses["what are the benefits"][0];
    } else if (message.includes('apply') || message.includes('how to')) {
      response = chatResponses["how do i apply"][0];
    } else if (message.includes('launch') || message.includes('when')) {
      response = chatResponses["when was this policy launched"][0];
    } else if (message.includes('budget') || message.includes('cost') || message.includes('fund')) {
      response = chatResponses["what is the budget"][0];
    }
    
    return response;
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: 'ai',
        content: simulateAIResponse(inputValue.trim()),
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickQuestion = (question) => {
    setInputValue(question);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const quickQuestions = [
    "Who is eligible?",
    "What are the benefits?",
    "How do I apply?",
    "When was this launched?",
    "What is the budget?"
  ];

  return (
    <>
      {/* Chat Button */}
      <button
        className="chat-button"
        onClick={() => onClose(!isOpen)}
        aria-label="Open chat"
      >
        <MessageCircle className="chat-button-icon" />
        {messages.length > 1 && (
          <span className="chat-notification-badge">
            {messages.length - 1}
          </span>
        )}
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div 
            className="chat-overlay"
            onClick={() => onClose(false)}
          />
          
          {/* Panel */}
          <div className="chat-panel">
            {/* Header */}
            <div className="chat-header">
              <div className="chat-header-content">
                <div className="chat-header-icon">
                  <Bot />
                </div>
                <div className="chat-header-text">
                  <h3>Ask about this policy</h3>
                  <p>AI Assistant</p>
                </div>
              </div>
              <button
                className="chat-close-button"
                onClick={() => onClose(false)}
                aria-label="Close chat"
              >
                <X />
              </button>
            </div>

            {/* Messages */}
            <div className="chat-messages">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`chat-message chat-message-${message.type}`}
                >
                  <div className="chat-message-avatar">
                    {message.type === 'user' ? <User /> : <Bot />}
                  </div>
                  <div className="chat-message-content">
                    <div className="chat-message-text">
                      {message.content}
                    </div>
                    <div className="chat-message-time">
                      {formatTime(message.timestamp)}
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="chat-message chat-message-ai">
                  <div className="chat-message-avatar">
                    <Bot />
                  </div>
                  <div className="chat-message-content">
                    <div className="typing-indicator">
                      <div className="typing-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            {messages.length <= 1 && (
              <div className="chat-quick-questions">
                <p className="quick-questions-title">Try asking:</p>
                <div className="quick-questions-grid">
                  {quickQuestions.map((question, index) => (
                    <button
                      key={index}
                      className="quick-question-button"
                      onClick={() => handleQuickQuestion(question)}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <form className="chat-input-form" onSubmit={handleSendMessage}>
              <div className="chat-input-wrapper">
                <textarea
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your question..."
                  className="chat-input"
                  rows="1"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage(e);
                    }
                  }}
                />
                <button
                  type="submit"
                  className="chat-send-button"
                  disabled={!inputValue.trim() || isTyping}
                >
                  <Send className="send-icon" />
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default ChatPanel;
