import React from 'react';
import { useEmergency } from '../../context/EmergencyContext';
import { Box, AlertTriangle, CheckCircle, RefreshCw } from 'lucide-react';

export const ResourceInventory = () => {
  const { resources, setResources } = useEmergency();

  const handleRestock = (id) => {
    setResources(prev => prev.map(r => r.id === id ? {
      ...r,
      count: Math.min(r.count + Math.round(r.total * 0.2), r.total),
      status: "good"
    } : r));
  };

  return (
    <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ padding: '0.5rem', background: 'rgba(234, 179, 8, 0.2)', borderRadius: '8px' }}>
            <Box size={24} color="#eab308" />
          </div>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>NATIONAL DISASTER RESOURCE MANAGEMENT</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Real-time inventory tracking for Boats, Ambulances, Food Packets, Drinking Water, Dewatering Pumps & Fuel.
            </p>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
        {resources.map(res => {
          const pct = Math.round((res.count / res.total) * 100);
          const isLow = pct < 35;
          return (
            <div
              key={res.id}
              style={{
                background: 'rgba(15, 23, 42, 0.6)',
                border: isLow ? '1px solid rgba(239, 68, 68, 0.4)' : '1px solid var(--bg-card-border)',
                borderRadius: '12px',
                padding: '1.25rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {res.category}
                </span>
                <span className={`badge ${pct < 25 ? 'badge-red' : pct < 50 ? 'badge-orange' : 'badge-green'}`}>
                  {pct}% Available
                </span>
              </div>

              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem' }}>{res.item}</h4>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <strong style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f8fafc' }}>
                  {res.count.toLocaleString()}
                </strong>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  / {res.total.toLocaleString()} {res.unit}
                </span>
              </div>

              {/* Progress Bar */}
              <div style={{ height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', overflow: 'hidden', marginBottom: '1rem' }}>
                <div style={{
                  height: '100%',
                  width: `${pct}%`,
                  background: pct < 25 ? 'linear-gradient(90deg, #ef4444, #dc2626)' : pct < 50 ? 'linear-gradient(90deg, #f97316, #ea580c)' : 'linear-gradient(90deg, #10b981, #059669)',
                  transition: 'width 0.5s ease'
                }} />
              </div>

              <button
                onClick={() => handleRestock(res.id)}
                className="btn btn-secondary"
                style={{ width: '100%', fontSize: '0.8rem', padding: '0.45rem' }}
              >
                <RefreshCw size={14} /> ALLOCATE EMERGENCY REFILL (+20%)
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
