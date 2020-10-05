import React, { useState } from 'react';
import styles from '$root/components/account/my-inscriptions/styles';

import { v4 as uuidv4 } from 'uuid';

import OpenRankings from '$root/components/account/my-inscriptions/open-rankings/component';
import TeamProposals from '$root/components/account/my-inscriptions/team-proposals/component';

export default function MyInscriptions() {
  const [flagReRender, setFlagReRender] = useState(false);

  function handlePlayerEnrollment() {
    setFlagReRender(prevFlagReRender => !prevFlagReRender);
  }

  return (
    <div className="main-container">
      <OpenRankings key={uuidv4()} />
      <TeamProposals key={uuidv4()} playerEnrollment={handlePlayerEnrollment} />
      <style jsx>{styles}</style>
    </div>
  );
}
