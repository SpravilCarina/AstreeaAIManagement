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
    
    // Astreea product information
    if (lowerMessage.includes('astreea') || lowerMessage.includes('about') || lowerMessage.includes('company')) {
      return 'Astreea is a leading manufacturer of intelligent EV charging solutions. We specialize in:\n\n• **Smart AC Chargers**: 7kW, 11kW, and 22kW models with advanced connectivity\n• **DC Fast Chargers**: High-power solutions for commercial applications\n• **AI-Powered Management**: Intelligent load balancing and predictive maintenance\n• **Cloud Integration**: Real-time monitoring and remote diagnostics\n\nOur chargers are designed for reliability, efficiency, and seamless user experience. All models feature weatherproof construction, RFID access control, and mobile app integration.';
    }
    
    if (lowerMessage.includes('model') || lowerMessage.includes('specification') || lowerMessage.includes('specs')) {
      return 'Astreea Smart Charger Specifications:\n\n**AC Models:**\n• **7kW Single Phase**: Perfect for home use, Type 2 connector\n• **11kW Three Phase**: Ideal for workplace charging\n• **22kW Three Phase**: Maximum AC charging speed\n\n**Key Features:**\n• IP65 weatherproof rating\n• -30°C to +50°C operating temperature\n• RFID card access control\n• WiFi + Ethernet connectivity\n• LED status indicators\n• Emergency stop button\n• Ground fault protection (Type A + DC 6mA)\n\n**Dimensions**: 320mm x 180mm x 95mm\n**Weight**: 3.2kg\n**Warranty**: 3 years standard\n\nWhich specific model are you interested in learning more about?';
    }
    
    if (lowerMessage.includes('installation') || lowerMessage.includes('install') || lowerMessage.includes('setup')) {
      return 'Astreea Charger Installation Guide:\n\n**Pre-Installation:**\n• Verify electrical supply capacity\n• Check local electrical codes and permits\n• Ensure WiFi coverage at installation location\n• Plan cable routing and mounting location\n\n**Installation Steps:**\n1. **Electrical Connection**: Connect to dedicated circuit breaker\n2. **Mounting**: Secure to wall using provided bracket\n3. **Network Setup**: Configure WiFi through mobile app\n4. **Testing**: Verify all safety systems and connectivity\n\n**Professional Installation Recommended**\nFor safety and warranty compliance, we recommend certified electrician installation.\n\n**Installation Support**: Contact our technical team at support@astreea.com\n\nWould you like specific guidance for your installation scenario?';
    }
    
    if (lowerMessage.includes('app') || lowerMessage.includes('mobile') || lowerMessage.includes('smartphone')) {
      return 'Astreea Mobile App Features:\n\n**Charging Control:**\n• Start/stop charging sessions remotely\n• Schedule charging during off-peak hours\n• Set charging limits and targets\n• Monitor real-time charging progress\n\n**Smart Features:**\n• Load balancing across multiple chargers\n• Energy cost tracking and optimization\n• Charging history and analytics\n• Push notifications for session updates\n\n**Management:**\n• User access control and RFID management\n• Firmware updates over-the-air\n• Diagnostic reports and maintenance alerts\n• Integration with energy management systems\n\n**Download:**\n• iOS: Available on App Store\n• Android: Available on Google Play\n\nThe app works seamlessly with all Astreea charger models. Need help with app setup?';
    }
    
    if (lowerMessage.includes('warranty') || lowerMessage.includes('support') || lowerMessage.includes('service')) {
      return 'Astreea Support & Warranty:\n\n**Warranty Coverage:**\n• **Standard**: 3 years full warranty\n• **Extended**: Up to 5 years available\n• **Coverage**: All components, labor, and software updates\n• **Response**: 24-48 hour support response time\n\n**Support Channels:**\n• **Technical Support**: support@astreea.com\n• **Phone**: Available during business hours\n• **Remote Diagnostics**: Through mobile app\n• **On-site Service**: Available for commercial installations\n\n**Preventive Maintenance:**\n• Annual inspection recommended\n• Firmware updates automatic\n• Performance monitoring continuous\n• Predictive maintenance alerts\n\n**Common Issues Covered:**\n• Connector wear and replacement\n• Software bugs and updates\n• Electrical component failures\n• Weather-related damage\n\nWhat specific support do you need today?';
    }
    
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('buy') || lowerMessage.includes('purchase')) {
      return 'Astreea Charger Pricing & Purchase:\n\n**Pricing Tiers:**\n• **7kW Home**: Starting from competitive home charging rates\n• **11kW Workplace**: Mid-range pricing for commercial use\n• **22kW Commercial**: Premium pricing for high-speed charging\n\n**What\'s Included:**\n• Charger unit with mounting hardware\n• 3-year comprehensive warranty\n• Mobile app access and cloud services\n• Installation guide and support\n• RFID cards (2 included)\n\n**Purchase Options:**\n• **Direct Sales**: Through Astreea website\n• **Authorized Dealers**: Local installation partners\n• **Bulk Orders**: Special pricing for fleet installations\n• **Financing**: Available for commercial customers\n\n**Contact Sales:**\n• Email: sales@astreea.com\n• Request quote through website\n• Authorized dealer network\n\nWould you like me to help you choose the right model for your needs?';
    }
    
    if (lowerMessage.includes('rfid') || lowerMessage.includes('access') || lowerMessage.includes('card') || lowerMessage.includes('authentication')) {
      return 'Astreea RFID Access Control:\n\n**RFID Features:**\n• **Secure Access**: Only authorized users can charge\n• **User Management**: Add/remove users through mobile app\n• **Multiple Cards**: Support for up to 100 RFID cards per charger\n• **Card Types**: Compatible with standard 13.56MHz RFID cards\n\n**Access Methods:**\n• **RFID Cards**: Tap to start charging\n• **Mobile App**: Start charging remotely\n• **Guest Access**: Temporary access codes\n• **Open Mode**: Disable access control if needed\n\n**Management:**\n• Real-time user activity logging\n• Charging session attribution\n• Cost allocation per user\n• Usage reports and analytics\n\n**Setup:**\n1. Register RFID cards in mobile app\n2. Assign cards to specific users\n3. Set user permissions and limits\n4. Monitor usage through dashboard\n\n**Lost Card?** Easily deactivate and replace through the app.\n\nNeed help setting up RFID access for your charger?';
    }
    
    if (lowerMessage.includes('load balancing') || lowerMessage.includes('power sharing') || lowerMessage.includes('multiple chargers')) {
      return 'Astreea Smart Load Balancing:\n\n**Dynamic Load Management:**\n• **Automatic Power Distribution**: Intelligently shares available power across multiple chargers\n• **Priority Settings**: Configure charging priorities for different users/vehicles\n• **Grid Protection**: Prevents electrical overload and circuit breaker trips\n• **Real-time Adjustment**: Continuously optimizes power allocation\n\n**Configuration Options:**\n• **Master-Slave Setup**: One charger manages the group\n• **Cloud-Based**: Centralized management through Astreea cloud\n• **Custom Limits**: Set maximum power per charger or user\n• **Time-Based Rules**: Different power limits for peak/off-peak hours\n\n**Benefits:**\n• **Cost Savings**: Avoid expensive electrical upgrades\n• **Efficiency**: Maximize charging speed within available power\n• **Scalability**: Easy to add more chargers to existing setup\n• **Reliability**: Prevents system overloads and downtime\n\n**Supported Configurations:**\n• Up to 32 chargers in one load balancing group\n• Mixed charger types (7kW, 11kW, 22kW)\n• Integration with building energy management\n\nWant to know more about setting up load balancing for your installation?';
    }
    
    if (lowerMessage.includes('weather') || lowerMessage.includes('outdoor') || lowerMessage.includes('ip65') || lowerMessage.includes('waterproof')) {
      return 'Astreea Weather Protection & Durability:\n\n**IP65 Rating:**\n• **Dust Protection**: Completely sealed against dust ingress\n• **Water Protection**: Protected against water jets from any direction\n• **Outdoor Ready**: Suitable for all weather conditions\n• **UV Resistant**: Materials tested for long-term sun exposure\n\n**Operating Conditions:**\n• **Temperature Range**: -30°C to +50°C (-22°F to 122°F)\n• **Humidity**: Up to 95% relative humidity\n• **Altitude**: Up to 2000m above sea level\n• **Vibration**: Resistant to mechanical stress\n\n**Construction:**\n• **Housing**: High-grade polycarbonate with UV stabilizers\n• **Seals**: Premium rubber gaskets for long-term weatherproofing\n• **Connectors**: Marine-grade electrical connections\n• **Mounting**: Corrosion-resistant stainless steel hardware\n\n**Extreme Weather Performance:**\n• Tested in salt spray environments\n• Freeze-thaw cycle certified\n• High wind resistance\n• Lightning protection integrated\n\n**Installation Tips:**\n• Mount with slight downward angle for water drainage\n• Ensure proper cable entry sealing\n• Regular inspection of seals recommended\n\nYour Astreea charger is built to withstand the elements for years of reliable service!';
    }
    
    if (lowerMessage.includes('firmware') || lowerMessage.includes('update') || lowerMessage.includes('software')) {
      return 'Astreea Firmware & Software Updates:\n\n**Automatic Updates:**\n• **Over-the-Air (OTA)**: Updates delivered automatically via WiFi\n• **Scheduled Updates**: Install during low-usage periods\n• **Rollback Protection**: Automatic recovery if update fails\n• **Version Control**: Track firmware versions through mobile app\n\n**Update Features:**\n• **Security Patches**: Regular security enhancements\n• **New Features**: Additional functionality and improvements\n• **Bug Fixes**: Performance and reliability improvements\n• **Protocol Updates**: Support for new charging standards\n\n**Update Process:**\n1. **Notification**: App alerts when update is available\n2. **Download**: Firmware downloaded in background\n3. **Installation**: Quick installation during idle time\n4. **Verification**: System self-test after update\n5. **Confirmation**: Success notification to user\n\n**Manual Control:**\n• **Defer Updates**: Postpone updates if needed\n• **Force Update**: Manually trigger update check\n• **Update History**: View all previous updates\n• **Beta Program**: Early access to new features (optional)\n\n**Current Version**: Check your charger\'s firmware version in the mobile app settings.\n\nNeed help with a firmware update issue?';
    }
    
    if (lowerMessage.includes('connector') || lowerMessage.includes('cable') || lowerMessage.includes('type 2') || lowerMessage.includes('plug')) {
      return 'Astreea Charging Connectors & Cables:\n\n**Connector Types:**\n• **Type 2 (Mennekes)**: Standard European AC connector\n• **Universal Compatibility**: Works with all Type 2 vehicles\n• **Locking Mechanism**: Secure connection during charging\n• **Weather Sealed**: IP54 rating when connected\n\n**Cable Specifications:**\n• **Length**: 5 meters standard (custom lengths available)\n• **Conductor**: High-grade copper for minimal power loss\n• **Insulation**: TPU jacket for flexibility and durability\n• **Temperature Rating**: -40°C to +90°C\n• **Bend Radius**: Optimized for easy handling\n\n**Safety Features:**\n• **Proximity Detection**: Automatic power adjustment\n• **Temperature Monitoring**: Prevents overheating\n• **Insulation Monitoring**: Continuous safety checks\n• **Emergency Release**: Manual unlock mechanism\n\n**Maintenance:**\n• **Regular Inspection**: Check for wear and damage\n• **Cleaning**: Keep connector contacts clean\n• **Storage**: Proper cable management when not in use\n• **Replacement**: Available through Astreea service network\n\n**Compatibility:**\n• Tesla (with adapter)\n• BMW, Mercedes, Audi, VW Group\n• Nissan, Hyundai, Kia\n• All European EV models\n\nAny specific questions about connector compatibility with your vehicle?';
    }
    
    if (lowerMessage.includes('slow') || lowerMessage.includes('charging slowly')) {
      return 'Slow charging can be caused by several factors:\n\n• **Temperature**: High ambient temperature (>45°C) triggers thermal throttling\n• **Power sharing**: Multiple Astreea chargers sharing available power through load balancing\n• **Battery state**: Batteries charge slower when nearly full (80%+)\n• **Grid limitations**: Local power grid constraints or voltage fluctuations\n• **Vehicle limitations**: Some vehicles limit charging speed based on battery temperature or age\n• **Connector issues**: Poor connection or worn contacts\n\n**Astreea-Specific Checks:**\n• Verify load balancing settings in mobile app\n• Check if other chargers in your network are active\n• Review power allocation settings\n• Ensure firmware is up to date\n\nI\'ve analyzed your current session data and noticed your temperature is at 42°C, which is within normal range. Would you like me to run a diagnostic check or review your Astreea charger settings?';
    }
    
    if (lowerMessage.includes('optim') || lowerMessage.includes('efficiency')) {
      return 'Here are AI-driven optimization recommendations for your Astreea charger:\n\n**Charging Schedule Optimization:**\n• **Best efficiency**: 10 PM - 6 AM when grid load is lower\n• **Cost savings**: Use Astreea app\'s time-of-use scheduling\n• **Load balancing**: Stagger charging times if you have multiple chargers\n\n**Astreea Smart Features:**\n• **Dynamic Load Management**: Automatically optimizes power distribution\n• **Energy Cost Tracking**: Monitor and reduce charging costs\n• **Predictive Charging**: AI learns your patterns for optimal scheduling\n• **Grid Integration**: Responds to grid signals for maximum efficiency\n\n**Performance Tips:**\n• **Target charge level**: Stop at 80% for daily use to maximize battery longevity\n• **Temperature management**: Ensure good ventilation around charger\n• **Regular maintenance**: Keep connector contacts clean\n• **Firmware updates**: Always use latest Astreea firmware\n\nYour recent efficiency has been 97.2% - that\'s exceptional for an Astreea charger! The smart algorithms are working perfectly.';
    }
    
    if (lowerMessage.includes('maintenance') || lowerMessage.includes('service')) {
      return 'Astreea Predictive Maintenance System:\n\n**AI-Powered Diagnostics:**\n• **Continuous Monitoring**: 24/7 health assessment\n• **Predictive Alerts**: Issues detected before they cause problems\n• **Performance Trending**: Track degradation over time\n• **Automatic Reporting**: Maintenance needs sent to your phone\n\n**Upcoming Maintenance (AI Recommended):**\n• **Connector Inspection**: Check for wear and clean contacts\n• **Firmware Update**: Latest Astreea software available\n• **Calibration Check**: Power sensor accuracy verification\n• **Weather Seal Inspection**: Ensure IP65 rating maintained\n\n**Current Astreea Health Status:**\n• **Connector Wear**: Minimal (within normal parameters)\n• **Internal Components**: All systems nominal\n• **Software Version**: Up to date (v2.1.4)\n• **Performance**: 98.5% of baseline efficiency\n• **Safety Systems**: All tests passed\n\n**Astreea Service Network:**\n• **Authorized Technicians**: Certified service providers\n• **Genuine Parts**: OEM replacement components\n• **Warranty Coverage**: 3-year comprehensive warranty\n• **Remote Support**: Diagnostics through mobile app\n\nWould you like me to schedule a maintenance reminder or connect you with an Astreea service technician?';
    }
    
    if (lowerMessage.includes('status') || lowerMessage.includes('light') || lowerMessage.includes('amber') || lowerMessage.includes('warning')) {
      return 'Astreea Status Light Indicators:\n\n**LED Status Meanings:**\n🟢 **Green (Solid)**: Ready to charge, all systems optimal\n🟢 **Green (Blinking)**: Charging in progress, normal operation\n🟡 **Amber (Solid)**: Waiting for vehicle connection\n🟡 **Amber (Blinking)**: Minor issue detected, monitoring in progress\n🔴 **Red (Solid)**: Fault condition, charging stopped\n🔴 **Red (Blinking)**: Emergency stop activated\n🔵 **Blue (Pulsing)**: Connecting to WiFi network\n🔵 **Blue (Solid)**: Network connected, system initializing\n⚪ **White (Blinking)**: Firmware update in progress\n\n**Mobile App Integration:**\n• **Real-time Status**: Detailed status in Astreea app\n• **Push Notifications**: Instant alerts for status changes\n• **Historical Log**: Track all status events\n• **Remote Diagnostics**: Detailed fault information\n\n**Current Status**: Your Astreea charger is showing amber due to slightly elevated operating temperature (42°C). This is a precautionary measure and charging continues normally. The system will return to green when temperature drops below 40°C.\n\n**Troubleshooting**: Check the Astreea mobile app for detailed diagnostic information and recommended actions.';
    }
    
    if (lowerMessage.includes('error') || lowerMessage.includes('problem') || lowerMessage.includes('issue')) {
      return 'Astreea Troubleshooting Assistant:\n\n**Current System Status** ✅\n• **No critical errors detected**\n• **All safety systems operational**\n• **Network connectivity stable**\n• **Firmware version current**\n\n**Recent Astreea Notifications:**\n• Temperature alert (auto-resolved)\n• Minor voltage fluctuation (auto-corrected)\n• Load balancing adjustment (normal)\n• Connectivity test passed\n\n**Common Astreea Solutions:**\n1. **Power Cycle**: Disconnect power for 30 seconds, reconnect\n2. **App Reset**: Force close and restart Astreea mobile app\n3. **WiFi Check**: Verify network connection in app settings\n4. **Connector Clean**: Ensure Type 2 connector is clean and dry\n5. **RFID Reset**: Re-tap RFID card or use app to start charging\n\n**Advanced Diagnostics:**\n• **Remote Diagnostics**: Available through Astreea cloud\n• **Error Codes**: Detailed fault information in mobile app\n• **Service Request**: Direct connection to Astreea support team\n• **Warranty Check**: Verify coverage for any hardware issues\n\n**Astreea Support:**\n• **Email**: support@astreea.com\n• **Phone**: Available during business hours\n• **Live Chat**: Through mobile app\n\nCan you describe the specific problem you\'re experiencing? I can provide targeted Astreea troubleshooting steps.';
    }
    
    return 'Welcome to Astreea AI Support! I\'m your intelligent assistant with comprehensive knowledge of Astreea chargers and access to your real-time charger data.\n\n**I can help you with:**\n• **Product Information**: Specifications, models, and features\n• **Installation Support**: Setup guidance and requirements\n• **Troubleshooting**: Diagnose and resolve charging issues\n• **Performance Optimization**: Maximize efficiency and reduce costs\n• **Maintenance**: Predictive maintenance and service scheduling\n• **Mobile App**: Features and functionality guidance\n• **Technical Support**: Status indicators, error codes, and diagnostics\n• **Load Balancing**: Multi-charger installations and power management\n• **Warranty & Service**: Coverage details and support options\n\n**Smart Features:**\n• Real-time diagnostics and monitoring\n• Predictive maintenance alerts\n• Usage optimization recommendations\n• Integration with Astreea cloud services\n\nWhat would you like to know about your Astreea charger? You can ask me anything or use the quick action buttons below for common topics.';
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