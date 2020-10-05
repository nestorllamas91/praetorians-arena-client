import React from 'react';
import styles from '$root/components/info/styles';

import ScrollableAnchor, { configureAnchors } from 'react-scrollable-anchor';

export default function Information() {
  configureAnchors({ offset: -60, scrollDuration: 1000 });

  return (
    <div className="main-container">
      <h2 className="heading2">Table of contents</h2>
      <hr />
      <p>
        <a href="#the-administrators">1. The administrators</a>
        <br />
        <a href="#the-register">2. The register</a>
        <br />
        <a href="#the-system">3. The system</a>
        <br />
        <a href="#the-competitions">4. The competitions</a>
        <br />
        <a href="#the-rules">5. The rules</a>
        <br />
        <a href="#the-calendar">6. The calendar</a>
        <br />
        <a href="#the-prizes">7. The prizes</a>
      </p>
      <ScrollableAnchor id="the-administrators">
        <div>
          <h2 className="heading2">1. The administrators</h2>
          <hr />
          <p>
            The administrators in this platform are known as Guards, and each one has different roles. The roles are
            basically: design of the system, development of the website, support on the Praetorians Arena Forum as well
            as on the Praetorians Arena Discord Server, and make advertising to compete on the platform. The Guards are
            players of the videogame and can even participate in the own competitions of the platform, there is no
            restriction for it.
          </p>
        </div>
      </ScrollableAnchor>
      <ScrollableAnchor id="the-register">
        <div>
          <h2 className="heading2">2. The register</h2>
          <hr />
          <p>
            Registration on the platform is free for everyone without any kind of requirement. You don't have to pay
            anything to compete in this platform. We allow any player, all what you need is a Steam account that you
            will use to compete in this platform. So you have to authenticate in this website via Steam. Apart you must
            also register in the forum of this website, if you want to participate on its discussions.
          </p>
          <p>
            In order to enroll in any ranking you will need to do that through your account panel. Although depending on
            the type of competition the period of time to enroll for each season may be limited. This means that you can
            enroll in some rankings throughout all the season, but for other ones you cannot enroll in them once the
            season has started. In any case, the inscription period for all the rankings for each next season will start
            7 days before the beginning of such season.
          </p>
        </div>
      </ScrollableAnchor>
      <ScrollableAnchor id="the-system">
        <div>
          <h2 className="heading2">3. The system</h2>
          <hr />
          <p>
            On each season you will be able to enroll in the different available competitions. Once enrolled as a player
            or as a team, depending on the type of competition the games will be played differently: playing with a
            calendar and schedule of combats that are already planned since the beginning of the season, challenging and
            scheduling combats with an appointment, or playing casual games with no appointment.
          </p>
          <p>
            For the combats that are scheduled, at the date of the game the 2 players (or 2 teams) of the combat must be
            present. If a player (or at least 1 player of a team) is not present, then the other player (or team) will
            automatically win such combat if he (or all the players of the team) is present. If both players (or teams)
            are not present, then both will automatically lose with its corresponding consequence depending on the type
            of competition.
          </p>
          <p>
            After a combat or a game is played, the winning player (or the representant player from the winning team)
            must upload the corresponding sequence files of the games into this website, so the system can compute its
            data and automate the results. A combat is a set of games that are played at once between two players or two
            teams. The possible results of any combat can be 2-0 or 2-1. The sequence files will have to be approved by
            the losing player (or by the representant player from the losing team) in order to be verified. After a
            certain period of time, if it has not been verified by the loser, the combat will be automatically
            self-verified.
          </p>
        </div>
      </ScrollableAnchor>
      <ScrollableAnchor id="the-competitions">
        <div>
          <h2 className="heading2">4. The competitions</h2>
          <hr />
          <p>
            There are 3 types of competition (Dueling, Scoring, and Tournament), which will all be available for
            enrollment on each season. In turn, each type of competition is played with one of the 4 possible modes of
            competition (1vs1, 2vs2, 3vs3, 4vs4), depending on the season. The exception is the type of competition
            Scoring, which allows the player to play any of these 4 modes of competition throughout a same season, and
            for every season.
          </p>
          <p>
            Within a same season the mode of competition can differ among the different types of competition. Also,
            between seasons the mode of competition can differ for each particular type of competition. In fact, the
            idea is to keep changing the mode of competition for each type of competition on each new season. So the
            mode of competition is independent of the season as well as it is independent of the type of competition.
          </p>
          <p>Let's explain briefly what basically each type of competition consists of:</p>
          <ul className="unordered-list">
            <li>
              Dueling: competition based in challenges where each player or team can play any number of combats against
              any of all the other players or teams but with a limit of 1 combat per week against the same player or
              team. You earn points for each combat won, and at the end of the season the player or team with the
              highest score is the winner.
            </li>
            <li>
              Scoring: competition where the players or teams compete to get the highest score after adding the scores
              of all the individual uploaded games that are played anytime during a same season. As the opponents of
              such games don't need to be competing in this platform and differ on each game, here playing combats
              doesn't make sense, so all the games are treated individually.
            </li>
            <li>
              Tournament: eliminatory competition consisting of a confrontation between every 2 players or 2 teams in
              each round. Each confrontation consists of 2 combats. The player or team with better results in such 2
              combats will be the winning player or team of that confrontation and will go to the next round. The losing
              player or team will be eliminated from the competition.
            </li>
          </ul>
        </div>
      </ScrollableAnchor>
      <ScrollableAnchor id="the-rules">
        <div>
          <h2 className="heading2">5. The rules</h2>
          <hr />
          <p>
            All the played games of any type of competition have no specific rules, that is, you can play without any
            rule. There are no restrictions or limitations. You can recruit unlimited types of troops or build unlimited
            types of constructions at anytime.
          </p>
          <p>
            The only limitation is the play time for each game of a combat and the total time for each combat.
            Specifically, the play time for each game is 40 minutes, while the total time for each combat is 3 hours.
          </p>
        </div>
      </ScrollableAnchor>
      <ScrollableAnchor id="the-calendar">
        <div>
          <h2 className="heading2">6. The calendar</h2>
          <hr />
          <p>
            Each season lasts one quarter, so in a year there are 4 seasons, each one belonging to each quarter of the
            year:
          </p>
          <ul className="unordered-list">
            <li>Quarter 1 (Q1): from 1st January to 31st March of every year.</li>
            <li>Quarter 2 (Q2): from 1st April to 30th June of every year.</li>
            <li>Quarter 3 (Q3): from 1st July to 30th September of every year.</li>
            <li>Quarter 4 (Q4): from 1st October to 31st December of every year.</li>
          </ul>
          <p>All the competitions are based on this calendar.</p>
          <p>
            As stated before, for some types of competition the period of time to enroll for each season is limited,
            while for other types of competition it is unlimited. In particular, for the types of competition Dueling
            and Scoring you can opt to enroll to the current season at anytime, but for the type of competition
            Tournament you must always wait to enroll to the next season, and then enroll during the 7 days before the
            beginning of such season. Once started any particular competition, you cannot enroll in such season if you
            haven't done it yet.
          </p>
          <p>
            Depending on the competition, the calendar and schedule to play the combats will be different. For the type
            of competition Tournament there is a preset calendar and schedule to play each combat throughout each
            season. For the type of competition Dueling the calendar and schedule to play each combat are based on
            appointments requested by agreement between 2 players or 2 teams. And for the type of competition Scoring
            there is not any calendar or schedule, as the system is opened 24 hours everyday in order to receive from
            the players all the possible played games within a particular season.
          </p>
        </div>
      </ScrollableAnchor>
      <ScrollableAnchor id="the-prizes">
        <div>
          <h2 className="heading2">7. The prizes</h2>
          <hr />
          <p>
            As this platform is unofficial and not supported by Kalypso Media Group (the publisher of the videogame),
            and this does not allow commercial use with their products for unofficial platforms, this website is
            completely non-commercial, it cannot be monetized in any way, therefore money prizes are not allowed. So
            this is just a platform free to join, but also with no prizes.
          </p>
        </div>
      </ScrollableAnchor>
      <style jsx>{styles}</style>
    </div>
  );
}
