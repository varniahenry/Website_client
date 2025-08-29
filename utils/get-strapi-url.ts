export function getStrapiURL() {
  return process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4200';
}
