import { useEffect, useState, type FormEvent } from 'react';

import {
  DEFAULT_SEARCH_REGION,
  SEARCH_REGIONS,
  type SearchRegion,
} from '../../constants/regions.ts';
import { TEXT } from '../../constants/text.ts';
import { Label } from '../label/label.tsx';
import * as styles from './search-form.module.css';

type SearchFormProps = {
  disabled?: boolean;
  region: SearchRegion;
  resetKey: number;
  onRegionChange: (region: SearchRegion) => void;
  onSubmit: (query: string, region: string, steam?: string) => void;
};

export function SearchForm({
  disabled = false,
  region,
  resetKey,
  onRegionChange,
  onSubmit,
}: SearchFormProps) {
  const [query, setQuery] = useState('');
  const [steam, setSteam] = useState('');

  useEffect(() => {
    setQuery('');
    onRegionChange(DEFAULT_SEARCH_REGION);
  }, [onRegionChange, resetKey]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextQuery = query.trim();
    if (!nextQuery || disabled) {
      return;
    }

    onSubmit(nextQuery, region, steam.trim() ?? undefined);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Label header={TEXT.game}>
        <input
          className={styles.input}
          type="text"
          name="q"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
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
          {SEARCH_REGIONS.map((code) => (
            <option key={code} value={code}>
              {code.toUpperCase()}
            </option>
          ))}
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
