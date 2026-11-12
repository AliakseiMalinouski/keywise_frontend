import { memo, useMemo } from 'react';

import { TEXT } from '&constants';
import { filterGameTitles } from '../../game-suggestions.utils.ts';
import * as styles from './game-suggestions-list.module.css';

type GameSuggestionsListProps = {
  query: string;
  onSelect: (title: string) => void;
};

export const GameSuggestionsList = memo(function GameSuggestionsList({
  query,
  onSelect,
}: GameSuggestionsListProps) {
  const titles = useMemo(() => filterGameTitles(query), [query]);

  return (
    <ul className={styles.list} role="listbox" aria-label="Popular games">
      {titles.length === 0 ? (
        <li className={styles.empty} role="presentation">
          {TEXT.gameSuggestionsEmpty}
        </li>
      ) : (
        titles.map((title) => (
          <li
            key={title}
            className={styles.item}
            role="option"
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => onSelect(title)}
          >
            {title}
          </li>
        ))
      )}
    </ul>
  );
});
