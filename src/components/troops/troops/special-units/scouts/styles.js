import css from 'styled-jsx/css';

export default css`
  .container-table {
    display: flex;
  }
`;

export function stylesMaterialUI() {
  return {
    tableBody: {
      backgroundColor: 'bisque'
    },
    tableBodyRow: {
      height: '40px !important'
    },
    tableBodyCell: {
      borderBottom: '1px solid gray !important'
    }
  };
}
