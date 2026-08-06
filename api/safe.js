import incidentsHandler from './incidents.js';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const safeData = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    safeData.level = 'green';
    safeData.status = 'SAFE';
    req.body = safeData;
  }
  return incidentsHandler(req, res);
}
