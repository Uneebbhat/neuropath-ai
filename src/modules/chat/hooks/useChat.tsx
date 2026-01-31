"use client";

import { useState } from "react";
import useUserStore from "@/store/useUserStore";

const useChat = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const userId = useUserStore((state) => state.userId);

  const generatePrompt = async () => {
    if (!prompt.trim()) return;

    if (!userId) {
      setError("User not authenticated. Please log in.");
      return;
    }

    setLoading(true);
    setError(null);
    setResponse("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, userId }),
      });

      if (!res.ok) throw new Error("Failed to generate response");

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      // Removed unused fullText variable

      while (reader) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });

        // Split SSE lines
        chunk.split("\n").forEach((line) => {
          if (line.startsWith("data:")) {
            try {
              const data = JSON.parse(
                line.replace("data: ", "").replace("data:", ""),
              );
              if (data.type === "text-delta" && data.delta) {
                setResponse((prev) => prev + data.delta); // Live update
              }
            } catch {}
          }
        });
      }
      setPrompt("");
    } catch (err: unknown) {
      console.error("Error generating prompt:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return {
    prompt,
    setPrompt,
    response,
    loading,
    error,
    generatePrompt,
  };
};

export default useChat;
