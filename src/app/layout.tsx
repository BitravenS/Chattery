import { AuthProvider } from "@/app/context/AuthContext";

import "@/app/globals.css";

export const metadata = {
  title: "Chatster",
  description: "Real-time chat application",
};

import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <div className="min-h-screen min-w-screen flex flex-col">
            <main className="container">{children}</main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
