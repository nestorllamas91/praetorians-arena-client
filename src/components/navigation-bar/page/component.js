import React, { Fragment, useState, useEffect } from 'react';
import styles from '$root/components/navigation-bar/page/styles';

import axios from 'axios';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Router from 'next/router';
import { v4 as uuidv4 } from 'uuid';

export default function Page(props) {
  const player = useSelector(({ user }) => user);
  const [isInscriptionPeriodError, setIsInscriptionPeriodError] = useState(null);
  const [isInscriptionPeriod, setIsInscriptionPeriod] = useState(false);
  const [selectionRankingError, setSelectionRankingError] = useState(null);

  useEffect(() => {
    checkInscriptionPeriod();
  }, []);

  async function checkInscriptionPeriod() {
    try {
      const currentYear = moment().year();
      const currentQuarter = moment().quarter();
      const nextSeason = currentQuarter < 4 ? `${currentYear}-q${currentQuarter + 1}` : `${currentYear + 1}-q1`;
      const url = `/competitions/competitions/${nextSeason}`;
      const res = await axios.get(url);
      if (res.data.output.data.length !== 0) setIsInscriptionPeriod(true);
    } catch (err) {
      setIsInscriptionPeriodError(err.response.data.status.code);
    }
  }

  function handleClickPage() {
    if (props.page === '/help') {
      Router.push('/info');
    } else {
      Router.push(props.page);
    }
  }

  async function handleSeason(year, quarter) {
    try {
      const url1 = `/competitions/competitions/${year}-q${quarter}`;
      const res1 = await axios.get(url1);
      const firstCompetition = res1.data.output.data[0].competition;
      const firstTypeCompetition = firstCompetition.split('-')[0];
      const url2 = `/competitions/ranking/${year}-q${quarter}/${firstCompetition}`;
      const res2 = await axios.get(url2);
      if (player.isAuthenticated && firstTypeCompetition === 'dueling') {
        Router.push(`/competitions/${res2.data.output.data.rankingID}?user=true`);
      } else {
        Router.push(`/competitions/${res2.data.output.data.rankingID}`);
      }
    } catch (err) {
      setSelectionRankingError(err.response.data.status.code);
    }
  }

  function handleClickInformation() {
    Router.push('/info');
  }

  function handleClickAbout() {
    Router.push('/about');
  }

  function handleClickForum() {
    Router.push('/forum');
  }

  function handleClickContact() {
    Router.push('/contact');
  }

  return (
    <Fragment>
      {(() => {
        switch (props.page) {
          case '/competitions':
            const currentYear = moment().year();
            const currentQuarter = moment().quarter();
            return (
              <li className="menu1-container">
                <a
                  onClick={() => handleSeason(currentYear, currentQuarter)}
                  className={`link item ${props.activePage === props.page ? 'active-page' : ''}`}
                >
                  Competitions
                </a>
                <ul className="menu1 menu1-rankings">
                  {props.seasons === null ? (
                    <Fragment></Fragment>
                  ) : (
                    props.seasons.map(season => {
                      for (let year in season) {
                        const quarters = season[year].quarters;
                        const lastQuarter = quarters[quarters.length - 1];
                        const myQuarters = quarters.map(quarter => (
                          <li key={uuidv4()}>
                            <a onClick={() => handleSeason(year, quarter)} className="link">
                              {`Quarter ${quarter}`}
                            </a>
                          </li>
                        ));
                        return (
                          <li key={uuidv4()}>
                            <a onClick={() => handleSeason(year, lastQuarter)} className="link">
                              {year}
                            </a>
                            <ul className="menu2 menu2-rankings">{myQuarters}</ul>
                          </li>
                        );
                      }
                    })
                  )}
                </ul>
              </li>
            );
          case '/stats':
            return (
              <li>
                <a
                  onClick={handleClickPage}
                  className={`link item ${props.activePage === props.page ? 'active-page' : ''}`}
                >
                  Statistics
                </a>
              </li>
            );
          case '/help':
            return (
              <li className="menu1-container">
                <a
                  onClick={handleClickPage}
                  className={`link item ${
                    props.activePage === '/info' || props.activePage === '/about' || props.activePage === '/contact'
                      ? 'active-page'
                      : ''
                  }`}
                >
                  Help
                </a>
                <ul className="menu1 menu1-help">
                  <li>
                    <a onClick={handleClickInformation} className="link">
                      Information
                    </a>
                  </li>
                  <li>
                    <a onClick={handleClickAbout} className="link">
                      About
                    </a>
                  </li>
                  <li>
                    <a onClick={handleClickContact} className="link">
                      Contact
                    </a>
                  </li>
                </ul>
              </li>
            );
          default:
            return (
              <li>
                <a
                  onClick={handleClickPage}
                  className={`link item ${props.activePage === props.page ? 'active-page' : ''}`}
                >
                  {props.page.charAt(1).toUpperCase() + props.page.slice(2)}
                </a>
              </li>
            );
        }
      })()}
      <style jsx>{styles}</style>
    </Fragment>
  );
}
