import css from 'styled-jsx/css';

export default css`
  .ranking-table {
    box-shadow: 0px 0px 5px 0px black;
  }
  .dates {
    display: flex;
    flex-direction: column;
  }
  .button-upload {
    display: flex;
    justify-content: center;
    margin-top: 5px;
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
      height: '110px'
    },
    tableBodyRowPlayerSelected: {
      backgroundImage: 'url("/images/textures/scribble-highlighted.jpg")'
    },
    tableBodyCell: {
      borderBottom: '1px solid gray'
    }
  };
}
