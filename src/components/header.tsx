"use client";
import { useState } from "react";
import { useChat } from "@/app/context/ChatContext";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Header = () => {
  const [showClearDialog, setShowClearDialog] = useState(false);
  const { clearChat, messages } = useChat();

  return (
    <header className="bg-slate-950 text-white p-6 shadow-lg w-full h-20">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-xl font-bold">🤖</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">AI Chatbot</h1>
            <p className="text-violet-100 text-sm">Powered by Google Gemini</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <AlertDialog open={showClearDialog} onOpenChange={setShowClearDialog}>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                disabled={messages.length === 0}
                className="text-violet-100 text-xs cursor-pointer hover:bg-transparent hover:text-violet-100 dark:hover:bg-transparent sm:text-sm"
              >
                <Trash2 className="w-4 h-4 mr-0.5 sm:mr-2" />
                Clear Chat
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-inherit border-gray-800">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-white font-semibold">
                  Clear Chat History
                </AlertDialogTitle>
                <AlertDialogDescription className="text-white font-medium">
                  Are you sure you want to clear all chat messages? This action
                  cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="cursor-pointer">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={clearChat}
                  className="bg-[#128C7E] cursor-pointer hover:bg-[#128C7E]"
                >
                  Clear Chat
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <div className="hidden md:flex items-center space-x-2 text-sm text-violet-100">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Online</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
