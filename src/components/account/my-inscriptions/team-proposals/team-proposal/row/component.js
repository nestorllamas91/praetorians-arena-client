import React, { Fragment } from 'react';
import styles, {
  stylesMaterialUI
} from '$root/components/account/my-inscriptions/team-proposals/team-proposal/row/styles';
import { withStyles } from '@material-ui/styles';

import { fixRankingSelectors } from '$root/utils/functions';
import Router from 'next/router';

import Buttons from '$root/components/account/my-inscriptions/team-proposals/team-proposal/row/buttons/component';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { v4 as uuidv4 } from 'uuid';

function Row(props) {
  const { classes } = props;
  const { season, competition } = fixRankingSelectors(props.season, props.competition);

  function handlePlayerEnrollment() {
    props.playerEnrollment();
  }

  function handleClickMyRanking() {
    const typeCompetition = props.competition.split('-')[0];
    if (typeCompetition === 'dueling') {
      Router.push(`/competitions/${props.rankingId}?user=true`);
    } else {
      Router.push(`/competitions/${props.rankingId}`);
    }
  }

  return (
    <TableRow classes={{ root: classes.tableBodyRow }}>
      <TableCell align="center" padding="none" classes={{ root: classes.tableBodyCell }}>
        {competition} ({season})
      </TableCell>
      <TableCell align="center" padding="none" classes={{ root: classes.tableBodyCell }}>
        {props.row.team.name}
      </TableCell>
      <TableCell align="center" padding="none" classes={{ root: classes.tableBodyCell }}>
        {props.row.team.players.map(player => (
          <div key={uuidv4()} className="player">
            <span className="nickname">{player.steamNickname}</span>
            {(() => {
              switch (player.enrollmentState) {
                case 'pending':
                  return (
                    <div className="state-accepted-refused">
                      <div>
                        <img src="/images/icons/pending.png" />
                        <span>Pending</span>
                      </div>
                    </div>
                  );
                case 'accepted':
                  return (
                    <div className="state-accepted-refused">
                      <div>
                        <img src="/images/icons/accepted.png" />
                        <span>Accepted</span>
                      </div>
                    </div>
                  );
                case 'refused':
                  return (
                    <div className="state-accepted-refused">
                      <div>
                        <img src="/images/icons/refused.png" />
                        <span>Refused</span>
                      </div>
                    </div>
                  );
              }
            })()}
          </div>
        ))}
      </TableCell>
      <TableCell align="center" padding="none" classes={{ root: classes.tableBodyCell }}>
        <Buttons rankingId={props.rankingId} row={props.row} playerEnrollment={handlePlayerEnrollment} />
        <a onClick={handleClickMyRanking}>View ranking</a>
      </TableCell>

      <style jsx>{styles}</style>
    </TableRow>
  );
}

export default withStyles(stylesMaterialUI)(Row);
