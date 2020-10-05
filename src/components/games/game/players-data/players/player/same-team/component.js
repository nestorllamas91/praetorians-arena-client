import React from 'react';
import styles from '$root/components/games/game/players-data/players/player/same-team/styles';

import { v4 as uuidv4 } from 'uuid';

export default function SameTeam(props) {
  let symbolsJSX = [];
  for (let i = 0; i < props.numTeamPlayers; i++) {
    symbolsJSX.push(<img key={uuidv4()} src="/images/icons/team-same.png" style={{ verticalAlign: 'middle' }} />);
  }
  return <div style={{ textAlign: 'left' }}>{symbolsJSX}</div>;
}
