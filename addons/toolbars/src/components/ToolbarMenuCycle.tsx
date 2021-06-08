import React, { useCallback } from 'react';
import { useGlobals } from '@storybook/api';
import { ToolbarMenuButton } from './ToolbarMenuButton';
import { withCycle } from '../hoc/withCycle';
import { getSelectedIcon } from '../utils/get-selected-icon';

/* eslint-disable import/order */
import type { FC } from 'react';
import type { WithCycleProps } from '../hoc/withCycle';
import type { ToolbarMenuProps } from '../types';

type ToolbarMenuCycleProps = ToolbarMenuProps & WithCycleProps;

export const ToolbarMenuCycle: FC<ToolbarMenuCycleProps> = withCycle(
  ({ id, name, description, cycleValues = [], toolbar: { title: _title, items, showName } }) => {
    const [globals, updateGlobals] = useGlobals();

    const currentValue = globals[id];
    const hasGlobalValue = !!currentValue;
    const icon = getSelectedIcon({ currentValue, items });

    let title = _title;

    // Deprecation support for old "name of global arg used as title"
    if (showName && !title) {
      title = name;
    }

    const setNext = useCallback(() => {
      const currentIndex = cycleValues.indexOf(currentValue);
      const currentIsLast = currentIndex === cycleValues.length - 1;

      const newCurrentIndex = currentIsLast ? 0 : currentIndex + 1;
      const newCurrent = cycleValues[newCurrentIndex];

      updateGlobals({ [id]: newCurrent });
    }, [currentValue, updateGlobals]);

    return (
      <ToolbarMenuButton
        active={hasGlobalValue}
        description={description}
        onClick={setNext}
        icon={icon}
        title={title}
      />
    );
  }
);
