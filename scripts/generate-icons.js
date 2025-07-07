#!/usr/bin/env node

/**
 * PWA Icon Generator
 * Generates multiple icon sizes from SVG source for Progressive Web App
 * @author NuwaX
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Required icon sizes for PWA compatibility
 * Includes standard sizes for Android, iOS, and various browsers
 */
const ICON_SIZES = [
  { size: 16, name: 'nuwault_icon_16x16.png' },
  { size: 32, name: 'nuwault_icon_32x32.png' },
  { size: 48, name: 'nuwault_icon_48x48.png' },
  { size: 72, name: 'nuwault_icon_72x72.png' },
  { size: 96, name: 'nuwault_icon_96x96.png' },
  { size: 128, name: 'nuwault_icon_128x128.png' },
  { size: 144, name: 'nuwault_icon_144x144.png' },
  { size: 152, name: 'nuwault_icon_152x152.png' },
  { size: 180, name: 'nuwault_icon_180x180.png' }, // iOS Apple Touch Icon
  { size: 192, name: 'nuwault_icon_192x192.png' },
  { size: 384, name: 'nuwault_icon_384x384.png' },
  { size: 512, name: 'nuwault_icon_512x512.png' }
];

const SOURCE_SVG = path.join(__dirname, '../public/assets/img/logo/nuwault_logo_symbol.svg');
const OUTPUT_DIR = path.join(__dirname, '../public/assets/img/icons');

/**
 * Main icon generation function
 * Processes SVG source and generates PNG icons in multiple sizes
 */
async function generateIcons() {
  try {
    if (!fs.existsSync(SOURCE_SVG)) {
      console.error('[Icon Generator] ❌ Source SVG not found:', SOURCE_SVG);
      process.exit(1);
    }

    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    console.log('[Icon Generator] 🚀 Generating PWA icons...');
    console.log(`[Icon Generator] 📁 Source: ${SOURCE_SVG}`);
    console.log(`[Icon Generator] 📁 Output: ${OUTPUT_DIR}`);

    for (const { size, name } of ICON_SIZES) {
      const outputPath = path.join(OUTPUT_DIR, name);
      
      try {
        await sharp(SOURCE_SVG)
          .resize(size, size, {
            fit: 'contain',
            background: { r: 46, g: 187, b: 168, alpha: 1 } // Brand teal color (#2ebba8)
          })
          .png()
          .toFile(outputPath);
        
        console.log(`[Icon Generator] ✅ Generated: ${name} (${size}x${size})`);
      } catch (error) {
        console.error(`[Icon Generator] ❌ Failed to generate ${name}:`, error.message);
      }
    }

    console.log('[Icon Generator] 🎉 Icon generation completed!');
    
  } catch (error) {
    console.error('[Icon Generator] ❌ Icon generation failed:', error);
    process.exit(1);
  }
}

generateIcons(); 