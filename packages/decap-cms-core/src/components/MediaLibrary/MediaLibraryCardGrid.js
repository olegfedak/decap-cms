import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Waypoint } from 'react-waypoint';
import { Map } from 'immutable';
import { colors } from 'decap-cms-ui-default';
import { FixedSizeGrid as Grid } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

import MediaLibraryCard from './MediaLibraryCard';

function CardWrapper(props) {
  const {
    rowIndex,
    columnIndex,
    style,
    data: {
      mediaItems,
      isSelectedFile,
      onAssetClick,
      cardDraftText,
      cardHeight,
      isPrivate,
      displayURLs,
      loadDisplayURL,
      columnCount,
      gutter,
    },
  } = props;
  const index = rowIndex * columnCount + columnIndex;
  if (index >= mediaItems.length) {
    return null;
  }
  const file = mediaItems[index];

  return (
    <div
      tabIndex="0"
      style={{
        ...style,
        left: style.left + gutter * columnIndex,
        top: style.top + gutter,
        width: style.width,
        height: style.height - gutter,
      }}
    >
      <MediaLibraryCard
        key={file.key}
        isSelected={isSelectedFile(file)}
        text={file.name}
        onClick={() => onAssetClick(file)}
        isDraft={file.draft}
        draftText={cardDraftText}
        width={'100%'}
        height={cardHeight}
        margin={'0px'}
        isPrivate={isPrivate}
        displayURL={displayURLs.get(file.id, file.url ? Map({ url: file.url }) : Map())}
        loadDisplayURL={() => loadDisplayURL(file)}
        type={file.type}
        isViewableImage={file.isViewableImage}
      />
    </div>
  );
}

function VirtualizedGrid(props) {
  const { mediaItems, setScrollContainerRef } = props;

  return (
    <CardGridContainer ref={setScrollContainerRef}>
      <AutoSizer>
        {({ height, width }) => {
          const gutter = parseInt(props.cardMargin, 10);
          const columnCount = Math.floor(width / (parseInt(props.cardWidth, 10) + gutter));
          const columnWidth = (width - gutter * (columnCount - 1)) / columnCount;
          const rowHeight = parseInt(props.cardHeight, 10) + gutter;
          const rowCount = Math.ceil(mediaItems.length / columnCount);
          return (
            <Grid
              columnCount={columnCount}
              columnWidth={columnWidth}
              rowCount={rowCount}
              rowHeight={rowHeight}
              width={width}
              height={height}
              itemData={{ ...props, gutter, columnCount }}
            >
              {CardWrapper}
            </Grid>
          );
        }}
      </AutoSizer>
    </CardGridContainer>
  );
}

function PaginatedGrid({
  setScrollContainerRef,
  mediaItems,
  isSelectedFile,
  onAssetClick,
  cardDraftText,
  cardWidth,
  cardHeight,
  cardMargin,
  isPrivate,
  displayURLs,
  loadDisplayURL,
  canLoadMore,
  onLoadMore,
  isPaginating,
  paginatingMessage,
}) {
  return (
    <CardGridContainer ref={setScrollContainerRef}>
      {mediaItems.map(file => (
        <MediaLibraryCard
          key={file.key}
          isSelected={isSelectedFile(file)}
          text={file.name}
          onClick={() => onAssetClick(file)}
          isDraft={file.draft}
          draftText={cardDraftText}
          width={cardWidth}
          height={cardHeight}
          margin={cardMargin}
          isPrivate={isPrivate}
          displayURL={displayURLs.get(file.id, file.url ? Map({ url: file.url }) : Map())}
          loadDisplayURL={() => loadDisplayURL(file)}
          type={file.type}
          isViewableImage={file.isViewableImage}
        />
      ))}
      {!canLoadMore ? null : <Waypoint onEnter={onLoadMore} />}
      {!isPaginating ? null : (
        <PaginatingMessage isPrivate={isPrivate}>{paginatingMessage}</PaginatingMessage>
      )}
    </CardGridContainer>
  );
}

const CardGridContainer = styled.div`
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
`;

const PaginatingMessage = styled.h1`
  color: ${props => props.isPrivate && colors.textFieldBorder};
`;

function MediaLibraryCardGrid(props) {
  const { canLoadMore, isPaginating } = props;
  if (canLoadMore || isPaginating) {
    return <PaginatedGrid {...props} />;
  }
  return <VirtualizedGrid {...props} />;
}

MediaLibraryCardGrid.propTypes = {
  setScrollContainerRef: PropTypes.func.isRequired,
  mediaItems: PropTypes.arrayOf(
    PropTypes.shape({
      displayURL: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
      id: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      draft: PropTypes.bool,
    }),
  ).isRequired,
  isSelectedFile: PropTypes.func.isRequired,
  onAssetClick: PropTypes.func.isRequired,
  canLoadMore: PropTypes.bool,
  onLoadMore: PropTypes.func.isRequired,
  isPaginating: PropTypes.bool,
  paginatingMessage: PropTypes.string,
  cardDraftText: PropTypes.string.isRequired,
  cardWidth: PropTypes.string.isRequired,
  cardMargin: PropTypes.string.isRequired,
  loadDisplayURL: PropTypes.func.isRequired,
  isPrivate: PropTypes.bool,
  displayURLs: PropTypes.instanceOf(Map).isRequired,
};

export default MediaLibraryCardGrid;
