"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
export default function Callback() {
  const router = useRouter();
  const { refreshUser } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        await refreshUser();
        router.push("/chat");
      } catch (error) {
        console.error("Authentication error:", error);
        router.push("/login");
      }
    };

    handleCallback();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <div className="text-center">
        <h1 className="text-xl mb-4">Processing your login...</h1>
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
      </div>
    </div>
  );
}
