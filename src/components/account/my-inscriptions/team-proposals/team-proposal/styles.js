import css from 'styled-jsx/css';

export default css`
  .team-proposal {
    box-shadow: 0px 0px 5px 0px black;
  }
`;

export function stylesMaterialUI() {
  return {
    tableHeadCell: {
      fontFamily: '"TrajanPro" !important',
      fontSize: '12px',
      color: 'white',
      backgroundColor: '#222229'
    },
    tableBody: {
      backgroundImage: 'url("/images/textures/scribble.jpg")'
    }
  };
}
