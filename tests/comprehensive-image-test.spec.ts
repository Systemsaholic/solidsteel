import { test, expect } from '@playwright/test';

test.describe('Comprehensive Image Testing', () => {
  test('all images should load properly with proper scrolling', async ({ page, request }) => {
    const failedImages: Array<{
      page: string;
      src: string;
      alt?: string;
      error: string;
    }> = [];
    
    const pagesToTest = [
      { path: '/', name: 'Home' },
      { path: '/about', name: 'About' },
      { path: '/contact', name: 'Contact' },
      { path: '/projects', name: 'Projects' },
      { path: '/case-studies', name: 'Case Studies' },
    ];
    
    for (const pageInfo of pagesToTest) {
      console.log(`\nTesting ${pageInfo.name} page...`);
      
      // Navigate to page
      await page.goto(pageInfo.path, { waitUntil: 'networkidle' });
      
      // Scroll to trigger lazy loading
      await page.evaluate(() => {
        // Scroll to bottom
        window.scrollTo(0, document.body.scrollHeight);
      });
      await page.waitForTimeout(1000);
      
      // Scroll back to top
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(1000);
      
      // If projects section exists, scroll to it
      if (pageInfo.path === '/') {
        await page.evaluate(() => {
          const projectsSection = document.querySelector('#projects');
          if (projectsSection) {
            projectsSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        });
        await page.waitForTimeout(2000);
      }
      
      // Get all images
      const images = await page.locator('img').all();
      console.log(`  Found ${images.length} images`);
      
      for (const img of images) {
        const src = await img.getAttribute('src');
        const alt = await img.getAttribute('alt');
        
        if (!src) {
          failedImages.push({
            page: pageInfo.name,
            src: 'No src attribute',
            alt,
            error: 'Missing src attribute',
          });
          continue;
        }
        
        // Check if image is loaded
        const isLoaded = await img.evaluate((element) => {
          const img = element as HTMLImageElement;
          // SVGs might have 0 dimensions but still be valid
          if (img.src.endsWith('.svg')) {
            return img.complete;
          }
          return img.complete && img.naturalHeight > 0 && img.naturalWidth > 0;
        });
        
        if (!isLoaded) {
          const details = await img.evaluate((el) => {
            const img = el as HTMLImageElement;
            return {
              complete: img.complete,
              naturalWidth: img.naturalWidth,
              naturalHeight: img.naturalHeight,
            };
          });
          
          failedImages.push({
            page: pageInfo.name,
            src,
            alt,
            error: `Failed to load - complete: ${details.complete}, dimensions: ${details.naturalWidth}x${details.naturalHeight}`,
          });
        }
        
        // Also check network status for external images
        if (src.startsWith('http') || src.startsWith('//')) {
          try {
            const response = await request.get(src);
            if (response.status() >= 400) {
              failedImages.push({
                page: pageInfo.name,
                src,
                alt,
                error: `HTTP ${response.status()} error`,
              });
            }
          } catch (error) {
            failedImages.push({
              page: pageInfo.name,
              src,
              alt,
              error: `Network error: ${error}`,
            });
          }
        }
      }
    }
    
    // Test individual project pages
    await page.goto('/projects', { waitUntil: 'networkidle' });
    const projectLinks = await page.locator('a[href^="/projects/"]').all();
    const projectUrls = new Set<string>();
    
    for (const link of projectLinks) {
      const href = await link.getAttribute('href');
      if (href && href !== '/projects' && !href.includes('gallery')) {
        projectUrls.add(href);
      }
    }
    
    console.log(`\nTesting ${projectUrls.size} project pages...`);
    
    for (const projectUrl of Array.from(projectUrls).slice(0, 3)) { // Test first 3 projects
      console.log(`  Testing ${projectUrl}`);
      await page.goto(projectUrl, { waitUntil: 'networkidle' });
      await page.waitForTimeout(1000);
      
      const images = await page.locator('img').all();
      
      for (const img of images) {
        const src = await img.getAttribute('src');
        const alt = await img.getAttribute('alt');
        
        if (!src) continue;
        
        const isLoaded = await img.evaluate((element) => {
          const img = element as HTMLImageElement;
          if (img.src.endsWith('.svg')) {
            return img.complete;
          }
          return img.complete && img.naturalHeight > 0 && img.naturalWidth > 0;
        });
        
        if (!isLoaded) {
          failedImages.push({
            page: projectUrl,
            src,
            alt,
            error: 'Failed to load',
          });
        }
      }
    }
    
    // Report results
    if (failedImages.length > 0) {
      console.log('\n❌ FAILED IMAGES:');
      console.log('==================');
      failedImages.forEach((img, index) => {
        console.log(`${index + 1}. Page: ${img.page}`);
        console.log(`   Src: ${img.src}`);
        if (img.alt) console.log(`   Alt: ${img.alt}`);
        console.log(`   Error: ${img.error}`);
        console.log('---');
      });
      
      // Fail the test if there are broken images
      expect(failedImages.length).toBe(0);
    } else {
      console.log('\n✅ All images loaded successfully!');
    }
  });
  
  test('verify static assets are accessible', async ({ request }) => {
    const staticAssets = [
      '/modern-retirement-community.png',
      '/ford-dealership.png',
      '/industrial-hq-equipment.png',
      '/transportation-logistics-facility.png',
      '/placeholder-x4kg9.png',
      '/bdc-logo.png',
      '/placeholder-logo.png',
    ];
    
    console.log('\nVerifying static assets...');
    
    for (const asset of staticAssets) {
      const response = await request.get(`http://localhost:3005${asset}`);
      const status = response.status();
      console.log(`  ${asset}: ${status === 200 ? '✅' : '❌'} (${status})`);
      expect(status).toBe(200);
    }
  });
  
  test('verify image optimization settings', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    
    // Check if images are using proper attributes
    const images = await page.locator('img').all();
    
    for (const img of images.slice(0, 5)) { // Check first 5 images
      const src = await img.getAttribute('src');
      const loading = await img.getAttribute('loading');
      const width = await img.getAttribute('width');
      const height = await img.getAttribute('height');
      
      console.log(`Image: ${src}`);
      console.log(`  Loading: ${loading || 'not set'}`);
      console.log(`  Dimensions: ${width}x${height}`);
      
      // Images should have lazy loading
      expect(loading).toBe('lazy');
      
      // Images should have dimensions
      expect(width).toBeTruthy();
      expect(height).toBeTruthy();
    }
  });
});