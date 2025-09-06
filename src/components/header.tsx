"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download, Trash2, MoreVertical } from "lucide-react";

const Header = () => {
  const handleExportChart = () => {
    console.log("Exporting chart...");
  };

  const handleClearChat = () => {
    console.log("Clearing chat...");
  };

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

        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleExportChart}
              className="text-white cursor-pointer"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Chart
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearChat}
              className="text-white cursor-pointer"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear Chat
            </Button>
          </div>

          <div className="hidden md:flex items-center space-x-2 text-sm text-violet-100">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Online</span>
          </div>

          <div className="sm:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-transparent"
                >
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 sm:hidden">
                <DropdownMenuItem onClick={handleExportChart}>
                  <Download className="w-4 h-4 mr-2" />
                  Export Chart
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleClearChat}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear Chat
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
