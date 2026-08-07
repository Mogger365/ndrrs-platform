import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import { useEmergency } from '../../context/EmergencyContext';
import { Shield, AlertCircle, Phone, Battery, MapPin, Send, Radio, X, BellRing, Home, Users } from 'lucide-react';

// Custom Map Markers with Zone-based Breathing Light Animations
const createCustomIcon = (level, text = '') => {
  const color = level === 'red' ? '#ef4444' : level === 'orange' ? '#f97316' : '#10b981';
  const breatheClass = level === 'red' ? 'breathe-dot-red' : level === 'orange' ? 'breathe-dot-orange' : 'breathe-dot-green';

  return L.divIcon({
    className: 'custom-div-icon',
    html: `
      <div class="${breatheClass}" style="
        background-color: ${color};
        width: 32px;
        height: 32px;
        border-radius: 50%;
        border: 2px solid white;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: 900;
        font-size: 13px;
        cursor: pointer;
      ">
        ${text}
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16]
  });
};

export const LiveMapGIS = ({ onOpenDispatch }) => {
  const { victims, shelters, rescueTeams, adminIncomingAlert, setAdminIncomingAlert } = useEmergency();
  const [selectedRegion, setSelectedRegion] = useState('ALL');
  const [showRadarOverlay, setShowRadarOverlay] = useState(false);
  const [showZones, setShowZones] = useState(false);
  const [showShelters, setShowShelters] = useState(false);
  const [showTeams, setShowTeams] = useState(false);
  const [showWeatherRadar, setShowWeatherRadar] = useState(false);

  // Filter victims based on region selection
  const filteredVictims = selectedRegion === 'ALL'
    ? victims
    : victims.filter(v => v.city.toLowerCase().includes(selectedRegion.toLowerCase()) || v.state.toLowerCase().includes(selectedRegion.toLowerCase()));

  return (
    <div className="glass-panel" style={{ height: '640px', position: 'relative', overflow: 'hidden', borderRadius: '16px' }}>
      
      {/* Real-time Broadcast Emergency Alert Toast */}
      {adminIncomingAlert && (
        <div style={{
          position: 'absolute',
          top: '4.5rem',
          left: '1rem',
          right: '1rem',
          zIndex: 1100,
          background: 'linear-gradient(135deg, #b91c1c, #7f1d1d)',
          border: '2px solid #ef4444',
          borderRadius: '12px',
          padding: '1rem 1.25rem',
          boxShadow: '0 0 30px rgba(239, 68, 68, 0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          animation: 'pulse-red 1.2s infinite'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{ background: '#ef4444', padding: '0.6rem', borderRadius: '50%', display: 'flex' }}>
              <AlertCircle size={26} color="#fff" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="badge badge-red" style={{ background: '#ef4444', color: '#fff', fontWeight: 900 }}>
                  🚨 NEW REAL CITIZEN EMERGENCY SOS
                </span>
                <strong style={{ fontSize: '1.1rem', color: '#fff' }}>
                  {adminIncomingAlert.name} ({adminIncomingAlert.phone})
                </strong>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#fca5a5', marginTop: '0.2rem' }}>
                📍 GPS: {adminIncomingAlert.lat.toFixed(4)}, {adminIncomingAlert.lng.toFixed(4)} ({adminIncomingAlert.city}) • Battery: {adminIncomingAlert.battery}%
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              onClick={() => {
                onOpenDispatch(adminIncomingAlert);
                setAdminIncomingAlert(null);
              }}
              className="btn btn-emergency"
              style={{ fontSize: '0.85rem', padding: '0.5rem 1.25rem' }}
            >
              <Send size={16} /> DISPATCH TASK FORCE
            </button>
            <button
              onClick={() => setAdminIncomingAlert(null)}
              style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Map Controls Overlay Bar */}
      <div style={{
        position: 'absolute',
        top: '1rem',
        left: '1rem',
        right: '1rem',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.75rem',
        background: 'rgba(15, 23, 42, 0.85)',
        backdropFilter: 'blur(12px)',
        padding: '0.75rem 1.25rem',
        borderRadius: '12px',
        border: '1px solid var(--bg-card-border)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Radio size={20} color="#38bdf8" />
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800 }}>LIVE REAL-TIME EMERGENCY MAP ({filteredVictims.length} CASES)</h3>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          {/* Region Filter */}
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid var(--bg-card-border)',
              color: '#fff',
              padding: '0.4rem 0.75rem',
              borderRadius: '8px',
              fontSize: '0.82rem',
              fontWeight: 600,
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="ALL">📍 Entire India (Nationwide)</option>
            <option value="Hyderabad">🌧 Hyderabad (Telangana)</option>
            <option value="Wayanad">⛰ Wayanad (Kerala)</option>
            <option value="Cuttack">🌊 Cuttack (Odisha)</option>
          </select>

          {/* Optional Layer Toggles */}
          <button
            onClick={() => setShowWeatherRadar(!showWeatherRadar)}
            style={{
              background: showWeatherRadar ? 'rgba(56, 189, 248, 0.25)' : 'rgba(255, 255, 255, 0.08)',
              border: showWeatherRadar ? '1px solid #38bdf8' : '1px solid var(--bg-card-border)',
              color: showWeatherRadar ? '#7dd3fc' : 'var(--text-secondary)',
              padding: '0.4rem 0.65rem',
              borderRadius: '8px',
              fontSize: '0.78rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            🌧️ Weather Radar: {showWeatherRadar ? 'ON' : 'OFF'}
          </button>

          <button
            onClick={() => setShowShelters(!showShelters)}
            style={{
              background: showShelters ? 'rgba(16, 185, 129, 0.25)' : 'rgba(255, 255, 255, 0.08)',
              border: showShelters ? '1px solid #10b981' : '1px solid var(--bg-card-border)',
              color: showShelters ? '#6ee7b7' : 'var(--text-secondary)',
              padding: '0.4rem 0.65rem',
              borderRadius: '8px',
              fontSize: '0.78rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            <Home size={14} style={{ display: 'inline', marginRight: '4px' }} /> Shelters: {showShelters ? 'ON' : 'OFF'}
          </button>

          <button
            onClick={() => setShowTeams(!showTeams)}
            style={{
              background: showTeams ? 'rgba(234, 179, 8, 0.25)' : 'rgba(255, 255, 255, 0.08)',
              border: showTeams ? '1px solid #eab308' : '1px solid var(--bg-card-border)',
              color: showTeams ? '#fde047' : 'var(--text-secondary)',
              padding: '0.4rem 0.65rem',
              borderRadius: '8px',
              fontSize: '0.78rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            <Users size={14} style={{ display: 'inline', marginRight: '4px' }} /> Teams: {showTeams ? 'ON' : 'OFF'}
          </button>

          <button
            onClick={() => setShowZones(!showZones)}
            style={{
              background: showZones ? 'rgba(239, 68, 68, 0.25)' : 'rgba(255, 255, 255, 0.08)',
              border: showZones ? '1px solid #ef4444' : '1px solid var(--bg-card-border)',
              color: showZones ? '#fca5a5' : 'var(--text-secondary)',
              padding: '0.4rem 0.65rem',
              borderRadius: '8px',
              fontSize: '0.78rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            🔴 Zones: {showZones ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>

      {/* Radar Scanline Animation */}
      {showRadarOverlay && <div className="radar-scanline" />}

      {/* Leaflet Map */}
      <MapContainer
        center={[20.5937, 78.9629]} // India Center
        zoom={5}
        style={{ width: '100%', height: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CARTO</a> NDRRS India'
        />

        {/* Optional Disaster Risk Zones Circles */}
        {showZones && (
          <Circle
            center={[17.3850, 78.4867]}
            radius={30000}
            pathOptions={{ fillColor: '#ef4444', color: '#dc2626', weight: 2, fillOpacity: 0.2 }}
          />
        )}

        {/* Real Victim Markers ONLY - Breathing Light Animations */}
        {filteredVictims.map((vic) => {
          return (
            <Marker
              key={vic.id}
              position={[vic.lat, vic.lng]}
              icon={createCustomIcon(vic.level, vic.level === 'red' ? '!' : '✓')}
            >
              <Popup>
                <div style={{ minWidth: '240px', padding: '0.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                    <strong style={{ fontSize: '1.05rem', color: '#f8fafc' }}>{vic.name}</strong>
                    <span className={`badge badge-${vic.level}`}>{vic.status}</span>
                  </div>

                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                    <Phone size={12} style={{ display: 'inline', marginRight: '4px' }} /> {vic.phone} • {vic.city}
                  </p>

                  <div style={{ fontSize: '0.78rem', background: 'rgba(0,0,0,0.4)', padding: '0.5rem', borderRadius: '6px', marginBottom: '0.5rem' }}>
                    <div>GPS: <strong>{vic.lat.toFixed(4)}, {vic.lng.toFixed(4)}</strong></div>
                    <div>Battery: <strong style={{ color: vic.battery < 20 ? '#ef4444' : '#10b981' }}>{vic.battery}%</strong></div>
                    <div>Assigned Team: <strong style={{ color: '#38bdf8' }}>{vic.assignedTeam || 'Unassigned'}</strong></div>
                  </div>

                  <button
                    onClick={() => onOpenDispatch(vic)}
                    className="btn btn-emergency"
                    style={{ width: '100%', fontSize: '0.8rem', padding: '0.45rem' }}
                  >
                    <Send size={14} /> DISPATCH RESCUE TEAM
                  </button>
                </div>
              </Popup>
            </Marker>
          );
        })}

        {/* Optional Shelter Markers */}
        {showShelters && shelters.map((shl) => (
          <Marker
            key={shl.id}
            position={[shl.lat, shl.lng]}
            icon={createCustomIcon('green', 'H')}
          >
            <Popup>
              <div style={{ minWidth: '180px' }}>
                <strong style={{ color: '#38bdf8', fontSize: '0.95rem' }}>{shl.name}</strong>
                <p style={{ fontSize: '0.8rem', marginTop: '0.2rem' }}>Beds Available: {shl.availableBeds}</p>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Optional Rescue Team Markers */}
        {showTeams && rescueTeams.map((team) => (
          <Marker
            key={team.id}
            position={[team.lat, team.lng]}
            icon={createCustomIcon('orange', 'R')}
          >
            <Popup>
              <div style={{ minWidth: '180px' }}>
                <strong style={{ color: '#eab308', fontSize: '0.95rem' }}>{team.name}</strong>
                <p style={{ fontSize: '0.8rem', marginTop: '0.2rem' }}>Status: {team.status}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Empty State Banner overlay when 0 victims exist */}
      {filteredVictims.length === 0 && (
        <div style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
          background: 'rgba(15, 23, 42, 0.9)',
          backdropFilter: 'blur(12px)',
          border: '1px solid var(--bg-card-border)',
          borderRadius: '30px',
          padding: '0.65rem 1.5rem',
          fontSize: '0.85rem',
          fontWeight: 700,
          color: '#38bdf8',
          boxShadow: '0 8px 25px rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem'
        }}>
          <Radio size={16} className="animate-pulse-red" />
          <span>MAP CLEAN • ZERO ACTIVE CASES (Listening for Live Citizen SOS)...</span>
        </div>
      )}

      {/* Embedded Responsive Zoom Earth Weather Radar PiP */}
      {showWeatherRadar && (
        <div style={{
          position: 'absolute',
          bottom: '2rem',
          right: '2rem',
          width: '380px',
          height: '280px',
          zIndex: 1200,
          borderRadius: '12px',
          overflow: 'hidden',
          border: '2px solid #38bdf8',
          boxShadow: '0 10px 40px rgba(0,0,0,0.7)',
          background: '#0b0f19'
        }}>
          <iframe
            src="https://zoom.earth/maps/precipitation/#view=18.0727,78.5718,7z/place=16.189734,78.019142/model=icon"
            title="Zoom Earth Live Radar Weather Map"
            style={{ width: '100%', height: '100%', border: 'none' }}
            allow="geolocation"
          />
        </div>
      )}
    </div>
  );
};
