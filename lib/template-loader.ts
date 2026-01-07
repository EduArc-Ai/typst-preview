// Template loader - fetches main.typ from public folder at runtime
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
