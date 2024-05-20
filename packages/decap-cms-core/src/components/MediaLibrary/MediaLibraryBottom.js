import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import {
  DeleteButton,
  DownloadButton,
  CopyToClipBoardButton,
  InsertButton,
} from './MediaLibraryButtons';

const LibraryBottom = styled.div`
  display: flex;
  flex-direction: row-reverse;
  overflow-x: auto;
  margin-inline: -20px;
  padding-inline: 20px;
`;

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  white-space: nowrap;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
`;

function MediaLibraryBottom({
  t,
  onDownload,
  onDelete,
  hasSelection,
  canInsert,
  onInsert,
  isPersisting,
  isDeleting,
  selectedFile,
}) {
  const deleteEnabled = hasSelection && !isPersisting;

  const deleteButtonLabel = isDeleting
    ? t('mediaLibrary.mediaLibraryModal.deleting')
    : t('mediaLibrary.mediaLibraryModal.deleteSelected');
  const downloadButtonLabel = t('mediaLibrary.mediaLibraryModal.download');
  const insertButtonLabel = t('mediaLibrary.mediaLibraryModal.chooseSelected');

  return (
    <LibraryBottom>
      <RowContainer>
        <ButtonsContainer>
          <CopyToClipBoardButton
            disabled={!hasSelection}
            path={selectedFile.path}
            name={selectedFile.name}
            draft={selectedFile.draft}
            t={t}
          />
          <DownloadButton onClick={onDownload} disabled={!hasSelection}>
            {downloadButtonLabel}
          </DownloadButton>
          <DeleteButton onClick={onDelete} disabled={!deleteEnabled}>
            {deleteButtonLabel}
          </DeleteButton>
          {!canInsert ? null : (
            <InsertButton onClick={onInsert} disabled={!hasSelection}>
              {insertButtonLabel}
            </InsertButton>
          )}
        </ButtonsContainer>
      </RowContainer>
    </LibraryBottom>
  );
}

MediaLibraryBottom.propTypes = {
  t: PropTypes.func.isRequired,
  onDownload: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  canInsert: PropTypes.bool,
  onInsert: PropTypes.func.isRequired,
  hasSelection: PropTypes.bool.isRequired,
  isPersisting: PropTypes.bool,
  isDeleting: PropTypes.bool,
  selectedFile: PropTypes.oneOfType([
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      draft: PropTypes.bool.isRequired,
      name: PropTypes.string.isRequired,
    }),
    PropTypes.shape({}),
  ]),
};

export default MediaLibraryBottom;
