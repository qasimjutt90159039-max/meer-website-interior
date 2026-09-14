import Category from '../models/Category.js';
import { getModel } from '../config/db.js';

const getCategoryModel = () => getModel('categories', Category);

export const getCategories = async (req, res) => {
  try {
    const Model = getCategoryModel();
    const categories = await Model.find({});
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving categories', error: error.message });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { name, description, image } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Category name is required' });
    }

    const Model = getCategoryModel();
    const existing = await Model.findOne({ name });
    if (existing) {
      return res.status(400).json({ message: 'A category with this name already exists' });
    }

    const categoryData = {
      name,
      description: description || '',
      image: image || '',
    };

    let savedCategory;
    if (Model.create) {
      savedCategory = await Model.create(categoryData);
    } else {
      const cat = new Category(categoryData);
      savedCategory = await cat.save();
    }

    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(400).json({ message: 'Error creating category', error: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const Model = getCategoryModel();
    const category = await Model.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const updates = req.body;
    let updatedCategory;
    if (Model.findByIdAndUpdate) {
      updatedCategory = await Model.findByIdAndUpdate(req.params.id, updates, { new: true });
    } else {
      Object.assign(category, updates);
      updatedCategory = await category.save();
    }

    res.json(updatedCategory);
  } catch (error) {
    res.status(400).json({ message: 'Error updating category', error: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const Model = getCategoryModel();
    const category = await Model.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    await Model.findByIdAndDelete(req.params.id);
    res.json({ message: 'Category removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting category', error: error.message });
  }
};
