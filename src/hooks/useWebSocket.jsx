"use client";

import { useState, useEffect, useCallback, useRef } from "react";

export function useWebSocket(url) {
  const [lastMessage, setLastMessage] = useState(null);
  const [readyState, setReadyState] = useState(WebSocket.CONNECTING);
  const socketRef = useRef(null);

  useEffect(() => {
    // Only connect WebSocket in the browser environment
    if (typeof window === "undefined") return;

    const socket = new WebSocket(url);
    socketRef.current = socket;

    socket.onopen = () => {
      setReadyState(WebSocket.OPEN);
    };

    socket.onmessage = (event) => {
      setLastMessage(event);
    };

    socket.onclose = () => {
      setReadyState(WebSocket.CLOSED);
    };

    // Clean up on component unmount
    return () => {
      socket.close();
    };
  }, [url]);

  // Send message function
  const sendMessage = useCallback((data) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(
        typeof data === "string" ? data : JSON.stringify(data)
      );
      return true;
    }
    return false;
  }, []);

  return {
    lastMessage,
    readyState,
    sendMessage,
  };
}
