import { test } from '@playwright/test';

test.describe('Debug Network Requests', () => {
  test('monitor image loading on homepage', async ({ page }) => {
    const failedRequests: string[] = [];
    
    // Monitor network requests
    page.on('response', response => {
      const url = response.url();
      const status = response.status();
      
      // Check for image requests
      if (url.match(/\.(png|jpg|jpeg|gif|svg|webp)$/i) || url.includes('blob.vercel-storage')) {
        console.log(`[${status}] ${url}`);
        
        if (status >= 400) {
          failedRequests.push(`[${status}] ${url}`);
        }
      }
    });
    
    page.on('requestfailed', request => {
      const url = request.url();
      if (url.match(/\.(png|jpg|jpeg|gif|svg|webp)$/i) || url.includes('blob.vercel-storage')) {
        console.log(`[FAILED] ${url} - ${request.failure()?.errorText}`);
        failedRequests.push(`[FAILED] ${url}`);
      }
    });
    
    // Navigate to homepage
    await page.goto('/', { waitUntil: 'networkidle' });
    
    // Wait for dynamic content
    await page.waitForTimeout(3000);
    
    // Log results
    console.log('\n=== Failed Requests ===');
    failedRequests.forEach(req => console.log(req));
    
    // Check actual img elements
    const images = await page.locator('img').all();
    console.log(`\n=== Found ${images.length} img elements ===`);
    
    for (const img of images) {
      const src = await img.getAttribute('src');
      const alt = await img.getAttribute('alt');
      const loaded = await img.evaluate((el) => {
        const img = el as HTMLImageElement;
        return img.complete && img.naturalWidth > 0;
      });
      
      if (!loaded) {
        console.log(`NOT LOADED: ${alt} - ${src}`);
      }
    }
  });
});