import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatMessage } from '@/components/ChatMessage';
import { ServiceQuickButtons } from '@/components/ServiceQuickButtons';
import { ChatbotAI } from '@/services/ChatbotAI';
import { Send, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const ChatbotPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Initialize with welcome message
  useEffect(() => {
    const welcomeMessage: Message = {
      id: '1',
      text: 'Hello! Welcome to Impaq Pvt Ltd. I\'m here to help you with pricing information and answer questions about our web development services. How can I assist you today?',
      isBot: true,
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const addMessage = (text: string, isBot: boolean) => {
    const message: Message = {
      id: Date.now().toString(),
      text,
      isBot,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, message]);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage.trim();
    addMessage(userMessage, false);
    setInputMessage('');
    setIsTyping(true);

    try {
      const response = await ChatbotAI.generateResponse(userMessage);
      
      setTimeout(() => {
        addMessage(response.message, true);
        setIsTyping(false);
      }, response.delay);
      
    } catch (error) {
      setTimeout(() => {
        addMessage('I apologize, but I\'m having trouble processing your request right now. Please try again or contact us directly at info@impaq.com', true);
        setIsTyping(false);
      }, 1000);
    }
  };

  const handleServiceClick = async (service: string) => {
    addMessage(`I'd like a quote for ${service}`, false);
    setIsTyping(true);
    
    const response = ChatbotAI.getServiceQuote(service);
    setTimeout(() => {
      addMessage(response.message, true);
      setIsTyping(false);
    }, response.delay);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Impaq AI Assistant</h1>
              <p className="text-sm text-gray-600">Web Development Pricing & Support</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">Impaq Pvt Ltd</p>
            <p className="text-xs text-gray-500">Professional Web Development</p>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
        {/* Messages Area */}
        <ScrollArea className="flex-1 p-6" ref={scrollAreaRef}>
          {messages.length === 1 && (
            <div className="mb-8">
              <ServiceQuickButtons onServiceClick={handleServiceClick} />
            </div>
          )}
          
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message.text}
              isBot={message.isBot}
              timestamp={message.timestamp}
            />
          ))}
          
          {isTyping && (
            <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
              <span>Impaq Assistant is typing...</span>
            </div>
          )}
        </ScrollArea>
        
        {/* Input Area */}
        <div className="border-t bg-white p-6">
          <div className="flex gap-4 max-w-3xl mx-auto">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about our services, request a quote, or get pricing information..."
              className="flex-1 h-12"
              disabled={isTyping}
            />
            <Button 
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="bg-blue-600 hover:bg-blue-700 h-12 px-6"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-3 text-center max-w-3xl mx-auto">
            Powered by Impaq AI • We provide quotes and consultation, not complete code solutions
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;