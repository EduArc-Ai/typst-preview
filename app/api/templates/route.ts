import { NextResponse } from 'next/server';
import { readdir } from 'fs/promises';
import { join } from 'path';

// Supported image extensions
const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp'];

/**
 * GET /api/templates
 * Returns a list of all .typ files in public/template/ (excluding main.typ)
 * and all image files in public/template/assets/
 */
export async function GET() {
  try {
    const templateDir = join(process.cwd(), 'public', 'template');
    const files = await readdir(templateDir);

    // Filter for .typ files, excluding main.typ
    const templateFiles = files.filter(
      (file) => file.endsWith('.typ') && file !== 'main.typ'
    );

    // List image files in assets directory
    const assetFiles: string[] = [];
    try {
      const assetsDir = join(templateDir, 'assets');
      const assets = await readdir(assetsDir);
      for (const asset of assets) {
        const ext = asset.toLowerCase().slice(asset.lastIndexOf('.'));
        if (IMAGE_EXTENSIONS.includes(ext)) {
          assetFiles.push(`assets/${asset}`);
        }
      }
    } catch {
      // assets directory may not exist
    }

    return NextResponse.json({ files: templateFiles, assets: assetFiles });
  } catch (error) {
    console.error('Failed to list template files:', error);
    return NextResponse.json({ files: [], assets: [] });
  }
}
