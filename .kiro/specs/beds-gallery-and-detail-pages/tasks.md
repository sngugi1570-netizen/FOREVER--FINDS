# Implementation Plan: Beds Gallery and Detail Pages

## Overview

This implementation plan breaks down the beds gallery and detail pages feature into discrete coding tasks. The implementation follows established patterns from existing couch pages to ensure consistency in user experience, code structure, and visual design. Each task builds incrementally, with testing integrated throughout to validate functionality early.

## Tasks

- [x] 1. Enhance beds.html gallery page with product images and navigation
  - Update the four product cards with actual images from signature-pieces folder as placeholders
  - Add product-img img elements with proper src paths (luxury-panel-bed, wing-bed, modern-curved, sculpted-minimal)
  - Add "View Details" links pointing to products/[product-name].html for each card
  - Update "Customize" button hrefs to include product name URL parameters
  - Ensure product-actions div structure matches couches.html pattern
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

- [x] 1.1 Write unit tests for beds.html gallery page
  - Test that all four product cards render with images
  - Test that "View Details" links have correct hrefs to detail pages
  - Test that "Customize" buttons have correct URL parameters
  - Test responsive grid layout transforms to single column below 900px
  - _Requirements: 1.1, 1.3, 1.4, 1.5, 7.3_

- [ ] 2. Create queen-upholstered-bed.html detail page with complete gallery functionality
  - [x] 2.1 Create HTML structure with header, main, footer, and modal sections
    - Copy structure from bubble-seat.html as template
    - Update page title to "Queen Size Upholstered Bed | Forever Finds"
    - Update product name in h1 to "Queen Size Upholstered Bed"
    - Add product description: "Elegant upholstered bed with premium fabric and modern design, perfect for sophisticated bedrooms."
    - Update customize button href to ../customize.html?product=Queen%20Size%20Upholstered%20Bed
    - Add gallery div with main-image, thumbs-vertical, and color-selector sections
    - Add fullscreen modal structure with close button and modal-content image
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 8.5, 10.2, 10.3, 10.4_

  - [x] 2.2 Implement color selector component with 5 color options
    - Add color-selector div with "Select Color:" label
    - Add 5 color buttons: black (#111), olive-green (#21c251), off-white (#f5f5f5), burnt-orange (#c45a2c), gray (#808080)
    - Set data-color attributes on each button
    - Apply inline background styles to show color visually
    - Set black as default active color with .active class
    - _Requirements: 3.1, 3.3, 3.5_

  - [x] 2.3 Implement gallery JavaScript with state management and color switching
    - Define state variables: currentColor, totalImages (4), autoSlideIndex, autoSlideInterval
    - Implement loadGallery(color) function to dynamically generate thumbnails
    - Clear existing thumbnails and create new ones for selected color
    - Set image paths to ../assets/images/beds/queen-upholstered-bed/[color]/[1-4].jpg
    - Add click handlers to color buttons to call loadGallery(color)
    - Update active color button styling (remove .active from all, add to clicked)
    - Initialize gallery with default "black" color on DOMContentLoaded
    - _Requirements: 3.2, 3.4, 4.1, 4.2, 4.5_

  - [x] 2.4 Write property test for color selection updates gallery
    - **Property 1: Color Selection Updates Gallery**
    - **Validates: Requirements 3.2, 3.4**
    - Generate random color selections from available colors
    - Verify main image src updates to selected color directory
    - Verify all thumbnail srcs update to selected color directory
    - Run with minimum 100 iterations using fast-check

  - [x] 2.5 Write property test for active color visual indication
    - **Property 2: Active Color Visual Indication**
    - **Validates: Requirements 3.3**
    - Generate random color selection sequences
    - Verify exactly one color button has .active class after each selection
    - Verify active button has gold border styling
    - Run with minimum 100 iterations using fast-check

  - [x] 2.6 Implement thumbnail click handlers and main image updates
    - Add click event listeners to each generated thumbnail
    - On thumbnail click: remove .active class from all thumbnails
    - Add .active class to clicked thumbnail
    - Implement fade transition: set main image opacity to 0
    - After 200ms delay, update main image src to clicked thumbnail src
    - Set main image opacity back to 1 for fade-in effect
    - Update autoSlideIndex to match clicked thumbnail index
    - Reset auto-slideshow to continue from new position
    - _Requirements: 4.3, 4.4, 5.2_

  - [x] 2.7 Write property test for thumbnail click updates main image
    - **Property 3: Thumbnail Click Updates Main Image**
    - **Validates: Requirements 4.3**
    - Generate random thumbnail click sequences
    - Verify main image src matches clicked thumbnail src after each click
    - Verify fade transition completes correctly
    - Run with minimum 100 iterations using fast-check

  - [ ] 2.8 Write property test for active thumbnail visual indication
    - **Property 4: Active Thumbnail Visual Indication**
    - **Validates: Requirements 4.4**
    - Generate random gallery interaction states
    - Verify exactly one thumbnail has .active class at any given time
    - Verify active thumbnail has gold border styling
    - Run with minimum 100 iterations using fast-check

  - [ ] 2.9 Implement auto-slideshow functionality with pause/resume
    - Implement startAutoSlide() function with setInterval at 4000ms (4 seconds)
    - Auto-advance to next thumbnail using modulo arithmetic: (index + 1) % totalThumbs
    - Trigger click on next thumbnail to advance slideshow
    - Clear existing interval before starting new one to prevent memory leaks
    - Add mouseenter listener to main image to pause slideshow (clearInterval)
    - Add mouseleave listener to main image to resume slideshow (call startAutoSlide)
    - Call startAutoSlide() at end of loadGallery() to initialize
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

  - [ ] 2.10 Write property test for manual selection preserves slideshow
    - **Property 5: Manual Selection Preserves Slideshow**
    - **Validates: Requirements 5.2**
    - Generate random manual thumbnail selections during active slideshow
    - Verify slideshow continues cycling from the manually selected image
    - Verify autoSlideIndex updates correctly after manual selection
    - Run with minimum 100 iterations using fast-check

  - [ ] 2.11 Write property test for slideshow sequential cycling
    - **Property 6: Slideshow Sequential Cycling**
    - **Validates: Requirements 5.5**
    - Generate random slideshow sequences of varying lengths
    - Verify images cycle in sequential order: 0, 1, 2, ..., n-1, 0, 1, ...
    - Verify loop back to first image occurs after last image
    - Run with minimum 100 iterations using fast-check

  - [ ] 2.12 Implement zoom modal functionality with multiple close methods
    - Add click listener to main image to open modal
    - On main image click: set modal display to "flex" and copy main image src to modal image
    - Add click listener to close button (×) to close modal
    - On close button click: set modal display to "none"
    - Add click listener to modal background to close on backdrop click
    - Check if click target is modal itself (not modal content) before closing
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

  - [ ] 2.13 Write property test for modal displays current image
    - **Property 7: Modal Displays Current Image**
    - **Validates: Requirements 6.5**
    - Generate random modal open events from different gallery states
    - Verify modal image src matches main image src when modal opens
    - Verify modal displays correct image after color changes
    - Run with minimum 100 iterations using fast-check

  - [ ] 2.14 Write unit tests for queen-upholstered-bed.html functionality
    - Test page title is "Queen Size Upholstered Bed | Forever Finds"
    - Test product description is present and correct
    - Test customize button href includes correct product name parameter
    - Test initial gallery loads with default "black" color
    - Test modal opens when main image is clicked
    - Test modal closes when close button is clicked
    - Test modal closes when backdrop is clicked
    - Test auto-slideshow advances every 4 seconds
    - Test slideshow pauses on main image hover
    - Test slideshow resumes when hover ends
    - _Requirements: 2.2, 2.3, 2.4, 5.1, 5.3, 5.4, 6.1, 6.2, 6.3, 6.4_

- [ ] 3. Checkpoint - Verify queen-upholstered-bed.html is fully functional
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 4. Create king-statement-bed.html detail page
  - [ ] 4.1 Copy queen-upholstered-bed.html as template and customize
    - Copy entire file structure from queen-upholstered-bed.html
    - Update page title to "King Size Statement Bed | Forever Finds"
    - Update product name in h1 to "King Size Statement Bed"
    - Update product description to: "Bold statement piece with luxurious upholstery and commanding presence for master suites."
    - Update customize button href to ../customize.html?product=King%20Size%20Statement%20Bed
    - Update image paths in loadGallery to ../assets/images/beds/king-statement-bed/[color]/[1-4].jpg
    - Keep all JavaScript functionality identical (color selector, gallery, slideshow, modal)
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 10.5_

  - [ ] 4.2 Write unit tests for king-statement-bed.html
    - Test page title is "King Size Statement Bed | Forever Finds"
    - Test product description is present and correct
    - Test customize button href includes correct product name parameter
    - Test gallery functionality (reuse test patterns from task 2.14)
    - _Requirements: 2.2, 2.3, 2.4_

- [ ] 5. Create luxury-frame-6x6.html detail page
  - [ ] 5.1 Copy queen-upholstered-bed.html as template and customize
    - Copy entire file structure from queen-upholstered-bed.html
    - Update page title to "6x6 Luxury Frame | Forever Finds"
    - Update product name in h1 to "6x6 Luxury Frame"
    - Update product description to: "Spacious luxury bed frame with clean lines and premium construction for ultimate comfort."
    - Update customize button href to ../customize.html?product=6x6%20Luxury%20Frame
    - Update image paths in loadGallery to ../assets/images/beds/luxury-frame-6x6/[color]/[1-4].jpg
    - Keep all JavaScript functionality identical (color selector, gallery, slideshow, modal)
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 10.5_

  - [ ] 5.2 Write unit tests for luxury-frame-6x6.html
    - Test page title is "6x6 Luxury Frame | Forever Finds"
    - Test product description is present and correct
    - Test customize button href includes correct product name parameter
    - Test gallery functionality (reuse test patterns from task 2.14)
    - _Requirements: 2.2, 2.3, 2.4_

- [ ] 6. Create modern-bed-5x6.html detail page
  - [ ] 6.1 Copy queen-upholstered-bed.html as template and customize
    - Copy entire file structure from queen-upholstered-bed.html
    - Update page title to "5x6 Modern Bed | Forever Finds"
    - Update product name in h1 to "5x6 Modern Bed"
    - Update product description to: "Contemporary bed design with minimalist aesthetic and exceptional craftsmanship."
    - Update customize button href to ../customize.html?product=5x6%20Modern%20Bed
    - Update image paths in loadGallery to ../assets/images/beds/modern-bed-5x6/[color]/[1-4].jpg
    - Keep all JavaScript functionality identical (color selector, gallery, slideshow, modal)
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 10.5_

  - [ ] 6.2 Write unit tests for modern-bed-5x6.html
    - Test page title is "5x6 Modern Bed | Forever Finds"
    - Test product description is present and correct
    - Test customize button href includes correct product name parameter
    - Test gallery functionality (reuse test patterns from task 2.14)
    - _Requirements: 2.2, 2.3, 2.4_

- [ ] 7. Checkpoint - Verify all detail pages are functional
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 8. Test responsive behavior across all pages
  - [ ] 8.1 Write unit tests for beds.html mobile layout
    - Test product grid displays as single column below 900px viewport width
    - Test product cards maintain proper spacing on mobile
    - Test buttons remain functional and properly sized on mobile
    - Test images scale appropriately on mobile
    - _Requirements: 7.3_

  - [ ] 8.2 Write unit tests for detail pages mobile layout
    - Test gallery stacks vertically below 900px viewport width
    - Test thumbnails display horizontally (not vertically) on mobile
    - Test color selector buttons remain functional and properly sized
    - Test modal scales appropriately with max-width 90% and max-height 90%
    - Test on multiple viewport sizes: 375px (mobile), 768px (tablet), 1024px (desktop)
    - _Requirements: 7.1, 7.2, 7.4, 7.5_

- [ ] 9. Write integration tests for complete user flows
  - Test navigation from beds.html to each detail page via "View Details" link
  - Test navigation from each detail page to customize.html via "Customize This Design" button
  - Test customize.html pre-fills product name field correctly from URL parameter
  - Test customize.html automatically selects "Bed" as product type
  - Test customize.html displays correct bed size options (3x6, 4x6, 5x6, 6x6, Queen Size, King Size)
  - Test header and footer partials load correctly on all pages
  - _Requirements: 1.3, 9.1, 9.2, 9.3, 9.4, 9.5, 8.5_

- [ ] 10. Verify design consistency with existing couch pages
  - [ ] 10.1 Visual comparison and consistency check
    - Verify gold accent color (#d4af37) used for borders, buttons, and hover effects
    - Verify dark theme background colors match couch pages
    - Verify button styles match: .btn-primary (gold background), .btn-outline (gold border)
    - Verify hover effects match: transform scale, box-shadow, and transitions
    - Verify typography matches: Playfair Display for headings, proper font weights
    - Verify card styles match: border-radius, padding, and transition effects
    - _Requirements: 8.1, 8.2, 8.3, 8.4_

  - [ ] 10.2 Code structure and file organization verification
    - Verify CSS class names match couch pages (.product-layout, .gallery, .color-btn, etc.)
    - Verify HTML structure matches couch pages (same nesting and semantic elements)
    - Verify JavaScript patterns match bubble-seat.html (inline scripts, same function names)
    - Verify relative paths are correct: ../assets/css/, ../assets/js/, ../assets/images/
    - Verify file naming follows kebab-case convention for all detail pages
    - _Requirements: 2.5, 8.1, 10.1, 10.2, 10.3, 10.4, 10.5_

- [ ] 11. Final checkpoint - Complete feature verification
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation at key milestones
- Property tests validate universal correctness properties with minimum 100 iterations using fast-check
- Unit tests validate specific examples, edge cases, and error conditions
- Integration tests validate complete user flows across multiple pages
- The first detail page (queen-upholstered-bed.html) is implemented fully with all functionality, then serves as a template for the other three pages
- Image assets should be organized in assets/images/beds/[product-name]/[color]/ directories with 4 images per color
- If actual bed product images are not available, use placeholder images from signature-pieces folder
- All JavaScript is inline in detail pages following the bubble-seat.html pattern (no separate JS files)
- CSS and main.js are shared across all pages via existing assets (no new files needed)
- All pages use the existing loadPartial function to load header and footer
- Color options are consistent across all bed products: black, olive-green, off-white, burnt-orange, gray
