import { test, expect } from '@playwright/test';

test.describe('Direct Image Loading Test', () => {
  test('test loading blob images directly', async ({ page, request }) => {
    const imageUrls = [
      'https://5v8oej1w91asigpe.public.blob.vercel-storage.com/Projects/greystone-village-retirement/hero-sSBvFi6ICl8IE1VPHtdBE3b3N9tfDV.jpeg',
      'https://5v8oej1w91asigpe.public.blob.vercel-storage.com/Projects/embrun-ford-dealership/hero-IQTuZSm2caSd0YHXP4NnxcozZYXvto.jpeg',
    ];
    
    // First test direct HTTP requests
    console.log('\n=== Testing Direct HTTP Requests ===\n');
    for (const url of imageUrls) {
      const response = await request.get(url);
      console.log(`URL: ${url.substring(0, 100)}...`);
      console.log(`  Status: ${response.status()}`);
      console.log(`  Headers:`, response.headers());
      console.log('---');
    }
    
    // Now test in browser context
    console.log('\n=== Testing in Browser Context ===\n');
    
    // Create a simple HTML page with these images
    await page.setContent(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Image Test</title>
      </head>
      <body>
        <h1>Testing Blob Images</h1>
        ${imageUrls.map((url, i) => `
          <div>
            <h2>Image ${i + 1}</h2>
            <img 
              id="img-${i}" 
              src="${url}" 
              alt="Test Image ${i}"
              style="max-width: 500px;"
              onload="console.log('Image ${i} loaded')"
              onerror="console.log('Image ${i} failed', event)"
            />
          </div>
        `).join('')}
      </body>
      </html>
    `);
    
    // Wait for images to load
    await page.waitForTimeout(5000);
    
    // Check each image
    for (let i = 0; i < imageUrls.length; i++) {
      const img = page.locator(`#img-${i}`);
      const status = await img.evaluate((el) => {
        const img = el as HTMLImageElement;
        return {
          complete: img.complete,
          naturalWidth: img.naturalWidth,
          naturalHeight: img.naturalHeight,
          src: img.src,
          currentSrc: img.currentSrc,
        };
      });
      
      console.log(`Image ${i}:`, status);
    }
    
    // Check console logs
    const logs = [];
    page.on('console', msg => logs.push(msg.text()));
    
    await page.waitForTimeout(2000);
    console.log('\nConsole logs:', logs);
  });
});