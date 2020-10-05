import React, { Fragment, useState, useEffect } from 'react';
import styles from '$root/components/account/rankings-state/styles';

import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import Rankings from '$root/components/account/rankings-state/rankings/component';
import Ranking from '$root/components/account/rankings-state/rankings/ranking/component';

export default function RankingsState() {
  const [rankingsError, setRankingsError] = useState(null);
  const [rankings, setRankings] = useState(null);
  const [flagReRender, setFlagReRender] = useState(false);

  useEffect(() => {
    getRankings();
  }, [flagReRender]);

  async function getRankings() {
    try {
      const url = '/account/rankings-state/rankings';
      const res = await axios.get(url);
      setRankings(res.data.output.data);
    } catch (err) {
      setRankingsError(err.response.data.status.code);
    }
  }

  function handleUpdateRankingState() {
    setFlagReRender(prevFlagReRender => !prevFlagReRender);
  }

  return (
    <div className="main-container">
      {rankings === null ? (
        <Fragment></Fragment>
      ) : (
        <Fragment>
          <h2 className="heading2">"Inscription" - Next Season</h2>
          <hr />
          <span>
            These are the rankings from the next season (players are not playing yet), that are available for
            inscription.
          </span>
          <div className="rankings">
            {rankings.inscription.length === 0 ? (
              <div className="no-rankings-container">
                <span className="no-rankings">
                  There is no ranking from the next season that is available for inscription.
                </span>
              </div>
            ) : (
              <Rankings>
                {rankings.inscription.map(ranking => (
                  <Ranking key={uuidv4()} ranking={ranking} handleUpdateRankingState={handleUpdateRankingState} />
                ))}
              </Rankings>
            )}
          </div>
          <h2 className="heading2">"Playing" - Current Season</h2>
          <hr />
          <span>
            These are the rankings from the current season (players are playing), whether they are available for
            inscription or not.
          </span>
          <div className="rankings">
            {rankings.playing.length === 0 ? (
              <div className="no-rankings-container">
                <span className="no-rankings">
                  There is no ranking from the current season, whether it is available for inscription or not.
                </span>
              </div>
            ) : (
              <Rankings>
                {rankings.playing.map(ranking => (
                  <Ranking key={uuidv4()} ranking={ranking} handleUpdateRankingState={handleUpdateRankingState} />
                ))}
              </Rankings>
            )}
          </div>
          <h2 className="heading2">"Closed" - Past Seasons</h2>
          <hr />
          <span>These are the rankings from past seasons (players have already played).</span>
          <div className="rankings">
            {rankings.closed.length === 0 ? (
              <div className="no-rankings-container">
                <span className="no-rankings">There is no ranking from past seasons.</span>
              </div>
            ) : (
              <Rankings>
                {rankings.closed.map(ranking => (
                  <Ranking key={uuidv4()} ranking={ranking} handleUpdateRankingState={handleUpdateRankingState} />
                ))}
              </Rankings>
            )}
          </div>
          <h2 className="heading2">"Canceled" - Past Seasons and Next Season</h2>
          <hr />
          <span>
            These are the rankings whether they are from past seasons or the next season whose inscription has been
            canceled (players don't play).
          </span>
          <div className="rankings">
            {rankings.canceled.length === 0 ? (
              <div className="no-rankings-container">
                <span className="no-rankings">
                  There is no ranking whether they are from past seasons or the next season whose inscription has been
                  canceled.
                </span>
              </div>
            ) : (
              <Rankings>
                {rankings.canceled.map(ranking => (
                  <Ranking key={uuidv4()} ranking={ranking} handleUpdateRankingState={handleUpdateRankingState} />
                ))}
              </Rankings>
            )}
          </div>
        </Fragment>
      )}
      <style jsx>{styles}</style>
    </div>
  );
}
