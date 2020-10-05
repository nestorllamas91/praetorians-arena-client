import css from 'styled-jsx/css';

export default css`
  .rankings-container {
    margin-top: 20px !important;
  }
  .subtitle {
    margin: 120px 0px 15px 0px !important;
    text-align: center;
    color: gold;
    text-shadow: -1px 0 5px black, 0 1px 5px black, 1px 0 5px black, 0 -1px 5px black;
  }
  .selector-competition {
    display: flex;
    justify-content: center;
  }
  .selector {
    margin: 0px 20px;
    border: 12px solid transparent;
    border-image: url('/images/various/frame.png') 20;
    width: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .selector > a {
    padding: 30px;
    width: 100%;
    height: 100%;
    font-family: 'TrajanPro' !important;
    font-size: 14px;
    text-align: center;
    color: white !important;
    background-color: sienna;
  }
  .selector > a:hover {
    color: black !important;
    background-color: goldenrod;
  }
  .active-page > a {
    color: black !important;
    background-color: goldenrod;
  }
  .panels-selection {
    margin-top: 5px;
  }
  .panel-selection {
    margin-bottom: 10px;
  }
  .label-panel-selection {
    display: inline-block;
    margin-bottom: 5px;
  }
  .ranking {
    display: flex;
    flex-direction: column;
  }
  .no-ranking {
    margin: 15px auto 0px auto;
    border-radius: 50px;
    padding: 15px 25px;
    color: #004085;
    background-color: #cde5fd;
  }
  .ranking-table {
    margin-top: 20px;
  }
  .combats-list {
    margin-top: 50px;
  }
  .first-heading {
    margin-top: 0px !important;
  }
  .my-heading {
    text-align: center;
  }
`;
