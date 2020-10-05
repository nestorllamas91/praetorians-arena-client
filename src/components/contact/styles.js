import css from 'styled-jsx/css';

export default css`
  .name-email {
    display: flex;
    justify-content: space-between;
  }
  .button-send {
    display: flex;
    justify-content: center;
    margin-top: 5px;
  }
`;

export const stylesGlobal = css.global`
  .form {
    margin-top: 30px;
  }
  .form-group {
    margin-bottom: 20px;
  }
  .form-group-name-email {
    width: 49%;
  }
  .form-label {
    margin-bottom: 8px;
  }
  .form-control {
    background-color: #e2e2e2 !important;
  }
`;
