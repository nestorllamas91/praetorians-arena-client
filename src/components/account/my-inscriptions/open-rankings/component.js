import React, { Fragment, useState, useEffect } from 'react';
import styles from '$root/components/account/my-inscriptions/open-rankings/styles';

import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import OpenRanking from '$root/components/account/my-inscriptions/open-rankings/open-rankings-tables/open-ranking/component';
import OpenRankingsTables from '$root/components/account/my-inscriptions/open-rankings/open-rankings-tables/component';

export default function OpenRakings() {
  const [openRankingsError, setOpenRankingsError] = useState(null);
  const [openRankings, setOpenRankings] = useState(null);

  useEffect(() => {
    getOpenRankings();
  }, []);

  async function getOpenRankings() {
    try {
      const url = '/account/my-inscriptions/open-rankings';
      const res = await axios.get(url);
      setOpenRankings(res.data);
    } catch (err) {
      setOpenRankingsError(err.response.data);
    }
  }

  return (
    <div>
      {openRankings === null ? (
        <Fragment></Fragment>
      ) : (
        <Fragment>
          <h2 className="heading2 first-heading">Rankings Available for Inscription</h2>
          <hr />
          <h3 className="heading3">Current Season</h3>
          <span>These are the rankings from the current season that are available for inscription.</span>
          <div className="rankings">
            {openRankings.openCurrentRankings.length === 0 ? (
              <div className="no-rankings-container">
                <span className="no-rankings">
                  There is no ranking for the current season available for inscription yet.
                </span>
              </div>
            ) : (
              <OpenRankingsTables>
                {openRankings.openCurrentRankings.map(ranking => (
                  <OpenRanking key={uuidv4()} ranking={ranking} />
                ))}
              </OpenRankingsTables>
            )}
          </div>
          <h3 className="heading3 next-rankings">Next Season</h3>
          <span>These are the rankings from the next season that are available for inscription.</span>
          <div className="rankings">
            {openRankings.openNextRankings.length === 0 ? (
              <div className="no-rankings-container">
                <span className="no-rankings">
                  There is no ranking for the next season available for inscription yet.
                </span>
              </div>
            ) : (
              <Fragment>
                <OpenRankingsTables>
                  {openRankings.openNextRankings.map(ranking => (
                    <OpenRanking key={uuidv4()} ranking={ranking} />
                  ))}
                </OpenRankingsTables>
              </Fragment>
            )}
          </div>
        </Fragment>
      )}
      <style jsx>{styles}</style>
    </div>
  );
}
