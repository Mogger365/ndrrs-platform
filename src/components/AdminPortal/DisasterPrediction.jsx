import React from 'react';
import { TrendingUp, AlertTriangle, CloudRain, Wind, Waves, ShieldAlert, Cpu } from 'lucide-react';

export const DisasterPrediction = () => {
  const predictions = [
    {
      district: "Hyderabad & Rangareddy",
      state: "Telangana",
      hazard: "River Musi Inundation & Flash Flood",
      riskScore: 92,
      confidence: "98% (IMD Doppler Radar)",
      recommendation: "Issue immediate SMS evacuation alerts for low-lying slums near Begumpet & Moosarambagh.",
      trend: "HIGHLY RISING"
    },
    {
      district: "Wayanad (Vythiri / Meppadi)",
      state: "Kerala",
      hazard: "Slope Soil Saturation & Landslide",
      riskScore: 88,
      confidence: "94% (Geological Survey of India)",
      recommendation: "Pre-position NDRF search dogs and earthmovers in Chooralmala foothills.",
      trend: "RISING HAZARD"
    },
    {
      district: "Puri & Jagatsinghpur",
      state: "Odisha",
      hazard: "Cyclone Landfall Storm Surge (3.5m)",
      riskScore: 84,
      confidence: "91% (INCOIS Ocean Models)",
      recommendation: "Deploy inflatable motorboats & order coastal evacuation within 5km zone.",
      trend: "STABLE HIGH"
    }
  ];

  return (
    <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
        <div style={{ padding: '0.5rem', background: 'rgba(168, 85, 247, 0.2)', borderRadius: '8px' }}>
          <TrendingUp size={24} color="#c084fc" />
        </div>
        <div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>AI DISASTER PREDICTION & HAZARD FORECASTING</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Machine learning predictive model forecasting river overflow levels, landslide risk, and cyclone landfall paths.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {predictions.map((p, idx) => (
          <div
            key={idx}
            style={{
              background: 'rgba(15, 23, 42, 0.6)',
              border: p.riskScore > 85 ? '1px solid rgba(239, 68, 68, 0.4)' : '1px solid var(--bg-card-border)',
              borderRadius: '12px',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '1rem'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span className="badge badge-red" style={{ fontSize: '0.8rem' }}>
                  Risk Score: {p.riskScore} / 100
                </span>
                <span style={{ fontSize: '0.78rem', color: '#c084fc', fontWeight: 700 }}>
                  ⚡ {p.trend}
                </span>
              </div>

              <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#f8fafc' }}>{p.district} ({p.state})</h4>
              <p style={{ fontSize: '0.9rem', color: '#fca5a5', fontWeight: 700, margin: '0.35rem 0' }}>
                Hazard: {p.hazard}
              </p>

              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                Model Confidence: {p.confidence}
              </p>

              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.75rem', borderRadius: '8px', borderLeft: '3px solid #c084fc' }}>
                <span style={{ fontSize: '0.75rem', color: '#c084fc', fontWeight: 800, display: 'block' }}>
                  🤖 AI RECOMMENDED ACTION:
                </span>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                  {p.recommendation}
                </p>
              </div>
            </div>

            <button className="btn btn-primary" style={{ fontSize: '0.82rem', padding: '0.5rem' }}>
              <ShieldAlert size={16} /> BROADCAST REGIONAL SMS WARNING
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
