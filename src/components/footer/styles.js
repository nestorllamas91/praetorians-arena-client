import css from 'styled-jsx/css';

export default css`
  .footer-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    background: url('/images/textures/rock.jpg');
    background-size: 8%;
  }
  .footer-container::before,
  .footer-container::after {
    content: '';
    position: absolute;
    top: -36px;
    width: 100%;
    height: 72px;
    background: url('/images/various/divider.png');
    background-size: auto 200%;
    z-index: 0;
  }
  .footer-container::before {
    left: 0;
  }
  .footer-container::after {
    right: 0;
    background-position: 100% 100%;
  }
  .footer-container > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin: 40px auto 30px auto;
    height: 170px;
  }
  .footer-container > div > img {
    width: 500px;
  }
  .footer-container > div > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 36px;
  }
  .footer-container > div > div > div {
    display: flex;
    justify-content: space-between;
    width: 380px;
  }
  .footer-container > div > div * {
    font-size: 16px;
    font-weight: normal !important;
    color: lightgray !important;
  }
  .symbol {
    font-size: 13px !important;
  }
`;
