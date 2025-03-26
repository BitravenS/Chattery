"use client";

import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import BorderWrapper from "@/components/border";

export default function Login() {
  const { user, login, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && !loading) {
      router.push("/chat");
    }
  }, [user, loading, router]);

  return (
    <BorderWrapper>
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Login to Chatster
        </h1>
        <button
          onClick={() => login("google")}
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded flex items-center justify-center gap-2"
        >
          {loading ? "Loading..." : "Continue with Google"}
        </button>
      </div>
    </BorderWrapper>
  );
}
