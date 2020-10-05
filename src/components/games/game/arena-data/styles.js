import css from 'styled-jsx/css';

export default css`
  .container-table-file-data {
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
      backgroundColor: '#222229'
    },
    tableBody: {
      backgroundImage: 'url("/images/textures/scribble.jpg")'
    },
    tableBodyRow: {
      height: '40px !important'
    },
    tableBodyCell: {
      borderBottom: '2px solid black !important'
    }
  };
}
