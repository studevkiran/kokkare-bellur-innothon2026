# 🦜 Kokkare Bellur Conservation Platform

> **AI-Driven Innovation for Wetland Conservation** | Built for INNOTHON 2026

[![Demo](https://img.shields.io/badge/Demo-Live-green)](https://github.com/studevkiran/kokkare-bellur-innothon2026)
[![License](https://img.shields.io/badge/License-MIT-blue)](LICENSE)
[![Conservation](https://img.shields.io/badge/Impact-Environmental-brightgreen)](https://kokkare-bellur.org)

## 🌟 Overview

Kokkare Bellur is a unique wetland village in Karnataka, India, where humans and migratory birds have coexisted peacefully for generations. This platform combines **AI-powered bird identification** with **blockchain token rewards** to create the first-of-its-kind conservation incentive ecosystem.

### Key Features

- 🤖 **AI Bird Identification** - TensorFlow.js-powered species recognition
- 🪙 **Blockchain Rewards** - Earn CampusCoin tokens for conservation actions
- 📝 **Digital Petition** - Public pledge registry for wetland protection
- 🎨 **Rich Media** - Educational content with images and video
- 📊 **Transparent Data** - Google Sheets integration for public accountability
- 🔗 **API Integration** - Seamless connection with CampusCoin blockchain

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development servers (frontend + backend)
npm run dev
```

The app will run on:
- Frontend: `http://localhost:5173` (or next available port)
- Backend: `http://localhost:3000`

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern UI library
- **Vite 7** - Lightning-fast build tool
- **Tailwind CSS 4** - Utility-first styling
- **Lucide Icons** - Beautiful icon library
- **TensorFlow.js** - Client-side AI inference

### Backend
- **Express.js 5** - RESTful API server
- **SQLite3** - Lightweight database
- **CORS** - Cross-origin resource sharing
- **Google Sheets API** - Public data registry

### AI & Blockchain
- **TensorFlow.js MobileNet** - Image classification
- **CampusCoin API** - Token allocation system
- **Confidence Scoring** - Auto-approval for >85% accuracy

## � Blockchain Integration

### CampusCoin Platform

**⚡ Important:** The blockchain token system already exists!

- **Platform:** [https://campus-coin-kohl.vercel.app/](https://campus-coin-kohl.vercel.app/)
- **What's there:** Wallet management, token claiming, balance tracking, rewards redemption
- **How it works:** Users complete conservation actions → Get verification → Click link → Visit CampusCoin → Claim tokens

Our conservation platform acts as a **verification gateway** - we validate the conservation actions (bird photos, pledges, etc.), then direct users to the existing CampusCoin platform where all blockchain functionality lives.

### Integration Flow

### AI Bird Identification Flow

1. **User uploads bird photo** → Image displayed in browser
2. **AI analyzes image** → TensorFlow.js MobileNet classification
3. **Confidence scoring** → System calculates reliability (0-100%)
4. **Token estimation** → Based on species rarity and confidence
5. **Request submission** → Sent to blockchain API for approval
6. **Admin verification** → Manual review for <85% confidence
7. **Token allocation** → CampusCoin mints and transfers tokens
8. **User notification** → Success message with wallet link

### Token Reward Structure

| Action | Tokens | Verification |
|--------|--------|--------------|
| Pledge Support | 10 | Automatic |
| Bird Photo Upload | 50-100 | AI + Manual |
| Community Cleanup | 150 | GPS + Photo |
| Tree Planting | 200 | GPS + Photo |

## 🔌 API Endpoints

### Conservation Token System

```bash
# Request tokens after AI verification
POST /api/conservation/request-token
Content-Type: application/json

{
  "userName": "John Doe",
  "actionType": "bird_identification",
  "birdSpecies": "Painted Stork",
  "confidence": 0.94,
  "location": "Kokkare Bellur, Karnataka",
  "tokensRequested": 50
}
```

```bash
# Check token request status
GET /api/token-requests/:requestId

# Get all token requests (admin)
GET /api/token-requests?status=pending
```

```bash
# Webhook: Token allocation confirmation
POST /api/token-allocated

# Submit conservation pledge
POST /api/pledge

# Export pledges as CSV
GET /api/pledges/csv
```

## 🌍 Social Impact

### Environmental Goals
- ✅ Increase awareness about wetland conservation
- ✅ Build public pressure for policy intervention
- ✅ Document bird species population trends
- ✅ Engage youth in environmental causes

### Economic Innovation
- 💰 Create tangible incentives for conservation
- 🪙 Blockchain-verified contribution records
- 🎁 Redeemable tokens for eco-tourism and local products
- 📈 Gamification increases long-term engagement

## 🏆 INNOTHON 2026 Submission

**Theme:** AI-Driven Innovation for Social Impact and Sustainable Development

### How We Meet the Theme
✅ **AI Component:** TensorFlow.js for real-time bird species identification  
✅ **Innovation:** First conservation platform with blockchain token incentives  
✅ **Social Impact:** Directly addresses environmental degradation  
✅ **Sustainable Development:** Economic rewards for ecological preservation

### Team
- **Team Size:** 2 members
- **Development Time:** 6 hours (March 6, 2026)
- **Tech Used:** React, Express, TensorFlow.js, SQLite, Blockchain API

## 📝 Documentation

- [INNOTHON_2026.md](INNOTHON_2026.md) - Hackathon submission details
- [BLOCKCHAIN_INTEGRATION.md](BLOCKCHAIN_INTEGRATION.md) - Technical architecture

## 🤝 Contributing

### Development Priorities
- [ ] Train custom TensorFlow model on Kokkare Bellur birds
- [ ] Implement GPS verification for location-based actions
- [ ] Add WhatsApp notifications for token approvals
- [ ] Create mobile app (React Native)
- [ ] Multi-language support (Kannada, Tamil, Telugu)

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

## 🙏 Acknowledgments

- **Kokkare Bellur Village Community** - For decades of conservation
- **CampusCoin** - Blockchain infrastructure partner ([Visit](https://campus-coin-kohl.vercel.app/))
- **INNOTHON 2026** - Platform for innovation
- **Hindustan College** - Event organizers

## 📞 Contact

**Project:** [https://github.com/studevkiran/kokkare-bellur-innothon2026](https://github.com/studevkiran/kokkare-bellur-innothon2026)

---

**Built with ❤️ for conservation and community**

*"Conservation does not begin with governments. It begins with individuals."*
