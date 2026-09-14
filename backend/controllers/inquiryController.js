import Inquiry from '../models/Inquiry.js';
import Product from '../models/Product.js';
import { getModel } from '../config/db.js';

const getInquiryModel = () => getModel('inquiries', Inquiry);
const getProductModel = () => getModel('products', Product);

export const createInquiry = async (req, res) => {
  try {
    const { name, phone, email, subject, message, productId, productName } = req.body;

    if (!name || name.trim() === '') {
      return res.status(400).json({ message: 'Please provide your name.' });
    }

    if (!phone || phone.trim() === '') {
      return res.status(400).json({ message: 'Please provide a valid contact phone number.' });
    }

    if (!message || message.trim() === '') {
      return res.status(400).json({ message: 'Please provide your message or inquiry details.' });
    }

    let resolvedProductName = productName || '';
    if (productId && !resolvedProductName) {
      try {
        const prodModel = getProductModel();
        const prod = await prodModel.findById(productId);
        if (prod) resolvedProductName = prod.name;
      } catch (err) {
        // continue
      }
    }

    const inquiryData = {
      name: name.trim(),
      phone: phone.trim(),
      email: email ? email.trim() : '',
      subject: subject && subject.trim() !== '' ? subject.trim() : (resolvedProductName ? `Inquiry regarding ${resolvedProductName}` : 'General Furniture Inquiry'),
      message: message.trim(),
      productId: productId || null,
      productName: resolvedProductName,
      status: 'New',
    };

    const Model = getInquiryModel();
    let savedInquiry;
    if (Model.create) {
      savedInquiry = await Model.create(inquiryData);
    } else {
      const inq = new Inquiry(inquiryData);
      savedInquiry = await inq.save();
    }

    res.status(201).json({
      message: "Your inquiry has been received. Meer's Interior team will review and get back to you.",
      inquiry: savedInquiry,
    });
  } catch (error) {
    res.status(500).json({ message: 'Unable to submit inquiry at this time. Please call directly.', error: error.message });
  }
};

export const getInquiries = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = {};
    if (status && status !== 'All') {
      filter.status = status;
    }
    const Model = getInquiryModel();
    const query = Model.find(filter);
    const inquiries = await (query.sort ? query.sort({ createdAt: -1 }) : query);
    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving inquiries', error: error.message });
  }
};

export const updateInquiryStatus = async (req, res) => {
  try {
    const Model = getInquiryModel();
    const inquiry = await Model.findById(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ message: 'Inquiry not found' });
    }

    let updated;
    if (Model.findByIdAndUpdate) {
      updated = await Model.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    } else {
      inquiry.status = req.body.status;
      updated = await inquiry.save();
    }

    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: 'Error updating inquiry status', error: error.message });
  }
};

export const deleteInquiry = async (req, res) => {
  try {
    const Model = getInquiryModel();
    const inquiry = await Model.findById(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ message: 'Inquiry not found' });
    }

    await Model.findByIdAndDelete(req.params.id);
    res.json({ message: 'Inquiry removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting inquiry', error: error.message });
  }
};
