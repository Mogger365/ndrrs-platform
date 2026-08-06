import React, { useState } from 'react';
import { useEmergency } from '../../context/EmergencyContext';
import { Search, Users, MapPin, Battery, Signal, Phone, ShieldCheck, AlertTriangle, X } from 'lucide-react';

export const FamilyTracker = ({ onClose }) => {
  const { victims } = useEmergency();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredVictims = victims.filter(v => 
    v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.phone.includes(searchQuery) ||
    v.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        maxWidth: '750px',
        width: '100%',
        padding: '2rem',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ padding: '0.5rem', background: 'rgba(234, 179, 8, 0.2)', borderRadius: '8px' }}>
              <Users size={24} color="#eab308" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800 }}>FAMILY & LOVED ONES TRACKER</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Search by Mobile Number or Name to view real-time location & safety status.
              </p>
            </div>
          </div>

          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
            <X size={24} />
          </button>
        </div>

        {/* Search Bar */}
        <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
          <Search size={20} color="var(--text-secondary)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            className="input-field"
            style={{ paddingLeft: '2.8rem' }}
            placeholder="Search family member by name or mobile number (e.g. 98490, Ramesh)..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Results */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {filteredVictims.map(member => (
            <div
              key={member.id}
              style={{
                background: 'rgba(15, 23, 42, 0.6)',
                border: member.level === 'red' ? '1px solid rgba(239, 68, 68, 0.4)' : '1px solid var(--bg-card-border)',
                borderRadius: '12px',
                padding: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{member.name}</h4>
                  <span className={`badge badge-${member.level}`}>
                    {member.status}
                  </span>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Phone size={14} /> {member.phone} • {member.city}
                </p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                  Medical: {member.medicalConditions}
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.35rem', fontSize: '0.82rem' }}>
                <span style={{ color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <MapPin size={14} /> GPS: {member.lat.toFixed(4)}, {member.lng.toFixed(4)}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: member.battery < 20 ? '#ef4444' : '#10b981' }}>
                  <Battery size={14} /> Battery: {member.battery}%
                </span>
                <span style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Signal size={14} /> Last Update: {member.lastSeen}
                </span>
              </div>
            </div>
          ))}

          {filteredVictims.length === 0 && (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              No family members found matching "{searchQuery}". Try searching by registered mobile number.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
