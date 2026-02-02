"use client";

import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useEffect, useRef } from "react";
import useChat from "@/modules/chat/hooks/useChat";
import { Input } from "@/components/ui/input";
import ReactMarkdown from "react-markdown";
import RequireAuth from "@/components/RequireAuth";

export default function ChatPage() {
  const { prompt, setPrompt, response, loading, error, generatePrompt } =
    useChat();

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [response, loading]);

  return (
    <>
      <RequireAuth />
      <section className="h-screen w-full bg-background text-foreground flex flex-col items-center justify-between px-4 py-6">
        {/* Header */}
        <div className="w-full max-w-3xl">
        <h1 className="text-3xl font-bold mb-6 text-center">
          🧠 AI Prompt Assistant
        </h1>
      </div>

      {/* Chat Area */}
      <div className="flex-1 w-full max-w-3xl overflow-y-auto px-2 pb-28">
        {response && (
          <div className="bg-muted rounded-lg p-4 mb-4 shadow-sm">
            <h2 className="text-sm font-semibold text-muted-foreground mb-2">
              AI Response
            </h2>
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <ReactMarkdown>{response}</ReactMarkdown>
            </div>
          </div>
        )}

        {error && (
          <div className="text-sm text-red-600 bg-red-100 border border-red-200 p-4 rounded-md">
            ❌ {error}
          </div>
        )}

        {loading && (
          <div className="bg-yellow-50 text-yellow-800 text-sm p-4 rounded-md shadow-sm mb-4 animate-pulse">
            ⏳ Thinking...
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input Bar */}
      <div className="fixed bottom-0 w-full bg-background border-t px-4 py-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!loading && prompt.trim()) generatePrompt();
          }}
          className="max-w-3xl mx-auto flex items-center gap-3"
        >
          <Input
            type="text"
            id="prompt"
            name="prompt"
            placeholder="Type your prompt..."
            className="flex-1"
            onChange={(e) => setPrompt(e.target.value)}
            value={prompt}
            disabled={loading}
          />
          <Button
            type="submit"
            disabled={loading || !prompt.trim()}
            className="flex items-center gap-1"
          >
            <Send className="w-4 h-4" />
            Ask
          </Button>
        </form>
      </div>
      </section>
    </>
  );
}
