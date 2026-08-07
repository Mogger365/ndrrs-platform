import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { EmergencyProvider, useEmergency } from './context/EmergencyContext';
import { Navbar } from './components/Navbar';
import { EmergencyHero } from './components/CitizenPortal/EmergencyHero';
import { AdminDashboard } from './components/AdminPortal/AdminDashboard';

// Modals
import { SOSModal } from './components/CitizenPortal/SOSModal';
import { VoiceSOSModal } from './components/CitizenPortal/VoiceSOSModal';
import { FamilyTracker } from './components/CitizenPortal/FamilyTracker';
import { ShelterFinder } from './components/CitizenPortal/ShelterFinder';
import { MissingPersonHub } from './components/CitizenPortal/MissingPersonHub';
import { DamageReportModal } from './components/CitizenPortal/DamageReportModal';
import { MedicalProfileModal } from './components/CitizenPortal/MedicalProfileModal';
import { TeamDispatchModal } from './components/AdminPortal/TeamDispatchModal';

import { Phone, Shield, Radio, HeartPulse, LifeBuoy } from 'lucide-react';

const MainLayout = () => {
  const { portal } = useEmergency();
  const [activeModal, setActiveModal] = useState(null); // 'sos' | 'voice-sos' | 'family' | 'shelters' | 'missing' | 'damage' | 'medical' | 'dispatch'
  const [dispatchTargetVictim, setDispatchTargetVictim] = useState(null);

  const handleOpenDispatch = (victim) => {
    setDispatchTargetVictim(victim);
    setActiveModal('dispatch');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main style={{ flex: 1, paddingBottom: portal === 'admin' ? '85px' : '0px' }}>
        {portal === 'citizen' ? (
          <EmergencyHero onOpenModal={(modalName) => setActiveModal(modalName)} />
        ) : (
          <AdminDashboard onOpenDispatch={handleOpenDispatch} />
        )}
      </main>

      {/* Render Modals */}
      {activeModal === 'sos' && <SOSModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'voice-sos' && <VoiceSOSModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'family' && <FamilyTracker onClose={() => setActiveModal(null)} />}
      {activeModal === 'shelters' && <ShelterFinder onClose={() => setActiveModal(null)} />}
      {activeModal === 'missing' && <MissingPersonHub onClose={() => setActiveModal(null)} />}
      {activeModal === 'damage' && <DamageReportModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'medical' && <MedicalProfileModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'dispatch' && dispatchTargetVictim && (
        <TeamDispatchModal victim={dispatchTargetVictim} onClose={() => setActiveModal(null)} />
      )}

      {/* National Emergency Hotline Footer */}
      <footer style={{
        background: 'rgba(11, 15, 25, 0.95)',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '1.25rem 1.5rem',
        marginTop: '2rem',
        fontSize: '0.82rem',
        color: 'var(--text-secondary)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <strong style={{ color: '#f8fafc', fontSize: '0.9rem' }}>
              NATIONAL DISASTER RESPONSE AND RESCUE SYSTEM (NDRRS) INDIA
            </strong>
            <p style={{ marginTop: '0.2rem', color: 'var(--text-muted)' }}>
              In collaboration with NDRF, SDMA, India Meteorological Department (IMD) & Ministry of Home Affairs.
            </p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
            <div style={{ background: 'rgba(239, 68, 68, 0.15)', padding: '0.4rem 0.75rem', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#fca5a5', fontWeight: 800 }}>
              📞 National Emergency: 112
            </div>
            <div style={{ background: 'rgba(2, 132, 199, 0.15)', padding: '0.4rem 0.75rem', borderRadius: '8px', border: '1px solid rgba(2, 132, 199, 0.3)', color: '#38bdf8', fontWeight: 800 }}>
              🚁 NDRF Control: 1070
            </div>
            <div style={{ background: 'rgba(16, 185, 129, 0.15)', padding: '0.4rem 0.75rem', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.3)', color: '#6ee7b7', fontWeight: 800 }}>
              🚑 Medical Helpline: 108
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <EmergencyProvider>
        <MainLayout />
      </EmergencyProvider>
    </LanguageProvider>
  );
}
