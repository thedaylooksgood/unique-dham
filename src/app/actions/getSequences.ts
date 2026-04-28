"use server";

import fs from "fs";
import path from "path";

export async function getSequences(partName: string) {
  try {
    const dirPath = path.join(process.cwd(), "public", "sequence", partName);
    
    if (!fs.existsSync(dirPath)) {
      // Return empty array if folder doesn't exist yet, avoiding crashes
      return [];
    }

    const files = fs.readdirSync(dirPath);
    
    // Filter out non-image files if any
    const images = files.filter(file => 
      file.toLowerCase().endsWith('.jpg') || 
      file.toLowerCase().endsWith('.jpeg') || 
      file.toLowerCase().endsWith('.png') || 
      file.toLowerCase().endsWith('.webp')
    );

    // Sort files to ensure 1.jpg comes before 2.jpg
    images.sort((a, b) => {
      const numA = parseInt(a.replace(/\D/g, '')) || 0;
      const numB = parseInt(b.replace(/\D/g, '')) || 0;
      return numA - numB;
    });

    return images.map(file => `/sequence/${partName}/${file}`);
  } catch (error) {
    console.error(`Error reading sequence directory ${partName}:`, error);
    return [];
  }
}
