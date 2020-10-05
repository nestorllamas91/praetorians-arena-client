import React from 'react';
import styles, { stylesGlobal, stylesReset } from '$root/components/layout/styles';

import Footer from '$root/components/footer/component';
import Header from '$root/components/header/component';
import NavigationBar from '$root/components/navigation-bar/component';
import { getTitles } from '$root/utils/functions';

export default function Layout({ router, children }) {
  const page = router.pathname;
  const { titleHeading } = getTitles(page);
  return (
    <>
      <NavigationBar activePage={page} />
      {page === '/_error' ? (
        <div className="error-container">{children}</div>
      ) : (
        <>
          <Header activePage={page} activePageTitle={titleHeading} />
          <div className="body-container">{children}</div>
        </>
      )}
      <Footer />
      <style jsx>{styles}</style>
      <style jsx global>
        {stylesReset}
      </style>
      <style jsx global>
        {stylesGlobal}
      </style>
    </>
  );
}
