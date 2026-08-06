import React, { useState } from 'react';
import { useEmergency } from '../../context/EmergencyContext';
import { Home, MapPin, Navigation, Phone, CheckCircle, AlertCircle, X, Coffee, HeartPulse } from 'lucide-react';

export const ShelterFinder = ({ onClose }) => {
  const { shelters, userLocation } = useEmergency();
  const [selectedShelter, setSelectedShelter] = useState(null);

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
        maxWidth: '850px',
        width: '100%',
        padding: '2rem',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ padding: '0.5rem', background: 'rgba(16, 185, 129, 0.2)', borderRadius: '8px' }}>
              <Home size={24} color="#10b981" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800 }}>EMERGENCY SHELTERS & RELIEF CAMPS</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Government designated safe centers with food, water, medical doctors & evacuation boats.
              </p>
            </div>
          </div>

          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
            <X size={24} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {shelters.map(shelter => (
            <div
              key={shelter.id}
              style={{
                background: 'rgba(15, 23, 42, 0.6)',
                border: '1px solid var(--bg-card-border)',
                borderRadius: '12px',
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '1rem'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc' }}>{shelter.name}</h4>
                  <span className="badge badge-green">
                    {shelter.distanceKm} km away
                  </span>
                </div>

                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                  <MapPin size={14} style={{ display: 'inline', marginRight: '4px' }} />
                  {shelter.city}, {shelter.state}
                </p>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '0.5rem',
                  background: 'rgba(0,0,0,0.3)',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  fontSize: '0.8rem',
                  marginBottom: '0.75rem'
                }}>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Available Beds:</span>
                    <strong style={{ color: '#10b981', display: 'block', fontSize: '1rem' }}>{shelter.availableBeds} / {shelter.capacity}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Food Supplies:</span>
                    <strong style={{ color: '#38bdf8', display: 'block', fontSize: '1rem' }}>{shelter.foodStockDays} Days Stock</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Drinking Water:</span>
                    <strong style={{ color: '#fde047', display: 'block' }}>{shelter.waterLiters.toLocaleString()} L</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Medical Doctor:</span>
                    <strong style={{ color: shelter.medicalDoctorOnSite ? '#6ee7b7' : '#fca5a5', display: 'block' }}>
                      {shelter.medicalDoctorOnSite ? 'Yes (On Site)' : 'On Call'}
                    </strong>
                  </div>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                  {shelter.facilities.map((fac, idx) => (
                    <span key={idx} style={{ fontSize: '0.72rem', background: 'rgba(255,255,255,0.06)', padding: '0.2rem 0.5rem', borderRadius: '4px', color: 'var(--text-secondary)' }}>
                      ✓ {fac}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${shelter.lat},${shelter.lng}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary"
                  style={{ flex: 1, fontSize: '0.85rem', padding: '0.5rem' }}
                >
                  <Navigation size={16} /> GPS NAVIGATION
                </a>
                <a
                  href={`tel:${shelter.contact}`}
                  className="btn btn-secondary"
                  style={{ fontSize: '0.85rem', padding: '0.5rem' }}
                >
                  <Phone size={16} /> CALL
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
