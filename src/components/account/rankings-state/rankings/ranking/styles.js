import css from 'styled-jsx/css';

export default css`
  .state-inscription {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 65px;
  }
  .button-playing {
    margin-bottom: 2px;
  }
`;

export function stylesMaterialUI() {
  return {
    tableBodyRow: {
      height: '75px'
    },
    tableBodyCell: {
      borderBottom: '1px solid gray'
    }
  };
}
