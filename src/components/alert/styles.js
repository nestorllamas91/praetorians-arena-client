import css from 'styled-jsx/css';

export default css``;

export function stylesMaterialUI() {
  return {
    success: {
      'background-color': '#46A04F'
    },
    error: {
      'background-color': '#D23134'
    },
    'icon-type': {
      'margin-right': '5px',
      'font-size': 20
    },
    'icon-close': {
      'font-size': 20
    },
    message: {
      display: 'flex',
      'align-items': 'center'
    }
  };
}
