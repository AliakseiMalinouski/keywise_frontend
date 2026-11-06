import { useEffect, useState, type FormEvent } from 'react';

import {
  DEFAULT_SEARCH_REGION,
  TEXT,
  type SearchRegion,
} from '&constants';
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

    onQueryChange('');
    setSteam('');
    onRegionChange(DEFAULT_SEARCH_REGION);
  }, [onQueryChange, onRegionChange, resetKey]);

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
        />
      </Label>

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

      <button className={styles.submit} type="submit" disabled={disabled}>
        {TEXT.search}
      </button>
    </form>
  );
}
