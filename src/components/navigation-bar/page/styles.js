import css from 'styled-jsx/css';

export default css`
  .item {
    position: relative;
    display: flex;
    align-items: center;
    font-family: 'TrajanPro' !important;
    font-size: 16px;
    font-weight: normal;
    color: white !important;
    text-shadow: -1px 0 3px black, 0 1px 3px black, 1px 0 3px black, 0 -1px 3px black;
  }
  .item:hover,
  .active-page {
    color: gold !important;
  }
  @media screen and (min-width: 2000px) {
    .item {
      padding: 10px 16px;
    }
  }
  @media screen and (min-width: 1500px) and (max-width: 2000px) {
    .item {
      padding: 10px 12px;
    }
  }
  @media screen and (min-width: 1000px) and (max-width: 1500px) {
    .item {
      padding: 10px 8px;
    }
  }
  @media screen and (max-width: 1000px) {
    .item {
      padding: 10px 4px;
    }
  }
  .menu1,
  .menu2 {
    background-color: #171a21;
  }
  .menu1 a {
    padding: 10px 12px;
    display: block;
    font-family: 'TrajanPro' !important;
    font-size: 12px;
    color: white !important;
    text-shadow: -1px 0 1px black, 0 1px 1px black, 1px 0 1px black, 0 -1px 1px black;
  }
  .menu1-rankings > li > a,
  .menu2-rankings > li > a {
    text-align: center;
  }
  .menu1-help > li > a {
    text-align: left;
  }
  .menu1 a:hover {
    color: gold !important;
  }
  .menu1-container ul {
    display: none;
    position: absolute;
    min-width: 150px;
    border-bottom: 2px solid black;
    border-left: 2px solid black;
  }
  .menu1-container:hover > ul,
  .menu1-container li:hover > ul {
    display: block;
  }
  .menu1-container ul li {
    position: relative;
  }
  .menu1-container ul li:hover {
    position: relative;
  }
  .menu1-container ul li ul {
    top: 0px;
    right: -150px;
  }
`;
