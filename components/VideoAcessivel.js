'use client';

import { useEffect, useRef, useContext } from 'react';
import { AudioDescriptionContext } from './AudioDescriptionContext';

export default function VideoAcessivel({
  src = "/meu-video.mp4",
  poster = "",
  tracks = { subs: "/legendas-video.vtt", desc: "/descricoes-video.vtt" },
}) {
  const videoRef = useRef(null);
  const { enabled } = useContext(AudioDescriptionContext);

  useEffect(() => {
    const btn = document.getElementById('toggle-tts'); // botão de TTS nos controles A11y (se existir)
    const video = videoRef.current;
    if (!video) return;

    const speak = (text) => {
      try {
        if (!('speechSynthesis' in window)) return;
        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'pt-BR';
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(u);
      } catch {}
    };

    const onPlay = () => {
      const pressed = btn?.getAttribute('aria-pressed') === 'true';
      if (enabled && pressed) speak('Início do vídeo. Audiodescrição ativada.');
    };

    let lastSpoken = -1;
    const onTime = () => {
      const pressed = btn?.getAttribute('aria-pressed') === 'true';
      if (!enabled || !pressed) return; // só narra se global e local estiverem ativos
      const t = Math.floor(video.currentTime);
      if (t >= 0 && lastSpoken < 0)  { speak('Cenário inicial com elementos de tecnologia.'); lastSpoken = 0; }
      if (t >= 6 && lastSpoken < 6)  { speak('Imagens de código e servidores em destaque.');  lastSpoken = 6; }
      if (t >= 12 && lastSpoken < 12){ speak('Texto motivacional aparece na tela.');         lastSpoken = 12; }
    };

    video.addEventListener('play', onPlay);
    video.addEventListener('timeupdate', onTime);
    return () => {
      video.removeEventListener('play', onPlay);
      video.removeEventListener('timeupdate', onTime);
    };
  }, [enabled]);

  return (
    <figure aria-describedby="cap-video">
      <video
        ref={videoRef}
        controls
        preload="metadata"
        playsInline
        crossOrigin="anonymous"
        poster={poster || undefined}
        aria-label="Vídeo acessível com legendas e audiodescrição"
        style={{ width: '100%' }}
      >
        <source src={src} type="video/mp4" />
        <track label="Português (legendas)" kind="subtitles" srcLang="pt-BR" src={tracks.subs} default />
        <track label="Português (descrições)" kind="descriptions" srcLang="pt-BR" src={tracks.desc} />
        Seu navegador não suporta vídeo.
      </video>
      <figcaption id="cap-video" className="muted">
        Vídeo com <strong>legendas</strong> e <strong>audiodescrição</strong>. Ative a audiodescrição no topo do site para habilitar a narração.
      </figcaption>
    </figure>
  );
}
