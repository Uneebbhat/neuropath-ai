import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCompletion } from "@ai-sdk/react";
import useChat from "../hooks/useChat";
// import useChat from "../hooks/useChat";
// Message type definition
type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

export default function ChatResponse() {
  // const { completion } = useChat();

  return <></>;
}
