# Signature Pieces Setup Guide

## Overview
This guide will help you populate your signature pieces gallery with real photos from your Instagram (@foreverfindsfurniture_).

## Folder Structure Created

I've created 8 placeholder folders for your signature pieces:
```
assets/images/signature-pieces/
├── custom-piece-1/
├── custom-piece-2/
├── custom-piece-3/
├── custom-piece-4/
├── custom-piece-5/
├── custom-piece-6/
├── custom-piece-7/
└── custom-piece-8/
```

## How to Add Your Instagram Photos

### Step 1: Download Photos from Instagram
1. Go to your Instagram profile: @foreverfindsfurniture_
2. For each furniture piece you want to showcase:
   - Open the post
   - Download/save the image(s)
   - If it's a carousel post, download all images

### Step 2: Organize Photos by Project
For each custom furniture piece:
1. Choose a descriptive folder name (e.g., "grey-sectional-sofa", "beige-bedroom-set")
2. Rename one of the placeholder folders (custom-piece-1, etc.) to your chosen name
3. Add 3-8 photos of that piece to the folder
4. Name the photos: 1.jpg, 2.jpg, 3.jpg, etc.

**Example:**
```
assets/images/signature-pieces/
├── grey-sectional-sofa/
│   ├── 1.jpg (main front view)
│   ├── 2.jpg (side angle)
│   ├── 3.jpg (close-up of fabric)
│   ├── 4.jpg (in customer's home)
│   └── 5.jpg (detail shot)
```

### Step 3: Update the Signature Pieces Page

Once you've added photos, you'll need to update:

**File: `signature-pieces.html`**
- Update product card titles (line 45, 58, 71, etc.)
- Update image paths to match your folder names
- Update product descriptions

**Example:**
```html
<!-- BEFORE -->
<div class="product-card">
  <a href="products/signature-piece-1.html">
    <div class="product-img">
      <img src="assets/images/signature-pieces/piece-1/1.jpg" alt="Custom Signature Piece 1">
    </div>
  </a>
  <h4>Elegant Living Room Set</h4>
  ...
</div>

<!-- AFTER (with your actual piece) -->
<div class="product-card">
  <a href="products/grey-sectional-sofa.html">
    <div class="product-img">
      <img src="assets/images/signature-pieces/grey-sectional-sofa/1.jpg" alt="Grey Sectional Sofa">
    </div>
  </a>
  <h4>Grey Sectional Sofa</h4>
  <p class="product-meta">Custom Project • Westlands, Nairobi</p>
  ...
</div>
```

### Step 4: Create Detail Pages for Each Piece

For each signature piece, create a detail page:

1. Copy `products/signature-piece-template.html`
2. Rename it (e.g., `grey-sectional-sofa.html`)
3. Update these sections:
   - Page title (line 6)
   - Product name (line 31)
   - Description (line 33-35)
   - Project details (lines 38-44)
   - Image path (line 95)
   - Total images count (line 94)

## Naming Suggestions for Your Pieces

Based on typical custom furniture projects, here are some naming ideas:

### Couches/Sofas:
- grey-l-shaped-sectional
- beige-bubble-seat-sofa
- olive-curved-sofa
- burnt-orange-3-seater
- modern-minimalist-couch

### Beds:
- tufted-king-bed-grey
- upholstered-queen-bed-beige
- luxury-panel-bed-navy
- modern-platform-bed

### Dining Sets:
- 6-seater-dining-set
- modern-dining-table-chairs

### Mixed Projects:
- complete-living-room-set
- bedroom-suite-package

## Tips for Great Signature Pieces

1. **Use High-Quality Photos**: Clear, well-lit images work best
2. **Show Multiple Angles**: Front, side, close-ups, in-situ shots
3. **Tell the Story**: Add details about the project in the description
4. **Include Context**: Photos in the customer's actual home are powerful
5. **Highlight Unique Features**: Custom fabric, special design elements, etc.

## Quick Start Checklist

- [ ] Download 8-12 of your best Instagram posts
- [ ] Organize photos into project folders
- [ ] Rename folders from "custom-piece-X" to descriptive names
- [ ] Add photos (1.jpg, 2.jpg, etc.) to each folder
- [ ] Update signature-pieces.html with actual names and paths
- [ ] Create detail pages for each piece
- [ ] Test the gallery in your browser

## Need Help?

If you need assistance with:
- Updating the HTML files
- Creating more detail pages
- Adjusting the layout
- Adding more pieces

Just let me know which pieces you want to showcase and I can help update the code!

---

**Next Steps:**
1. Go through your Instagram and pick your 8 best projects
2. Download the photos
3. Let me know the names/descriptions of each piece
4. I'll help you update all the HTML files with the correct information
