import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Lightbulb, Wrench, AlertCircle } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  category?: string;
}

const ChatAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Hello! I\'m your Astreea AI assistant. I can help you with troubleshooting, optimization tips, and maintenance guidance. What can I help you with today?',
      timestamp: new Date(),
      category: 'greeting'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickActions = [
    { text: 'Why is my charger running slowly?', category: 'troubleshooting' },
    { text: 'How can I optimize charging efficiency?', category: 'optimization' },
    { text: 'When should I schedule maintenance?', category: 'maintenance' },
    { text: 'What does the amber status light mean?', category: 'troubleshooting' }
  ];

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('slow') || lowerMessage.includes('charging slowly')) {
      return 'Slow charging can be caused by several factors:\n\n• **Temperature**: High ambient temperature (>45°C) triggers thermal throttling\n• **Power sharing**: Multiple vehicles charging simultaneously\n• **Battery state**: Batteries charge slower when nearly full (80%+)\n• **Grid limitations**: Local power grid constraints\n\nI\'ve analyzed your current session data and noticed your temperature is at 42°C, which is within normal range. Would you like me to run a diagnostic check?';
    }
    
    if (lowerMessage.includes('optim') || lowerMessage.includes('efficiency')) {
      return 'Here are AI-driven optimization recommendations based on your usage pattern:\n\n• **Charging schedule**: Best efficiency between 10 PM - 6 AM when grid load is lower\n• **Target charge level**: Stop at 80% for daily use to maximize battery longevity\n• **Temperature management**: Pre-cool the charger location if possible\n• **Load balancing**: Your current power factor is excellent at 0.98\n\nYour recent efficiency has been 97.2% - that\'s exceptional! Keep up the current practices.';
    }
    
    if (lowerMessage.includes('maintenance') || lowerMessage.includes('service')) {
      return 'Based on your charger\'s AI analysis:\n\n**Upcoming maintenance (recommended in 2 weeks):**\n• Clean air vents and check for debris\n• Inspect cable connections for wear\n• Update firmware to latest version\n• Calibrate power sensors\n\n**Current health status:**\n• Connector wear: Minimal\n• Internal components: All nominal\n• Software: Up to date\n• Performance: 98.5% of baseline\n\nWould you like me to schedule a maintenance reminder or provide detailed instructions for any of these tasks?';
    }
    
    if (lowerMessage.includes('status') || lowerMessage.includes('light') || lowerMessage.includes('amber') || lowerMessage.includes('warning')) {
      return 'Status light indicators:\n\n🟢 **Green (Solid)**: Optimal operation, all systems normal\n🟡 **Amber (Blinking)**: Minor issue detected, monitoring in progress\n🔴 **Red (Solid)**: Attention required, charging may be limited\n🔵 **Blue (Pulsing)**: Connecting to vehicle or network\n\n**Current status**: Your charger is showing amber due to slightly elevated operating temperature. This is precautionary and charging continues normally. The system will return to green when temperature drops below 40°C.';
    }
    
    if (lowerMessage.includes('error') || lowerMessage.includes('problem') || lowerMessage.includes('issue')) {
      return 'I\'m here to help resolve any issues! Based on your charger\'s current telemetry:\n\n**No critical errors detected** ✅\n\n**Recent notifications:**\n• Temperature alert (resolved)\n• Minor voltage fluctuation (auto-corrected)\n• Connectivity test passed\n\nFor immediate assistance:\n1. Check if the issue persists after current session\n2. Try a power cycle (unplug for 30 seconds)\n3. Ensure your mobile app is updated\n\nCan you describe the specific problem you\'re experiencing? I can provide targeted troubleshooting steps.';
    }
    
    return 'I understand you need assistance with your Astreea charger. I have access to your real-time charger data and can help with:\n\n• **Troubleshooting** charging issues\n• **Performance optimization** recommendations\n• **Maintenance scheduling** and guidance\n• **Technical explanations** of status indicators\n\nCould you please provide more details about what you\'d like help with? You can also try one of the quick action buttons below for common questions.';
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI processing time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: generateAIResponse(inputValue),
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickAction = (action: string) => {
    setInputValue(action);
    setTimeout(() => handleSendMessage(), 100);
  };

  const formatMessage = (content: string) => {
    return content.split('\n').map((line, index) => {
      if (line.startsWith('• **') && line.includes('**:')) {
        const [label, ...rest] = line.split('**:');
        return (
          <div key={index} className="mb-2">
            <strong>{label.replace('• **', '• ')}</strong>: {rest.join('**:')}
          </div>
        );
      }
      if (line.startsWith('**') && line.endsWith('**')) {
        return <div key={index} className="font-semibold mb-1">{line.replace(/\*\*/g, '')}</div>;
      }
      if (line.trim()) {
        return <div key={index} className="mb-1">{line}</div>;
      }
      return <div key={index} className="mb-2"></div>;
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 h-screen flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Assistant</h1>
        <p className="text-gray-600">Get instant help with your Astreea charger using AI-powered support</p>
      </div>

      {/* Chat Container */}
      <div className="flex-1 bg-white rounded-xl shadow-lg border border-gray-100 flex flex-col">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-3 ${
                message.type === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.type === 'ai' && (
                <div className="bg-blue-100 p-2 rounded-full">
                  <Bot className="h-5 w-5 text-blue-600" />
                </div>
              )}
              <div
                className={`max-w-2xl p-4 rounded-lg ${
                  message.type === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <div className="text-sm">{formatMessage(message.content)}</div>
                <div className={`text-xs mt-2 ${
                  message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
              {message.type === 'user' && (
                <div className="bg-gray-200 p-2 rounded-full">
                  <User className="h-5 w-5 text-gray-600" />
                </div>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="flex items-start space-x-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <Bot className="h-5 w-5 text-blue-600" />
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        <div className="border-t border-gray-200 p-4">
          <div className="text-sm text-gray-600 mb-3">Quick actions:</div>
          <div className="flex flex-wrap gap-2 mb-4">
            {quickActions.map((action, index) => {
              const getIcon = (category: string) => {
                switch (category) {
                  case 'troubleshooting': return <Wrench className="h-3 w-3" />;
                  case 'optimization': return <Lightbulb className="h-3 w-3" />;
                  case 'maintenance': return <AlertCircle className="h-3 w-3" />;
                  default: return null;
                }
              };
              
              return (
                <button
                  key={index}
                  onClick={() => handleQuickAction(action.text)}
                  className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm px-3 py-2 rounded-lg transition-colors"
                >
                  {getIcon(action.category)}
                  <span>{action.text}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Input */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex space-x-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask me anything about your charger..."
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white p-2 rounded-lg transition-colors"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatAssistant;