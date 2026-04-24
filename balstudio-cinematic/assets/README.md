# Assets Folder

## Required Files

### ✅ hero.mp4
Your Kling-generated video is already here!

### 📸 hero-poster.jpg (Optional but Recommended)

A poster image shows while the video loads. To create one:

**Option 1: Extract from video**
```bash
ffmpeg -i hero.mp4 -ss 00:00:01 -vframes 1 hero-poster.jpg
```

**Option 2: Use a screenshot**
1. Open `hero.mp4` in a video player
2. Pause at a good frame (around 2-3 seconds in)
3. Take a screenshot
4. Save as `hero-poster.jpg` in this folder

**Option 3: Skip it**
The site works without a poster, but users will see a blank frame for 1-2 seconds while the video loads.

## Video Optimization

If your video is > 8MB, compress it for better performance:

```bash
ffmpeg -i hero.mp4 -crf 28 -preset slow -c:v libx264 -c:a copy hero-optimized.mp4
```

Then replace `hero.mp4` with `hero-optimized.mp4`.

## Additional Images

You can add more images here for:
- Project thumbnails
- Team photos
- Logo files
- Background images

Reference them in HTML/CSS as: `assets/your-image.jpg`
