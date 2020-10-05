import css from 'styled-jsx/css';

export default css`
  .container-table {
    margin: 0px 0px 0px auto;
    box-shadow: 0px 0px 5px 0px black;
    width: 630px;
  }
`;

export function stylesMaterialUI() {
  return {
    tableHeadRow: {
      height: '30px !important'
    },
    tableHeadCell: {
      fontFamily: '"TrajanPro" !important',
      fontSize: '12px',
      color: 'white',
      backgroundColor: '#222229'
    }
  };
}
