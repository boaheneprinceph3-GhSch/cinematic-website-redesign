# Deployment Checklist

Use this checklist to ensure everything is ready before going live.

## 📋 Pre-Deployment Checklist

### Balstudio Project
- [ ] Hero video exists at `balstudio-cinematic/assets/hero.mp4`
- [ ] Video is compressed (< 8MB recommended)
- [ ] All images are optimized
- [ ] Contact email is correct: `hello@balstudio.com`
- [ ] Phone number is correct: `+233 53 474 5487`
- [ ] Test locally: `cd balstudio-cinematic && npx serve .`
- [ ] Test on mobile (375px width minimum)
- [ ] All links work (no broken links)
- [ ] Scroll animations work smoothly
- [ ] Waves background is interactive
- [ ] Flip cards work on hover/click
- [ ] Accordion slider expands properly
- [ ] Form displays correctly (even if not functional yet)

### Repository Setup
- [ ] `.gitignore` file created
- [ ] `README.md` has project description
- [ ] `DEPLOYMENT.md` guide is complete
- [ ] `SETUP.md` has step-by-step instructions
- [ ] All sensitive files are in `.gitignore` (`.kiro/`, `.env`, etc.)

### Git & GitHub
- [ ] Git initialized: `git init`
- [ ] All files added: `git add .`
- [ ] Initial commit created
- [ ] GitHub repo created
- [ ] Code pushed to GitHub
- [ ] Repo is public (for portfolio visibility)

### Vercel Deployment
- [ ] Vercel account created
- [ ] Project imported from GitHub
- [ ] Root Directory set to `balstudio-cinematic`
- [ ] Deployment successful
- [ ] Live URL works
- [ ] Video loads on live site
- [ ] Animations work on live site
- [ ] Mobile responsive on live site

### Post-Deployment
- [ ] Update `README.md` with live URL
- [ ] Test live site on desktop
- [ ] Test live site on mobile device
- [ ] Test in different browsers (Chrome, Safari, Firefox)
- [ ] Run Lighthouse audit (target: 90+ performance)
- [ ] Check Core Web Vitals
- [ ] Verify all scroll animations
- [ ] Test contact form display

### Portfolio Optimization
- [ ] Pin repo on GitHub profile
- [ ] Add GitHub topics: `portfolio`, `gsap`, `scroll-animations`, `cinematic-web`, `web-design`
- [ ] Add repo description on GitHub
- [ ] Add website URL to GitHub repo (in About section)
- [ ] Update personal portfolio with link
- [ ] Share on LinkedIn
- [ ] Share on Twitter/X
- [ ] Add to resume/CV

### Documentation
- [ ] `README.md` is clear and complete
- [ ] `SHOWCASE.md` has project details
- [ ] Screenshots added (optional but recommended)
- [ ] Contact info updated in `README.md`
- [ ] License information is correct

## 🎯 Quick Test Commands

```bash
# Test locally
cd balstudio-cinematic
npx serve .
# Open http://localhost:3000

# Check git status
git status

# View commit history
git log --oneline

# Check Vercel deployments
vercel ls

# Run Lighthouse
npx lighthouse https://your-site.vercel.app --view
```

## 🚨 Common Issues to Check

- [ ] Video file is committed to git (not too large)
- [ ] All asset paths are relative (not absolute)
- [ ] No hardcoded localhost URLs
- [ ] GSAP CDN is loading
- [ ] Google Fonts CDN is loading
- [ ] Material Icons CDN is loading
- [ ] No console errors in browser
- [ ] No 404 errors in Network tab

## ✅ Success Criteria

Your deployment is successful when:
- ✅ GitHub repo is public and accessible
- ✅ Live site loads at Vercel URL
- ✅ Hero video plays on scroll
- ✅ All animations work smoothly
- ✅ Mobile responsive (test on actual device)
- ✅ Lighthouse score > 85
- ✅ No console errors
- ✅ README has live URL
- ✅ You can share the link with confidence!

## 🎉 After Success

1. Share your work:
   - LinkedIn post with live link
   - Twitter/X with screenshots
   - Add to portfolio site
   - Email to potential clients

2. Monitor:
   - Vercel Analytics (free)
   - GitHub stars/forks
   - Feedback from viewers

3. Iterate:
   - Collect feedback
   - Make improvements
   - Push updates (auto-deploys!)

4. Build next project:
   - Create new folder
   - Follow same pipeline
   - Deploy to Vercel
   - Update README

---

**Ready to deploy?** Start with `SETUP.md` for step-by-step commands!
