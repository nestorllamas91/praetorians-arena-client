import React, { Fragment, useState, useEffect } from 'react';
import styles, { stylesMaterialUI } from '$root/components/players/styles';
import { withStyles } from '@material-ui/styles';

import axios from 'axios';
import countries from '$root/utils/steam-countries.json';
import Router from 'next/router';
import { v4 as uuidv4 } from 'uuid';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

function Players(props) {
  const { classes } = props;
  const [playersError, setPlayersError] = useState(null);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    getPlayers();
  }, []);

  async function getPlayers() {
    try {
      const url = '/players';
      const res = await axios.get(url);
      setPlayers(res.data.output.data);
    } catch (err) {
      setPlayersError(err.response.data.status.code);
    }
  }

  function handleClickStatistics(steamId) {
    Router.push(`/stats?steamId=${steamId}`);
  }

  return (
    <div className="main-container">
      {players.length === 0 ? (
        <Fragment></Fragment>
      ) : (
        <div className="players-table">
          <Paper>
            <Table>
              <TableHead>
                <TableRow classes={{ root: classes.tableHeadRow }}>
                  <TableCell align="center" padding="none" classes={{ root: classes.tableHeadCell }}>
                    Avatar
                  </TableCell>
                  <TableCell align="center" padding="none" classes={{ root: classes.tableHeadCell }}>
                    Nickname
                  </TableCell>
                  <TableCell align="center" padding="none" classes={{ root: classes.tableHeadCell }}>
                    Real Name
                  </TableCell>
                  <TableCell align="center" padding="none" classes={{ root: classes.tableHeadCell }}>
                    Country
                  </TableCell>
                  <TableCell align="center" padding="none" classes={{ root: classes.tableHeadCell }}>
                    Steam ID
                  </TableCell>
                  <TableCell align="center" padding="none" classes={{ root: classes.tableHeadCell }}>
                    Profile URL
                  </TableCell>
                  <TableCell align="center" padding="none" classes={{ root: classes.tableHeadCell }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody classes={{ root: classes.tableBody }}>
                {players.map(player => {
                  return (
                    <TableRow key={uuidv4()} classes={{ root: classes.tableBodyRow }}>
                      <TableCell align="center" padding="none" classes={{ root: classes.tableBodyCell }}>
                        <img src={player.steamAvatar.medium} className="avatar" />
                      </TableCell>
                      <TableCell align="center" padding="none" classes={{ root: classes.tableBodyCell }}>
                        {player.steamNickname}
                      </TableCell>
                      <TableCell align="center" padding="none" classes={{ root: classes.tableBodyCell }}>
                        {player.steamRealName === undefined ? <i>unknown</i> : player.steamRealName}
                      </TableCell>
                      <TableCell align="center" padding="none" classes={{ root: classes.tableBodyCell }}>
                        {player.steamCountry === undefined ? (
                          <i>unknown</i>
                        ) : (
                          Object.keys(countries).map(country => {
                            return country === player.steamCountry ? countries[country].name : '';
                          })
                        )}
                      </TableCell>
                      <TableCell align="center" padding="none" classes={{ root: classes.tableBodyCell }}>
                        {player.steamId}
                      </TableCell>
                      <TableCell align="center" padding="none" classes={{ root: classes.tableBodyCell }}>
                        <a href={player.steamProfileUrl}>{player.steamProfileUrl}</a>
                      </TableCell>
                      <TableCell align="center" padding="none" classes={{ root: classes.tableBodyCell }}>
                        <a onClick={() => handleClickStatistics(player.steamId)}>View statistics</a>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
        </div>
      )}
      <style jsx>{styles}</style>
    </div>
  );
}

export default withStyles(stylesMaterialUI)(Players);
