import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Maximize2,
  Minimize2,
  Info,
  ArrowRight,
  CheckCircle2,
  Layers,
  MapPin,
  Sparkles,
  Sliders
} from 'lucide-react';
import SectionHeader from '../components/SectionHeader';

const workspaceZones = [
  {
    id: 'individual',
    name: 'Individual Workspaces',
    tag: 'ZONE 01 // FOCUS ARCHITECTURE',
    title: 'Executive & Private Task Zones',
    description: 'Aimed at deep individual concentration and managerial operations. Incorporates freestanding executive desks, ergonomic mesh or leather seating, and discrete under-desk mobile filing.',
    hotspots: [
      { id: 'h1', x: '25%', y: '40%', label: 'Executive Desk Profile', desc: 'Melamine worktop with beveled edge and concealed brush wire grommet' },
      { id: 'h2', x: '45%', y: '60%', label: 'Ergonomic Task Seating', desc: 'Synchro-tilt mechanism with multi-axis armrests and lumbar contour' },
      { id: 'h3', x: '70%', y: '45%', label: 'Side Archive Credenza', desc: 'Low-height storage unit for documentation and office equipment' },
    ],
    furnitureLinks: [
      { name: 'Office Desks', path: '/furniture?category=Office+Desks' },
      { name: 'Office Chairs', path: '/furniture?category=Office+Chairs' },
    ],
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'team',
    name: 'Team Workspaces',
    tag: 'ZONE 02 // COLLABORATIVE CLUSTERS',
    title: 'Open Benching & Acoustic Partitions',
    description: 'Configured for high-density multidisciplinary teams. Shared structural frames reduce floor clutter, while central acoustic felt screens provide visual and auditory division.',
    hotspots: [
      { id: 'h4', x: '35%', y: '50%', label: 'Central Benching Spine', desc: 'Continuous cable raceway housing data trunking and power conduits' },
      { id: 'h5', x: '55%', y: '35%', label: 'Acoustic Partition Screen', desc: 'Sound-dampening recycled PET felt divider panel' },
      { id: 'h6', x: '75%', y: '65%', label: 'Mobile File Pedestals', desc: 'Lockable steel pedestals tucked under worktop for individual security' },
    ],
    furnitureLinks: [
      { name: 'Workstations', path: '/furniture?category=Workstations' },
      { name: 'Workspace Accessories', path: '/furniture?category=Workspace+Accessories' },
    ],
    image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'meeting',
    name: 'Meeting Areas',
    tag: 'ZONE 03 // STRATEGY & DIALOGUE',
    title: 'Boardroom & Collaborative Discussion Suites',
    description: 'Centrally positioned tables scaled to accommodate executive dialogue, video conferencing, and client presentations with flush connectivity integration.',
    hotspots: [
      { id: 'h7', x: '50%', y: '50%', label: 'Conference Table Top', desc: 'Long-span reinforced surface with chamfered edge and power modules' },
      { id: 'h8', x: '30%', y: '40%', label: 'Conference Seating', desc: 'Medium-back breathable chairs engineered for meeting room comfort' },
    ],
    furnitureLinks: [
      { name: 'Meeting Furniture', path: '/furniture?category=Meeting+Furniture' },
    ],
    image: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'storage',
    name: 'Storage Areas',
    tag: 'ZONE 04 // SPATIAL RETENTION',
    title: 'Archiving Credenzas & Tall Cabinetry',
    description: 'Dedicated document retention zones designed to keep main work aisles unobstructed. Central gang-locking safeguards sensitive business records.',
    hotspots: [
      { id: 'h9', x: '40%', y: '45%', label: 'Filing Storage Units', desc: 'Heavy-gauge steel cabinets with anti-tilt suspension runners' },
      { id: 'h10', x: '70%', y: '55%', label: 'Credential Credenzas', desc: 'Wood laminate low credenzas with sliding acoustic doors' },
    ],
    furnitureLinks: [
      { name: 'Storage', path: '/furniture?category=Storage' },
    ],
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'reception',
    name: 'Reception / Waiting Areas',
    tag: 'ZONE 05 // CLIENT IMPRESSION',
    title: 'Arrival Lounges & Waiting Zones',
    description: 'The primary touchpoint for incoming visitors and corporate clients. Balances architectural minimalism with comfortable visitor seating.',
    hotspots: [
      { id: 'h11', x: '45%', y: '60%', label: 'Lounge Guest Seating', desc: 'Low-profile structured visitor armchairs with commercial foam' },
      { id: 'h12', x: '70%', y: '40%', label: 'Accent Coffee Table', desc: 'Minimalist metallic frame accent surface for collateral' },
    ],
    furnitureLinks: [
      { name: 'Office Chairs', path: '/furniture?category=Office+Chairs' },
    ],
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
  },
];

export const Workspace = () => {
  const [selectedZone, setSelectedZone] = useState(workspaceZones[0]);
  const [activeHotspot, setActiveHotspot] = useState(null);

  return (
    <div className="pt-20">
      {/* Header Banner */}
      <section className="bg-[#172326] text-white py-20 border-b border-[#324145] relative overflow-hidden">
        <div className="absolute inset-0 bg-tech-grid-dark opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#95B2B8] block mb-2 font-semibold">
            WORKSPACE EXPERIENCE
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            Commercial Office Zoning & Layout Concepts.
          </h1>
          <p className="mt-4 text-gray-300 max-w-2xl text-sm sm:text-base font-light leading-relaxed">
            Examine functional layout arrangements across corporate settings. Note: These are presented as general workspace categories and planning principles.
          </p>
        </div>
      </section>

      {/* Interactive Office Zoning Section */}
      <section className="py-16 sm:py-20 bg-[#F4F7F7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            number="01 // INTERACTIVE ZONING"
            eyebrow="Spatial Layout Blueprint"
            title="Interactive Office Blueprint & Hotspots"
            description="Select a commercial workspace area below to explore spatial zoning, layout considerations, and interactive furniture hotspots."
          />

          {/* Zone Selector Buttons */}
          <div className="flex flex-wrap gap-2 pb-6 border-b border-[#E5EBEC]">
            {workspaceZones.map((zone, idx) => {
              const isActive = zone.id === selectedZone.id;
              return (
                <button
                  key={zone.id}
                  onClick={() => {
                    setSelectedZone(zone);
                    setActiveHotspot(null);
                  }}
                  className={`px-4 py-2.5 rounded-sm font-mono text-xs uppercase tracking-wider transition-all flex items-center space-x-2 ${
                    isActive
                      ? 'bg-[#172326] text-[#95B2B8] font-bold shadow-sm'
                      : 'bg-white text-[#596568] hover:bg-[#E5EBEC] border border-[#E5EBEC]'
                  }`}
                >
                  <span className="text-[10px] opacity-60">0{idx + 1}</span>
                  <span>{zone.name}</span>
                </button>
              );
            })}
          </div>

          {/* Interactive Layout Stage */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Visual with Interactive Hotspots */}
            <div className="lg:col-span-8 bg-white border border-[#E5EBEC] p-3 rounded-sm shadow-sm relative">
              <div className="relative aspect-[16/10] bg-[#172326] rounded-sm overflow-hidden group">
                <img
                  src={selectedZone.image}
                  alt={selectedZone.name}
                  className="w-full h-full object-cover opacity-90 transition-transform duration-700"
                />

                {/* Hotspot Markers */}
                {selectedZone.hotspots.map((spot) => (
                  <button
                    key={spot.id}
                    onClick={() => setActiveHotspot(spot)}
                    style={{ left: spot.x, top: spot.y }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group/spot focus:outline-none"
                    aria-label={`Inspect hotspot: ${spot.label}`}
                  >
                    <span className="relative flex h-8 w-8 items-center justify-center">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#95B2B8] opacity-75" />
                      <span className="relative inline-flex rounded-full h-5 w-5 bg-[#172326] border-2 border-[#95B2B8] text-[9px] font-mono font-bold text-[#95B2B8] items-center justify-center shadow-lg">
                        +
                      </span>
                    </span>

                    {/* Desktop Hover Tooltip */}
                    <div className="hidden sm:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-[#172326]/95 text-white p-2 rounded-sm border border-[#324145] text-center opacity-0 pointer-events-none group-hover/spot:opacity-100 transition-opacity z-30 shadow-xl">
                      <span className="block text-[10px] font-mono text-[#95B2B8] uppercase">{spot.label}</span>
                      <span className="block text-[10px] text-gray-300 font-light mt-0.5 leading-tight">{spot.desc}</span>
                    </div>
                  </button>
                ))}

                {/* Tag Overlay */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="font-mono text-[10px] uppercase tracking-widest bg-[#172326]/90 backdrop-blur-sm text-[#95B2B8] px-3 py-1 rounded-sm border border-[#324145]">
                    {selectedZone.tag}
                  </span>
                </div>

                <div className="absolute bottom-4 right-4 z-10 bg-[#172326]/80 backdrop-blur-sm px-3 py-1 rounded-sm border border-[#324145] text-[10px] font-mono text-gray-300">
                  Click '+' pins to inspect specifications
                </div>
              </div>

              {/* Hotspot detail popup on mobile or active selection */}
              {activeHotspot && (
                <div className="mt-4 p-4 bg-[#172326] text-white border border-[#324145] rounded-sm flex items-start justify-between animate-fadeIn">
                  <div className="space-y-1">
                    <span className="font-mono text-[10px] text-[#95B2B8] uppercase block">Selected Element Spec</span>
                    <h4 className="text-sm font-bold">{activeHotspot.label}</h4>
                    <p className="text-xs text-gray-300 font-light">{activeHotspot.desc}</p>
                  </div>
                  <button
                    onClick={() => setActiveHotspot(null)}
                    className="text-gray-400 hover:text-white text-xs font-mono px-2 py-1 bg-[#202A2D] rounded-sm"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>

            {/* Information Card & Relevant Categories */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white border border-[#E5EBEC] p-6 rounded-sm shadow-sm space-y-4">
                <div>
                  <span className="font-mono text-xs uppercase text-[#95B2B8] tracking-widest font-bold block">
                    Zoning Overview
                  </span>
                  <h3 className="text-xl font-extrabold text-[#172326] mt-1">
                    {selectedZone.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-[#596568] leading-relaxed font-light">
                  {selectedZone.description}
                </p>

                <div className="pt-4 border-t border-[#E5EBEC]">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#172326] font-bold block mb-3">
                    Corresponding Furniture In Catalog:
                  </span>
                  <div className="space-y-2">
                    {selectedZone.furnitureLinks.map((link, idx) => (
                      <Link
                        key={idx}
                        to={link.path}
                        className="flex items-center justify-between p-3 bg-[#F4F7F7] hover:bg-[#E5EBEC] text-[#172326] rounded-sm border border-[#E5EBEC] text-xs font-mono uppercase transition-colors"
                      >
                        <span>{link.name}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#95B2B8]" />
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    to={`/contact?subject=${encodeURIComponent(`Layout inquiry for ${selectedZone.name}`)}`}
                    className="w-full flex items-center justify-center space-x-2 bg-[#95B2B8] hover:bg-[#82A3A9] text-[#172326] font-mono text-xs uppercase font-bold py-3 px-4 rounded-sm transition-all"
                  >
                    <span>Inquire About {selectedZone.name}</span>
                  </Link>
                </div>
              </div>

              {/* Showroom Address Reference */}
              <div className="bg-[#202A2D] text-white p-5 rounded-sm border border-[#324145] space-y-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#95B2B8] block">
                  Showroom Consultation
                </span>
                <p className="text-xs text-gray-300 font-light leading-relaxed">
                  Discuss your floor dimensions with Meer’s Interior at 4 Mission Rd, Anarkali Bazaar Lahore, or call +92 300 9490734.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Workspace;
