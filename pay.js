export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' });

  const { gamertag, amountSats } = req.body;

  try {
    const response = await fetch('https://api.zebedee.io/v0/pay-gamertag', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': process.env.ZBD_API_KEY
      },
      body: JSON.stringify({
        gamertag: gamertag,
        amount: (amountSats * 1000).toString(),
        description: 'Mining Payout from Crazy Digger'
      })
    });

    const result = await response.json();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}