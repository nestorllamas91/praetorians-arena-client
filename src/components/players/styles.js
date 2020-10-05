import css from 'styled-jsx/css';

export default css`
  .players-table {
    box-shadow: 0px 0px 5px 0px black;
  }
  .avatar {
    border: 2px solid #3d697b;
  }
`;

export function stylesMaterialUI() {
  return {
    tableHeadRow: {
      height: '30px'
    },
    tableHeadCell: {
      fontFamily: '"TrajanPro" !important',
      fontSize: '12px',
      color: 'white',
      backgroundColor: '#222229'
    },
    tableBody: {
      backgroundImage: 'url("/images/textures/scribble.jpg")'
    },
    tableBodyRow: {
      height: '80px'
    },
    tableBodyRowPlayerSelected: {
      backgroundImage: 'url("/images/textures/scribble-highlighted.jpg")'
    },
    tableBodyCell: {
      borderBottom: '1px solid gray'
    }
  };
}
