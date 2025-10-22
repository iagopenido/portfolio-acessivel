export async function GET() {
  return new Response(JSON.stringify({ ok: true, message: 'pong', when: new Date().toISOString() }), {
    headers: { 'content-type': 'application/json' }
  });
}
