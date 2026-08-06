import React, { useState } from 'react';
import { Users, CheckCircle, Clock, MapPin, Plus, ShieldCheck } from 'lucide-react';

export const VolunteerHub = () => {
  const [volunteers, setVolunteers] = useState([
    { id: "VOL-01", name: "Suresh Kumar", role: "First-Aid & Paramedic", district: "Hyderabad", tasksCompleted: 14, status: "ON_TASK", phone: "+91 98490 11223" },
    { id: "VOL-02", name: "Ananya Reddy", role: "Food & Water Distribution", district: "Hyderabad", tasksCompleted: 22, status: "AVAILABLE", phone: "+91 98490 44556" },
    { id: "VOL-03", name: "Mohammed Irfan", role: "Motorboat Evacuation Aid", district: "Cuttack", tasksCompleted: 9, status: "ON_TASK", phone: "+91 97771 55667" }
  ]);
  const [showForm, setShowForm] = useState(false);
  const [newVol, setNewVol] = useState({ name: '', role: 'Food & Relief Distribution', district: 'Hyderabad', phone: '' });

  const handleRegister = (e) => {
    e.preventDefault();
    setVolunteers(prev => [...prev, {
      id: `VOL-0${prev.length + 1}`,
      name: newVol.name,
      role: newVol.role,
      district: newVol.district,
      tasksCompleted: 0,
      status: "AVAILABLE",
      phone: newVol.phone
    }]);
    setShowForm(false);
  };

  return (
    <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ padding: '0.5rem', background: 'rgba(16, 185, 129, 0.2)', borderRadius: '8px' }}>
            <Users size={24} color="#10b981" />
          </div>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>VERIFIED VOLUNTEER COORDINATION</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Assign relief tasks, track volunteer GPS positions, and verify field photo uploads.
            </p>
          </div>
        </div>

        <button onClick={() => setShowForm(!showForm)} className="btn btn-primary" style={{ fontSize: '0.85rem' }}>
          <Plus size={16} /> Register New Volunteer
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleRegister} style={{ background: 'rgba(15,23,42,0.6)', padding: '1.25rem', borderRadius: '12px', marginBottom: '1.25rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <input type="text" className="input-field" placeholder="Volunteer Full Name" value={newVol.name} onChange={e => setNewVol({...newVol, name: e.target.value})} required />
          <input type="text" className="input-field" placeholder="Mobile Number" value={newVol.phone} onChange={e => setNewVol({...newVol, phone: e.target.value})} required />
          <input type="text" className="input-field" placeholder="District / City" value={newVol.district} onChange={e => setNewVol({...newVol, district: e.target.value})} required />
          <button type="submit" className="btn btn-safe" style={{ fontSize: '0.85rem' }}>Register</button>
        </form>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
        {volunteers.map(vol => (
          <div key={vol.id} style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid var(--bg-card-border)', borderRadius: '12px', padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{vol.name}</h4>
              <span className={`badge ${vol.status === 'AVAILABLE' ? 'badge-green' : 'badge-yellow'}`}>
                {vol.status}
              </span>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#38bdf8', fontWeight: 600 }}>{vol.role}</p>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
              {vol.district} • {vol.phone}
            </p>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.06)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              <span>Tasks Completed: <strong>{vol.tasksCompleted}</strong></span>
              <span style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <ShieldCheck size={14} /> Aadhaar Verified
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
