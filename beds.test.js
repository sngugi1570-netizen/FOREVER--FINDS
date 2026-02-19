/**
 * Unit tests for beds.html gallery page
 * Tests Requirements: 1.1, 1.3, 1.4, 1.5, 7.3
 */

const fs = require('fs');
const path = require('path');

describe('Beds Gallery Page (beds.html)', () => {
  let htmlContent;

  beforeAll(() => {
    htmlContent = fs.readFileSync(path.resolve(__dirname, 'beds.html'), 'utf8');
  });

  describe('Product Cards Rendering', () => {
    test('should render all four product cards with images', () => {
      const productCardMatches = htmlContent.match(/<div class="product-card">/g);
      expect(productCardMatches).not.toBeNull();
      expect(productCardMatches.length).toBe(4);

      // Check each card has an image
      const imgMatches = htmlContent.match(/<img src="[^"]*" alt="[^"]*">/g);
      expect(imgMatches).not.toBeNull();
      expect(imgMatches.length).toBeGreaterThanOrEqual(4);
    });

    test('should display correct product names', () => {
      expect(htmlContent).toContain('Queen Size Upholstered Bed');
      expect(htmlContent).toContain('King Size Statement Bed');
      expect(htmlContent).toContain('6x6 Luxury Frame');
      expect(htmlContent).toContain('5x6 Modern Bed');
    });

    test('should use correct placeholder images from signature-pieces folder', () => {
      expect(htmlContent).toContain('assets/images/signature-pieces/luxury-panel-bed/1.jpg');
      expect(htmlContent).toContain('assets/images/signature-pieces/wing-bed/1.jpg');
      expect(htmlContent).toContain('assets/images/signature-pieces/modern-curved/1.jpg');
      expect(htmlContent).toContain('assets/images/signature-pieces/sculpted-minimal/1.jpg');
    });
  });

  describe('View Details Links', () => {
    test('should have "View Details" links for each product', () => {
      const viewDetailsMatches = htmlContent.match(/View Details/g);
      expect(viewDetailsMatches).not.toBeNull();
      expect(viewDetailsMatches.length).toBe(4);
    });

    test('should have correct hrefs to detail pages', () => {
      expect(htmlContent).toContain('products/queen-upholstered-bed.html');
      expect(htmlContent).toContain('products/king-statement-bed.html');
      expect(htmlContent).toContain('products/luxury-frame-6x6.html');
      expect(htmlContent).toContain('products/modern-bed-5x6.html');
    });

    test('should have clickable product images linking to detail pages', () => {
      // Check for anchor tags wrapping product-img divs
      expect(htmlContent).toMatch(/<a href="products\/queen-upholstered-bed\.html">/);
      expect(htmlContent).toMatch(/<a href="products\/king-statement-bed\.html">/);
      expect(htmlContent).toMatch(/<a href="products\/luxury-frame-6x6\.html">/);
      expect(htmlContent).toMatch(/<a href="products\/modern-bed-5x6\.html">/);
    });
  });

  describe('Customize Buttons', () => {
    test('should have "Customize" buttons for each product', () => {
      const customizeMatches = htmlContent.match(/Customize/g);
      expect(customizeMatches).not.toBeNull();
      expect(customizeMatches.length).toBe(4);
    });

    test('should have correct URL parameters in customize button hrefs', () => {
      expect(htmlContent).toContain('customize.html?product=Queen%20Size%20Upholstered%20Bed');
      expect(htmlContent).toContain('customize.html?product=King%20Size%20Statement%20Bed');
      expect(htmlContent).toContain('customize.html?product=6x6%20Luxury%20Frame');
      expect(htmlContent).toContain('customize.html?product=5x6%20Modern%20Bed');
    });
  });

  describe('Product Actions Structure', () => {
    test('should have product-actions div for each card', () => {
      const productActionsMatches = htmlContent.match(/<div class="product-actions">/g);
      expect(productActionsMatches).not.toBeNull();
      expect(productActionsMatches.length).toBe(4);
    });

    test('should match couches.html pattern with View Details and Customize in product-actions', () => {
      // Check that text-link and btn-outline classes are present
      const textLinkMatches = htmlContent.match(/class="text-link"/g);
      const btnOutlineMatches = htmlContent.match(/class="btn-outline"/g);
      
      expect(textLinkMatches).not.toBeNull();
      expect(textLinkMatches.length).toBe(4);
      expect(btnOutlineMatches).not.toBeNull();
      expect(btnOutlineMatches.length).toBe(4);
    });
  });

  describe('Responsive Layout', () => {
    test('should have products-grid class for responsive layout', () => {
      expect(htmlContent).toContain('class="container products-grid"');
    });

    test('should contain all product cards within products-grid', () => {
      // Check that products-grid section contains product-card divs
      const productsGridSection = htmlContent.match(/<div class="container products-grid">[\s\S]*?<\/div>\s*<\/section>/);
      expect(productsGridSection).not.toBeNull();
      
      const productCardsInGrid = productsGridSection[0].match(/<div class="product-card">/g);
      expect(productCardsInGrid).not.toBeNull();
      expect(productCardsInGrid.length).toBe(4);
    });

    test('should have proper CSS classes for responsive behavior', () => {
      // Verify the grid container has the correct class
      expect(htmlContent).toContain('class="container products-grid"');

      // Verify each card has the product-card class
      const productCardMatches = htmlContent.match(/class="product-card"/g);
      expect(productCardMatches).not.toBeNull();
      expect(productCardMatches.length).toBe(4);
    });

    test('should transform to single column below 900px viewport width', () => {
      // Read the CSS file to verify responsive behavior
      const cssContent = fs.readFileSync(path.resolve(__dirname, 'assets/css/main.css'), 'utf8');
      
      // Verify that products-grid has 4-column layout by default
      expect(cssContent).toMatch(/\.products-grid\s*{[\s\S]*?grid-template-columns:\s*repeat\(4,\s*1fr\)/);
      
      // Verify that media query exists for max-width 900px
      expect(cssContent).toMatch(/@media\s*\(max-width:\s*900px\)/);
      
      // Verify that products-grid changes to single column in media query
      const mediaQuerySection = cssContent.match(/@media\s*\(max-width:\s*900px\)\s*{[\s\S]*?}/);
      expect(mediaQuerySection).not.toBeNull();
      expect(mediaQuerySection[0]).toContain('.products-grid');
      expect(mediaQuerySection[0]).toMatch(/grid-template-columns:\s*1fr/);
    });
  });

  describe('Page Structure', () => {
    test('should have correct page title', () => {
      expect(htmlContent).toContain('<title>Luxury Beds | Forever Finds</title>');
    });

    test('should have hero section with heading and description', () => {
      expect(htmlContent).toContain('class="section hero-small"');
      expect(htmlContent).toContain('<h1>Luxury Bed Collection</h1>');
      expect(htmlContent).toContain('Statement beds crafted for comfort, elegance, and presence.');
    });

    test('should load main.css stylesheet', () => {
      expect(htmlContent).toContain('<link rel="stylesheet" href="assets/css/main.css"');
    });

    test('should load main.js script', () => {
      expect(htmlContent).toContain('<script src="assets/js/main.js"></script>');
    });

    test('should have header and footer placeholder divs', () => {
      expect(htmlContent).toContain('<div id="header"></div>');
      expect(htmlContent).toContain('<div id="footer"></div>');
    });
  });
});

