import { useCallback, useState, type FocusEvent, type ReactNode } from 'react';

import { GameSuggestionsList } from './components/game-suggestions-list';
import * as styles from './game-suggestions.module.css';

type GameSuggestionsProps = {
  children: ReactNode;
  onSelect: (title: string) => void;
};

export function GameSuggestions({ children, onSelect }: GameSuggestionsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleTriggerClick = () => {
    setIsOpen(true);
  };

  const handleSelect = useCallback(
    (title: string) => {
      onSelect(title);
      setIsOpen(false);
    },
    [onSelect],
  );

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    const nextTarget = event.relatedTarget;
    if (nextTarget instanceof Node && event.currentTarget.contains(nextTarget)) {
      return;
    }

    setIsOpen(false);
  };

  return (
    <div className={styles.root} onBlur={handleBlur}>
      <div className={styles.trigger} onClick={handleTriggerClick}>
        {children}
      </div>
      {isOpen && <GameSuggestionsList onSelect={handleSelect} />}
    </div>
  );
}
