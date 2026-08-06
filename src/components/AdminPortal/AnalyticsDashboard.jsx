import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend } from 'recharts';
import { useEmergency } from '../../context/EmergencyContext';
import { BarChart3, Download, ShieldCheck, Clock, Users, AlertTriangle } from 'lucide-react';

export const AnalyticsDashboard = () => {
  const { victims } = useEmergency();

  const stateData = [
    { name: 'Telangana', count: 48 },
    { name: 'Kerala', count: 32 },
    { name: 'Odisha', count: 24 },
    { name: 'Maharashtra', count: 18 },
    { name: 'Assam', count: 14 }
  ];

  const statusData = [
    { name: 'Critical SOS', value: victims.filter(v => v.level === 'red').length, color: '#ef4444' },
    { name: 'Dispatched', value: victims.filter(v => v.status === 'DISPATCHED').length, color: '#38bdf8' },
    { name: 'Rescued Safe', value: victims.filter(v => v.status === 'SAFE').length, color: '#10b981' },
    { name: 'Waiting Aid', value: victims.filter(v => v.level === 'orange').length, color: '#f97316' }
  ];

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "ID,Name,Phone,City,State,Level,Status,WaterDepth,Battery,Medical\n"
      + victims.map(v => `${v.id},"${v.name}",${v.phone},"${v.city}","${v.state}",${v.level},${v.status},${v.waterDepthMeters},${v.battery}%,"${v.medicalConditions}"`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `NDRRS_Incidents_Report_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ padding: '0.5rem', background: 'rgba(56, 189, 248, 0.2)', borderRadius: '8px' }}>
            <BarChart3 size={24} color="#38bdf8" />
          </div>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>NATIONAL DISASTER ANALYTICS</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Real-time response statistics, district breakdown, and automated incident audit reports.
            </p>
          </div>
        </div>

        <button onClick={handleExportCSV} className="btn btn-primary" style={{ fontSize: '0.85rem' }}>
          <Download size={16} /> EXPORT CSV / PDF AUDIT REPORT
        </button>
      </div>

      {/* Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ background: 'rgba(15,23,42,0.6)', border: '1px solid var(--bg-card-border)', padding: '1.25rem', borderRadius: '12px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Total SOS Signals</span>
          <strong style={{ display: 'block', fontSize: '1.8rem', fontWeight: 900, color: '#ef4444', marginTop: '0.2rem' }}>
            1,482
          </strong>
        </div>
        <div style={{ background: 'rgba(15,23,42,0.6)', border: '1px solid var(--bg-card-border)', padding: '1.25rem', borderRadius: '12px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Rescued Citizens</span>
          <strong style={{ display: 'block', fontSize: '1.8rem', fontWeight: 900, color: '#10b981', marginTop: '0.2rem' }}>
            1,240
          </strong>
        </div>
        <div style={{ background: 'rgba(15,23,42,0.6)', border: '1px solid var(--bg-card-border)', padding: '1.25rem', borderRadius: '12px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Avg NDRF Response Time</span>
          <strong style={{ display: 'block', fontSize: '1.8rem', fontWeight: 900, color: '#38bdf8', marginTop: '0.2rem' }}>
            14.2 Mins
          </strong>
        </div>
        <div style={{ background: 'rgba(15,23,42,0.6)', border: '1px solid var(--bg-card-border)', padding: '1.25rem', borderRadius: '12px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Active Relief Camps</span>
          <strong style={{ display: 'block', fontSize: '1.8rem', fontWeight: 900, color: '#eab308', marginTop: '0.2rem' }}>
            86 Camps
          </strong>
        </div>
      </div>

      {/* Charts Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
        {/* State Breakdown */}
        <div style={{ background: 'rgba(15,23,42,0.6)', border: '1px solid var(--bg-card-border)', padding: '1.25rem', borderRadius: '12px' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', color: '#f8fafc' }}>
            Disaster Emergencies by State
          </h4>
          <div style={{ width: '100%', height: 260 }}>
            <ResponsiveContainer>
              <BarChart data={stateData}>
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip contentStyle={{ background: '#131b2e', border: '1px solid rgba(255,255,255,0.1)' }} />
                <Bar dataKey="count" fill="#0284c7" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Ratio */}
        <div style={{ background: 'rgba(15,23,42,0.6)', border: '1px solid var(--bg-card-border)', padding: '1.25rem', borderRadius: '12px' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', color: '#f8fafc' }}>
            Victim Rescue Status Distribution
          </h4>
          <div style={{ width: '100%', height: 260 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: '#131b2e', border: '1px solid rgba(255,255,255,0.1)' }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
