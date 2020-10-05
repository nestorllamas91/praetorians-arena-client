import React from 'react';
import styles, { muiStyles } from '$root/components/games/game/players-data/styles';
import { withStyles } from '@material-ui/styles';

import DataDescription from '$root/components/games/game/data-description/component';
import Paper from '@material-ui/core/Paper';
import Players from '$root/components/games/game/players-data/players/component';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

function PlayersData(props) {
  const { classes } = props;
  return (
    <div className="container-table-players-data">
      <DataDescription
        description="PLAYERS"
        imgFilename="/images/icons/data-players.png"
        style={{ borderBottom: 'none !important' }}
      />
      <Paper classes={{ root: classes.paper }}>
        <Table>
          <TableHead classes={{ root: classes.tableHead }}>
            <TableRow classes={{ root: classes.tableHeadRow }}>
              <TableCell align="center" padding="none" classes={{ root: classes.tableHeadCell }}>
                Nickname
              </TableCell>
              <TableCell align="center" padding="none" classes={{ root: classes.tableHeadCell }}>
                Team
              </TableCell>
              <TableCell align="center" padding="none" classes={{ root: classes.tableHeadCell }}>
                Color
              </TableCell>
              <TableCell align="center" padding="none" classes={{ root: classes.tableHeadCell }}>
                Civilization
              </TableCell>
              <TableCell align="center" padding="none" classes={{ root: classes.tableHeadCell }}>
                Kills
              </TableCell>
              <TableCell align="center" padding="none" classes={{ root: classes.tableHeadCell }}>
                Losses
              </TableCell>
              <TableCell align="center" padding="none" classes={{ root: classes.tableHeadCell }}>
                <div>
                  <span>Units</span>
                  <span>trained</span>
                </div>
              </TableCell>
              <TableCell align="center" padding="none" classes={{ root: classes.tableHeadCell }}>
                Score
              </TableCell>
              <TableCell align="center" padding="none" classes={{ root: classes.tableHeadCell }}>
                Play time
              </TableCell>
              <TableCell align="center" padding="none" classes={{ root: classes.tableHeadCell }}>
                Winner
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody classes={{ root: classes.tableBody }}>
            <Players
              playerSelected={props.playerSelected}
              teamsData={props.sequenceData.teamsData}
              numTotalPlayers={props.sequenceData.gameData.numPlayers}
            />
          </TableBody>
        </Table>
      </Paper>
      <style jsx>{styles}</style>
    </div>
  );
}
export default withStyles(muiStyles)(PlayersData);
