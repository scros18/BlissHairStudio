# Image Optimization Guide

## Current Issues:
- Product images are 1280x1280 but displayed at 259x259 (mobile/desktop)
- logo.png is 474x474 but displayed at 320x320 (hero) and 180x180 (footer)
- Images are not in modern formats (WebP/AVIF)
- No responsive srcset attributes

## Quick Fixes:

### 1. Convert and resize images using ImageMagick or similar:

```bash
# Install ImageMagick (if not installed)
sudo apt-get install imagemagick webp

# Convert logo.png to WebP with proper sizes
convert public/logo.png -resize 320x320 -quality 85 public/logo-320.webp
convert public/logo.png -resize 180x180 -quality 85 public/logo-180.webp
convert public/logo.png -resize 640x640 -quality 85 public/logo-640.webp

# Convert product images to WebP
for file in public/*.jpg; do
    filename=$(basename "$file" .jpg)
    # Create 300px version for display
    convert "$file" -resize 300x300 -quality 85 "public/${filename}-300.webp"
    # Create 600px version for retina
    convert "$file" -resize 600x600 -quality 85 "public/${filename}-600.webp"
    # Create 1280px version for full quality
    convert "$file" -quality 85 "public/${filename}.webp"
done
```

### 2. Update image references in code:

**For logo (index.html):**
```html
<picture>
    <source srcset="/logo-320.webp 1x, /logo-640.webp 2x" type="image/webp">
    <img src="/logo.webp" alt="Bliss Hair Studio" width="320" height="320" loading="lazy">
</picture>
```

**For product images (home.ts):**
```html
<picture>
    <source srcset="/product-name-300.webp 1x, /product-name-600.webp 2x" type="image/webp">
    <img src="/product-name.jpg" alt="Product Name" width="259" height="259" loading="lazy">
</picture>
```

### 3. Add loading="lazy" to all images below the fold

### 4. Preload critical images (hero logo):
In index.html <head>:
```html
<link rel="preload" as="image" href="/logo-320.webp" type="image/webp">
```

## Automated Solution with Sharp (Node.js):

```bash
npm install --save-dev sharp
```

Create `scripts/optimize-images.js`:
```javascript
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = './public';
const sizes = [300, 600, 1280];

fs.readdirSync(publicDir)
    .filter(file => /\.(jpg|jpeg|png)$/i.test(file))
    .forEach(async (file) => {
        const input = path.join(publicDir, file);
        const name = path.parse(file).name;
        
        for (const size of sizes) {
            await sharp(input)
                .resize(size, size, { fit: 'inside' })
                .webp({ quality: 85 })
                .toFile(path.join(publicDir, `${name}-${size}.webp`));
        }
        
        console.log(`Optimized ${file}`);
    });
```

Run: `node scripts/optimize-images.js`

## Results:
- Reduces image size by ~80-90%
- Faster load times
- Better LCP scores
- Improved mobile experience
