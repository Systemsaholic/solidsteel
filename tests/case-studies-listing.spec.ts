import { test, expect } from '@playwright/test';

test('case studies listing page loads blob images', async ({ page }) => {
  await page.goto('/case-studies', { waitUntil: 'networkidle' });
  
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
  
  // Verify all case study images loaded
  const caseStudyImages = imageData.filter(img => 
    img.alt?.includes('Project') || img.alt?.includes('Retirement') || img.alt?.includes('Ford')
  );
  
  console.log(`\nTotal case study images: ${caseStudyImages.length}`);
  console.log(`Blob images: ${imageData.filter(img => img.isBlob).length}`);
  
  // All images should be loaded
  for (const img of caseStudyImages) {
    expect(img.loaded).toBe(true);
  }
  
  // Should have blob images
  const blobImages = imageData.filter(img => img.isBlob);
  expect(blobImages.length).toBeGreaterThan(0);
});