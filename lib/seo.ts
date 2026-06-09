// Trim meta descriptions to SERP-safe length at a word boundary.
export function truncateDescription(text: string, maxLength = 158): string {
  if (text.length <= maxLength) return text
  const cut = text.slice(0, maxLength)
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`
}
