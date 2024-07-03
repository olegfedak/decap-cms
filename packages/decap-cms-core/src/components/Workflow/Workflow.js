import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from '@emotion/styled';
import { OrderedMap } from 'immutable';
import { translate } from 'react-polyglot';
import { connect } from 'react-redux';
import {
  Dropdown,
  DropdownItem,
  StyledDropdownButton,
  Loader,
  components,
  buttons,
} from 'decap-cms-ui-default';

import { createNewEntry } from '../../actions/collections';
import {
  loadUnpublishedEntries,
  updateUnpublishedEntryStatus,
  publishUnpublishedEntry,
  deleteUnpublishedEntry,
} from '../../actions/editorialWorkflow';
import { selectUnpublishedEntriesByStatus } from '../../reducers';
import { EDITORIAL_WORKFLOW, status } from '../../constants/publishModes';
import WorkflowList from './WorkflowList';

const WorkflowContainer = styled.div`
  width: 100%;
  max-width: 1440px;
  padding: var(--space-l) var(--space-l) 0;
  overflow-y: hidden;
  overflow-x: hidden;

  @media (max-width: 600px) {
    padding: var(--space-m) var(--space-m) 0;
  }
`;

const WorkflowTop = styled.div`
  ${components.cardTop};
`;

const WorkflowTopRow = styled.div`
  display: flex;
  gap: 20px;
  justify-content: space-between;
`;

const WorkflowTopHeading = styled.h1`
  ${components.cardTopHeading};
`;

const WorkflowTopDescription = styled.p`
  ${components.cardTopDescription};
`;

const WorkflowNewEntryButton = styled(StyledDropdownButton)`
  ${buttons.accent};
`;

class Workflow extends Component {
  static propTypes = {
    collections: ImmutablePropTypes.map.isRequired,
    isEditorialWorkflow: PropTypes.bool.isRequired,
    isOpenAuthoring: PropTypes.bool,
    isFetching: PropTypes.bool,
    unpublishedEntries: ImmutablePropTypes.map,
    loadUnpublishedEntries: PropTypes.func.isRequired,
    updateUnpublishedEntryStatus: PropTypes.func.isRequired,
    publishUnpublishedEntry: PropTypes.func.isRequired,
    deleteUnpublishedEntry: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { loadUnpublishedEntries, isEditorialWorkflow, collections } = this.props;
    if (isEditorialWorkflow) {
      loadUnpublishedEntries(collections);
    }
  }

  render() {
    const {
      isEditorialWorkflow,
      isOpenAuthoring,
      isFetching,
      unpublishedEntries,
      updateUnpublishedEntryStatus,
      publishUnpublishedEntry,
      deleteUnpublishedEntry,
      collections,
      t,
    } = this.props;

    if (!isEditorialWorkflow) return null;
    if (isFetching) return <Loader active>{t('workflow.workflow.loading')}</Loader>;
    const reviewCount = unpublishedEntries.get('pending_review').size;
    const readyCount = unpublishedEntries.get('pending_publish').size;

    return (
      <WorkflowContainer>
        <WorkflowTop>
          <WorkflowTopRow>
            <WorkflowTopHeading>{t('workflow.workflow.workflowHeading')}</WorkflowTopHeading>
            <Dropdown
              dropdownWidth="160px"
              dropdownPosition="left"
              dropdownTopOverlap="40px"
              renderButton={() => (
                <WorkflowNewEntryButton>{t('workflow.workflow.newPost')}</WorkflowNewEntryButton>
              )}
            >
              {collections
                .filter(collection => collection.get('create'))
                .toList()
                .map(collection => (
                  <DropdownItem
                    key={collection.get('name')}
                    label={collection.get('label')}
                    onClick={() => createNewEntry(collection.get('name'))}
                  />
                ))}
            </Dropdown>
          </WorkflowTopRow>
          <WorkflowTopDescription>
            {t('workflow.workflow.description', {
              smart_count: reviewCount,
              readyCount,
            })}
          </WorkflowTopDescription>
        </WorkflowTop>
        <WorkflowList
          entries={unpublishedEntries}
          handleChangeStatus={updateUnpublishedEntryStatus}
          handlePublish={publishUnpublishedEntry}
          handleDelete={deleteUnpublishedEntry}
          isOpenAuthoring={isOpenAuthoring}
          collections={collections}
        />
      </WorkflowContainer>
    );
  }
}

function mapStateToProps(state) {
  const { collections, config, globalUI } = state;
  const isEditorialWorkflow = config.publish_mode === EDITORIAL_WORKFLOW;
  const isOpenAuthoring = globalUI.useOpenAuthoring;
  const returnObj = { collections, isEditorialWorkflow, isOpenAuthoring };

  if (isEditorialWorkflow) {
    returnObj.isFetching = state.editorialWorkflow.getIn(['pages', 'isFetching'], false);

    /*
     * Generates an ordered Map of the available status as keys.
     * Each key containing a Sequence of available unpubhlished entries
     * Eg.: OrderedMap{'draft':Seq(), 'pending_review':Seq(), 'pending_publish':Seq()}
     */
    returnObj.unpublishedEntries = status.reduce((acc, currStatus) => {
      const entries = selectUnpublishedEntriesByStatus(state, currStatus);
      return acc.set(currStatus, entries);
    }, OrderedMap());
  }
  return returnObj;
}

export default connect(mapStateToProps, {
  loadUnpublishedEntries,
  updateUnpublishedEntryStatus,
  publishUnpublishedEntry,
  deleteUnpublishedEntry,
})(translate()(Workflow));
