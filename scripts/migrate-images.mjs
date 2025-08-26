import { put } from "@vercel/blob";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Mapping of local images to blob folder structure
const IMAGE_MAPPINGS = {
  // Project images
  "/modern-retirement-community.png": "projects/greystone-village/hero.png",
  "/retirement-community-common-area.png": "projects/greystone-village/gallery-1.png",
  "/retirement-community-dining-hall.png": "projects/greystone-village/gallery-2.png",
  "/retirement-community-gardens.png": "projects/greystone-village/gallery-3.png",
  
  "/ford-dealership.png": "projects/embrun-ford/hero.png",
  "/ford-dealership-lounge.png": "projects/embrun-ford/gallery-1.png",
  "/ford-showroom-interior.png": "projects/embrun-ford/gallery-2.png",
  "/automotive-service-bays.png": "projects/embrun-ford/gallery-3.png",
  
  "/industrial-hq-equipment.png": "projects/pro-xcavation/hero.png",
  "/industrial-welding-facility.png": "projects/pro-xcavation/gallery-1.png",
  "/industrial-welding-interior.png": "projects/pro-xcavation/gallery-2.png",
  "/logistics-office.png": "projects/pro-xcavation/gallery-3.png",
  
  "/transportation-logistics-facility.png": "projects/marc-forget/hero.png",
  "/fleet-maintenance-bay.png": "projects/marc-forget/gallery-1.png",
  "/loading-dock-systems.png": "projects/marc-forget/gallery-2.png",
  
  "/placeholder-x4kg9.png": "projects/candc-welding/hero.png",
  "/abandoned-construction.png": "projects/candc-welding/gallery-1.png",
  "/construction-medical-inspection.png": "projects/candc-welding/gallery-2.png",
  "/medical-center-construction-issues.png": "projects/candc-welding/gallery-3.png",
  
  "/placeholder-6a4ci.png": "projects/nordixx-automotive/hero.png",
  "/placeholder-n4fw5.png": "projects/medical-center/hero.png",
  "/modern-medical-office.png": "projects/medical-center/gallery-1.png",
  "/medical-center-reception.png": "projects/medical-center/gallery-2.png",
  
  "/construction-site-overview.png": "projects/corporate-renovation/hero.png",
  "/corporate-office-interior.png": "projects/corporate-renovation/gallery-1.png",
  
  "/abandoned-construction-site.png": "projects/takeover-project/hero.png",
  "/construction-project-gallery.png": "projects/takeover-project/gallery-1.png",
  
  // About page images
  "/construction-team-steel.png": "about/team-construction.png",
  "/construction-team-plans.png": "about/team-planning.png",
  
  // Team images
  "/images/team-1.png": "team/member-1.png",
  "/images/team-2.png": "team/member-2.png",
  "/images/team-3.png": "team/member-3.png",
  "/images/team-4.png": "team/member-4.png",
  
  // Gallery images
  "/images/projects/cold-storage.png": "gallery/cold-storage.png",
  "/images/projects/fleet-1.png": "gallery/fleet-1.png",
  "/images/projects/fleet-2.png": "gallery/fleet-2.png",
  "/images/projects/fleet-3.png": "gallery/fleet-3.png",
  "/images/projects/fleet-maintenance.png": "gallery/fleet-maintenance.png",
  "/images/projects/food-processing.png": "gallery/food-processing.png",
  "/images/projects/logistics-center.png": "gallery/logistics-center.png",
  "/images/projects/logistics-center-1.png": "gallery/logistics-center-1.png",
  "/images/projects/logistics-center-2.png": "gallery/logistics-center-2.png",
  "/images/projects/logistics-center-3.png": "gallery/logistics-center-3.png",
  "/images/projects/manufacturing-plant.png": "gallery/manufacturing-plant.png",
  "/images/projects/vehicle-showroom.png": "gallery/vehicle-showroom.png",
};

// Keep track of uploaded URLs for updating data files
const uploadedImages = {};

async function uploadImage(localPath, blobPath) {
  try {
    const fullPath = path.join(path.dirname(__dirname), "public", localPath);
    const fileBuffer = await fs.readFile(fullPath);
    
    const blob = await put(blobPath, fileBuffer, {
      access: "public",
      addRandomSuffix: false,
    });
    
    console.log(`✅ Uploaded ${localPath} -> ${blob.url}`);
    uploadedImages[localPath] = blob.url;
    
    return blob.url;
  } catch (error) {
    console.error(`❌ Failed to upload ${localPath}:`, error);
    throw error;
  }
}

async function migrateImages() {
  console.log("🚀 Starting image migration to Vercel Blob...\n");
  
  // Check if BLOB_READ_WRITE_TOKEN is set
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error("❌ BLOB_READ_WRITE_TOKEN is not set in environment variables");
    console.error("Please add it to your .env.local file:");
    console.error("BLOB_READ_WRITE_TOKEN=vercel_blob_your_token_here\n");
    process.exit(1);
  }
  
  let successCount = 0;
  let failureCount = 0;
  
  for (const [localPath, blobPath] of Object.entries(IMAGE_MAPPINGS)) {
    try {
      await uploadImage(localPath, blobPath);
      successCount++;
    } catch (error) {
      failureCount++;
    }
  }
  
  console.log(`\n✅ Migration completed!`);
  console.log(`Successfully uploaded: ${successCount} images`);
  console.log(`Failed: ${failureCount} images`);
  
  // Save the mapping to a JSON file for updating data files
  const mappingFile = path.join(path.dirname(__dirname), "image-url-mapping.json");
  await fs.writeFile(mappingFile, JSON.stringify(uploadedImages, null, 2));
  console.log(`\n📄 Image URL mapping saved to: ${mappingFile}`);
  console.log("Use this file to update your data files with the new Blob URLs");
}

// Run the migration
migrateImages().catch(console.error);