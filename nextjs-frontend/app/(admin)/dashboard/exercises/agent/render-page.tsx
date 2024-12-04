"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import {
  Loader2,
  MessageSquare,
  Trash2,
  Send,
  Bot,
  User,
  RefreshCcw,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import MarkdownRenderer from "@/components/shared/md/md-custom";
import { getAnswerFromAgent } from "@/lib/actions/ai/ai.action";
import ExercisePage from "../(index)/render-page";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

// Chat Message Component
const ChatMessage = ({
  message,
  isSending,
}: {
  message: ChatMessage;
  isSending: boolean;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={`flex items-start gap-2 ${
      message.role === "user" ? "justify-end" : "justify-start"
    }`}
  >
    {message.role === "assistant" && (
      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
        <Bot className="h-4 w-4 text-primary" />
      </div>
    )}
    <div
      className={`max-w-[80%] rounded-lg p-3 
            ${
              message.role === "user" ? "bg-primary text-primary" : "bg-muted"
            }`}
    >
      <MarkdownRenderer content={message.content} />
    </div>
    {message.role === "user" && (
      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
        <User className="h-4 w-4 text-primary-foreground" />
      </div>
    )}
  </motion.div>
);

// AI Chat Component
export const AIChatSection = ({ id = "1" }: { id?: string }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    if (typeof window !== "undefined") {
      const savedMessages = localStorage.getItem("aiChatMessages");
      if (savedMessages) {
        try {
          const parsedMessages = JSON.parse(savedMessages);
          if (Array.isArray(parsedMessages)) {
            return parsedMessages;
          }
        } catch (e) {
          console.error("Error parsing saved messages:", e);
        }
      }
    }
    return [];
  });
  const [currentMessage, setCurrentMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && messages.length > 0) {
      localStorage.setItem("aiChatMessages", JSON.stringify(messages));
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;

    const newMessage: ChatMessage = {
      role: "user",
      content: currentMessage,
    };

    setMessages((prev) => [...prev, newMessage]);
    setCurrentMessage("");
    setIsSending(true);

    try {
      const response = await getAnswerFromAgent(id, currentMessage);
      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: response,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể nhận phản hồi từ AI",
        variant: "destructive",
      });
    }

    setIsSending(false);
  };

  const clearHistory = () => {
    setMessages([]);
    localStorage.removeItem("aiChatMessages");
    toast({
      title: "Thành công",
      description: "Đã xóa lịch sử chat",
    });
  };

  const templates = [
    "Hãy giải bài này",
    "Gợi ý cách làm",
    "Giải thích chi tiết cách làm",
  ];

  const handleTemplateClick = async (template: string) => {
    setCurrentMessage(template);

    const newMessage: ChatMessage = {
      role: "user",
      content: template,
    };

    setMessages((prev) => [...prev, newMessage]);
    setIsSending(true);

    try {
      const response = await getAnswerFromAgent(id, template);
      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: response,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể nhận phản hồi từ AI",
        variant: "destructive",
      });
    }

    setIsSending(false);
    setCurrentMessage("");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full bg-background rounded-lg border flex flex-col h-full"
    >
      <div className="p-4 border-b flex justify-between items-center">
        <Button
          onClick={() => setShowChat(!showChat)}
          variant="outline"
          className="flex-1 mr-2"
        >
          <MessageSquare className="h-4 w-4 mr-2" />
          {showChat ? "Ẩn AI Assistant" : "Hiện AI Assistant"}
        </Button>
        <Button
          onClick={clearHistory}
          variant="outline"
          size="icon"
          className="text-destructive hover:text-destructive"
        >
          <RefreshCcw className="h-4 w-4" />
        </Button>
      </div>

      <AnimatePresence>
        {showChat && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100%" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-col flex-1 min-h-0"
          >
            <ScrollArea className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <ChatMessage
                    key={index}
                    message={message}
                    isSending={isSending}
                  />
                ))}
                {isSending && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-lg p-3">
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            <div className="p-4 border-t shrink-0">
              <div className="flex gap-2 mb-3 flex-wrap">
                {templates.map((template, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => handleTemplateClick(template)}
                    disabled={isSending}
                  >
                    {template}
                  </Button>
                ))}
              </div>

              <div className="flex gap-2">
                <Textarea
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  placeholder="Hỏi AI về bài tập..."
                  className="flex-1"
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={isSending || !currentMessage.trim()}
                  className="px-4"
                >
                  {isSending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function ExerciseAgentPage({ id = "1" }: { id?: string }) {
  return (
    <div className="container mx-auto h-screen overflow-hidden">
      <div className="flex flex-col lg:flex-row gap-6 h-full">
        {/* Main Exercise List - thêm overflow-auto để có thể cuộn */}
        <div className="flex-1 overflow-auto">
          <ExercisePage />
        </div>

        {/* AI Chat Section - giữ nguyên chiều cao và position */}
        <div className="w-full lg:w-[400px] h-full">
          <AIChatSection id={id} />
        </div>
      </div>
    </div>
  );
}
