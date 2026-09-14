import { initialCategories, initialProducts, initialGallery } from '../utils/seedData.js';

// Fallback in-memory store for when MongoDB service is not running locally
class MemoryCollection {
  constructor(initialData = []) {
    this.data = initialData.map((item, idx) => ({
      ...item,
      _id: item._id || `mem_${Date.now()}_${idx}_${Math.random().toString(36).substr(2, 6)}`,
      createdAt: item.createdAt || new Date(),
      updatedAt: item.updatedAt || new Date(),
    }));
  }

  find(filter = {}) {
    let result = [...this.data];

    // Filter by category
    if (filter.category) {
      if (filter.category instanceof RegExp) {
        result = result.filter(item => filter.category.test(item.category));
      } else if (typeof filter.category === 'object' && filter.category.$regex) {
        result = result.filter(item => filter.category.$regex.test(item.category));
      } else {
        result = result.filter(item => (item.category || '').toLowerCase() === filter.category.toLowerCase());
      }
    }

    // Filter by search ($or)
    if (filter.$or && Array.isArray(filter.$or)) {
      result = result.filter(item => {
        return filter.$or.some(clause => {
          if (clause.name?.$regex) return clause.name.$regex.test(item.name || '');
          if (clause.description?.$regex) return clause.description.$regex.test(item.description || '');
          if (clause.category?.$regex) return clause.category.$regex.test(item.category || '');
          return false;
        });
      });
    }

    // Filter by featured
    if (filter.featured !== undefined) {
      result = result.filter(item => Boolean(item.featured) === Boolean(filter.featured));
    }

    // Filter by status
    if (filter.status && filter.status !== 'All') {
      result = result.filter(item => item.status === filter.status);
    }

    // Return query chain
    return {
      sort: (sortObj = {}) => {
        if (sortObj.name === 1) {
          result.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
        } else if (sortObj.name === -1) {
          result.sort((a, b) => (b.name || '').localeCompare(a.name || ''));
        } else if (sortObj.createdAt === 1) {
          result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        } else {
          result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }
        return {
          exec: async () => result,
          then: (resolve) => resolve(result),
        };
      },
      exec: async () => result,
      then: (resolve) => resolve(result),
    };
  }

  async findById(id) {
    const item = this.data.find(d => String(d._id) === String(id));
    if (!item) return null;
    return {
      ...item,
      save: async function() {
        this.updatedAt = new Date();
        return this;
      }
    };
  }

  async findOne(query) {
    for (const item of this.data) {
      let match = true;
      for (const key of Object.keys(query)) {
        if (query[key] instanceof RegExp) {
          if (!query[key].test(item[key])) match = false;
        } else if (typeof query[key] === 'object' && query[key].$regex) {
          if (!query[key].$regex.test(item[key])) match = false;
        } else if (item[key] !== query[key]) {
          match = false;
        }
      }
      if (match) {
        return {
          ...item,
          save: async function() {
            this.updatedAt = new Date();
            return this;
          },
          comparePassword: async function(pass) {
            return pass === this.password;
          }
        };
      }
    }
    return null;
  }

  async countDocuments() {
    return this.data.length;
  }

  async insertMany(items) {
    const prepared = items.map((item, idx) => ({
      ...item,
      _id: item._id || `mem_${Date.now()}_${idx}_${Math.random().toString(36).substr(2, 6)}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    this.data.push(...prepared);
    return prepared;
  }

  async create(itemData) {
    const newItem = {
      ...itemData,
      _id: `mem_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.data.unshift(newItem);
    return newItem;
  }

  async findByIdAndUpdate(id, updates) {
    const idx = this.data.findIndex(d => String(d._id) === String(id));
    if (idx === -1) return null;
    this.data[idx] = { ...this.data[idx], ...updates, updatedAt: new Date() };
    return this.data[idx];
  }

  async findByIdAndDelete(id) {
    const idx = this.data.findIndex(d => String(d._id) === String(id));
    if (idx === -1) return null;
    const removed = this.data.splice(idx, 1);
    return removed[0];
  }
}

export const memoryStore = {
  products: new MemoryCollection(initialProducts),
  categories: new MemoryCollection(initialCategories),
  gallery: new MemoryCollection(initialGallery),
  inquiries: new MemoryCollection([]),
  users: new MemoryCollection([
    { username: process.env.ADMIN_USERNAME || 'admin', password: process.env.ADMIN_PASSWORD || 'meersadmin2026', role: 'admin' }
  ]),
};
