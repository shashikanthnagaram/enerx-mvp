# 🏗️ EnerX Technical Architecture

## Overview
EnerX is built as a modern, scalable web application using the JAMstack architecture with serverless functions for backend logic.

---

## Current Stack (MVP)

### Frontend
```
Framework:     Next.js 15 (React 18)
Styling:       Tailwind CSS 3.4
Charts:        Recharts 2.12
Icons:         Lucide React
State:         React Hooks (useState, useEffect)
Routing:       Next.js App Router
```

### Backend (Ready to Integrate)
```
Database:      Supabase (PostgreSQL)
Auth:          Supabase Auth
API:           Next.js API Routes
Hosting:       Vercel (Edge Functions)
Storage:       Supabase Storage
```

### AI/ML
```
Primary AI:    Anthropic Claude API
Backup:        OpenAI GPT-4
ML Library:    TensorFlow.js (browser-side predictions)
```

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────┐
│                   USER DEVICE                        │
│  ┌──────────────────────────────────────────────┐  │
│  │         React Frontend (Next.js)             │  │
│  │  - Landing Page                              │  │
│  │  - Dashboard (Charts, Stats)                 │  │
│  │  - AI Recommendations UI                     │  │
│  └──────────────────────────────────────────────┘  │
└───────────────────────┬─────────────────────────────┘
                        │ HTTPS/REST API
                        ▼
┌─────────────────────────────────────────────────────┐
│              VERCEL EDGE NETWORK                     │
│  ┌──────────────────────────────────────────────┐  │
│  │      Next.js API Routes (Serverless)         │  │
│  │  - /api/solar-data                           │  │
│  │  - /api/ai-recommendations                   │  │
│  │  - /api/user-stats                           │  │
│  │  - /api/carbon-calculations                  │  │
│  └──────────────────────────────────────────────┘  │
└───────────────────┬───────────────┬─────────────────┘
                    │               │
        ┌───────────▼─────┐    ┌───▼──────────────┐
        │   SUPABASE      │    │  CLAUDE API      │
        │   (Database)    │    │  (AI Engine)     │
        │                 │    │                  │
        │ - User Data     │    │ - Recommendations│
        │ - Solar Metrics │    │ - Predictions    │
        │ - Carbon Ledger │    │ - Analysis       │
        └─────────────────┘    └──────────────────┘
                    │
        ┌───────────▼─────────────────┐
        │   EXTERNAL INTEGRATIONS     │
        │                             │
        │ - Solar Inverter APIs       │
        │ - Weather APIs              │
        │ - DISCOM APIs (future)      │
        └─────────────────────────────┘
```

---

## Data Models

### User Schema
```javascript
{
  id: uuid,
  email: string,
  name: string,
  created_at: timestamp,
  solar_system: {
    capacity_kw: float,
    installation_date: date,
    inverter_brand: string,
    panel_type: string,
    location: {
      city: string,
      state: string,
      coordinates: [lat, lng]
    }
  },
  preferences: {
    currency: string,
    units: string, // metric/imperial
    notifications: boolean
  }
}
```

### Solar Generation Schema
```javascript
{
  id: uuid,
  user_id: uuid (foreign key),
  timestamp: timestamp,
  generation_kwh: float,
  consumption_kwh: float,
  grid_export_kwh: float,
  self_consumption_kwh: float,
  weather_conditions: string,
  panel_efficiency: float,
  inverter_efficiency: float
}
```

### Carbon Ledger Schema
```javascript
{
  id: uuid,
  user_id: uuid,
  date: date,
  total_generation_kwh: float,
  carbon_saved_kg: float,
  trees_equivalent: float,
  calculation_method: string,
  verified: boolean,
  verification_timestamp: timestamp
}
```

### AI Recommendations Schema
```javascript
{
  id: uuid,
  user_id: uuid,
  created_at: timestamp,
  recommendation_type: string, // optimization, maintenance, financial
  title: string,
  description: text,
  expected_impact: string,
  priority: string, // high, medium, low
  status: string, // pending, accepted, dismissed
  ai_confidence_score: float
}
```

---

## API Endpoints

### Authentication
```
POST   /api/auth/signup
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/user
```

### Solar Data
```
GET    /api/solar/live              - Real-time generation data
GET    /api/solar/history?days=30   - Historical data
GET    /api/solar/stats              - Aggregated statistics
POST   /api/solar/sync               - Trigger data sync from inverter
```

### Carbon Tracking
```
GET    /api/carbon/today
GET    /api/carbon/monthly
GET    /api/carbon/yearly
GET    /api/carbon/export            - Download CSV report
```

### AI Features
```
POST   /api/ai/recommendations       - Generate new recommendations
GET    /api/ai/recommendations       - Fetch user's recommendations
PUT    /api/ai/recommendations/:id   - Update recommendation status
POST   /api/ai/forecast              - Predict future generation
POST   /api/ai/chat                  - Interactive energy assistant
```

### User Management
```
GET    /api/user/profile
PUT    /api/user/profile
GET    /api/user/stats
GET    /api/user/leaderboard
```

---

## Integration Points

### Solar Inverter APIs (Priority Order)

**1. Enphase (Most Common)**
```javascript
// OAuth 2.0 Authentication
const inverterData = await fetch('https://api.enphaseenergy.com/api/v4/systems/{systemId}/summary', {
  headers: {
    'Authorization': `Bearer ${accessToken}`
  }
});
```

**2. SolarEdge**
```javascript
const data = await fetch(`https://monitoringapi.solaredge.com/site/${siteId}/currentPowerFlow.json?api_key=${apiKey}`);
```

**3. Fronius**
```javascript
const data = await fetch(`http://${inverterIP}/solar_api/v1/GetInverterRealtimeData.cgi?Scope=Device&DeviceId=1`);
```

**4. Huawei FusionSolar**
```javascript
// Uses WebSocket for real-time data
const ws = new WebSocket('wss://intl.fusionsolar.huawei.com/websocket');
```

### Weather API (OpenWeatherMap)
```javascript
const weather = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}`);
```

### Carbon Calculation
```javascript
// India Grid Emission Factor: 0.82 kg CO₂/kWh (CEA 2023)
const carbonSaved = solarGeneration_kWh * 0.82;
const treesEquivalent = carbonSaved / 21.77; // 1 tree absorbs 21.77 kg CO₂/year
```

---

## Security Considerations

### Authentication
- JWT tokens with 1-hour expiration
- Refresh tokens stored in httpOnly cookies
- Rate limiting: 100 requests/minute per IP
- CORS restricted to enerx.com domain

### Data Protection
- All API calls over HTTPS/TLS 1.3
- Encrypted database fields for sensitive data
- Row-Level Security (RLS) in Supabase
- Input validation on all endpoints
- XSS protection via React's built-in escaping

### API Keys
- Stored in environment variables (`.env.local`)
- Never committed to Git
- Rotated every 90 days
- Separate keys for dev/staging/prod

---

## Performance Optimization

### Frontend
```javascript
// Code splitting
import dynamic from 'next/dynamic';
const Dashboard = dynamic(() => import('./Dashboard'), { 
  loading: () => <Spinner />,
  ssr: false // Client-side only for charts
});

// Image optimization
import Image from 'next/image';
<Image src="/solar-panel.jpg" width={800} height={600} alt="Solar" />

// Lazy loading charts
const Chart = lazy(() => import('./Chart'));
```

### Caching Strategy
```
- Static assets: Cache-Control: public, max-age=31536000, immutable
- API responses: Cache-Control: private, max-age=300 (5 min)
- User dashboard: SWR (stale-while-revalidate)
```

### Database Optimization
```sql
-- Index on frequently queried fields
CREATE INDEX idx_solar_user_timestamp ON solar_generation(user_id, timestamp DESC);
CREATE INDEX idx_recommendations_user_priority ON ai_recommendations(user_id, priority, created_at DESC);

-- Partitioning large tables by date
CREATE TABLE solar_generation_2026_02 PARTITION OF solar_generation
FOR VALUES FROM ('2026-02-01') TO ('2026-03-01');
```

---

## AI/ML Pipeline

### Recommendation Engine Flow
```
1. Data Collection
   ├── User's generation history (last 90 days)
   ├── Weather forecasts (next 7 days)
   ├── Usage patterns
   └── System specs

2. Feature Engineering
   ├── Average generation by hour
   ├── Peak generation windows
   ├── Self-consumption ratio
   ├── Seasonal trends
   └── Weather correlation

3. AI Processing (Claude API)
   ├── Send structured data to Claude
   ├── Request 5 personalized recommendations
   ├── Specify output format (JSON)
   └── Include user context

4. Post-Processing
   ├── Parse AI response
   ├── Calculate expected impact
   ├── Assign priority scores
   ├── Store in database
   └── Trigger notification

5. Feedback Loop
   ├── Track user actions
   ├── Measure actual impact
   ├── Retrain models quarterly
   └── Improve recommendations
```

### Example AI Prompt
```javascript
const prompt = `
Given this user's solar data:
- Average daily generation: ${avgGeneration} kWh
- Peak hours: 11 AM - 2 PM
- Self-consumption: ${selfConsumption}%
- System capacity: ${capacity} kW
- Location: ${city}, ${state}
- Recent efficiency drop: ${efficiencyDrop}%

Weather forecast:
${JSON.stringify(forecast)}

Generate 5 actionable recommendations to:
1. Increase self-consumption
2. Maximize ROI
3. Improve system efficiency
4. Plan for weather changes
5. Identify maintenance needs

Return JSON array with: title, description, expectedImpact, priority, category
`;

const recommendations = await claude.messages.create({
  model: 'claude-sonnet-4-5-20250929',
  max_tokens: 2000,
  messages: [{ role: 'user', content: prompt }]
});
```

---

## Deployment Strategy

### Environments
```
Development:  localhost:3000
Staging:      enerx-staging.vercel.app
Production:   enerx.com
```

### CI/CD Pipeline
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install dependencies
        run: npm ci
      - name: Run tests
        run: npm test
      - name: Build
        run: npm run build
      - name: Deploy to Vercel
        run: vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
```

### Monitoring
```javascript
// Setup Vercel Analytics
import { Analytics } from '@vercel/analytics/react';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
```

---

## Scaling Plan

### Phase 1: 0-1K Users (Current)
- Single Vercel deployment
- Supabase free tier
- No caching layer needed

### Phase 2: 1K-10K Users
- Add Redis for caching
- Implement rate limiting
- Setup monitoring (Sentry)
- Add database replicas

### Phase 3: 10K-100K Users
- Migrate to Vercel Pro
- Supabase Pro with connection pooling
- CDN for static assets
- Background job processing (Inngest)

### Phase 4: 100K+ Users
- Multi-region deployment
- Dedicated database cluster
- Microservices architecture
- Real-time WebSocket connections

---

## Future Technical Enhancements

### Short-term (3-6 months)
- [ ] Mobile app (React Native)
- [ ] Offline support (PWA)
- [ ] WebSocket real-time updates
- [ ] Advanced ML models (TensorFlow.js)
- [ ] E2E testing (Playwright)

### Long-term (6-12 months)
- [ ] Blockchain carbon credits
- [ ] IoT device integration
- [ ] Predictive maintenance AI
- [ ] Computer vision for panel inspection
- [ ] GraphQL API

---

## Development Setup

### Prerequisites
```bash
node >= 18.0.0
npm >= 9.0.0
git >= 2.0.0
```

### Environment Variables
```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
ANTHROPIC_API_KEY=your_anthropic_key
OPENWEATHER_API_KEY=your_weather_key
```

### Local Development
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm test

# Build for production
npm run build

# Start production server
npm start
```

---

## Testing Strategy

### Unit Tests (Jest)
```javascript
// __tests__/carbon-calculator.test.js
test('calculates carbon savings correctly', () => {
  expect(calculateCarbon(100)).toBe(82); // 100 kWh * 0.82
});
```

### Integration Tests
```javascript
// Test API endpoints
test('GET /api/solar/live returns data', async () => {
  const res = await fetch('/api/solar/live');
  expect(res.status).toBe(200);
  const data = await res.json();
  expect(data).toHaveProperty('generation_kwh');
});
```

### E2E Tests (Playwright)
```javascript
test('user can view dashboard', async ({ page }) => {
  await page.goto('/dashboard');
  await expect(page.locator('h1')).toContainText('Today\'s Generation');
});
```

---

## Documentation Standards

### Code Comments
```javascript
/**
 * Calculate carbon savings from solar generation
 * @param {number} generationKwh - Solar energy generated in kWh
 * @param {string} gridRegion - Grid region for emission factor
 * @returns {number} Carbon saved in kg CO₂
 */
function calculateCarbonSavings(generationKwh, gridRegion = 'IN') {
  const emissionFactor = EMISSION_FACTORS[gridRegion];
  return generationKwh * emissionFactor;
}
```

### API Documentation (OpenAPI/Swagger)
```yaml
paths:
  /api/solar/live:
    get:
      summary: Get real-time solar generation
      responses:
        200:
          description: Current generation data
          content:
            application/json:
              schema:
                type: object
                properties:
                  generation_kwh:
                    type: number
                  timestamp:
                    type: string
```

---

**This architecture is designed for:**
✅ Rapid iteration and deployment
✅ Easy scaling as user base grows
✅ Minimal infrastructure costs
✅ Modern development practices
✅ AI-first approach

**Questions? Check the README or ask the team!**
