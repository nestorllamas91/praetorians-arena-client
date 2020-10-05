import css from 'styled-jsx/css';

export default css`
  .main-header {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    align-items: center;
    padding-top: 28%;
  }
  .main-header-home {
    position: relative;
    width: 100%;
    height: 75vh;
  }
  .my-container {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .my-container > div {
    display: flex;
    justify-content: center;
    align-items: center;
    background-size: 100% 100%, fill;
  }
  .overlay {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 45%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
  }
  .video {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
  }
  .spqr {
    position: absolute;
    left: 0px;
    right: 0px;
    bottom: -100px;
    margin: 0px auto;
    z-index: 1;
  }
  .header-info {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
  .header-info * {
    font-family: 'TrajanPro' !important;
    color: white;
    text-shadow: -1px 0 3px black, 0 1px 3px black, 1px 0 3px black, 0 -1px 3px black;
  }
  .description-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 50px 0px;
    height: 90px;
    font-size: 34px;
  }
  .buttons-watch-buy {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 340px;
  }
  .button-watch,
  .button-buy {
    border: 1px solid darkgray;
    padding: 15px 25px;
    font-size: 14px;
    font-weight: bold;
    background-color: #424242;
  }
  .button-buy {
    text-decoration: none !important;
    color: white !important;
  }
  .button-watch:hover,
  .button-buy:hover {
    background-color: #804000;
  }
  .header-info > img {
    width: 550px;
  }
  .\/competitions,
  .\/competitions\/\[rankingId\] {
    background: url('/images/headers/competitions.jpg') no-repeat;
    background-size: cover;
  }
  .\/games {
    background: url('/images/headers/games.jpg') no-repeat;
    background-size: cover;
  }
  .\/players {
    background: url('/images/headers/players.jpg') no-repeat;
    background-size: cover;
  }
  .\/stats {
    background: url('/images/headers/statistics.jpg') no-repeat;
    background-size: cover;
  }
  .\/info {
    background: url('/images/headers/information.jpg') no-repeat;
    background-size: cover;
  }
  .\/contact {
    background: url('/images/headers/contact.jpg') no-repeat;
    background-size: cover;
  }
  .\/account\/profile,
  .\/account\/notifications,
  .\/account\/my-inscriptions,
  .\/account\/my-inscriptions\/team-inscription,
  .\/account\/my-rankings,
  .\/account\/my-rankings\/ranking,
  .\/account\/my-combats,
  .\/account\/my-combats\/combat,
  .\/account\/rankings-state {
    background: url('/images/headers/account.jpg') no-repeat;
    background-size: cover;
  }
  .\/terms,
  .\/privacy,
  .\/license {
    background: url('/images/headers/legal.jpg') no-repeat;
    background-size: cover;
  }
`;

export const stylesGlobal = css.global`
  .image-gallery {
    width: 100%;
  }
  .image-gallery-image {
    object-fit: cover !important;
    height: 75vh;
  }
  .image-gallery-bullets {
    bottom: 120px;
  }
`;
