const Header = () => {
  return (
    <header className="bg-slate-950 text-white p-6 shadow-lg w-full h-20">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-xl font-bold">🤖</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">AI Chatbot</h1>
            <p className="text-violet-100 text-sm">Powered by Google Gemini</p>
          </div>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm text-violet-100">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Online</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
