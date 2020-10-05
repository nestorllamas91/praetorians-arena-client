import css from 'styled-jsx/css';

export default css`
  .body-container {
    position: relative;
    display: flex;
    flex-direction: column;
    flex: 1 0 auto;
    background-image: url('/images/textures/wall.jpg');
    background-size: 15%;
  }
  .body-container::before,
  .body-container::after {
    content: '';
    position: absolute;
    top: -36px;
    width: 100%;
    height: 72px;
    background: url('/images/various/divider.png');
    background-size: auto 200%;
    z-index: 0;
  }
  .body-container::before {
    left: 0;
  }
  .body-container::after {
    right: 0;
    background-position: 100% 100%;
  }
  .error-container {
    position: relative;
    display: flex;
    flex-direction: column;
    flex: 1 0 auto;
    background-image: url('/images/textures/wall.jpg');
    background-size: 15%;
  }
`;

export const stylesGlobal = css.global`
  @font-face {
    font-family: 'TrajanPro';
    src: url(/fonts/TrajanPro-Bold.ttf);
  }

  @font-face {
    font-family: 'EBGaramond';
    src: url(/fonts/EBGaramond-Medium.ttf);
  }

  * {
    font-family: 'EBGaramond' !important;
  }
  html {
    height: 100%;
  }
  html * {
    cursor: url(/images/icons/cursor.png), auto !important;
  }
  #__next {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
  .main-container {
    margin: 60px auto;
    padding: 60px;
    width: 60vw;
    min-width: 700px;
    background-color: #dbb479;
    border: 12px solid transparent;
    border-image: url('/images/various/frame.png') 20;
  }
  h1.heading1 {
    text-align: center;
    font-family: 'TrajanPro' !important;
    font-size: 70px;
    color: white;
    text-shadow: -1px 0px 2px black, 0px 1px 2px black, 1px 0px 2px black, 0px -1px 2px black;
  }
  h2.heading2,
  h2.heading2 > a,
  h2.heading2 > div > a,
  h2.heading2 > div > span {
    margin-top: 30px;
    font-family: 'TrajanPro' !important;
    font-size: 26px;
  }
  h3.heading3 {
    margin-bottom: 10px;
    font-family: 'TrajanPro' !important;
    font-size: 18px;
  }
  h4.heading4,
  h4.heading4 > a,
  h4.heading4 > div > a,
  h4.heading4 > div > span {
    margin-bottom: 10px;
    font-family: 'TrajanPro' !important;
    font-size: 14px;
    text-decoration: underline;
  }
  p {
    margin-bottom: 8px;
    text-align: justify;
    line-height: 1.5;
    font-size: 18px;
  }
  ul.unordered-list,
  ol.ordered-list {
    margin-bottom: 10px;
    font-size: 18px;
  }
  ul.unordered-list > li,
  ul.unordered-list ul > li,
  ol.ordered-list > li,
  ol.ordered-list ol > li {
    margin-left: 25px;
    text-align: justify;
    line-height: 1.5;
  }
  ul.unordered-list > li {
    list-style: disc inside;
  }
  ul.unordered-list ul > li {
    list-style: circle inside;
  }
  ol.ordered-list > li {
    list-style: decimal inside;
  }
  ol.ordered-list ol > li {
    list-style: lower-alpha inside;
  }
  b {
    font-weight: bold;
  }
  i {
    font-style: italic;
  }
  u {
    text-decoration: underline;
  }
  a,
  a:hover {
    color: #aa4500 !important;
    text-decoration: none !important;
  }
  a:hover {
    text-decoration: underline !important;
  }
  a.link {
    text-decoration: none !important;
  }
  button.button {
    position: relative;
    margin-right: 30px;
    border: 0px;
    padding-left: 36px;
    padding-bottom: 2px;
    height: 2rem;
    font-size: 12px;
    font-weight: bold;
    color: white;
    background: url('/images/various/button-enabled.png') 0 0;
    background-size: auto 200%;
    z-index: 0;
  }
  button.button::after {
    content: '';
    position: absolute;
    top: 0px;
    right: -30px;
    width: 50%;
    height: 100%;
    background: url('/images/various/button-enabled.png') 100% 0;
    background-size: auto 200%;
    z-index: -1;
  }
  button.button:hover {
    filter: drop-shadow(0px 0px 3px black);
  }
  button.button:disabled {
    position: relative;
    margin-right: 30px;
    border: 0px;
    padding-left: 36px;
    padding-bottom: 2px;
    height: 2rem;
    font-size: 12px;
    font-weight: bold;
    color: darkgray;
    background: url('/images/various/button-disabled.png') 0 0;
    background-size: auto 200%;
    z-index: 0;
  }
  button.button:disabled::after {
    content: '';
    position: absolute;
    top: 0px;
    right: -30px;
    width: 50%;
    height: 100%;
    background: url('/images/various/button-disabled.png') 100% 0;
    background-size: auto 200%;
    z-index: -1;
  }
  td > * {
    vertical-align: middle;
  }
  textarea {
    resize: none;
  }
  hr {
    margin: 4px 0px 16px 0px;
    border-top: 0.8px solid gray;
  }
`;

export const stylesReset = css.global`
  a,
  abbr,
  acronym,
  address,
  applet,
  article,
  aside,
  audio,
  b,
  big,
  blockquote,
  body,
  canvas,
  caption,
  center,
  cite,
  code,
  dd,
  del,
  details,
  dfn,
  div,
  dl,
  dt,
  em,
  embed,
  fieldset,
  figcaption,
  figure,
  footer,
  form,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  header,
  hgroup,
  html,
  i,
  iframe,
  img,
  ins,
  kbd,
  label,
  legend,
  li,
  mark,
  menu,
  nav,
  object,
  ol,
  output,
  p,
  pre,
  q,
  ruby,
  span,
  s,
  samp,
  section,
  small,
  strike,
  strong,
  sub,
  summary,
  sup,
  table,
  tbody,
  td,
  tfoot,
  th,
  thead,
  time,
  tr,
  tt,
  u,
  ul,
  var,
  video {
    margin: 0px;
    border-width: 0px;
    padding: 0px;
    vertical-align: baseline;
    font: inherit;
    font-size: 100%;
  }

  body {
    line-height: 1;
  }

  blockquote,
  q {
    quotes: none;
  }

  blockquote::before,
  blockquote::after,
  q::before,
  q::after {
    content: none;
  }

  ol,
  ul {
    list-style: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
`;
