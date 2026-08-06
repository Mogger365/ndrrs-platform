import React, { useState } from 'react';
import { useEmergency } from '../../context/EmergencyContext';
import { Camera, MapPin, X, Upload, CheckCircle } from 'lucide-react';

export const DamageReportModal = ({ onClose }) => {
  const { damageReports, setDamageReports, userLocation } = useEmergency();
  const [formData, setFormData] = useState({
    title: 'Submerged Road & Power Line Damage',
    location: userLocation.city,
    severity: 'HIGH',
    description: 'Road inundated with 2 feet of water. Broken electric pole leaning over water.'
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReport = {
      id: `DR-${Math.floor(500 + Math.random() * 500)}`,
      title: formData.title,
      location: formData.location,
      severity: formData.severity,
      description: formData.description,
      timestamp: 'Just now',
      status: 'VERIFIED'
    };
    setDamageReports(prev => [newReport, ...prev]);
    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 1800);
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
            <div style={{ padding: '0.5rem', background: 'rgba(239, 68, 68, 0.2)', borderRadius: '8px' }}>
              <Camera size={24} color="#ef4444" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800 }}>REPORT HAZARD & DAMAGE</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Upload geotagged evidence of flood levels, road breaches, or electrical hazards.
              </p>
            </div>
          </div>

          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
            <X size={24} />
          </button>
        </div>

        {submitted ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#10b981' }}>
            <CheckCircle size={48} style={{ margin: '0 auto 1rem' }} />
            <h4 style={{ fontSize: '1.2rem', fontWeight: 800 }}>HAZARD REPORT TRANSMITTED</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
              Disaster control room has logged your geotagged evidence.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Hazard Title *</label>
              <input type="text" className="input-field" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Location *</label>
                <input type="text" className="input-field" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} required />
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Hazard Level</label>
                <select className="input-field" value={formData.severity} onChange={e => setFormData({...formData, severity: e.target.value})}>
                  <option value="CRITICAL">🔴 CRITICAL HAZARD</option>
                  <option value="HIGH">🟠 HIGH RISK</option>
                  <option value="MODERATE">🟨 MODERATE</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Detailed Observations</label>
              <textarea className="input-field" rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required />
            </div>

            {/* Photo Upload Simulator */}
            <div style={{ border: '2px dashed var(--bg-card-border)', borderRadius: '10px', padding: '1.5rem', textAlign: 'center', cursor: 'pointer', background: 'rgba(0,0,0,0.3)' }}>
              <Upload size={32} color="#38bdf8" style={{ margin: '0 auto 0.5rem' }} />
              <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 600 }}>Geotagged Photo Captured</p>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>GPS metadata automatically embedded</p>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.85rem' }}>
              SUBMIT HAZARD REPORT TO NDRF
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
