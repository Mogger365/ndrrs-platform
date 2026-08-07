import React from 'react';
import { useEmergency } from '../context/EmergencyContext';
import { useLanguage } from '../context/LanguageContext';
import { Shield, ShieldAlert, Globe, Wifi, WifiOff, Activity, LifeBuoy } from 'lucide-react';

export const Navbar = () => {
  const {
    portal, setPortal,
    theme, setTheme,
    adminRole, setAdminRole,
    isOnline, batteryLevel
  } = useEmergency();
  const { language, setLanguage } = useLanguage();

  const isAdmin = portal === 'admin';

  return (
    <nav style={{
      background: 'rgba(11, 15, 25, 0.96)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderTop: isAdmin ? '1px solid rgba(255, 255, 255, 0.12)' : 'none',
      borderBottom: isAdmin ? 'none' : '1px solid rgba(255, 255, 255, 0.08)',
      padding: '0.75rem 1.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: isAdmin ? 'fixed' : 'sticky',
      bottom: isAdmin ? 0 : 'auto',
      top: isAdmin ? 'auto' : 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      boxShadow: isAdmin ? '0 -8px 30px rgba(0, 0, 0, 0.6)' : 'none'
    }}>
      {/* Brand & Emblem */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
        <div style={{
          width: '42px',
          height: '42px',
          borderRadius: '10px',
          background: 'linear-gradient(135deg, #0284c7, #0f172a)',
          border: '1.5px solid rgba(56, 189, 248, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 15px rgba(2, 132, 199, 0.3)'
        }}>
          <Shield size={24} color="#38bdf8" />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 800, background: 'linear-gradient(90deg, #38bdf8, #f8fafc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              NDRRS INDIA
            </h1>
            <span className="badge badge-green" style={{ fontSize: '0.65rem' }}>
              <Activity size={12} /> GOVT DISASTER NETWORK
            </span>
          </div>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
            Ministry of Home Affairs • Disaster Telemetry
          </p>
        </div>
      </div>

      {/* Dual Portal Switcher - ONLY SHOWN IN ADMIN PORTAL */}
      {isAdmin && (
        <div style={{
          display: 'flex',
          background: 'rgba(255, 255, 255, 0.05)',
          padding: '0.25rem',
          borderRadius: '10px',
          border: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          <button
            onClick={() => setPortal('citizen')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.45rem 1rem',
              borderRadius: '8px',
              fontSize: '0.88rem',
              fontWeight: 700,
              cursor: 'pointer',
              border: 'none',
              transition: 'var(--transition)',
              background: 'transparent',
              color: 'var(--text-secondary)'
            }}
          >
            <LifeBuoy size={16} /> Exit to Citizen View
          </button>

          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.45rem 1rem',
              borderRadius: '8px',
              fontSize: '0.88rem',
              fontWeight: 700,
              cursor: 'default',
              border: 'none',
              background: 'linear-gradient(135deg, #dc2626, #991b1b)',
              color: '#fff'
            }}
          >
            <ShieldAlert size={16} /> Admin Command Portal
          </button>
        </div>
      )}

      {/* Right Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
        {/* Hidden Admin Access Button for Citizens */}
        {!isAdmin && (
          <button
            onClick={() => {
              const pwd = prompt("Enter Admin Password:");
              if (pwd === "nrcm123") {
                setPortal('admin');
              } else if (pwd !== null) {
                alert("Incorrect password.");
              }
            }}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.4rem',
              borderRadius: '50%',
            }}
            title="Admin Login"
          >
            <ShieldAlert size={16} />
          </button>
        )}

        {/* Admin Role Selector (Admin Portal Only) */}
        {isAdmin && (
          <select
            value={adminRole}
            onChange={(e) => setAdminRole(e.target.value)}
            style={{
              padding: '0.45rem 0.75rem',
              borderRadius: '8px',
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#fca5a5',
              fontSize: '0.82rem',
              fontWeight: 700,
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="collector">Role: District Collector</option>
            <option value="ndrf">Role: NDRF Commander</option>
            <option value="sdrf">Role: SDRF Unit</option>
            <option value="police">Role: Police Control Room</option>
            <option value="fire">Role: Fire & Rescue</option>
            <option value="ambulance">Role: Medical Ambulance</option>
            <option value="volunteer">Role: Verified Volunteer</option>
          </select>
        )}

        {/* Language Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <Globe size={16} color="var(--text-secondary)" />
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            style={{
              padding: '0.4rem 0.6rem',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid var(--bg-card-border)',
              color: 'var(--text-primary)',
              fontSize: '0.82rem',
              fontWeight: 600,
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="en">English</option>
            <option value="hi">हिंदी (Hindi)</option>
            <option value="te">తెలుగు (Telugu)</option>
          </select>
        </div>

        {/* Theme Selector (Admin Portal Only) */}
        {isAdmin && (
          <select
            value={theme}
            onChange={(e) => {
              setTheme(e.target.value);
              document.documentElement.setAttribute('data-theme', e.target.value);
            }}
            style={{
              padding: '0.4rem 0.6rem',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid var(--bg-card-border)',
              color: 'var(--text-primary)',
              fontSize: '0.82rem',
              fontWeight: 600,
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="dark">🌙 Dark Mode</option>
            <option value="light">☀️ Light Mode</option>
            <option value="low-bandwidth">⚡ Low Bandwidth</option>
          </select>
        )}

        {/* Connection & Telemetry Status */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          padding: '0.35rem 0.65rem',
          borderRadius: '20px',
          background: isOnline ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
          border: isOnline ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)',
          fontSize: '0.78rem',
          fontWeight: 700,
          color: isOnline ? '#6ee7b7' : '#fca5a5'
        }}>
          {isOnline ? <Wifi size={14} /> : <WifiOff size={14} />}
          <span>{isOnline ? `Govt Network (${batteryLevel}%)` : `Offline Sync`}</span>
        </div>
      </div>
    </nav>
  );
};
