import PropTypes from 'prop-types';
import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import dayjs from 'dayjs';
import { translate } from 'react-polyglot';
import { colors, lengths } from 'decap-cms-ui-default';

import { status } from '../../constants/publishModes';
import { DragSource, DropTarget, HTML5DragDrop } from '../UI';
import WorkflowCard from './WorkflowCard';
import { selectEntryCollectionTitle } from '../../reducers/collections';

const WorkflowListContainer = styled.div`
  height: calc(100vh - 80px);
  width: auto;
  display: flex;
  gap: 16px;
  margin: 0 -22px;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;

  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  & .inner-container {
    display: flex;
    gap: 16px;
    padding: 0 var(--space-l);
    flex: 1;

    & > div {
      scroll-snap-align: center;

      @media (max-width: 460px) {
        min-width: 80vw;
      }

      @media (min-width: 461px) and (max-width: 640px) {
        min-width: 70vw;
      }

      @media (min-width: 641px) and (max-width: 780px) {
        min-width: 60vw;
      }

      @media (min-width: 781px) and (max-width: 900px) {
        min-width: 50vw;
      }

      @media (min-width: 901px) and (max-width: 1000px) {
        min-width: 40vw;
      }

      @media (min-width: 1001px) {
        width: 33.33%;
      }
    }
  }
`;

const WorkflowListContainerOpenAuthoring = styled.div`
  min-height: 60%;
  display: grid;
  grid-template-columns: 50% 50% 0%;
`;

const styles = {
  columnPosition: idx =>
    (idx === 0 &&
      css`
        margin-left: 0;
      `) ||
    (idx === 2 &&
      css`
        margin-right: 0;
      `) ||
    css`
      &:before,
      &:after {
        content: '';
        display: block;
        position: absolute;
        width: 2px;
        height: 100%;
        top: 58px;
        background-color: ${colors.textFieldBorder};
      }

      &:before {
        left: -12px;
      }

      &:after {
        right: -12px;
      }
    `,
  column: css`
    transition: background-color 0.5s ease;
    border: 2px dashed transparent;
    border-radius: 4px;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;

    & > div {
      position: sticky;
      top: 0;
      overflow-y: scroll;
      height: 100%;
    }
  `,
  columnHovered: css`
    border-color: var(--accent);
  `,
  hiddenColumn: css`
    display: none;
  `,
  hiddenRightBorder: css`
    &:not(:first-child):not(:last-child) {
      &:after {
        display: none;
      }
    }
  `,
};

const ColumnHeader = styled.h2`
  font-size: 20px;
  font-weight: normal;
  padding: 4px 20px;
  border-radius: ${lengths.borderRadius};
  position: sticky;
  top: 0;
  flex: content;

  ${props =>
    props.name === 'draft' &&
    css`
      background: none;
    `}

  ${props =>
    props.name === 'pending_review' &&
    css`
      background: none;
    `}

  ${props =>
    props.name === 'pending_publish' &&
    css`
      background: none;
    `}
`;

const ColumnName = styled.div`
  display: inline-block;
`;

const ColumnCount = styled.div`
  display: inline-block;
  margin-inline-start: 16px;
  font-size: 17px;
  color: ${colors.text};
`;

// This is a namespace so that we can only drop these elements on a DropTarget with the same
const DNDNamespace = 'cms-workflow';

function getColumnHeaderText(columnName, t) {
  switch (columnName) {
    case 'draft':
      return t('workflow.workflowList.draftHeader');
    case 'pending_review':
      return t('workflow.workflowList.inReviewHeader');
    case 'pending_publish':
      return t('workflow.workflowList.readyHeader');
  }
}

class WorkflowList extends React.Component {
  static propTypes = {
    entries: ImmutablePropTypes.orderedMap,
    handleChangeStatus: PropTypes.func.isRequired,
    handlePublish: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
    isOpenAuthoring: PropTypes.bool,
    collections: ImmutablePropTypes.map.isRequired,
  };

  handleChangeStatus = (newStatus, dragProps) => {
    const slug = dragProps.slug;
    const collection = dragProps.collection;
    const oldStatus = dragProps.ownStatus;
    this.props.handleChangeStatus(collection, slug, oldStatus, newStatus);
  };

  requestDelete = (collection, slug, ownStatus) => {
    if (window.confirm(this.props.t('workflow.workflowList.onDeleteEntry'))) {
      this.props.handleDelete(collection, slug, ownStatus);
    }
  };

  requestPublish = (collection, slug, ownStatus) => {
    if (ownStatus !== status.last()) {
      window.alert(this.props.t('workflow.workflowList.onPublishingNotReadyEntry'));
      return;
    } else if (!window.confirm(this.props.t('workflow.workflowList.onPublishEntry'))) {
      return;
    }
    this.props.handlePublish(collection, slug);
  };

  // eslint-disable-next-line react/display-name
  renderColumns = (entries, column) => {
    const { isOpenAuthoring, collections, t } = this.props;
    if (!entries) return null;

    if (!column) {
      return entries.entrySeq().map(([currColumn, currEntries], idx) => (
        <DropTarget
          namespace={DNDNamespace}
          key={currColumn}
          onDrop={this.handleChangeStatus.bind(this, currColumn)}
        >
          {(connect, { isHovered }) =>
            connect(
              <div style={{ minHeight: '100%' }}>
                <div
                  css={[
                    styles.column,
                    styles.columnPosition(idx),
                    isHovered && styles.columnHovered,
                    isOpenAuthoring && currColumn === 'pending_publish' && styles.hiddenColumn,
                    isOpenAuthoring && currColumn === 'pending_review' && styles.hiddenRightBorder,
                  ]}
                >
                  <ColumnHeader name={currColumn}>
                    <ColumnName>{getColumnHeaderText(currColumn, this.props.t)}</ColumnName>
                    <ColumnCount>
                      {this.props.t('workflow.workflowList.currentEntries', {
                        smart_count: currEntries.size,
                      })}
                    </ColumnCount>
                  </ColumnHeader>

                  {this.renderColumns(currEntries, currColumn)}
                </div>
              </div>,
            )
          }
        </DropTarget>
      ));
    }
    return (
      <div>
        {entries.map(entry => {
          const timestamp = dayjs(entry.get('updatedOn')).format(t('workflow.workflow.dateFormat'));
          const slug = entry.get('slug');
          const collectionName = entry.get('collection');
          const editLink = `collections/${collectionName}/entries/${slug}?ref=workflow`;
          const ownStatus = entry.get('status');
          const collection = collections.find(
            collection => collection.get('name') === collectionName,
          );
          const collectionLabel = collection?.get('label');
          const isModification = entry.get('isModification');

          const allowPublish = collection?.get('publish');
          const canPublish = ownStatus === status.last() && !entry.get('isPersisting', false);
          const postAuthor = entry.get('author');

          return (
            <DragSource
              namespace={DNDNamespace}
              key={`${collectionName}-${slug}`}
              slug={slug}
              collection={collectionName}
              ownStatus={ownStatus}
            >
              {connect =>
                connect(
                  <div>
                    <WorkflowCard
                      collectionLabel={collectionLabel || collectionName}
                      title={selectEntryCollectionTitle(collection, entry)}
                      authorLastChange={entry.getIn(['metaData', 'user'])}
                      body={entry.getIn(['data', 'body'])}
                      isModification={isModification}
                      editLink={editLink}
                      timestamp={timestamp}
                      onDelete={this.requestDelete.bind(this, collectionName, slug, ownStatus)}
                      allowPublish={allowPublish}
                      canPublish={canPublish}
                      onPublish={this.requestPublish.bind(this, collectionName, slug, ownStatus)}
                      postAuthor={postAuthor}
                    />
                  </div>,
                )
              }
            </DragSource>
          );
        })}
      </div>
    );
  };

  render() {
    const columns = this.renderColumns(this.props.entries);
    const ListContainer = this.props.isOpenAuthoring
      ? WorkflowListContainerOpenAuthoring
      : WorkflowListContainer;
    return (
      <ListContainer>
        <div className="inner-container">{columns}</div>
      </ListContainer>
    );
  }
}

export default HTML5DragDrop(translate()(WorkflowList));
