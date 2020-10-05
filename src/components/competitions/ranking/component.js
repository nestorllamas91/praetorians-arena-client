import React, { Fragment } from 'react';
import styles, { stylesMaterialUI } from '$root/components/competitions/ranking/styles';
import { withStyles } from '@material-ui/styles';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

function Ranking(props) {
  const { classes } = props;

  return (
    <div className="ranking-table">
      <Paper classes={{ root: classes.paper }}>
        <Table>
          <TableHead classes={{ root: classes.tableHead }}>
            <TableRow classes={{ root: classes.tableHeadRow }}>
              {props.viewData === 'ranking3' ? (
                <TableCell align="center" padding="none" classes={{ root: classes.tableHeadCell }}>
                  Ranking
                </TableCell>
              ) : (
                <Fragment></Fragment>
              )}
              <TableCell align="center" padding="none" classes={{ root: classes.tableHeadCell }}>
                Rank
              </TableCell>
              <TableCell align="center" padding="none" classes={{ root: classes.tableHeadCell }}>
                {props.numPlayersPerGame === 2 ? <span>Player</span> : <span>Team</span>}
              </TableCell>
              <TableCell align="center" padding="none" classes={{ root: classes.tableHeadCell }}>
                Points
              </TableCell>
              <TableCell align="center" padding="none" classes={{ root: classes.tableHeadCell }}>
                Victories
              </TableCell>
              <TableCell align="center" padding="none" classes={{ root: classes.tableHeadCell }}>
                Defeats
              </TableCell>
              {props.viewData === 'ranking1' ? (
                <TableCell align="center" padding="none" classes={{ root: classes.tableHeadCell }}>
                  Action
                </TableCell>
              ) : (
                <Fragment></Fragment>
              )}
              {props.viewData === 'ranking3' ? (
                <TableCell align="center" padding="none" classes={{ root: classes.tableHeadCell }}>
                  Action
                </TableCell>
              ) : (
                <Fragment></Fragment>
              )}
            </TableRow>
          </TableHead>
          <TableBody classes={{ root: classes.tableBody }}>{props.children}</TableBody>
        </Table>
      </Paper>
      <style jsx>{styles}</style>
    </div>
  );
}
export default withStyles(stylesMaterialUI)(Ranking);
