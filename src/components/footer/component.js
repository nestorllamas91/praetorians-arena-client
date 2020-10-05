import React from 'react';
import styles from '$root/components/footer/styles';

import Router from 'next/router';

export default function Footer() {
  function handleClickTerms() {
    Router.push('/terms');
  }

  function handleClickPrivacy() {
    Router.push('/privacy');
  }

  function handleClickLicense() {
    Router.push('/license');
  }

  function handleClickPraetoriansArena() {
    Router.push('/');
  }

  return (
    <div className="footer-container">
      <div>
        <img src="/images/logos/praetorians-arena.png" width="75%" />
        <div>
          <div>
            <span>&copy; 2020 Néstor Llamas</span>
            <span className="symbol">|</span>
            <a onClick={handleClickTerms}>Terms</a>
            <a onClick={handleClickPrivacy}>Privacy</a>
            <span className="symbol">|</span>
            <a onClick={handleClickLicense}>License</a>
            <a href="https://github.com/nestorllamas91/praetorians-arena">GitHub</a>
          </div>
          <span>
            <a onClick={handleClickPraetoriansArena}>Praetorians Arena</a> is a fan-generated platform not supported by{' '}
            <a href="https://www.kalypsomedia.com/">Kalypso Media Group</a>.
          </span>
        </div>
      </div>
      <style jsx>{styles}</style>
    </div>
  );
}
