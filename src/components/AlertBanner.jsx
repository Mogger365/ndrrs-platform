import React from 'react';
import { useEmergency } from '../context/EmergencyContext';
import { useLanguage } from '../context/LanguageContext';
import { AlertTriangle, Radio, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const AlertBanner = () => {
  const { alerts, isEmergencyMode, setIsEmergencyMode, speakAlert } = useEmergency();
  const { t } = useLanguage();

  const activeAlert = alerts.find(a => a.active) || alerts[0];

  if (!activeAlert) return null;

  const toggleEmergencyMode = () => {
    const nextState = !isEmergencyMode;
    setIsEmergencyMode(nextState);
    if (nextState) {
      speakAlert("Emergency background tracking enabled. Your GPS position is now monitored by the Disaster Response Team.");
    }
  };

  return (
    <div style={{
      background: 'linear-gradient(90deg, #7f1d1d, #991b1b, #7f1d1d)',
      borderBottom: '1px solid rgba(239, 68, 68, 0.4)',
      color: '#fff',
      padding: '0.65rem 1.25rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '0.75rem',
      boxShadow: '0 4px 15px rgba(220, 38, 38, 0.3)',
      position: 'relative',
      zIndex: 1000
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, minWidth: '300px' }}>
        <div style={{
          background: '#ef4444',
          padding: '0.4rem',
          borderRadius: '50%',
          display: 'flex',
          animation: 'pulse-red 1.5s infinite'
        }}>
          <AlertTriangle size={20} color="#fff" />
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="badge badge-red" style={{ background: '#b91c1c', color: '#fff' }}>
              IMD GOVT ALERT
            </span>
            <strong style={{ fontSize: '0.95rem', letterSpacing: '0.02em' }}>
              {activeAlert.title} ({activeAlert.region})
            </strong>
          </div>
          <p style={{ fontSize: '0.82rem', color: '#fca5a5', marginTop: '2px' }}>
            {activeAlert.advisory} • Expected: {activeAlert.expectedTime}
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <button
          onClick={toggleEmergencyMode}
          className="btn"
          style={{
            background: isEmergencyMode ? '#10b981' : '#dc2626',
            color: '#fff',
            fontSize: '0.85rem',
            padding: '0.45rem 0.9rem',
            borderRadius: '6px',
            border: '1px solid rgba(255,255,255,0.3)',
            boxShadow: isEmergencyMode ? '0 0 12px rgba(16,185,129,0.4)' : '0 0 12px rgba(220,38,38,0.4)'
          }}
        >
          {isEmergencyMode ? (
            <>
              <CheckCircle2 size={16} /> EMERGENCY TRACKING ACTIVE
            </>
          ) : (
            <>
              <Radio size={16} /> ENABLE EMERGENCY MODE
            </>
          )}
        </button>
      </div>
    </div>
  );
};
