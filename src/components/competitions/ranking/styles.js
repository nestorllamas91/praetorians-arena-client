import css from 'styled-jsx/css';

export default css`
  .ranking-table {
    box-shadow: 0px 0px 5px 0px black;
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
      backgroundColor: '#222229',
      '& > span': {
        fontFamily: '"TrajanPro" !important',
        fontSize: '12px'
      }
    },
    tableBody: {
      backgroundImage: 'url("/images/textures/scribble.jpg")'
    }
  };
}
