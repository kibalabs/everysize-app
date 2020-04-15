import { createGlobalStyle } from 'styled-components';

interface IGlobalCssProps {
  resetCss: string;
}

export const GlobalCss = createGlobalStyle<IGlobalCssProps>`
  ${(props: IGlobalCssProps): string => props.resetCss}

  html, body, #root {
    height: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
  }

  html {
    overflow: hidden;
  }

  body {
    font-size: 12px;
    font-family: "Montserrat", sans-serif;
    background-color: #f5f5f5;
    overflow: auto;
  }

  strong {
    font-weight: bold;
  }
`;
