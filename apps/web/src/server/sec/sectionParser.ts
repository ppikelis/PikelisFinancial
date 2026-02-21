export interface FilingSection {
  sectionName: string;
  text: string;
}

const sectionRegex = /Item\s+(\d+[A]?)[\.\:\-]?\s+([A-Za-z][^\n]{0,120})/gi;

export function extractSections(text: string): FilingSection[] {
  const sections: FilingSection[] = [];
  const matches = Array.from(text.matchAll(sectionRegex));

  for (let i = 0; i < matches.length; i += 1) {
    const match = matches[i];
    const start = match.index ?? 0;
    const end = matches[i + 1]?.index ?? text.length;
    const sectionName = `Item ${match[1]} ${match[2]}`.trim();
    const sectionText = text.slice(start, end).trim();

    if (sectionText.length < 200) {
      continue;
    }

    sections.push({
      sectionName,
      text: sectionText.slice(0, 20000)
    });
  }

  return sections.slice(0, 20);
}
