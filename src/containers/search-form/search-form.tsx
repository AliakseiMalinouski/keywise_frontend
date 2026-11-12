import { useEffect, useState, type FormEvent } from 'react';

import {
  TEXT,
  type SearchRegion,
} from '&constants';
import { GameSuggestions } from '&ui/game-suggestions';
import { Label } from '&ui/label';
import * as styles from './search-form.module.css';
import { Regions } from './regions.tsx';

type SearchFormProps = {
  disabled?: boolean;
  query: string;
  region: SearchRegion;
  resetKey: number;
  onQueryChange: (query: string) => void;
  onRegionChange: (region: SearchRegion) => void;
  onSubmit: (query: string, region: string, steam?: string) => void;
};

export function SearchForm({
  disabled = false,
  query,
  region,
  resetKey,
  onQueryChange,
  onRegionChange,
  onSubmit,
}: SearchFormProps) {
  const [steam, setSteam] = useState('');

  useEffect(() => {
    if (resetKey === 0) {
      return;
    }

    setSteam('');
  }, [resetKey]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextQuery = query.trim();
    if (!nextQuery || disabled) {
      return;
    }

    onSubmit(nextQuery, region, steam.trim());
  }

  return (
    <form
      className={styles.form}
      role="search"
      aria-label={TEXT.title}
      onSubmit={handleSubmit}
    >
      <div className={styles.gameField}>
        <GameSuggestions query={query} onSelect={onQueryChange}>
          <Label header={TEXT.game}>
            <input
              className={styles.input}
              type="text"
              name="q"
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              placeholder={TEXT.gamePlaceholder}
              autoComplete="off"
              required
              disabled={disabled}
              aria-describedby="game-search-hint"
            />
          </Label>
        </GameSuggestions>
      </div>

      <p id="game-search-hint" className={styles.gameHint}>
        {TEXT.gameSearchHint}
      </p>

      <div className={styles.regionField}>
        <Label header={TEXT.region}>
          <select
            className={styles.input}
            name="region"
            value={region}
            onChange={(event) => onRegionChange(event.target.value as SearchRegion)}
            disabled={disabled}
          >
            <Regions />
          </select>
        </Label>
      </div>

      <div className={styles.steamField}>
        <Label header={TEXT.steam}>
          <input
            className={styles.input}
            type="text"
            name="steam"
            value={steam}
            onChange={(event) => setSteam(event.target.value)}
            placeholder={TEXT.steamPlaceholder}
            autoComplete="off"
            disabled={disabled}
          />
        </Label>
      </div>

      <button className={styles.submit} type="submit" disabled={disabled}>
        {TEXT.search}
      </button>
    </form>
  );
}
