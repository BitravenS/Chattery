"use client";

import { useState, useEffect, useCallback, useRef } from "react";

export function useWebSocket(url) {
  const [lastMessage, setLastMessage] = useState(null);
  const [messageHistory, setMessageHistory] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef(null);

  const reconnectAttempts = useRef(0);
  const reconnectTimer = useRef(null);
  const MAX_RECONNECT_ATTEMPTS = 5;

  const connect = useCallback(() => {
    if (socketRef.current) {
      console.log("WebSocket already connected, skipping reconnect...");
      return; // Prevent duplicate connections
    }

    const wsUrl = url.replace(/^http/, "ws");
    const socket = new WebSocket(wsUrl);
    socketRef.current = socket;

    console.log("WebSocket connection created");

    socket.onopen = () => {
      setIsConnected(true);
      reconnectAttempts.current = 0;
      console.log("WebSocket connected");
    };

    socket.onmessage = (event) => {
      console.log("onmessage triggered");
      try {
        const data = JSON.parse(event.data);
        if (Array.isArray(data)) {
          setMessageHistory(data);
        } else {
          setLastMessage(data);
        }
      } catch (err) {
        console.error("Message parse error:", err);
      }
    };

    socket.onclose = (event) => {
      setIsConnected(false);
      socketRef.current = null; // Ensure reference is cleared

      console.log(`WebSocket closed: ${event.code} (${event.reason})`);

      if (
        event.code !== 1000 &&
        reconnectAttempts.current < MAX_RECONNECT_ATTEMPTS
      ) {
        const delay = Math.min(
          5000,
          1000 * Math.pow(2, reconnectAttempts.current)
        );
        reconnectTimer.current = setTimeout(() => {
          reconnectAttempts.current += 1;
          console.log(
            `🔄 Reconnecting... (attempt ${reconnectAttempts.current})`
          );
          connect();
        }, delay);
      }
    };

    socket.onerror = (error) => {
      console.error("🚨 WebSocket error:", error);
    };
  }, [url]);

  useEffect(() => {
    if (!socketRef.current) {
      connect(); // Only connect if socketRef is not already initialized
    }

    return () => {
      if (reconnectTimer.current) {
        clearTimeout(reconnectTimer.current); // Clean up reconnect timer
      }
      if (socketRef.current) {
        console.log("🛑 Closing WebSocket on unmount...");
        socketRef.current.close(1000, "Component unmounted");
        socketRef.current = null; // Clean up WebSocket reference
      }
    };
  }, [connect]); // Only run `connect` on mount and cleanup on unmount

  const sendMessage = useCallback((message) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(message));
    }
  }, []);

  return { lastMessage, messageHistory, isConnected, sendMessage };
}
