import { NextRequest, NextResponse } from "next/server";

export interface Message {
  id: string;
  isUser: boolean;
  content: string;
  timestamp?: number;
}

export async function POST(req: NextRequest) {
  try {
    const { conversations = [] } = await req.json();

    const contents = conversations.map((msg: Message) => ({
      role: msg.isUser ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GOOGLE_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Gemini API Error:", errorData);
      throw new Error("Failed to generate content");
    }

    const data = await response.json();
    const reply = data?.candidates[0]?.content?.parts[0]?.text || "No response";

    return NextResponse.json({ reply }, { status: 200 });
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: "Failed to generate content" },
      { status: 500 }
    );
  }
}
