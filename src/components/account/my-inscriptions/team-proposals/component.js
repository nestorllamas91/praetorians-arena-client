import React, { Fragment, useState, useEffect } from 'react';
import styles from '$root/components/account/my-inscriptions/team-proposals/styles';

import axios from 'axios';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import Row from '$root/components/account/my-inscriptions/team-proposals/team-proposal/row/component';
import TeamProposal from '$root/components/account/my-inscriptions/team-proposals/team-proposal/component';

export default function TeamProposals(props) {
  const player = useSelector(({ user }) => user);
  const [teamProposalsError, setTeamProposalsError] = useState(null);
  const [teamProposals, setTeamProposals] = useState(null);

  useEffect(() => {
    if (player.isAuthenticated) {
      getTeamProposals();
    }
  }, [player]);

  async function getTeamProposals() {
    try {
      const url = `/account/my-inscriptions/team-proposals/${player.data.steamId}`;
      const res = await axios.get(url);
      setTeamProposals(res.data);
    } catch (err) {
      setTeamProposalsError(err.response.data);
    }
  }

  function handlePlayerEnrollment() {
    props.playerEnrollment();
  }

  return (
    <div>
      {teamProposals === null ? (
        <Fragment></Fragment>
      ) : (
        <Fragment>
          <h2 className="heading2">Team Proposals</h2>
          <hr />
          <h3 className="heading3">Current Season</h3>
          <span>These are the proposals of new team for the current season.</span>
          <h4 className="heading4 margin-heading">Team Proposals Sent</h4>
          <div className="team-proposals">
            {teamProposals.currentTeamProposals.sent.length === 0 ? (
              <div className="no-proposals-container">
                <span className="no-proposals">You don't have any team proposals sent for the current season.</span>
              </div>
            ) : (
              <TeamProposal>
                {teamProposals.currentTeamProposals.sent.map(ranking => {
                  return ranking.data.map(row => {
                    return row.team.players.map(myPlayer => {
                      if (myPlayer.steamId === player.data.steamId) {
                        return (
                          <Row
                            key={uuidv4()}
                            rankingId={ranking.rankingID}
                            season={ranking.season}
                            competition={ranking.competition}
                            row={row}
                            playerEnrollment={handlePlayerEnrollment}
                          />
                        );
                      }
                    });
                  });
                })}
              </TeamProposal>
            )}
          </div>
          <h4 className="heading4 margin-heading">Team Proposals Received</h4>
          <div className="team-proposals">
            {teamProposals.currentTeamProposals.received.length === 0 ? (
              <div className="no-proposals-container">
                <span className="no-proposals">You don't have any team proposals received for the current season.</span>
              </div>
            ) : (
              <TeamProposal>
                {teamProposals.currentTeamProposals.received.map(ranking => {
                  return ranking.data.map(row => {
                    return row.team.players.map(myPlayer => {
                      if (myPlayer.steamId === player.data.steamId) {
                        return (
                          <Row
                            key={uuidv4()}
                            rankingId={ranking.rankingID}
                            season={ranking.season}
                            competition={ranking.competition}
                            row={row}
                            playerEnrollment={handlePlayerEnrollment}
                          />
                        );
                      }
                    });
                  });
                })}
              </TeamProposal>
            )}
          </div>
          <h3 className="heading3 margin-heading">Next Season</h3>
          <span>These are the proposals of new team for the next season.</span>
          <h4 className="heading4 margin-heading">Team Proposals Sent</h4>
          <div className="team-proposals">
            {teamProposals.nextTeamProposals.sent.length === 0 ? (
              <div className="no-proposals-container">
                <span className="no-proposals">You don't have any team proposals sent for the next season.</span>
              </div>
            ) : (
              <TeamProposal>
                {teamProposals.nextTeamProposals.sent.map(ranking => {
                  return ranking.data.map(row => {
                    return row.team.players.map(myPlayer => {
                      if (myPlayer.steamId === player.data.steamId) {
                        return (
                          <Row
                            key={uuidv4()}
                            rankingId={ranking.rankingID}
                            season={ranking.season}
                            competition={ranking.competition}
                            row={row}
                            playerEnrollment={handlePlayerEnrollment}
                          />
                        );
                      }
                    });
                  });
                })}
              </TeamProposal>
            )}
          </div>
          <h4 className="heading4 margin-heading">Team Proposals Received</h4>
          <div className="team-proposals">
            {teamProposals.nextTeamProposals.received.length === 0 ? (
              <div className="no-proposals-container">
                <span className="no-proposals">You don't have any team proposals received for the next season.</span>
              </div>
            ) : (
              <TeamProposal>
                {teamProposals.nextTeamProposals.received.map(ranking => {
                  return ranking.data.map(row => {
                    return row.team.players.map(myPlayer => {
                      if (myPlayer.steamId === player.data.steamId) {
                        return (
                          <Row
                            key={uuidv4()}
                            rankingId={ranking.rankingID}
                            season={ranking.season}
                            competition={ranking.competition}
                            row={row}
                            playerEnrollment={handlePlayerEnrollment}
                          />
                        );
                      }
                    });
                  });
                })}
              </TeamProposal>
            )}
          </div>
          <h3 className="heading3 margin-heading">Past Seasons</h3>
          <span>These are the proposals of new team for the next season.</span>
          <h4 className="heading4 margin-heading">Team Proposals Sent</h4>
          <div className="team-proposals">
            {teamProposals.pastTeamProposals.sent.length === 0 ? (
              <div className="no-proposals-container">
                <span className="no-proposals">You don't have any team proposals sent for the past seasons.</span>
              </div>
            ) : (
              <TeamProposal>
                {teamProposals.pastTeamProposals.sent.map(ranking => {
                  return ranking.data.map(row => {
                    return row.team.players.map(myPlayer => {
                      if (myPlayer.steamId === player.data.steamId) {
                        return (
                          <Row
                            key={uuidv4()}
                            rankingId={ranking.rankingID}
                            season={ranking.season}
                            competition={ranking.competition}
                            row={row}
                            playerEnrollment={handlePlayerEnrollment}
                          />
                        );
                      }
                    });
                  });
                })}
              </TeamProposal>
            )}
          </div>
          <h4 className="heading4 margin-heading">Team Proposals Received</h4>
          <div className="team-proposals">
            {teamProposals.pastTeamProposals.received.length === 0 ? (
              <div className="no-proposals-container">
                <span className="no-proposals">You don't have any team proposals received for the past seasons.</span>
              </div>
            ) : (
              <TeamProposal>
                {teamProposals.pastTeamProposals.received.map(ranking => {
                  return ranking.data.map(row => {
                    return row.team.players.map(myPlayer => {
                      if (myPlayer.steamId === player.data.steamId) {
                        return (
                          <Row
                            key={uuidv4()}
                            rankingId={ranking.rankingID}
                            season={ranking.season}
                            competition={ranking.competition}
                            row={row}
                            playerEnrollment={handlePlayerEnrollment}
                          />
                        );
                      }
                    });
                  });
                })}
              </TeamProposal>
            )}
          </div>
        </Fragment>
      )}
      <style jsx>{styles}</style>
    </div>
  );
}
