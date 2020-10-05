import css from 'styled-jsx/css';

export default css`
  .upload-combat {
    display: flex;
    justify-content: center;
  }
`;

export const stylesSyncfusion = css.global`
  .step {
    border: 1px solid gray;
    border-radius: 5px;
    background-color: #fffbe7;
  }
  .step1 {
    padding: 20px 20px 5px 20px;
    margin-bottom: 15px;
  }
  .step2 {
    margin-bottom: 15px;
    padding: 20px;
  }
  .step3 {
    margin-bottom: 20px;
    padding: 20px 20px 0px 20px;
  }
  .step-description1 {
    display: block;
    margin-bottom: 5px;
  }
  .step-description2 {
    display: block;
    margin-bottom: 15px;
  }
  .step-description3 {
    display: block;
    margin-bottom: 15px;
  }
  .uploader-container {
    display: flex;
    flex-direction: column;
  }
  .form-container {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
  }
  .game-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .game-container:not(:last-child) {
    margin-right: 39px;
  }
  .label-game {
    margin-bottom: 5px;
    font-weight: bold;
  }
  .uploader {
    border: 3px dashed darkgray;
    width: 15vw;
  }
  .uploader > .e-file-select-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0;
    height: 200px;
  }
  .uploader > .e-file-select-wrap > .e-btn {
    margin: 30px 0px 0px 0px;
    padding: 6px 16px 6px 16px;
    background-color: #e8eaed;
  }
  .uploader > .e-file-select-wrap > .e-file-drop {
    margin: 30px 0px 0px 0px;
    font-size: 20px;
    color: rgba(0, 0, 0, 0.5);
  }
  .game-preview-block {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .game-preview-block:not(:last-child) {
    margin: 20px auto;
    width: 1020px;
  }
  .game-preview-block:last-child {
    margin: 20px auto 0px auto;
    width: 1020px;
  }
  .game-preview-label {
    display: block;
    margin-bottom: 10px;
    font-weight: bold;
  }
  .game-preview-data {
    box-shadow: 0px 0px 5px 0px black;
  }
`;

export function stylesMaterialUI() {
  return {
    'combat-result': {
      display: 'flex',
      'flex-direction': 'row',
      'justify-content': 'space-between',
      'margin-left': '30px',
      width: '150px'
    }
  };
}
