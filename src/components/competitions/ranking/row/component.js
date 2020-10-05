import React, { Fragment, useState, useEffect } from 'react';
import styles, { stylesMaterialUI } from '$root/components/competitions/ranking/row/styles';
import { withStyles } from '@material-ui/styles';

import axios from 'axios';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Router from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import withReactContent from 'sweetalert2-react-content';

import Swal from 'sweetalert2';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import NameRanking from '$root/components/competitions/name-ranking/component';

function Row(props) {
  const { classes } = props;
  const player = useSelector(({ user }) => user);
  const MySwal = withReactContent(Swal);
  const [isPlayerChallengedError, setIsPlayerChallengedError] = useState(null);
  const [isPlayerChallenged, setIsPlayerChallenged] = useState(null);
  const [challengesDisabled, setChallengesDisabled] = useState(false);

  let steamNickname = '';
  if (player.isAuthenticated) {
    steamNickname = player.data.steamNickname;
  }

  let userInRow = false;
  props.row.team.players.map(myPlayer => {
    if (myPlayer.steamNickname === steamNickname) {
      userInRow = true;
    }
  });

  let classTableBodyRowPlayerSelected = '';
  props.row.team.players.map(myPlayer => {
    if (myPlayer.steamNickname === steamNickname && (props.viewData === 'ranking1' || props.viewData === 'ranking2')) {
      classTableBodyRowPlayerSelected = classes.tableBodyRowPlayerSelected;
    }
  });

  useEffect(() => {
    if (props.viewData === 'ranking1') checkPlayerChallenged();
    checkInscriptionPeriod();
  }, []);

  async function checkPlayerChallenged() {
    try {
      const url = `/account/my-rankings/challenge/player-challenged/${props.ranking.rankingID}/${props.row.team.name}`;
      const res = await axios.get(url);
      setIsPlayerChallenged(res.data);
    } catch (err) {
      setIsPlayerChallengedError(err.response.data);
    }
  }

  async function checkInscriptionPeriod() {
    const currentYear = moment().year();
    const currentQuarter = moment().quarter();
    const currentSeason = `${currentYear}-q${currentQuarter}`;
    const typeCompetition = props.ranking.competition.split('-')[0];
    if (typeCompetition === 'dueling') {
      if (props.ranking.season === currentSeason) {
        setChallengesDisabled(false);
      } else {
        setChallengesDisabled(true);
      }
    }
  }

  function handleClickMyRanking() {
    const typeCompetition = props.ranking.competition.split('-')[0];
    if (typeCompetition === 'dueling') {
      Router.push(`/competitions/${props.ranking.rankingID}?user=true`);
    } else {
      Router.push(`/competitions/${props.ranking.rankingID}`);
    }
  }

  function handleChallengeCasual() {
    MySwal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: 'You are going to challenge this player or team.',
      width: '550px',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    }).then(async result => {
      if (result.value) {
        try {
          const url1 = `/competitions/team-of-player/${props.ranking.rankingID}/${player.data.steamId}`;
          const res1 = await axios.get(url1);
          const url2 = `/account/my-rankings/challenge-casual/${props.ranking.rankingID}/${res1.data.output.data}/${props.row.team.name}`;
          await axios.post(url2);
          setIsPlayerChallenged(prevIsPlayerChallenged => ({
            ...prevIsPlayerChallenged,
            isPlayerChallengedCasual: true
          }));
          MySwal.fire({
            icon: 'success',
            title: 'Challenge created!',
            text: 'The challenge to this player or team has been created.',
            width: '550px',
            onClose: function () {
              Router.push('/account/my-combats');
            }
          });
        } catch (err) {
          MySwal.fire({
            icon: 'error',
            title: 'Challenge not created!',
            text: 'The challenge to this player or team could not be created.',
            width: '550px'
          });
        }
      }
    });
  }

  function handleChallenge7Days() {}

  return (
    <Fragment>
      {(props.viewData === 'ranking3' && !userInRow) || (props.viewData === 'ranking1' && !isPlayerChallenged) ? (
        <Fragment></Fragment>
      ) : (
        <TableRow
          classes={{
            root: `${classes.tableBodyRow} ${classTableBodyRowPlayerSelected}`
          }}
        >
          {props.viewData === 'ranking3' ? (
            <TableCell align="center" padding="none" classes={{ root: classes.tableBodyCell }}>
              <NameRanking
                season={props.ranking.season}
                competition={props.ranking.competition}
                fontSize="small"
                alignment="center"
              />
            </TableCell>
          ) : (
            <Fragment></Fragment>
          )}
          <TableCell align="center" padding="none" classes={{ root: classes.tableBodyCell }}>
            {(() => {
              switch (props.row.rank) {
                case 1:
                  return <img src="/images/icons/rank-gold.png" />;
                case 2:
                  return <img src="/images/icons/rank-silver.png" />;
                case 3:
                  return <img src="/images/icons/rank-bronze.png" />;
                default:
                  return <span>{props.row.rank}</span>;
              }
            })()}
          </TableCell>
          <TableCell align="center" padding="none" classes={{ root: classes.tableBodyCell }}>
            {props.row.team.players.length === 1 ? (
              <span className="player">{props.row.team.players[0].steamNickname}</span>
            ) : (
              <Fragment>
                <span>[{props.row.team.name}]</span>
                <ul>
                  {props.row.team.players.map(myPlayer => (
                    <li key={uuidv4()}>
                      <span className="player">{myPlayer.steamNickname}</span>
                    </li>
                  ))}
                </ul>
              </Fragment>
            )}
          </TableCell>
          <TableCell align="center" padding="none" classes={{ root: classes.tableBodyCell }}>
            {props.row.points}
          </TableCell>
          <TableCell align="center" padding="none" classes={{ root: classes.tableBodyCell }}>
            {props.row.victories}
          </TableCell>
          <TableCell align="center" padding="none" classes={{ root: classes.tableBodyCell }}>
            {props.row.defeats}
          </TableCell>
          {props.viewData === 'ranking1' ? (
            <TableCell align="center" padding="none" classes={{ root: classes.tableBodyCell }}>
              <div className="buttons">
                <button
                  disabled={
                    userInRow || isPlayerChallenged.isPlayerChallengedCasual || challengesDisabled ? true : false
                  }
                  onClick={handleChallengeCasual}
                  className="button button-casual-challenge"
                >
                  CASUAL CHALLENGE
                </button>
                <button
                  disabled={
                    userInRow || isPlayerChallenged.isPlayerChallenged7Days || challengesDisabled ? true : false
                  }
                  onClick={handleChallenge7Days}
                  className="button"
                >
                  7-DAYS CHALLENGE
                </button>
              </div>
            </TableCell>
          ) : (
            <Fragment></Fragment>
          )}
          {props.viewData === 'ranking3' ? (
            <TableCell align="center" padding="none" classes={{ root: classes.tableBodyCell }}>
              <a onClick={handleClickMyRanking}>View ranking</a>
            </TableCell>
          ) : (
            <Fragment></Fragment>
          )}
        </TableRow>
      )}
      <style jsx>{styles}</style>
    </Fragment>
  );
}

export default withStyles(stylesMaterialUI)(Row);
