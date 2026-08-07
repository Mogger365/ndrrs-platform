import React, { useState } from 'react';
import { useEmergency } from '../../context/EmergencyContext';
import { LiveMapGIS } from './LiveMapGIS';
import { ResourceInventory } from './ResourceInventory';
import { VolunteerHub } from './VolunteerHub';
import { AnalyticsDashboard } from './AnalyticsDashboard';
import { Map, Globe, Cpu, Box, TrendingUp, Users, BarChart3, Trash2 } from 'lucide-react';

export const AdminDashboard = ({ onOpenDispatch }) => {
  const [activeTab, setActiveTab] = useState('gis');
  const { victims, clearAllIncidents } = useEmergency();

  return (
    <div style={{ padding: '1.5rem', maxWidth: '1400px', margin: '0 auto' }}>
      
      {/* Top Real Incident Status Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        background: 'rgba(15, 23, 42, 0.7)',
        padding: '0.85rem 1.25rem',
        borderRadius: '12px',
        border: '1px solid var(--bg-card-border)',
        marginBottom: '1.25rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span className="badge badge-red" style={{ fontSize: '0.85rem', padding: '0.4rem 0.75rem' }}>
            🔴 REAL-TIME NETWORK: {victims.filter(v => v.level === 'red').length} CRITICAL EMERGENCY REPORTS
          </span>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            Zero automated dummy cases • 100% Live citizen SOS signal monitoring active
          </span>
        </div>

        {victims.length > 0 && (
          <button
            onClick={clearAllIncidents}
            className="btn btn-secondary"
            style={{ fontSize: '0.78rem', padding: '0.35rem 0.75rem', color: '#fca5a5' }}
          >
            <Trash2 size={14} /> Clear Incident Monitor
          </button>
        )}
      </div>

      {/* NDRS.AI Live Agent Terminal */}
      <div className="ai-terminal-wrapper">
        <div className="ai-terminal-content">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem', borderBottom: '1px solid rgba(56, 189, 248, 0.2)', paddingBottom: '0.5rem' }}>
          <Cpu size={18} color="#38bdf8" />
          <strong style={{ color: '#38bdf8', fontSize: '1rem', fontWeight: 800 }}>NDRS.AI Autonomous Dispatch Agent</strong>
          <span className="animate-pulse-green" style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '50%', marginLeft: '0.5rem' }}></span>
          <span style={{ fontSize: '0.75rem', color: '#10b981' }}>ONLINE</span>
        </div>
        <div style={{ maxHeight: '120px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.82rem', fontFamily: 'monospace' }}>
          {/* @ts-ignore - aiLogs is passed from context but we need to fetch it */}
          {useEmergency().aiLogs.map((log, idx) => (
            <div key={idx} style={{ color: idx === 0 ? '#fff' : 'var(--text-secondary)' }}>
              <span style={{ color: '#94a3b8', marginRight: '0.5rem' }}>[{log.time}]</span>
              {log.msg}
            </div>
          ))}
        </div>
      </div>
      </div>

      {/* Navigation Tabs */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        overflowX: 'auto',
        paddingBottom: '0.5rem',
        marginBottom: '1.5rem'
      }}>
        <button
          onClick={() => setActiveTab('gis')}
          className="btn"
          style={{
            background: activeTab === 'gis' ? 'linear-gradient(135deg, #0284c7, #0369a1)' : 'rgba(255,255,255,0.06)',
            color: activeTab === 'gis' ? '#fff' : 'var(--text-secondary)',
            fontSize: '0.88rem'
          }}
        >
          <Map size={18} /> 🗺️ Live GIS India Map
        </button>

        <button
          onClick={() => setActiveTab('resources')}
          className="btn"
          style={{
            background: activeTab === 'resources' ? 'linear-gradient(135deg, #eab308, #ca8a04)' : 'rgba(255,255,255,0.06)',
            color: activeTab === 'resources' ? '#fff' : 'var(--text-secondary)',
            fontSize: '0.88rem'
          }}
        >
          <Box size={18} /> 📦 Resource Inventory
        </button>

        <button
          onClick={() => setActiveTab('volunteers')}
          className="btn"
          style={{
            background: activeTab === 'volunteers' ? 'linear-gradient(135deg, #10b981, #047857)' : 'rgba(255,255,255,0.06)',
            color: activeTab === 'volunteers' ? '#fff' : 'var(--text-secondary)',
            fontSize: '0.88rem'
          }}
        >
          <Users size={18} /> 🤝 Volunteer Hub
        </button>

        <button
          onClick={() => setActiveTab('analytics')}
          className="btn"
          style={{
            background: activeTab === 'analytics' ? 'linear-gradient(135deg, #0284c7, #075985)' : 'rgba(255,255,255,0.06)',
            color: activeTab === 'analytics' ? '#fff' : 'var(--text-secondary)',
            fontSize: '0.88rem'
          }}
        >
          <BarChart3 size={18} /> 📊 Disaster Analytics
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === 'gis' && <LiveMapGIS onOpenDispatch={onOpenDispatch} />}
      {activeTab === 'resources' && <ResourceInventory />}
      {activeTab === 'volunteers' && <VolunteerHub />}
      {activeTab === 'analytics' && <AnalyticsDashboard />}
    </div>
  );
};
