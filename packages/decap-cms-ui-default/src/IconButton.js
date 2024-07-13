import React from 'react';
import styled from '@emotion/styled';

import Icon from './Icon';
import { buttons, colorsRaw } from './styles';

const sizes = {
  small: '28px',
  large: '40px',
};

const ButtonRound = styled.button`
  ${buttons.button};
  ${buttons.widget};
  background-color: ${colorsRaw.white};
  color: ${props => [props.isActive ? `var(--accent)` : `inherit`]};
  border-radius: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${props => sizes[props.size]};
  height: ${props => sizes[props.size]};
  padding: 0;

  &:hover {
    color: ${props => props.isActive && 'var(--accent)'};
    box-shadow: ${props =>
      props.isActive && '0 0 0 1px var(--accent), 0 1px 2px 0 var(--accent-light)'};
  }
  &:active {
    color: ${props => props.isActive && 'var(--accent)'};
    box-shadow: ${props =>
      props.isActive && '0 0 0 1px var(--accent), 0 1px 2px 0 var(--accent-light)'};
  }
`;

function IconButton({ size, isActive, type, onClick, className, title }) {
  return (
    <ButtonRound
      size={size}
      isActive={isActive}
      className={className}
      onClick={onClick}
      title={title}
    >
      <Icon type={type} size={size} />
    </ButtonRound>
  );
}

export default IconButton;
