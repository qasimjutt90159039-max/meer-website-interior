import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Layers, Sliders, CheckSquare, Sparkles } from 'lucide-react';

const workspaceCategories = [
  {
    id: 'desks',
    name: 'Office Desks',
    subtitle: 'Focused Executive & Task Stations',
    description: 'Designed for individual clarity, ergonomics, and structural durability. Supports integrated wire raceways and dual-monitor mounts.',
    specifications: [
      { label: 'Surface Standard', value: 'High-density scratch-resistant melamine & veneer' },
      { label: 'Cable Routing', value: 'Concealed under-mount raceway troughs' },
      { label: 'Frame Rigidity', value: 'Reinforced tubular steel subframes' },
      { label: 'Ergonomic Height', value: 'Standard 750mm architectural baseline' }
    ],
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1000&q=80',
    tag: 'ZONE 01 // INDIVIDUAL FOCUS',
    filterParam: 'Office Desks'
  },
  {
    id: 'chairs',
    name: 'Office Chairs',
    subtitle: 'Bio-Mechanic Task & Executive Seating',
    description: 'Synchronized tilt kinematics, active lumbar curves, and multi-directional armrests designed for sustained posture support.',
    specifications: [
      { label: 'Support Core', value: 'Adjustable contour lumbar cushions' },
      { label: 'Recline Mechanics', value: 'Multi-lock synchro-tilt mechanism' },
      { label: 'Upholstery', value: 'High-tensile elastomeric mesh & bonded leather' },
      { label: 'Cylinder', value: 'Class 4 pneumatic safety gas lift' }
    ],
    image: 'https://images.unsplash.com/photo-1580481077198-c847ad43617f?auto=format&fit=crop&w=1000&q=80',
    tag: 'ZONE 02 // POSTURE & ERGONOMICS',
    filterParam: 'Office Chairs'
  },
  {
    id: 'workstations',
    name: 'Workstations',
    subtitle: 'Modular Benching & Collaborative Clusters',
    description: 'Scalable multi-person benching configurations featuring acoustic desktop divider screens, shared cable raceways, and agile expansion capability.',
    specifications: [
      { label: 'Team Layout', value: '2, 4, 6, and 8-person back-to-back clusters' },
      { label: 'Acoustics', value: 'Sound-dampening PET felt partition dividers' },
      { label: 'Data Trunking', value: 'Shared high-capacity spine raceway' },
      { label: 'Modularity', value: 'Quick-release clamp hardware' }
    ],
    image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1000&q=80',
    tag: 'ZONE 03 // TEAM COLLABORATION',
    filterParam: 'Workstations'
  },
  {
    id: 'storage',
    name: 'Storage',
    subtitle: 'Filing Pedestals & Credenza Systems',
    description: 'Architectural archiving solutions engineered to minimize floor footprint while maintaining security and document access.',
    specifications: [
      { label: 'Cabinetry', value: 'Cold-rolled steel pedestals & wood credenzas' },
      { label: 'Security', value: 'Centralized gang locks with master keying' },
      { label: 'Drawer Slides', value: 'Full-extension heavy-duty ball bearing runners' },
      { label: 'Mobility', value: 'Dual-wheel castors with fifth anti-tip wheel' }
    ],
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1000&q=80',
    tag: 'ZONE 04 // SPATIAL ARCHIVING',
    filterParam: 'Storage'
  },
  {
    id: 'meeting',
    name: 'Meeting Furniture',
    subtitle: 'Conference & Strategy Ensembles',
    description: 'Statement conference tables and meeting room seating designed to facilitate discussions, multimedia presentations, and executive decision-making.',
    specifications: [
      { label: 'Conference Sizing', value: '6 to 14-person proportioned profiles' },
      { label: 'Connectivity Hub', value: 'Concealed pop-up power & HDMI connectivity' },
      { label: 'Base Geometry', value: 'Angled trestle legs for unobstructed legroom' },
      { label: 'Surface Finish', value: 'Beveled edge architectural wood laminates' }
    ],
    image: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=1000&q=80',
    tag: 'ZONE 05 // EXECUTIVE CONFERENCING',
    filterParam: 'Meeting Furniture'
  },
  {
    id: 'accessories',
    name: 'Workspace Accessories',
    subtitle: 'Cable Management & Ergonomic Additions',
    description: 'Essential ergonomic companions that eliminate desktop friction, manage wiring clutter, and enhance daily office efficiency.',
    specifications: [
      { label: 'Cable Spines', value: 'Flexible articulated vertebra raceways' },
      { label: 'Mounting', value: 'Under-desk clamp CPU cradles' },
      { label: 'Privacy Additions', value: 'Removable clamp desk-edge screens' },
      { label: 'Organization', value: 'Integrated stationery trays' }
    ],
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1000&q=80',
    tag: 'ZONE 06 // SYSTEM UTILITIES',
    filterParam: 'Workspace Accessories'
  }
];

export const WorkspaceExplorer = () => {
  const [activeCategory, setActiveCategory] = useState(workspaceCategories[0]);

  return (
    <div className="bg-white border border-[#E5EBEC] p-4 sm:p-8 rounded-sm shadow-sm">
      {/* Category Selection Tabs */}
      <div className="flex flex-wrap gap-2 pb-6 border-b border-[#E5EBEC]">
        {workspaceCategories.map((cat, idx) => {
          const isActive = cat.id === activeCategory.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat)}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-sm text-xs font-mono uppercase tracking-wider transition-all ${
                isActive
                  ? 'bg-[#172326] text-[#95B2B8] font-bold shadow-sm'
                  : 'bg-[#F4F7F7] text-[#596568] hover:bg-[#E5EBEC] hover:text-[#172326]'
              }`}
            >
              <span className="text-[10px] opacity-60">0{idx + 1}</span>
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>

      {/* Dynamic Content Presentation Area */}
      <div className="pt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Image with architectural tag */}
        <div className="lg:col-span-6">
          <div className="relative aspect-[16/10] bg-[#172326] rounded-sm overflow-hidden border border-[#E5EBEC]">
            <img
              src={activeCategory.image}
              alt={activeCategory.name}
              className="w-full h-full object-cover transition-opacity duration-300"
            />
            <div className="absolute top-3 left-3">
              <span className="font-mono text-[10px] uppercase tracking-widest bg-[#172326]/90 backdrop-blur-sm text-[#95B2B8] px-3 py-1 rounded-sm border border-[#324145]">
                {activeCategory.tag}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Spec Card */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <span className="font-mono text-xs uppercase text-[#95B2B8] tracking-widest font-semibold block">
              Workspace Category
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#172326] mt-1">
              {activeCategory.name}
            </h3>
            <p className="text-sm font-mono text-[#596568] mt-1">
              {activeCategory.subtitle}
            </p>
          </div>

          <p className="text-sm text-[#596568] leading-relaxed font-light">
            {activeCategory.description}
          </p>

          {/* Technical Specifications Grid */}
          <div className="bg-[#F4F7F7] border border-[#E5EBEC] p-4 rounded-sm grid grid-cols-1 sm:grid-cols-2 gap-3">
            {activeCategory.specifications.map((spec, i) => (
              <div key={i} className="text-xs">
                <span className="block font-mono text-[10px] uppercase text-gray-400">
                  {spec.label}
                </span>
                <span className="font-medium text-[#172326] mt-0.5 block">
                  {spec.value}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              to={`/furniture?category=${encodeURIComponent(activeCategory.filterParam)}`}
              className="inline-flex items-center space-x-2 bg-[#95B2B8] hover:bg-[#82A3A9] text-[#172326] font-mono text-xs uppercase font-bold px-5 py-3 rounded-sm transition-all"
            >
              <span>Explore {activeCategory.name} in Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to={`/contact?subject=${encodeURIComponent(`Inquiry for ${activeCategory.name}`)}`}
              className="inline-flex items-center space-x-2 text-xs font-mono uppercase text-[#172326] hover:text-[#95B2B8] border border-[#E5EBEC] hover:border-[#95B2B8] px-4 py-3 rounded-sm transition-colors"
            >
              <span>Request Layout Specs</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceExplorer;
