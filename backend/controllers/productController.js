import Product from '../models/Product.js';
import { getModel } from '../config/db.js';

const getProductModel = () => getModel('products', Product);

export const getProducts = async (req, res) => {
  try {
    const { category, search, sort, featured } = req.query;
    const filter = {};

    if (category && category !== 'All') {
      filter.category = { $regex: new RegExp(`^${category}$`, 'i') };
    }

    if (search && search.trim() !== '') {
      filter.$or = [
        { name: { $regex: search.trim(), $options: 'i' } },
        { description: { $regex: search.trim(), $options: 'i' } },
        { category: { $regex: search.trim(), $options: 'i' } },
      ];
    }

    if (featured === 'true') {
      filter.featured = true;
    }

    const Model = getProductModel();
    let query = Model.find(filter);

    if (query.sort) {
      if (sort === 'name-asc') {
        query = query.sort({ name: 1 });
      } else if (sort === 'name-desc') {
        query = query.sort({ name: -1 });
      } else if (sort === 'oldest') {
        query = query.sort({ createdAt: 1 });
      } else {
        query = query.sort({ createdAt: -1 });
      }
    }

    const products = await (query.exec ? query.exec() : query);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving products', error: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const Model = getProductModel();
    const product = await Model.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving product', error: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, category, description, images, specifications, availability, featured } = req.body;

    if (!name || !category || !description) {
      return res.status(400).json({ message: 'Name, category, and description are required' });
    }

    const Model = getProductModel();
    const productData = {
      name,
      category,
      description,
      images: Array.isArray(images) ? images : (images ? [images] : []),
      specifications: specifications || {},
      availability: availability || 'Available on Inquiry',
      featured: Boolean(featured),
    };

    let savedProduct;
    if (Model.create) {
      savedProduct = await Model.create(productData);
    } else {
      const prod = new Product(productData);
      savedProduct = await prod.save();
    }

    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: 'Error creating product', error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const Model = getProductModel();
    const product = await Model.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const updates = req.body;
    let updatedProduct;

    if (Model.findByIdAndUpdate) {
      updatedProduct = await Model.findByIdAndUpdate(req.params.id, updates, { new: true });
    } else {
      Object.assign(product, updates);
      updatedProduct = await product.save();
    }

    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: 'Error updating product', error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const Model = getProductModel();
    const product = await Model.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await Model.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product successfully removed' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
};
