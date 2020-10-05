import css from 'styled-jsx/css';

export default css`
  .filters {
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
    border-bottom: 1px solid lightgray;
    width: 100%;
    background-color: #e8e8e8;
  }
  .filters-head {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    text-align: center;
    height: 20px;
    font-weight: bold;
    font-size: 22px;
    background-color: #feb645;
    box-shadow: 0px 0px 5px 5px #feb645;
  }
  .filters-body {
    display: flex;
    flex-flow: column wrap;
    justify-content: space-between;
    align-content: space-between;
    margin: 20px auto;
    padding: 20px 20px 0px 20px;
    width: 100%;
    height: 140px;
  }
  .filters-body > div > span {
    display: block;
    font-size: 14px;
    font-weight: bold;
  }
  .button-clear {
    display: flex;
    justify-content: center;
    margin: 0px auto 20px auto;
  }
`;

export const stylesSyncfusion = css.global`
  .date-range-picker {
    width: 270px !important;
  }
  .date-range-picker .e-input {
    padding: 5px 0px 0px 0px !important;
    height: 25px !important;
    min-height: 25px !important;
    font-size: 14px !important;
  }
  .date-range-picker .e-input-group-icon {
    margin: 4px 0px 2px 0px !important;
  }
  .date-range-picker .e-weekend .e-day {
    color: #ff0000;
  }
  .combo-box {
    width: 270px !important;
  }
  .combo-box .e-input {
    padding: 5px 0px 0px 0px !important;
    height: 25px !important;
    min-height: 25px !important;
    font-size: 14px !important;
  }
  .combo-box .e-input-group-icon {
    margin: 10px 0px 2px 0px !important;
  }
  .multi-select {
    width: 270px !important;
  }
  .multi-select .e-multi-select-wrapper {
    padding: 0 !important;
  }
  .multi-select .e-multi-select-wrapper input {
    padding: 5px 0px 0px 0px !important;
    height: 25px !important;
    min-height: 25px !important;
    font-size: 14px !important;
  }
  .multi-select span.e-delim-values,
  .multi-select .e-delim-values .e-remain {
    vertical-align: bottom !important;
    line-height: 0 !important;
    font-size: 14px !important;
  }
  .multi-select .e-input-group-icon {
    margin: 10px 0px 2px 0px !important;
  }
`;
