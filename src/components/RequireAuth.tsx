"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useUserStore from "@/store/useUserStore";

export default function RequireAuth() {
  const userId = useUserStore((s) => s.userId);
  const router = useRouter();

  useEffect(() => {
    if (!userId) {
      router.replace("/login");
    }
  }, [userId, router]);

  return null;
}

