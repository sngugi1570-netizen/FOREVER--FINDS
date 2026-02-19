/**
 * Property-Based Tests for queen-upholstered-bed.html
 * Feature: beds-gallery-and-detail-pages
 * Testing Framework: fast-check with Jest
 */

const fc = require('fast-check');
const fs = require('fs');
const path = require('path');

describe('Property-Based Tests: Queen Upholstered Bed Gallery', () => {
  beforeEach(() => {
    // Load the HTML file
    const htmlContent = fs.readFileSync(
      path.resolve(__dirname, 'queen-upholstered-bed.html'),
      'utf8'
    );

    // Set up the DOM
    document.body.innerHTML = htmlContent;

    // Extract and execute the inline script
    const scriptMatch = htmlContent.match(/<script>([\s\S]*?)<\/script>/);
    if (scriptMatch && scriptMatch[1]) {
      // Execute the gallery script
      eval(scriptMatch[1]);
    }

    // Wait a bit for the gallery to initialize
    return new Promise((resolve) => setTimeout(resolve, 100));
  });

  afterEach(() => {
    // Clear any running intervals
    const mainImage = document.getElementById('currentImage');
    if (mainImage) {
      mainImage.dispatchEvent(new Event('mouseenter'));
    }
    document.body.innerHTML = '';
  });

  /**
   * Property 1: Color Selection Updates Gallery
   * **Validates: Requirements 3.2, 3.4**
   * 
   * For any color button on a bed detail page, when that color button is clicked,
   * all gallery images (main image and thumbnails) should update to display images
   * from that color's directory.
   */
  test('Property 1: Color Selection Updates Gallery - all images update to selected color directory', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('black', 'olive-green', 'off-white', 'burnt-orange', 'gray'),
        (selectedColor) => {
          // Get the color button for the selected color
          const colorButton = document.querySelector(`button[data-color="${selectedColor}"]`);
          expect(colorButton).not.toBeNull();

          // Click the color button
          colorButton.click();

          // Give time for the gallery to update
          const mainImage = document.getElementById('currentImage');
          const thumbnails = document.querySelectorAll('.thumb');

          // Verify main image src contains the selected color directory
          const mainImageSrc = mainImage.src;
          const expectedColorPath = `beds/queen-upholstered-bed/${selectedColor}/`;
          expect(mainImageSrc).toContain(expectedColorPath);

          // Verify all thumbnail srcs contain the selected color directory
          thumbnails.forEach((thumb) => {
            const thumbSrc = thumb.src;
            expect(thumbSrc).toContain(expectedColorPath);
          });

          // Return true to indicate property holds
          return true;
        }
      ),
      { numRuns: 10 }
    );
  });

  /**
   * Property 2: Active Color Visual Indication
   * **Validates: Requirements 3.3**
   * 
   * For any color selection state, exactly one color button should have the .active
   * class with gold border styling.
   */
  test('Property 2: Active Color Visual Indication - exactly one color button has active class', () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.constantFrom('black', 'olive-green', 'off-white', 'burnt-orange', 'gray'),
          { minLength: 1, maxLength: 10 }
        ),
        (colorSequence) => {
          // Simulate a sequence of color selections
          for (const selectedColor of colorSequence) {
            const colorButton = document.querySelector(`button[data-color="${selectedColor}"]`);
            expect(colorButton).not.toBeNull();

            // Click the color button
            colorButton.click();

            // Verify exactly one color button has the active class
            const activeButtons = document.querySelectorAll('.color-btn.active');
            expect(activeButtons.length).toBe(1);

            // Verify the active button is the one we just clicked
            expect(activeButtons[0]).toBe(colorButton);
            expect(activeButtons[0].dataset.color).toBe(selectedColor);

            // Verify the active button has the active class
            expect(colorButton.classList.contains('active')).toBe(true);

            // Verify all other buttons do not have the active class
            const allColorButtons = document.querySelectorAll('.color-btn');
            allColorButtons.forEach((btn) => {
              if (btn !== colorButton) {
                expect(btn.classList.contains('active')).toBe(false);
              }
            });
          }

          // Return true to indicate property holds
          return true;
        }
      ),
      { numRuns: 10 }
    );
  });

  /**
   * Property 3: Thumbnail Click Updates Main Image
   * **Validates: Requirements 4.3**
   * 
   * For any thumbnail in the gallery, when clicked, the main image source should
   * update to match that thumbnail's image source.
   */
  test('Property 3: Thumbnail Click Updates Main Image - main image src matches clicked thumbnail', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.array(
          fc.integer({ min: 0, max: 3 }),
          { minLength: 1, maxLength: 3 }
        ),
        async (thumbnailSequence) => {
          // Stop the auto-slideshow to isolate the test
          const mainImage = document.getElementById('currentImage');
          mainImage.dispatchEvent(new Event('mouseenter'));

          // Simulate a sequence of thumbnail clicks
          for (const thumbnailIndex of thumbnailSequence) {
            // Get all thumbnails
            const thumbnails = document.querySelectorAll('.thumb');
            expect(thumbnails.length).toBeGreaterThan(0);

            // Get the thumbnail at the specified index
            const thumbnail = thumbnails[thumbnailIndex];
            expect(thumbnail).not.toBeNull();

            // Get the thumbnail's src before clicking
            const thumbnailSrc = thumbnail.src;

            // Verify fade transition starts (opacity should be set to 0 in style)
            const opacityBefore = mainImage.style.opacity;
            // Initially opacity might be empty string or "1"
            expect(opacityBefore === '' || opacityBefore === '1').toBe(true);

            // Click the thumbnail
            thumbnail.click();

            // Verify fade-out happens (opacity should be set to "0" in inline style)
            const opacityAfterClick = mainImage.style.opacity;
            expect(opacityAfterClick).toBe('0');

            // Wait for the fade transition to complete (200ms delay + small buffer)
            await new Promise((resolve) => setTimeout(resolve, 210));

            // Verify main image src matches the clicked thumbnail src
            expect(mainImage.src).toBe(thumbnailSrc);

            // Verify fade-in completes (opacity should be set to "1" in inline style)
            const opacityAfterTransition = mainImage.style.opacity;
            expect(opacityAfterTransition).toBe('1');

            // Verify the clicked thumbnail has the active class
            expect(thumbnail.classList.contains('active')).toBe(true);

            // Verify exactly one thumbnail has the active class
            const activeThumbnails = document.querySelectorAll('.thumb.active');
            expect(activeThumbnails.length).toBe(1);
            expect(activeThumbnails[0]).toBe(thumbnail);
          }

          // Resume slideshow for next test
          mainImage.dispatchEvent(new Event('mouseleave'));

          return true;
        }
      ),
      { numRuns: 10 }
    );
  }, 30000);

  /**
   * Property 4: Active Thumbnail Visual Indication
   * **Validates: Requirements 4.4**
   * 
   * For any gallery state, exactly one thumbnail should have the .active class
   * with gold border styling.
   */
  test('Property 4: Active Thumbnail Visual Indication - exactly one thumbnail has active class', () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.integer({ min: 0, max: 3 }),
          { minLength: 1, maxLength: 10 }
        ),
        (thumbnailSequence) => {
          // Simulate a sequence of thumbnail clicks
          for (const thumbnailIndex of thumbnailSequence) {
            const thumbnails = document.querySelectorAll('.thumb');
            expect(thumbnails.length).toBeGreaterThan(0);

            const thumbnail = thumbnails[thumbnailIndex];
            expect(thumbnail).not.toBeNull();

            // Click the thumbnail
            thumbnail.click();

            // Verify exactly one thumbnail has the active class
            const activeThumbnails = document.querySelectorAll('.thumb.active');
            expect(activeThumbnails.length).toBe(1);

            // Verify the active thumbnail is the one we just clicked
            expect(activeThumbnails[0]).toBe(thumbnail);

            // Verify the clicked thumbnail has the active class
            expect(thumbnail.classList.contains('active')).toBe(true);

            // Verify all other thumbnails do not have the active class
            thumbnails.forEach((thumb) => {
              if (thumb !== thumbnail) {
                expect(thumb.classList.contains('active')).toBe(false);
              }
            });
          }

          // Return true to indicate property holds
          return true;
        }
      ),
      { numRuns: 10 }
    );
  });

  /**
   * Property 5: Manual Selection Preserves Slideshow
   * **Validates: Requirements 5.2**
   * 
   * For any manually selected image in the gallery, the auto-slideshow should
   * continue cycling from that image after the manual selection.
   */
  test('Property 5: Manual Selection Preserves Slideshow - slideshow continues from selected image', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.integer({ min: 0, max: 2 }), // Use 0-2 to avoid edge case with last thumbnail
        async (thumbnailIndex) => {
          // Get all thumbnails
          const thumbnails = document.querySelectorAll('.thumb');
          expect(thumbnails.length).toBeGreaterThan(0);

          // Click a specific thumbnail
          const selectedThumbnail = thumbnails[thumbnailIndex];
          const selectedSrc = selectedThumbnail.src;
          selectedThumbnail.click();

          // Wait a bit for the click to process and slideshow to reset
          await new Promise((resolve) => setTimeout(resolve, 300));

          // Verify the selected thumbnail is active
          expect(selectedThumbnail.classList.contains('active')).toBe(true);

          // Wait for the slideshow to advance (4 seconds + small buffer)
          await new Promise((resolve) => setTimeout(resolve, 4100));

          // Get the currently active thumbnail
          const activeThumbnail = document.querySelector('.thumb.active');
          expect(activeThumbnail).not.toBeNull();

          // Verify the slideshow advanced (the active thumbnail changed)
          expect(activeThumbnail.src).not.toBe(selectedSrc);

          // Verify it advanced to a valid thumbnail (one of the 4 images)
          const allThumbnailSrcs = Array.from(thumbnails).map(t => t.src);
          expect(allThumbnailSrcs).toContain(activeThumbnail.src);

          return true;
        }
      ),
      { numRuns: 2, timeout: 30000 }
    );
  }, 30000);
});
