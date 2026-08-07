# National Disaster Response and Rescue System (NDRRS)

> **"Saving Lives Through Real-Time Disaster Intelligence and Emergency Response."**

NDRRS is an advanced web-based emergency response platform designed for real-time disaster management, live citizen location tracking, and rescue task force synchronization across India.

## 🚀 Live Demo
- **Citizen Portal**: [https://ndrrs-platform.vercel.app/](https://ndrrs-platform.vercel.app/)
- **Admin Command Portal**: [https://ndrrs-platform.vercel.app/?portal=admin](https://ndrrs-platform.vercel.app/?portal=admin)

## 💡 Solution Architecture & Description
**Problem:** During large-scale natural disasters (floods, cyclones), centralized communication networks get congested, and rescue operations are severely delayed due to a lack of precise, real-time victim geolocation. 

**Solution Methodology:** The NDRRS platform captures high-precision SOS telemetry (GPS coordinates, battery levels, and network status) from citizen smartphones and transmits them directly to an Admin Command Center map. To ensure maximum reliability under heavy load, we bypassed traditional HTTP REST APIs and databases, opting instead for a decentralized MQTT Publish/Subscribe architecture over Secure WebSockets.

## ✨ Key Innovations & Features
- **Targeted Acoustic Beacon:** Admins can remotely trigger an HTML5 Web Audio siren on a specific victim's smartphone, helping physical NDRF rescue teams locate victims in the dark or under debris.
- **Ultra-Low Latency MQTT Sync:** Achieves <50ms data sync between citizens and the admin portal using IoT-grade MQTT brokers.
- **GIS Map & Zoom Earth Radar:** Custom Leaflet.js mapping with animated "breathing" markers and a Picture-in-Picture live weather radar overlay.
- **0-Second Instant SOS**: One-tap emergency rescue dispatch with zero modals or delay.
- **AI Rescue Priority Queue**: Ranks live victims based on flood depth, age, vulnerabilities, and phone battery level.

## 🛠️ Primary Tech Stack
- **Frontend Framework**: React.js (Vite)
- **Real-Time Data**: MQTT over WebSockets
- **GIS Mapping**: Leaflet.js
- **Audio Generation**: Web Audio API
- **Design System**: CSS Glassmorphism & Lucide Icons
- **Deployment**: Vercel Global Edge Network
