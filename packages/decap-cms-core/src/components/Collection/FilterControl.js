import React from 'react';
import { translate } from 'react-polyglot';
import { css } from '@emotion/react';
import { Dropdown, DropdownCheckedItem } from 'decap-cms-ui-default';

import { ControlButton } from './ControlButton';

function FilterControl({ viewFilters, t, onFilterClick, filter }) {
  const hasActiveFilter = filter
    ?.valueSeq()
    .toJS()
    .some(f => f.active === true);

  return (
    <Dropdown
      renderButton={() => {
        return (
          <ControlButton active={hasActiveFilter} title={t('collection.collectionTop.filterBy')} />
        );
      }}
      closeOnSelection={false}
      dropdownTopOverlap="30px"
      dropdownPosition="left"
      css={css`
        white-space: nowrap;
      `}
    >
      {viewFilters.map(viewFilter => {
        return (
          <DropdownCheckedItem
            key={viewFilter.id}
            label={viewFilter.label}
            id={viewFilter.id}
            checked={filter.getIn([viewFilter.id, 'active'], false)}
            onClick={() => onFilterClick(viewFilter)}
          />
        );
      })}
    </Dropdown>
  );
}

export default translate()(FilterControl);
