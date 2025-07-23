
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, User } from "lucide-react";

interface ChatMessageProps {
  message: string;
  isBot: boolean;
  timestamp: Date;
}

export const ChatMessage = ({ message, isBot, timestamp }: ChatMessageProps) => {
  return (
    <div className={cn("flex gap-3 mb-4", isBot ? "justify-start" : "justify-end")}>
      {isBot && (
        <Avatar className="w-8 h-8 bg-blue-600">
          <AvatarFallback className="text-white">
            <Bot size={16} />
          </AvatarFallback>
        </Avatar>
      )}
      <div className={cn("max-w-[80%] rounded-lg p-3", 
        isBot 
          ? "bg-gray-100 text-gray-800 rounded-tl-none" 
          : "bg-blue-600 text-white rounded-tr-none"
      )}>
        <p className="text-sm leading-relaxed">{message}</p>
        <p className="text-xs opacity-70 mt-1">
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
      {!isBot && (
        <Avatar className="w-8 h-8 bg-gray-600">
          <AvatarFallback className="text-white">
            <User size={16} />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};
