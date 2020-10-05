import React, { Fragment, useState, useEffect } from 'react';
import styles from '$root/components/account/my-combats/styles';

import axios from 'axios';
import { useSelector } from 'react-redux';
import { fixRankingSelectors } from '$root/utils/functions';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

import Combat from '$root/components/account/my-combats/combat/component';

export default function MyCombats() {
  const player = useSelector(({ user }) => user);
  const [combatsError, setCombatsError] = useState(null);
  const [combats, setCombats] = useState(null);

  useEffect(() => {
    if (player.isAuthenticated) {
      getCombats();
    }
  }, [player]);

  async function getCombats() {
    try {
      const url = `/account/my-combats/combats/${player.data.steamId}`;
      const res = await axios.get(url);
      setCombats(res.data);
    } catch (err) {
      setCombatsError(err.response.data);
    }
  }

  return (
    <div className="main-container">
      {combats === null ? (
        <Fragment></Fragment>
      ) : (
        <Fragment>
          <h2 className="heading2 first-heading">Current Combats</h2>
          <hr />
          <span>These are the combats that are pending to be played.</span>
          <h3 className="heading3 margin-heading">Current Combats Sent</h3>
          <div className="combats">
            {combats.currentCombats.sent.length === 0 ? (
              <div className="no-combats-container">
                <span className="no-combats">You don't have any combat sent pending to be played.</span>
              </div>
            ) : (
              combats.currentCombats.sent.map(combat => {
                const { season, competition } = fixRankingSelectors(combat.season, combat.competition);
                return (
                  <Combat
                    key={uuidv4()}
                    season={season}
                    competition={competition}
                    rankingId={combat.rankingId}
                    combatId={combat.combatId}
                    startDate={moment(combat.startDate).format('D MMMM YYYY h:mm a (UTCZ)')}
                    endDate={moment(combat.endDate).format('D MMMM YYYY h:mm a (UTCZ)')}
                    teamName1={combat.opponents.teamName1}
                    teamName2={combat.opponents.teamName2}
                  />
                );
              })
            )}
          </div>
          <h3 className="heading3 margin-heading">Current Combats Received</h3>
          <div className="combats">
            {combats.currentCombats.received.length === 0 ? (
              <div className="no-combats-container">
                <span className="no-combats">You don't have any combat received pending to be played.</span>
              </div>
            ) : (
              combats.currentCombats.received.map(combat => {
                const { season, competition } = fixRankingSelectors(combat.season, combat.competition);
                return (
                  <Combat
                    key={uuidv4()}
                    season={season}
                    competition={competition}
                    rankingId={combat.rankingId}
                    combatId={combat.combatId}
                    startDate={moment(combat.startDate).format('D MMMM YYYY h:mm a (UTCZ)')}
                    endDate={moment(combat.endDate).format('D MMMM YYYY h:mm a (UTCZ)')}
                    teamName1={combat.opponents.teamName1}
                    teamName2={combat.opponents.teamName2}
                  />
                );
              })
            )}
          </div>
          <h2 className="heading2 past-combats">Past Combats</h2>
          <hr />
          <span>These are the combats that have already been played.</span>
          <h3 className="heading3 margin-heading">Past Combats Sent</h3>
          <div className="combats">
            {combats.pastCombats.sent.length === 0 ? (
              <div className="no-combats-container">
                <span className="no-combats">You don't have any combat sent that has been played.</span>
              </div>
            ) : (
              combats.pastCombats.sent.map(combat => {
                const { season, competition } = fixRankingSelectors(combat.season, combat.competition);
                return (
                  <div key={uuidv4()}>
                    <Combat
                      season={season}
                      competition={competition}
                      rankingId={combat.rankingId}
                      combatId={combat.combatId}
                      startDate={moment(combat.startDate).format('D MMMM YYYY h:mm a (UTCZ)')}
                      endDate={moment(combat.endDate).format('D MMMM YYYY h:mm a (UTCZ)')}
                      teamName1={combat.opponents.teamName1}
                      teamName2={combat.opponents.teamName2}
                    />
                  </div>
                );
              })
            )}
          </div>
          <h3 className="heading3 margin-heading">Past Combats Received</h3>
          <div className="combats">
            {combats.pastCombats.received.length === 0 ? (
              <div className="no-combats-container">
                <span className="no-combats">You don't have any combat received that has been played.</span>
              </div>
            ) : (
              combats.pastCombats.received.map(combat => {
                const { season, competition } = fixRankingSelectors(combat.season, combat.competition);
                return (
                  <div key={uuidv4()}>
                    <Combat
                      season={season}
                      competition={competition}
                      rankingId={combat.rankingId}
                      combatId={combat.combatId}
                      startDate={moment(combat.startDate).format('D MMMM YYYY h:mm a (UTCZ)')}
                      endDate={moment(combat.endDate).format('D MMMM YYYY h:mm a (UTCZ)')}
                      teamName1={combat.opponents.teamName1}
                      teamName2={combat.opponents.teamName2}
                    />
                  </div>
                );
              })
            )}
          </div>
        </Fragment>
      )}
      <style jsx>{styles}</style>
    </div>
  );
}
