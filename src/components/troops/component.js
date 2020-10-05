import React from 'react';
import styles from '$root/components/troops/styles';

import ArcherCavalry from '$root/components/troops/troops/basic-troops/archer-cavalry/component';
import Archers from '$root/components/troops/troops/basic-troops/archers/component';
import Cavalry from '$root/components/troops/troops/basic-troops/cavalry/component';
import Generals from '$root/components/troops/troops/special-units/generals/component';
import Header from '$root/components/troops/header/component';
import Healers from '$root/components/troops/troops/special-units/healers/component';
import HeavyInfantry from '$root/components/troops/troops/basic-troops/heavy-infantry/component';
import LightInfantry from '$root/components/troops/troops/basic-troops/light-infantry/component';
import Scouts from '$root/components/troops/troops/special-units/scouts/component';
import Spearmen from '$root/components/troops/troops/basic-troops/spearmen/component';
import SpecialCavalry from '$root/components/troops/troops/special-troops/special-cavalry/component';
import SpecialInfantry from '$root/components/troops/troops/special-troops/special-infantry/component';
import SpecialRangedUnits from '$root/components/troops/troops/special-troops/special-ranged-units/component';
import Structures from '$root/components/troops/constructions/structures/component';
import WarMachines from '$root/components/troops/constructions/war-machines/component';

export default function Troops() {
  return (
    <div>
      <div>
        <h3 className="heading3">2.1. Troops</h3>
        <h4 className="heading4">2.1.1. Basic Troops</h4>
        <div className="table-1">
          <Header type="troops" />
          <div className="table-body-1">
            <div className="division">
              <div className="description-title">Light infantry</div>
              <LightInfantry />
            </div>
            <div className="division">
              <div className="description-title">Heavy infantry</div>
              <HeavyInfantry />
            </div>
            <div className="division">
              <div className="description-title">Archers</div>
              <Archers />
            </div>
            <div className="division">
              <div className="description-title">Spearmen</div>
              <Spearmen />
            </div>
            <div className="division">
              <div className="description-title">Cavalry</div>
              <Cavalry />
            </div>
            <div className="division">
              <div className="description-title">Archer cavalry</div>
              <ArcherCavalry />
            </div>
          </div>
        </div>
      </div>
      <h4 className="heading4">2.1.2. Special Troops</h4>
      <div className="table-1">
        <Header type="troops" />
        <div className="table-body-1">
          <div className="division">
            <div className="description-title">Special infantry</div>
            <SpecialInfantry />
          </div>
          <div className="division">
            <div className="description-title">Special ranged units</div>
            <SpecialRangedUnits />
          </div>
          <div className="division">
            <div className="description-title">Special cavalry</div>
            <SpecialCavalry />
          </div>
        </div>
      </div>
      <h4 className="heading4">2.1.3. Special Units</h4>
      <div className="table-1">
        <Header type="units" />
        <div className="table-body-1">
          <div className="division">
            <div className="description-title">Generals</div>
            <Generals />
          </div>
          <div className="division">
            <div className="description-title">Healers</div>
            <Healers />
          </div>
          <div className="division">
            <div className="description-title">Scouts</div>
            <Scouts />
          </div>
        </div>
      </div>
      <h3 className="heading3">2.2. Constructions</h3>
      <h4 className="heading4">2.2.1. War Machines</h4>
      <div className="table-2">
        <Header type="constructions" />
        <div className="table-body-2">
          <WarMachines />
        </div>
      </div>
      <h4 className="heading4">2.2.2. Structures</h4>
      <div className="table-2">
        <Header type="constructions" />
        <div className="table-body-2">
          <Structures />
        </div>
      </div>
      <style jsx>{styles}</style>
    </div>
  );
}
