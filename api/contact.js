export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const { email, subject, message } = req.body;

  if (!email || !subject || !message) {
    return res.status(400).json({ success: false, message: 'Missing fields' });
  }

  // ===== Replace this with your Discord webhook URL =====
  const WEBHOOK_URL = 'https://ptb.discord.com/api/webhooks/1405918470788616192/X2FnxK-CUEOsvJ_LzIt5E5Mg2mel24fVkBb6PwYhViX_zhLfN4NBMliDHd94coyYoX4p';

  try {
    const discordRes = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: `**New Contact Form Submission**
**Email:** \`${email}\`
**Subject:** \`[SUPPORT] - ${subject}\`
**Message:** \`\`\`
${message}
\`\`\``
      })
    });

    if (!discordRes.ok) throw new Error(`Discord webhook failed: ${discordRes.statusText}`);

    return res.status(200).json({ success: true });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server Error' });
  }
}
