import React from 'react';
import styles, { muiStyles } from '$root/components/games/game/players-data/players/player/styles';
import { withStyles } from '@material-ui/styles';

import SameTeam from '$root/components/games/game/players-data/players/player/same-team/component';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

function Player(props) {
  const { classes } = props;
  let classTableBodyCell = '',
    classTableBodyRowPlayerSelected = '';

  if (!props.isLastPlayerSameTeam) {
    classTableBodyCell = classes.tableBodyCell;
  } else {
    if (props.isLastPlayer) {
      classTableBodyCell = classes.tableBodyCell;
    } else {
      classTableBodyCell = classes.tableBodyCellLastRowSameTeam;
    }
  }
  if (props.data.steamNickname.includes(props.playerSelected)) {
    classTableBodyRowPlayerSelected = classes.playerSelected;
  }

  return (
    <TableRow
      classes={{
        root: `${classes.tableBodyRow} ${classTableBodyRowPlayerSelected}`
      }}
    >
      <TableCell align="center" padding="none" classes={{ root: classTableBodyCell }}>
        {props.data.steamNickname}
      </TableCell>
      <TableCell align="center" padding="none" classes={{ root: classTableBodyCell }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <span>TeamA1</span>
          &nbsp;
          <img src={`/images/icons/team-${props.data.team}.png`} style={{ width: '30px' }} />
          &nbsp;
          <SameTeam numTeamPlayers={props.numTeamPlayers} />
        </div>
      </TableCell>
      <TableCell align="center" padding="none" classes={{ root: classTableBodyCell }}>
        <img src={`/images/icons/color-${props.data.color + 1}.png`} style={{ width: '30px' }} />
      </TableCell>
      <TableCell align="center" padding="none" classes={{ root: classTableBodyCell }}>
        <div className="civilization">
          <img
            src={`/images/icons/civilization-${props.data.civilization.toLowerCase()}.png`}
            className="civilization-image"
          />
          {props.data.civilization}
        </div>
      </TableCell>
      <TableCell align="center" padding="none" classes={{ root: classTableBodyCell }}>
        {new Intl.NumberFormat('en-US').format(props.data.kills)}
      </TableCell>
      <TableCell align="center" padding="none" classes={{ root: classTableBodyCell }}>
        {new Intl.NumberFormat('en-US').format(props.data.losses)}
      </TableCell>
      <TableCell align="center" padding="none" classes={{ root: classTableBodyCell }}>
        {new Intl.NumberFormat('en-US').format(props.data.unitsTrained)}
      </TableCell>
      <TableCell align="center" padding="none" classes={{ root: classTableBodyCell }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <span style={{ display: 'inline-block' }}>{new Intl.NumberFormat('en-US').format(props.data.score)}</span>
          &nbsp;
          {props.data.bestScore === true ? <img src="/images/icons/score-best.png" style={{ width: '30px' }} /> : ''}
        </div>
      </TableCell>
      <TableCell align="center" padding="none" classes={{ root: classTableBodyCell }}>
        {props.data.playTime}
      </TableCell>
      <TableCell align="center" padding="none" classes={{ root: classTableBodyCell }}>
        {props.data.winner === 1 ? (
          <img src="/images/icons/result-victory.png" style={{ width: '20px' }} />
        ) : (
          <img src="/images/icons/result-defeat.png" style={{ width: '20px' }} />
        )}
      </TableCell>
      <style jsx>{styles}</style>
    </TableRow>
  );
}
export default withStyles(muiStyles)(Player);
