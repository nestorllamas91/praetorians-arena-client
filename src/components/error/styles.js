import css from 'styled-jsx/css';

export default css`
  .error-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 60px auto;
    padding: 60px;
    width: 60vw;
    min-width: 700px;
    background-color: #dbb479;
    border: 12px solid transparent;
    border-image: url('/images/various/frame.png') 20;
  }
  .message {
    margin-right: 30px;
  }
  .code {
    font-size: 40px;
  }
  .code-server {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 100px;
  }
  .explanation {
    margin-top: 70px;
    font-size: 20px;
  }
`;
