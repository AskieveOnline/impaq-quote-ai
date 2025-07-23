
interface ChatResponse {
  message: string;
  delay: number;
}

export class ChatbotAI {
  private static responses = {
    greetings: [
      "Hello! I'm the Impaq Pvt Ltd assistant. How can I help you today?",
      "Welcome to Impaq! I'm here to help with quotes and questions about our web development services.",
      "Hi there! I'm here to assist you with information about Impaq's web development services."
    ],
    
    pricing: {
      "Website Development": "Our website development starts from $2,500 for basic sites and goes up to $15,000+ for complex web applications. The exact price depends on features, design complexity, and timeline. Would you like a detailed quote?",
      "Mobile App Development": "Mobile app development ranges from $8,000 to $50,000+ depending on platform (iOS/Android), features, and complexity. We offer both native and cross-platform solutions. Shall I prepare a custom quote for you?",
      "E-commerce Solutions": "E-commerce solutions start at $5,000 for basic online stores and can go up to $25,000+ for advanced platforms with custom integrations. Price includes payment gateway setup and inventory management. Need a detailed estimate?",
      "UI/UX Design": "UI/UX design services range from $1,500 to $8,000 depending on project scope, number of screens, and research requirements. We create modern, user-friendly designs that convert. Want a quote for your project?"
    },
    
    codeRequest: [
      "I appreciate your interest! However, Impaq doesn't provide full source code. We focus on delivering complete, professional solutions with ongoing support. Would you like to discuss your project requirements for a custom quote?",
      "We don't share our source code, but we'd be happy to build exactly what you need! Our team delivers fully functional, tested solutions. Let's discuss your project - what are you looking to build?",
      "Rather than providing code, we deliver complete, working solutions tailored to your needs. This ensures quality, security, and ongoing support. What kind of project are you planning?"
    ],
    
    general: [
      "Impaq Pvt Ltd specializes in web development, mobile apps, and digital solutions. We've been helping businesses grow online since our founding. What specific service interests you?",
      "We're a full-service web development company offering custom solutions, not templates. Our team focuses on quality, performance, and user experience. How can we help your business?",
      "At Impaq, we believe in building lasting partnerships with our clients. We provide ongoing support and maintenance for all our projects. What would you like to know about our services?"
    ]
  };

  static async generateResponse(userMessage: string): Promise<ChatResponse> {
    const message = userMessage.toLowerCase();
    
    // Simulate AI thinking time
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Check for greetings
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return {
        message: this.getRandomResponse(this.responses.greetings),
        delay: 1000
      };
    }
    
    // Check for code requests
    if (message.includes('code') || message.includes('source') || message.includes('github') || 
        message.includes('repository') || message.includes('download')) {
      return {
        message: this.getRandomResponse(this.responses.codeRequest),
        delay: 1200
      };
    }
    
    // Check for pricing inquiries
    if (message.includes('price') || message.includes('cost') || message.includes('quote') || 
        message.includes('pricing') || message.includes('estimate')) {
      
      // Check for specific services
      for (const [service, response] of Object.entries(this.responses.pricing)) {
        if (message.includes(service.toLowerCase())) {
          return { message: response, delay: 1500 };
        }
      }
      
      return {
        message: "I'd be happy to provide pricing information! Our services include website development, mobile apps, e-commerce solutions, and UI/UX design. Which service are you interested in pricing for?",
        delay: 1200
      };
    }
    
    // Check for contact information
    if (message.includes('contact') || message.includes('phone') || message.includes('email')) {
      return {
        message: "You can reach Impaq Pvt Ltd at info@impaq.com or through our website contact form. We typically respond within 24 hours. Would you like me to help you with a quote or service information right now?",
        delay: 1000
      };
    }
    
    // Check for portfolio/work examples
    if (message.includes('portfolio') || message.includes('work') || message.includes('examples') || 
        message.includes('projects')) {
      return {
        message: "We've worked with clients across various industries including healthcare, finance, retail, and technology. While I can't share specific client details, I can tell you about our capabilities and get you a quote for your project. What type of solution are you looking for?",
        delay: 1300
      };
    }
    
    // Default response
    return {
      message: this.getRandomResponse(this.responses.general),
      delay: 1000
    };
  }
  
  private static getRandomResponse(responses: string[]): string {
    return responses[Math.floor(Math.random() * responses.length)];
  }
  
  static getServiceQuote(service: string): ChatResponse {
    const response = this.responses.pricing[service as keyof typeof this.responses.pricing];
    return {
      message: response || "I'd be happy to provide a quote for that service. Could you tell me more about your specific requirements?",
      delay: 1200
    };
  }
}
