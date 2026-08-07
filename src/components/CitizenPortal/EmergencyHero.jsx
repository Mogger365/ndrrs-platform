import React from 'react';
import { useEmergency } from '../../context/EmergencyContext';
import { useLanguage } from '../../context/LanguageContext';
import { AlertCircle, ShieldCheck, MapPin, Battery, Signal, Clock, FileText, CheckCircle2, Home } from 'lucide-react';

export const EmergencyHero = ({ onOpenModal }) => {
  const {
    userLocation, batteryLevel, networkStatus, isSOSActive,
    isSafeRegistered, triggerSOS, markSafe
  } = useEmergency();
  const { t } = useLanguage();

  return (
    <div style={{ padding: '2rem 1.5rem', maxWidth: '900px', margin: '0 auto' }}>
      
      {/* 1. SOS Active Status Banner */}
      {isSOSActive && (
        <div className="glass-panel glass-panel-glow-danger" style={{ padding: '1.5rem', marginBottom: '1.5rem', background: 'rgba(239, 68, 68, 0.18)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div className="animate-pulse-red" style={{ width: '52px', height: '52px', borderRadius: '50%', background: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <AlertCircle size={32} color="#fff" />
              </div>
              <div>
                <h2 style={{ fontSize: '1.4rem', color: '#fca5a5', fontWeight: 900 }}>
                  🚨 INSTANT SOS DISPATCH SENT TO NDRF CONTROL
                </h2>
                <p style={{ fontSize: '0.9rem', color: '#cbd5e1', marginTop: '0.2rem' }}>
                  Live GPS: <strong>{userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}</strong> ({userLocation.city}) • Battery: {batteryLevel}% • Government Telemetry Active
                </p>
                <p style={{ fontSize: '0.9rem', color: '#6ee7b7', fontWeight: 'bold', marginTop: '0.4rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '0.4rem' }}>
                  YOUR RESPONSE HAS BEEN SHARED TO OUR OFFICIAL.
                </p>
                {currentSOS?.status === "DISPATCHED" && (
                  <div style={{ marginTop: '0.8rem', padding: '0.75rem', background: 'rgba(0,0,0,0.4)', borderRadius: '8px', borderLeft: '4px solid #38bdf8' }}>
                    <div style={{ fontSize: '0.85rem', color: '#38bdf8', fontWeight: 800, marginBottom: '0.2rem' }}>RESCUE TEAM EN ROUTE!</div>
                    <div style={{ fontSize: '0.9rem', color: '#fff' }}>Team: <strong>{currentSOS.assignedTeam}</strong></div>
                    <div style={{ fontSize: '0.9rem', color: '#fff' }}>Vehicle: <strong>{currentSOS.dispatchVehicle}</strong></div>
                  </div>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <button onClick={() => onOpenModal('sos')} className="btn btn-secondary" style={{ fontSize: '0.85rem' }}>
                <FileText size={16} /> Optional: Add Details
              </button>
              <button onClick={markSafe} className="btn btn-safe" style={{ fontSize: '0.9rem' }}>
                <ShieldCheck size={18} /> I AM SAFE NOW
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Safe Active Status Banner */}
      {isSafeRegistered && !isSOSActive && (
        <div className="glass-panel glass-panel-glow-safe" style={{ padding: '1.25rem 1.5rem', marginBottom: '1.5rem', background: 'rgba(16, 185, 129, 0.15)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div className="animate-pulse-green" style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CheckCircle2 size={26} color="#fff" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', color: '#6ee7b7', fontWeight: 800 }}>
                  🟩 STATUS REGISTERED: SAFE WITH DISASTER CONTROL
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>
                  Government emergency team notified. Live telemetry confirmed.
                </p>
              </div>
            </div>

            <button onClick={() => onOpenModal('shelters')} className="btn btn-primary" style={{ fontSize: '0.85rem' }}>
              <Home size={16} /> Find Relief Camp
            </button>
          </div>
        </div>
      )}

      {/* Main Dual Hero Buttons - Ultra Clean & Simple */}
      <div className="glass-panel" style={{ padding: '3rem 2rem', textAlign: 'center', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '20px' }}>
        <h2 style={{ fontSize: '2.1rem', fontWeight: 900, marginBottom: '0.5rem', background: 'linear-gradient(90deg, #f8fafc, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          NATIONAL DISASTER EMERGENCY PORTAL
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '650px', margin: '0 auto 2.5rem' }}>
          Official Government Emergency Interface. Select your status immediately:
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          {/* Emergency Button - 0-SECOND INSTANT SOS */}
          <button
            onClick={() => triggerSOS()}
            className="btn btn-emergency animate-pulse-red"
            style={{ minHeight: '160px', flexDirection: 'column', gap: '0.6rem', padding: '2rem' }}
          >
            <AlertCircle size={56} />
            <span style={{ fontSize: '1.5rem', fontWeight: 900 }}>🟥 EMERGENCY (SOS)</span>
            <span style={{ fontSize: '0.82rem', fontWeight: 600, opacity: 0.9 }}>
              Instant 0-Second Rescue Dispatch
            </span>
          </button>

          {/* Safe Button - INSTANT SAFE REGISTER */}
          <button
            onClick={markSafe}
            className="btn btn-safe"
            style={{ minHeight: '160px', flexDirection: 'column', gap: '0.6rem', padding: '2rem' }}
          >
            <ShieldCheck size={52} />
            <span style={{ fontSize: '1.35rem', fontWeight: 800 }}>🟩 SAFE / NEED HELP LATER</span>
            <span style={{ fontSize: '0.82rem', fontWeight: 600, opacity: 0.9 }}>
              Mark Safe & Share Live Location
            </span>
          </button>
        </div>

        {/* Telemetry Status Strip */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
          marginTop: '2.5rem',
          padding: '1rem 1.5rem',
          background: 'rgba(15, 23, 42, 0.7)',
          borderRadius: '14px',
          border: '1px solid var(--bg-card-border)',
          fontSize: '0.88rem',
          color: 'var(--text-secondary)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <MapPin size={16} color="#38bdf8" />
            <span>Live GPS: <strong>{userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}</strong> ({userLocation.city})</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Battery size={16} color={batteryLevel < 20 ? '#ef4444' : '#10b981'} />
            <span>Battery: <strong>{batteryLevel}%</strong></span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Signal size={16} color="#38bdf8" />
            <span>Network: <strong>{networkStatus}</strong></span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Clock size={16} color="#eab308" />
            <span>Telemetry: <strong>Government Live Sync (5s)</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
};
