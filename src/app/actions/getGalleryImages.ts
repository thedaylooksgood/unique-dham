"use server";

import fs from "fs";
import path from "path";

/**
 * Server action to dynamically read all images from the public/gallery folder.
 */
export async function getGalleryImages() {
  try {
    const galleryPath = path.join(process.cwd(), "public", "gallery");
    
    // Check if directory exists
    if (!fs.existsSync(galleryPath)) {
      return [];
    }

    const files = fs.readdirSync(galleryPath);
    
    // Filter for image files
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
    );

    return imageFiles;
  } catch (error) {
    console.error("Error reading gallery images:", error);
    return [];
  }
}
