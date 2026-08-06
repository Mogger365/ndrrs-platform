import React, { useState } from 'react';
import { useEmergency } from '../../context/EmergencyContext';
import { AlertCircle, X, Check, MapPin, Battery, Phone, User, HeartPulse } from 'lucide-react';

export const SOSModal = ({ onClose }) => {
  const { userLocation, batteryLevel, triggerSOS } = useEmergency();

  const [formData, setFormData] = useState({
    name: "Vidyadhar Rao",
    phone: "+91 98490 88776",
    bloodGroup: "O+",
    waterDepth: "1.8",
    age: "42",
    isSenior: false,
    isChild: false,
    isPregnant: false,
    isDisabled: false,
    medicalConditions: "Asthma patient, needs inhaler & boat evacuation"
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    triggerSOS({
      ...formData,
      waterDepth: parseFloat(formData.waterDepth),
      age: parseInt(formData.age)
    });
    onClose();
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
      <div className="glass-panel glass-panel-glow-danger" style={{
        maxWidth: '550px',
        width: '100%',
        padding: '2rem',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ padding: '0.5rem', background: '#ef4444', borderRadius: '50%' }}>
              <AlertCircle size={24} color="#fff" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.3rem', color: '#fca5a5', fontWeight: 800 }}>TRANSMIT EMERGENCY SOS</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                GPS: {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)} ({userLocation.city})
              </p>
            </div>
          </div>

          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
              Citizen Name *
            </label>
            <input
              type="text"
              className="input-field"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                Mobile Number *
              </label>
              <input
                type="text"
                className="input-field"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>
            <div>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                Water Depth (Meters)
              </label>
              <input
                type="number"
                step="0.1"
                className="input-field"
                value={formData.waterDepth}
                onChange={e => setFormData({ ...formData, waterDepth: e.target.value })}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                Age
              </label>
              <input
                type="number"
                className="input-field"
                value={formData.age}
                onChange={e => setFormData({ ...formData, age: e.target.value })}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                Blood Group
              </label>
              <select
                className="input-field"
                value={formData.bloodGroup}
                onChange={e => setFormData({ ...formData, bloodGroup: e.target.value })}
              >
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>
          </div>

          {/* Vulnerability Checkboxes */}
          <div style={{
            background: 'rgba(239, 68, 68, 0.1)',
            padding: '1rem',
            borderRadius: '8px',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0.75rem',
            fontSize: '0.85rem'
          }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={formData.isSenior}
                onChange={e => setFormData({ ...formData, isSenior: e.target.checked })}
              /> Senior Citizen (60+)
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={formData.isChild}
                onChange={e => setFormData({ ...formData, isChild: e.target.checked })}
              /> Infant / Child Present
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={formData.isPregnant}
                onChange={e => setFormData({ ...formData, isPregnant: e.target.checked })}
              /> Pregnant Woman
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={formData.isDisabled}
                onChange={e => setFormData({ ...formData, isDisabled: e.target.checked })}
              /> Disabled / Mobility Impaired
            </label>
          </div>

          <div>
            <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
              Medical Condition / Notes for Rescue Team
            </label>
            <textarea
              className="input-field"
              rows={2}
              value={formData.medicalConditions}
              onChange={e => setFormData({ ...formData, medicalConditions: e.target.value })}
            />
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.75rem',
            background: 'rgba(0,0,0,0.4)',
            borderRadius: '8px',
            fontSize: '0.8rem',
            color: 'var(--text-secondary)'
          }}>
            <span>GPS Lat/Lng: {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}</span>
            <span>Battery: {batteryLevel}%</span>
          </div>

          <button type="submit" className="btn btn-emergency" style={{ width: '100%', marginTop: '0.5rem' }}>
            <AlertCircle size={22} /> TRANSMIT SOS TO RESCUE COMMAND
          </button>
        </form>
      </div>
    </div>
  );
};
