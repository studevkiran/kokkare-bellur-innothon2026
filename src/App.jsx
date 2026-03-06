import React from 'react';
import {
  MapPin,
  Bird,
  AlertTriangle,
  Droplets,
  Users,
  Heart,
  ShieldCheck,
  ArrowRight,
  Info,
  Leaf,
  Globe,
  Trash2,
  Activity // Importing Activity to fix potential missing export issue
} from 'lucide-react';
import paintedStorkImg from './assets/painted_stork_gen.png';
import pelicanImg from './assets/pelican_gen.png';
import villageImg from './assets/village_birds_gen.png';

import { useState } from 'react';
import ConservationActions from './components/ConservationActions';

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

function App() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans selection:bg-orange-200 selection:text-stone-900 overflow-x-hidden">

      {/* 🟢 HERO SECTION - Presentation Title Slide */}
      <section className="relative min-h-screen h-screen flex items-center justify-center overflow-hidden w-full bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(34, 197, 94, 0.3) 0%, transparent 50%),
                            radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
                            radial-gradient(circle at 50% 50%, rgba(251, 146, 60, 0.2) 0%, transparent 50%)`,
            animation: 'pulse 8s ease-in-out infinite'
          }}></div>
        </div>
        
        {/* Dark Overlay for text contrast */}
        <div className="absolute inset-0 bg-black/40 z-10"></div>

        {/* Presentation Content - Centered, Formal */}
        <div className="relative z-20 text-center px-4 sm:px-6 md:px-8 max-w-6xl mx-auto text-white space-y-6 md:space-y-8 py-8 w-full">
          
          {/* Event Header */}
          <div className="space-y-2 md:space-y-3">
            <p className="text-xs sm:text-sm md:text-base lg:text-lg font-bold uppercase tracking-wider md:tracking-[0.2em] text-blue-400 leading-tight px-2">
              National Level Inter Collegiate<br className="sm:hidden" /> Management, IT, Aviation & Cultural Fest
            </p>
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-wide text-orange-400">
              INNOTHON - 2026
            </p>
          </div>

          {/* Event Details - Compact */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 text-center max-w-2xl mx-auto py-2">
            <div className="bg-blue-600/80 backdrop-blur-sm py-2 px-3 sm:py-3 sm:px-4 rounded-lg border border-blue-400/50 shadow-lg">
              <p className="text-[9px] sm:text-[10px] uppercase tracking-wide text-blue-200 mb-1 font-semibold">Date</p>
              <p className="text-xs sm:text-sm md:text-base font-bold text-white leading-tight">6 Mar 2026</p>
            </div>
            <div className="bg-blue-600/80 backdrop-blur-sm py-2 px-3 sm:py-3 sm:px-4 rounded-lg border border-blue-400/50 shadow-lg">
              <p className="text-[9px] sm:text-[10px] uppercase tracking-wide text-blue-200 mb-1 font-semibold">Time</p>
              <p className="text-xs sm:text-sm md:text-base font-bold text-white">8:00 AM</p>
            </div>
            <div className="bg-blue-600/80 backdrop-blur-sm py-2 px-3 sm:py-3 sm:px-4 rounded-lg border border-blue-400/50 shadow-lg">
              <p className="text-[9px] sm:text-[10px] uppercase tracking-wide text-blue-200 mb-1 font-semibold">Venue</p>
              <p className="text-xs sm:text-sm md:text-base font-bold text-white leading-tight">Hindustan</p>
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center justify-center gap-2 md:gap-3 py-3 md:py-4">
            <div className="h-[1px] md:h-[2px] w-12 md:w-16 bg-green-400"></div>
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-400 rounded-full"></div>
            <div className="h-[1px] md:h-[2px] w-12 md:w-16 bg-green-400"></div>
          </div>
          
          {/* Project Title */}
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-white px-2">
            Kokkare Bellur:<br />
            <span className="text-green-400">A Sanctuary Without Fences</span>
          </h1>

          {/* Theme */}
          <div className="bg-black/40 backdrop-blur-sm py-3 md:py-4 px-4 md:px-6 rounded-lg md:rounded-xl border border-yellow-500/30 max-w-4xl mx-auto">
            <p className="text-[10px] sm:text-xs md:text-sm font-semibold uppercase tracking-wider text-yellow-400 mb-1 md:mb-2">Theme</p>
            <p className="text-xs sm:text-sm md:text-base lg:text-xl font-medium text-white leading-relaxed">
              AI-Driven Innovation for Social Impact and Sustainable Development
            </p>
          </div>
          
          {/* Presenters */}
          <div className="pt-2 md:pt-4">
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-green-300 tracking-wide">
              KIRAN & VIDYASHREE C
            </p>
          </div>
          
          {/* Institution */}
          <div className="text-sm sm:text-base md:text-lg font-medium text-white leading-relaxed px-2">
            <p className="font-semibold">Maharajas Institute of Technology</p>
            <p className="text-white/90">First Grade College, Mysore</p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 md:bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-white/70 z-20">
          <ArrowRight className="transform rotate-90 w-6 h-6 md:w-8 md:h-8" />
        </div>
      </section>

      {/* 🟢 ABOUT KOKKARE BELLUR */}
      <section className="py-24 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-bold tracking-wide mb-6 uppercase">
            <Info size={16} /> The Village
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-stone-900 leading-tight">A Sanctuary Without Fences</h2>
          <p className="text-xl text-stone-600 mb-8 leading-relaxed">
            Kokkare Bellur is a small village in Mandya district, Karnataka, famous for hosting large nesting colonies of migratory birds such as <span className="font-semibold text-stone-800">painted storks</span> and <span className="font-semibold text-stone-800">spot-billed pelicans</span>. Unlike conventional bird sanctuaries, birds here nest directly within the village — on trees beside homes, temples, schools, and roads.
          </p>

          <div className="bg-orange-50 p-8 rounded-2xl border border-orange-100 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-3 text-orange-800">
              <Heart size={24} className="text-orange-600 fill-orange-600" />
              Why It Is Unique
            </h3>
            <ul className="space-y-4 text-stone-700 text-lg">
              <li className="flex gap-3 items-start"><span className="text-orange-500 font-bold text-xl mt-[-2px]">•</span> There are no guards, no barriers, and no enforcement laws.</li>
              <li className="flex gap-3 items-start"><span className="text-orange-500 font-bold text-xl mt-[-2px]">•</span> Protection comes from belief, tradition, and community responsibility.</li>
              <li className="flex gap-3 items-start"><span className="text-orange-500 font-bold text-xl mt-[-2px]">•</span> Trees are not cut if birds nest on them. Noise is reduced during breeding season.</li>
            </ul>
            <div className="mt-6 pt-6 border-t border-orange-200 font-serif italic text-xl text-stone-800">
              "This makes Kokkare Bellur one of India’s rare examples of community-led conservation."
            </div>
          </div>
        </div>
        <div className="h-full min-h-[500px] bg-stone-200 rounded-3xl overflow-hidden relative group shadow-2xl">
          <img
            src={villageImg}
            alt="Spot-billed Pelican in flight"
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-8 text-white">
            <p className="font-mono text-sm tracking-wider opacity-80 mb-2">PELICANUS PHILIPPENSIS</p>
            <p className="text-xl font-semibold">Migratory birds nesting amidst village life</p>
          </div>
        </div>
      </section>

      {/* 🟢 LOCATION & WETLAND IMPORTANCE */}
      <section className="py-24 bg-stone-900 text-stone-100 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#4b5563 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-900/50 text-blue-200 rounded-full text-sm font-bold tracking-wide mb-6 border border-blue-700/50 uppercase">
              <MapPin size={16} /> Location & Ecology
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">Wetlands: The Foundation of Life</h2>
            <p className="text-xl md:text-2xl text-stone-400 max-w-4xl mx-auto leading-relaxed">
              Located between Mysuru and Bengaluru, near the Shimsha River basin. The village is surrounded by a network of shallow water bodies locally called <span className="text-blue-400 font-serif italic text-3xl mx-1">kere</span> (tanks).
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { icon: Droplets, title: "Recharge Groundwater", desc: "Wetlands are centuries-old rainwater harvesting systems that collect monsoon rain.", color: "text-blue-400", bg: "bg-blue-500/10" },
              { icon: Leaf, title: "Support Biodiversity", desc: "They support fish populations and provide essential food for migratory birds.", color: "text-green-400", bg: "bg-green-500/10" },
              { icon: Globe, title: "Foundation of Life", desc: "When they dry or become polluted, birds cannot feed, breed, or survive.", color: "text-yellow-400", bg: "bg-yellow-500/10" }
            ].map((item, index) => (
              <div key={index} className="bg-stone-800/50 backdrop-blur-sm p-10 rounded-3xl hover:bg-stone-800 transition-all duration-300 border border-stone-700 group hover:-translate-y-2">
                <div className={`w-20 h-20 ${item.bg} rounded-full flex items-center justify-center mx-auto mb-8 ${item.color} group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon size={40} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">{item.title}</h3>
                <p className="text-stone-400 text-lg leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🟢 WHY KOKKARE BELLUR IS FAMOUS & BIRD SPECIES */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="mb-20 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 border-l-8 border-yellow-400 pl-6 text-stone-900">A Global Nesting Site</h2>
            <p className="text-xl text-stone-600 leading-relaxed mb-8">
              Every year, thousands of migratory birds travel hundreds of kilometers to breed here.
              For decades, villagers even used bird droppings (guano) as natural fertilizer, creating a mutually beneficial relationship.
            </p>
            <div className="bg-stone-100 p-6 rounded-xl border-l-4 border-stone-800">
              <p className="text-2xl font-serif italic text-stone-800">"Birds are not seen as outsiders — they are treated as part of the village."</p>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-yellow-100 rounded-full blur-3xl opacity-50 z-0"></div>
            <Bird className="relative z-10 w-full h-64 text-stone-200" strokeWidth={0.5} />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Painted Storks */}
          <div className="group rounded-3xl overflow-hidden bg-white shadow-xl hover:shadow-2xl transition-all duration-300 border border-stone-100">
            <div className="h-80 overflow-hidden relative">
              <img
                src={paintedStorkImg}
                alt="Painted Stork"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
                <h3 className="text-3xl font-bold text-white">Painted Storks</h3>
              </div>
            </div>
            <div className="p-8">
              <p className="text-stone-600 text-lg mb-6 leading-relaxed">
                They depend on shallow wetlands rich in fish. Their presence is a strong indicator of wetland health.
              </p>
              <div className="bg-red-50 text-red-900 p-4 rounded-xl text-md border-l-4 border-red-500 font-medium flex gap-3">
                <AlertTriangle size={20} className="text-red-600 shrink-0 mt-0.5" />
                <p>If painted storks stop returning, it signals ecosystem failure — not just migration change.</p>
              </div>
            </div>
          </div>

          {/* Spot-Billed Pelicans */}
          <div className="group rounded-3xl overflow-hidden bg-white shadow-xl hover:shadow-2xl transition-all duration-300 border border-stone-100">
            <div className="h-80 overflow-hidden relative">
              <img
                src={pelicanImg}
                alt="Spot-Billed Pelican"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
                <h3 className="text-3xl font-bold text-white">Spot-Billed Pelicans</h3>
              </div>
            </div>
            <div className="p-8">
              <p className="text-stone-600 text-lg mb-6 leading-relaxed">
                Near-threatened birds requiring large quantities of fish and stable water bodies. Even a single failed breeding season can significantly reduce their population.
              </p>
              <div className="bg-orange-50 text-orange-900 p-4 rounded-xl text-md border-l-4 border-orange-500 font-medium flex gap-3">
                <AlertTriangle size={20} className="text-orange-600 shrink-0 mt-0.5" />
                <p>They are among the first species to suffer when wetlands degrade.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 bg-stone-100 p-8 rounded-2xl flex md:items-center gap-6 border border-stone-200">
          <div className="w-16 h-16 bg-stone-200 rounded-full flex items-center justify-center shrink-0 text-stone-500">
            <Activity size={32} />
          </div>
          <div>
            <h4 className="font-bold text-xl mb-2 text-stone-900">Other Waterbirds as Bio-Indicators</h4>
            <p className="text-stone-600 text-lg">
              Cormorants, ibises, herons, and other waterbirds act as ecological sensors. Their disappearance is often the <span className="font-bold text-stone-800">earliest warning</span> of declining water quality. When birds disappear, ecosystems are already collapsing.
            </p>
          </div>
        </div>
      </section>

      {/* 🟢 PROBLEM STATEMENT / THREATS */}
      <section className="py-24 bg-red-950 text-white relative overflow-hidden">
        {/* Abstract shapes */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-900/50 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-black/50 rounded-full blur-3xl -ml-20 -mb-20"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row gap-16">
            <div className="md:w-5/12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-900/80 text-red-200 rounded-full text-sm font-bold tracking-wide mb-6 border border-red-700/50 uppercase">
                <AlertTriangle size={16} /> Crisis Alert
              </div>
              <h2 className="text-5xl md:text-6xl font-bold mb-8 text-white leading-tight">
                The Silence is <br /><span className="text-red-500">Growing</span>.
              </h2>
              <p className="text-red-100/90 text-xl leading-relaxed mb-12">
                The delicate balance Kokkare Bellur has maintained for centuries is now cracking under modern pressures.
              </p>

              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold mb-3 text-red-200">Ecological Impact</h3>
                  <ul className="space-y-2 text-red-100/80">
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>Decline in bird populations</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>Reduction in fish and aquatic life</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>Loss of biodiversity</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3 text-red-200">Human Impact</h3>
                  <ul className="space-y-2 text-red-100/80">
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>Reduced natural pest control</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>Decline in soil fertility</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>Increased water scarcity</li>
                  </ul>
                </div>

                <div className="bg-red-900/30 p-6 rounded-xl border-l-4 border-red-500">
                  <p className="font-mono text-lg text-red-200">
                    "Birds are the first visible victims. Humans experience the consequences later."
                  </p>
                </div>
              </div>
            </div>

            <div className="md:w-7/12 grid sm:grid-cols-1 gap-6 content-start">
              <h3 className="text-2xl font-bold text-red-200 mb-2">Major Environmental Threats</h3>
              {[
                { title: "Drying Wetlands", desc: "Excessive groundwater extraction, irregular monsoons, and poor water management reduce water availability during breeding season." },
                { title: "Agricultural Runoff", desc: "Chemical fertilizers and pesticides flow into wetlands, poisoning fish and aquatic insects." },
                { title: "Sewage Discharge", desc: "Untreated waste degrades water quality, accelerates weed growth, and reduces oxygen levels." },
                { title: "Plastic Pollution", desc: "Birds ingest plastic mistaking it for food, leading to slow and painful death." },
                { title: "Human Disturbance", desc: "Noise, tourism pressure, and infrastructure development disrupt nesting behavior and breeding success." }
              ].map((threat, i) => (
                <div key={i} className="bg-black/20 p-8 rounded-2xl border border-white/5 hover:bg-black/40 transition-colors group">
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-red-400 transition-colors">{threat.title}</h3>
                  <p className="text-red-100/70 text-lg leading-relaxed">{threat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 🟢 SOLUTIONS & WHO SHOULD ACT */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-bold tracking-wide mb-6 uppercase">
            <ShieldCheck size={16} /> The Path Forward
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-stone-900 leading-tight">Solutions & Conservation Measures</h2>
          <p className="text-xl text-stone-600">These solutions are practical, proven, and achievable.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-20">
          <div className="space-y-10">
            <h3 className="text-3xl font-bold flex items-center gap-3 text-stone-800 pb-4 border-b border-stone-200">
              <Leaf className="text-green-600" /> What Can Be Done
            </h3>
            <div className="space-y-8">
              {[
                { title: "Wetland Restoration", text: "Desilting tanks, restoring water flow, and harvesting rainwater revive fish populations and bird breeding cycles." },
                { title: "Regulated Water Usage", text: "Balancing agriculture with ecological limits ensures wetlands retain water during critical months." },
                { title: "Organic Farming", text: "Reducing chemical use prevents poisoning of aquatic life and birds." },
                { title: "Plastic-Free Zones", text: "Eliminating single-use plastics prevents ingestion and contamination." },
                { title: "Tree Protection", text: "Planting and protecting native trees ensures long-term nesting sites." }
              ].map((sol, i) => (
                <div key={i} className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-700 shrink-0 font-bold">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-xl text-stone-900 mb-2">{sol.title}</h4>
                    <p className="text-stone-600 leading-relaxed">{sol.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-stone-50 p-10 rounded-3xl border border-stone-200 h-fit">
            <h3 className="text-3xl font-bold mb-8 flex items-center gap-3 text-stone-800 pb-4 border-b border-stone-200">
              <Users className="text-blue-600" /> Who Should Act
            </h3>
            <div className="grid gap-6">
              {[
                { who: "Government", role: "Policy enforcement, wetland restoration funding, farmer compensation." },
                { who: "Local Community", role: "Monitoring wetlands, protecting nesting trees, passing traditions forward." },
                { who: "Farmers", role: "Sustainable irrigation and reduced chemical usage." },
                { who: "Tourists", role: "Responsible tourism, plastic avoidance, respect for nesting zones." },
                { who: "Students & Youth", role: "Awareness campaigns, volunteering, documentation, research." }
              ].map((actor, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                    <span className="font-bold text-xl text-stone-900">{actor.who}</span>
                    <span className="text-sm font-medium text-stone-500 bg-stone-100 px-2 py-1 rounded w-fit">Key Stakeholder</span>
                  </div>
                  <p className="mt-2 text-stone-600">{actor.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 🟢 PUBLIC PLEDGE REGISTRY */}
      <section className="py-24 bg-stone-100 border-y border-stone-200">
        <div className="max-w-6xl mx-auto px-6">
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

      {/* 🟢 PLEDGE SECTION */}
      <section className="py-24 px-6 max-w-3xl mx-auto" id="pledge">
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

      {/* 🟢 EDUCATION-BASED CONSERVATION ACTIONS & BLOCKCHAIN REWARDS */}
      <section className="py-24 px-6 bg-gradient-to-br from-cyan-50 via-green-50 to-blue-50" id="conservation-actions">
        <ConservationActions />
      </section>

      {/* 🟢 CALL TO ACTION & FOOTER */}
      <section className="bg-gradient-to-b from-stone-900 to-black text-stone-300 py-32 px-6 text-center">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12 inline-block p-4 rounded-full bg-stone-800/50">
            <Trash2 className="w-16 h-16 text-stone-500" strokeWidth={1} />
          </div>

          <h2 className="text-4xl md:text-6xl font-bold text-white mb-10 leading-tight">
            Conservation does not begin with governments.<br />
            It begins with <span className="text-green-500">individuals</span>.
          </h2>

          <p className="text-2xl text-stone-400 mb-12">You can:</p>

          <div className="flex flex-wrap justify-center gap-6 mb-20">
            {["Save Water", "Avoid Plastic", "Respect Nesting Zones", "Support Wetland Protection", "Spread Awareness"].map((action, i) => (
              <span key={i} className="px-8 py-4 border border-stone-700/50 bg-stone-900/50 backdrop-blur rounded-full text-lg hover:bg-stone-800 hover:border-stone-500 transition-all cursor-default">
                {action}
              </span>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-sm font-mono mb-24 opacity-60 max-w-3xl mx-auto">
            <p className="border-t border-stone-800 pt-4">Protecting wetlands protects birds.</p>
            <p className="border-t border-stone-800 pt-4">Protecting birds protects ecosystems.</p>
            <p className="border-t border-stone-800 pt-4">Protecting ecosystems protects human life.</p>
          </div>

          <div className="border-t border-stone-800 pt-20">
            <div className="max-w-4xl mx-auto relative">
              <span className="text-9xl absolute -top-12 -left-12 opacity-10 font-serif">“</span>
              <p className="text-2xl md:text-4xl font-serif italic text-white leading-relaxed">
                Kokkare Bellur is not just a village.
                It is a reminder.
                A reminder that coexistence is possible.
                A reminder that wetlands are not wastelands.
                A reminder that environmental collapse is silent — <span className="text-red-400 not-italic">until it is too late.</span>
              </p>
              <span className="text-9xl absolute -bottom-24 -right-12 opacity-10 font-serif">”</span>
            </div>

            <p className="mt-24 text-3xl font-bold text-white">
              The question is not whether Kokkare Bellur can survive.<br />
              The question is <span className="text-orange-500 underline decoration-2 underline-offset-8">whether we choose to protect it</span>.
            </p>
          </div>
        </div>
      </section>

      <footer className="bg-black text-stone-600 py-12 text-center border-t border-stone-900">
        <p className="text-sm uppercase tracking-widest mb-4">Kokkare Bellur Conservation Initiative</p>
        <p className="text-xs">&copy; {new Date().getFullYear()} All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default App;

