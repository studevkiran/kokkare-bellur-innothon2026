# Blockchain Integration Architecture
## Kokkare Bellur × CampusCoin Collaboration

### System Flow:
```
1. User Action (Conservation Platform)
   ↓
2. AI Verification (TensorFlow.js / Computer Vision)
   ↓
3. Request Sent to Blockchain API
   ↓
4. Admin Approval (CampusCoin Dashboard)
   ↓
5. Token Minted & Allocated
   ↓
6. User Notified (WhatsApp + Platform)
```

### Token Reward Structure:

#### Conservation Actions → Token Earnings:

| Action | Verification | Tokens | Impact |
|--------|-------------|---------|---------|
| **Sign Conservation Pledge** | Form submission | 10 | Community support |
| **Bird Photo Upload (AI Verified)** | TensorFlow.js Species ID | 50-100 | Biodiversity monitoring |
| **Report Environmental Issue** | GPS + Photo | 75 | Early warning system |
| **Attend Awareness Session** | QR Code scan | 20 | Education |
| **Clean-up Volunteer** | Check-in/out system | 150 | Direct action |
| **Zero-Plastic Visit** | Self-declaration | 25 | Sustainable tourism |
| **Tree Planting** | Photo + GPS | 200 | Carbon offset |
| **Wildlife Observation Data** | Field form | 40 | Research support |

#### Token Redemption Options:

| Reward | Token Cost | Provider |
|--------|-----------|----------|
| Eco-tourism Package Discount | 100 | Local tour operators |
| Handmade Crafts | 50-200 | Village artisans |
| NFT Conservation Certificate | 500 | Blockchain Centre |
| Homestay Accommodation | 300 | Community members |
| Organic Farm Products | 80 | Local farmers |
| Bird Watching Guide Service | 120 | Certified guides |

---

## API Integration Points

### 1. Conservation Platform → Blockchain Backend

**Endpoint:** `POST https://campus-coin-kohl.vercel.app/api/conservation/request-token`

**Request Payload:**
```json
{
  "action_type": "bird_identification",
  "user_data": {
    "name": "Tourist Name",
    "email": "user@example.com",
    "phone": "+91XXXXXXXXXX",
    "location": "Kokkare Bellur"
  },
  "verification_data": {
    "ai_confidence": 0.94,
    "species_detected": "Painted Stork",
    "photo_url": "https://...",
    "gps_coords": "12.6843° N, 76.7319° E",
    "timestamp": "2026-03-06T14:30:00Z"
  },
  "token_amount": 50,
  "metadata": {
    "platform": "kokkare-bellur-conservation",
    "verification_method": "tensorflow-js-mobilenet"
  }
}
```

**Response:**
```json
{
  "status": "pending_approval",
  "request_id": "REQ-KB-2026-001234",
  "estimated_approval": "2-4 hours",
  "message": "Token request submitted to Conservation Authority for verification"
}
```

---

### 2. Blockchain Admin Approval Webhook

**Endpoint:** `POST https://kokkare-bellur.vercel.app/api/token-allocated`

**Webhook Payload from CampusCoin:**
```json
{
  "request_id": "REQ-KB-2026-001234",
  "status": "approved",
  "tokens_allocated": 50,
  "transaction_hash": "0x8f3b4c...",
  "wallet_address": "user_wallet_kb_xxx",
  "approved_by": "Conservation Officer",
  "approved_at": "2026-03-06T16:15:00Z"
}
```

---

## AI Verification Components

### 1. Bird Species Identification
**Technology:** TensorFlow.js + MobileNet
**Process:**
1. User uploads bird photo
2. Client-side ML model identifies species
3. Confidence threshold: >85% for auto-approval
4. <85% → Manual verification by ranger

**Supported Species (Initial):**
- Painted Stork (Mycteria leucocephala)
- Spot-billed Pelican (Pelecanus philippensis)
- Black-headed Ibis (Threskiornis melanocephalus)
- Asian Openbill (Anastomus oscitans)
- Little Cormorant (Microcarbo niger)

### 2. Image Quality Validation
**Checks:**
- Minimum resolution: 480x480px
- File size: 100KB - 5MB
- Format: JPG, PNG
- EXIF data present (for GPS/timestamp)
- No duplicates (perceptual hash)

### 3. Sentiment Analysis (Future)
**Technology:** Natural Language Processing
**Use Case:** Analyze pledge messages for engagement metrics
**Output:** Sentiment score influencing token bonus

---

## Security & Fraud Prevention

### Anti-Gaming Measures:
1. **Rate Limiting:** Max 5 photo submissions per day per user
2. **Duplicate Detection:** Perceptual hashing prevents resubmission
3. **GPS Verification:** Location must be within Kokkare Bellur radius
4. **Time Gating:** Min 30 mins between actions
5. **Manual Review:** Random 10% audit by rangers
6. **Reputation System:** Repeated fraud → Account suspension

### Data Privacy:
- User consent for photo usage
- GDPR-compliant data handling
- Optional anonymous pledges
- Secure token wallet management

---

## Blockchain Role Mapping

| CampusCoin Role | Conservation Role | Permissions |
|----------------|------------------|-------------|
| **Blockchain Centre** | **Conservation Authority** | Mint tokens, Set policies |
| **Lecturers** | **Park Rangers / Officials** | Verify actions, Approve requests |
| **Students** | **Tourists & Villagers** | Earn tokens, Submit actions |
| **Merchants** | **Eco-Vendors** | Accept tokens, Provide services |

---

## Admin Dashboard Features (CampusCoin Side)

### New "Conservation Module":
1. **Pending Requests Tab**
   - View all token requests with AI verification data
   - Approve/Reject with notes
   - Bulk actions for similar requests

2. **Analytics**
   - Total tokens distributed to conservation
   - Most active conservation actions
   - Geographic heatmap of submissions
   - Species identification success rate

3. **Fraud Detection**
   - Flagged suspicious activities
   - Duplicate submission alerts
   - User reputation scores

4. **Impact Metrics**
   - Number of tourists engaged
   - Biodiversity data collected
   - Community economic benefit (tokens redeemed)

---

## Conversation: AI Agent ↔ Blockchain Admin

### Example Token Request Flow:

**[14:30] Conservation Platform AI Agent:**
```
🤖 New Token Request Alert!
━━━━━━━━━━━━━━━━━━━━━━━━━━
Request ID: REQ-KB-2026-001234
Action: Bird Photo Uploaded
User: Rajesh Kumar
Location: Kokkare Bellur Village

AI Analysis:
✓ Species: Painted Stork
✓ Confidence: 94%
✓ Image Quality: Excellent
✓ GPS Verified: 12.6843°N, 76.7319°E
✓ Timestamp: Valid
✓ No Duplicates Found

Recommended Tokens: 50
Status: Auto-approved (>85% confidence)

Action Required: None (Auto-processed)
Backup Review: Available in dashboard
```

**[14:31] Blockchain System:**
```
✅ Token Request Received
Processing request REQ-KB-2026-001234...
Verification checks passed.
Mining 50 tokens for conservation wallet...
Transaction pending...
```

**[14:35] Blockchain Admin (Human Oversight):**
```
📊 Dashboard Review:
Spot check request REQ-KB-2026-001234
Photo review: Confirmed Painted Stork ✓
Location matches: Kokkare Bellur ✓
User history: First submission, clean record ✓
Approved!
```

**[14:36] Blockchain System:**
```
✅ 50 Tokens Minted
Transaction Hash: 0x8f3b4c2a...
Wallet: user_wallet_kb_rajesh_001
Status: CONFIRMED
Notifying user via WhatsApp...
```

**[14:37] User Notification:**
```
🎉 Congratulations Rajesh!

You've earned 50 Conservation Tokens for identifying a Painted Stork at Kokkare Bellur!

Your contribution helps protect our wetland ecosystem.

Balance: 50 tokens
Redeem: campus-coin-kohl.vercel.app/redeem

Thank you for being a conservation champion! 🦩
```

---

## Implementation Roadmap

### Phase 1: Basic Integration (Week 1)
- ✅ Pledge form → 10 tokens (manual approval)
- ✅ Admin dashboard
- ✅ WhatsApp notifications

### Phase 2: AI Features (Week 2)
- 🔄 TensorFlow.js bird identification
- 🔄 Image upload component
- 🔄 Auto-approval for high confidence

### Phase 3: Advanced Features (Week 3)
- ⏳ GPS verification
- ⏳ NFT certificates
- ⏳ Marketplace for token redemption

### Phase 4: Scale (Week 4)
- ⏳ Mobile app
- ⏳ Offline mode
- ⏳ Multi-language support

---

## Request to CampusCoin Admin

**Dear CampusCoin Development Team,**

We're building a conservation platform for Kokkare Bellur wetland as part of INNOTHON 2026. We'd like to integrate your blockchain token system to incentivize environmental actions.

**What we need from you:**

1. **API Endpoint:**
   - `POST /api/conservation/request-token` 
   - Accept token requests with AI verification data
   - Return request ID for tracking

2. **Webhook:**
   - Send notification when tokens are approved/allocated
   - Include transaction hash and wallet address

3. **Admin Dashboard:**
   - New "Conservation" section to review requests
   - Ability to approve/reject with notes
   - View AI verification data (photos, confidence scores)

4. **Token Allocation:**
   - Create "Conservation Authority" role
   - Minting permissions for verified actions
   - Separate pool for conservation tokens

5. **Wallet System:**
   - Generate wallets for tourists/villagers
   - Simple redemption interface
   - WhatsApp integration for notifications

**Benefits for CampusCoin:**
- Real-world use case beyond campus
- Social impact demonstration
- Scalable model for other NGOs
- Positive publicity for blockchain innovation

**Timeline:** 
- MVP integration: 1 week
- Full launch: 2-3 weeks

Looking forward to collaboration!

**Kokkare Bellur Conservation Team**

---

Built with 🌿 for our planet
