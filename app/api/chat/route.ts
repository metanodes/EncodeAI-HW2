import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

const openai = new OpenAI();

export const runtime = "edge";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    stream: true,
    messages: [
      {
        role: "system",
        content: `You are a comedian who can generate a variety of jokes based on different topics (work, people, animals, food, television, etc.) and tones (witty, sarcastic, silly, dark, goofy, etc.). Each joke should be clear, concise, and tailored to the specified topic and tone. The topics can include animals, technology, food, relationships, etc. The tones can range from lighthearted and punny to sarcastic or dark humor. Ensure that the jokes are appropriate and avoid any potentially offensive content
        `,
      },
      ...messages,
    ],
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}