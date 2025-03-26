"use client";
import React, { useEffect, useState } from "react";
import BorderWrapper from "@/components/border";
import { useAuth } from "@/app/context/AuthContext";
import BG from "@/components/bg";
import Hero from "@/components/hero";
import { Send } from "lucide-react";
import ChatList from "./chat/ChatList";
import { useWebSocket } from "@/hooks/useWebSocket";
import { Filter } from "bad-words";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Home() {
  const { user, login } = useAuth();
  const [loggedin, setLoggedin] = useState(user != null);
  const [username, setUsername] = useState(user?.username || ""); // Initialize with the current username
  const [isHovered, setIsHovered] = useState(false);
  const [isHoppedIn, setIsHoppedIn] = useState(false);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [messages, setMessages] = useState<any[]>([]);

  const handleHopIn = () => {
    setIsHoppedIn(true);
  };
  const {
    lastMessage,
    messageHistory,
    sendMessage: sendWsMessage,
  } = useWebSocket(
    `ws://chattery-backend-production.up.railway.app:8080/api/chat/ws`
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  // ✅ Load initial messages from WebSocket history
  useEffect(() => {
    setMessages(messageHistory);
  }, [messageHistory]);

  // ✅ Handle new messages from WebSocket
  useEffect(() => {
    if (lastMessage) {
      setMessages((prevMessages) => [...prevMessages, lastMessage]);
    }
  }, [lastMessage]);

  // ✅ Send message via WebSocket
  const filter = new Filter();

  const handleSendMessage = async (text: string) => {
    setIsSubmitting(true);

    if (!text.trim()) return;

    try {
      text = filter.clean(text);

      sendWsMessage({ text }); // ✅ Send message as JSON
    } catch (error) {
      console.error("Error sending message through WebSocket:", error);
    } finally {
      setIsSubmitting(false);
      setMessage("");
    }
  };

  useEffect(() => {
    if (user != null) {
      setLoggedin(true);
      setUsername(user.username || "");
    } else {
      setLoggedin(false);
      setUsername("");
    }
  }, [user]);

  return (
    <BorderWrapper>
      <BG fadeOut={isHoppedIn} />
      <Hero fadeOut={isHoppedIn} />
      <>
        <div
          className={`transition-opacity duration-500 delay-300 z-1 ${
            isHoppedIn ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Make this div scrollable */}
          <div className="relative h-[75vh] flex-grow z-1 ">
            <div
              style={{
                maskImage:
                  "linear-gradient(to top, transparent, black 5%, black 95%, transparent)",
                WebkitMaskImage:
                  "linear-gradient(to top, transparent, black 5%, black 95%, transparent)",
                msOverflowStyle: "none",
                scrollbarWidth: "none",
              }}
              className="flex flex-col flex-grow h-full scrollbar-none overflow-y-auto p-4 z-1"
            >
              <ChatList messages={messages} currentUserId={user?.id} />
            </div>
          </div>
        </div>
      </>
      <div className="relative flex flex-col sm:pt-8 -mx-4 pt-14">
        <div className="flex-grow"></div>
        <div className=" relative inset-0 flex gap-4 justify-center items-end mb-4">
          {loggedin ? (
            <>
              <div
                className={`transition-all duration-500 ease-in-out ml-4 ${
                  isHoppedIn ? "w-full" : "w-26 hover:w-32"
                }`}
              >
                {isHoppedIn ? (
                  <input
                    type="text"
                    value={message}
                    onKeyDown={(e) => {
                      if (
                        e.key === "Enter" &&
                        !isSubmitting &&
                        message.trim()
                      ) {
                        handleSendMessage(message);
                      }
                    }}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Spread some love..."
                    className="text-black text-xl bg-neutral-100/80 px-4 py-2 rounded-full border-2 border-zinc-800  w-full"
                    disabled={isSubmitting}
                  />
                ) : (
                  <button
                    onClick={handleHopIn}
                    className="btn text-black text-xl px-4 py-2 rounded-full bg-white hover:bg-zinc-300 hover:text-3xl transition-all duration-500 ease-in-out"
                  >
                    Hop In!
                  </button>
                )}
              </div>
              <div
                className={`transition-all duration-500 ease-in-out mr-2 w-auto  `}
              >
                {isHoppedIn ? (
                  <button
                    onClick={() => handleSendMessage(message)}
                    disabled={isSubmitting || !message.trim()}
                    className="btn h-12 w-12 flex items-center border-zinc-800 border-2 justify-center rounded-full bg-white mr-4 hover:bg-sky-300 hover:w-18 transition-all duration-300 ease-in-out"
                  >
                    <Send className={isSubmitting ? "animate-spin" : ""} />
                  </button>
                ) : (
                  <ProfileDialog
                    username={username}
                    setUsername={setUsername}
                  />
                )}
              </div>
            </>
          ) : (
            <div className="group flex flex-col items-center">
              <button
                onClick={() => login("google")}
                className="btn flex flex-row items-center overflow-hidden text-black text-xl px-4 py-2 rounded-full bg-white hover:bg-zinc-200 hover:text-3xl"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div
                  className="whitespace-nowrap transition-all duration-300 ease-in-out"
                  style={{
                    width: isHovered ? "240px" : "50px",
                    opacity: isHovered ? 1 : 0.8,
                  }}
                >
                  {isHovered ? (
                    <div className="flex flex-row">Login With Google</div>
                  ) : (
                    <div className="flex">
                      <span>Login</span>
                      <span className="ml-4">With Google</span>
                    </div>
                  )}
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </BorderWrapper>
  );
}

function ProfileDialog({
  username,
  setUsername,
}: {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { logout } = useAuth(); // Access the logout function from the AuthContext
  const [tempUsername, setTempUsername] = useState(username); // Temporary username for editing

  const handleSaveChanges = () => {
    setUsername(tempUsername); // Update the username state
    // Optionally, send the updated username to the backend here
    console.log("Username updated to:", tempUsername);
  };

  const handleLogout = () => {
    logout(); // Call the logout function
    window.location.reload();
    console.log("User logged out");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* Replace the outer button with a div */}
        <div className="btn cursor-pointer text-white text-xl px-4 py-2 rounded-full bg-black hover:bg-zinc-800 hover:text-3xl whitespace-nowrap transition-all duration-300 ease-in-out">
          {username} Profile
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              value={tempUsername}
              onChange={(e) => setTempUsername(e.target.value)} // Update tempUsername on input change
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <div className="flex justify-between gap-5">
              <Button variant="secondary" onClick={handleLogout}>
                Log Out
              </Button>
              <Button
                type="button"
                onClick={() => {
                  handleSaveChanges();
                  document.body.click();
                }}
              >
                Save changes
              </Button>
            </div>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
