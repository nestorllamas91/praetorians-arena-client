import React, { Fragment } from 'react';

import ArenaData from '$root/components/games/game/arena-data/component';
import FileData from '$root/components/games/game/file-data/component';
import GameData from '$root/components/games/game/game-data/component';
import PlayersData from '$root/components/games/game/players-data/component';

export default function Game(props) {
  return (
    <Fragment>
      <ArenaData data={props.sequenceData.arenaData} preview={props.preview} />
      <FileData data={props.sequenceData.fileData} preview={props.preview} />
      <GameData data={props.sequenceData.gameData} />
      <PlayersData sequenceData={props.sequenceData} playerSelected={props.playerSelected} />
    </Fragment>
  );
}
