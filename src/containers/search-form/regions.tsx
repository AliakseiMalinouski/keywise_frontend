import { SEARCH_REGIONS } from '&constants';

export function Regions () {
    return (
      <>
        {SEARCH_REGIONS.map((code) => (
          <option key={code} value={code}>
            {code.toUpperCase()}
          </option>
        ))}
      </>
    )
}
