import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { translate } from 'react-polyglot';
import {
  Icon,
  Dropdown,
  DropdownItem,
  DropdownButton,
  colorsRaw,
  buttons,
  colors,
} from 'decap-cms-ui-default';

import { stripProtocol } from '../../lib/urlHelper';

const styles = {
  avatarImage: css`
    width: 32px;
    border-radius: 50%;
  `,
};

const AvatarDropdownButton = styled(DropdownButton)`
  ${buttons.button}
  ${buttons.widget}
  ${buttons.medium}
  display: flex;
  cursor: pointer;
  color: ${colorsRaw.gray};
  background-color: transparent;
  align-items: center;
  height: 32px;
  width: 32px;
  padding: 0;
  border-radius: 50%;
`;

const AvatarImage = styled.img`
  ${styles.avatarImage};
`;

const AvatarPlaceholderIcon = styled(Icon)`
  ${styles.avatarImage};
  color: inherit;
  background-color: ${colors.foreground};
`;

const AppHeaderSiteLink = styled.a`
  font-size: 14px;
  color: #7b8290;
  padding: 10px 16px;
`;

const AppHeaderTestRepoIndicator = styled.a`
  font-size: 14px;
  font-weight: 500;
  color: #7b8290;
  padding: 10px 16px;
`;

function Avatar({ imageUrl }) {
  return imageUrl ? (
    <AvatarImage src={imageUrl} />
  ) : (
    <AvatarPlaceholderIcon type="user" size="large" />
  );
}

Avatar.propTypes = {
  imageUrl: PropTypes.string,
};

function SettingsDropdown({ displayUrl, isTestRepo, imageUrl, onLogoutClick, t }) {
  return (
    <React.Fragment>
      {isTestRepo && (
        <AppHeaderTestRepoIndicator
          href="https://www.decapcms.org/docs/test-backend"
          target="_blank"
          rel="noopener noreferrer"
        >
          Test Backend ↗
        </AppHeaderTestRepoIndicator>
      )}
      {displayUrl ? (
        <AppHeaderSiteLink href={displayUrl} target="_blank">
          {stripProtocol(displayUrl)}
        </AppHeaderSiteLink>
      ) : null}
      <Dropdown
        dropdownTopOverlap="36px"
        dropdownWidth="160px"
        dropdownPosition="right"
        renderButton={() => (
          <AvatarDropdownButton>
            <Avatar imageUrl={imageUrl} />
          </AvatarDropdownButton>
        )}
      >
        <DropdownItem label={t('ui.settingsDropdown.logOut')} onClick={onLogoutClick} />
        <DropdownItem
          label="Test Backend ↗"
          href="https://www.decapcms.org/docs/test-backend"
          target="_blank"
          rel="noopener noreferrer"
        />
      </Dropdown>
    </React.Fragment>
  );
}

SettingsDropdown.propTypes = {
  displayUrl: PropTypes.string,
  isTestRepo: PropTypes.bool,
  imageUrl: PropTypes.string,
  onLogoutClick: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default translate()(SettingsDropdown);
