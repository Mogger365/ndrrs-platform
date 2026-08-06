// Memory store for real-time incidents on Vercel Serverless Edge
let realIncidents = [];

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    return res.status(200).json({ incidents: realIncidents });
  }

  if (req.method === 'POST') {
    const sosData = req.body;
    if (!sosData.id) {
      sosData.id = `VIC-${Math.floor(1000 + Math.random() * 9000)}`;
    }
    sosData.timestamp = new Date().toISOString();

    const existingIdx = realIncidents.findIndex(i => i.id === sosData.id || i.phone === sosData.phone);
    if (existingIdx >= 0) {
      realIncidents[existingIdx] = sosData;
    } else {
      realIncidents.unshift(sosData);
    }

    return res.status(200).json({ success: true, incident: sosData });
  }

  if (req.method === 'DELETE') {
    realIncidents = [];
    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
