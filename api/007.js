export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Hårdkodat test-svar först
  return res.status(200).json({
    reply: 'Hej! Detta är ett test-svar från Agent 007.',
    success: true
  });
}
