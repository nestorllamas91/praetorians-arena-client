import React, { Fragment, useState, useEffect } from 'react';
import styles from '$root/components/account/my-rankings/styles';

import axios from 'axios';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import Ranking from '$root/components/competitions/ranking/component';
import Row from '$root/components/competitions/ranking/row/component';

export default function MyRankings() {
  const player = useSelector(({ user }) => user);
  const [rankingsError, setRankingsError] = useState(null);
  const [rankings, setRankings] = useState(null);

  useEffect(() => {
    if (player.isAuthenticated) {
      getRankings();
    }
  }, [player]);

  async function getRankings() {
    try {
      const url = `/account/my-rankings/rankings/${player.data.steamId}`;
      const res = await axios.get(url);
      setRankings(res.data.output.data);
    } catch (err) {
      setRankingsError(err.response.data.status.code);
    }
  }

  return (
    <div className="main-container">
      {rankings === null ? (
        <Fragment></Fragment>
      ) : (
        <Fragment>
          <h2 className="heading2 first-heading">Current Season</h2>
          <hr />
          <span>These are the rankings from the current season in which you participate.</span>
          <div className="rankings">
            {rankings.current.length === 0 ? (
              <div className="no-rankings-container">
                <span className="no-rankings">You are not participating in any ranking of the current season.</span>
              </div>
            ) : (
              <Ranking viewData="ranking3">
                {rankings.current.map(currentRanking => {
                  return currentRanking.data.map(row => (
                    <Row key={uuidv4()} ranking={currentRanking} row={row} viewData="ranking3" />
                  ));
                })}
              </Ranking>
            )}
          </div>
          <h2 className="heading2 title-next-rankings">Next Season</h2>
          <hr />
          <span>These are the rankings from the next season in which you are going to participate.</span>
          <div className="rankings">
            {rankings.next.length === 0 ? (
              <div className="no-rankings-container">
                <span className="no-rankings">
                  You are not going to participate in any ranking of the next season yet.
                </span>
              </div>
            ) : (
              <Ranking viewData="ranking3">
                {rankings.next.map(nextRanking => {
                  return nextRanking.data.map(row => (
                    <Row key={uuidv4()} ranking={nextRanking} row={row} viewData="ranking3" />
                  ));
                })}
              </Ranking>
            )}
          </div>
          <h2 className="heading2 title-past-rankings">Past Seasons</h2>
          <hr />
          <span>These are the rankings from past seasons in which you participated.</span>
          <div className="rankings">
            {rankings.past.length === 0 ? (
              <div className="no-rankings-container">
                <span className="no-rankings">You didn't participate in any ranking of past seasons.</span>
              </div>
            ) : (
              <Ranking viewData="ranking3">
                {rankings.past.map(pastRanking => {
                  return pastRanking.data.map(row => (
                    <Row key={uuidv4()} ranking={pastRanking} row={row} viewData="ranking3" />
                  ));
                })}
              </Ranking>
            )}
          </div>
        </Fragment>
      )}
      <style jsx>{styles}</style>
    </div>
  );
}
