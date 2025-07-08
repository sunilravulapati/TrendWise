import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateArticle(topic) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: `You are a helpful assistant that writes articles.` }],
      },
    ],
  });

  const result = await chat.sendMessage(
    `Write a short, 200-word informative article on the topic: ${topic}`
  );

  const response = result.response;
  const text = await response.text();

  return text;
}