import React, { useState } from 'react';
import { Globe, ArrowRight, ShieldCheck, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

function PledgeForm() {
  const [formData, setFormData] = useState({
    name: '',
    village: '',
    district: '',
    phone: '',
    email: '',
    message: '',
    consent: false
  });
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    // Google Apps Script Web App URL
    const scriptURL = 'https://script.google.com/macros/s/AKfycbwwzVb-vOfYCG173dIJUjkDP6HDzAY08xum6NMttX0eHCPZn4piy__vGEPgmopZBl8/exec';

    try {
      // Create FormData from the form element
      const formBody = new FormData();
      Object.keys(formData).forEach(key => {
        formBody.append(key, formData[key]);
      });

      const response = await fetch(scriptURL, {
        method: 'POST',
        body: formBody,
        // mode: 'no-cors' // Optional: use if CORS errors persist, but prevents reading response
      });

      // With Google Apps Script, we might validly get a response if the access controls are right.
      // If using 'no-cors', response.ok will be false/opaque.
      // We'll assume success if it doesn't throw, or check response if possible.

      if (response.ok || response.type === 'opaque') {
        setStatus('success');
        setFormData({ name: '', village: '', district: '', phone: '', email: '', message: '', consent: false });
      } else {
        setStatus('error');
        console.error('Submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center py-10 bg-green-50 rounded-xl border border-green-200">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <ShieldCheck size={32} />
        </div>
        <h3 className="text-2xl font-bold text-green-800 mb-2">Thank You!</h3>
        <p className="text-green-700">Your support has been recorded for the petition.</p>
        <button onClick={() => setStatus('idle')} className="mt-6 text-green-700 underline font-medium">Add another supporter</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-bold text-stone-700 mb-1">Full Name <span className="text-red-500">*</span></label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g. Ravi Kumar"
          required
          className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-stone-700 mb-1">Village / Town <span className="text-red-500">*</span></label>
          <input
            name="village"
            value={formData.village}
            onChange={handleChange}
            placeholder="e.g. Kokkare Bellur"
            required
            className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-stone-700 mb-1">District <span className="text-red-500">*</span></label>
          <input
            name="district"
            value={formData.district}
            onChange={handleChange}
            placeholder="e.g. Mandya"
            required
            className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-stone-700 mb-1">Phone</label>
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Optional"
            className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-stone-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Optional"
            className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-stone-700 mb-1">Message of Support</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Why do you support the protection of this wetland? (Optional)"
          rows="3"
          className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all resize-none"
        />
      </div>

      <label className="flex items-start gap-3 p-4 bg-stone-50 rounded-lg border border-stone-200 cursor-pointer hover:bg-stone-100 transition-colors">
        <input
          type="checkbox"
          name="consent"
          checked={formData.consent}
          onChange={handleChange}
          required
          className="mt-1 w-5 h-5 text-orange-600 rounded focus:ring-orange-500 border-gray-300"
        />
        <span className="text-sm text-stone-600">
          I agree that my name and locality may be submitted to government authorities as part of this citizen petition to protect Kokkare Bellur.
        </span>
      </label>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full bg-orange-600 text-white font-bold py-4 rounded-xl hover:bg-orange-700 transition-colors shadow-lg hover:shadow-xl active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {status === 'submitting' ? 'Submitting...' : 'Add My Support'}
      </button>

      {status === 'error' && (
        <p className="text-red-500 text-center text-sm">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}

function PetitionPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Back to Home Button */}
      <div className="bg-white border-b border-stone-200 py-4 px-6 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-stone-600 hover:text-stone-900 font-medium transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>

      {/* PUBLIC PLEDGE REGISTRY */}
      <section className="py-24 bg-stone-100">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-stone-900 text-center">
            Citizen Petition for Kokkare Bellur
          </h1>
          <p className="text-lg text-stone-600 text-center mb-12 max-w-3xl mx-auto">
            Join the movement to protect wetlands and nesting trees. Add your voice to this transparent, public petition.
          </p>

          <h2 className="text-3xl font-bold mb-10 flex items-center gap-3 text-stone-900 border-b border-stone-300 pb-4">
            <span className="bg-stone-800 text-white p-2 rounded-lg"><Globe size={24} /></span> Public Pledge Registry
          </h2>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-stone-200 h-[600px]">
            <iframe
              src="https://docs.google.com/spreadsheets/d/1n1xjK6ahu06wmNV4xpRddi8OSGumQpuERQhfYKg6-Us/preview?usp=sharing"
              className="w-full h-full border-0"
              title="Public Pledge Registry"
            ></iframe>
          </div>
          <div className="mt-4 text-center">
            <a href="https://docs.google.com/spreadsheets/d/1n1xjK6ahu06wmNV4xpRddi8OSGumQpuERQhfYKg6-Us/edit?usp=sharing" target="_blank" rel="noopener noreferrer" className="text-stone-500 hover:text-stone-800 text-sm font-medium inline-flex items-center gap-1 transition-colors">
              View Full Sheet <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* PLEDGE SECTION */}
      <section className="py-24 px-6 max-w-3xl mx-auto">
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border-t-8 border-orange-500">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold mb-4 text-stone-900">Support Kokkare Bellur</h2>
            <p className="text-lg text-stone-600">
              Add your name to this citizen petition calling for wetland and nesting‑tree protection.
            </p>
          </div>

          <PledgeForm />

        </div>

        <div className="mt-12 text-center">
          <p className="text-stone-500 mb-4 text-sm">Transparent Advocacy</p>
          <div className="inline-flex items-center gap-2 text-stone-600 border border-stone-300 px-4 py-2 rounded-full text-sm font-medium bg-stone-50 cursor-default">
            <Globe size={16} /> Data synced to Public Registry (Google Sheets)
          </div>
        </div>
      </section>
    </div>
  );
}

export default PetitionPage;
