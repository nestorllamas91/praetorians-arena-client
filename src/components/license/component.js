import React from 'react';
import styles from '$root/components/license/styles';

export default function License() {
  return (
    <div className="main-container">
      <h2 className="heading2">Web application (source code)</h2>
      <hr />
      <p>
        The source code of the web application belonging to this website is public on a{' '}
        <a href="https://github.com/nestorllamas91/praetorians-arena">GitHub repository</a> under copyright. Anyone can
        see it, but nobody can copy, distribute, or modify it. That's why this project has not any open-source license
        associated. It is done on purpose, meaning that the use, distribution, and modification are prohibited.
      </p>
      <h2 className="heading2">Web assets (images, videos, and sequence files)</h2>
      <hr />
      <p>
        Some images belong to the videogame, including its logo. Regarding the videos, there is present only the trailer
        of the videogame. And there are also present the sequence files of the played games that are uploaded. All these
        assets belonging to this videogame are free to use by anyone in the case that the corresponding work is
        non-commercial, since Kalypso Media Group (the publisher of the videogame) does not allow commercial use with
        their products.
      </p>
      <p>
        Images not related to the videogame are free to use in any case, regardless of whether the corresponding work is
        commercial or non-commercial.
      </p>
      <style jsx>{styles}</style>
    </div>
  );
}
