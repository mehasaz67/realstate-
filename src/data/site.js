import { agents } from './properties'

export const brand = {
  name: 'Horizon Properties',
  phone: '+1 (555) 246-7890',
  phoneHref: 'tel:+15552467890',
  email: 'hello@horizonproperties.com',
  address: '1200 Westlake Avenue, Suite 400, Austin, TX 78701',
  hours: 'Mon – Sat · 9:00 – 18:00',
}

export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Properties', to: '/properties' },
  { label: 'About Us', to: '/#about' },
  { label: 'Services', to: '/#services' },
  { label: 'Team', to: '/#team' },
  { label: 'Contact', to: '/contact' },
]

export const services = [
  {
    title: 'Luxury Home Sales',
    description:
      'Discreet representation for buyers and sellers of architecturally significant homes, from first viewing to closing.',
  },
  {
    title: 'Property Investment',
    description:
      'Acquisition strategy for private clients and family offices, grounded in location research and long-term yield.',
  },
  {
    title: 'Property Marketing',
    description:
      'Editorial photography, film and targeted campaigns that present a residence the way it deserves to be seen.',
  },
  {
    title: 'Real Estate Advisory',
    description:
      'Independent guidance on portfolio structure, timing and the trade-offs behind every significant decision.',
  },
  {
    title: 'Property Valuation',
    description:
      'Evidence-based valuations for sale, purchase or estate planning, supported by comparable market analysis.',
  },
  {
    title: 'Relocation Services',
    description:
      'Neighbourhood orientation, school research and settlement support for clients moving from another city or country.',
  },
]

export const advantages = [
  {
    title: 'Curated, not listed',
    description:
      'Every residence we represent is selected for architecture, setting and long-term value — never for volume.',
  },
  {
    title: 'Local expertise, quietly held',
    description:
      'Two decades of transaction history in the neighbourhoods we work in, and the perspective to price them honestly.',
  },
  {
    title: 'One advisor, start to finish',
    description:
      'A single senior advisor leads your search or sale, with legal, finance and marketing support in the background.',
  },
]

export const stats = [
  { value: '18', label: 'Years advising' },
  { value: '$2.4B', label: 'Property transacted' },
  { value: '640+', label: 'Residences placed' },
  { value: '98%', label: 'Client satisfaction' },
]

export const team = agents

export const aboutImages = {
  main: 'photo-1600047509807-ba8f99d2cdde',
  gallery: [
    'photo-1600585154340-be6161a56a0c',
    'photo-1600607687920-4e2a09cf159d',
    'photo-1600121848594-d8644e57abab',
  ],
}

export const heroImage = 'photo-1613490493576-7fde63acd811'

export const testimonial = {
  quote:
    'Horizon found us a house we had walked past a dozen times and never seen. The whole process felt calm, considered and completely unhurried.',
  name: 'Claire & Thomas Meyer',
  detail: 'Purchased in Westlake Hills, 2024',
}
