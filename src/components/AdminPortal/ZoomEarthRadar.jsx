import React, { useState } from 'react';
import { Globe, Radio, ExternalLink, Maximize2, RefreshCw } from 'lucide-react';

export const ZoomEarthRadar = () => {
  const [currentZoomUrl, setCurrentZoomUrl] = useState("https://zoom.earth/places/india/hyderabad/#map=radar");
  const [selectedPreset, setSelectedPreset] = useState("hyd");

  const presets = [
    { id: "hyd", name: "🌧️ Hyderabad Live Rain Radar", url: "https://zoom.earth/places/india/hyderabad/#map=radar" },
    { id: "india-radar", name: "📡 India Live Precipitation Radar", url: "https://zoom.earth/maps/radar/#view=20.6,78.9,5z" },
    { id: "wind", name: "🌪️ Cyclone & Wind Speed Vectors", url: "https://zoom.earth/maps/wind-speed/#view=19.5,83.2,5z" },
    { id: "satellite", name: "🛰️ India Satellite HD View", url: "https://zoom.earth/maps/satellite/#view=20.6,78.9,5z" }
  ];

  const handleSelectPreset = (preset) => {
    setSelectedPreset(preset.id);
    setCurrentZoomUrl(preset.url);
  };

  return (
    <div className="glass-panel" style={{ borderRadius: '16px', overflow: 'hidden', padding: '1.25rem' }}>
      
      {/* Header Controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ padding: '0.5rem', background: 'rgba(56, 189, 248, 0.2)', borderRadius: '8px' }}>
            <Globe size={24} color="#38bdf8" />
          </div>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>ZOOM EARTH LIVE RADAR & WEATHER PREDICTION</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Real-time satellite imagery, Doppler precipitation radar, and storm tracking powered by Zoom Earth.
            </p>
          </div>
        </div>

        <a
          href={currentZoomUrl}
          target="_blank"
          rel="noreferrer"
          className="btn btn-primary"
          style={{ fontSize: '0.85rem' }}
        >
          <ExternalLink size={16} /> Open Fullscreen Zoom Earth
        </a>
      </div>

      {/* Preset Selector Buttons */}
      <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
        {presets.map(p => (
          <button
            key={p.id}
            onClick={() => handleSelectPreset(p)}
            className="btn"
            style={{
              background: selectedPreset === p.id ? 'linear-gradient(135deg, #0284c7, #0369a1)' : 'rgba(255,255,255,0.06)',
              color: selectedPreset === p.id ? '#fff' : 'var(--text-secondary)',
              fontSize: '0.82rem',
              whiteSpace: 'nowrap'
            }}
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* Embedded Responsive Zoom Earth Viewport */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '650px',
        borderRadius: '12px',
        overflow: 'hidden',
        border: '1px solid var(--bg-card-border)',
        boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
        background: '#0b0f19'
      }}>
        <iframe
          src={currentZoomUrl}
          title="Zoom Earth Live Radar Weather Map"
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            borderRadius: '12px'
          }}
          allow="geolocation"
        />
      </div>
    </div>
  );
};
