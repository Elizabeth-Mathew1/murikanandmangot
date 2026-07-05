/** Strip .md extension from Astro content entry ids */
export function contentSlug(id: string): string {
  return id.replace(/\.md$/, '');
}
