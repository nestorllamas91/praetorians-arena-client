import React, { Fragment, useState, useEffect, useRef } from 'react';
import styles, { stylesMaterialUI, stylesSyncfusion } from '$root/components/account/my-combats/my-combat/styles';
import { withStyles } from '@material-ui/styles';

import axios from 'axios';
import { dateLocaltoUTC, dateUTCtoLocal } from '$root/utils/functions';
import { fixRankingSelectors } from '$root/utils/functions';
import maps from '$root/utils/maps';
import moment from 'moment';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import withReactContent from 'sweetalert2-react-content';

import Form from 'react-bootstrap/Form';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Game from '$root/components/games/game/component';
import NoSsr from '@material-ui/core/NoSsr';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Swal from 'sweetalert2';
import { UploaderComponent } from '@syncfusion/ej2-react-inputs';

function MyCombat(props) {
  const { classes } = props;
  const MySwal = withReactContent(Swal);
  const router = useRouter();
  let combatId = null;
  if (router) {
    combatId = router.query.combatId;
  }
  const [combatError, setCombatError] = useState(null);
  const [combat, setCombat] = useState(null);
  const [season, setSeason] = useState('');
  const [competition, setCompetition] = useState('');
  const [combatResult, setCombatResult] = useState('2-0');
  const [combatDataPreview, setCombatDataPreview] = useState([]);
  let combatFileA = useRef(null);
  let combatFileB = useRef(null);
  let combatFileC = useRef(null);
  let combatFileD = useRef(null);
  let combatFileE = useRef(null);
  let formComments = useRef(null);
  let fileIndex = 0;

  useEffect(() => {
    if (combatId) {
      getCombat();
    }
  }, [combatId]);

  async function getCombat() {
    try {
      const url = `/account/my-combats/combat/${combatId}`;
      const res = await axios.get(url);
      setCombat(res.data);
      const { season, competition } = fixRankingSelectors(res.data.season, res.data.competition);
      setSeason(season);
      setCompetition(competition);
    } catch (err) {
      setCombatError(err.response.data);
    }
  }

  function handleCombatResult(event) {
    if (event.target.value === '2-0') {
      combatFileC.current.clearAll();
      combatFileD.current.clearAll();
      combatFileE.current.clearAll();
    }
    if (event.target.value === '2-1') {
      combatFileA.current.clearAll();
      combatFileB.current.clearAll();
    }
    setCombatResult(event.target.value);
    setCombatDataPreview([]);
  }

  function handleSelectionGame(event, combatFile) {
    const gameFile = event.filesData[0].rawFile;
    let fileReader = new FileReader();
    fileReader.readAsArrayBuffer(gameFile);
    fileReader.onload = function () {
      let byteData = new Uint8Array(fileReader.result);
      let lengthByteData = byteData.byteLength;
      let decodedByteData = '';
      for (let j = 0; j < lengthByteData; j++) {
        decodedByteData += String.fromCharCode(byteData[j]);
      }
      let gameData = getSequenceData(decodedByteData, gameFile);
      gameData.arenaData = {};
      gameData.arenaData.season = combat.season;
      gameData.arenaData.competition = combat.competition;
      gameData.arenaData.rankingID = combat.rankingId;
      gameData.arenaData.combatID = combat.combatId;
      let combatDataPreviewCopy = combatDataPreview.slice();
      if (combatFile === 'combatFileA') {
        combatDataPreviewCopy[0] = {
          label: 'Game 1 (1-0)',
          gameData: gameData
        };
      }
      if (combatFile === 'combatFileB') {
        combatDataPreviewCopy[1] = {
          label: 'Game 2 (2-0)',
          gameData: gameData
        };
      }
      if (combatFile === 'combatFileC') {
        combatDataPreviewCopy[0] = {
          label: 'Game 1 (1-0 or 0-1)',
          gameData: gameData
        };
      }
      if (combatFile === 'combatFileD') {
        combatDataPreviewCopy[1] = {
          label: 'Game 2 (1-1)',
          gameData: gameData
        };
      }
      if (combatFile === 'combatFileE') {
        combatDataPreviewCopy[2] = {
          label: 'Game 3 (2-1)',
          gameData: gameData
        };
      }
      setCombatDataPreview(combatDataPreviewCopy);
    };
  }

  function handleCleaningGame(event, combatFile) {
    let combatDataPreviewCopy = combatDataPreview.slice();
    if (combatFile === 'combatFileA') {
      delete combatDataPreviewCopy[0];
    }
    if (combatFile === 'combatFileB') {
      delete combatDataPreviewCopy[1];
    }
    if (combatFile === 'combatFileC') {
      delete combatDataPreviewCopy[0];
    }
    if (combatFile === 'combatFileD') {
      delete combatDataPreviewCopy[1];
    }
    if (combatFile === 'combatFileE') {
      delete combatDataPreviewCopy[2];
    }
    setCombatDataPreview(combatDataPreviewCopy);
  }

  async function handleUpload(event) {
    event.preventDefault();
    MySwal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: 'You are going to upload the games for this combat.',
      width: '550px',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    }).then(async result => {
      if (result.value) {
        try {
          let myCombat = new FormData();
          const info = {
            season: combat.season,
            competition: combat.competition,
            rankingID: combat.rankingId,
            combatID: combat.combatId
          };
          myCombat.append('info', JSON.stringify(info));
          let numGames = 0;
          if (combatResult === '2-0') {
            if (combatFileA.current !== null) {
              numGames++;
            }
            if (combatFileB.current !== null) {
              numGames++;
            }
            if (numGames === 2) {
              myCombat.append('files', combatFileA.current.filesData[0].rawFile);
              myCombat.append('files', combatFileB.current.filesData[0].rawFile);
            }
          }
          if (combatResult === '2-1') {
            if (combatFileC.current !== null) {
              numGames++;
            }
            if (combatFileD.current !== null) {
              numGames++;
            }
            if (combatFileE.current !== null) {
              numGames++;
            }
            if (numGames === 3) {
              myCombat.append('files', combatFileC.current.filesData[0].rawFile);
              myCombat.append('files', combatFileD.current.filesData[0].rawFile);
              myCombat.append('files', combatFileE.current.filesData[0].rawFile);
            }
          }
          myCombat.append('data', JSON.stringify(combatDataPreview));
          const url = '/account/my-combats/upload';
          const config = { headers: { 'Content-Type': 'multipart/form-data' } };
          await axios.post(url, myCombat, config);
          if (combatResult === '2-0') {
            combatFileA.current.clearAll();
            combatFileB.current.clearAll();
          }
          if (combatResult === '2-1') {
            combatFileC.current.clearAll();
            combatFileD.current.clearAll();
            combatFileE.current.clearAll();
          }
          MySwal.fire({
            icon: 'success',
            title: 'Games uploaded!',
            text: 'The games for this combat have been uploaded.',
            width: '550px'
          });
        } catch (err) {
          MySwal.fire({
            icon: 'error',
            title: 'Games not uploaded!',
            text: 'The games for this combat could not be uploaded.',
            width: '550px'
          });
        }
      }
    });
  }

  function getSequenceData(decodedByteData, sequenceFile) {
    let sequenceData = { fileData: {}, gameData: {}, teamsData: [] },
      foo = '';

    sequenceData.fileData.filenamePlayer = sequenceFile.name;
    if (sequenceData.fileData.filenamePlayer.length > 47) {
      sequenceData.fileData.filenamePlayer = sequenceData.fileData.filenamePlayer.substr(0, 44) + '...';
    }
    sequenceData.fileData.size = formatBytes(sequenceFile.size);
    sequenceData.fileData.uploadDate = {};
    const {
      uploadFullDateISOUTC,
      uploadDateUTC,
      uploadTimeUTC,
      uploadFullDateISOLocal,
      uploadDateLocal,
      uploadTimeLocal
    } = getUploadDate();
    sequenceData.fileData.uploadDate.uploadFullDateISOUTC = uploadFullDateISOUTC;
    sequenceData.fileData.uploadDate.uploadDateUTC = uploadDateUTC;
    sequenceData.fileData.uploadDate.uploadTimeUTC = uploadTimeUTC;
    sequenceData.fileData.uploadDate.uploadFullDateISOLocal = uploadFullDateISOLocal;
    sequenceData.fileData.uploadDate.uploadDateLocal = uploadDateLocal;
    sequenceData.fileData.uploadDate.uploadTimeLocal = uploadTimeLocal;
    sequenceData.fileData.uploaderPlayer = 'Néstor';
    foo = fread(decodedByteData, 8);
    foo = fgetc(decodedByteData);
    foo = fread(decodedByteData, 3);
    sequenceData.gameData.playTime = convertToTime(getInteger(decodedByteData, 4));
    let playDateLocalUnfixed = getString(decodedByteData, 1);
    let playTimeLocalUnfixed = getString(decodedByteData, 1);
    sequenceData.gameData.playDate = {};
    const {
      playFullDateISOUTC,
      playDateUTC,
      playTimeUTC,
      playFullDateISOLocal,
      playDateLocal,
      playTimeLocal
    } = getPlayDate(playDateLocalUnfixed, playTimeLocalUnfixed);
    sequenceData.gameData.playDate.playFullDateISOUTC = playFullDateISOUTC;
    sequenceData.gameData.playDate.playDateUTC = playDateUTC;
    sequenceData.gameData.playDate.playTimeUTC = playTimeUTC;
    sequenceData.gameData.playDate.playFullDateISOLocal = playFullDateISOLocal;
    sequenceData.gameData.playDate.playDateLocal = playDateLocal;
    sequenceData.gameData.playDate.playTimeLocal = playTimeLocal;
    let mapFilename = getString(decodedByteData, 1);
    sequenceData.gameData.map = {};
    let unknown = {
      id: 0,
      name: 'unknown',
      filename: 'unknown',
      imageFilename: '/images/maps/unknown.png'
    };
    for (const prop in maps) {
      maps[prop].map(map => {
        if (map.filename === mapFilename) {
          sequenceData.gameData.map.id = map.id;
          sequenceData.gameData.map.name = map.name;
          sequenceData.gameData.map.filename = map.filename;
          sequenceData.gameData.map.imageFilename = map.imageFilename;
        }
      });
    }
    if (sequenceData.gameData.map.id === undefined) {
      sequenceData.gameData.map.id = unknown.id;
      sequenceData.gameData.map.name = unknown.name;
      sequenceData.gameData.map.filename = unknown.filename;
      sequenceData.gameData.map.imageFilename = unknown.imageFilename;
    }
    foo = fread(decodedByteData, 3);
    sequenceData.gameData.numPlayers = getInteger(decodedByteData, 1);
    foo = fread(decodedByteData, 2);

    let players = [];
    for (let i = 0; i < sequenceData.gameData.numPlayers; i++) {
      foo = ord(fread(decodedByteData, 1));
      let isCpu = getInteger(decodedByteData, 1);
      let player = {};
      player.steamNickname = getString(decodedByteData, 2);
      if (!isCpu) {
        player.id = getString(decodedByteData, 2); // New sequence pattern.
      } else {
        player.id = undefined;
        foo = getInteger(decodedByteData, 1); // New sequence pattern.
      }
      player.civilization = getString(decodedByteData, 1);
      players.push(player);
      foo = fread(decodedByteData, 20);
      let numTroops = getInteger(decodedByteData, 1);
      foo = fread(decodedByteData, 2);
      skipelement(numTroops, decodedByteData);
    }
    let ID =
      mdechex(fgetc(decodedByteData)) +
      mdechex(fgetc(decodedByteData)) +
      mdechex(fgetc(decodedByteData)) +
      mdechex(fgetc(decodedByteData)) +
      mdechex(fgetc(decodedByteData)) +
      mdechex(fgetc(decodedByteData));
    while (ID != '450000800000' && decodedByteData.length - 1 > fileIndex) {
      ID = ID.substr(2) + mdechex(fgetc(decodedByteData));
    }
    foo = fread(decodedByteData, 4);
    foo = getInteger(decodedByteData, 1);
    for (let i = 0; i < 8; i++) {
      sequenceData.teamsData[i] = {};
      sequenceData.teamsData[i].playersData = [];
    }
    let maxScore = 0;
    for (let i = 0; i < sequenceData.gameData.numPlayers; i++) {
      let player = {};
      player.recorder = getInteger(decodedByteData, 1);
      player.winner = getInteger(decodedByteData, 1);
      player.color = getInteger(decodedByteData, 1);
      player.team = getInteger(decodedByteData, 1);
      player.score = getInteger(decodedByteData, 4);
      if (player.score >= maxScore) {
        maxScore = player.score;
      }
      foo = getInteger(decodedByteData, 4);
      player.playTime = convertToTime(getInteger(decodedByteData, 4));
      player.unitsTrained = getInteger(decodedByteData, 4);
      player.kills = getInteger(decodedByteData, 4);
      player.losses = getInteger(decodedByteData, 4);
      player.steamNickname = getString(decodedByteData, 2);
      foo = getInteger(decodedByteData, 1); // New sequence pattern.
      foo = getString(decodedByteData, 2);
      const iconsFolder = '/images/countries/';
      let country = {
        countryShortName: 'Central African Republic',
        countryFullName: 'Central African Republic',
        continent: 'Africa',
        timeOffset: 'UTC+01:00',
        flagFilename: iconsFolder + 'africa/central-african-republic.png'
      };
      player.country = {};
      player.country.countryShortName = country.countryShortName;
      player.country.countryFullName = country.countryFullName;
      player.country.continent = country.continent;
      player.country.timeOffset = country.timeOffset;
      player.country.flagFilename = country.flagFilename;
      for (let j = 0; j < players.length; j++) {
        if (player.steamNickname === players[j].steamNickname) {
          switch (players[j].civilization) {
            case 'ROMANOS':
              player.civilization = 'Romans';
              break;
            case 'BARBAROS':
              player.civilization = 'Barbarians';
              break;
            case 'EGIPCIOS':
              player.civilization = 'Egyptians';
          }
          sequenceData.teamsData[player.team - 1].playersData.push(player);
          if (sequenceData.teamsData[player.team - 1].winner === undefined) {
            sequenceData.teamsData[player.team - 1].winner = player.winner === 1 ? true : false;
          }
        }
      }
    }
    for (let i = 0; i < sequenceData.teamsData.length; i++) {
      for (let j = 0; j < sequenceData.teamsData[i].playersData.length; j++) {
        if (sequenceData.teamsData[i].playersData[j].score === maxScore) {
          sequenceData.teamsData[i].playersData[j].bestScore = true;
        } else {
          sequenceData.teamsData[i].playersData[j].bestScore = false;
        }
      }
    }
    sequenceData.teamsData = sequenceData.teamsData.filter(teamData => {
      return teamData.playersData.length > 0;
    });
    sequenceData.teamsData.sort((teamX, teamY) => teamY.playersData.length - teamX.playersData.length);
    sequenceData.teamsData.sort((teamX, teamY) => (teamX.winner === teamY.winner ? 0 : teamX.winner ? -1 : 1));
    sequenceData.gameData.modality = '';
    for (let i = 0; i < sequenceData.teamsData.length; i++) {
      sequenceData.gameData.modality += sequenceData.teamsData[i].playersData.length;
      if (i < sequenceData.teamsData.length - 1) {
        sequenceData.gameData.modality += ' vs. ';
      }
    }

    return sequenceData;
  }

  function getUploadDate() {
    const uploadFullDateISOUTC = moment.utc().format();
    const uploadDateUTC = moment.utc().format('D MMMM YYYY');
    const uploadTimeUTC = moment.utc().format('h:mm a (UTCZ)');
    const { fullDateISOLocal, dateLocal, timeLocal } = dateUTCtoLocal(uploadFullDateISOUTC);
    const uploadFullDateISOLocal = fullDateISOLocal;
    const uploadDateLocal = dateLocal;
    const uploadTimeLocal = timeLocal;
    return {
      uploadFullDateISOUTC,
      uploadDateUTC,
      uploadTimeUTC,
      uploadFullDateISOLocal,
      uploadDateLocal,
      uploadTimeLocal
    };
  }

  function getPlayDate(playDateLocal, playTimeLocal) {
    playDateLocal = playDateLocal.replace(/\//g, '-');
    playDateLocal = playDateLocal.replace(/\. /g, '-');
    playDateLocal = playDateLocal.replace(/\./g, '-');
    playDateLocal = playDateLocal.replace(/ /g, '-');
    const playDateLocalParts = playDateLocal.split('-');
    let indexDay = -1;
    let indexMonth = -1;
    let indexYear = -1;
    if (props.dateFormat === 'DMY') {
      indexDay = 0;
      indexMonth = 1;
      indexYear = 2;
    } else {
      if (props.dateFormat === 'MDY') {
        indexDay = 1;
        indexMonth = 0;
        indexYear = 2;
      } else {
        indexDay = 2;
        indexMonth = 1;
        indexYear = 0;
      }
    }
    const yearOfPlayDateLocal =
      playDateLocalParts[indexYear].length === 4 ? playDateLocalParts[indexYear] : '20' + playDateLocalParts[indexYear];
    const monthOfPlayDateLocal = playDateLocalParts[indexMonth];
    const dayOfPlayDateLocal = playDateLocalParts[indexDay];
    let playFullDateISOLocal = `${yearOfPlayDateLocal}-${monthOfPlayDateLocal}-${dayOfPlayDateLocal}T${playTimeLocal}`;
    const { fullDateISOUTC, dateUTC, timeUTC, timeOffset } = dateLocaltoUTC(playFullDateISOLocal);
    const playFullDateISOUTC = fullDateISOUTC;
    const playDateUTC = dateUTC;
    const playTimeUTC = timeUTC;
    playFullDateISOLocal = `${playFullDateISOLocal}${timeOffset}`;
    playDateLocal = moment(playFullDateISOLocal).format('D MMMM YYYY');
    playTimeLocal = moment(playFullDateISOLocal).format('h:mm a (UTCZ)');
    return {
      playFullDateISOUTC,
      playDateUTC,
      playTimeUTC,
      playFullDateISOLocal,
      playDateLocal,
      playTimeLocal
    };
  }

  function ord(abyte) {
    return abyte.toString();
  }

  function fgetc(sequence_data) {
    var oldfpos = fileIndex;
    fileIndex++;
    return sequence_data.charCodeAt(oldfpos);
  }

  function fread(sequence_data, anzahl) {
    var result;
    for (var i = 0; i < anzahl; i++) {
      result = result + fgetc(sequence_data);
    }
    return result;
  }

  function skipelement(nr, sequence_data) {
    for (var ni = 0; ni < nr; ni++) {
      var id = ord(fread(sequence_data, 1));
      var foo = { id: id, value: getString(sequence_data, 1) };
    }
  }

  function mdechex(aByte) {
    var byteStr = aByte.toString(16);
    if (byteStr.length < 2) {
      byteStr = '0' + byteStr;
    }
    return byteStr;
  }

  function getInteger(sequence_data, bytelong) {
    var anint = 0;
    if (bytelong > 0) {
      anint += parseInt(ord(fgetc(sequence_data)));
    }
    if (bytelong > 1) {
      anint += parseInt(ord(fgetc(sequence_data))) * 256;
    }
    if (bytelong > 2) {
      anint += parseInt(ord(fgetc(sequence_data))) * 256 * 256;
    }
    if (bytelong > 3) {
      anint += parseInt(ord(fgetc(sequence_data))) * 256 * 256 * 256;
    }
    return anint;
  }

  function getString(sequence_data, bytelong) {
    var scount = ord(fgetc(sequence_data));
    var result_string = '';
    if (scount > 0) {
      for (var ii = 0; ii < scount; ii++) {
        if (bytelong == 1) {
          result_string += String.fromCharCode(fgetc(sequence_data));
        }
        if (bytelong == 2) {
          result_string += String.fromCharCode(fgetc(sequence_data));
          fileIndex++;
        }
      }
    }
    return result_string;
  }

  function convertToTime(time) {
    var total_seconds = Math.floor(time / 15.16285);
    var hourn = Math.floor(total_seconds / (60 * 60));
    var seconds_remaining = Math.floor(total_seconds - hourn * (60 * 60));
    var minutes = Math.floor(seconds_remaining / 60);
    var seconds = seconds_remaining - minutes * 60;
    return (
      (hourn < 10 ? '0' + hourn + ':' : hourn + ':') +
      (minutes < 10 ? '0' + minutes + ':' : minutes + ':') +
      (seconds < 10 ? '0' + seconds : seconds)
    );
  }

  function formatBytes(size) {
    let c = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let d = Math.floor(Math.log(size) / Math.log(1024));
    if (size === 0) {
      return '0 B';
    } else {
      return (
        parseFloat(
          new Intl.NumberFormat('en-US', {
            maximumFractionDigits: 2
          }).format(size / Math.pow(1024, d))
        ) +
        ' ' +
        c[d]
      );
    }
  }

  return (
    <div className="main-container">
      {!combat || !combatId ? (
        <Fragment></Fragment>
      ) : (
        <div>
          <h2 className="heading2">Information</h2>
          <hr />
          <ul className="unordered-list">
            <li>Season: {season}</li>
            <li>Competition: {competition}</li>
            <li>Ranking ID: {combat.rankingId}</li>
            <li>Combat ID: {combat.combatId}</li>
            <li>Start Date: {moment(combat.startDate).format('D MMMM YYYY h:mm a (UTCZ)')}</li>
            <li>End Date: {moment(combat.endDate).format('D MMMM YYYY h:mm a (UTCZ)')}</li>
            <li>
              Opponents: {combat.opponents.teamName1} vs. {combat.opponents.teamName2}
            </li>
          </ul>
          <h2 className="heading2">Requirements</h2>
          <hr />
          <ol className="ordered-list">
            <li>You must have played with your real opponent/s of the combat.</li>
            <li>You must be the representant of the winner team of the combat.</li>
            <li>
              You must have saved all the game files of the combat (2 for the result 2-0 or 3 for the result 2-1).
            </li>
          </ol>
          <h2 className="heading2">Steps</h2>
          <hr />
          <div className="step step1">
            <span className="step-description1">
              <b>STEP 1</b>. Select the result of the combat.
            </span>
            <NoSsr>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="position"
                  name="position"
                  value={combatResult}
                  onChange={handleCombatResult}
                  row
                  classes={{ root: classes['combat-result'] }}
                >
                  <FormControlLabel value="2-0" control={<Radio color="primary" />} label="2-0" labelPlacement="end" />
                  <FormControlLabel value="2-1" control={<Radio color="primary" />} label="2-1" labelPlacement="end" />
                </RadioGroup>
              </FormControl>
            </NoSsr>
          </div>
          <div className="step step2">
            <div className="uploader-container">
              <span className="step-description2">
                <b>STEP 2</b>. Select the game files of the combat. Select them in the same order they were played.
              </span>
              <form className="form-container">
                {
                  {
                    '2-0': (
                      <React.Fragment>
                        <div className="game-container">
                          <span className="label-game">Game 1 (1-0)</span>
                          <UploaderComponent
                            name="combatFileA"
                            ref={combatFileA}
                            type="file"
                            multiple={false}
                            autoUpload={false}
                            allowedExtensions=".sav"
                            selected={event => handleSelectionGame(event, 'combatFileA')}
                            removing={event => handleCleaningGame(event, 'combatFileA')}
                            cssClass="uploader"
                          />
                        </div>
                        <div className="game-container">
                          <span className="label-game">Game 2 (2-0)</span>
                          <UploaderComponent
                            name="combatFileB"
                            ref={combatFileB}
                            type="file"
                            multiple={false}
                            autoUpload={false}
                            allowedExtensions=".sav"
                            selected={event => handleSelectionGame(event, 'combatFileB')}
                            removing={event => handleCleaningGame(event, 'combatFileB')}
                            cssClass="uploader"
                          />
                        </div>
                      </React.Fragment>
                    ),
                    '2-1': (
                      <React.Fragment>
                        <div className="game-container">
                          <span className="label-game">Game 1 (1-0 or 0-1)</span>
                          <UploaderComponent
                            name="combatFileC"
                            ref={combatFileC}
                            type="file"
                            multiple={false}
                            autoUpload={false}
                            allowedExtensions=".sav"
                            selected={event => handleSelectionGame(event, 'combatFileC')}
                            removing={event => handleCleaningGame(event, 'combatFileC')}
                            cssClass="uploader"
                          />
                        </div>
                        <div className="game-container">
                          <span className="label-game">Game 2 (1-1)</span>
                          <UploaderComponent
                            name="combatFileD"
                            ref={combatFileD}
                            type="file"
                            multiple={false}
                            autoUpload={false}
                            allowedExtensions=".sav"
                            selected={event => handleSelectionGame(event, 'combatFileD')}
                            removing={event => handleCleaningGame(event, 'combatFileD')}
                            cssClass="uploader"
                          />
                        </div>
                        <div className="game-container">
                          <span className="label-game">Game 3 (2-1)</span>
                          <UploaderComponent
                            name="combatFileE"
                            ref={combatFileE}
                            type="file"
                            multiple={false}
                            autoUpload={false}
                            allowedExtensions=".sav"
                            selected={event => handleSelectionGame(event, 'combatFileE')}
                            removing={event => handleCleaningGame(event, 'combatFileE')}
                            cssClass="uploader"
                          />
                        </div>
                      </React.Fragment>
                    )
                  }[combatResult]
                }
              </form>
            </div>
            {combatDataPreview.map(gameDataPreview => {
              if (gameDataPreview !== undefined) {
                return (
                  <div key={uuidv4()} className="game-preview-block">
                    <span className="game-preview-label">{gameDataPreview.label}</span>
                    <div className="game-preview-data">
                      <Game
                        sequenceData={gameDataPreview.gameData}
                        playerSelected={props.playerSelected}
                        preview={true}
                      />
                    </div>
                  </div>
                );
              }
            })}
          </div>
          <div className="step step3">
            <span className="step-description3">
              <b>STEP 3</b>. Leave your comments for this combat. This can serve for cases of dispute or just to note
              general information of the combat.
            </span>
            <Form>
              <Form.Group>
                <Form.Control as="textarea" rows="5" ref={formComments} />
              </Form.Group>
            </Form>
          </div>
          <div className="upload-combat">
            <button onClick={handleUpload} className="button">
              UPLOAD COMBAT
            </button>
          </div>
        </div>
      )}
      <style jsx>{styles}</style>
      <style jsx global>
        {stylesSyncfusion}
      </style>
    </div>
  );
}

export default withStyles(stylesMaterialUI)(MyCombat);
