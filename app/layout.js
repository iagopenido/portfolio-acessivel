export const metadata = {
  title: "Meu Portfólio Acessível",
  description: "Site dinâmico acessível com recursos para pessoas com deficiência visual e auditiva.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1}"/>
      </head>
      <body>{children}</body>
    </html>
  );
}
