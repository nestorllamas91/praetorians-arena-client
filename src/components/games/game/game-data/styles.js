import css from 'styled-jsx/css';

export default css`
  .container-table-game-data {
    display: flex;
    padding: 0px;
  }
`;

export function muiStyles(theme) {
  return {
    paper: {
      width: '100%'
    },
    tableHeadRow: {
      height: '30px !important'
    },
    tableHeadCell: {
      borderBottom: '0px',
      fontFamily: '"TrajanPro" !important',
      fontSize: '12px',
      color: 'white',
      backgroundColor: '#222229',
      '& > div': {
        display: 'flex',
        'flex-direction': 'column',
        'line-height': '1'
      },
      '& > div > span': {
        fontFamily: '"TrajanPro" !important',
        fontSize: '12px'
      }
    },
    tableBody: {
      backgroundImage: 'url("/images/textures/scribble.jpg")'
    },
    tableBodyRow: {
      height: '125px !important'
    },
    tableBodyCell: {
      borderBottom: '2px solid black !important'
    }
  };
}
