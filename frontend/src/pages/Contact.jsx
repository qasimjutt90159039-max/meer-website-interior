import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Phone,
  MapPin,
  ExternalLink,
  Send,
  CheckCircle2,
  AlertCircle,
  Clock,
  Building
} from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import api from '../services/api';

export const Contact = () => {
  const [searchParams] = useSearchParams();
  const prefillSubject = searchParams.get('subject') || '';
  const prefillProduct = searchParams.get('product') || '';
  const prefillId = searchParams.get('id') || '';

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: prefillSubject || (prefillProduct ? `Inquiry regarding ${prefillProduct}` : ''),
    message: prefillProduct ? `Hello Meer's Interior, I would like to inquire about specifications, finishes, and order details for "${prefillProduct}".` : '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.name.trim() || !formData.phone.trim() || !formData.message.trim()) {
      setError('Please fill in your Name, Phone number, and Message.');
      return;
    }

    try {
      setLoading(true);
      await api.submitInquiry({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim() || 'General Furniture Inquiry',
        message: formData.message.trim(),
        productId: prefillId || null,
        productName: prefillProduct || '',
      });
      setSuccess(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (err) {
      setError(err.message || 'Unable to submit inquiry at this time. Please call directly at +92 300 9490734.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20">
      {/* Page Header */}
      <section className="bg-[#172326] text-white py-20 border-b border-[#324145] relative overflow-hidden">
        <div className="absolute inset-0 bg-tech-grid-dark opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#95B2B8] block mb-2 font-semibold">
            COMMUNICATION
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            Contact Meer’s Interior.
          </h1>
          <p className="mt-4 text-gray-300 max-w-2xl text-sm sm:text-base font-light leading-relaxed">
            Reach our showroom in Anarkali Bazaar, Lahore directly by phone or submit an inquiry with your office layout requirements.
          </p>
        </div>
      </section>

      {/* Main Content: Info & Inquiry Form */}
      <section className="py-20 bg-[#F4F7F7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Authentic Business Information */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white border border-[#E5EBEC] p-6 sm:p-8 rounded-sm shadow-sm space-y-6">
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-[#95B2B8] font-bold block mb-1">
                    Store Profile
                  </span>
                  <h2 className="text-2xl font-extrabold text-[#172326]">
                    Meer’s Interior
                  </h2>
                  <p className="text-xs font-mono uppercase text-[#596568] mt-0.5">
                    Category: Office Furniture Store
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-[#E5EBEC]">
                  {/* Phone Direct */}
                  <div>
                    <span className="font-mono text-[10px] uppercase text-gray-400 block mb-1">
                      Direct Telephone Line
                    </span>
                    <a
                      href="tel:+923009490734"
                      className="text-lg font-mono font-bold text-[#172326] hover:text-[#95B2B8] flex items-center space-x-2 transition-colors"
                    >
                      <Phone className="w-5 h-5 text-[#95B2B8]" />
                      <span>+92 300 9490734</span>
                    </a>
                  </div>

                  {/* Physical Address */}
                  <div>
                    <span className="font-mono text-[10px] uppercase text-gray-400 block mb-1">
                      Showroom Address
                    </span>
                    <p className="text-sm font-medium text-[#172326] flex items-start space-x-2 leading-relaxed">
                      <MapPin className="w-5 h-5 text-[#95B2B8] shrink-0 mt-0.5" />
                      <span>4 Mission Rd, Anarkali Bazaar Lahore, 54000, Pakistan</span>
                    </p>
                  </div>

                  {/* Facebook Direct Link */}
                  <div>
                    <span className="font-mono text-[10px] uppercase text-gray-400 block mb-1">
                      Official Facebook Page
                    </span>
                    <a
                      href="http://www.facebook.com/MeersInterior"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-mono font-medium text-[#172326] hover:text-[#95B2B8] flex items-center space-x-2 transition-colors break-all"
                    >
                      <span className="w-5 h-5 rounded-full bg-[#172326] text-white flex items-center justify-center text-xs font-bold shrink-0">f</span>
                      <span>http://www.facebook.com/MeersInterior</span>
                    </a>
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="pt-6 border-t border-[#E5EBEC] flex flex-col sm:flex-row gap-3">
                  <a
                    href="tel:+923009490734"
                    className="flex-1 inline-flex items-center justify-center space-x-2 bg-[#172326] hover:bg-[#202A2D] text-white font-mono text-xs uppercase font-bold py-3.5 px-4 rounded-sm transition-all text-center"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#95B2B8]" />
                    <span>Call Store</span>
                  </a>

                  <a
                    href="https://www.google.com/maps/search/?api=1&query=4+Mission+Rd,+Anarkali+Bazaar+Lahore,+54000,+Pakistan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center space-x-2 bg-[#95B2B8] hover:bg-[#82A3A9] text-[#172326] font-mono text-xs uppercase font-bold py-3.5 px-4 rounded-sm transition-all text-center"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Google Maps</span>
                  </a>
                </div>
              </div>

              {/* Consultation Note */}
              <div className="p-5 bg-white border border-[#E5EBEC] rounded-sm text-xs text-[#596568] space-y-2">
                <span className="font-mono text-[10px] uppercase text-[#172326] font-bold block">
                  Commercial Orders
                </span>
                <p className="leading-relaxed font-light">
                  For large office workstations or modular partition benching, provide approximate room dimensions or seat counts in the inquiry form to receive tailored technical specifications.
                </p>
              </div>
            </div>

            {/* Right Column: Inquiry Submission Form */}
            <div className="lg:col-span-7">
              <div className="bg-white border border-[#E5EBEC] p-6 sm:p-10 rounded-sm shadow-sm space-y-6">
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-[#95B2B8] font-bold block mb-1">
                    Send An Inquiry
                  </span>
                  <h3 className="text-2xl font-extrabold text-[#172326]">
                    Direct Customer Inquiry
                  </h3>
                  <p className="text-xs text-[#596568] mt-1 font-light">
                    Submit your requirements below. Our team at Meer’s Interior will review and follow up with you.
                  </p>
                </div>

                {success && (
                  <div className="p-4 bg-green-50 border border-green-200 text-green-800 rounded-sm flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 shrink-0 text-green-600 mt-0.5" />
                    <div className="text-xs space-y-1">
                      <span className="font-bold block">Inquiry Received</span>
                      <p>Thank you. Your message has been safely saved. The Meer’s Interior team will get in touch with you shortly.</p>
                      <button
                        type="button"
                        onClick={() => setSuccess(false)}
                        className="mt-2 font-mono underline text-[11px] text-green-900"
                      >
                        Submit another inquiry
                      </button>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-sm flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 shrink-0 text-red-600 mt-0.5" />
                    <div className="space-y-1">
                      <span className="font-bold block">Submission Error</span>
                      <p>{error}</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-[#596568] mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Tariq Mehmood"
                        className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-[#F4F7F7] border border-[#E5EBEC] focus:border-[#95B2B8] focus:bg-white focus:outline-none rounded-sm"
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
                        className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-[#F4F7F7] border border-[#E5EBEC] focus:border-[#95B2B8] focus:bg-white focus:outline-none rounded-sm font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-[#596568] mb-1">
                        Email Address <span className="text-gray-400 font-normal">(Optional)</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="name@company.com"
                        className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-[#F4F7F7] border border-[#E5EBEC] focus:border-[#95B2B8] focus:bg-white focus:outline-none rounded-sm"
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
                        placeholder="e.g. Workstations for 8 persons"
                        className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-[#F4F7F7] border border-[#E5EBEC] focus:border-[#95B2B8] focus:bg-white focus:outline-none rounded-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-[#596568] mb-1">
                      Inquiry Message / Requirements <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Describe what office furniture or workstation configuration you require..."
                      className="w-full text-xs sm:text-sm p-3 bg-[#F4F7F7] border border-[#E5EBEC] focus:border-[#95B2B8] focus:bg-white focus:outline-none rounded-sm"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <p className="text-[11px] font-mono text-gray-400">
                      * Required fields
                    </p>

                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex items-center space-x-2 bg-[#95B2B8] hover:bg-[#82A3A9] text-[#172326] font-mono text-xs uppercase font-bold px-7 py-3.5 rounded-sm transition-all disabled:opacity-50 shadow-sm"
                    >
                      {loading ? (
                        <span>Submitting...</span>
                      ) : (
                        <>
                          <span>Submit Inquiry</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
