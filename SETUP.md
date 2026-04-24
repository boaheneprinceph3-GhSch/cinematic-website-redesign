# Quick Setup Guide

Follow these steps to get your portfolio live in under 10 minutes.

## 🎯 Step-by-Step Commands

### 1️⃣ Initialize Git Repository

```bash
# Navigate to your project folder
cd "C:\Users\HP PAVILION\OneDrive\Desktop\Cinematic-Website Redesign"

# Initialize git
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: Cinematic website redesigns portfolio"
```

### 2️⃣ Create GitHub Repository

**Option A: Using GitHub CLI (Fastest)**
```bash
# Install GitHub CLI if you haven't: https://cli.github.com/
gh auth login

# Create repo and push in one command
gh repo create cinematic-website-redesign --public --source=. --remote=origin --push
```

**Option B: Manual Setup**
1. Go to https://github.com/new
2. Repository name: `cinematic-website-redesign`
3. Description: "Collection of scroll-driven cinematic websites"
4. Public repository
5. Don't initialize with README (we already have one)
6. Click "Create repository"

Then run:
```bash
git remote add origin https://github.com/YOUR_USERNAME/cinematic-website-redesign.git
git branch -M main
git push -u origin main
```

### 3️⃣ Deploy to Vercel

**Option A: Vercel Dashboard (Recommended for First Time)**

1. Go to https://vercel.com/signup (sign up with GitHub)
2. Click "New Project"
3. Import `cinematic-website-redesign` from GitHub
4. **Important:** Click "Edit" next to Root Directory
5. Select `balstudio-cinematic`
6. Click "Deploy"
7. Wait 30-60 seconds
8. Copy your live URL!

**Option B: Vercel CLI**
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
cd balstudio-cinematic
vercel --prod
```

### 4️⃣ Update README with Live URL

After deployment, update the main `README.md`:

```markdown
| **Balstudio** | Architecture | ... | [View Site](https://your-actual-url.vercel.app) | [Code](./balstudio-cinematic) |
```

Then commit and push:
```bash
git add README.md
git commit -m "Add live site URL"
git push
```

## ✅ Verification Checklist

After deployment, test:
- [ ] Site loads at Vercel URL
- [ ] Hero video plays on scroll
- [ ] Text mask reveal animates
- [ ] Waves background is interactive
- [ ] Flip cards work on hover
- [ ] Accordion slider expands
- [ ] Mobile responsive (test on phone)
- [ ] Contact form displays correctly

## 🎉 You're Live!

Your portfolio is now:
- ✅ On GitHub: `github.com/YOUR_USERNAME/cinematic-website-redesign`
- ✅ Live on Vercel: `your-project.vercel.app`
- ✅ Auto-deploys on every push

## 📱 Share Your Work

Share these links:
- **GitHub repo:** Shows your code and system
- **Live site:** Shows the actual experience
- **Both:** Maximum impact for portfolio/clients

## 🔄 Making Updates

```bash
# Edit files in any project
cd balstudio-cinematic
# ... make changes ...

# Commit and push
git add .
git commit -m "Update hero section"
git push

# Vercel automatically redeploys! 🚀
```

## 🆘 Need Help?

- **Vercel Issues:** Check [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Git Issues:** Run `git status` to see what's happening
- **Component Questions:** See [cinematic-site-components/README.md](./cinematic-site-components/README.md)

---

**Next Steps:**
1. Pin the repo on your GitHub profile
2. Add topics: `portfolio`, `gsap`, `scroll-animations`, `cinematic-web`
3. Share on LinkedIn/Twitter
4. Build your next cinematic site!
