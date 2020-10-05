import React from 'react';
import styles from '$root/components/competitions/name-ranking/styles';

import { fixRankingSelectors } from '$root/utils/functions';

export default function NameRanking(props) {
  const { season, competition } = fixRankingSelectors(props.season, props.competition);
  let classAlignment;
  if (props.alignment === 'center') {
    classAlignment = 'title-ranking-center';
  }
  if (props.alignment === 'left') {
    classAlignment = 'title-ranking-left';
  }

  return (
    <div>
      {(() => {
        switch (props.fontSize) {
          case 'big':
            return (
              <h2 className={`heading2 first-heading ${classAlignment}`}>
                {competition} ({season})
              </h2>
            );
          case 'small':
            return (
              <span>
                {competition} ({season})
              </span>
            );
        }
      })()}
      <style jsx>{styles}</style>
    </div>
  );
}
