import React, { Fragment, useState, useEffect } from 'react';
import styles from '$root/components/competitions/styles';

import axios from 'axios';
import { useSelector } from 'react-redux';
import { fixRankingSelectors } from '$root/utils/functions';
import Router, { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';

import Ranking from '$root/components/competitions/ranking/component';
import Row from '$root/components/competitions/ranking/row/component';
import NameRanking from '$root/components/competitions/name-ranking/component';

export default function Competitions() {
  const player = useSelector(({ user }) => user);
  const router = useRouter();
  let rankingId = null;
  let user = null;
  if (router) {
    rankingId = router.query.rankingId;
    user = router.query.user;
  }
  const [currentCompetitionsError, setCurrentCompetitionsError] = useState(null);
  const [currentCompetitions, setCurrentCompetitions] = useState([]);
  const [rankingError, setRankingError] = useState(null);
  const [ranking, setRanking] = useState(null);
  const [rankingHasParticipants, setRankingHasParticipants] = useState(false);

  useEffect(() => {
    if (rankingId) {
      getRanking();
    }
  }, [rankingId, rankingHasParticipants]);

  useEffect(() => {
    if (ranking) {
      getCompetitionsCurrentSeason();
    }
  }, [ranking, rankingHasParticipants]);

  async function getRanking() {
    try {
      const url = `/competitions/ranking/${rankingId}`;
      const res = await axios.get(url);
      setRanking(res.data.output.data);
      if (res.data.output.data !== '') {
        let hasParticipants = false;
        res.data.output.data.data.map(row => {
          if (row.enrollmentState === 'accepted') {
            hasParticipants = true;
          }
        });
        if (hasParticipants === true) {
          setRankingHasParticipants(true);
        } else {
          setRankingHasParticipants(false);
        }
      }
    } catch (err) {
      setRankingError(err.response.data.status.code);
    }
  }

  async function getCompetitionsCurrentSeason() {
    try {
      const url = `/competitions/competitions/${ranking.season}`;
      const res = await axios.get(url);
      setCurrentCompetitions(res.data.output.data);
    } catch (err) {
      setCurrentCompetitionsError(err.response.data.status.code);
    }
  }

  function handleClickCompetition(competition) {
    const typeCompetition = competition.competition.split('-')[0];
    if (player.isAuthenticated && typeCompetition === 'dueling') {
      Router.push(`/competitions/${competition.rankingID}?user=true`);
    } else {
      Router.push(`/competitions/${competition.rankingID}`);
    }
  }

  return (
    <div>
      {!rankingId ? (
        <Fragment></Fragment>
      ) : (
        <Fragment>
          <h2 className="heading2 subtitle">Season</h2>
          <div className="selector-competition">
            {currentCompetitions.length === 0 ? (
              <Fragment></Fragment>
            ) : (
              currentCompetitions.map(myCompetition => {
                const { competition } = fixRankingSelectors(undefined, myCompetition.competition);
                return (
                  <div
                    key={uuidv4()}
                    className={`selector ${Number(rankingId) === myCompetition.rankingID ? 'active-page' : ''}`}
                  >
                    <a key={uuidv4()} onClick={() => handleClickCompetition(myCompetition)} className="link">
                      {competition}
                    </a>
                  </div>
                );
              })
            )}
          </div>
          <div className="main-container rankings-container">
            <div className="ranking">
              {ranking === null ? (
                <Fragment></Fragment>
              ) : rankingHasParticipants === false ? (
                <Fragment>
                  <NameRanking
                    season={ranking.season}
                    competition={ranking.competition}
                    fontSize="big"
                    alignment="center"
                  />
                  <hr />
                  <span className="no-ranking">This ranking currently has no participants yet.</span>
                </Fragment>
              ) : (
                <Fragment>
                  <NameRanking
                    season={ranking.season}
                    competition={ranking.competition}
                    fontSize="big"
                    alignment="center"
                  />
                  <hr />
                  <div className="ranking-table">
                    <h3 className="heading3 first-heading my-heading">Ranking</h3>
                    <Ranking
                      numPlayersPerGame={ranking.numPlayersPerGame}
                      viewData={user === 'true' ? 'ranking1' : 'ranking2'}
                    >
                      {ranking.data.map(row => {
                        if (row.enrollmentState === 'accepted') {
                          return (
                            <Row
                              key={uuidv4()}
                              ranking={ranking}
                              row={row}
                              viewData={user === 'true' ? 'ranking1' : 'ranking2'}
                            />
                          );
                        }
                      })}
                    </Ranking>
                  </div>
                  <div className="combats-list">
                    {(() => {
                      switch (ranking.competition.split('-')[0]) {
                        case 'dueling':
                          return <h3 className="heading3 my-heading">Combats</h3>;
                        case 'scoring':
                          return <h3 className="heading3 my-heading">Games</h3>;
                        case 'tournament':
                          return <h3 className="heading3 my-heading">Combats</h3>;
                      }
                    })()}
                  </div>
                </Fragment>
              )}
            </div>
          </div>
        </Fragment>
      )}
      <style jsx>{styles}</style>
    </div>
  );
}
