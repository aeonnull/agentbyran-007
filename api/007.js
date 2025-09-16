import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message } = req.body;

    const response = await anthropic.messages.create({
      model: "claude-3-sonnet-20240229",
      max_tokens: 1000,
      messages: [{ role: "user", content: message }],
    });

    return res.status(200).json({
      reply: response.content[0].text,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      reply: null,
      success: false,
      error: error.message,
    });
  }
}
