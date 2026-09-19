import { useEffect, useState, type FormEvent } from 'react';

import {
  DEFAULT_SEARCH_REGION,
  SEARCH_REGIONS,
  type SearchRegion,
} from '../../constants/regions.ts';
import { TEXT } from '../../constants/text.ts';
import * as styles from './search-form.module.css';

type SearchFormProps = {
  disabled?: boolean;
  resetKey: number;
  onSubmit: (query: string, region: string) => void;
};

export function SearchForm({ disabled = false, resetKey, onSubmit }: SearchFormProps) {
  const [query, setQuery] = useState('');
  const [region, setRegion] = useState(DEFAULT_SEARCH_REGION);

  useEffect(() => {
    setQuery('');
    setRegion(DEFAULT_SEARCH_REGION);
  }, [resetKey]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextQuery = query.trim();
    if (!nextQuery || disabled) {
      return;
    }

    onSubmit(nextQuery, region);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.field}>
        <span className={styles.label}>{TEXT.game}</span>
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
      </label>

      <label className={styles.field}>
        <span className={styles.label}>{TEXT.region}</span>
        <select
          className={styles.input}
          name="region"
          value={region}
          onChange={(event) => setRegion(event.target.value as SearchRegion)}
          disabled={disabled}
        >
          {SEARCH_REGIONS.map((code) => (
            <option key={code} value={code}>
              {code.toUpperCase()}
            </option>
          ))}
        </select>
      </label>

      <button className={styles.submit} type="submit" disabled={disabled}>
        {TEXT.search}
      </button>
    </form>
  );
}
