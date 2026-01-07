// Template loader - fetches main.typ and supporting template files from public folder
// AI agents should modify public/template/main.typ directly, not this file

/**
 * Fallback content if template loading fails.
 */
export const FALLBACK_CONTENT = `#set page(paper: "a4", margin: 2cm)
#set text(size: 11pt)

= Document

Start typing your Typst content here.
`;

/**
 * Fetches the template content from the public folder.
 * This allows hot-reloading when the template file changes.
 */
export async function fetchTemplateContent(): Promise<string> {
  try {
    const response = await fetch('/template/main.typ');
    if (!response.ok) {
      console.warn('Failed to fetch template:', response.status);
      return FALLBACK_CONTENT;
    }
    return await response.text();
  } catch (error) {
    console.warn('Error fetching template:', error);
    return FALLBACK_CONTENT;
  }
}

/**
 * Result of fetching template resources
 */
export interface TemplateResources {
  /** Text-based .typ files (path -> content) */
  files: Map<string, string>;
  /** Binary asset files like images (path -> Uint8Array) */
  assets: Map<string, Uint8Array>;
}

/**
 * Fetches all supporting template files and assets:
 * - .typ files (except main.typ) for #import
 * - Image files from assets/ for #image
 * @returns TemplateResources with files and assets maps
 */
export async function fetchTemplateFiles(): Promise<TemplateResources> {
  const result: TemplateResources = {
    files: new Map(),
    assets: new Map(),
  };

  try {
    // Get list of template files and assets from API
    const listResponse = await fetch('/api/templates');
    if (!listResponse.ok) {
      console.warn('Failed to fetch template list:', listResponse.status);
      return result;
    }

    const { files: templateFiles, assets: assetFiles } =
      (await listResponse.json()) as {
        files: string[];
        assets: string[];
      };

    // Fetch .typ files in parallel
    const filePromises = templateFiles.map(async (filename) => {
      try {
        const response = await fetch(`/template/${filename}`);
        if (response.ok) {
          const content = await response.text();
          // Register with absolute path in virtual filesystem
          result.files.set(`/${filename}`, content);
        }
      } catch (error) {
        console.warn(`Failed to load template file: ${filename}`, error);
      }
    });

    // Fetch binary assets in parallel
    const assetPromises = (assetFiles || []).map(async (assetPath) => {
      try {
        const response = await fetch(`/template/${assetPath}`);
        if (response.ok) {
          const buffer = await response.arrayBuffer();
          // Register with absolute path in virtual filesystem
          result.assets.set(`/${assetPath}`, new Uint8Array(buffer));
        }
      } catch (error) {
        console.warn(`Failed to load asset file: ${assetPath}`, error);
      }
    });

    await Promise.all([...filePromises, ...assetPromises]);
  } catch (error) {
    console.warn('Error fetching template files:', error);
  }

  return result;
}
