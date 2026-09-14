import React, { useState, useEffect } from 'react';
import {
  Shield,
  Package,
  FolderTree,
  Image as ImageIcon,
  MessageSquare,
  Plus,
  Trash2,
  Edit2,
  LogOut,
  CheckCircle,
  AlertCircle,
  Phone,
  ExternalLink,
  Eye,
  Search,
  X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

export const Admin = () => {
  const { user, token, isAuthenticated, login, logout } = useAuth();

  // Login form state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Active admin tab
  const [activeTab, setActiveTab] = useState('products'); // products, categories, gallery, inquiries

  // Data states
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const [actionError, setActionError] = useState('');
  const [actionSuccess, setActionSuccess] = useState('');

  // Modals & forms
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: '',
    category: '',
    description: '',
    images: '',
    availability: 'Available on Inquiry',
    featured: false,
    specs: '',
  });

  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [categoryForm, setCategoryForm] = useState({ name: '', description: '', image: '' });

  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [galleryForm, setGalleryForm] = useState({ title: '', image: '', category: 'General', description: '' });

  // Handle Admin Login
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);
    try {
      await login(username, password);
    } catch (err) {
      setLoginError(err.message || 'Invalid admin credentials');
    } finally {
      setLoginLoading(false);
    }
  };

  // Load active tab data
  const loadData = async () => {
    if (!token) return;
    setLoadingData(true);
    setActionError('');
    try {
      if (activeTab === 'products') {
        const [prods, cats] = await Promise.all([api.getProducts(), api.getCategories()]);
        setProducts(prods);
        setCategories(cats);
      } else if (activeTab === 'categories') {
        const cats = await api.getCategories();
        setCategories(cats);
      } else if (activeTab === 'gallery') {
        const gal = await api.getGallery();
        setGallery(gal);
      } else if (activeTab === 'inquiries') {
        const inqs = await api.getInquiries(token);
        setInquiries(inqs);
      }
    } catch (err) {
      setActionError(err.message || 'Error loading records');
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated, activeTab]);

  // Handle Product Save (Create or Update)
  const handleSaveProduct = async (e) => {
    e.preventDefault();
    setActionError('');
    setActionSuccess('');

    try {
      // Parse specs into key-value pairs
      const parsedSpecs = {};
      if (productForm.specs) {
        const lines = productForm.specs.split('\n');
        lines.forEach(line => {
          const [k, ...rest] = line.split(':');
          if (k && rest.length) {
            parsedSpecs[k.trim()] = rest.join(':').trim();
          }
        });
      }

      const payload = {
        name: productForm.name,
        category: productForm.category,
        description: productForm.description,
        images: productForm.images ? productForm.images.split(',').map(s => s.trim()) : [],
        availability: productForm.availability,
        featured: Boolean(productForm.featured),
        specifications: parsedSpecs,
      };

      if (editingProduct) {
        await api.updateProduct(editingProduct._id, payload, token);
        setActionSuccess('Product updated successfully.');
      } else {
        await api.createProduct(payload, token);
        setActionSuccess('New product added to catalog.');
      }

      setShowProductModal(false);
      setEditingProduct(null);
      loadData();
    } catch (err) {
      setActionError(err.message || 'Failed to save product.');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Delete this product permanently?')) return;
    try {
      await api.deleteProduct(id, token);
      setActionSuccess('Product removed.');
      loadData();
    } catch (err) {
      setActionError(err.message || 'Failed to delete product.');
    }
  };

  const openEditProduct = (prod) => {
    setEditingProduct(prod);
    const specsString = prod.specifications ? (
      prod.specifications instanceof Map 
        ? Array.from(prod.specifications.entries()).map(([k, v]) => `${k}: ${v}`).join('\n')
        : Object.entries(prod.specifications).map(([k, v]) => `${k}: ${v}`).join('\n')
    ) : '';

    setProductForm({
      name: prod.name,
      category: prod.category,
      description: prod.description,
      images: prod.images ? prod.images.join(', ') : '',
      availability: prod.availability || 'Available on Inquiry',
      featured: Boolean(prod.featured),
      specs: specsString,
    });
    setShowProductModal(true);
  };

  // Handle Category Save
  const handleSaveCategory = async (e) => {
    e.preventDefault();
    try {
      await api.createCategory(categoryForm, token);
      setActionSuccess('Category created successfully.');
      setShowCategoryModal(false);
      setCategoryForm({ name: '', description: '', image: '' });
      loadData();
    } catch (err) {
      setActionError(err.message || 'Failed to create category.');
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm('Delete this category?')) return;
    try {
      await api.deleteCategory(id, token);
      setActionSuccess('Category removed.');
      loadData();
    } catch (err) {
      setActionError(err.message || 'Failed to delete category.');
    }
  };

  // Handle Gallery Save
  const handleSaveGallery = async (e) => {
    e.preventDefault();
    try {
      await api.createGalleryItem(galleryForm, token);
      setActionSuccess('Gallery visual item added.');
      setShowGalleryModal(false);
      setGalleryForm({ title: '', image: '', category: 'General', description: '' });
      loadData();
    } catch (err) {
      setActionError(err.message || 'Failed to add gallery image.');
    }
  };

  const handleDeleteGallery = async (id) => {
    if (!window.confirm('Delete this gallery image?')) return;
    try {
      await api.deleteGalleryItem(id, token);
      setActionSuccess('Gallery item deleted.');
      loadData();
    } catch (err) {
      setActionError(err.message || 'Failed to delete gallery item.');
    }
  };

  // Handle Inquiry Status
  const handleUpdateInquiryStatus = async (id, newStatus) => {
    try {
      await api.updateInquiryStatus(id, newStatus, token);
      setActionSuccess(`Inquiry marked as ${newStatus}`);
      loadData();
    } catch (err) {
      setActionError(err.message || 'Failed to update inquiry');
    }
  };

  const handleDeleteInquiry = async (id) => {
    if (!window.confirm('Delete this customer inquiry?')) return;
    try {
      await api.deleteInquiry(id, token);
      setActionSuccess('Inquiry deleted.');
      loadData();
    } catch (err) {
      setActionError(err.message || 'Failed to delete inquiry');
    }
  };

  // Render Login View if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="pt-28 pb-20 min-h-screen bg-[#F4F7F7] flex items-center justify-center px-4">
        <div className="bg-white border border-[#E5EBEC] max-w-md w-full p-8 sm:p-10 rounded-sm shadow-md space-y-6">
          <div className="text-center space-y-1">
            <div className="w-12 h-12 rounded-sm bg-[#172326] text-[#95B2B8] flex items-center justify-center mx-auto mb-3">
              <Shield className="w-6 h-6" />
            </div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#95B2B8] block font-bold">
              Meer’s Interior • Portal
            </span>
            <h2 className="text-2xl font-extrabold text-[#172326]">Management Access</h2>
            <p className="text-xs text-[#596568] font-light">
              Enter administrator credentials to manage products, categories, and customer inquiries.
            </p>
          </div>

          {loginError && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-sm flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase text-[#596568] mb-1">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="admin"
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-[#F4F7F7] border border-[#E5EBEC] focus:border-[#95B2B8] focus:bg-white focus:outline-none rounded-sm font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-[#596568] mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-[#F4F7F7] border border-[#E5EBEC] focus:border-[#95B2B8] focus:bg-white focus:outline-none rounded-sm font-mono"
              />
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full bg-[#172326] hover:bg-[#202A2D] text-white font-mono text-xs uppercase font-bold py-3 px-4 rounded-sm transition-all flex items-center justify-center space-x-2"
            >
              {loginLoading ? <span>Authenticating...</span> : <span>Sign In to Admin Portal</span>}
            </button>
          </form>

          <div className="pt-2 text-center">
            <span className="text-[11px] font-mono text-gray-400">
              Secured session • Meer's Interior Management
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated Admin Dashboard View
  return (
    <div className="pt-20 bg-[#F4F7F7] min-h-screen">
      {/* Top Admin Sub-bar */}
      <div className="bg-[#172326] text-white py-4 px-4 sm:px-8 border-b border-[#324145] flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <span className="font-mono text-xs font-bold text-[#95B2B8] px-2 py-0.5 bg-[#202A2D] border border-[#324145] rounded-sm">
            ADMIN CMS
          </span>
          <h1 className="text-sm sm:text-base font-bold">Meer’s Interior Store Management</h1>
        </div>

        <div className="flex items-center space-x-4 text-xs font-mono">
          <span className="text-gray-400">User: <strong className="text-white">{user?.username || 'admin'}</strong></span>
          <button
            onClick={logout}
            className="inline-flex items-center space-x-1.5 text-xs font-mono uppercase bg-[#202A2D] hover:bg-red-900/40 text-gray-200 hover:text-red-300 px-3 py-1.5 rounded-sm border border-[#324145] transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-[#E5EBEC] pb-4">
          <button
            onClick={() => setActiveTab('products')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-sm font-mono text-xs uppercase tracking-wider transition-colors ${
              activeTab === 'products'
                ? 'bg-[#172326] text-[#95B2B8] font-bold'
                : 'bg-white text-[#596568] hover:bg-[#E5EBEC] border border-[#E5EBEC]'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Products ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('categories')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-sm font-mono text-xs uppercase tracking-wider transition-colors ${
              activeTab === 'categories'
                ? 'bg-[#172326] text-[#95B2B8] font-bold'
                : 'bg-white text-[#596568] hover:bg-[#E5EBEC] border border-[#E5EBEC]'
            }`}
          >
            <FolderTree className="w-4 h-4" />
            <span>Categories ({categories.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-sm font-mono text-xs uppercase tracking-wider transition-colors ${
              activeTab === 'gallery'
                ? 'bg-[#172326] text-[#95B2B8] font-bold'
                : 'bg-white text-[#596568] hover:bg-[#E5EBEC] border border-[#E5EBEC]'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Gallery ({gallery.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-sm font-mono text-xs uppercase tracking-wider transition-colors ${
              activeTab === 'inquiries'
                ? 'bg-[#172326] text-[#95B2B8] font-bold'
                : 'bg-white text-[#596568] hover:bg-[#E5EBEC] border border-[#E5EBEC]'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Inquiries ({inquiries.length})</span>
          </button>
        </div>

        {/* Global Feedback Banners */}
        {actionSuccess && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 text-green-800 text-xs rounded-sm flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>{actionSuccess}</span>
            </div>
            <button onClick={() => setActionSuccess('')} className="text-green-800 text-xs">Dismiss</button>
          </div>
        )}

        {actionError && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-sm flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-red-600" />
              <span>{actionError}</span>
            </div>
            <button onClick={() => setActionError('')} className="text-red-700 text-xs">Dismiss</button>
          </div>
        )}

        {/* TAB 1: PRODUCTS CONTENT */}
        {activeTab === 'products' && (
          <div className="mt-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-[#172326]">Office Furniture Products</h3>
                <p className="text-xs text-[#596568]">Manage items visible in the catalog.</p>
              </div>

              <button
                onClick={() => {
                  setEditingProduct(null);
                  setProductForm({
                    name: '',
                    category: categories[0]?.name || 'Office Desks',
                    description: '',
                    images: '',
                    availability: 'Available on Inquiry',
                    featured: false,
                    specs: 'Dimensions: 1400mm x 700mm x 750mm\nMaterial: High-density Melamine\nFrame: Powder-coated Steel',
                  });
                  setShowProductModal(true);
                }}
                className="inline-flex items-center space-x-2 bg-[#95B2B8] hover:bg-[#82A3A9] text-[#172326] font-mono text-xs uppercase font-bold px-4 py-2.5 rounded-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add Product</span>
              </button>
            </div>

            {loadingData ? (
              <div className="p-12 text-center text-xs font-mono text-gray-500">Loading catalog items...</div>
            ) : products.length > 0 ? (
              <div className="bg-white border border-[#E5EBEC] rounded-sm overflow-x-auto shadow-xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F4F7F7] border-b border-[#E5EBEC] font-mono uppercase text-[#596568]">
                    <tr>
                      <th className="p-3.5">Product Name</th>
                      <th className="p-3.5">Category</th>
                      <th className="p-3.5">Availability</th>
                      <th className="p-3.5">Featured</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5EBEC]">
                    {products.map((prod) => (
                      <tr key={prod._id} className="hover:bg-[#F4F7F7]/60">
                        <td className="p-3.5 font-bold text-[#172326] flex items-center space-x-2">
                          {prod.images && prod.images[0] && (
                            <img src={prod.images[0]} alt="" className="w-8 h-8 rounded-sm object-cover border border-[#E5EBEC]" />
                          )}
                          <span>{prod.name}</span>
                        </td>
                        <td className="p-3.5 font-mono text-gray-600">{prod.category}</td>
                        <td className="p-3.5">
                          <span className="font-mono text-[10px] px-2 py-0.5 rounded-sm bg-[#95B2B8]/20 text-[#172326] border border-[#95B2B8]/40">
                            {prod.availability}
                          </span>
                        </td>
                        <td className="p-3.5 font-mono">{prod.featured ? '★ Yes' : 'No'}</td>
                        <td className="p-3.5 text-right space-x-2">
                          <button
                            onClick={() => openEditProduct(prod)}
                            className="p-1.5 text-gray-600 hover:text-[#172326] hover:bg-gray-100 rounded-sm"
                            title="Edit Product"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(prod._id)}
                            className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-sm"
                            title="Delete Product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-12 text-center bg-white border border-[#E5EBEC] rounded-sm text-xs font-mono text-gray-500">
                No furniture items in catalog. Click "Add Product" to create one.
              </div>
            )}
          </div>
        )}

        {/* TAB 2: CATEGORIES CONTENT */}
        {activeTab === 'categories' && (
          <div className="mt-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-[#172326]">Furniture Categories</h3>
                <p className="text-xs text-[#596568]">Classifications for navigation and filtering.</p>
              </div>

              <button
                onClick={() => setShowCategoryModal(true)}
                className="inline-flex items-center space-x-2 bg-[#95B2B8] hover:bg-[#82A3A9] text-[#172326] font-mono text-xs uppercase font-bold px-4 py-2.5 rounded-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add Category</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((cat) => (
                <div key={cat._id} className="bg-white border border-[#E5EBEC] p-5 rounded-sm flex flex-col justify-between shadow-xs">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-[#172326] text-base">{cat.name}</h4>
                      <button
                        onClick={() => handleDeleteCategory(cat._id)}
                        className="text-red-500 hover:text-red-700 p-1"
                        title="Delete Category"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-xs text-[#596568] line-clamp-2">{cat.description || 'No description provided.'}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: GALLERY CONTENT */}
        {activeTab === 'gallery' && (
          <div className="mt-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-[#172326]">Visual Gallery Items</h3>
                <p className="text-xs text-[#596568]">Manage reference imagery for the gallery page.</p>
              </div>

              <button
                onClick={() => setShowGalleryModal(true)}
                className="inline-flex items-center space-x-2 bg-[#95B2B8] hover:bg-[#82A3A9] text-[#172326] font-mono text-xs uppercase font-bold px-4 py-2.5 rounded-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add Gallery Visual</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {gallery.map((item) => (
                <div key={item._id} className="bg-white border border-[#E5EBEC] rounded-sm overflow-hidden shadow-xs">
                  <div className="aspect-[16/10] bg-[#172326] relative">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    <button
                      onClick={() => handleDeleteGallery(item._id)}
                      className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-sm hover:bg-red-700 shadow-sm"
                      title="Delete Image"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="p-3.5">
                    <span className="font-mono text-[9px] uppercase text-[#95B2B8] block">{item.category}</span>
                    <h4 className="font-bold text-xs text-[#172326] mt-0.5 truncate">{item.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: INQUIRIES CONTENT */}
        {activeTab === 'inquiries' && (
          <div className="mt-6 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-[#172326]">Customer Inquiries</h3>
              <p className="text-xs text-[#596568]">Submitted through the website contact and product inquiry forms.</p>
            </div>

            {loadingData ? (
              <div className="p-12 text-center text-xs font-mono text-gray-500">Loading customer inquiries...</div>
            ) : inquiries.length > 0 ? (
              <div className="space-y-4">
                {inquiries.map((inq) => (
                  <div
                    key={inq._id}
                    className={`bg-white border p-5 rounded-sm shadow-xs transition-colors ${
                      inq.status === 'New' ? 'border-[#95B2B8] bg-white' : 'border-[#E5EBEC] bg-gray-50/50'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-[#E5EBEC] pb-3">
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-bold text-base text-[#172326]">{inq.name}</h4>
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-sm uppercase ${
                            inq.status === 'New'
                              ? 'bg-blue-100 text-blue-800 font-bold'
                              : inq.status === 'Contacted'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-200 text-gray-700'
                          }`}>
                            {inq.status}
                          </span>
                        </div>
                        <span className="text-xs font-mono text-gray-400 block mt-0.5">
                          Received: {new Date(inq.createdAt).toLocaleString()}
                        </span>
                      </div>

                      {/* Callback Action */}
                      <div className="flex items-center space-x-2">
                        <a
                          href={`tel:${inq.phone}`}
                          className="inline-flex items-center space-x-1.5 text-xs font-mono bg-[#172326] text-white hover:bg-[#95B2B8] hover:text-[#172326] px-3 py-1.5 rounded-sm transition-colors"
                        >
                          <Phone className="w-3 h-3 text-[#95B2B8]" />
                          <span>Call {inq.phone}</span>
                        </a>

                        <button
                          onClick={() => handleDeleteInquiry(inq._id)}
                          className="p-1.5 text-red-600 hover:text-red-800 rounded-sm"
                          title="Delete inquiry"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="pt-3 space-y-2 text-xs">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-[11px] text-gray-500">
                        <div>Phone: <strong className="text-[#172326]">{inq.phone}</strong></div>
                        <div>Email: <strong className="text-[#172326]">{inq.email || 'None'}</strong></div>
                        <div>Product: <strong className="text-[#172326]">{inq.productName || 'General'}</strong></div>
                      </div>

                      <div className="bg-[#F4F7F7] p-3 rounded-sm border border-[#E5EBEC] text-[#172326] leading-relaxed">
                        <strong className="block text-gray-500 font-mono text-[10px] uppercase mb-1">
                          Subject: {inq.subject}
                        </strong>
                        <p className="whitespace-pre-wrap">{inq.message}</p>
                      </div>

                      {/* Status Update Buttons */}
                      <div className="pt-2 flex items-center space-x-2 font-mono text-[11px]">
                        <span className="text-gray-400">Mark as:</span>
                        <button
                          onClick={() => handleUpdateInquiryStatus(inq._id, 'New')}
                          className="px-2 py-0.5 bg-gray-100 hover:bg-gray-200 rounded-sm"
                        >
                          New
                        </button>
                        <button
                          onClick={() => handleUpdateInquiryStatus(inq._id, 'Contacted')}
                          className="px-2 py-0.5 bg-green-100 text-green-800 hover:bg-green-200 rounded-sm font-semibold"
                        >
                          Contacted
                        </button>
                        <button
                          onClick={() => handleUpdateInquiryStatus(inq._id, 'Archived')}
                          className="px-2 py-0.5 bg-gray-200 text-gray-800 hover:bg-gray-300 rounded-sm"
                        >
                          Archived
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center bg-white border border-[#E5EBEC] rounded-sm text-xs font-mono text-gray-500">
                No customer inquiries received yet.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Product Add / Edit Modal */}
      {showProductModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white max-w-xl w-full p-6 sm:p-8 rounded-sm shadow-xl space-y-4 my-8">
            <div className="flex items-center justify-between border-b border-[#E5EBEC] pb-3">
              <h3 className="text-lg font-bold text-[#172326]">
                {editingProduct ? 'Edit Furniture Item' : 'Add New Furniture Item'}
              </h3>
              <button onClick={() => setShowProductModal(false)} className="text-gray-400 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-3 text-xs">
              <div>
                <label className="block font-mono uppercase text-[#596568] mb-1">Product Name *</label>
                <input
                  type="text"
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  required
                  placeholder="e.g. AeroLine Executive Desk"
                  className="w-full p-2 bg-[#F4F7F7] border border-[#E5EBEC] rounded-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono uppercase text-[#596568] mb-1">Category *</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full p-2 bg-[#F4F7F7] border border-[#E5EBEC] rounded-sm"
                  >
                    {categories.length > 0 ? (
                      categories.map(c => <option key={c._id} value={c.name}>{c.name}</option>)
                    ) : (
                      <>
                        <option value="Office Desks">Office Desks</option>
                        <option value="Office Chairs">Office Chairs</option>
                        <option value="Workstations">Workstations</option>
                        <option value="Storage">Storage</option>
                        <option value="Meeting Furniture">Meeting Furniture</option>
                        <option value="Workspace Accessories">Workspace Accessories</option>
                      </>
                    )}
                  </select>
                </div>

                <div>
                  <label className="block font-mono uppercase text-[#596568] mb-1">Availability</label>
                  <select
                    value={productForm.availability}
                    onChange={(e) => setProductForm({ ...productForm, availability: e.target.value })}
                    className="w-full p-2 bg-[#F4F7F7] border border-[#E5EBEC] rounded-sm"
                  >
                    <option value="Available on Inquiry">Available on Inquiry</option>
                    <option value="Available on Order">Available on Order</option>
                    <option value="Ready for Delivery">Ready for Delivery</option>
                    <option value="Custom Fabrication Available">Custom Fabrication Available</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-mono uppercase text-[#596568] mb-1">Image URLs (comma separated)</label>
                <input
                  type="text"
                  value={productForm.images}
                  onChange={(e) => setProductForm({ ...productForm, images: e.target.value })}
                  placeholder="https://images.unsplash.com/..., https://..."
                  className="w-full p-2 bg-[#F4F7F7] border border-[#E5EBEC] rounded-sm font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block font-mono uppercase text-[#596568] mb-1">Description *</label>
                <textarea
                  rows={3}
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  required
                  placeholder="Technical description of the furniture item..."
                  className="w-full p-2 bg-[#F4F7F7] border border-[#E5EBEC] rounded-sm"
                />
              </div>

              <div>
                <label className="block font-mono uppercase text-[#596568] mb-1">
                  Specifications (Key: Value per line)
                </label>
                <textarea
                  rows={3}
                  value={productForm.specs}
                  onChange={(e) => setProductForm({ ...productForm, specs: e.target.value })}
                  placeholder="Dimensions: 1600mm x 800mm&#10;Material: Melamine / Powder-coated Steel"
                  className="w-full p-2 bg-[#F4F7F7] border border-[#E5EBEC] rounded-sm font-mono text-[11px]"
                />
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={productForm.featured}
                  onChange={(e) => setProductForm({ ...productForm, featured: e.target.checked })}
                  className="rounded-sm"
                />
                <label htmlFor="featured" className="font-mono text-xs text-[#172326]">
                  Show in Home Page Featured Spotlight
                </label>
              </div>

              <div className="pt-4 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowProductModal(false)}
                  className="px-4 py-2 border border-[#E5EBEC] font-mono rounded-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#95B2B8] hover:bg-[#82A3A9] text-[#172326] font-mono font-bold rounded-sm uppercase"
                >
                  Save Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Category Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full p-6 rounded-sm shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#E5EBEC] pb-2">
              <h3 className="text-base font-bold text-[#172326]">Create Category</h3>
              <button onClick={() => setShowCategoryModal(false)}><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={handleSaveCategory} className="space-y-3 text-xs">
              <div>
                <label className="block font-mono uppercase text-[#596568] mb-1">Category Name *</label>
                <input
                  type="text"
                  required
                  value={categoryForm.name}
                  onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                  placeholder="e.g. Ergonomic Pods"
                  className="w-full p-2 bg-[#F4F7F7] border border-[#E5EBEC] rounded-sm"
                />
              </div>
              <div>
                <label className="block font-mono uppercase text-[#596568] mb-1">Description</label>
                <textarea
                  rows={2}
                  value={categoryForm.description}
                  onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                  className="w-full p-2 bg-[#F4F7F7] border border-[#E5EBEC] rounded-sm"
                />
              </div>
              <div>
                <label className="block font-mono uppercase text-[#596568] mb-1">Image URL</label>
                <input
                  type="text"
                  value={categoryForm.image}
                  onChange={(e) => setCategoryForm({ ...categoryForm, image: e.target.value })}
                  placeholder="https://..."
                  className="w-full p-2 bg-[#F4F7F7] border border-[#E5EBEC] rounded-sm font-mono text-[11px]"
                />
              </div>
              <div className="pt-2 flex justify-end space-x-2">
                <button type="button" onClick={() => setShowCategoryModal(false)} className="px-3 py-1.5 border rounded-sm font-mono">Cancel</button>
                <button type="submit" className="px-4 py-1.5 bg-[#95B2B8] text-[#172326] font-mono font-bold rounded-sm uppercase">Add Category</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Gallery Modal */}
      {showGalleryModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full p-6 rounded-sm shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#E5EBEC] pb-2">
              <h3 className="text-base font-bold text-[#172326]">Add Gallery Image</h3>
              <button onClick={() => setShowGalleryModal(false)}><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={handleSaveGallery} className="space-y-3 text-xs">
              <div>
                <label className="block font-mono uppercase text-[#596568] mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={galleryForm.title}
                  onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                  placeholder="e.g. Modern Executive Layout"
                  className="w-full p-2 bg-[#F4F7F7] border border-[#E5EBEC] rounded-sm"
                />
              </div>
              <div>
                <label className="block font-mono uppercase text-[#596568] mb-1">Image URL *</label>
                <input
                  type="text"
                  required
                  value={galleryForm.image}
                  onChange={(e) => setGalleryForm({ ...galleryForm, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full p-2 bg-[#F4F7F7] border border-[#E5EBEC] rounded-sm font-mono text-[11px]"
                />
              </div>
              <div>
                <label className="block font-mono uppercase text-[#596568] mb-1">Category</label>
                <input
                  type="text"
                  value={galleryForm.category}
                  onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value })}
                  placeholder="e.g. Workstations"
                  className="w-full p-2 bg-[#F4F7F7] border border-[#E5EBEC] rounded-sm"
                />
              </div>
              <div className="pt-2 flex justify-end space-x-2">
                <button type="button" onClick={() => setShowGalleryModal(false)} className="px-3 py-1.5 border rounded-sm font-mono">Cancel</button>
                <button type="submit" className="px-4 py-1.5 bg-[#95B2B8] text-[#172326] font-mono font-bold rounded-sm uppercase">Add Visual</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
