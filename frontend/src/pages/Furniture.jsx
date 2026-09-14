import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, SlidersHorizontal, Box, RefreshCw } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import ProductCard from '../components/ProductCard';
import InquiryModal from '../components/InquiryModal';
import api from '../services/api';

const categoriesList = [
  'All',
  'Office Desks',
  'Office Chairs',
  'Workstations',
  'Storage',
  'Meeting Furniture',
  'Workspace Accessories',
];

export const Furniture = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters state
  const currentCategory = searchParams.get('category') || 'All';
  const currentSearch = searchParams.get('search') || '';
  const currentSort = searchParams.get('sort') || 'newest';

  const [searchInput, setSearchInput] = useState(currentSearch);
  const [selectedProductForInquiry, setSelectedProductForInquiry] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getProducts({
        category: currentCategory,
        search: currentSearch,
        sort: currentSort,
      });
      setProducts(data);
    } catch (err) {
      setError('Unable to load furniture catalog. Please verify backend connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [currentCategory, currentSearch, currentSort]);

  const handleCategoryChange = (category) => {
    const params = new URLSearchParams(searchParams);
    if (category === 'All') {
      params.delete('category');
    } else {
      params.set('category', category);
    }
    setSearchParams(params);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (searchInput.trim()) {
      params.set('search', searchInput.trim());
    } else {
      params.delete('search');
    }
    setSearchParams(params);
  };

  const handleSortChange = (e) => {
    const params = new URLSearchParams(searchParams);
    params.set('sort', e.target.value);
    setSearchParams(params);
  };

  const handleInquire = (product) => {
    setSelectedProductForInquiry(product);
    setIsModalOpen(true);
  };

  return (
    <div className="pt-20">
      {/* Page Header */}
      <section className="bg-[#172326] text-white py-16 sm:py-20 border-b border-[#324145] relative overflow-hidden">
        <div className="absolute inset-0 bg-tech-grid-dark opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#95B2B8] block mb-2 font-semibold">
            CATALOG // SPECIFICATIONS
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Commercial Office Furniture
          </h1>
          <p className="mt-3 text-sm sm:text-base text-gray-300 max-w-2xl font-light">
            Engineered office desks, ergonomic chairs, benching systems, and archiving storage units. Inquire directly with Meer’s Interior for custom dimensions and commercial specifications.
          </p>
        </div>
      </section>

      {/* Catalog Filter & Controls Bar */}
      <section className="bg-white border-b border-[#E5EBEC] sticky top-20 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Category Navigation Pills */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-thin">
              {categoriesList.map((cat) => {
                const isActive = currentCategory.toLowerCase() === cat.toLowerCase() || (cat === 'All' && !currentCategory);
                return (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={`px-3 py-1.5 rounded-sm text-xs font-mono uppercase whitespace-nowrap tracking-wider transition-colors ${
                      isActive
                        ? 'bg-[#172326] text-[#95B2B8] font-bold border border-[#172326]'
                        : 'bg-[#F4F7F7] text-[#596568] hover:bg-[#E5EBEC] border border-[#E5EBEC]'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Search and Sort controls */}
            <div className="flex items-center gap-3">
              {/* Search Form */}
              <form onSubmit={handleSearchSubmit} className="relative flex-1 sm:w-64">
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search furniture..."
                  className="w-full text-xs font-mono pl-8 pr-3 py-2 bg-[#F4F7F7] border border-[#E5EBEC] focus:border-[#95B2B8] focus:bg-white focus:outline-none rounded-sm"
                />
                <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </form>

              {/* Sort Dropdown */}
              <div className="flex items-center space-x-1 shrink-0">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#596568]" />
                <select
                  value={currentSort}
                  onChange={handleSortChange}
                  className="text-xs font-mono bg-[#F4F7F7] border border-[#E5EBEC] focus:border-[#95B2B8] px-2 py-2 rounded-sm focus:outline-none text-[#172326]"
                >
                  <option value="newest">Newest Added</option>
                  <option value="name-asc">Name (A-Z)</option>
                  <option value="name-desc">Name (Z-A)</option>
                  <option value="oldest">Oldest</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Grid Area */}
      <section className="py-16 bg-[#F4F7F7] min-h-[50vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Active filter indication */}
          <div className="mb-6 flex items-center justify-between font-mono text-xs text-[#596568]">
            <div>
              <span>Displaying </span>
              <strong className="text-[#172326]">{products.length}</strong>
              <span> furniture items</span>
              {currentCategory !== 'All' && (
                <span> in <span className="text-[#172326] font-bold">"{currentCategory}"</span></span>
              )}
              {currentSearch && (
                <span> matching <span className="text-[#172326] font-bold">"{currentSearch}"</span></span>
              )}
            </div>

            {(currentCategory !== 'All' || currentSearch) && (
              <button
                onClick={() => {
                  setSearchParams({});
                  setSearchInput('');
                }}
                className="text-[#95B2B8] hover:underline"
              >
                Clear all filters
              </button>
            )}
          </div>

          {/* Content Loading & Error States */}
          {loading ? (
            <div className="py-24 text-center">
              <div className="w-8 h-8 border-2 border-[#95B2B8] border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="mt-3 font-mono text-xs uppercase text-[#596568]">Connecting to furniture catalog...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 p-8 rounded-sm text-center max-w-md mx-auto">
              <p className="text-sm text-red-700">{error}</p>
              <button
                onClick={fetchProducts}
                className="mt-4 inline-flex items-center space-x-1.5 text-xs font-mono uppercase bg-red-700 text-white px-4 py-2 rounded-sm"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retry</span>
              </button>
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onInquire={handleInquire}
                />
              ))}
            </div>
          ) : (
            /* Strict prompt requirement: "No furniture items have been added yet." */
            <div className="border border-dashed border-[#E5EBEC] bg-white p-16 text-center rounded-sm max-w-xl mx-auto shadow-xs">
              <Box className="w-12 h-12 text-[#95B2B8] mx-auto mb-4" />
              <h3 className="text-lg font-bold text-[#172326]">
                No furniture items have been added yet.
              </h3>
              <p className="mt-2 text-xs text-[#596568] font-mono leading-relaxed">
                Check back soon or contact Meer’s Interior directly at +92 300 9490734 to inquire about currently available stock and custom orders.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Inquiry Modal */}
      <InquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        prefillProduct={selectedProductForInquiry}
      />
    </div>
  );
};

export default Furniture;
