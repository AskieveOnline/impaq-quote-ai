
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Impaq Pvt Ltd
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Professional Web Development & Digital Solutions
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-gray-900 mb-2">Website Development</h3>
              <p className="text-gray-600 text-sm">Custom websites and web applications</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-gray-900 mb-2">Mobile Apps</h3>
              <p className="text-gray-600 text-sm">iOS and Android applications</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-gray-900 mb-2">E-commerce</h3>
              <p className="text-gray-600 text-sm">Online stores and payment solutions</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-gray-900 mb-2">UI/UX Design</h3>
              <p className="text-gray-600 text-sm">Modern design and user experience</p>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-gray-600 mb-6">
              Our AI assistant is ready to help you with pricing information and answer 
              your questions about our web development services.
            </p>
            <div className="flex justify-center">
              <Link to="/chat">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Chat with AI Assistant
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
