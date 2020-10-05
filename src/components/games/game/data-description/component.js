import React from 'react';
import styles from '$root/components/games/game/data-description/styles';

export default function DataDescription(props) {
  let classContainerData = '';
  switch (props.description) {
    case 'ARENA':
      classContainerData = 'container-arena-data';
      break;
    case 'FILE':
      classContainerData = 'container-file-data';
      break;
    case 'GAME':
      classContainerData = 'container-game-data';
      break;
    case 'PLAYERS':
      classContainerData = 'container-players-data';
  }
  return (
    <div className={`container-table-description ${classContainerData}`}>
      <img src={props.imgFilename} />
      <span className="text">{props.description}</span>
      <style jsx>{styles}</style>
    </div>
  );
}
