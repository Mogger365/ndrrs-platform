import React from 'react';
import { useEmergency } from '../../context/EmergencyContext';
import { sortVictimsByAIPriority } from '../../utils/aiPriorityScorer';
import { Cpu, Send, AlertCircle, HeartPulse, Battery, Clock, Droplets, CheckCircle, ShieldAlert, Radio } from 'lucide-react';

export const AIPriorityQueue = ({ onOpenDispatch }) => {
  const { victims } = useEmergency();
  const sortedVictims = sortVictimsByAIPriority(victims);

  return (
    <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ padding: '0.5rem', background: 'rgba(2, 132, 199, 0.2)', borderRadius: '8px' }}>
            <Cpu size={24} color="#38bdf8" />
          </div>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>AI RESCUE PRIORITY QUEUE (100% REAL REPORTS)</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Real-time algorithm ranking live citizen SOS signals by vulnerability, age, flood depth, and battery life.
            </p>
          </div>
        </div>

        <span className="badge badge-red" style={{ fontSize: '0.8rem', padding: '0.4rem 0.75rem' }}>
          <ShieldAlert size={14} /> {sortedVictims.filter(v => v.level === 'red').length} HIGH-PRIORITY TARGETS
        </span>
      </div>

      {sortedVictims.length === 0 ? (
        <div style={{
          padding: '3rem 1.5rem',
          textAlign: 'center',
          background: 'rgba(15, 23, 42, 0.5)',
          borderRadius: '12px',
          border: '1px dashed var(--bg-card-border)',
          color: 'var(--text-secondary)'
        }}>
          <Radio size={42} color="#38bdf8" style={{ margin: '0 auto 1rem', display: 'block' }} />
          <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#f8fafc' }}>ZERO ACTIVE REAL EMERGENCY SIGNALS</h4>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '0.4rem', maxWidth: '500px', margin: '0.4rem auto 0' }}>
            All dummy mock data removed. Open the <strong>Citizen Portal</strong> and tap 🟥 <strong>EMERGENCY</strong> to send a real live SOS signal to this command center!
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '520px', overflowY: 'auto' }}>
          {sortedVictims.map((vic, index) => (
            <div
              key={vic.id}
              style={{
                background: 'rgba(15, 23, 42, 0.6)',
                border: vic.level === 'red' ? '1px solid rgba(239, 68, 68, 0.4)' : '1px solid var(--bg-card-border)',
                borderRadius: '12px',
                padding: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, minWidth: '280px' }}>
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: vic.level === 'red' ? 'linear-gradient(135deg, #ef4444, #b91c1c)' : 'rgba(255,255,255,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 900,
                  color: '#fff',
                  fontSize: '1.1rem',
                  border: '1px solid rgba(255,255,255,0.2)'
                }}>
                  #{index + 1}
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{vic.name}</h4>
                    <span className={`badge badge-${vic.level}`}>{vic.status}</span>
                    <span style={{ fontSize: '0.78rem', background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: 800 }}>
                      AI Score: {vic.aiScore} Pts
                    </span>
                  </div>

                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                    {vic.phone} • {vic.city}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '0.5rem', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Droplets size={12} color="#38bdf8" /> Flood Depth: <strong>{vic.waterDepthMeters}m</strong>
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: vic.battery < 20 ? '#ef4444' : '#10b981' }}>
                      <Battery size={12} /> Battery: <strong>{vic.battery}%</strong>
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Clock size={12} color="#eab308" /> Waiting: <strong>{vic.waitTimeMinutes} mins</strong>
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <HeartPulse size={12} color="#f97316" /> Medical: <strong>{vic.medicalConditions}</strong>
                    </span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                {vic.assignedTeam ? (
                  <span className="badge badge-green" style={{ padding: '0.5rem 0.85rem', fontSize: '0.82rem' }}>
                    <CheckCircle size={14} /> Assigned to {vic.assignedTeam}
                  </span>
                ) : (
                  <button
                    onClick={() => onOpenDispatch(vic)}
                    className="btn btn-emergency"
                    style={{ fontSize: '0.85rem', padding: '0.6rem 1.25rem' }}
                  >
                    <Send size={16} /> ASSIGN RESCUE TEAM
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
