# Deployment Guide

Step-by-step instructions for deploying projects from this monorepo to Vercel.

## 📋 Prerequisites

- GitHub account
- Vercel account (free tier works)
- Git installed locally
- Vercel CLI (optional, for command-line deployment)

## 🚀 Initial Setup

### Step 1: Push to GitHub

```bash
# Navigate to project root
cd "C:\Users\HP PAVILION\OneDrive\Desktop\Cinematic-Website Redesign"

# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Cinematic website redesigns"

# Create GitHub repo and push
# Option A: Using GitHub CLI
gh repo create cinematic-website-redesign --public --source=. --remote=origin --push

# Option B: Manual setup
# 1. Create repo on GitHub.com
# 2. Run these commands:
git remote add origin https://github.com/YOUR_USERNAME/cinematic-website-redesign.git
git branch -M main
git push -u origin main
```

## 🌐 Deploy Individual Projects to Vercel

### Method 1: Vercel Dashboard (Recommended for First Time)

#### Deploy Balstudio Project

1. **Go to Vercel:** https://vercel.com/new
2. **Import Git Repository:**
   - Click "Import Git Repository"
   - Select your GitHub account
   - Choose `cinematic-website-redesign`
3. **Configure Project:**
   - **Project Name:** `balstudio-cinematic` (or custom name)
   - **Framework Preset:** Other
   - **Root Directory:** Click "Edit" → Select `balstudio-cinematic`
   - **Build Command:** Leave empty (static site)
   - **Output Directory:** Leave empty
4. **Deploy:**
   - Click "Deploy"
   - Wait 30-60 seconds
   - Get your live URL: `balstudio-cinematic.vercel.app`

#### Deploy Future Projects

Repeat the same process for each new project:
- Same GitHub repo
- Different Root Directory (e.g., `future-project-2`)
- Each gets its own Vercel URL

### Method 2: Vercel CLI (Faster for Subsequent Deploys)

```bash
# Install Vercel CLI (one-time)
npm i -g vercel

# Login to Vercel
vercel login

# Deploy Balstudio
cd balstudio-cinematic
vercel --prod

# Deploy future projects
cd ../future-project-2
vercel --prod
```

## 🔧 Vercel Configuration

Each project includes a `vercel.json` file with optimizations:

```json
{
  "cleanUrls": true,
  "trailingSlash": false,
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

## 📝 Update README with Live URLs

After deploying, update the main `README.md`:

```markdown
| Project | Industry | Description | Live Site | Code |
|---------|----------|-------------|-----------|------|
| **Balstudio** | Architecture | ... | [View Site](https://balstudio-cinematic.vercel.app) | [Code](./balstudio-cinematic) |
```

## 🔄 Continuous Deployment

Once connected to GitHub, Vercel automatically:
- ✅ Deploys on every push to `main` branch
- ✅ Creates preview deployments for pull requests
- ✅ Provides deployment URLs in GitHub commits

### Workflow:
```bash
# Make changes to a project
cd balstudio-cinematic
# ... edit files ...

# Commit and push
git add .
git commit -m "Update hero video"
git push

# Vercel automatically deploys! 🎉
```

## 🎯 Custom Domains (Optional)

To use custom domains like `balstudio.com`:

1. **In Vercel Dashboard:**
   - Go to Project Settings → Domains
   - Add your domain
   - Follow DNS configuration instructions

2. **Update DNS:**
   - Add CNAME record pointing to `cname.vercel-dns.com`
   - Or A record pointing to Vercel's IP

3. **SSL:**
   - Vercel automatically provisions SSL certificates
   - HTTPS enabled by default

## 🐛 Troubleshooting

### Issue: "Root Directory not found"
**Solution:** Ensure the folder name matches exactly (case-sensitive)

### Issue: Video not loading on deployed site
**Solution:** 
- Check that `assets/hero.mp4` is committed to git
- Verify file size < 100MB (GitHub limit)
- Consider using video hosting (Cloudinary, Mux) for large files

### Issue: Fonts not loading
**Solution:** 
- Ensure Google Fonts CDN links are in `<head>`
- Check browser console for CORS errors

### Issue: 404 on page refresh
**Solution:** 
- For single-page apps, add to `vercel.json`:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

## 📊 Monitoring

### Vercel Analytics (Free)
- Go to Project → Analytics
- View page views, performance metrics
- Track Core Web Vitals

### Lighthouse Scores
```bash
# Run Lighthouse on deployed site
npx lighthouse https://your-site.vercel.app --view
```

## 🔒 Environment Variables (If Needed)

For projects with API keys or secrets:

1. **In Vercel Dashboard:**
   - Project Settings → Environment Variables
   - Add key-value pairs
   - Select environments (Production, Preview, Development)

2. **In Code:**
```javascript
const apiKey = process.env.API_KEY;
```

## 📦 Deployment Checklist

Before deploying:
- [ ] Test locally (`npx serve .`)
- [ ] Compress hero video (< 8MB)
- [ ] Optimize images (WebP format)
- [ ] Check mobile responsiveness (375px width)
- [ ] Test with `prefers-reduced-motion`
- [ ] Verify all links work
- [ ] Update contact info
- [ ] Run Lighthouse audit (> 90 performance)
- [ ] Commit all changes to git
- [ ] Push to GitHub

After deploying:
- [ ] Test live site on desktop
- [ ] Test live site on mobile
- [ ] Check video playback
- [ ] Verify scroll animations
- [ ] Test contact form (if applicable)
- [ ] Update README with live URL
- [ ] Share with client/portfolio

## 🎉 Success!

Your site is now live and automatically deploys on every push to GitHub.

**Next Steps:**
1. Share the live URL
2. Monitor analytics
3. Iterate based on feedback
4. Deploy next project!

---

Need help? Check [Vercel Docs](https://vercel.com/docs) or open an issue.
