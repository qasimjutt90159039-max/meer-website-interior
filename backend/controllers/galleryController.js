import Gallery from '../models/Gallery.js';
import { getModel } from '../config/db.js';

const getGalleryModel = () => getModel('gallery', Gallery);

export const getGallery = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = {};
    if (category && category !== 'All') {
      filter.category = category;
    }
    const Model = getGalleryModel();
    const query = Model.find(filter);
    const items = await (query.sort ? query.sort({ createdAt: -1 }) : query);
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving gallery items', error: error.message });
  }
};

export const createGalleryItem = async (req, res) => {
  try {
    const { image, title, description, category } = req.body;

    if (!image || !title) {
      return res.status(400).json({ message: 'Image URL and title are required' });
    }

    const Model = getGalleryModel();
    const itemData = {
      image,
      title,
      description: description || '',
      category: category || 'General',
    };

    let savedItem;
    if (Model.create) {
      savedItem = await Model.create(itemData);
    } else {
      const g = new Gallery(itemData);
      savedItem = await g.save();
    }

    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: 'Error saving gallery item', error: error.message });
  }
};

export const deleteGalleryItem = async (req, res) => {
  try {
    const Model = getGalleryModel();
    const item = await Model.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }

    await Model.findByIdAndDelete(req.params.id);
    res.json({ message: 'Gallery item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting gallery item', error: error.message });
  }
};
