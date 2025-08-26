import { test, expect } from '@playwright/test';

test.describe('Image Loading Tests', () => {
  test('all images on homepage should load properly', async ({ page }) => {
    // Navigate to homepage
    await page.goto('/');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Get all img elements
    const images = await page.locator('img').all();
    console.log(`Found ${images.length} images on homepage`);
    
    const brokenImages = [];
    
    // Check each image
    for (const img of images) {
      const src = await img.getAttribute('src');
      const alt = await img.getAttribute('alt') || 'no alt text';
      
      // Check if image is loaded
      const isLoaded = await img.evaluate((el: HTMLImageElement) => {
        return el.complete && el.naturalHeight !== 0;
      });
      
      if (!isLoaded) {
        brokenImages.push({ src, alt });
      }
    }
    
    // Log broken images
    if (brokenImages.length > 0) {
      console.log('Broken images found:');
      brokenImages.forEach(img => {
        console.log(`- ${img.src} (alt: ${img.alt})`);
      });
    }
    
    // Assert no broken images
    expect(brokenImages).toHaveLength(0);
  });

  test('all images on projects page should load', async ({ page }) => {
    await page.goto('/projects');
    await page.waitForLoadState('networkidle');
    
    const images = await page.locator('img').all();
    console.log(`Found ${images.length} images on projects page`);
    
    const brokenImages = [];
    
    for (const img of images) {
      const src = await img.getAttribute('src');
      const isLoaded = await img.evaluate((el: HTMLImageElement) => {
        return el.complete && el.naturalHeight !== 0;
      });
      
      if (!isLoaded) {
        brokenImages.push(src);
      }
    }
    
    expect(brokenImages).toHaveLength(0);
  });

  test('all images on about page should load', async ({ page }) => {
    await page.goto('/about');
    await page.waitForLoadState('networkidle');
    
    const images = await page.locator('img').all();
    console.log(`Found ${images.length} images on about page`);
    
    const brokenImages = [];
    
    for (const img of images) {
      const src = await img.getAttribute('src');
      const isLoaded = await img.evaluate((el: HTMLImageElement) => {
        return el.complete && el.naturalHeight !== 0;
      });
      
      if (!isLoaded) {
        brokenImages.push(src);
      }
    }
    
    expect(brokenImages).toHaveLength(0);
  });

  test('check Next.js Image optimization is working', async ({ page }) => {
    await page.goto('/');
    
    // Check for Next.js Image component usage
    const nextImages = await page.locator('img[srcset]').all();
    console.log(`Found ${nextImages.length} Next.js optimized images`);
    
    // Verify at least some images are using Next.js Image component
    expect(nextImages.length).toBeGreaterThan(0);
  });

  test('favicon should load', async ({ page }) => {
    const response = await page.goto('/favicon.ico');
    expect(response?.status()).toBe(200);
  });
});