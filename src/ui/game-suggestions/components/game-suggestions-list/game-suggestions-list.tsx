import { memo } from 'react';

import { POPULAR_GAME_TITLES } from '../../game-suggestions.const.ts';
import * as styles from './game-suggestions-list.module.css';

type GameSuggestionsListProps = {
  onSelect: (title: string) => void;
};

export const GameSuggestionsList = memo(function GameSuggestionsList({
  onSelect,
}: GameSuggestionsListProps) {
  return (
    <ul className={styles.list} role="listbox" aria-label="Popular games">
      {POPULAR_GAME_TITLES.map((title) => (
        <li
          key={title}
          className={styles.item}
          role="option"
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => onSelect(title)}
        >
          {title}
        </li>
      ))}
    </ul>
  );
});
