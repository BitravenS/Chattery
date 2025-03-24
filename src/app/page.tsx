"use client";
import React from "react";
import Link from "next/link";
import {
  Heart,
  MessageCircle,
  Star,
  SkullIcon,
  ArrowRight,
  HandMetal,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-cyan-100 to-sky-100 relative overflow-hidden">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className={`absolute animate-float opacity-50 ${
            i % 2 === 0 ? "text-sky-300" : "text-cyan-300"
          }`}
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `float ${6 + i}s ease-in-out infinite`,
            animationDelay: `${i * 0.5}s`,
          }}
        >
          <Heart className="w-8 h-8" fill="currentColor" />
        </div>
      ))}

      <div className="container mx-auto px-4 py-12 relative">
        <div className="max-w-3xl mx-auto text-center">
          {/* Hero Section */}
          <div className="mb-4 animate-bounce-slow">
            <div className="inline-block bg-purple-400 rounded-full animate-bounce p-4 rotate-6 hover:rotate-12 transition-transform mb-6">
              <MessageCircle className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-7xl md:text-6xl font-bold text-violet-500 mb-4 flex items-center justify-center gap-3">
              Chattery
              <HandMetal
                className="size-12 text-violet-400 inline animate-pulse"
                fill="currentColor"
              />
            </h1>
            <p
              className="text-3xl text-purple-500 font-medium"
              style={{ fontFamily: "Handjet" }}
            >
              Make enemies & wipe smiles!
            </p>
            <p className="block text-4xl text-purple-500 font-medium my-4 animate-spin">
              🖕
            </p>
          </div>

          {/* Main Card */}
          <div
            className="bg-white/40 backdrop-blur-sm rounded-[3rem] p-8 md:p-12 shadow-xl border-2 border-white/50
                         hover:transform hover:scale-[1.02] transition-all duration-300"
          >
            <div className="flex flex-col items-center gap-8">
              <div className="text-2xl text-bold space-y-6">
                <div className="flex items-center justify-center gap-4">
                  <Star
                    className="w-8 h-8 text-yellow-400"
                    fill="currentColor"
                  />
                  <span className="text-2xl text-purple-600">Ugly UI</span>
                </div>
                <div className="flex items-center justify-center gap-4">
                  <SkullIcon className="w-8 h-8 text-purple-400" />
                  <span className="text-2xl text-purple-600">
                    Shitty Effects
                  </span>
                </div>
              </div>
              <Link href="/chat">
                <button
                  className="bg-gradient-to-r from-pink-400 to-purple-400 text-white px-10 py-5 
                               rounded-full font-bold text-3xl shadow-lg
                               hover:scale-110 hover:shadow-xl transition-all duration-300
                               flex items-center gap-3"
                >
                  Let's Fucking Go
                  <ArrowRight className="size-10" />
                </button>
              </Link>

              <div className="flex text-3xl items-center gap-8 mt-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-pink-500">🔥</div>
                  <div className="text-sky-500">Unlimited DOOM</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-pink-500">☠️</div>
                  <div className="text-sky-500">Unending Nightmares</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-pink-500">😭</div>
                  <div className="text-sky-500">Daily Agony</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
