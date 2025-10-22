'use client';

import './styles/globals.css'
import AccessibleControls from '../components/AccessibleControls'
import VideoAcessivel from '../components/VideoAcessivel'
import ContactForm from '../components/ContactForm'
import ReadAloudButton from '../components/ReadAloudButton'
import { AudioDescriptionContext } from '../components/AudioDescriptionContext'
import cfg from '../content/config.json'
import { useState } from 'react'

export default function Page() {
  const [adEnabled, setAdEnabled] = useState(false);

  return (
    <AudioDescriptionContext.Provider value={{ enabled: adEnabled, toggle: () => setAdEnabled(v => !v) }}>
      <a className="skip-link" href="#conteudo">Ir para o conteúdo principal</a>

      {/* ===== Cabeçalho discreto (mesmo conteúdo, visual minimalista) ===== */}
      <header role="banner" aria-label="Cabeçalho do site" className="quiet-header">
        <div className="wrap quiet-wrap">
          <a className="brand-min" href="#conteudo">
            <span className="visually-hidden">Ir ao conteúdo</span>
            <span className="dot-min" aria-hidden></span>
            <strong className="site-name">{cfg.nome}</strong>
          </a>

          <nav aria-label="Seções do site" className="quiet-nav">
            <a href="#sobre">Sobre</a>
            <a href="#projetos">Projetos</a>
            <a href="#video">Vídeo</a>
            <a href="#contato">Contato</a>
          </nav>

          {/* Botão global (ícone discreto) para ativar/desativar audiodescrição */}
          <button
            onClick={() => setAdEnabled(v => !v)}
            aria-pressed={adEnabled}
            className="icon-btn"
            title={adEnabled ? 'Audiodescrição ativada' : 'Ativar audiodescrição'}
          >
            <span className="visually-hidden">
              {adEnabled ? 'Desativar audiodescrição' : 'Ativar audiodescrição'}
            </span>
            {adEnabled ? '🔊' : '🔇'}
          </button>

          {/* Seus controles de acessibilidade continuam aqui */}
          <AccessibleControls />
        </div>
      </header>

      {/* ===== HERO (destaque) ===== */}
      <section className="hero" aria-label="Apresentação">
        <div className="card">
          <h2>Olá! Sou {cfg.nome}</h2>
          <p className="muted">{cfg.resumo}</p>
        </div>
      </section>

      <main id="conteudo" role="main">
        {/* ===== SOBRE ===== */}
        <section id="sobre" className="card" aria-labelledby="h-sobre">
          <div className="section-title">
            <span className="bar" aria-hidden></span>
            <h2 id="h-sobre" style={{display:'inline'}}>Sobre mim</h2>{' '}
            <ReadAloudButton targetId="sobre" label="Ouvir a seção Sobre" />
          </div>

          <p>
            Local: <strong>{cfg.local}</strong><br />
            <span className="muted">{cfg.resumo}</span>
          </p>
          <ul>
            <li>Navegação por teclado (foco visível)</li>
            <li>Alto contraste, ajuste de fonte, redução de movimento</li>
            <li>Vídeo com legendas, descrições e transcrição</li>
          </ul>
        </section>

        {/* ===== PROJETOS ===== */}
        <section id="projetos" className="card" aria-labelledby="h-projetos">
          <div className="section-title">
            <span className="bar" aria-hidden></span>
            <h2 id="h-projetos" style={{display:'inline'}}>Projetos</h2>{' '}
            <ReadAloudButton targetId="projetos" label="Ouvir a seção Projetos" />
          </div>

          <div className="grid">
            {cfg.projetos.map((p, i) => (
              <article key={i} className="card proj" aria-labelledby={`p-${i}`}>
                <h3 id={`p-${i}`}>{p.nome}</h3>
                <p className="muted">{p.descricao}</p>
                {p.link ? <a href={p.link} target="_blank" rel="noopener">ver projeto</a> : null}
              </article>
            ))}
          </div>
        </section>

        {/* ===== VÍDEO ===== */}
        <section id="video" className="card" aria-labelledby="h-video">
          <div className="section-title">
            <span className="bar" aria-hidden></span>
            <h2 id="h-video" style={{display:'inline'}}>Mensagem Motivacional</h2>{' '}
            {/* Lê um resumo acessível da seção (mais útil que ler o DOM do player) */}
            <ReadAloudButton
              label="Ouvir descrição do vídeo"
              text="Seção de vídeo motivacional com acessibilidade. Use o botão global de audiodescrição no topo para habilitar a narração automática durante a reprodução. As legendas ficam disponíveis no botão de legendas do player."
            />
          </div>

          <VideoAcessivel
            src="/meu-video.mp4"
            // poster="/thumb-do-video.jpg" // opcional se tiver miniatura em /public
            tracks={{ subs: "/legendas-video.vtt", desc: "/descricoes-video.vtt" }}
          />

          <details>
            <summary>Transcrição completa</summary>
            <p>
              A tecnologia transforma o mundo todos os dias. Mas o que realmente muda as coisas são as pessoas
              que têm coragem de começar. Se você sonha em entrar na área da computação, não espere estar pronto.
              Dê o primeiro passo — estude, experimente, erre e aprenda. Cada linha de código que você escreve
              é uma nova chance de criar algo que nunca existiu. A computação é um convite pra imaginar,
              construir e inspirar. E o futuro? O futuro começa agora — com você.
            </p>
          </details>
        </section>

        {/* ===== CONTATO ===== */}
        <section id="contato" className="card" aria-labelledby="h-contato">
          <div className="section-title">
            <span className="bar" aria-hidden></span>
            <h2 id="h-contato" style={{display:'inline'}}>Contato</h2>{' '}
            <ReadAloudButton targetId="contato" label="Ouvir a seção Contato" />
          </div>

          <address className="muted">
            <div>E-mail: <a href={`mailto:${cfg.email}`}>{cfg.email}</a></div>
            <div>LinkedIn: <a href={cfg.linkedin}>{cfg.linkedin}</a></div>
            <div>GitHub: <a href={cfg.github}>{cfg.github}</a></div>
          </address>

          <ContactForm />
        </section>
      </main>

      <footer role="contentinfo">
        <div className="wrap" style={{display:'flex',justifyContent:'center'}}>
          <p>© {new Date().getFullYear()} {cfg.nome}. Feito com Next.js.</p>
        </div>
      </footer>
    </AudioDescriptionContext.Provider>
  )
}
