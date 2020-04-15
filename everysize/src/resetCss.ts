export const resetCss = `
  /* copied from bootstrap grid */
  html {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -ms-overflow-style: scrollbar;
  }
  *,
  *::before,
  *::after {
    -webkit-box-sizing: inherit;
    box-sizing: inherit;
  }

  /* Copied from https://gist.github.com/anthonyshort/552543 */
  input, label, select, button, textarea {
    margin:0;
    border:0;
    padding:0;
    display:inline-block;
    vertical-align:middle;
    white-space:normal;
    background:none;
    line-height:1;
    font: inherit;
  }

  input:focus {
    outline:0;
  }

  input, textarea {
    -webkit-box-sizing:content-box;
    -moz-box-sizing:content-box;
    box-sizing:content-box;
  }

  button,
  input[type=reset],
  input[type=button],
  input[type=submit],
  input[type=checkbox],
  input[type=radio],
  select {
    -webkit-box-sizing:border-box;
    -moz-box-sizing:border-box;
    box-sizing:border-box;
  }

  input[type=date],
  input[type=datetime],
  input[type=datetime-local],
  input[type=email],
  input[type=month],
  input[type=number],
  input[type=password],
  input[type=range],
  input[type=search],
  input[type=tel],
  input[type=text],
  input[type=time],
  input[type=url],
  input[type=week] {
  }

  input[type=checkbox], input[type=radio] {
    width:13px;
    height:13px;
  }

  input[type=file] {
  }

  input[type=search] {
    -webkit-appearance:textfield;
    -webkit-box-sizing:content-box;
  }

  ::-webkit-search-decoration {
    display:none;
  }

  button, input[type="reset"], input[type="button"], input[type="submit"] {
    overflow:visible;
    width:auto;
  }

  ::-webkit-file-upload-button {
    padding:0;
    border:0;
    background:none;
  }

  textarea {
    vertical-align:top;
    overflow:auto;
  }

  select {
  }
  select[multiple] {
    vertical-align:top;
  }

  /* https://meyerweb.com/eric/tools/css/reset/ */
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  main, menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, main, menu, nav, section {
    display: block;
  }
  /* HTML5 hidden-attribute fix for newer browsers */
  *[hidden] {
    display: none;
  }
  body {
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  /* http://www.paulirish.com/2012/box-sizing-border-box-ftw */
  html {
    box-sizing: border-box;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  /* Custom */
  a {
    text-decoration: none;
    color: inherit;
  }
  button {
    border: none;
    margin: 0;
    padding: 0;
    width: auto;
    overflow: visible;
    background: transparent;
    color: inherit;
    font: inherit;
    text-align: inherit;
    outline: none;
    line-height: inherit;
    -webkit-appearance: none;
  }
  /* Fix antialiasing */
  *, *:before, *:after {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  /* Disable user select on everything but texts */
  *, *:before, *:after {
    user-select: none;

  }
  p, h1, h2, h3, h4, h5, h6, blockquote, pre, ul, ol, li, table, tr, th, td, input, textarea, span, div[contenteditable="true"] {
    user-select: text;
  }
  b {
    font-weight: bold;
  }
`;
