'use client';

import { useEffect, useState } from 'react';

const clamp = (n, min, max) => Math.min(Math.max(n, min), max);

export default function AccessibleControls() {
  const [contrast, setContrast] = useState(false);
  const [fontSize, setFontSize] = useState(18);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(false);

  // Carrega preferências salvas
  useEffect(() => {
    try {
      const st = JSON.parse(localStorage.getItem('a11y') || '{}');
      if (typeof st.contrast === 'boolean') setContrast(st.contrast);
      if (typeof st.fontSize === 'number') setFontSize(st.fontSize);
      if (typeof st.reducedMotion === 'boolean') setReducedMotion(st.reducedMotion);
      if (typeof st.ttsEnabled === 'boolean') setTtsEnabled(st.ttsEnabled);
    } catch {}
  }, []);

  // Aplica preferências e salva
  useEffect(() => {
    document.body.classList.toggle('high-contrast', contrast);
    document.body.classList.toggle('no-motion', reducedMotion);
    document.documentElement.style.setProperty('--fs', fontSize + 'px');
    try {
      localStorage.setItem('a11y', JSON.stringify({ contrast, fontSize, reducedMotion, ttsEnabled }));
    } catch {}
  }, [contrast, fontSize, reducedMotion, ttsEnabled]);

  // Atalhos de teclado (+ / - / C)
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === '+') setFontSize(v => clamp(v + 1, 14, 28));
      if (e.key === '-') setFontSize(v => clamp(v - 1, 14, 28));
      if (e.key.toLowerCase() === 'c') setContrast(v => !v);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Exponha o estado do TTS por um elemento com id fixo para o VideoAcessivel
  useEffect(() => {
    const el = document.getElementById('toggle-tts');
    if (el) el.setAttribute('aria-pressed', String(ttsEnabled));
  }, [ttsEnabled]);

  return (
    <div className="controls" role="group" aria-label="Controles de acessibilidade">
      <button onClick={() => setContrast(v => !v)} aria-pressed={contrast}>
        {contrast ? 'Desativar alto contraste (C)' : 'Ativar alto contraste (C)'}
      </button>

      <div aria-label="Ajuste de fonte" style={{display:'flex',alignItems:'center',gap:'.4rem',flexWrap:'wrap'}}>
        <button onClick={() => setFontSize(v => clamp(v - 1, 14, 28))} aria-label="Diminuir fonte">−</button>
        <input
          type="range"
          min="14"
          max="28"
          value={fontSize}
          onChange={(e)=>setFontSize(clamp(parseInt(e.target.value,10)||18,14,28))}
          aria-valuemin={14}
          aria-valuemax={28}
          aria-valuenow={fontSize}
          aria-label="Tamanho da fonte"
          style={{width:'140px'}}
        />
        <span aria-live="polite">Tamanho: {fontSize}px</span>
        <button onClick={() => setFontSize(v => clamp(v + 1, 14, 28))} aria-label="Aumentar fonte">+</button>
      </div>

      <button onClick={() => setReducedMotion(v => !v)} aria-pressed={reducedMotion}>
        {reducedMotion ? 'Reativar animações' : 'Reduzir movimentos'}
      </button>

      {/* Botão-ponte para o VideoAcessivel ler o estado do TTS */}
      <button id="toggle-tts" onClick={() => setTtsEnabled(v => !v)} aria-pressed={ttsEnabled}>
        {ttsEnabled ? 'Desativar audiodescrição (TTS)' : 'Ativar audiodescrição (TTS)'}
      </button>
    </div>
  );
}
