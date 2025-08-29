export function getStrapiURL() {
  return process.env.STRAPI_PUBLIC_API_URL ?? 'http://localhost:4200';
}
