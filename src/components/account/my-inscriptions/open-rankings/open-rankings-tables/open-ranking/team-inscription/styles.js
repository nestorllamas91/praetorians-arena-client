import css from 'styled-jsx/css';

export default css`
  .headings {
    display: flex;
  }
  .first-heading {
    margin-top: 0px !important;
    margin-right: 10px !important;
  }
  .section1 {
    margin-bottom: 10px;
  }
  .section2 {
    margin-bottom: 20px;
  }
  .players-selectors {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .send-proposal {
    display: flex;
    justify-content: center;
  }
`;

export const stylesGlobal = css.global`
  .player-selector:not(:last-child) {
    margin-bottom: 10px;
  }
`;

export function stylesMaterialUI() {
  return {
    input: {
      width: '200px'
    }
  };
}
