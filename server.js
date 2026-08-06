import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// In-memory store for 100% real mobile phone citizen incidents
let realIncidents = [];

// Get all real incidents
app.get('/api/incidents', (req, res) => {
  res.json({ incidents: realIncidents });
});

// POST SOS from Mobile Phone or Laptop
app.post('/api/sos', (req, res) => {
  const sosData = req.body;
  if (!sosData.id) {
    sosData.id = `VIC-${Math.floor(1000 + Math.random() * 9000)}`;
  }
  sosData.level = 'red';
  sosData.status = 'CRITICAL';
  sosData.timestamp = new Date().toISOString();

  // Deduplicate or insert
  const existingIdx = realIncidents.findIndex(i => i.id === sosData.id || i.phone === sosData.phone);
  if (existingIdx >= 0) {
    realIncidents[existingIdx] = sosData;
  } else {
    realIncidents.unshift(sosData);
  }

  console.log(`[NDRRS REAL SOS RECEIVED] ${sosData.name} (${sosData.phone}) - Lat: ${sosData.lat}, Lng: ${sosData.lng}`);
  res.json({ success: true, incident: sosData });
});

// POST Safe Status from Mobile Phone
app.post('/api/safe', (req, res) => {
  const safeData = req.body;
  const existingIdx = realIncidents.findIndex(i => i.id === safeData.id || i.phone === safeData.phone);
  if (existingIdx >= 0) {
    realIncidents[existingIdx].status = 'SAFE';
    realIncidents[existingIdx].level = 'green';
  } else {
    realIncidents.unshift({
      ...safeData,
      level: 'green',
      status: 'SAFE',
      timestamp: new Date().toISOString()
    });
  }
  res.json({ success: true });
});

// Clear Incidents
app.delete('/api/incidents', (req, res) => {
  realIncidents = [];
  res.json({ success: true });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`=======================================================`);
  console.log(`  NDRRS Multi-Device Sync Server running on port ${PORT}`);
  console.log(`=======================================================`);
});
