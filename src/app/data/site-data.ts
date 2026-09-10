export interface Service {
  icon: string;
  title: string;
  description: string;
  features: string[];
}

export interface Project {
  title: string;
  category: string;
  client: string;
  location: string;
  year: string;
  description: string;
  gradient: string;
}

export const COMPANY = {
  name: 'STAR-BTP',
  tagline: 'La qualité au meilleur prix',
  rc: 'SN.DKR.2020.A.281',
  ninea: '007726451',
  bank: 'SN 251209258001',
  address: 'Cité ASECNA, Immeuble en face Clinique NABY, 1er Étage — Rufisque, Dakar',
  phones: ['+221 77 228 96 69', '+221 77 409 67 17'],
  email: 'startbtp1503@gmail.com',
  hours: 'Lundi – Samedi, 8h – 18h',
};

export const NAV_ITEMS = [
  { name: 'Accueil', path: '/' },
  { name: 'À propos', path: '/a-propos' },
  { name: 'Services', path: '/services' },
  { name: 'Projets', path: '/projets' },
  { name: 'Partenaires', path: '/partenaires' },
  { name: 'Carrières', path: '/carrieres' },
  { name: 'Contact', path: '/contact' },
];

export const STATS = [
  { value: '20+', label: 'Projets réalisés' },
  { value: '10', label: "Cadres d'encadrement" },
  { value: '2020', label: 'Année de création' },
  { value: '8', label: "Domaines d'expertise" },
];

export const SERVICES: Service[] = [
  {
    icon: '🏗️',
    title: 'Gros œuvre',
    description: 'Fondations, ossatures et structures béton armé pour bâtiments résidentiels, publics et commerciaux.',
    features: [
      'Fondations superficielles et profondes',
      'Ossatures et structures béton armé',
      'Maçonnerie et élévation',
      'Dallage industriel',
    ],
  },
  {
    icon: '🏠',
    title: 'Second œuvre',
    description: 'Cloisons, revêtements, menuiserie, peinture et finitions pour donner vie à vos espaces.',
    features: [
      'Cloisonnement et faux plafonds',
      'Revêtements sols et murs',
      'Menuiserie bois, alu et métallique',
      'Peinture et finitions',
    ],
  },
  {
    icon: '⚡',
    title: 'Lot technique',
    description: 'Électricité, plomberie, climatisation et installations techniques pour un confort optimal.',
    features: [
      'Installations électriques BT',
      'Plomberie sanitaire',
      'Climatisation et ventilation',
      'Maintenance et support technique',
    ],
  },
  {
    icon: '💧',
    title: 'Assainissement',
    description: "Réseaux d'évacuation, fosses septiques, stations de relevage et traitement des eaux usées.",
    features: [
      "Réseaux d'évacuation eaux usées et pluviales",
      'Fosses septiques et bacs à graisse',
      'Stations de relevage',
      'Curage de canalisations',
    ],
  },
  {
    icon: '🚜',
    title: 'Terrassement',
    description: 'Préparation de terrain, nivellement, excavation et travaux de fondation pour tout type de projet.',
    features: [
      'Décapage et nivellement',
      'Excavation et remblais',
      'Aménagements extérieurs',
      'Plateformes et pistes',
    ],
  },
  {
    icon: '🚰',
    title: 'AEP',
    description: "Adduction d'eau potable : conception, pose de canalisations et raccordements aux réseaux.",
    features: [
      "Réseaux d'eau potable",
      'Pose de canalisations',
      'Raccordements et branchements',
      'Ouvrages de stockage',
    ],
  },
  {
    icon: '🛣️',
    title: 'VRD',
    description: 'Voirie et réseaux divers : routes, trottoirs, réseaux souterrains et aménagements urbains.',
    features: [
      'Voiries et pistes',
      'Bordures et pavage',
      'Réseaux souterrains',
      'Aménagements urbains',
    ],
  },
  {
    icon: '📐',
    title: 'Études & conseil',
    description: "Études techniques, topographie, suivi de chantier et conseils d'experts pour sécuriser vos investissements.",
    features: [
      'Études structurelles et architecturales',
      'Études topographiques et implantation',
      'Suivi et organisation de chantier',
      'Accessibilité PMR et sécurité',
    ],
  },
];

const G = {
  a: 'linear-gradient(135deg,#0a2a66,#1e4db7)',
  b: 'linear-gradient(135deg,#1e4db7,#3a7bd5)',
  c: 'linear-gradient(135deg,#0a2a66,#3a7bd5)',
  d: 'linear-gradient(135deg,#1e4db7,#0a2a66)',
};

export const PROJECTS: Project[] = [
  {
    title: 'Bâtiment R+4 — Rufisque',
    category: 'Bâtiment',
    client: 'Privé',
    location: 'Cité Poste, Rufisque',
    year: 'En cours',
    description: "Étude technique structurelle et réalisation d'un bâtiment R+4 avec terrasse accessible, Lot N°16 (TF N° 4885/R).",
    gradient: G.a,
  },
  {
    title: '3 villas R+1 — Bambilor',
    category: 'Bâtiment',
    client: 'ATRA SA',
    location: 'Cité des cadres, Bambilor',
    year: '2023',
    description: 'Suivi et réalisation des travaux de gros œuvre et second œuvre de 3 villas R+1 de type F5.',
    gradient: G.b,
  },
  {
    title: 'Dallage cimenterie DANGOTE',
    category: 'Industriel',
    client: 'Ceratech Construction',
    location: 'Pout',
    year: '2023',
    description: "Suivi des travaux de réalisation du dallage de l'unité d'ensachage de la cimenterie DANGOTE SA.",
    gradient: G.c,
  },
  {
    title: 'Piste 205 ml — SENICO',
    category: 'VRD',
    client: 'SENICO',
    location: 'Dakar',
    year: '2022',
    description: "Étude topographique et réalisation d'une piste de 205 ml : implantation, terrassement, pose de bordures et pavage.",
    gradient: G.d,
  },
  {
    title: 'Bâtiment R+2 — Keur Massar',
    category: 'Bâtiment',
    client: 'Privé',
    location: 'Cité APIX, Keur Massar',
    year: '2022',
    description: "Étude technique structurelle et réalisation d'un bâtiment R+2 avec terrasse accessible.",
    gradient: G.a,
  },
  {
    title: 'Toiture CFPT Sénégal/Japon',
    category: 'Rénovation',
    client: 'CFPT Sénégal/Japon',
    location: 'Dakar',
    year: '2022',
    description: 'Réfection de la toiture des bâtiments froid, climatisation et soudage du centre de formation.',
    gradient: G.b,
  },
  {
    title: 'Assainissement ERNAM (ASECNA)',
    category: 'Assainissement',
    client: 'ASECNA',
    location: 'Dakar',
    year: '2021',
    description: "Travaux d'assainissement des eaux pluviales et rafraîchissement de la peinture du mur de clôture de l'ERNAM.",
    gradient: G.c,
  },
  {
    title: 'Charpente métallique — Diass',
    category: 'Études',
    client: 'Centre de formation',
    location: 'Diass',
    year: '2021',
    description: "Étude technique de la charpente métallique d'un centre de formation professionnelle.",
    gradient: G.d,
  },
];

export const PROJECT_CATEGORIES = ['Tous', 'Bâtiment', 'VRD', 'Assainissement', 'Industriel', 'Rénovation', 'Études'];

export const TESTIMONIALS = [
  {
    quote: "STAR-BTP a mené nos travaux de gros œuvre avec un professionnalisme exemplaire et un respect scrupuleux des délais.",
    author: 'Direction technique',
    role: 'ATRA SA',
  },
  {
    quote: 'Un partenaire fiable pour nos chantiers industriels. Qualité d\'exécution et rigueur sur le suivi au rendez-vous.',
    author: 'Chef de projet',
    role: 'Ceratech Construction',
  },
  {
    quote: "L'équipe a su proposer des solutions techniques adaptées à notre budget sans jamais transiger sur la sécurité.",
    author: 'Responsable travaux',
    role: 'ASECNA',
  },
];

export const PARTNERS = [
  'ATRA SA',
  'Ceratech Construction',
  'DANGOTE Cement',
  'ASECNA',
  'SENICO',
  'CFPT Sénégal/Japon',
  'APIX',
  'Ville de Rufisque',
  'SENELEC',
  'SDE',
];

export const JOBS = [
  {
    title: 'Ingénieur Génie Civil',
    type: 'CDI',
    location: 'Rufisque, Dakar',
    department: 'Études & Travaux',
    description: "Conduite d'études structurelles et suivi d'exécution sur nos chantiers bâtiment et VRD.",
  },
  {
    title: 'Chef de chantier',
    type: 'CDI',
    location: 'Dakar & régions',
    department: 'Travaux',
    description: "Organisation, planification et encadrement des équipes sur les chantiers de gros œuvre.",
  },
  {
    title: 'Ingénieur Géomètre-Topographe',
    type: 'CDD',
    location: 'Dakar',
    department: 'Études',
    description: 'Levés topographiques, implantations et contrôles géométriques des ouvrages.',
  },
  {
    title: 'Conducteur d\'engins',
    type: 'CDI',
    location: 'Dakar & régions',
    department: 'Terrassement',
    description: "Conduite d'engins de terrassement et entretien courant du matériel de chantier.",
  },
];
