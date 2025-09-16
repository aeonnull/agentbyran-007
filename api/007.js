// api/007.js
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export default async function handler(req, res) {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "No message provided" });
    }

    const response = await anthropic.messages.create({
      model: "claude-3-sonnet-20240229",
      max_tokens: 500,
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
    });

    // Returnera hela Claude-svaret så frontend kan läsa content[0].text
    res.status(200).json(response);

  } catch (error) {
    console.error("Claude API error:", error);
    res.status(500).json({
      error: "Fel vid anrop till Claude API",
      details: error.message,
    });
  }
}
