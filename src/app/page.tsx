import ChatWindow from "@/components/chat-window";
import Header from "@/components/header";

export default function Home() {
  return (
    <>
      <Header />
      <div className="mx-auto w-full max-w-7xl">
        <ChatWindow />
      </div>
    </>
  );
}
