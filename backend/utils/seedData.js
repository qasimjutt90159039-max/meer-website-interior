import mongoose from 'mongoose';
import Category from '../models/Category.js';
import Product from '../models/Product.js';
import Gallery from '../models/Gallery.js';
import User from '../models/User.js';

export const initialCategories = [
  {
    name: 'Office Desks',
    description: 'Executive workstations, managerial desks, minimalist writing surfaces, and height-adjustable desks engineered for modern productivity.',
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Office Chairs',
    description: 'Ergonomic task seating, executive high-back leather chairs, breathable mesh chairs, and conference room seating.',
    image: 'https://images.unsplash.com/photo-1580481077198-c847ad43617f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Workstations',
    description: 'Modular benching systems, multi-person cubicle setups, privacy acoustic partition desks, and agile open-plan workstations.',
    image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Storage',
    description: 'Filing cabinets, modular credential credenzas, metallic under-desk mobile pedestals, and executive wooden book racks.',
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Meeting Furniture',
    description: 'Boardroom conference tables, round discussion tables, presentation podiums, and stackable conference seating.',
    image: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Workspace Accessories',
    description: 'Wire management raceways, CPU holders, acoustic desktop divider screens, and ergonomic footrests.',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80',
  },
];

export const initialProducts = [
  {
    name: 'AeroLine Executive Desk System',
    category: 'Office Desks',
    description: 'Architectural executive desk with integrated cable raceway, dual-toned melamine surface, and matte powder-coated steel frame.',
    images: [
      'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1000&q=80'
    ],
    specifications: {
      'Top Material': 'High-density scratch-resistant melamine board',
      'Base Frame': 'Heavy gauge steel with textured powder-coating',
      'Dimensions': '1800mm (W) x 800mm (D) x 750mm (H)',
      'Wire Management': 'Dual flip-up brush grommets with under-desk basket',
      'Finish Options': 'Walnut / Matte Black or Natural Oak / Polar White'
    },
    availability: 'Available on Order',
    featured: true,
  },
  {
    name: 'Vertex Ergonomic Task Chair',
    category: 'Office Chairs',
    description: 'Engineered mesh task chair with synchro-tilt mechanism, adjustable lumbar support, 3D armrests, and nylon base.',
    images: [
      'https://images.unsplash.com/photo-1580481077198-c847ad43617f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1505797149-43b0069ec26b?auto=format&fit=crop&w=1000&q=80'
    ],
    specifications: {
      'Backrest': 'Breathable high-tensile elastomeric mesh',
      'Lumbar Support': 'Height and depth adjustable contour support',
      'Mechanism': 'Multi-lock synchro-tilt with tension control',
      'Gas Lift': 'Class 4 heavy-duty pneumatic cylinder',
      'Castors': '60mm smooth-glide dual PU castors'
    },
    availability: 'Available on Inquiry',
    featured: true,
  },
  {
    name: 'Matrix Modular 4-Person Benching System',
    category: 'Workstations',
    description: 'Collaborative open-plan workstation cluster for four team members with central acoustic fabric screen and shared power-data conduit.',
    images: [
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80'
    ],
    specifications: {
      'Capacity': '4-Person back-to-back cluster',
      'Desk Surface': '25mm anti-glare laminate worktop with 2mm PVC edging',
      'Partition Screen': 'Fabric wrapped acoustic sound-dampening screen (350mm H)',
      'Overall Dimensions': '2800mm (W) x 1400mm (D) x 1050mm (H)',
      'Cable Trough': 'Continuous full-length high-capacity channel'
    },
    availability: 'Custom Fabrication Available',
    featured: true,
  },
  {
    name: 'Linear Boardroom Conference Table',
    category: 'Meeting Furniture',
    description: 'Contemporary meeting table designed for collaborative executive sessions, featuring chamfered edges and concealed connectivity hub.',
    images: [
      'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1000&q=80'
    ],
    specifications: {
      'Seating Capacity': '8 to 10 Persons',
      'Dimensions': '3000mm (L) x 1200mm (W) x 750mm (H)',
      'Surface': 'Architectural wood veneer with beveled profile',
      'Leg Structure': 'Geometric angled steel trestle legs with levelers',
      'Connectivity': 'Dual soft-closing aluminum power & data access boxes'
    },
    availability: 'Available on Order',
    featured: true,
  },
  {
    name: 'Kubo Modular Mobile Pedestal',
    category: 'Storage',
    description: 'Under-desk mobile storage unit with two utility drawers, one filing drawer with hanging file rails, and central locking mechanism.',
    images: [
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1000&q=80'
    ],
    specifications: {
      'Construction': 'Cold-rolled steel with epoxy powder-coat finish',
      'Drawers': '3-drawer configuration (2 stationery, 1 file drawer)',
      'Locking': 'Central master key locking system with anti-tilt wheel',
      'Dimensions': '400mm (W) x 500mm (D) x 620mm (H)',
      'Castors': '5 heavy-duty castors (includes front fifth anti-tip wheel)'
    },
    availability: 'Available on Inquiry',
    featured: false,
  },
  {
    name: 'Strata High-Back Executive Leather Chair',
    category: 'Office Chairs',
    description: 'Refined executive chair wrapped in bonded leather with polished aluminum five-star base and reinforced lumbar curve.',
    images: [
      'https://images.unsplash.com/photo-1505797149-43b0069ec26b?auto=format&fit=crop&w=1000&q=80'
    ],
    specifications: {
      'Upholstery': 'Supple executive bonded leather',
      'Base': '350mm polished cast aluminum base',
      'Tilt Range': '90° to 125° reclining with multi-position lock',
      'Armrests': 'Padded aluminum fixed loop arms',
      'Cushioning': 'High-density molded foam'
    },
    availability: 'Available on Order',
    featured: false,
  },
  {
    name: 'Modula Credenza Storage Unit',
    category: 'Storage',
    description: 'Low-height horizontal storage cabinet designed to complement modern executive desks and provide ample workspace archiving.',
    images: [
      'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1000&q=80'
    ],
    specifications: {
      'Configuration': '2 sliding doors and 3 central drawers',
      'Dimensions': '1800mm (W) x 450mm (D) x 750mm (H)',
      'Material': 'Commercial E1 grade engineered wood with PVC edge banding',
      'Hardware': 'Soft-close damped hinges and full-extension drawer runners'
    },
    availability: 'Custom Fabrication Available',
    featured: false,
  },
  {
    name: 'Acoustic Desk Partition Screen',
    category: 'Workspace Accessories',
    description: 'Sound-dampening desk-mounted felt acoustic screen for visual privacy and noise reduction in busy open office plans.',
    images: [
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1000&q=80'
    ],
    specifications: {
      'Material': 'Recycled PET acoustic polyester felt',
      'Thickness': '18mm dual-layer core',
      'Mounting': 'Universal desk-edge clamp brackets (no drilling required)',
      'Dimensions': '1200mm / 1400mm / 1600mm widths x 400mm height'
    },
    availability: 'Available on Inquiry',
    featured: false,
  }
];

export const initialGallery = [
  {
    title: 'Collaborative Open Bench Workstation Concept',
    description: 'Modern team arrangement showcasing ergonomic mesh chairs and clean wire management.',
    category: 'Workstations',
    image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Executive Meeting and Conference Environment',
    description: 'Clean conference table layout with modern seating for corporate strategy and discussions.',
    category: 'Meeting Furniture',
    image: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Minimalist Focused Executive Desk Space',
    description: 'Streamlined individual office layout focusing on uncluttered productivity and modern materials.',
    category: 'Office Desks',
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Ergonomic Seating Engineering Overview',
    description: 'Detail study of modern mesh backrest, lumbar engineering, and pneumatic controls.',
    category: 'Office Chairs',
    image: 'https://images.unsplash.com/photo-1580481077198-c847ad43617f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Organized Archive Credenza & Storage Systems',
    description: 'Low-profile functional filing and storage cabinets for clean modern office presentation.',
    category: 'Storage',
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Architectural Reception & Waiting Zone',
    description: 'Welcoming waiting lounge seating and clean lines for professional office entrances.',
    category: 'Workstations',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
  },
];

export const seedDatabase = async () => {
  try {
    // Only query Mongoose if connection is fully open (readyState === 1)
    if (mongoose.connection.readyState !== 1) {
      console.log('[Seed] Database is running in In-Memory mode. Memory store initialized.');
      return;
    }

    const categoryCount = await Category.countDocuments();
    if (categoryCount === 0) {
      console.log('[Seed] Populating initial office furniture categories...');
      await Category.insertMany(initialCategories);
    }

    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      console.log('[Seed] Populating catalog office furniture items...');
      await Product.insertMany(initialProducts);
    }

    const galleryCount = await Gallery.countDocuments();
    if (galleryCount === 0) {
      console.log('[Seed] Populating gallery visuals...');
      await Gallery.insertMany(initialGallery);
    }

    const defaultAdminUser = process.env.ADMIN_USERNAME || 'admin';
    const defaultAdminPass = process.env.ADMIN_PASSWORD || 'meersadmin2026';
    const adminExists = await User.findOne({ username: defaultAdminUser });
    if (!adminExists) {
      console.log('[Seed] Creating default admin credentials...');
      const admin = new User({
        username: defaultAdminUser,
        password: defaultAdminPass,
        role: 'admin',
      });
      await admin.save();
    }

    console.log('[Seed] Database initialization complete.');
  } catch (error) {
    console.error('[Seed] Seeding error:', error.message);
  }
};

