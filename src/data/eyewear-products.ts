import { EyewearProduct } from '../types';

export const EYEWEAR_PRODUCTS: EyewearProduct[] = [
  {
    id: 'prod-01',
    title: 'Aero-Titanium 01',
    handle: 'aero-titanium-01',
    subtitle: 'Sculpted Double Bridge Aviator',
    shape: 'Aviator',
    material: 'Japanese Beta-Titanium & Cold-Forged Bridge',
    lensMaterial: 'Mineral Optical Glass, Emerald Anti-Reflective',
    price: 420,
    compareAtPrice: 480,
    available: true,
    has3D: true,
    colors: [
      { name: 'Onyx Black', hex: '#1A1A1A', frameHex: '#1A1A1A', lensHex: '#1C2E3D', lensOpacity: 0.8 },
      { name: 'Champagne Titanium', hex: '#C29B38', frameHex: '#C29B38', lensHex: '#2E3524', lensOpacity: 0.75 },
      { name: 'Smoked Slate', hex: '#3E424B', frameHex: '#3E424B', lensHex: '#252528', lensOpacity: 0.85 }
    ],
    specs: {
      frameWidth: '142 mm',
      bridgeWidth: '18 mm',
      lensHeight: '48 mm',
      templeLength: '145 mm',
      weight: '23.4 grams',
      origin: 'Sabae, Fukui, Japan',
      uvRating: '100% UVA/UVB Category 3'
    },
    description: 'An architectural reinterpretation of the classic aviator silhouette. Milled with 0.05mm robotic precision from a single billet of Japanese beta-titanium, paired with a hand-soldered tension-loaded brow bar.',
    editorialStory: 'Tested across high-altitude flight trajectories, the Aero-Titanium 01 eliminates bridge pinch points through balanced weight distribution.'
  },
  {
    id: 'prod-02',
    title: 'Grand Palais 04',
    handle: 'grand-palais-04',
    subtitle: 'Chiseled Block Acetate',
    shape: 'Geometric Square',
    material: '10mm Handcrafted Mazzucchelli Cellulose Acetate',
    lensMaterial: 'Polarized CR-39 Optical Polymer with Hydrophobic Coating',
    price: 460,
    available: true,
    has3D: true,
    colors: [
      { name: 'Tortoise Amber', hex: '#5C3A21', frameHex: '#5C3A21', lensHex: '#35281E', lensOpacity: 0.82 },
      { name: 'Onyx Black', hex: '#1A1A1A', frameHex: '#1A1A1A', lensHex: '#202228', lensOpacity: 0.88 },
      { name: 'Smoked Slate', hex: '#3E424B', frameHex: '#3E424B', lensHex: '#2E3640', lensOpacity: 0.78 }
    ],
    specs: {
      frameWidth: '145 mm',
      bridgeWidth: '20 mm',
      lensHeight: '45 mm',
      templeLength: '148 mm',
      weight: '38.2 grams',
      origin: 'Cadore, Italy & Sabae, Japan',
      uvRating: '100% UVA/UVB Category 3'
    },
    description: 'Carved from 10mm thick organic cotton acetate slabs cured over six months. Features custom 5-barrel stepped hinges and internal wire core engravings inspired by Brutalist pavilion arches.',
    editorialStory: 'The Grand Palais offers commanding volume and deep light absorption without excessive cranial pressure.'
  },
  {
    id: 'prod-03',
    title: 'Sora Panto 02',
    handle: 'sora-panto-02',
    subtitle: 'Intellectual Panto Optical',
    shape: 'Panto Round',
    material: 'Ultra-Fine Beta Titanium Wire & Acetate Rim Inlay',
    lensMaterial: 'High-Index 1.67 Blue-Light Filter & Anti-Reflective Glass',
    price: 390,
    compareAtPrice: 440,
    available: true,
    has3D: true,
    colors: [
      { name: 'Champagne Titanium', hex: '#C29B38', frameHex: '#C29B38', lensHex: '#7C8A96', lensOpacity: 0.4 },
      { name: 'Polished Silver', hex: '#B8B8B8', frameHex: '#B8B8B8', lensHex: '#8E99A2', lensOpacity: 0.35 },
      { name: 'Onyx Black', hex: '#1A1A1A', frameHex: '#1A1A1A', lensHex: '#555C66', lensOpacity: 0.45 }
    ],
    specs: {
      frameWidth: '138 mm',
      bridgeWidth: '21 mm',
      lensHeight: '44 mm',
      templeLength: '142 mm',
      weight: '18.6 grams',
      origin: 'Sabae, Fukui, Japan',
      uvRating: '100% UV400 + 420nm Blue Block'
    },
    description: 'A poetic celebration of mid-century optical craft. Engineered with a featherweight 18.6-gram profile that vanishes on the face, fitted with an integrated titanium keyhole bridge.',
    editorialStory: 'Favored by authors, architects, and studio creatives who demand uninterrupted 14-hour wearing ease.'
  },
  {
    id: 'prod-04',
    title: 'Solarium Haute 05',
    handle: 'solarium-haute-05',
    subtitle: 'Sculpted Haute Couture Cat-Eye',
    shape: 'Cat-Eye',
    material: 'Multi-Facet Beveled Acetate with Gold Wire Core',
    lensMaterial: 'Gradient Rose-Gold Mirror Optical Mineral Glass',
    price: 495,
    available: true,
    has3D: true,
    colors: [
      { name: 'Onyx Black', hex: '#1A1A1A', frameHex: '#1A1A1A', lensHex: '#301824', lensOpacity: 0.82 },
      { name: 'Tortoise Amber', hex: '#5C3A21', frameHex: '#5C3A21', lensHex: '#38251B', lensOpacity: 0.78 }
    ],
    specs: {
      frameWidth: '144 mm',
      bridgeWidth: '17 mm',
      lensHeight: '42 mm',
      templeLength: '145 mm',
      weight: '32.1 grams',
      origin: 'Sabae, Fukui, Japan',
      uvRating: '100% UVA/UVB Category 3'
    },
    description: 'Dramatic architectural geometry with sharp 45-degree hand-beveled edges. Designed to capture light from every angle, finished with hand-hammered temple tip emblems.',
    editorialStory: 'A timeless silhouette amplified with knife-edge cheekbone contours and warm gradient optics.'
  },
  {
    id: 'prod-05',
    title: 'Fukui Minimalist 03',
    handle: 'fukui-minimalist-03',
    subtitle: 'Featherlight Rimless Optical',
    shape: 'Ultra-Thin Titanium',
    material: 'Pure Grade-4 Titanium & Silicone Air-Cushion Pads',
    lensMaterial: 'Impact-Resistant Trivex Optical Glass with Dual Hardcoat',
    price: 440,
    available: true,
    has3D: true,
    colors: [
      { name: 'Polished Silver', hex: '#B8B8B8', frameHex: '#B8B8B8', lensHex: '#9BA3AA', lensOpacity: 0.25 },
      { name: 'Champagne Titanium', hex: '#C29B38', frameHex: '#C29B38', lensHex: '#A29E90', lensOpacity: 0.3 }
    ],
    specs: {
      frameWidth: '136 mm',
      bridgeWidth: '19 mm',
      lensHeight: '40 mm',
      templeLength: '140 mm',
      weight: '14.2 grams',
      origin: 'Sabae, Fukui, Japan',
      uvRating: '100% UV400 Medical Grade'
    },
    description: 'Weighing less than three standard sheets of paper, the Fukui Minimalist is an exercise in optical distillation. Zero screws, zero welded seams—laser cut from a single sheet of Grade-4 titanium.',
    editorialStory: 'The purest expression of functional Japanese minimalism, worn effortlessly through endless workdays.'
  }
];
