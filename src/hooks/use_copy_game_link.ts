import { useEffect, useState } from "react";

const COPIED_RESET_MS = 2000;

function shareUrl(title: string): string {
  const params = new URLSearchParams({ game: title });
  return `${window.location.origin}/?${params.toString()}`;
}

export function useCopyGameLink() {
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
      await navigator.clipboard.writeText(shareUrl(gameTitle));
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
