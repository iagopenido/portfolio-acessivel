'use client';

export default function ContactForm() {
  const onSubmit = (e) => {
    e.preventDefault();
    alert('Mensagem enviada (exemplo)!');
  };

  return (
    <form onSubmit={onSubmit} aria-label="Formulário de contato">
      <label htmlFor="nome">Nome</label>
      <input id="nome" name="nome" required aria-required="true" />

      <label htmlFor="mensagem">Mensagem</label>
      <textarea id="mensagem" name="mensagem" rows={4} required aria-required="true"></textarea>

      <div style={{marginTop:'.7rem', display:'flex', gap:'.5rem', flexWrap:'wrap'}}>
        <button type="submit">Enviar</button>
        <a href="mailto:" onClick={(e)=>{ /* só estilo */ }} role="button" style={{
          padding:'.6rem .9rem', borderRadius:'.7rem', border:'1px solid rgba(255,255,255,.18)',
          background:'transparent', color:'inherit', textDecoration:'none'
        }}>Ou enviar por e-mail</a>
      </div>
    </form>
  );
}
