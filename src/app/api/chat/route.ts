import { NextRequest, NextResponse } from "next/server";

export interface Message {
  id: string;
  isUser: boolean;
  content: string;
  timestamp?: number;
  isError?: boolean;
}

export async function POST(req: NextRequest) {
  try {
    const { conversations = [] } = await req.json();

    const validMessages = conversations.filter(
      (msg: Message) => msg && msg.content.trim().length > 0
    );

    if (validMessages.length === 0) {
      return NextResponse.json(
        {
          error: "No valid messages provided",
        },
        { status: 400 }
      );
    }

    const contents = validMessages.map((msg: Message) => ({
      role: msg.isUser ? "user" : "model",
      parts: [{ text: msg.content.trim() }],
    }));

    const validContents = contents.filter(
      (content: { role: string; parts: { text: string }[] }) =>
        content.parts[0].text && content.parts[0].text.length > 0
    );

    if (validContents.length === 0) {
      return NextResponse.json(
        { error: "No valid content to send" },
        { status: 400 }
      );
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GOOGLE_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: validContents,
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
