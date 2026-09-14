import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight, Layers, LayoutGrid } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';

const categoryBlocks = [
  {
    id: 'desks',
    name: 'Office Desks',
    number: '01',
    description: 'Executive workstations, managerial desks, minimalist computer tables, and height-adjustable surfaces engineered with integrated wire channels and durable finishes.',
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1200&q=80',
    aspect: 'aspect-[16/9] lg:aspect-[4/3]',
    orientation: 'normal',
    link: '/furniture?category=Office+Desks',
  },
  {
    id: 'chairs',
    name: 'Office Chairs',
    number: '02',
    description: 'Ergonomic task seating, executive high-back leather chairs, breathable mesh chairs, and conference room seating engineered for sustained posture support and commercial durability.',
    image: 'https://images.unsplash.com/photo-1580481077198-c847ad43617f?auto=format&fit=crop&w=1200&q=80',
    aspect: 'aspect-[4/3] lg:aspect-[1/1]',
    orientation: 'reverse',
    link: '/furniture?category=Office+Chairs',
  },
  {
    id: 'workstations',
    name: 'Workstations',
    number: '03',
    description: 'Modular benching systems, multi-person cubicle clusters, and acoustic partition desks built for team collaboration, cable concealment, and scalable floorplans.',
    image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80',
    aspect: 'aspect-[16/10] lg:aspect-[16/9]',
    orientation: 'normal',
    link: '/furniture?category=Workstations',
  },
  {
    id: 'storage',
    name: 'Storage',
    number: '04',
    description: 'Filing cabinets, modular credenzas, metallic under-desk mobile pedestals, and executive wooden book racks for organized corporate document retention.',
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=80',
    aspect: 'aspect-[4/3] lg:aspect-[3/2]',
    orientation: 'reverse',
    link: '/furniture?category=Storage',
  },
  {
    id: 'meeting',
    name: 'Meeting Furniture',
    number: '05',
    description: 'Boardroom conference tables, round discussion tables, presentation podiums, and stackable conference seating designed for strategy sessions.',
    image: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=1200&q=80',
    aspect: 'aspect-[16/9] lg:aspect-[16/10]',
    orientation: 'normal',
    link: '/furniture?category=Meeting+Furniture',
  },
];

export const Categories = () => {
  return (
    <div className="pt-20">
      {/* Header Banner */}
      <section className="bg-[#172326] text-white py-20 border-b border-[#324145] relative overflow-hidden">
        <div className="absolute inset-0 bg-tech-grid-dark opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#95B2B8] block mb-2 font-semibold">
            EDITORIAL TAXONOMY
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            Furniture Categories.
          </h1>
          <p className="mt-4 text-gray-300 max-w-2xl text-sm sm:text-base font-light leading-relaxed">
            Explore commercial office furniture organized by function and spatial purpose. Note: These define architectural categories, not claims about currently available stock.
          </p>
        </div>
      </section>

      {/* Large Editorial Category Blocks */}
      <section className="py-20 bg-[#F4F7F7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          {categoryBlocks.map((cat, index) => {
            const isReverse = cat.orientation === 'reverse';

            return (
              <div
                key={cat.id}
                className="bg-white border border-[#E5EBEC] p-6 sm:p-10 lg:p-12 rounded-sm shadow-xs relative overflow-hidden"
              >
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                    isReverse ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Text Column */}
                  <div className={`lg:col-span-6 space-y-5 ${isReverse ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="flex items-center space-x-3">
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-sm bg-[#172326] text-[#95B2B8]">
                        SECTION {cat.number}
                      </span>
                      <span className="font-mono text-[11px] uppercase tracking-widest text-gray-400">
                        Office Taxonomy
                      </span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl font-extrabold text-[#172326] tracking-tight">
                      {cat.name}
                    </h2>

                    <p className="text-sm sm:text-base text-[#596568] leading-relaxed font-light">
                      {cat.description}
                    </p>

                    <div className="pt-4 flex items-center space-x-4">
                      <Link
                        to={cat.link}
                        className="inline-flex items-center space-x-2 bg-[#95B2B8] hover:bg-[#82A3A9] text-[#172326] font-mono text-xs uppercase font-bold px-6 py-3.5 rounded-sm transition-all shadow-sm"
                      >
                        <span>Explore {cat.name}</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>

                      <Link
                        to={`/contact?subject=${encodeURIComponent(`Inquiry for ${cat.name}`)}`}
                        className="inline-flex items-center space-x-1.5 text-xs font-mono uppercase text-[#172326] hover:text-[#95B2B8] border border-[#E5EBEC] hover:border-[#95B2B8] px-4 py-3.5 rounded-sm transition-colors"
                      >
                        <span>Ask Specifications</span>
                      </Link>
                    </div>
                  </div>

                  {/* Image Column with Asymmetric Proportion */}
                  <div className={`lg:col-span-6 ${isReverse ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="relative group overflow-hidden rounded-sm border border-[#E5EBEC] bg-[#172326]">
                      <div className={cat.aspect}>
                        <img
                          src={cat.image}
                          alt={cat.name}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-95"
                        />
                      </div>

                      {/* Technical Overlay Tag */}
                      <div className="absolute top-4 left-4">
                        <span className="font-mono text-[10px] uppercase tracking-widest bg-[#172326]/90 backdrop-blur-sm text-[#95B2B8] px-3 py-1 rounded-sm border border-[#324145]">
                          CATEGORY // {cat.number}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Categories;
