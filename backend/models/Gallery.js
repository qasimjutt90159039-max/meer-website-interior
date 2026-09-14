import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: [true, 'Image URL or path is required'],
      trim: true,
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    category: {
      type: String,
      trim: true,
      default: 'General',
    },
  },
  {
    timestamps: true,
  }
);

export const Gallery = mongoose.model('Gallery', gallerySchema);
export default Gallery;
