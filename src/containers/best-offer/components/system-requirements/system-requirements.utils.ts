import type { GameRequirements } from '&network';
import { TEXT } from '&constants';

import { prepareRequirementHtml } from './system-requirement-html.utils.ts';
import { PLATFORMS } from './system-requirements.const.ts';

export type RequirementBlock = {
  key: string;
  platformLabel: string;
  minimum: string | null;
  recommended: string | null;
};

export function toBlocks(requirements: GameRequirements): RequirementBlock[] {
  return PLATFORMS.flatMap(({ key, labelKey, field }) => {
    const platform = requirements[field];
    if (!platform) {
      return [];
    }

    const minimum = prepareRequirementHtml(platform.minimum);
    const recommended = prepareRequirementHtml(platform.recommended);
    if (!minimum && !recommended) {
      return [];
    }

    return [
      {
        key,
        platformLabel: TEXT[labelKey],
        minimum,
        recommended,
      },
    ];
  });
}
