import css from 'styled-jsx/css';

export default css`
  .general-container {
    z-index: 1;
  }
  .logo-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .logo {
    width: 180px;
    filter: drop-shadow(0px 0px 0px black);
  }
  .logo:hover {
    filter: drop-shadow(0px 0px 0px white);
  }
  .nav-container {
    display: flex;
    margin: 0px 40px 0px 16px;
    list-style-type: none;
  }
  .button-login:hover {
    filter: drop-shadow(0px 0px 2px gold);
  }
  .span-active {
    margin-left: 3px;
    color: gold;
  }
  .span-inactive {
    margin-left: 3px;
    color: white;
  }
  .avatar-playername {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .avatar {
    margin-right: 8px;
    border: 2px solid #3d697b;
  }
`;

export function stylesMaterialUI() {
  return {
    appbar: {
      'border-bottom': '2px solid black',
      'background-color': '#171a21'
    },
    toolbar: {
      display: 'flex',
      'justify-content': 'center',
      'align-items': 'center',
      height: '80px',
      '& > div': {
        display: 'flex'
      }
    },
    'icon-button-root': {
      padding: '6px',
      '&:hover': {
        'background-color': 'transparent'
      }
    },
    'icon-button-label': {
      display: 'flex',
      'font-size': '16px',
      color: 'white',
      'text-shadow': '-1px 0px 1px black, 0px 1px 1px black, 1px 0px 1px black, 0px -1px 1px black',
      '&:hover *:not(.MuiBadge-badge)': {
        color: 'gold !important'
      }
    },
    badge: {
      right: '8px',
      height: '16px',
      'text-shadow': 'none !important'
    }
  };
}
