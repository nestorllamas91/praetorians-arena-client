import React, { Fragment, useState, useEffect, useRef } from 'react';
import styles, {
  stylesMaterialUI,
  stylesGlobal
} from '$root/components/account/my-inscriptions/open-rankings/open-rankings-tables/open-ranking/team-inscription/styles';
import { withStyles } from '@material-ui/styles';

import axios from 'axios';
import { useSelector } from 'react-redux';
import Router, { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import withReactContent from 'sweetalert2-react-content';

import Autocomplete from '@material-ui/lab/Autocomplete';
import Swal from 'sweetalert2';
import TextField from '@material-ui/core/TextField';
import NameRanking from '$root/components/competitions/name-ranking/component';

function TeamInscription(props) {
  const { classes } = props;
  const player = useSelector(({ user }) => user);
  const MySwal = withReactContent(Swal);
  const router = useRouter();
  let rankingId = null;
  if (router) {
    rankingId = router.query.rankingId;
  }
  const steamId = player.data ? player.data.steamId : null;
  const steamNickname = player.data ? player.data.steamNickname : null;
  const [rankingError, setRankingError] = useState(null);
  const [ranking, setRanking] = useState(null);
  const teamName = useRef(null);
  const [playersError, setPlayersError] = useState(null);
  const [players, setPlayers] = useState([]);
  const [playersTeam, setPlayersTeam] = useState([]);
  const [isTeamProposalCompleted, setIsTeamProposalCompleted] = useState(false);

  useEffect(() => {
    if (rankingId) {
      getRanking();
      getPlayers();
    }
  }, [rankingId, playersTeam]);

  async function getRanking() {
    try {
      const url = `/competitions/ranking/${rankingId}`;
      const res = await axios.get(url);
      setRanking(res.data.output.data);
    } catch (err) {
      setRankingError(err.response.data.status.code);
    }
  }

  async function getPlayers() {
    try {
      const url = '/players';
      const res = await axios.get(url);
      setPlayers(res.data.output.data);
    } catch (err) {
      setPlayersError(err.response.data.status.code);
    }
  }

  function getOptionsPlayers() {
    let playersIdsAndNicknames = [];
    players.map(myPlayer => {
      let isPlayerSelected = false;
      playersTeam.map(playerOfTeam => {
        if (playerOfTeam !== undefined && myPlayer.steamId === playerOfTeam.steamId) {
          isPlayerSelected = true;
        }
      });
      if (myPlayer.steamId !== steamId && !isPlayerSelected) {
        playersIdsAndNicknames.push({
          steamId: myPlayer.steamId,
          steamNickname: myPlayer.steamNickname
        });
      }
    });
    return playersIdsAndNicknames;
  }

  function handleChangePlayer(event, option, num) {
    if (option === null) option = undefined;
    let playersTeamTemp = [];
    playersTeamTemp[0] = {
      steamId: steamId,
      steamNickname: steamNickname
    };
    for (let i = 1; i <= ranking.numPlayersPerGame / 2 - 1; i++) {
      if (i !== num) {
        playersTeamTemp[i] = playersTeam[i];
      } else {
        playersTeamTemp[i] = option;
      }
    }
    setPlayersTeam(playersTeamTemp);
    let teamCompleted = true;
    playersTeamTemp.map(player => {
      if (player === undefined) {
        teamCompleted = false;
      }
    });
    if (teamCompleted && teamName.current.value !== '') {
      setIsTeamProposalCompleted(true);
    } else {
      setIsTeamProposalCompleted(false);
    }
  }

  function getPlayersSelectors() {
    let playersSelectors = [];
    for (let num = 1; num <= ranking.numPlayersPerGame / 2 - 1; num++) {
      const playerSelector = (
        <div key={uuidv4()} className="player-selector">
          <Autocomplete
            renderInput={params => (
              <TextField
                {...params}
                label={`Player ${num + 1}`}
                placeholder="Select a player..."
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true
                }}
              />
            )}
            options={getOptionsPlayers()}
            getOptionLabel={option => option.steamNickname}
            onChange={(event, option) => handleChangePlayer(event, option, num)}
            value={playersTeam[num]}
            classes={{ root: classes.input }}
          />
        </div>
      );
      playersSelectors.push(playerSelector);
    }
    return playersSelectors;
  }

  function handleTeamName() {
    let teamCompleted = true;
    if (playersTeam.length === 0) {
      teamCompleted = false;
    }
    playersTeam.map(player => {
      if (player === undefined) {
        teamCompleted = false;
      }
    });
    if (teamCompleted && teamName.current.value !== '') {
      setIsTeamProposalCompleted(true);
    } else {
      setIsTeamProposalCompleted(false);
    }
  }

  async function handleSendTeamProposal() {
    MySwal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: 'You are going to send a proposal for this new team.',
      width: '550px',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    }).then(async result => {
      if (result.value) {
        try {
          const url = `/account/my-inscriptions/send-proposal/${ranking.rankingID}/${
            teamName.current.value
          }/${JSON.stringify(playersTeam)}/${steamNickname}`;
          await axios.post(url);
          MySwal.fire({
            icon: 'success',
            title: 'Team proposal sent!',
            text: 'The proposal for this new team has been sent.',
            width: '550px',
            onClose: function () {
              Router.push('/account/my-inscriptions');
            }
          });
        } catch (err) {
          MySwal.fire({
            icon: 'error',
            title: 'Team proposal not sent!',
            text: 'The proposal for this new team could not be sent.',
            width: '550px'
          });
        }
      }
    });
  }

  return (
    <div className="main-container">
      {!ranking || !players || !rankingId ? (
        <Fragment></Fragment>
      ) : (
        <Fragment>
          <div className="headings">
            <h2 className="heading2 first-heading">Team Proposal:</h2>
            <NameRanking season={ranking.season} competition={ranking.competition} fontSize="big" alignment="left" />
          </div>
          <hr />
          <div className="section1">
            <p>Enter a unique name for the team:</p>
            <TextField
              label="Team name"
              placeholder="Enter a team name..."
              variant="outlined"
              fullWidth
              InputLabelProps={{
                shrink: true
              }}
              inputRef={teamName}
              onChange={handleTeamName}
              classes={{ root: classes.input }}
            />
          </div>
          <div className="section2">
            <p>Select the players for the new team:</p>
            <div className="players-selectors">
              <div className="player-selector">
                <Autocomplete
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="Player 1"
                      placeholder="Select a player..."
                      variant="outlined"
                      fullWidth
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                  )}
                  options={[steamNickname]}
                  defaultValue={steamNickname}
                  disabled
                  classes={{ root: classes.input }}
                />
              </div>
              {getPlayersSelectors()}
            </div>
          </div>
          <div className="send-proposal">
            <button
              disabled={isTeamProposalCompleted ? false : true}
              onClick={handleSendTeamProposal}
              className="button"
            >
              SEND TEAM PROPOSAL
            </button>
          </div>
        </Fragment>
      )}
      <style jsx>{styles}</style>
      <style jsx global>
        {stylesGlobal}
      </style>
    </div>
  );
}

export default withStyles(stylesMaterialUI)(TeamInscription);
