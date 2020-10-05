import React, { Fragment, useState, useEffect } from 'react';
import styles, {
  stylesMaterialUI
} from '$root/components/account/my-inscriptions/open-rankings/open-rankings-tables/open-ranking/styles';
import { withStyles } from '@material-ui/styles';

import axios from 'axios';
import { useSelector } from 'react-redux';
import { fixRankingSelectors } from '$root/utils/functions';
import Router from 'next/router';
import withReactContent from 'sweetalert2-react-content';

import Swal from 'sweetalert2';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

function OpenRanking(props) {
  const { classes } = props;
  const player = useSelector(({ user }) => user);
  const MySwal = withReactContent(Swal);
  const [isPlayerInRankingError, setIsPlayerInRankingError] = useState(null);
  const [isPlayerInRanking, setIsPlayerInRanking] = useState(false);
  const [isRankingMaxPlayersError, setIsRankingMaxPlayersError] = useState(null);
  const [isRankingMaxPlayers, setIsRankingMaxPlayers] = useState(false);
  const { season, competition } = fixRankingSelectors(props.ranking.season, props.ranking.competition);
  const typeCompetition = props.ranking.competition.split('-')[0];
  let isTournamentPlaying = false;
  if (typeCompetition === 'tournament' && props.ranking.state === 'playing') {
    isTournamentPlaying = true;
  } else {
    isTournamentPlaying = false;
  }

  useEffect(() => {
    checkPlayerInRanking();
    const typeCompetition = props.ranking.competition.split('-')[0];
    if (typeCompetition === 'tournament') checkRankingMaxPlayers();
  }, []);

  async function checkPlayerInRanking() {
    try {
      const url = `/account/my-inscriptions/check-player/${props.ranking.rankingID}/${player.data.steamId}`;
      const res = await axios.get(url);
      setIsPlayerInRanking(res.data);
    } catch (err) {
      setIsPlayerInRankingError(err.response.data);
    }
  }

  async function checkRankingMaxPlayers() {
    try {
      const url = `/account/my-inscriptions/check-max-players/${props.ranking.rankingID}`;
      const res = await axios.get(url);
      setIsRankingMaxPlayers(res.data);
    } catch (err) {
      setIsRankingMaxPlayersError(err.response.data);
    }
  }

  function handleEnroll() {
    MySwal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: 'You are going to enroll in this ranking.',
      width: '550px',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    }).then(async result => {
      if (result.value) {
        try {
          if (props.ranking.numPlayersPerGame === 2 || props.ranking.numPlayersPerGame === 0) {
            const url = `/account/my-inscriptions/add-player/${props.ranking.rankingID}/${player.data.steamId}`;
            await axios.post(url);
            setIsPlayerInRanking(true);
            MySwal.fire({
              icon: 'success',
              title: 'Inscription done!',
              text: 'The inscription to this ranking has been done.',
              width: '550px',
              onClose: function () {
                const typeCompetition = props.ranking.competition.split('-')[0];
                if (typeCompetition === 'dueling') {
                  Router.push(`/competitions/${props.ranking.rankingID}?user=true`);
                } else {
                  Router.push(`/competitions/${props.ranking.rankingID}`);
                }
              }
            });
          } else {
            Router.push(`/account/my-inscriptions/team-inscription?rankingId=${props.ranking.rankingID}`);
          }
        } catch (err) {
          MySwal.fire({
            icon: 'error',
            title: 'Inscription not done!',
            text: 'The inscription to this ranking could not be done.',
            width: '550px'
          });
        }
      }
    });
  }

  function handleClickMyRanking() {
    const typeCompetition = props.ranking.competition.split('-')[0];
    if (typeCompetition === 'dueling') {
      Router.push(`/competitions/${props.ranking.rankingID}?user=true`);
    } else {
      Router.push(`/competitions/${props.ranking.rankingID}`);
    }
  }

  return (
    <Fragment>
      <TableRow classes={{ root: classes.tableBodyRow }}>
        <TableCell align="center" padding="none" classes={{ root: classes.tableBodyCell }}>
          {season}
        </TableCell>
        <TableCell align="center" padding="none" classes={{ root: classes.tableBodyCell }}>
          {competition}
        </TableCell>
        <TableCell align="center" padding="none" classes={{ root: classes.tableBodyCell }}>
          {isPlayerInRanking ? (
            <span className="green-color">You are already enrolled in this ranking.</span>
          ) : isTournamentPlaying ? (
            <span className="red-color">This ranking already started and does not allow more inscriptions.</span>
          ) : isRankingMaxPlayers ? (
            <span className="red-color">
              This ranking has reached the limit of players and does not allow more inscriptions.
            </span>
          ) : (
            <span className="blue-color">This ranking is currently available for inscription.</span>
          )}
        </TableCell>
        <TableCell align="center" padding="none" classes={{ root: classes.tableBodyCell }}>
          <div className="action">
            <button
              disabled={isPlayerInRanking || isTournamentPlaying || isRankingMaxPlayers ? true : false}
              onClick={handleEnroll}
              className="button"
            >
              ENROLL
            </button>
            <a onClick={handleClickMyRanking}>View ranking</a>
          </div>
        </TableCell>
      </TableRow>
      <style jsx>{styles}</style>
    </Fragment>
  );
}

export default withStyles(stylesMaterialUI)(OpenRanking);
