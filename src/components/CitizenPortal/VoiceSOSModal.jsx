import React, { useState, useEffect } from 'react';
import { useEmergency } from '../../context/EmergencyContext';
import { Mic, MicOff, Volume2, X, AlertCircle, CheckCircle } from 'lucide-react';

export const VoiceSOSModal = ({ onClose }) => {
  const { triggerSOS, speakAlert } = useEmergency();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [statusMsg, setStatusMsg] = useState('Click microphone or say "HELP" / "EMERGENCY"');

  useEffect(() => {
    let recognition = null;
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onresult = (event) => {
        const text = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        setTranscript(text);

        if (text.toLowerCase().includes('help') || text.toLowerCase().includes('emergency') || text.toLowerCase().includes('save')) {
          setStatusMsg("VOICE KEYWORD DETECTED! TRANSMITTING SOS...");
          triggerSOS({ name: "Voice SOS Triggered Citizen", medicalConditions: `Voice Command: "${text}"` });
          setIsListening(false);
        }
      };

      recognition.onerror = () => {
        setStatusMsg("Microphone access limited. Use tap button below.");
        setIsListening(false);
      };
    }
  }, [triggerSOS]);

  const toggleListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setStatusMsg("Listening for voice commands ('Help', 'Emergency', 'Rescue')...");
      speakAlert("Voice recognition active. Speak help or emergency now.");
    }
  };

  const handleManualVoiceSOS = () => {
    triggerSOS({ name: "Voice Assistance SOS", medicalConditions: "Visually impaired / Voice trigger activated" });
    onClose();
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
        maxWidth: '480px',
        width: '100%',
        padding: '2rem',
        textAlign: 'center'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>🎙️ VOICE-ACTIVATED SOS</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
            <X size={24} />
          </button>
        </div>

        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
          Hands-free emergency trigger designed for visually impaired citizens or trapped persons who cannot type.
        </p>

        <div style={{ margin: '2rem 0' }}>
          <button
            onClick={toggleListening}
            style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              background: isListening ? 'linear-gradient(135deg, #ef4444, #b91c1c)' : 'rgba(56, 189, 248, 0.2)',
              border: isListening ? '3px solid #fca5a5' : '2px solid #38bdf8',
              boxShadow: isListening ? '0 0 35px rgba(239, 68, 68, 0.6)' : '0 0 20px rgba(56, 189, 248, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto',
              cursor: 'pointer',
              transition: 'var(--transition)'
            }}
          >
            {isListening ? <Mic size={44} color="#fff" /> : <MicOff size={44} color="#38bdf8" />}
          </button>
        </div>

        <p style={{ fontSize: '0.9rem', fontWeight: 700, color: isListening ? '#fca5a5' : '#38bdf8', marginBottom: '1rem' }}>
          {statusMsg}
        </p>

        {transcript && (
          <div style={{ background: 'rgba(0,0,0,0.5)', padding: '0.75rem', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
            Detected Speech: <em>"{transcript}"</em>
          </div>
        )}

        <button
          onClick={handleManualVoiceSOS}
          className="btn btn-emergency"
          style={{ width: '100%', fontSize: '1.1rem', padding: '1rem' }}
        >
          <Volume2 size={22} /> ONE-TAP VOICE SOS DISPATCH
        </button>
      </div>
    </div>
  );
};
