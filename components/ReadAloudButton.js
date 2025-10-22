'use client';

import { useEffect, useRef, useState, useContext } from 'react';
import { AudioDescriptionContext } from './AudioDescriptionContext';

function pickPtBRVoice() {
  const voices = window.speechSynthesis?.getVoices?.() || [];
  return voices.find(v => /pt[-_]?BR/i.test(v.lang)) || voices.find(v => /pt/i.test(v.lang)) || null;
}

export default function ReadAloudButton({ targetId, text, label = 'Ouvir esta seção', rate = 1.0, pitch = 1.0 }) {
  const { enabled } = useContext(AudioDescriptionContext);
  const [speaking, setSpeaking] = useState(false);
  const [supported, setSupported] = useState(true);
  const liveRef = useRef(null);

  useEffect(() => {
    if (!('speechSynthesis' in window) || !('SpeechSynthesisUtterance' in window)) setSupported(false);
  }, []);

  const getTextToSpeak = () => {
    if (text && text.trim()) return text.trim();
    const el = targetId ? document.getElementById(targetId) : null;
    return el ? (el.innerText || el.textContent || '').trim() : '';
  };

  const speak = () => {
    const content = getTextToSpeak();
    if (!content) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(content);
    const v = pickPtBRVoice();
    if (v) u.voice = v;
    u.lang = v?.lang || 'pt-BR';
    u.rate = rate;
    u.pitch = pitch;
    u.onstart = () => setSpeaking(true);
    u.onend = () => setSpeaking(false);
    u.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(u);
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setSpeaking(false);
  };

  if (!supported) return null;

  const disabledStyle = { opacity: .6, cursor: 'not-allowed' };

  return (
    <div style={{ display: 'inline-flex', gap: '.5rem', alignItems: 'center' }}>
      {!speaking ? (
        <button
          onClick={enabled ? speak : undefined}
          aria-label={enabled ? label : 'Audiodescrição desativada'}
          title={enabled ? label : 'Ative a audiodescrição no topo do site'}
          disabled={!enabled}
          style={!enabled ? disabledStyle : undefined}
        >
          {enabled ? '🔊 ' + label : '🔇 Audiodescrição desativada'}
        </button>
      ) : (
        <button onClick={stop} aria-label="Parar leitura" title="Parar leitura">
          ⏹️ Parar
        </button>
      )}
      <span ref={liveRef} aria-live="polite" style={{ position: 'absolute', left: '-9999px' }} />
    </div>
  );
}
