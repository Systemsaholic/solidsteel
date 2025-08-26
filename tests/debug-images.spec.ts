import { test, expect } from '@playwright/test';

test.describe('Debug Image Issues', () => {
  test('debug homepage content and images', async ({ page }) => {
    // Navigate to homepage
    await page.goto('/');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Get page title to confirm page loaded
    const title = await page.title();
    console.log('Page title:', title);
    
    // Check for any elements with background images
    const elementsWithBgImages = await page.evaluate(() => {
      const allElements = document.querySelectorAll('*');
      const bgImages = [];
      allElements.forEach(el => {
        const bgImage = window.getComputedStyle(el).backgroundImage;
        if (bgImage && bgImage !== 'none') {
          bgImages.push({
            tag: el.tagName,
            class: el.className,
            bgImage: bgImage
          });
        }
      });
      return bgImages;
    });
    
    console.log('Elements with background images:', elementsWithBgImages);
    
    // Get all img elements with details
    const imageDetails = await page.evaluate(() => {
      const imgs = document.querySelectorAll('img');
      return Array.from(imgs).map(img => ({
        src: img.src,
        alt: img.alt,
        width: img.width,
        height: img.height,
        complete: img.complete,
        naturalHeight: img.naturalHeight,
        display: window.getComputedStyle(img).display,
        visibility: window.getComputedStyle(img).visibility
      }));
    });
    
    console.log('Image elements found:', imageDetails);
    
    // Check for Next.js Image components
    const nextImageContainers = await page.locator('[data-nimg]').all();
    console.log('Next.js Image containers:', nextImageContainers.length);
    
    // Take a screenshot for visual inspection
    await page.screenshot({ path: 'homepage-screenshot.png', fullPage: true });
    console.log('Screenshot saved as homepage-screenshot.png');
    
    // Check if any errors in console
    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.log('Console error:', msg.text());
      }
    });
    
    // Check network errors
    page.on('response', response => {
      if (!response.ok() && response.url().includes('image')) {
        console.log(`Failed to load: ${response.url()} - Status: ${response.status()}`);
      }
    });
    
    await page.waitForTimeout(2000);
  });
});