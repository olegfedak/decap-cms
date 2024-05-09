import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import MediaLibrarySearch from './MediaLibrarySearch';
import MediaLibraryHeader from './MediaLibraryHeader';
import { UploadButton } from './MediaLibraryButtons';

const LibraryTop = styled.div`
  position: relative;
  display: flex;
  gap: 15px;
  flex-direction: column;
`;

const RowContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 15px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr auto;
  }
`;

function MediaLibraryTop({
  t,
  onClose,
  privateUpload,
  forImage,
  onUpload,
  query,
  onSearchChange,
  onSearchKeyDown,
  searchDisabled,
  isPersisting,
  isDeleting,
}) {
  const shouldShowButtonLoader = isPersisting || isDeleting;
  const uploadEnabled = !shouldShowButtonLoader;

  const uploadButtonLabel = isPersisting
    ? t('mediaLibrary.mediaLibraryModal.uploading')
    : t('mediaLibrary.mediaLibraryModal.upload');

  return (
    <LibraryTop>
      <RowContainer>
        <MediaLibraryHeader
          onClose={onClose}
          title={`${privateUpload ? t('mediaLibrary.mediaLibraryModal.private') : ''}${
            forImage
              ? t('mediaLibrary.mediaLibraryModal.images')
              : t('mediaLibrary.mediaLibraryModal.mediaAssets')
          }`}
          isPrivate={privateUpload}
        />
        <MediaLibrarySearch
          value={query}
          onChange={onSearchChange}
          onKeyDown={onSearchKeyDown}
          placeholder={t('mediaLibrary.mediaLibraryModal.search')}
          disabled={searchDisabled}
        />
        <UploadButton
          label={uploadButtonLabel}
          imagesOnly={forImage}
          onChange={onUpload}
          disabled={!uploadEnabled}
        />
      </RowContainer>
    </LibraryTop>
  );
}

MediaLibraryTop.propTypes = {
  t: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  privateUpload: PropTypes.bool,
  forImage: PropTypes.bool,
  onDownload: PropTypes.func.isRequired,
  onUpload: PropTypes.func.isRequired,
  query: PropTypes.string,
  onSearchChange: PropTypes.func.isRequired,
  onSearchKeyDown: PropTypes.func.isRequired,
  searchDisabled: PropTypes.bool.isRequired,
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

export default MediaLibraryTop;
