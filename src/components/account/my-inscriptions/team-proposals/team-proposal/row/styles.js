import css from 'styled-jsx/css';

export default css`
  .player {
    display: flex;
    justify-content: center;
  }
  .player:not(:last-child) {
    margin-bottom: 4px;
  }
  .nickname {
    margin-right: 10px;
  }
  .state-accepted-refused {
    display: inline-block;
  }
  .state-accepted-refused > div {
    display: flex;
    align-items: center;
  }
  .state-accepted-refused > div > img {
    margin-right: 4px;
    width: 20px;
  }
`;

export function stylesMaterialUI() {
  return {
    tableBodyRow: {
      height: '100px'
    },
    tableBodyCell: {
      borderBottom: '1px solid gray'
    }
  };
}
