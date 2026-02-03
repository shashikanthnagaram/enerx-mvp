# 🚀 QUICK DEPLOYMENT GUIDE

## Deploy EnerX in 5 Minutes (FREE)

### Step 1: Install Node.js
If you don't have Node.js:
- Download from https://nodejs.org (get LTS version)
- Install and verify: `node --version`

### Step 2: Set Up Project
```bash
# Navigate to your project folder
cd enerx-mvp

# Install all dependencies (this takes 2-3 minutes)
npm install
```

### Step 3: Test Locally
```bash
# Start development server
npm run dev

# Open browser to http://localhost:3000
# You should see EnerX landing page!
```

### Step 4: Deploy to Vercel (FREE Hosting)

**Option A: Using GitHub (Recommended)**

1. Create GitHub account (if you don't have one)
2. Create new repository called "enerx-mvp"
3. In your project folder:
```bash
git init
git add .
git commit -m "EnerX MVP ready for demo"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/enerx-mvp.git
git push -u origin main
```

4. Go to https://vercel.com
5. Sign up with GitHub
6. Click "New Project"
7. Import "enerx-mvp" repository
8. Click "Deploy" (Vercel auto-detects Next.js)
9. Wait 60 seconds - DONE! 🎉

You'll get a URL like: `https://enerx-mvp-xyz.vercel.app`

**Option B: Direct Deploy (Even Faster)**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts - press Enter for defaults
# DONE! You get live URL instantly
```

### Step 5: Share Your Startup
- Share the Vercel URL with investors
- Add it to your resume/portfolio
- Show it in incubator applications
- Demo it in interviews!

---

## Customizing Before Deploy

### Change Company Name
Find and replace "EnerX" in `enerx-mvp.jsx`

### Change Colors
Edit `tailwind.config.js` - change the teal/emerald colors

### Add Your Data
Replace mock data in `enerx-mvp.jsx` with real solar data

---

## Common Issues

**"Command not found: npm"**
→ Install Node.js from nodejs.org

**"Port 3000 already in use"**
→ Run: `npx kill-port 3000` then try again

**Vercel deploy fails**
→ Make sure all files are committed to Git
→ Check Node.js version is 18+

---

## What You Get FREE on Vercel:
✅ Unlimited deployments
✅ Automatic HTTPS/SSL
✅ Global CDN
✅ Custom domain support
✅ 100GB bandwidth/month
✅ Analytics

**This is professional hosting - same as used by billion-dollar startups!**

---

## Next Steps After Deployment

1. **Share the link** - Send to potential investors/users
2. **Collect feedback** - Add a feedback form
3. **Add analytics** - Vercel Analytics (free)
4. **Custom domain** - Buy domain and connect to Vercel
5. **Integrate real APIs** - Connect to actual solar data sources

---

Your EnerX MVP is now LIVE and investor-ready! 🌱⚡

Questions? The README.md has detailed docs.
