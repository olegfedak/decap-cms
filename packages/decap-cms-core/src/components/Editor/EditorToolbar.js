import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { translate } from 'react-polyglot';
import { Link } from 'react-router-dom';
import {
  Icon,
  Dropdown,
  DropdownItem,
  StyledDropdownButton,
  colorsRaw,
  colors,
  components,
  buttons,
  zIndex,
} from 'decap-cms-ui-default';

import { status } from '../../constants/publishModes';
import { SettingsDropdown } from '../UI';

const styles = {
  noOverflow: css`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  `,
  buttonMargin: css`
    margin: 0;
  `,
  toolbarSection: css`
    height: 100%;
    display: flex;
    align-items: center;
    border: 0 solid ${colors.textFieldBorder};
    gap: 12px;
  `,
  publishedButton: css`
    background-color: var(--accent-light);
    color: var(--accent);
  `,
};

const TooltipText = styled.div`
  visibility: hidden;
  width: 321px;
  background-color: #555;
  color: #fff;
  text-align: unset;
  border-radius: 6px;
  padding: 5px;

  /* Position the tooltip text */
  position: absolute;
  z-index: 1;
  top: 145%;
  left: 50%;
  margin-left: -320px;

  /* Fade in tooltip */
  opacity: 0;
  transition: opacity 0.3s;
`;

const Tooltip = styled.div`
  position: relative;
  display: inline-block;
  &:hover + ${TooltipText} {
    visibility: visible;
    opacity: 0.9;
  }
`;

const TooltipContainer = styled.div`
  position: relative;
`;

const DropdownButton = styled(StyledDropdownButton)`
  ${styles.noOverflow}
`;

const ToolbarContainer = styled.div`
  z-index: ${zIndex.zIndex300};
  background-color: ${colorsRaw.white};
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding-right: var(--space-l);
  flex: 1;
  margin: 0 auto;
  height: 100%;
  white-space: nowrap;

  @media (max-width: 600px) {
    padding-right: var(--space-m);
  }
`;

const ToolbarSectionMain = styled.div`
  ${styles.toolbarSection};
  flex: 10;
  display: flex;
  gap: 10;
  justify-content: space-between;
  padding: 0 var(--space-m);
`;

const ToolbarSubSectionFirst = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  flex: none;

  [class*='StyledWrapper'] {
    position: initial;
  }

  [class*='DropdownList'] {
    position: fixed;
  }
`;

const ToolbarSubSectionLast = styled(ToolbarSubSectionFirst)`
  justify-content: flex-end;
  width: max-content;
`;

const ToolbarSectionBackLink = styled(Link)`
  ${styles.toolbarSection};
  font-weight: normal;
  padding: 0 var(--space-l);
  flex: none;
  gap: 0;
  max-width: 70vw;

  &:hover,
  &:focus {
    background-color: #f1f2f4;
  }

  @media (min-width: 600px) {
    min-width: 200px;
  }

  @media (max-width: 600px) {
    padding: 0 var(--space-m);
  }
`;

const ToolbarSectionMeta = styled.div`
  ${styles.toolbarSection};

  [class*='StyledWrapper'] {
    position: initial;
  }

  [class*='DropdownList'] {
    top: 50px;
    position: fixed;

    @media (max-width: 600px) {
      right: 0;
    }
  }
`;

const ToolbarDropdown = styled(Dropdown)`
  ${styles.buttonMargin};
  position: initial;

  ${Icon} {
    color: var(--accent);
  }

  @media (max-width: 600px) {
    right: 0;
  }
`;

const BackArrow = styled.div`
  color: ${colors.text};
  font-size: 21px;
  font-weight: 600;

  @media (min-width: 600px) {
    margin-right: 16px;
  }
`;

const BackCollection = styled.div`
  font-size: 15px;
  font-weight: 500;

  @media (max-width: 600px) {
    display: none !important;
  }
`;

const BackStatus = styled.div`
  margin-top: 6px;
  display: none !important;
`;

const BackStatusUnchanged = styled(BackStatus)`
  ${components.textBadgeSuccess};
`;

const BackStatusChanged = styled(BackStatus)`
  ${components.textBadgeDanger};
`;

const ToolbarButton = styled.button`
  ${buttons.button};
  ${buttons.default};
  ${styles.buttonMargin};
  ${styles.noOverflow};
  display: block;
`;

const DeleteButton = styled(ToolbarButton)`
  ${buttons.grayText};

  &:hover {
    ${buttons.lightRed};
  }
`;

const SaveButton = styled(ToolbarButton)`
  ${buttons.accent};
  &[disabled] {
    ${buttons.disabled};
  }

  @media (max-width: 600px) {
    &[disabled] {
      display: none;
    }
  }
`;

const PublishedToolbarButton = styled(DropdownButton)`
  ${buttons.lightAccent}
`;

const PublishedButton = styled(ToolbarButton)`
  ${styles.publishedButton}
`;

const PublishButton = styled(DropdownButton)`
  ${buttons.accent};
`;

const StatusButton = styled(DropdownButton)`
  ${buttons.lightAccent};
`;

const PreviewButtonContainer = styled.div`
  margin-right: 12px;
  color: var(--accent);
  display: flex;
  align-items: center;

  a,
  ${Icon} {
    color: var(--accent);
  }

  ${Icon} {
    position: relative;
    top: 1px;
  }
`;

const RefreshPreviewButton = styled.button`
  background: none;
  border: 0;
  cursor: pointer;
  color: var(--accent);

  span {
    margin-right: 6px;
  }
`;

const PreviewLink = RefreshPreviewButton.withComponent('a');

const PublishDropDownItem = styled(DropdownItem)`
  min-width: initial;
  white-space: normal;
`;

const StatusDropdownItem = styled(DropdownItem)`
  ${Icon} {
    color: ${colors.infoText};
  }
`;

export class EditorToolbar extends React.Component {
  static propTypes = {
    isPersisting: PropTypes.bool,
    isPublishing: PropTypes.bool,
    isUpdatingStatus: PropTypes.bool,
    isDeleting: PropTypes.bool,
    onPersist: PropTypes.func.isRequired,
    onPersistAndNew: PropTypes.func.isRequired,
    onPersistAndDuplicate: PropTypes.func.isRequired,
    showDelete: PropTypes.bool.isRequired,
    onDelete: PropTypes.func.isRequired,
    onDeleteUnpublishedChanges: PropTypes.func.isRequired,
    onChangeStatus: PropTypes.func.isRequired,
    onPublish: PropTypes.func.isRequired,
    unPublish: PropTypes.func.isRequired,
    onDuplicate: PropTypes.func.isRequired,
    onPublishAndNew: PropTypes.func.isRequired,
    onPublishAndDuplicate: PropTypes.func.isRequired,
    user: PropTypes.object,
    hasChanged: PropTypes.bool,
    displayUrl: PropTypes.string,
    collection: ImmutablePropTypes.map.isRequired,
    hasWorkflow: PropTypes.bool,
    useOpenAuthoring: PropTypes.bool,
    hasUnpublishedChanges: PropTypes.bool,
    isNewEntry: PropTypes.bool,
    isModification: PropTypes.bool,
    currentStatus: PropTypes.string,
    onLogoutClick: PropTypes.func.isRequired,
    deployPreview: PropTypes.object,
    loadDeployPreview: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
    editorBackLink: PropTypes.string.isRequired,
  };

  componentDidMount() {
    const { isNewEntry, loadDeployPreview } = this.props;
    if (!isNewEntry) {
      loadDeployPreview({ maxAttempts: 3 });
    }
  }

  componentDidUpdate(prevProps) {
    const { isNewEntry, isPersisting, loadDeployPreview } = this.props;
    if (!isNewEntry && prevProps.isPersisting && !isPersisting) {
      loadDeployPreview({ maxAttempts: 3 });
    }
  }

  renderSimpleControls = () => {
    const { collection, hasChanged, isNewEntry, showDelete, onDelete, t } = this.props;
    const canCreate = collection.get('create');

    return (
      <>
        {!isNewEntry && !hasChanged
          ? this.renderExistingEntrySimplePublishControls({ canCreate })
          : this.renderNewEntrySimplePublishControls({ canCreate })}
        <div>
          {showDelete ? (
            <DeleteButton onClick={onDelete}>{t('editor.editorToolbar.deleteEntry')}</DeleteButton>
          ) : null}
        </div>
      </>
    );
  };

  renderDeployPreviewControls = label => {
    const { deployPreview = {}, loadDeployPreview, t } = this.props;
    const { url, status, isFetching } = deployPreview;

    if (!status) {
      return;
    }

    const deployPreviewReady = status === 'SUCCESS' && !isFetching;
    return (
      <PreviewButtonContainer>
        {deployPreviewReady ? (
          <PreviewLink rel="noopener noreferrer" target="_blank" href={url}>
            <span>{label}</span>
            <Icon type="new-tab" size="xsmall" />
          </PreviewLink>
        ) : (
          <RefreshPreviewButton onClick={loadDeployPreview}>
            <span>{t('editor.editorToolbar.deployPreviewPendingButtonLabel')}</span>
            <Icon type="refresh" size="xsmall" />
          </RefreshPreviewButton>
        )}
      </PreviewButtonContainer>
    );
  };

  renderStatusInfoTooltip = () => {
    const { t, currentStatus } = this.props;

    const statusToLocaleKey = {
      [status.get('DRAFT')]: 'statusInfoTooltipDraft',
      [status.get('PENDING_REVIEW')]: 'statusInfoTooltipInReview',
    };

    const statusKey = Object.keys(statusToLocaleKey).find(key => key === currentStatus);
    return (
      <TooltipContainer>
        <Tooltip>
          <Icon type="info-circle" size="small" className="tooltip" />
        </Tooltip>
        {statusKey && (
          <TooltipText>{t(`editor.editorToolbar.${statusToLocaleKey[statusKey]}`)}</TooltipText>
        )}
      </TooltipContainer>
    );
  };

  renderWorkflowStatusControls = () => {
    const { isUpdatingStatus, onChangeStatus, currentStatus, t, useOpenAuthoring } = this.props;

    const statusToTranslation = {
      [status.get('DRAFT')]: t('editor.editorToolbar.draft'),
      [status.get('PENDING_REVIEW')]: t('editor.editorToolbar.inReview'),
      [status.get('PENDING_PUBLISH')]: t('editor.editorToolbar.ready'),
    };

    const buttonText = isUpdatingStatus
      ? t('editor.editorToolbar.updating')
      : t('editor.editorToolbar.status', { status: statusToTranslation[currentStatus] });

    return (
      <>
        <ToolbarDropdown
          dropdownTopOverlap="50px"
          dropdownWidth="120px"
          dropdownPosition="none"
          renderButton={() => <StatusButton>{buttonText}</StatusButton>}
        >
          <StatusDropdownItem
            label={t('editor.editorToolbar.draft')}
            onClick={() => onChangeStatus('DRAFT')}
            icon={currentStatus === status.get('DRAFT') ? 'check' : null}
          />
          <StatusDropdownItem
            label={t('editor.editorToolbar.inReview')}
            onClick={() => onChangeStatus('PENDING_REVIEW')}
            icon={currentStatus === status.get('PENDING_REVIEW') ? 'check' : null}
          />
          {useOpenAuthoring ? (
            ''
          ) : (
            <StatusDropdownItem
              label={t('editor.editorToolbar.ready')}
              onClick={() => onChangeStatus('PENDING_PUBLISH')}
              icon={currentStatus === status.get('PENDING_PUBLISH') ? 'check' : null}
            />
          )}
        </ToolbarDropdown>
        {useOpenAuthoring && this.renderStatusInfoTooltip()}
      </>
    );
  };

  renderNewEntryWorkflowPublishControls = ({ canCreate, canPublish }) => {
    const { isPublishing, onPublish, onPublishAndNew, onPublishAndDuplicate, t } = this.props;

    return canPublish ? (
      <ToolbarDropdown
        dropdownTopOverlap="50px"
        dropdownWidth="200px"
        dropdownPosition="none"
        renderButton={() => (
          <PublishButton>
            {isPublishing
              ? t('editor.editorToolbar.publishing')
              : t('editor.editorToolbar.publish')}
          </PublishButton>
        )}
      >
        <PublishDropDownItem
          label={t('editor.editorToolbar.publishNow')}
          icon="arrow"
          iconDirection="right"
          onClick={onPublish}
        />
        {canCreate ? (
          <>
            <PublishDropDownItem
              label={t('editor.editorToolbar.publishAndCreateNew')}
              icon="add"
              onClick={onPublishAndNew}
            />
            <PublishDropDownItem
              label={t('editor.editorToolbar.publishAndDuplicate')}
              icon="add"
              onClick={onPublishAndDuplicate}
            />
          </>
        ) : null}
      </ToolbarDropdown>
    ) : (
      ''
    );
  };

  renderExistingEntryWorkflowPublishControls = ({ canCreate, canPublish, canDelete }) => {
    const { unPublish, onDuplicate, isPersisting, t } = this.props;

    return canPublish || canCreate ? (
      <ToolbarDropdown
        dropdownTopOverlap="50px"
        dropdownWidth="150px"
        dropdownPosition="none"
        key="td-publish-create"
        renderButton={() => (
          <PublishedToolbarButton>
            {isPersisting
              ? t('editor.editorToolbar.unpublishing')
              : t('editor.editorToolbar.published')}
          </PublishedToolbarButton>
        )}
      >
        {canDelete && canPublish && (
          <DropdownItem
            label={t('editor.editorToolbar.unpublish')}
            icon="arrow"
            iconDirection="right"
            onClick={unPublish}
          />
        )}
        {canCreate && (
          <DropdownItem
            label={t('editor.editorToolbar.duplicate')}
            icon="add"
            onClick={onDuplicate}
          />
        )}
      </ToolbarDropdown>
    ) : (
      ''
    );
  };

  renderExistingEntrySimplePublishControls = ({ canCreate }) => {
    const { onDuplicate, t } = this.props;
    return canCreate ? (
      <ToolbarDropdown
        dropdownTopOverlap="50px"
        dropdownWidth="150px"
        dropdownPosition="none"
        renderButton={() => (
          <PublishedToolbarButton>{t('editor.editorToolbar.published')}</PublishedToolbarButton>
        )}
      >
        {
          <DropdownItem
            label={t('editor.editorToolbar.duplicate')}
            icon="add"
            onClick={onDuplicate}
          />
        }
      </ToolbarDropdown>
    ) : (
      <PublishedButton>{t('editor.editorToolbar.published')}</PublishedButton>
    );
  };

  renderNewEntrySimplePublishControls = ({ canCreate }) => {
    const { onPersist, onPersistAndNew, onPersistAndDuplicate, isPersisting, t } = this.props;

    return (
      <div>
        <ToolbarDropdown
          dropdownTopOverlap="50px"
          dropdownWidth="150px"
          dropdownPosition="none"
          renderButton={() => (
            <PublishButton>
              {isPersisting
                ? t('editor.editorToolbar.publishing')
                : t('editor.editorToolbar.publish')}
            </PublishButton>
          )}
        >
          <DropdownItem
            label={t('editor.editorToolbar.publishNow')}
            icon="arrow"
            iconDirection="right"
            onClick={onPersist}
          />
          {canCreate ? (
            <>
              <DropdownItem
                label={t('editor.editorToolbar.publishAndCreateNew')}
                icon="add"
                onClick={onPersistAndNew}
              />
              <DropdownItem
                label={t('editor.editorToolbar.publishAndDuplicate')}
                icon="add"
                onClick={onPersistAndDuplicate}
              />
            </>
          ) : null}
        </ToolbarDropdown>
      </div>
    );
  };

  renderSimpleDeployPreviewControls = () => {
    const { hasChanged, isNewEntry, t } = this.props;

    if (!isNewEntry && !hasChanged) {
      return this.renderDeployPreviewControls(t('editor.editorToolbar.deployButtonLabel'));
    }
  };

  renderWorkflowControls = () => {
    const {
      onPersist,
      onDelete,
      onDeleteUnpublishedChanges,
      showDelete,
      hasChanged,
      hasUnpublishedChanges,
      useOpenAuthoring,
      isPersisting,
      isDeleting,
      isNewEntry,
      isModification,
      currentStatus,
      collection,
      t,
    } = this.props;

    const canCreate = collection.get('create');
    const canPublish = collection.get('publish') && !useOpenAuthoring;
    const canDelete = collection.get('delete', true);

    const deleteLabel =
      (hasUnpublishedChanges &&
        isModification &&
        t('editor.editorToolbar.deleteUnpublishedChanges')) ||
      (hasUnpublishedChanges &&
        (isNewEntry || !isModification) &&
        t('editor.editorToolbar.deleteUnpublishedEntry')) ||
      (!hasUnpublishedChanges && !isModification && t('editor.editorToolbar.deletePublishedEntry'));

    return [
      <SaveButton
        disabled={!hasChanged}
        key="save-button"
        onClick={() => hasChanged && onPersist()}
      >
        {isPersisting ? t('editor.editorToolbar.saving') : t('editor.editorToolbar.save')}
      </SaveButton>,
      currentStatus
        ? [
          this.renderWorkflowStatusControls(),
          !hasChanged && this.renderNewEntryWorkflowPublishControls({ canCreate, canPublish }),
        ]
        : !isNewEntry &&
        this.renderExistingEntryWorkflowPublishControls({ canCreate, canPublish, canDelete }),
      (!showDelete || useOpenAuthoring) && !hasUnpublishedChanges && !isModification ? null : (
        <DeleteButton
          key="delete-button"
          onClick={hasUnpublishedChanges ? onDeleteUnpublishedChanges : onDelete}
        >
          {isDeleting ? t('editor.editorToolbar.deleting') : deleteLabel}
        </DeleteButton>
      ),
    ];
  };

  renderWorkflowDeployPreviewControls = () => {
    const { currentStatus, isNewEntry, t } = this.props;

    if (currentStatus) {
      return this.renderDeployPreviewControls(t('editor.editorToolbar.deployPreviewButtonLabel'));
    }

    /**
     * Publish control for published workflow entry.
     */
    if (!isNewEntry) {
      return this.renderDeployPreviewControls(t('editor.editorToolbar.deployButtonLabel'));
    }
  };

  render() {
    const {
      user,
      hasChanged,
      displayUrl,
      collection,
      hasWorkflow,
      onLogoutClick,
      t,
      editorBackLink,
    } = this.props;

    return (
      <ToolbarContainer>
        <ToolbarSectionBackLink to={editorBackLink}>
          <BackArrow>←</BackArrow>
          <div>
            <BackCollection>
              {t('editor.editorToolbar.backCollection', {
                collectionLabel: collection.get('label'),
              })}
            </BackCollection>
            {hasChanged ? (
              <BackStatusChanged>{t('editor.editorToolbar.unsavedChanges')}</BackStatusChanged>
            ) : (
              <BackStatusUnchanged>{t('editor.editorToolbar.changesSaved')}</BackStatusUnchanged>
            )}
          </div>
        </ToolbarSectionBackLink>
        <ToolbarSectionMain>
          <ToolbarSubSectionFirst>
            {hasWorkflow ? this.renderWorkflowControls() : this.renderSimpleControls()}
          </ToolbarSubSectionFirst>
          <ToolbarSubSectionLast>
            {hasWorkflow
              ? this.renderWorkflowDeployPreviewControls()
              : this.renderSimpleDeployPreviewControls()}
          </ToolbarSubSectionLast>
        </ToolbarSectionMain>
        <ToolbarSectionMeta>
          <SettingsDropdown
            displayUrl={displayUrl}
            imageUrl={user?.avatar_url}
            onLogoutClick={onLogoutClick}
          />
        </ToolbarSectionMeta>
      </ToolbarContainer>
    );
  }
}

export default translate()(EditorToolbar);
