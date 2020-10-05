import React, { useEffect } from 'react';
import 'react-image-gallery/styles/css/image-gallery.css';
import 'react-responsive-modal/styles.css';

import axios from 'axios';
import jwtDecode from 'jwt-decode';
import withGA from 'next-ga';
import Head from 'next/head';
import Router from 'next/router';
import { Provider, useDispatch } from 'react-redux';
import Cookies from 'universal-cookie';

import Layout from '$root/components/layout/component';
import { loadUser } from '$root/slices/users';
import store from '$root/store';
import { getTitles } from '$root/utils/functions';

function App({ Component, pageProps, router }) {
  const page = router.pathname;
  const { titleTab } = getTitles(page);
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_DOMAIN;
  return (
    <>
      <Head>
        <title>{titleTab}</title>
      </Head>
      <Provider store={store}>
        <AppChild Component={Component} pageProps={pageProps} router={router} />
      </Provider>
    </>
  );
}

function AppChild({ Component, pageProps, router }) {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = new Cookies().get('user_session');
    if (token) {
      const user = jwtDecode(token);
      dispatch(loadUser(user));
    }
  });
  return (
    <Layout router={router}>
      <Component {...pageProps} />
    </Layout>
  );
}

export default withGA(process.env.NEXT_PUBLIC_GA_TRACKING_ID, Router)(App);
