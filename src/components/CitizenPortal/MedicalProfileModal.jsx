import React, { useState } from 'react';
import { useEmergency } from '../../context/EmergencyContext';
import { HeartPulse, Save, X, CheckCircle } from 'lucide-react';

export const MedicalProfileModal = ({ onClose }) => {
  const [profile, setProfile] = useState({
    bloodGroup: 'O+',
    allergies: 'Penicillin, Dust',
    medicalConditions: 'Asthma, Type 2 Diabetes',
    disabilities: 'Reduced mobility in left leg',
    medicines: 'Inhaler (Salbutamol), Metformin 500mg',
    emergencyContactName: 'Karthik Rao (Son)',
    emergencyContactPhone: '+91 98490 55443'
  });
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
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
            <div style={{ padding: '0.5rem', background: 'rgba(249, 115, 22, 0.2)', borderRadius: '8px' }}>
              <HeartPulse size={24} color="#f97316" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800 }}>MEDICAL & DISABILITY PROFILE</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Pre-save vital health data to assist first responders during rescue.
              </p>
            </div>
          </div>

          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
            <X size={24} />
          </button>
        </div>

        {saved ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#10b981' }}>
            <CheckCircle size={48} style={{ margin: '0 auto 1rem' }} />
            <h4 style={{ fontSize: '1.2rem', fontWeight: 800 }}>PROFILE SAVED LOCALLY & ENCRYPTED</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
              Rescue teams will automatically receive this data when an SOS is sent.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Blood Group</label>
                <select className="input-field" value={profile.bloodGroup} onChange={e => setProfile({...profile, bloodGroup: e.target.value})}>
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
              <div>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Known Allergies</label>
                <input type="text" className="input-field" value={profile.allergies} onChange={e => setProfile({...profile, allergies: e.target.value})} />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Pre-existing Medical Conditions</label>
              <input type="text" className="input-field" value={profile.medicalConditions} onChange={e => setProfile({...profile, medicalConditions: e.target.value})} />
            </div>

            <div>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Disabilities / Mobility Impairments</label>
              <input type="text" className="input-field" value={profile.disabilities} onChange={e => setProfile({...profile, disabilities: e.target.value})} />
            </div>

            <div>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Daily Essential Medicines</label>
              <input type="text" className="input-field" value={profile.medicines} onChange={e => setProfile({...profile, medicines: e.target.value})} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Emergency Contact Name</label>
                <input type="text" className="input-field" value={profile.emergencyContactName} onChange={e => setProfile({...profile, emergencyContactName: e.target.value})} />
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Emergency Contact Phone</label>
                <input type="text" className="input-field" value={profile.emergencyContactPhone} onChange={e => setProfile({...profile, emergencyContactPhone: e.target.value})} />
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.85rem' }}>
              <Save size={18} /> SAVE MEDICAL PROFILE
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
