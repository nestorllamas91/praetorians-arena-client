import jstz from 'jstz';
import moment from 'moment';
import momentTimezone from 'moment-timezone';

export function getTitles(page) {
  let titleTab = '';
  let titleHeading = '';
  switch (page) {
    case '/_error':
      titleTab = 'Praetorians Arena';
      titleHeading = '';
      break;
    case '/':
      titleTab = 'Praetorians Arena';
      titleHeading = '';
      break;
    case '/competitions':
      titleTab = 'Competitions | Praetorians Arena';
      titleHeading = 'Competitions';
      break;
    case '/games':
      titleTab = 'Games | Praetorians Arena';
      titleHeading = 'Games';
      break;
    case '/players':
      titleTab = 'Players | Praetorians Arena';
      titleHeading = 'Players';
      break;
    case '/stats':
      titleTab = 'Statistics | Praetorians Arena';
      titleHeading = 'Statistics';
      break;
    case '/info':
      titleTab = 'Information | Praetorians Arena';
      titleHeading = 'Information';
      break;
    case '/about':
      titleTab = 'About | Praetorians Arena';
      titleHeading = '';
      break;
    case '/contact':
      titleTab = 'Contact | Praetorians Arena';
      titleHeading = 'Contact';
      break;
    case '/account/profile':
      titleTab = 'Profile | Praetorians Arena';
      titleHeading = 'Profile';
      break;
    case '/account/notifications':
      titleTab = 'Notifications | Praetorians Arena';
      titleHeading = 'Notifications';
      break;
    case '/account/my-inscriptions':
      titleTab = 'My Inscriptions | Praetorians Arena';
      titleHeading = 'My Inscriptions';
      break;
    case '/account/my-inscriptions/team-inscription':
      titleTab = 'My Inscriptions | Praetorians Arena';
      titleHeading = 'My Inscriptions';
      break;
    case '/account/my-rankings':
      titleTab = 'My Rankings | Praetorians Arena';
      titleHeading = 'My Rankings';
      break;
    case '/account/my-rankings/ranking':
      titleTab = 'My Rankings | Praetorians Arena';
      titleHeading = 'My Rankings';
      break;
    case '/account/my-combats':
      titleTab = 'My Combats | Praetorians Arena';
      titleHeading = 'My Combats';
      break;
    case '/account/my-combats/combat':
      titleTab = 'My Combats | Praetorians Arena';
      titleHeading = 'My Combats';
      break;
    case '/account/rankings-state':
      titleTab = 'Rankings State | Praetorians Arena';
      titleHeading = 'Rankings State';
      break;
    case '/terms':
      titleTab = 'Terms | Praetorians Arena';
      titleHeading = 'Terms of Service';
      break;
    case '/privacy':
      titleTab = 'Privacy | Praetorians Arena';
      titleHeading = 'Privacy Policy';
      break;
    case '/license':
      titleTab = 'License | Praetorians Arena';
      titleHeading = 'License';
      break;
  }
  return { titleTab, titleHeading };
}

// Example of input: fullDateISOUTC = '2019-10-14T08:43:14Z'.
export function dateUTCtoLocal(fullDateISOUTC) {
  const timeZone = jstz.determine().name();
  const fullDateISOLocal = momentTimezone(fullDateISOUTC).tz(timeZone).format();
  const dateLocal = momentTimezone(fullDateISOUTC).tz(timeZone).format('D MMMM YYYY');
  const timeLocal = momentTimezone(fullDateISOUTC).tz(timeZone).format('h:mm a (UTCZ)');
  const timeOffset = fullDateISOLocal.substr(19, 6);
  return { fullDateISOLocal, dateLocal, timeLocal, timeOffset };
}

// Example of input: fullDateISOLocal = '2019-10-14T08:43:14'.
export function dateLocaltoUTC(fullDateISOLocal) {
  const timeZone = jstz.determine().name();
  const now = momentTimezone(moment().toISOString()).tz(timeZone).format();
  const timeOffset = now.substr(19, 6);
  fullDateISOLocal = `${fullDateISOLocal}${timeOffset}`;
  const fullDateISOUTC = moment.utc(fullDateISOLocal).format();
  const dateUTC = moment.utc(fullDateISOLocal).format('D MMMM YYYY');
  const timeUTC = moment.utc(fullDateISOLocal).format('h:mm a (UTCZ)');
  return { fullDateISOUTC, dateUTC, timeUTC, timeOffset };
}

export function fixRankingSelectors(season, competition) {
  if (season !== undefined) {
    season = season.replace('q', 'Q');
  }
  if (competition !== undefined) {
    if (competition === 'scoring-xvsx') {
      competition = 'scoring-XvsX';
    }
    competition = competition.replace('-', ' ');
    competition = competition.charAt(0).toUpperCase() + competition.slice(1);
  }

  return { season, competition };
}
