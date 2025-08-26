import { test, expect } from '@playwright/test';

test.describe('Case Study Image Loading', () => {
  test('case study pages should load blob storage images', async ({ page }) => {
    // Test the CANDC welding case study
    await page.goto('/case-studies/candc-welding-completion', { waitUntil: 'networkidle' });
    
    // Wait for images to load
    await page.waitForTimeout(3000);
    
    const images = await page.locator('img').all();
    const imageData = [];
    
    for (const img of images) {
      const src = await img.getAttribute('src');
      const alt = await img.getAttribute('alt');
      
      if (!alt || alt.includes('Solid Steel')) continue; // Skip logos
      
      const isLoaded = await img.evaluate((el) => {
        const img = el as HTMLImageElement;
        if (img.src.endsWith('.svg')) return img.complete;
        return img.complete && img.naturalHeight > 0 && img.naturalWidth > 0;
      });
      
      imageData.push({
        alt,
        src,
        loaded: isLoaded,
        isBlob: src?.includes('blob.vercel-storage.com')
      });
      
      console.log(`${isLoaded ? '✅' : '❌'} ${alt}: ${src?.substring(0, 80)}...`);
    }
    
    // Check hero image
    const heroImage = imageData.find(img => img.alt?.includes('C & C Welding'));
    if (heroImage) {
      console.log(`\nHero image: ${heroImage.isBlob ? 'Using blob storage' : 'Using static fallback'}`);
      expect(heroImage.loaded).toBe(true);
      expect(heroImage.isBlob).toBe(true);
    }
    
    // Check gallery images
    const galleryImages = imageData.filter(img => img.alt?.includes('gallery image'));
    console.log(`\nGallery images: ${galleryImages.length}`);
    for (const img of galleryImages) {
      expect(img.loaded).toBe(true);
    }
    
    // Check if we have blob images
    const blobImages = imageData.filter(img => img.isBlob);
    console.log(`\nTotal blob images: ${blobImages.length}`);
    expect(blobImages.length).toBeGreaterThan(0);
  });
  
  test('all case study pages should load properly', async ({ page }) => {
    const caseStudySlugs = [
      'greystone-village-retirement',
      'embrun-ford-dealership',
      'candc-welding-completion'
    ];
    
    for (const slug of caseStudySlugs) {
      console.log(`\nTesting case study: ${slug}`);
      
      await page.goto(`/case-studies/${slug}`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);
      
      // Check hero image
      const heroImage = page.locator('img').first();
      const heroSrc = await heroImage.getAttribute('src');
      const heroLoaded = await heroImage.evaluate((el) => {
        const img = el as HTMLImageElement;
        return img.complete && (img.naturalHeight > 0 || img.src.endsWith('.svg'));
      });
      
      console.log(`  Hero: ${heroLoaded ? '✅' : '❌'} ${heroSrc?.substring(0, 60)}...`);
      expect(heroLoaded).toBe(true);
    }
  });
});