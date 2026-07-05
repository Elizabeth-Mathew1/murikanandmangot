export const SITE = {
  name: 'Murikan & Mangot',
  tagline: 'Advocates & Legal Consultants',
  location: 'Ernakulam, Kochi, Kerala',
  url: 'https://murikanmangot.in',
  phone: '+91 484 XXX XXXX',
  email: 'contact@murikanmangot.com',
  address: {
    line1: '[Office Address]',
    line2: 'Ernakulam, Kochi 682 0XX',
    region: 'Kerala, India',
  },
  hours: 'Mon – Sat · 9:30 AM – 6:00 PM',
  bciDisclaimer:
    'In keeping with Bar Council of India rules, this site is for information only and is not an advertisement or solicitation.',
  geo: {
    latitude: '9.9816',
    longitude: '76.2999',
  },
} as const;

export const NAV_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Practice Areas', href: '/practice-areas/property-and-land' },
  { label: 'People', href: '/people' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' },
] as const;

export const FOOTER_LINKS = [
  { label: 'About the Firm', href: '/about' },
  { label: 'Practice Areas', href: '/practice-areas/property-and-land' },
  { label: 'Our People', href: '/people' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' },
] as const;

export const DEFAULT_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  name: SITE.name,
  description: 'Law firm in Ernakulam, Kochi, Kerala',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Ernakulam',
    addressRegion: 'Kerala',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: SITE.geo.latitude,
    longitude: SITE.geo.longitude,
  },
  areaServed: 'Kerala, India',
  telephone: SITE.phone,
  url: SITE.url,
};
