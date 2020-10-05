import React, { useState, useEffect } from 'react';
import styles from '$root/components/games/styles';

import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import Filters from '$root/components/games/filters/component';
import Game from '$root/components/games/game/component';
import Pagination from '$root/components/games/pagination/component';

export default function Games(props) {
  const [gamesError, setGamesError] = useState(null);
  const [sequencesDataOriginal, setSequencesDataOriginal] = useState([]);
  const [sequencesData, setSequencesData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [valueFilterUploadDate, setValueFilterUploadDate] = useState(null);
  const [valueFilterPlayDate, setValueFilterPlayDate] = useState(null);
  const [valueFilterUploaderPlayer, setValueFilterUploaderPlayer] = useState(null);
  const [valueFilterPlayers, setValueFilterPlayers] = useState(null);
  const [valueFilterNumPlayers, setValueFilterNumPlayers] = useState(null);
  const [valueFilterMap, setValueFilterMap] = useState(null);
  let valuesFiltersCleared = false;
  let valuesFiltersClearedExtra = false;

  useEffect(() => {
    getGames();
  }, []);

  async function getGames() {
    try {
      const url = '/games';
      const res = await axios.get(url);
      setSequencesDataOriginal(res.data.output.data);
      setSequencesData(res.data.output.data);
    } catch (err) {
      setGamesError(err.response.data.status.code);
    }
  }

  const numSequences = sequencesData.length;
  const numSequencesPerPage = 20;
  const numPages = Math.ceil(numSequences / numSequencesPerPage);
  let indexOfFirstSequence = -1,
    indexOfLastSequence = -1;
  if (numSequences < 10) {
    indexOfFirstSequence = 0;
    indexOfLastSequence = numSequences;
  } else {
    if (currentPage === numPages) {
      indexOfFirstSequence = (currentPage - 1) * numSequencesPerPage;
      indexOfLastSequence = numSequences;
    } else {
      indexOfFirstSequence = (currentPage - 1) * numSequencesPerPage;
      indexOfLastSequence = currentPage * numSequencesPerPage;
    }
  }
  let currentSequencesData = sequencesData.slice(indexOfFirstSequence, indexOfLastSequence);

  function handlePageSelection(event) {
    setCurrentPage(Number(event.target.id));
  }

  function handleFilterUploadDate(event) {
    if (!valuesFiltersClearedExtra && event.event) {
      let valueFilterUploadDate = event.value;
      updateData(
        valueFilterUploadDate,
        valueFilterPlayDate,
        valueFilterUploaderPlayer,
        valueFilterPlayers,
        valueFilterNumPlayers,
        valueFilterMap
      );
      valuesFiltersCleared = false;
    } else {
      valuesFiltersClearedExtra = false;
    }
  }

  function handleFilterPlayDate(event) {
    if (!valuesFiltersClearedExtra && event.value) {
      let valueFilterPlayDate = event.value;
      updateData(
        valueFilterUploadDate,
        valueFilterPlayDate,
        valueFilterUploaderPlayer,
        valueFilterPlayers,
        valueFilterNumPlayers,
        valueFilterMap
      );
      valuesFiltersCleared = false;
    } else {
      valuesFiltersClearedExtra = false;
    }
  }

  function handleFilterUploaderPlayer(event) {
    if (!valuesFiltersClearedExtra && (event.value || (!event.value && event.previousItem))) {
      let valueFilterUploaderPlayer = event.itemData === null ? null : event.itemData.value;
      updateData(
        valueFilterUploadDate,
        valueFilterPlayDate,
        valueFilterUploaderPlayer,
        valueFilterPlayers,
        valueFilterNumPlayers,
        valueFilterMap
      );
      valuesFiltersCleared = false;
    } else {
      valuesFiltersClearedExtra = false;
    }
  }

  function handleFilterPlayers(event) {
    if (!valuesFiltersClearedExtra && (event.e === undefined || event.e)) {
      let valueFilterPlayers = event.value;
      updateData(
        valueFilterUploadDate,
        valueFilterPlayDate,
        valueFilterUploaderPlayer,
        valueFilterPlayers,
        valueFilterNumPlayers,
        valueFilterMap
      );
      valuesFiltersCleared = false;
    } else {
      valuesFiltersClearedExtra = false;
    }
  }

  function handleFilterNumPlayers(event) {
    if (!valuesFiltersClearedExtra && (event.value || (!event.value && event.previousItem))) {
      let valueFilterNumPlayers = event.itemData === null ? null : event.itemData.value;
      updateData(
        valueFilterUploadDate,
        valueFilterPlayDate,
        valueFilterUploaderPlayer,
        valueFilterPlayers,
        valueFilterNumPlayers,
        valueFilterMap
      );
      valuesFiltersCleared = false;
    } else {
      valuesFiltersClearedExtra = false;
    }
  }

  function handleFilterMap(event) {
    if (!valuesFiltersClearedExtra && (event.value || (!event.value && event.previousItem))) {
      let valueFilterMap = event.itemData === null ? null : event.itemData.value;
      updateData(
        valueFilterUploadDate,
        valueFilterPlayDate,
        valueFilterUploaderPlayer,
        valueFilterPlayers,
        valueFilterNumPlayers,
        valueFilterMap
      );
      valuesFiltersCleared = false;
    } else {
      valuesFiltersClearedExtra = false;
    }
  }

  function handleClearFilters() {
    if (!valuesFiltersCleared) {
      if (
        valueFilterUploadDate ||
        valueFilterPlayDate ||
        valueFilterUploaderPlayer ||
        valueFilterPlayers ||
        valueFilterNumPlayers ||
        valueFilterMap
      ) {
        setSequencesData(sequencesDataOriginal);
        setValueFilterUploadDate(null);
        setValueFilterPlayDate(null);
        setValueFilterUploaderPlayer(null);
        setValueFilterPlayers(null);
        setValueFilterNumPlayers(null);
        setValueFilterMap(null);

        valuesFiltersClearedExtra = true;
      }
      valuesFiltersCleared = true;
    }
  }

  function updateData(
    valueFilterUploadDate,
    valueFilterPlayDate,
    valueFilterUploaderPlayer,
    valueFilterPlayers,
    valueFilterNumPlayers,
    valueFilterMap
  ) {
    if (valueFilterUploadDate !== null) {
      sequencesDataOriginal = sequencesDataOriginal.filter(sequenceDataOriginal => {
        if (
          sequenceDataOriginal.fileData.uploadDateTypeDate.getTime() >= valueFilterUploadDate[0].getTime() &&
          sequenceDataOriginal.fileData.uploadDateTypeDate.getTime() <= valueFilterUploadDate[1].getTime()
        ) {
          return true;
        }
      });
    }
    if (valueFilterPlayDate !== null) {
      sequencesDataOriginal = sequencesDataOriginal.filter(sequenceDataOriginal => {
        if (
          sequenceDataOriginal.gameData.playDateTypeDate.getTime() >= valueFilterPlayDate[0].getTime() &&
          sequenceDataOriginal.gameData.playDateTypeDate.getTime() <= valueFilterPlayDate[1].getTime()
        ) {
          return true;
        }
      });
    }
    if (valueFilterUploaderPlayer !== null) {
      sequencesDataOriginal = sequencesDataOriginal.filter(sequenceDataOriginal => {
        if (sequencesDataOriginal.fileData.uploaderPlayer === valueFilterUploaderPlayer) {
          return true;
        }
      });
    }
    if (valueFilterPlayers !== null) {
      if (valueFilterPlayers.length > 0) {
        sequencesDataOriginal = sequencesDataOriginal.filter(sequenceDataOriginal => {
          let playersInSequence = false;
          for (let i = 0; i < valueFilterPlayers.length; i++) {
            let player = valueFilterPlayers[i];
            playersInSequence = false;
            sequenceDataOriginal.teamsData.map(teamData => {
              teamData.playersData.map(playerData => {
                if (playerData.steamNickname === player) {
                  playersInSequence = true;
                }
              });
            });
            if (!playersInSequence) break;
          }
          return playersInSequence;
        });
      }
    }
    if (valueFilterNumPlayers !== null) {
      sequencesDataOriginal = sequencesDataOriginal.filter(sequenceDataOriginal => {
        if (sequenceDataOriginal.gameData.numPlayers === valueFilterNumPlayers) {
          return true;
        }
      });
    }
    if (valueFilterMap !== null) {
      sequencesDataOriginal = sequencesDataOriginal.filter(sequenceDataOriginal => {
        if (sequenceDataOriginal.gameData.map.id === valueFilterMap) {
          return true;
        }
      });
    }
    setSequencesData(sequencesDataOriginal);
    setValueFilterUploadDate(valueFilterUploadDate);
    setValueFilterPlayDate(valueFilterPlayDate);
    setValueFilterUploaderPlayer(valueFilterUploaderPlayer);
    setValueFilterPlayers(valueFilterPlayers);
    setValueFilterNumPlayers(valueFilterNumPlayers);
    setValueFilterMap(valueFilterMap);
  }

  return (
    <div className="main-container">
      <div className="games-container">
        <Filters
          valueFilterUploadDate={valueFilterUploadDate}
          handleFilterUploadDate={handleFilterUploadDate}
          valueFilterPlayDate={valueFilterPlayDate}
          handleFilterPlayDate={handleFilterPlayDate}
          valueFilterNumPlayers={valueFilterNumPlayers}
          handleFilterNumPlayers={handleFilterNumPlayers}
          valueFilterMap={valueFilterMap}
          handleFilterMap={handleFilterMap}
          valueFilterUploaderPlayer={valueFilterUploaderPlayer}
          handleFilterUploaderPlayer={handleFilterUploaderPlayer}
          valueFilterPlayers={valueFilterPlayers}
          handleFilterPlayers={handleFilterPlayers}
          handleClearFilters={handleClearFilters}
        />
        {numSequences === 0 ? (
          <div className="alert-sequences-found">0 sequences found.</div>
        ) : numSequences === 1 ? (
          <div className="alert-sequences-found">1 sequence found. Showing from #1 to #1.</div>
        ) : (
          <div className="alert-sequences-found">
            {numSequences} sequences found. Showing from #{indexOfFirstSequence + 1} to #{indexOfLastSequence}.
          </div>
        )}
        {numPages === 0 ? null : (
          <React.Fragment>
            <Pagination numPages={numPages} currentPage={currentPage} handlePageSelection={handlePageSelection} />
            {currentSequencesData.map(sequenceData => (
              <div key={uuidv4()} className="game">
                <Game sequenceData={sequenceData} playerSelected={props.playerSelected} preview={false} />
              </div>
            ))}
            <Pagination numPages={numPages} currentPage={currentPage} handlePageSelection={handlePageSelection} />
          </React.Fragment>
        )}
      </div>
      <style jsx>{styles}</style>
    </div>
  );
}
