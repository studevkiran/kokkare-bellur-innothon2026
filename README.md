# 🦜 Kokkare Bellur Conservation Education Platform

> **Education for Sustainable Development** | Built for INNOTHON 2026

[![Demo](https://img.shields.io/badge/Demo-Live-green)](https://github.com/studevkiran/kokkare-bellur-innothon2026)
[![License](https://img.shields.io/badge/License-MIT-blue)](LICENSE)
[![Education](https://img.shields.io/badge/Focus-Education-brightgreen)](https://kokkare-bellur.org)

## 🌟 Overview

Learn conservation by doing it! This platform combines **education-first approach** with **blockchain token rewards** to create sustainable behavioral change. Three role-based learning paths (Community, Tourists, Students) with village-only token economy.

### Key Features

- 🎓 **Role-Based Learning** - 12 conservation actions across 3 user types
- 🪙 **Village Token Economy** - Earn tokens redeemable only at local stores
- 📝 **Education Hub** - Learning modules, workshops, research repository
- 🎮 **Gamification** - Leaderboards, badges, certificates, team challenges
- 📊 **Impact Tracking** - Personal dashboards, community metrics
- 🔗 **Blockchain Partnership** - Integration with existing CampusCoin platform

## 🎯 Role-Based Conservation Education

### Local Community Members
Learn traditional conservation practices, earn tokens for:
- **Bird Treatment & Care** - 200 tokens
- **Nesting Tree Protection** - 150 tokens  
- **Wetland Monitoring** - 100 tokens
- **Knowledge Documentation** - 150 tokens

### Tourists & Visitors
Learn responsible tourism, earn tokens for:
- **Trash Collection** - 100 tokens
- **Plastic-Free Pledge** - 50 tokens
- **Eco-Tourism Reviews** - 80 tokens

### Students & Youth
Learn through action and research, earn tokens for:
- **Lake Cleaning Programs** - 200 tokens
- **Awareness Campaigns** - 150 tokens
- **School Workshops** - 180 tokens
- **Research Documentation** - 200 tokens
- **Volunteer Hours** - 30 tokens/hour

## 🪙 Village Token Economy

**Conversion:** 100 tokens = ₹50 value  
**Redemption:** ONLY at Kokkare Bellur village stores  
**Stores:** Groceries, handicrafts, eco-tours, farm products  
**Impact:** Economic benefit stays in community

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

1. **User selects role** (Community/Tourist/Student)
2. **Chooses conservation action** from role-specific menu
3. **Completes task in real world** (cleanup, treatment, workshop, etc.)
4. **Uploads proof photos** with GPS location and description
5. **Request submitted** to conservation platform API
6. **Admin verifies** on CampusCoin platform
7. **Tokens allocated** via blockchain
8. **User redeems** at village stores only

### Smart Verification
- Photo proof required for all actions
- GPS location verification for field tasks
- Admin approval on CampusCoin dashboard
- Blockchain immutability prevents fraud
- Educational content ensures proper task completion

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

## 🌍 Educational & Social Impact

### Learning Goals
- ✅ Wetland ecology education through hands-on participation
- ✅ Student engagement in environmental research
- ✅ Preserve traditional conservation knowledge digitally
- ✅ Responsible tourism education
- ✅ Intergenerational learning exchange

### Economic Innovation
- 💰 Village-only token economy keeps money in community
- 🪙 Blockchain-verified educational participation
- 🎁 Students learn while earning (30-200 tokens per action)
- 📈 Gamification increases long-term educational engagement

## 🏆 INNOTHON 2026 Submission

**Theme:** Education for Sustainable Development (AI-Driven Innovation)

### How We Meet the Theme
✅ **Education Focus:** Role-based learning paths with hands-on conservation  
✅ **Innovation:** First blockchain-based conservation education incentive system  
✅ **Social Impact:** Economic rewards drive behavioral change through education  
✅ **Sustainable Development:** Education → Action → Rewards → Habit Formation  
✅ **Scalability:** Model replicable for schools, colleges, communities nationwide

### Team
- **Team Size:** 2 members
- **Development Time:** 6 hours (March 6, 2026)
- **Tech Used:** React, Express, SQLite, CampusCoin Blockchain API
- **Focus:** Education-first conservation with village token economy

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
