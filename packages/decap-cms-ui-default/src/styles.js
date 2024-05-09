import React from 'react';
import { css, Global } from '@emotion/react';

/**
 * Font Stacks
 */
const fonts = {
  primary: `
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    Helvetica,
    Arial,
    sans-serif,
    "Apple Color Emoji",
    "Segoe UI Emoji",
    "Segoe UI Symbol"
  `,
  mono: `
    'SFMono-Regular',
    Consolas,
    "Liberation Mono",
    Menlo,
    Courier,
    monospace;
  `,
};

/**
 * Theme Colors
 */
const colorsRaw = {
  white: '#fff',
  grayLight: '#717a8926',
  gray: '#717a89',
  grayDark: '#313d3e',
  accent: '#683bab',
  accentLight: '#683bab19',
  blue: '#3a69c7',
  blueLight: '#e8f5fe',
  green: '#005614',
  greenLight: '#caef6f',
  brown: '#754e00',
  yellow: '#ffee9c',
  red: '#ff003b',
  redDark: '#D60032',
  redLight: '#fcefea',
  purple: '#70399f',
  purpleLight: '#f6d8ff',
  teal: '#17a2b8',
  tealDark: '#117888',
  tealLight: '#ddf5f9',
};

const colors = {
  statusDraftText: colorsRaw.purple,
  statusDraftBackground: colorsRaw.purpleLight,
  statusReviewText: colorsRaw.brown,
  statusReviewBackground: colorsRaw.yellow,
  statusReadyText: colorsRaw.green,
  statusReadyBackground: colorsRaw.greenLight,
  text: colorsRaw.gray,
  textLight: colorsRaw.white,
  textLead: colorsRaw.grayDark,
  background: colorsRaw.grayLight,
  foreground: colorsRaw.white,
  active: colorsRaw.accent,
  activeBackground: colorsRaw.accentLight,
  inactive: colorsRaw.gray,
  button: colorsRaw.gray,
  buttonText: colorsRaw.white,
  inputBackground: colorsRaw.white,
  infoText: colorsRaw.accent,
  infoBackground: colorsRaw.accentLight,
  successText: colorsRaw.green,
  successBackground: colorsRaw.greenLight,
  warnText: colorsRaw.brown,
  warnBackground: colorsRaw.yellow,
  errorText: colorsRaw.red,
  errorBackground: colorsRaw.redLight,
  textFieldBorder: '#dfdfe3',
  controlLabel: '#5D626F',
  checkerboardLight: '#f2f2f2',
  checkerboardDark: '#e6e6e6',
  mediaDraftText: colorsRaw.purple,
  mediaDraftBackground: colorsRaw.purpleLight,
};

const lengths = {
  topBarHeight: '60px',
  inputPadding: '16px 20px',
  borderRadius: '6px',
  richTextEditorMinHeight: '300px',
  borderWidth: '2px',
  topCardWidth: '682px',
  pageMargin: '20px 18px',
  objectWidgetTopBarContainerPadding: '0 14px 0',
};

const borders = {
  textField: `solid  ${lengths.borderWidth} ${colors.textFieldBorder}`,
};

const transitions = {
  main: '.2s ease-in-out',
};

const shadows = {
  drop: `
    box-shadow: 0 2px 4px 0 rgba(19, 39, 48, 0.12);
  `,
  dropMain: `
    box-shadow: 0 2px 6px 0 rgba(68, 74, 87, 0.05), 0 1px 3px 0 rgba(68, 74, 87, 0.1);
  `,
  dropMiddle: `
    box-shadow: 0 2px 6px 0 rgba(68, 74, 87, 0.1),0  1px 8px 0 rgba(68, 74, 87, 0.1);
  `,
  dropDeep: `
    box-shadow: 0 10px 25px 0 rgba(68, 74, 87, 0.2),0 0px 1px 0px rgba(68, 74, 87, 0.5);
  `,
  inset: `
    box-shadow: inset 0 0 4px rgba(68, 74, 87, 0.3);
  `,
};

const text = {
  fieldLabel: css`
    font-size: 13px;
    font-weight: 600;
    color: ${colors.controlLabel};
  `,
};

const gradients = {
  checkerboard: `
    linear-gradient(
      45deg,
      ${colors.checkerboardDark} 25%,
      transparent 25%,
      transparent 75%,
      ${colors.checkerboardDark} 75%,
      ${colors.checkerboardDark}
    )
  `,
};

const effects = {
  checkerboard: css`
    background-color: ${colors.white};
    background-size: 16px 16px;
    background-position: 0 0, 8px 8px;
    background-image: ${gradients.checkerboard}, ${gradients.checkerboard};
  `,
};

const badge = css`
  font-size: 13px;
  line-height: 1;
`;

const backgroundBadge = css`
  ${badge};
  display: block;
  border-radius: ${lengths.borderRadius};
  padding: 4px 10px;
  text-align: center;
`;

const textBadge = css`
  ${badge};
  display: inline-block;
  font-weight: 700;
  text-transform: uppercase;
`;

const card = css`
  ${shadows.dropMain};
  border-radius: ${lengths.borderRadius};
  background-color: #fff;
`;

const buttons = {
  button: css`
    border: 0;
    border-radius: ${lengths.borderRadius};
    cursor: pointer;
    overflow: hidden;
    transition: all ${transitions.main};
  `,
  default: css`
    height: 36px;
    line-height: 36px;
    font-weight: 500;
    padding: 0 20px;
  `,
  widget: css`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 13px;
    font-weight: 600;
    line-height: 1;
    background-color: ${colorsRaw.white};
    color: ${colors.controlLabel};
    padding: 4px 10px;
    box-shadow: 0 0 0 1px rgba(68, 74, 87, 0.15), 0 1px 2px 0 rgba(68, 74, 87, 0.1);

    &:focus,
    &:hover {
      color: ${colorsRaw.accent};
      box-shadow: 0 0 0 1px ${colorsRaw.accent} 56, 0 1px 2px 0 ${colorsRaw.accent}36;
    }
  `,
  medium: css`
    height: 27px;
    line-height: 27px;
    font-size: 13px;
    font-weight: 600;
    border-radius: 4px;
    padding: 0 24px 0 14px;
  `,
  small: css`
    font-size: 13px;
    height: 23px;
    line-height: 23px;
  `,
  accent: css`
    background-color: ${colorsRaw.accent};
    color: ${colorsRaw.white};
  `,
  lightAccent: css`
    background-color: ${colorsRaw.accentLight};
    color: ${colorsRaw.accent};
  `,
  gray: css`
    background-color: ${colorsRaw.gray};
    color: ${colorsRaw.white};

    &:focus,
    &:hover {
      color: ${colorsRaw.white};
      background-color: #555a65;
    }
  `,
  lightGray: css`
    background-color: ${colorsRaw.grayLight};
    color: ${colorsRaw.gray};
  `,
  grayText: css`
    background-color: transparent;
    color: ${colorsRaw.gray};
  `,
  green: css`
    background-color: #aae31f;
    color: ${colorsRaw.green};
  `,
  lightRed: css`
    background-color: ${colorsRaw.redLight};
    color: ${colorsRaw.redDark};
  `,
  blue: css`
    background-color: ${colorsRaw.blue};
    color: ${colorsRaw.white};
  `,
  lightBlue: css`
    background-color: ${colorsRaw.blueLight};
    color: ${colorsRaw.blue};
  `,
  lightTeal: css`
    background-color: ${colorsRaw.tealLight};
    color: #1195aa;
  `,
  teal: css`
    background-color: ${colorsRaw.teal};
    color: ${colorsRaw.white};
  `,
  disabled: css`
    background-color: ${colorsRaw.grayLight};
    color: ${colorsRaw.gray};
    opacity: 0.5;
    cursor: default;
  `,
};

const caret = css`
  color: ${colorsRaw.white};
  width: 0;
  height: 0;
  border: 5px solid transparent;
  border-radius: ${lengths.borderWidth};
`;

const components = {
  card,
  caretDown: css`
    ${caret};
    border-top: 6px solid currentColor;
    border-bottom: 0;
  `,
  caretRight: css`
    ${caret};
    border-left: 6px solid currentColor;
    border-right: 0;
  `,
  badge: css`
    ${backgroundBadge};
    color: ${colors.infoText};
    background-color: ${colors.infoBackground};
  `,
  badgeSuccess: css`
    ${backgroundBadge};
    color: ${colors.successText};
    background-color: ${colors.successBackground};
  `,
  badgeDanger: css`
    ${backgroundBadge};
    color: ${colorsRaw.red};
    background-color: #fbe0d7;
  `,
  textBadge: css`
    ${textBadge};
    color: ${colors.infoText};
  `,
  textBadgeSuccess: css`
    ${textBadge};
    color: ${colors.successText};
  `,
  textBadgeDanger: css`
    ${textBadge};
    color: ${colorsRaw.red};
  `,
  loaderSize: css`
    width: 2.2857rem;
    height: 2.2857rem;
  `,
  cardTop: css`
    ${card};
    max-width: 100%;
    padding: 18px 20px;
    margin-bottom: 28px;

    @media (min-width: 800px) {
      width: ${lengths.topCardWidth};
    }
  `,
  cardTopHeading: css`
    font-size: 22px;
    font-weight: 600;
    padding: 0;
    margin: 0;
  `,
  cardTopDescription: css`
    max-width: 480px;
    color: ${colors.text};
    font-size: 14px;
    margin: 8px 0 0;
  `,
  objectWidgetTopBarContainer: css`
    padding: ${lengths.objectWidgetTopBarContainerPadding};
  `,
  dropdownList: css`
    ${shadows.dropDeep};
    background-color: ${colorsRaw.white};
    border-radius: ${lengths.borderRadius};
    overflow: hidden;
  `,
  dropdownItem: css`
    ${buttons.button};
    background-color: transparent;
    border-radius: 0;
    color: ${colorsRaw.grayDark};
    font-weight: 500;
    border-bottom: 1px solid #eaebf1;
    padding: 8px 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:last-of-type {
      border-bottom: 0;
    }

    &.active,
    &:hover,
    &:active,
    &:focus {
      color: ${colors.active};
      background-color: ${colors.activeBackground};
    }
  `,
  viewControlsText: css`
    font-size: 14px;
    color: ${colors.text};
    margin-right: 12px;
    white-space: nowrap;
  `,
};

const reactSelectStyles = {
  control: styles => ({
    ...styles,
    border: 0,
    boxShadow: 'none',
    padding: '9px 0 9px 12px',
  }),
  option: (styles, state) => ({
    ...styles,
    backgroundColor: state.isSelected
      ? `${colors.active}`
      : state.isFocused
      ? `${colors.activeBackground}`
      : 'transparent',
    paddingLeft: '22px',
  }),
  menu: styles => ({ ...styles, right: 0, zIndex: zIndex.zIndex300 }),
  container: styles => ({ ...styles, padding: '0 !important' }),
  indicatorSeparator: (styles, state) =>
    state.hasValue && state.selectProps.isClearable
      ? { ...styles, backgroundColor: `${colors.textFieldBorder}` }
      : { display: 'none' },
  dropdownIndicator: styles => ({ ...styles, color: `${colors.controlLabel}` }),
  clearIndicator: styles => ({ ...styles, color: `${colors.controlLabel}` }),
  multiValue: styles => ({
    ...styles,
    backgroundColor: colors.activeBackground,
    borderRadius: lengths.borderRadius,
  }),
  multiValueLabel: styles => ({
    ...styles,
    color: colors.active,
    fontWeight: 500,
  }),
  multiValueRemove: styles => ({
    ...styles,
    color: colors.active,
    ':hover': {
      color: colors.errorText,
    },
  }),
};

const zIndex = {
  zIndex0: 0,
  zIndex1: 1,
  zIndex2: 2,
  zIndex10: 10,
  zIndex100: 100,
  zIndex200: 200,
  zIndex299: 299,
  zIndex300: 300,
  zIndex1000: 1000,
  zIndex10000: 10000,
  zIndex99999: 99999,
};

function GlobalStyles() {
  return (
    <Global
      styles={css`
        *,
        *:before,
        *:after {
          box-sizing: border-box;
        }

        :focus {
          outline: -webkit-focus-ring-color auto ${lengths.borderRadius};
        }

        /**
       * Don't show outlines if the user is utilizing mouse rather than keyboard.
          [data-whatintent='mouse'] *:focus {
            outline: none;
          }
        */

        *:focus {
          outline: none;
        }

        input {
          border: 0;
        }

        body {
          font-family: ${fonts.primary};
          font-weight: normal;
          background-color: ${colors.background};
          color: ${colors.text};
          margin: 0;
        }

        ul,
        ol {
          padding-left: 0;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        p {
          font-family: ${fonts.primary};
          color: ${colors.textLead};
          font-size: 15px;
          line-height: 1.5;
          margin-top: 0;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-weight: 500;
        }

        h1 {
          font-size: 24px;
          letter-spacing: 0.4px;
          color: ${colors.textLead};
        }

        a,
        button {
          font-size: 14px;
          font-weight: 500;
          transition: color ${transitions.main}, background-color ${transitions.main};
        }

        a {
          color: ${colors.text};
          text-decoration: none;
        }

        button {
          font-family: inherit;
        }

        img {
          max-width: 100%;
        }

        textarea {
          resize: none;
        }
      `}
    />
  );
}

export {
  fonts,
  colorsRaw,
  colors,
  lengths,
  components,
  buttons,
  text,
  shadows,
  borders,
  transitions,
  effects,
  zIndex,
  reactSelectStyles,
  GlobalStyles,
};
