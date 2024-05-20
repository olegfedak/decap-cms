import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Icon, shadows, colors, buttons } from 'decap-cms-ui-default';

const CloseButton = styled.button`
  ${buttons.button};
  ${shadows.dropMiddle};
  position: absolute;
  margin-right: -40px;
  left: -38px;
  top: -38px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  color: inherit;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LibraryTitle = styled.h1`
  font-size: 22px;
  text-align: left;
  color: ${props => props.isPrivate && colors.textFieldBorder};
  margin-bottom: 0;
`;

function MediaLibraryHeader({ onClose, title, isPrivate }) {
  return (
    <div>
      <CloseButton onClick={onClose}>
        <Icon type="close" />
      </CloseButton>
      <LibraryTitle isPrivate={isPrivate}>{title}</LibraryTitle>
    </div>
  );
}

MediaLibraryHeader.propTypes = {
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  isPrivate: PropTypes.bool,
};

export default MediaLibraryHeader;
