import css from 'styled-jsx/css';

export default css`
  .green-color {
    color: green;
  }
  .blue-color {
    color: blue;
  }
  .red-color {
    color: red;
  }
  .action {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export function stylesMaterialUI() {
  return {
    tableBodyRow: {
      height: '60px'
    },
    tableBodyCell: {
      borderBottom: '1px solid gray'
    }
  };
}
