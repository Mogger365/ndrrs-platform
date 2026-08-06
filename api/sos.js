import incidentsHandler from './incidents.js';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const sosData = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    sosData.level = 'red';
    sosData.status = 'CRITICAL';
    req.body = sosData;
  }
  return incidentsHandler(req, res);
}
