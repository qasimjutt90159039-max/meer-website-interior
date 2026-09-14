import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, AlertCircle, Phone } from 'lucide-react';
import api from '../services/api';

export const InquiryModal = ({ isOpen, onClose, prefillProduct = null }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (prefillProduct) {
      setFormData((prev) => ({
        ...prev,
        subject: `Inquiry regarding: ${prefillProduct.name}`,
        message: `Hello Meer's Interior, I would like to inquire about specifications, finishes, and order details for "${prefillProduct.name}".`,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        subject: 'General Furniture Inquiry',
        message: '',
      }));
    }
    setSuccess(false);
    setError(null);
  }, [prefillProduct, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.name.trim() || !formData.phone.trim() || !formData.message.trim()) {
      setError('Please provide your name, phone number, and message.');
      return;
    }

    try {
      setLoading(true);
      await api.submitInquiry({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
        productId: prefillProduct?._id || null,
        productName: prefillProduct?.name || '',
      });
      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Failed to submit inquiry. Please try calling directly at +92 300 9490734.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn"
    >
      <div className="bg-white border border-[#E5EBEC] max-w-lg w-full rounded-sm shadow-2xl overflow-hidden relative">
        {/* Modal Header */}
        <div className="bg-[#172326] px-6 py-4 flex items-center justify-between text-white border-b border-[#324145]">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#95B2B8] block">
              Direct Furniture Consultation
            </span>
            <h3 className="text-lg font-bold">
              {prefillProduct ? `Inquire: ${prefillProduct.name}` : "Inquire with Meer's Interior"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-sm text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close inquiry modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {success ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#95B2B8]/20 border border-[#95B2B8] text-[#95B2B8] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-[#172326]">Inquiry Sent Successfully</h4>
              <p className="text-sm text-[#596568] max-w-sm mx-auto">
                Thank you for contacting Meer's Interior. Our team will review your requirements and get back to you promptly at {formData.phone}.
              </p>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-[#172326] hover:bg-[#202A2D] text-white font-mono text-xs uppercase px-6 py-2.5 rounded-sm transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-sm flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#596568] mb-1">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter full name"
                    className="w-full text-xs sm:text-sm px-3 py-2 bg-[#F4F7F7] border border-[#E5EBEC] focus:border-[#95B2B8] focus:bg-white focus:outline-none rounded-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#596568] mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+92 300 0000000"
                    className="w-full text-xs sm:text-sm px-3 py-2 bg-[#F4F7F7] border border-[#E5EBEC] focus:border-[#95B2B8] focus:bg-white focus:outline-none rounded-sm font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#596568] mb-1">
                    Email Address <span className="text-gray-400">(Optional)</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="client@company.com"
                    className="w-full text-xs sm:text-sm px-3 py-2 bg-[#F4F7F7] border border-[#E5EBEC] focus:border-[#95B2B8] focus:bg-white focus:outline-none rounded-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#596568] mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Furniture inquiry"
                    className="w-full text-xs sm:text-sm px-3 py-2 bg-[#F4F7F7] border border-[#E5EBEC] focus:border-[#95B2B8] focus:bg-white focus:outline-none rounded-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#596568] mb-1">
                  Message / Requirements <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Specify workspace size, quantities, or customization requests..."
                  className="w-full text-xs sm:text-sm p-3 bg-[#F4F7F7] border border-[#E5EBEC] focus:border-[#95B2B8] focus:bg-white focus:outline-none rounded-sm"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <a
                  href="tel:+923009490734"
                  className="inline-flex items-center space-x-1.5 text-xs font-mono text-[#596568] hover:text-[#172326]"
                >
                  <Phone className="w-3.5 h-3.5 text-[#95B2B8]" />
                  <span>Call: +92 300 9490734</span>
                </a>

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center space-x-2 bg-[#95B2B8] hover:bg-[#82A3A9] text-[#172326] font-bold text-xs font-mono uppercase px-5 py-2.5 rounded-sm transition-colors disabled:opacity-50"
                >
                  {loading ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <span>Send Inquiry</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default InquiryModal;
