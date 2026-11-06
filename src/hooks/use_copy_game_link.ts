import { useEffect, useState } from "react";

import type { SearchRegion } from "&constants";

const COPIED_RESET_MS = 2000;

function shareUrl(title: string, region: SearchRegion): string {
  const params = new URLSearchParams({ game: title, region });
  return `${window.location.origin}/?${params.toString()}`;
}

export function useCopyGameLink(region: SearchRegion) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) {
      return;
    }

    const timeoutId = window.setTimeout(() => setCopied(false), COPIED_RESET_MS);
    return () => window.clearTimeout(timeoutId);
  }, [copied]);

  async function copyGameLink(title: string) {
    const gameTitle = title.trim();
    if (!gameTitle) {
      return;
    }

    try {
      await navigator.clipboard.writeText(shareUrl(gameTitle, region));
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return {
    copied,
    copyGameLink,
  };
}
