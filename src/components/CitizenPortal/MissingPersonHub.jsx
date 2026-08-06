import React, { useState } from 'react';
import { useEmergency } from '../../context/EmergencyContext';
import { UserPlus, Search, X, MapPin, Phone, AlertCircle, Image } from 'lucide-react';

export const MissingPersonHub = ({ onClose }) => {
  const { missingPersons, setMissingPersons } = useEmergency();
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    district: 'Hyderabad',
    lastSeen: '',
    reportedBy: '',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
  });

  const handleAdd = (e) => {
    e.preventDefault();
    const newPerson = {
      id: `MP-${Math.floor(100 + Math.random() * 900)}`,
      name: formData.name,
      age: parseInt(formData.age),
      district: formData.district,
      photo: formData.photo,
      status: "SEARCHING",
      lastSeen: formData.lastSeen,
      reportedBy: formData.reportedBy
    };
    setMissingPersons(prev => [newPerson, ...prev]);
    setShowAddForm(false);
    setFormData({ name: '', age: '', district: 'Hyderabad', lastSeen: '', reportedBy: '', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150' });
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
        maxWidth: '800px',
        width: '100%',
        padding: '2rem',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ padding: '0.5rem', background: 'rgba(168, 85, 247, 0.2)', borderRadius: '8px' }}>
              <UserPlus size={24} color="#c084fc" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800 }}>MISSING PERSONS REGISTRY</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Report missing relatives or match located citizens in rescue camps.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button onClick={() => setShowAddForm(!showAddForm)} className="btn btn-primary" style={{ fontSize: '0.85rem' }}>
              <UserPlus size={16} /> {showAddForm ? 'View Registry' : 'Report Missing Person'}
            </button>
            <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
              <X size={24} />
            </button>
          </div>
        </div>

        {showAddForm ? (
          <form onSubmit={handleAdd} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', background: 'rgba(15,23,42,0.6)', padding: '1.5rem', borderRadius: '12px' }}>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#c084fc' }}>Register Missing Individual</h4>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Full Name *</label>
                <input type="text" className="input-field" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Age</label>
                <input type="number" className="input-field" value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} required />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>District / Area</label>
                <input type="text" className="input-field" value={formData.district} onChange={e => setFormData({...formData, district: e.target.value})} required />
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Contact Info of Reporter *</label>
                <input type="text" className="input-field" value={formData.reportedBy} onChange={e => setFormData({...formData, reportedBy: e.target.value})} required placeholder="e.g. Ramesh (+91 98490 12345)" />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Last Known Location / Time</label>
              <textarea className="input-field" rows={2} value={formData.lastSeen} onChange={e => setFormData({...formData, lastSeen: e.target.value})} required placeholder="e.g. Seen near Begumpet bridge around 4 PM..." />
            </div>

            <button type="submit" className="btn btn-primary">
              SUBMIT MISSING PERSON REPORT
            </button>
          </form>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
            {missingPersons.map(person => (
              <div key={person.id} style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid var(--bg-card-border)', borderRadius: '12px', padding: '1.25rem', display: 'flex', gap: '1rem' }}>
                <img src={person.photo} alt={person.name} style={{ width: '80px', height: '80px', borderRadius: '10px', objectFit: 'cover' }} />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{person.name} ({person.age} yrs)</h4>
                  </div>
                  <span className={`badge ${person.status === 'SEARCHING' ? 'badge-red' : 'badge-green'}`} style={{ margin: '0.35rem 0' }}>
                    {person.status}
                  </span>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                    District: <strong>{person.district}</strong>
                  </p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                    Last Seen: {person.lastSeen}
                  </p>
                  <p style={{ fontSize: '0.78rem', color: '#38bdf8', marginTop: '0.2rem' }}>
                    Reporter: {person.reportedBy}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
