const ALLOWED_TAGS = new Set([
  'STRONG',
  'B',
  'BR',
  'UL',
  'OL',
  'LI',
  'P',
  'SPAN',
]);

export function prepareRequirementHtml(
  html: string | undefined,
): string | null {
  if (!html?.trim()) {
    return null;
  }

  const sanitized = sanitizeSteamRequirementHtml(html);
  if (!hasMeaningfulRequirementText(sanitized)) {
    return null;
  }

  return sanitized;
}

function hasMeaningfulRequirementText(html: string): boolean {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const listItems = doc.querySelectorAll('li');

  if (listItems.length > 0) {
    return Array.from(listItems).some((item) => (item.textContent ?? '').trim());
  }

  const text = (doc.body.textContent ?? '').replace(/\s+/g, ' ').trim();
  const stripped = text.replace(/^(Minimum|Recommended)\s*:?\s*/gi, '').trim();

  return stripped.length > 0;
}

function sanitizeSteamRequirementHtml(html: string): string {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const container = document.createElement('div');

  for (const child of doc.body.childNodes) {
    const sanitized = sanitizeNode(child);
    if (sanitized) {
      container.append(sanitized);
    }
  }

  return container.innerHTML;
}

function sanitizeNode(node: Node): Node | null {
  if (node.nodeType === Node.TEXT_NODE) {
    return document.createTextNode(node.textContent ?? '');
  }

  if (node.nodeType !== Node.ELEMENT_NODE) {
    return null;
  }

  const element = node as HTMLElement;
  const tag = element.tagName;

  if (!ALLOWED_TAGS.has(tag)) {
    const fragment = document.createDocumentFragment();
    for (const child of element.childNodes) {
      const sanitized = sanitizeNode(child);
      if (sanitized) {
        fragment.append(sanitized);
      }
    }
    return fragment.childNodes.length > 0 ? fragment : null;
  }

  const clone = document.createElement(tag.toLowerCase());
  if (tag === 'UL' && element.classList.contains('bb_ul')) {
    clone.className = 'bb_ul';
  }

  for (const child of element.childNodes) {
    const sanitized = sanitizeNode(child);
    if (!sanitized) {
      continue;
    }

    if (sanitized instanceof DocumentFragment) {
      clone.append(...sanitized.childNodes);
      continue;
    }

    clone.append(sanitized);
  }

  return clone;
}
