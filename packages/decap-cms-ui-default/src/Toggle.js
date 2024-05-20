import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { colors, colorsRaw, transitions } from './styles';

const ToggleContainer = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 34px;
  height: 20px;
  cursor: pointer;
  border: none;
  padding: 0;
  margin: 0;
  background: transparent;
  vertical-align: sub;
`;

const ToggleHandle = styled.span`
  box-shadow: 0 2px 1px 0 rgba(68, 74, 87, 0.1), 0 0 1px 0 rgba(68, 74, 87, 0.3);
  position: absolute;
  left: 2px;
  width: 17px;
  height: 17px;
  border-radius: 50%;
  background-color: ${colorsRaw.white};
  transition: transform ${transitions.main};

  ${props =>
    props.isActive &&
    css`
      transform: translateX(13px);
    `};
`;

const ToggleBackground = styled.span`
  width: 34px;
  height: 20px;
  border-radius: 10px;
  background-color: ${colors.active};
`;

function Toggle({
  id,
  active,
  onChange,
  onFocus,
  onBlur,
  className,
  Container = ToggleContainer,
  Background = ToggleBackground,
  Handle = ToggleHandle,
}) {
  const [isActive, setIsActive] = useState(active);

  function handleToggle() {
    setIsActive(prevIsActive => !prevIsActive);
    if (onChange) {
      onChange(!isActive);
    }
  }

  return (
    <Container
      id={id}
      onFocus={onFocus}
      onBlur={onBlur}
      className={className}
      onClick={handleToggle}
      role="switch"
      aria-checked={isActive?.toString()}
      aria-expanded={null}
    >
      <Background isActive={isActive} />
      <Handle isActive={isActive} />
    </Container>
  );
}

Toggle.propTypes = {
  id: PropTypes.string,
  active: PropTypes.bool,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  className: PropTypes.string,
  Container: PropTypes.func,
  Background: PropTypes.func,
  Handle: PropTypes.func,
};

const StyledToggle = styled(Toggle)``;

export { StyledToggle as default, ToggleContainer, ToggleBackground, ToggleHandle };
