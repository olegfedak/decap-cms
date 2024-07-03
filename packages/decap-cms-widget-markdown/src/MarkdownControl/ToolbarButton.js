import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Icon, buttons } from 'decap-cms-ui-default';

const StyledToolbarButton = styled.button`
  ${buttons.button};
  display: inline-block;
  padding: 6px;
  border: none;
  background-color: ${props => (props.isActive ? 'var(--accent-light)' : 'transparent')};
  font-size: 16px;
  color: ${props => (props.isActive ? 'var(--accent)' : 'inherit')};
  cursor: pointer;
  margin: 0 2px 2px 0;

  &:focus {
    outline-offset: none;
  }

  &:disabled {
    cursor: auto;
    opacity: 0.5;
  }

  ${Icon} {
    display: block;
  }
`;

function ToolbarButton({ type, label, icon, onClick, isActive, disabled }) {
  return (
    <StyledToolbarButton
      isActive={isActive}
      onClick={e => onClick && onClick(e, type)}
      title={label}
      disabled={disabled}
    >
      {icon ? <Icon type={icon} /> : label}
    </StyledToolbarButton>
  );
}

ToolbarButton.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string.isRequired,
  icon: PropTypes.string,
  onClick: PropTypes.func,
  isActive: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default ToolbarButton;
