import { useEffect, useState } from "react";

import { TEXT } from "&constants";

const MESSAGE_INTERVAL_MS = 2000;
const messages = TEXT.searchLoadingMessages;

export function useSearchLoadingMessage(active: boolean) {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    if (!active) {
      setMessageIndex(0);
      return;
    }

    if (messages.length <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setMessageIndex((current) => (current + 1) % messages.length);
    }, MESSAGE_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [active]);

  const message = messages[messageIndex] ?? TEXT.loading;

  return {
    message,
    messageKey: messageIndex,
  };
}
