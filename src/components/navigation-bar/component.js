import React, { Fragment, useState, useEffect } from 'react';
import styles, { stylesMaterialUI } from '$root/components/navigation-bar/styles';
import { withStyles } from '@material-ui/styles';

import axios from 'axios';
import moment from 'moment-timezone';
import Router from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'universal-cookie';

import MenuAccount1 from '$root/components/navigation-bar/menu-account-1/component';
import MenuAccount2 from '$root/components/navigation-bar/menu-account-2/component';
import Page from '$root/components/navigation-bar/page/component';
import { logInUser, logOutUser } from '$root/slices/users';
import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';

function NavigationBar(props) {
  const { classes } = props;
  const dispatch = useDispatch();
  const player = useSelector(({ user }) => user);
  const [seasonsError, setSeasonsError] = useState(null);
  const [seasons, setSeasons] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  let isAccountMenuOpen = Boolean(anchorEl);
  const [playerIsAdmin, setPlayerIsAdmin] = useState(false);
  const numNotifications = 17;

  useEffect(() => {
    checkAuthentication();
    getSeasons();
  }, [player]);

  function checkAuthentication() {
    if (player.isAuthenticated && player.data.steamId === '76561199065302814') {
      setPlayerIsAdmin(true);
    }
  }

  async function getSeasons() {
    try {
      const url = '/competitions/seasons';
      const res = await axios.get(url);
      setSeasons(res.data.output.data);
    } catch (err) {
      setSeasonsError(err.response.data.status.code);
    }
  }

  function handleClickHome() {
    Router.push('/');
  }

  function handleClickLogin() {
    dispatch(logInUser());
  }

  function setDateAndTime() {
    setInterval(() => {
      setLocalDate(moment().format('DD/MM/YYYY'));
      setLocalTime(moment().format('h:mm a'));
      setLocalTimeZoneUTCOffset(moment().tz(moment.tz.guess(true)).format('UTCZ'));
      setUTCDate(moment.utc().format('DD/MM/YYYY'));
      setUTCTime(moment.utc().format('h:mm a'));
    }, 1000);
  }

  function handleAccountMenuOpen(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleAccountMenuClose() {
    setAnchorEl(null);
  }

  function handleProfile() {
    setAnchorEl(null);
    Router.push('/account/profile');
  }

  function handleNotifications() {
    setAnchorEl(null);
    Router.push('/account/notifications');
  }

  function handleMyCombats() {
    setAnchorEl(null);
    Router.push('/account/my-combats');
  }

  function handleMyRankings() {
    setAnchorEl(null);
    Router.push('/account/my-rankings');
  }

  function handleMyInscriptions() {
    setAnchorEl(null);
    Router.push('/account/my-inscriptions');
  }

  function handleRankingsState() {
    setAnchorEl(null);
    Router.push('/account/rankings-state');
  }

  function handleLogout() {
    setAnchorEl(null);
    const token = new Cookies().get('user_session');
    dispatch(logOutUser(token));
  }

  return (
    <div className="general-container">
      {seasons === null ? (
        <Fragment></Fragment>
      ) : (
        <AppBar position="static" classes={{ root: classes.appbar }}>
          <Toolbar classes={{ root: classes.toolbar }}>
            <a onClick={handleClickHome} className="logo-container">
              <img src="/images/logos/praetorians-arena.png" className="logo" />
            </a>
            <nav className="nav-container">
              <Page page="/competitions" activePage={props.activePage} seasons={seasons} />
              <Page page="/games" activePage={props.activePage} />
              <Page page="/players" activePage={props.activePage} />
              <Page page="/stats" activePage={props.activePage} />
              <Page page="/help" activePage={props.activePage} />
            </nav>
            <div>
              {!player.isAuthenticated ? (
                <img src="/images/various/steam.png" onClick={handleClickLogin} className="button-login" />
              ) : (
                <Fragment>
                  <IconButton
                    disableRipple={true}
                    disableFocusRipple={true}
                    onClick={handleAccountMenuOpen}
                    classes={{
                      root: classes['icon-button-root'],
                      label: classes['icon-button-label']
                    }}
                  >
                    <div className="avatar-playername">
                      <Badge badgeContent={numNotifications} color="secondary" classes={{ badge: classes.badge }}>
                        <img src={player.data.steamAvatar.small} className="avatar" />
                      </Badge>
                      <span>{player.data.steamNickname}</span>
                    </div>
                  </IconButton>
                  {playerIsAdmin ? (
                    <MenuAccount2
                      anchorEl={anchorEl}
                      isAccountMenuOpen={isAccountMenuOpen}
                      handleAccountMenuClose={handleAccountMenuClose}
                      steamNickname={player.data.steamNickname}
                      steamAvatar={player.data.steamAvatar.small}
                      handleProfile={handleProfile}
                      numNotifications={numNotifications}
                      handleNotifications={handleNotifications}
                      handleMyCombats={handleMyCombats}
                      handleMyRankings={handleMyRankings}
                      handleMyInscriptions={handleMyInscriptions}
                      handleRankingsState={handleRankingsState}
                      handleLogout={handleLogout}
                    />
                  ) : (
                    <MenuAccount1
                      anchorEl={anchorEl}
                      isAccountMenuOpen={isAccountMenuOpen}
                      handleAccountMenuClose={handleAccountMenuClose}
                      steamNickname={player.data.steamNickname}
                      steamAvatar={player.data.steamAvatar.small}
                      handleProfile={handleProfile}
                      numNotifications={numNotifications}
                      handleNotifications={handleNotifications}
                      handleMyCombats={handleMyCombats}
                      handleMyRankings={handleMyRankings}
                      handleMyInscriptions={handleMyInscriptions}
                      handleLogout={handleLogout}
                    />
                  )}
                </Fragment>
              )}
            </div>
          </Toolbar>
        </AppBar>
      )}
      <style jsx>{styles}</style>
    </div>
  );
}

export default withStyles(stylesMaterialUI)(NavigationBar);
