# Meu Portfólio Acessível (do zero)

Atende à tarefa:
- **Sítio Dinâmico** com **código ativo** (rotas de API `/api/ping` e `/api/profile`).
- **Acessibilidade** para deficiência visual e auditiva (WCAG):
  - HTML semântico, *skip link*, foco visível, teclado.
  - **Alto contraste**, **ajuste de fonte**, **redução de movimento**.
  - **Audiodescrição via TTS** (Web Speech API).
  - Vídeo com **legendas (VTT)**, **descrições (VTT)** e **transcrição**.

## Personalização
Edite `content/config.json` (nome, resumo, e-mail, links e projetos).

## Rodar local
```bash
npm install
npm run dev
```

## Publicar (GitHub + Vercel)
1. Suba os arquivos para um repositório GitHub.
2. Na Vercel, crie um novo projeto a partir do repo.
3. Copie a URL pública e entregue na tarefa.
