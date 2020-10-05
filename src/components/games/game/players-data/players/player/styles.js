import css from 'styled-jsx/css';

export default css`
  .civilization {
    display: flex;
    align-items: center;
  }
  .civilization-image {
    margin-right: 5px;
    width: 30px;
  }
`;

export function muiStyles(theme) {
  return {
    tableBodyRow: {
      height: '40px !important'
    },
    playerSelected: {
      backgroundImage: 'url("/images/textures/scribble-highlighted.jpg")'
    },
    tableBodyCell: {
      borderBottom: 'none !important'
    },
    tableBodyCellLastRowSameTeam: {
      borderBottom: '1px solid gray !important'
    }
  };
}
