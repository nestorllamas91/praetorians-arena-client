import React from 'react';
import styles, { stylesSyncfusion } from '$root/components/games/filters/styles';

import { ComboBoxComponent } from '@syncfusion/ej2-react-dropdowns';
import { DateRangePickerComponent } from '@syncfusion/ej2-react-calendars';
import { MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';

import { CheckBoxSelection } from '@syncfusion/ej2-react-dropdowns';
// import * as gregorian from 'cldr-data/main/en-GB/ca-gregorian.json';
import { Inject } from '@syncfusion/ej2-react-dropdowns';
import { L10n } from '@syncfusion/ej2-base';
// import { loadCldr } from '@syncfusion/ej2-base';
import maps from '$root/utils/maps';
import moment from 'moment';
// import * as numberingSystems from 'cldr-data/supplemental/numberingSystems.json';
// import * as numbers from 'cldr-data/main/en-GB/numbers.json';
import { Query } from '@syncfusion/ej2-data';
// import * as timeZoneNames from 'cldr-data/main/en-GB/timeZoneNames.json';
// import * as weekData from 'cldr-data/supplemental/weekData.json';

export default function Filters(props) {
  // loadCldr(numberingSystems, gregorian, numbers, timeZoneNames, weekData);
  L10n.load({
    'en-GB': {
      daterangepicker: {
        startLabel: 'Start day',
        endLabel: 'End day',
        selectedDays: 'Selected days',
        customRange: 'Custom range'
      }
    }
  });
  const optionsFilterNumPlayers = [
    { label: 2, value: 2 },
    { label: 4, value: 4 },
    { label: 6, value: 6 },
    { label: 8, value: 8 }
  ];
  const optionsFilterMap = [];
  for (const prop in maps) {
    maps[prop].map(map => {
      optionsFilterMap.push({ label: map.name, value: map.id });
    });
  }
  const optionsFilterUploaderPlayer = [
    { label: 'Néstor', value: 'Néstor' },
    { label: 'Hackom', value: 'Hackom' },
    { label: 'valentin', value: 'valentin' }
  ];
  const optionsFilterPlayers = [
    { label: '~KoD~Néstor', value: '~KoD~Néstor' },
    { label: 'uniQue~T@boga', value: 'uniQue~T@boga' },
    { label: 'valentin', value: 'valentin' },
    { label: '-{GEO}qartveli', value: '-{GEO}qartveli' },
    { label: 'W@rRiøR*Tú®k', value: 'W@rRiøR*Tú®k' },
    { label: '-[GOD]-Thot', value: '-[GOD]-Thot' },
    { label: 'RakonDark', value: 'RakonDark' },
    { label: 'Hackom', value: 'Hackom' },
    { label: 'Maxtla', value: 'Maxtla' },
    { label: '~CsH~R@iden', value: '~CsH~R@iden' },
    { label: 'G|ø®iøuS*Tú®k', value: 'G|ø®iøuS*Tú®k' }
  ];

  let { allowedRange, presetRanges } = getRanges();

  function getRanges() {
    const now = moment(),
      nowCopy1 = moment(now),
      nowCopy2 = moment(now),
      nowCopy3 = moment(now),
      nowCopy4 = moment(now),
      nowCopy5 = moment(now),
      nowCopy6 = moment(now),
      nowCopy7 = moment(now);
    const allowedRange = {
      min: nowCopy1.startOf('year').format('DD-MM-YYYY'),
      max: nowCopy1.endOf('year').format('DD-MM-YYYY')
    };
    const today = nowCopy2.format('DD-MM-YYYY');
    const yesterday = nowCopy3.subtract(1, 'day').format('DD-MM-YYYY');
    const thisWeek = {
      start: nowCopy4.startOf('isoWeek').format('DD-MM-YYYY'),
      end: nowCopy4.endOf('isoWeek').format('DD-MM-YYYY')
    };
    const nowOneWeekAgo = nowCopy5.subtract(1, 'week');
    const lastWeek = {
      start: nowOneWeekAgo.startOf('isoWeek').format('DD-MM-YYYY'),
      end: nowOneWeekAgo.endOf('isoWeek').format('DD-MM-YYYY')
    };
    const thisMonth = {
      start: nowCopy6.startOf('month').format('DD-MM-YYYY'),
      end: nowCopy6.endOf('month').format('DD-MM-YYYY')
    };
    const nowOneMonthAgo = nowCopy7.subtract(1, 'month');
    const lastMonth = {
      start: nowOneMonthAgo.startOf('month').format('DD-MM-YYYY'),
      end: nowOneMonthAgo.endOf('month').format('DD-MM-YYYY')
    };
    const presetRanges = [
      { label: 'Today', start: today, end: today },
      { label: 'Yesterday', start: yesterday, end: yesterday },
      { label: 'This week', start: thisWeek.start, end: thisWeek.end },
      { label: 'Last week', start: lastWeek.start, end: lastWeek.end },
      { label: 'This month', start: thisMonth.start, end: thisMonth.end },
      { label: 'Last month', start: lastMonth.start, end: lastMonth.end }
    ];
    return { allowedRange, presetRanges };
  }

  function handleFilter(event, data) {
    if (event.text !== '') {
      event.updateData(data, new Query().where('label', 'contains', event.text, true, true));
    }
  }

  return (
    <div className="filters">
      <div className="filters-head">Filters</div>
      <div className="filters-body">
        <div>
          <span>Upload date</span>
          <DateRangePickerComponent
            placeholder="Select or type a date range..."
            locale="en-GB"
            format="d MMMM yyyy"
            strictMode
            cssClass="date-range-picker"
            min={allowedRange.min}
            max={allowedRange.max}
            presets={presetRanges}
            open={() => (presetRanges = getRanges().presetRanges)}
            change={props.handleFilterUploadDate}
            value={props.valueFilterUploadDate}
          />
        </div>
        <div>
          <span>Play date</span>
          <DateRangePickerComponent
            placeholder="Select or type a date range..."
            locale="en-GB"
            format="d MMMM yyyy"
            strictMode
            cssClass="date-range-picker"
            min={allowedRange.min}
            max={allowedRange.max}
            presets={presetRanges}
            open={() => (presetRanges = getRanges().presetRanges)}
            change={props.handleFilterPlayDate}
            value={props.valueFilterPlayDate}
          />
        </div>
        <div>
          <span>Number of players</span>
          <ComboBoxComponent
            placeholder="Select or type a number..."
            allowFiltering
            noRecordsTemplate={() => <span>Number of players invalid.</span>}
            cssClass="combo-box"
            dataSource={optionsFilterNumPlayers}
            fields={{ text: 'label', value: 'value' }}
            filtering={e => handleFilter(e, optionsFilterNumPlayers)}
            change={props.handleFilterNumPlayers}
            value={props.valueFilterNumPlayers}
          />
        </div>
        <div>
          <span>Map</span>
          <ComboBoxComponent
            placeholder="Select or search a map..."
            allowFiltering
            noRecordsTemplate={() => <span>No maps found.</span>}
            cssClass="combo-box"
            dataSource={optionsFilterMap}
            fields={{ text: 'label', value: 'value' }}
            filtering={e => handleFilter(e, optionsFilterMap)}
            change={props.handleFilterMap}
            value={props.valueFilterMap}
          />
        </div>
        <div>
          <span>Uploader player</span>
          <ComboBoxComponent
            placeholder="Select or search a player..."
            allowFiltering
            noRecordsTemplate={() => <span>No players found.</span>}
            cssClass="combo-box"
            dataSource={optionsFilterUploaderPlayer}
            fields={{ text: 'label', value: 'value' }}
            filtering={e => handleFilter(e, optionsFilterUploaderPlayer)}
            change={props.handleFilterUploaderPlayer}
            value={props.valueFilterUploaderPlayer}
          />
        </div>
        <div>
          <span>Players per game</span>
          <MultiSelectComponent
            placeholder="Select or search a maximum of 8 players..."
            filterBarPlaceholder="Search players..."
            mode="CheckBox"
            maximumSelectionLength={8}
            allowFiltering
            noRecordsTemplate={() => <span>No players found.</span>}
            showDropDownIcon
            cssClass="multi-select"
            dataSource={optionsFilterPlayers}
            fields={{ text: 'label', value: 'value' }}
            filtering={e => handleFilter(e, optionsFilterPlayers)}
            change={props.handleFilterPlayers}
            value={props.valueFilterPlayers}
          >
            <Inject services={[CheckBoxSelection]} />
          </MultiSelectComponent>
        </div>
      </div>
      <div className="button-clear">
        <button onClick={props.handleClearFilters} className="button">
          CLEAR FILTERS
        </button>
      </div>
      <style jsx>{styles}</style>
      <style jsx global>
        {stylesSyncfusion}
      </style>
    </div>
  );
}
