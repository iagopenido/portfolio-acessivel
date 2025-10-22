import cfg from '../../content/config.json'
export async function GET() {
  return new Response(JSON.stringify(cfg), { headers: { 'content-type': 'application/json' } });
}
