import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Icon, lengths, zIndex, transitions } from 'decap-cms-ui-default';

const SearchContainer = styled.div`
  height: 36px;
  display: flex;
  align-items: center;
  position: relative;

  @media (max-width: 480px) {
    grid-column: 1/-1;
  }
`;

const SearchInput = styled.input`
  background-color: transparent;
  border-radius: ${lengths.borderRadius};
  font-size: 14px;
  padding: 10px 6px 10px 36px;
  width: 100%;
  position: relative;
  z-index: ${zIndex.zIndex1};
  transition: ${transitions.main};

  &:focus {
    outline: none;
    box-shadow: inset 0 0 0 2px var(--accent);
  }
`;

const SearchIcon = styled(Icon)`
  position: absolute;
  top: 50%;
  left: 8px;
  z-index: ${zIndex.zIndex2};
  transform: translate(0, -50%);
`;

function MediaLibrarySearch({ value, onChange, onKeyDown, placeholder, disabled }) {
  return (
    <SearchContainer>
      <SearchIcon type="search" size="small" />
      <SearchInput
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        disabled={disabled}
      />
    </SearchContainer>
  );
}

MediaLibrarySearch.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

export default MediaLibrarySearch;
