import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
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

import { useState } from 'react';
import ConservationActions from './components/ConservationActions';
import PetitionPage from './pages/PetitionPage';

function HomePage() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans selection:bg-orange-200 selection:text-stone-900 overflow-x-hidden">

      {/* 🟢 HERO SECTION - Presentation Title Slide */}
      <section className="relative min-h-screen h-screen flex items-center justify-center overflow-hidden w-full">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        
        {/* Dark Overlay for text contrast */}
        <div className="absolute inset-0 bg-black/60 z-10"></div>

        {/* Presentation Content - Centered, Formal */}
        <div className="relative z-20 text-center px-6 sm:px-8 md:px-12 max-w-6xl mx-auto text-white space-y-5 md:space-y-7 py-12 w-full">
          
          {/* Event Header */}
          <div className="space-y-3">
            <p className="text-[11px] sm:text-xs md:text-sm lg:text-base font-medium uppercase tracking-wide text-white/70 leading-snug break-words">
              National Level Inter Collegiate Management, IT, Aviation & Cultural Fest
            </p>
            <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-wide text-orange-400">
              INNOTHON - 2026
            </p>
          </div>

          {/* Divider */}
          <div className="flex items-center justify-center gap-2 md:gap-3 py-3 md:py-4">
            <div className="h-[1px] md:h-[2px] w-12 md:w-16 bg-white/30"></div>
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white/40 rounded-full"></div>
            <div className="h-[1px] md:h-[2px] w-12 md:w-16 bg-white/30"></div>
          </div>

          {/* Theme - MOVED ABOVE TITLE */}
          <div className="bg-white/10 backdrop-blur-sm py-2 md:py-3 px-4 md:px-6 rounded-lg border border-white/20 max-w-4xl mx-auto">
            <p className="text-[9px] sm:text-[10px] md:text-xs font-semibold uppercase tracking-wider text-white/60 mb-1">Theme</p>
            <p className="text-[11px] sm:text-xs md:text-sm lg:text-base font-medium text-white/80 leading-snug break-words">
              AI-Driven Innovation for Social Impact and Sustainable Development
            </p>
          </div>
          
          {/* Project Title - HIGHLIGHTED */}
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-white break-words px-2">
            Kokkare Bellur:<br />
            <span className="text-green-400">A Sanctuary Without Fences</span>
          </h1>

          {/* Presented By Label */}
          <div className="pt-3">
            <p className="text-xs sm:text-sm md:text-base text-white/50 uppercase tracking-widest font-light">
              Presented by
            </p>
          </div>
          
          {/* Presenters - HIGHLIGHTED */}
          <div>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-yellow-400 tracking-wide break-words">
              KIRAN & VIDYASHREE C
            </p>
          </div>
          
          {/* Institution */}
          <div className="text-xs sm:text-sm md:text-base font-medium text-white/70 leading-relaxed break-words">
            <p className="font-semibold">Maharajas Institute of Technology</p>
            <p className="text-white/60">First Grade College, Mysore</p>
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
            src="/village_birds_gen.jpg"
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
                src="/painted_stork_gen.jpg"
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
                src="/pelican_gen.jpg"
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

        <div className="max-w-5xl mx-auto space-y-12">
          {/* Our Solution */}
          <div>
            <h3 className="text-3xl font-bold flex items-center gap-3 text-stone-800 pb-4 border-b border-stone-200 mb-8">
              <Leaf className="text-green-600" /> Our Solution: EcoStork Token System
            </h3>
            <div className="space-y-8">
              {[
                { 
                  title: "Investigation & Government Alerting", 
                  text: "Petition-based awareness campaigns backed by data collection. Community-driven reporting system alerts authorities to environmental threats requiring scientific investigation."
                },
                { 
                  title: "AI-Powered Bird Monitoring", 
                  text: "Computer vision for automatic bird species identification and population tracking. Machine learning predicts migration patterns and detects habitat degradation early."
                },
                { 
                  title: "Blockchain Incentive System", 
                  text: "EcoStork Tokens reward conservation activities through transparent blockchain. Tourists, youth, and villagers earn tokens for cleanup, monitoring, and awareness work."
                },
                { 
                  title: "Village-Only Economy", 
                  text: "Tokens redeemable exclusively at village stores (groceries, handicrafts) ensuring economic benefits stay within the community. Creates sustainable circular economy."
                },
                { 
                  title: "Multi-Role Approval Workflow", 
                  text: "Forest officers verify activities before blockchain admin allocates tokens. Transparent 3-tier approval prevents fraud while maintaining decentralized accountability."
                }
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

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center py-8">
            <Link 
              to="/petition" 
              className="group bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-5 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 text-center"
            >
              <div className="flex items-center justify-center gap-3">
                <Heart className="group-hover:scale-110 transition-transform" size={24} />
                <span>Support Kokkare Bellur</span>
              </div>
              <p className="text-sm font-normal mt-1 opacity-90">Sign the citizen petition</p>
            </Link>
            
            <a 
              href="https://campus-coin-kohl.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-5 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 text-center"
            >
              <div className="flex items-center justify-center gap-3">
                <Activity className="group-hover:scale-110 transition-transform" size={24} />
                <span>Access CampusCoin Platform</span>
              </div>
              <p className="text-sm font-normal mt-1 opacity-90">Blockchain token system</p>
            </a>
          </div>

          {/* Technology Stack */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-10 rounded-3xl border border-blue-200">
            <h4 className="text-3xl font-bold mb-8 text-stone-900 flex items-center gap-3 pb-4 border-b border-blue-300">
              <span className="text-blue-600">⚙️</span> Technology Stack
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <p className="font-bold text-stone-800 mb-2 text-lg">Frontend</p>
                <p className="text-stone-600">React 19 + Vite + Tailwind CSS</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <p className="font-bold text-stone-800 mb-2 text-lg">Backend</p>
                <p className="text-stone-600">Express.js + SQLite3</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <p className="font-bold text-stone-800 mb-2 text-lg">Blockchain</p>
                <p className="text-stone-600">Custom PoW + SHA-256</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <p className="font-bold text-stone-800 mb-2 text-lg">AI/ML</p>
                <p className="text-stone-600">Computer Vision (Planned)</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <p className="font-bold text-stone-800 mb-2 text-lg">Deployment</p>
                <p className="text-stone-600">Vercel (CI/CD)</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <p className="font-bold text-stone-800 mb-2 text-lg">Integration</p>
                <p className="text-stone-600">CampusCoin Platform</p>
              </div>
            </div>
          </div>

          {/* Advantages */}
          <div className="bg-green-50 p-10 rounded-3xl border border-green-200">
            <h3 className="text-3xl font-bold mb-8 flex items-center gap-3 text-stone-800 pb-4 border-b border-green-300">
              <span className="text-green-600">✓</span> Advantages
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: "Transparency", text: "Immutable blockchain records prevent fraud and build trust in conservation efforts." },
                { title: "Direct Incentivization", text: "Immediate token rewards motivate continuous community participation beyond one-time campaigns." },
                { title: "Economic Empowerment", text: "Village-only redemption keeps money local, preventing external economic extraction." },
                { title: "Scalable Model", text: "System adaptable to any threatened ecosystem - tiger reserves, mangroves, turtle beaches." },
                { title: "Data for Policy", text: "Conservation activity logs provide evidence-based insights for forest departments and researchers." },
                { title: "Youth Engagement", text: "Gamification through blockchain makes conservation appealing to younger generations." }
              ].map((adv, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <h4 className="font-bold text-lg text-green-900 mb-2">{adv.title}</h4>
                  <p className="text-stone-600 leading-relaxed">{adv.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Challenges */}
          <div className="bg-orange-50 p-10 rounded-3xl border border-orange-200">
            <h3 className="text-3xl font-bold mb-8 flex items-center gap-3 text-stone-800 pb-4 border-b border-orange-300">
              <AlertTriangle className="text-orange-600" /> Challenges & Limitations
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: "Rural Internet Connectivity", text: "Limited 4G/WiFi in villages requires offline-first design and WhatsApp-based fallbacks." },
                { title: "Photo Verification Complexity", text: "AI models need extensive training to detect fake/reused images. Currently relies on human review." },
                { title: "Initial Token Distribution", text: "Requires funding source for token backing (₹50 per 100 tokens) - NGO/govt grants needed." },
                { title: "Digital Literacy Gap", text: "Elderly villagers may struggle with apps - training and simplified UX critical for adoption." },
                { title: "Store Participation", text: "Village stores must trust token-to-rupee conversion process and accept new payment method." }
              ].map((challenge, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <h4 className="font-bold text-lg text-orange-900 mb-2">{challenge.title}</h4>
                  <p className="text-stone-600 leading-relaxed">{challenge.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
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

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/petition" element={<PetitionPage />} />
    </Routes>
  );
}

export default App;

