import React, { useState } from 'react';
import { useEmergency } from '../../context/EmergencyContext';
import { Send, Navigation, X, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const TeamDispatchModal = ({ victim, onClose }) => {
  const { rescueTeams, assignTeamToVictim } = useEmergency();
  const [selectedTeamId, setSelectedTeamId] = useState(rescueTeams[0]?.id || '');
  const [dispatched, setDispatched] = useState(false);

  const handleDispatch = (e) => {
    e.preventDefault();
    assignTeamToVictim(victim.id, selectedTeamId);
    setDispatched(true);
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.85)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000,
      padding: '1rem'
    }}>
      <div className="glass-panel" style={{
        maxWidth: '550px',
        width: '100%',
        padding: '2rem'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ padding: '0.5rem', background: '#dc2626', borderRadius: '8px' }}>
              <ShieldAlert size={24} color="#fff" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800 }}>DISPATCH RESCUE TASK FORCE</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Target Victim: <strong>{victim?.name}</strong> ({victim?.city})
              </p>
            </div>
          </div>

          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
            <X size={24} />
          </button>
        </div>

        {dispatched ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#10b981' }}>
            <CheckCircle2 size={48} style={{ margin: '0 auto 1rem' }} />
            <h4 style={{ fontSize: '1.2rem', fontWeight: 800 }}>TASK FORCE DISPATCHED</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
              GPS navigation link and victim telemetry transmitted to command vehicle.
            </p>
          </div>
        ) : (
          <form onSubmit={handleDispatch} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ background: 'rgba(0,0,0,0.4)', padding: '1rem', borderRadius: '10px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <div>GPS Coordinates: <strong>{victim?.lat.toFixed(4)}, {victim?.lng.toFixed(4)}</strong></div>
              <div>Water Level: <strong>{victim?.waterDepthMeters} Meters</strong></div>
              <div>Medical Flags: <strong style={{ color: '#fca5a5' }}>{victim?.medicalConditions}</strong></div>
            </div>

            <div>
              <label style={{ fontSize: '0.88rem', color: 'var(--text-primary)', fontWeight: 700, display: 'block', marginBottom: '0.5rem' }}>
                Select Available NDRF / SDRF / IAF Response Unit:
              </label>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {rescueTeams.map(team => (
                  <label
                    key={team.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.85rem',
                      borderRadius: '8px',
                      background: selectedTeamId === team.id ? 'rgba(56, 189, 248, 0.15)' : 'rgba(15, 23, 42, 0.6)',
                      border: selectedTeamId === team.id ? '1px solid #38bdf8' : '1px solid var(--bg-card-border)',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <input
                        type="radio"
                        name="rescueTeam"
                        value={team.id}
                        checked={selectedTeamId === team.id}
                        onChange={() => setSelectedTeamId(team.id)}
                      />
                      <div>
                        <strong style={{ fontSize: '0.92rem', color: '#f8fafc' }}>{team.name}</strong>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                          Commander: {team.commander} • {team.members} Personnel
                        </div>
                      </div>
                    </div>

                    <span className="badge badge-yellow">
                      ETA ~{team.etaMinutes} mins
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <button type="submit" className="btn btn-emergency" style={{ width: '100%', padding: '0.9rem' }}>
              <Navigation size={20} /> CONFIRM DISPATCH & TRANSMIT GPS
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
