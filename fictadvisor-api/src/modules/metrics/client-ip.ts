// The API sits behind a reverse proxy (nginx) behind Cloudflare, so `req.ip`
// is the proxy address. The first hop of X-Forwarded-For is the real client:
// for direct browser->CF->API calls CF sets it, and for Next.js SSR calls the
// web app forwards the visitor's IP into it on purpose (see web instance.ts).
// Falls back to CF-Connecting-IP, then the socket, when XFF is absent.
export function clientIp (req: any): string | undefined {
  const forwarded = req.headers?.['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length) {
    return forwarded.split(',')[0].trim();
  }
  if (Array.isArray(forwarded) && forwarded.length) {
    return forwarded[0];
  }
  const cfIp = req.headers?.['cf-connecting-ip'];
  if (typeof cfIp === 'string' && cfIp.length) {
    return cfIp;
  }
  return req.ip ?? req.socket?.remoteAddress;
}
