import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import './App.scss';

import TimeTo from '../../components/TimeTo/TimeTo';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      now: process.env.REACT_APP_TIMENOW ? moment(process.env.REACT_APP_TIMENOW) : moment(),
      message: '',
      selected: 0,
      races: [],
      racesFiltered: []
    }
  }

  componentDidMount() {
    this.fetchData();
    this.tick();
  }

  fetchData() {
    axios
      .get(`https://s3-ap-southeast-2.amazonaws.com/bet-easy-code-challenge/next-to-jump`, { crossdomain: true })
      .then(res => {
        if (res.data.success) {
          const races = res.data.result.map((race) => {
            const timeTo = `${this.state.now.diff(race.AdvertisedStartTime, 'minutes')}m ${this.state.now.diff(race.AdvertisedStartTime, 'seconds')}s`;
            return {
              id: race.EventID,
              time: race.AdvertisedStartTime,
              timeTo: timeTo,
              name: race.EventName,
              number: race.RaceNumber,
              type: race.EventType.EventTypeID,
            }
          });
          this.setState({ races, racesFiltered: races, message: '' });
        } else {
          this.setState({ message: 'Unable to refresh data' });
        }
      }, err => {
        this.setState({ message: 'Error fetching data' });
        console.error(err);
      });
  }

  tick() {
    setInterval(() => {
      this.setState({ now: this.state.now.add(1, 'second')});
    }, 1000);
  }

  initialiseList() {
    this.setState({
      racesFiltered: this.state.races.filter(race => this.state.selected ? race.type === this.state.selected : true)
    });
  }

  selectorChange(type) {
    this.setState({
      selected: type,
      racesFiltered: this.state.races.filter(race => type ? race.type === type : true)
    });
  }

  selectorClassName(type) {
    const selectedClass = this.state.selected === type ? 'App__content-selector-item--is-selected' : '';
    return `App__content-selector-item ${selectedClass}`;
  }

  getSvg(type) {
    let svg = '';

    switch (type) {
      case 1:
        svg = (<svg aria-hidden="true" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32" width="32" height="32" class="cb-svg-icon"><g><path d="M17.72,28.24a.54.54,0,0,1-.48-.32c-.08-.24-.24-.56-.32-.8-.4-.88-.88-1.76-1.28-2.65-.24-.4-.4-.72-.64-1.12l-.24-.4-.48-1a7.06,7.06,0,0,1-.64-2.65.55.55,0,0,1,.56-.56.6.6,0,0,1,.56.56,5.09,5.09,0,0,0,.56,2.17c.16.32.24.56.4.88l.24.4c.16.4.4.72.56,1.12.48.88,1,1.76,1.44,2.73a9.41,9.41,0,0,1,.4.88c.08.32,0,.64-.32.72Zm6.58-5.86a1.53,1.53,0,0,1-1-.56,4.41,4.41,0,0,1-.56-.72c-.08-.16-.24-.24-.32-.4a11.41,11.41,0,0,1-3.13-1.12l-1.12-.16c-.56,0-1.2-.08-1.85-.08a1.51,1.51,0,0,1-.64-.16c-2-.56-2.81-2-2.81-4.25v-.56a.52.52,0,0,1,1,.08v.48c0,1.76.56,2.65,2,3.13a1.07,1.07,0,0,0,.4.08c.56,0,1.2.08,1.85.08l1,.08a.76.76,0,0,1,.56.16,8.18,8.18,0,0,0,2.89,1,1,1,0,0,1,.56.4,1.75,1.75,0,0,0,.32.4c.16.24.32.4.48.64l.16.16.16-.16A1.61,1.61,0,0,1,26,20.54a1.89,1.89,0,0,0,.16-.64,6.07,6.07,0,0,0-.08-1.2v-.24l-.4-.4a4.2,4.2,0,0,1-.8-.88,22.67,22.67,0,0,0-2.65-3,2.28,2.28,0,0,1-.88-1.68l-.08-.16a2.5,2.5,0,0,0-.56-.72c-.32-.4-.56-.64-.72-.88s-.48-.56-.8-1a.6.6,0,0,1,0-.72,6.82,6.82,0,0,0,1.12-3c.08-.24.08-.48.16-.64a.53.53,0,0,1,.64-.4.57.57,0,0,1,.4.72,5.11,5.11,0,0,0-.16.56,9.16,9.16,0,0,1-1,3,4.63,4.63,0,0,1,.64.8c.24.24.4.56.72.88a8.4,8.4,0,0,1,.64.88,1.51,1.51,0,0,1,.32.72,1,1,0,0,0,.48.8,25.35,25.35,0,0,1,2.81,3.13,6.13,6.13,0,0,0,.72.72l.4.4a1,1,0,0,1,.32.56v.32c0,.48.08.88.08,1.44a3.39,3.39,0,0,1-.24,1v.4a.82.82,0,0,1-.4.48.89.89,0,0,1-.64,0,.61.61,0,0,0-.8.08A2.46,2.46,0,0,1,24.29,22.39ZM5,21.1H4.8a.53.53,0,0,1-.4-.64l.16-.56A19.17,19.17,0,0,1,8,12.36a14,14,0,0,1,5-4.17,7.15,7.15,0,0,1,3.13-.72,6,6,0,0,1,1.2-1.52A4.45,4.45,0,0,1,18,5.46l.16-.08A1.88,1.88,0,0,0,19,4.5a.76.76,0,0,1,.8-.32.93.93,0,0,1,.32.8,8.25,8.25,0,0,1-1.2,3.77A.57.57,0,0,1,18,8a4.4,4.4,0,0,0,.64-1.6l-.08.08c-.16.16-.32.24-.48.4a2.86,2.86,0,0,0-1,1.28.51.51,0,0,1-.48.4h-.48a5.94,5.94,0,0,0-2.57.56A14.92,14.92,0,0,0,8.89,13a17.27,17.27,0,0,0-3.21,7.06l-.16.56A.59.59,0,0,1,5,21.1Z"></path></g></svg>);
        break;
      case 2:
        svg = <svg aria-hidden="true" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32" width="32" height="32" class="cb-icon cb-icon--raw cb-icon--glyph-greyhound"><g><path d="M11.8 24h-.2c-.4-.1-.6-.5-.5-.9 0-.1.1-.2.1-.3 0-.1.1-.3.2-.4.9-1.8 2.2-3.3 3.9-4.4 1-.7 2.3-1 3.6-.6 1.4.4 2.7.7 4 1.1.3.1.5.1.8 0 .4-.4 1.1-.6 1.7-.5.2 0 .3 0 .5-.2l-.3-.2c-.4-.3-.7-.5-1.1-.7-1.8-.9-3.3-2.3-4.4-4 0-.1-.2-.4-.8-.4-1.3-.1-2.5-.6-3.5-1.6-.5-.5-1.1-.8-1.7-1.1-.6-.3-.7-.1-.8 0-.4.5-.7 1.1-1.1 1.7h.3c.4 0 .7.2.7.6.1.3 0 .7-.3.9l-.5.3c-.3.2-.7.5-1.1.7-1.1.6-2 1.3-3 2.1-.6.5-1.2.9-1.8 1.3l-.7.4c-.1.1-.2.1-.4.2-.4.2-.8 0-1-.4-.2-.4 0-.8.4-1h.1l.7-.5c.6-.4 1.1-.8 1.6-1.2 1-.8 2-1.5 3.1-2.1l-.1-.1c-.1-.2-.2-.4-.1-.6V12c0-.2.1-.4.2-.5l.4-.6c.4-.6.8-1.3 1.3-1.9.3-.5 1.1-1.2 2.6-.5.8.3 1.6.8 2.2 1.4.6.7 1.5 1.1 2.5 1.1.8 0 1.6.4 2 1.2.9 1.6 2.3 2.6 3.8 3.4.4.2.8.5 1.2.7l.7.5c.3.2.5.5.5.9 0 .3-.1.7-.3.9H27c-.5.6-1.2.9-2 .8-.1 0-.2 0-.5.2-.6.4-1.4.5-2 .3-1.3-.3-2.7-.7-4.1-1.1-.8-.2-1.6-.1-2.3.4-1.4 1-2.6 2.3-3.4 3.9 0 .1-.1.1-.1.2s0 .1-.1.2c-.1.3-.3.5-.7.5z"></path></g></svg>;
        break;
      case 3:
        svg = <svg aria-hidden="true" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32" width="32" height="32" class="cb-icon cb-icon--raw cb-icon--glyph-harness"><g><g><path d="M17.5 13.8c-.4 0-.7-.3-.7-.7 0-1.1.5-2.2 1.2-3 1.6-1.6 3.9-2.2 6.1-1.5.4.1.6.6.5.9-.1.4-.6.6-.9.5-1.7-.5-3.4-.1-4.6 1-.5.5-.8 1.2-.8 2 0 .4-.3.8-.8.8z"></path><path d="M14 22.1c-.2 0-.4-.1-.5-.2L8 16.1c-.3-.3-.3-.8 0-1.1.1-.1.2-.2.4-.2l16.7-3c.4-.1.8.2.9.6.1.4-.2.8-.6.9L10 16.1l4.5 4.7c.3.3.3.8 0 1.1-.2.1-.3.2-.5.2z"></path><path d="M14.1 14.3c-.4 0-.7-.3-.7-.7 0-.3.2-.5.4-.7l.1-.1c.3-.2.4-.5.6-.9.1-.8.6-1.4 1.2-1.8.9-.6 2.2-.6 3.1 0 .3.3.4.7.1 1-.2.3-.7.4-1 .1-.4-.3-1-.2-1.4.1-.4.2-.4.5-.6 1-.1.8-.6 1.4-1.2 1.8l-.2.1c-.2.1-.3.1-.4.1zM24.8 23.7c-.4 0-.8-.3-.9-.7l-.3-1-3.1-1c-.1 0-.3-.1-.4-.1-.6-.3-.9-.9-.7-1.5l.1-.3c.1-.4.2-.7.2-1.1l-.3-.2c-.9-.6-1.7-1.5-2.1-2.6-.2-.4 0-.8.4-1s.8 0 1 .4c.4.8.9 1.5 1.7 2 .5.4 1 .7.9 1.4l-.3 1.5v.2l1.1.3c-.1-.1-.2-.1-.3-.2-.2-.2-.4-.5-.3-.8 0-.6.3-1.2.8-1.6.3-.2.5-.5.5-1.5 0-.4-.1-.8-.4-1.1-.3-.3-.2-.8.2-1.1.3-.3.8-.2 1.1.2.4.6.7 1.3.7 2 .1 1-.3 2-1 2.7l-.2.2c.7.4 1.5.7 2.2 1 .4.1.7.4.8.8l.5 1.8c.1.2 0 .5-.1.7-.1.2-.3.4-.6.5l-.6.2c-.4-.1-.5-.1-.6-.1zm.1-1zm.4-.6zm-1.5 0zM20 19.8zm.6-.3c-.2 0-.5.1-.6.3.2-.2.5-.4.7-.3h-.1zM8.4 9.5c-.4.1-.7-.2-.8-.5-.2-1 .4-2.1 1.5-2.3.9-.2 1.9.3 2.2 1.3.1.4-.1.8-.5.9-.4.1-.8-.1-.9-.5-.1-.3-.4-.3-.6-.3-.2 0-.3.3-.2.5.1.4-.2.8-.6.9h-.1z"></path><path d="M10.6 8.9c-.4 0-.8-.2-.8-.7 0-.4.2-.8.7-.8l.4-.1c.4-.1.8.2.9.6.1.4-.2.8-.6.9l-.4.1h-.2zM14 19.9c-.3 0-.5-.2-.5-.5V17c0-.3.2-.5.5-.5s.5.2.5.5v2.4c0 .3-.2.5-.5.5zM9.7 21.8c-.3 0-.5-.2-.5-.5s.2-.5.5-.5h2.4c.3 0 .5.2.5.5s-.2.5-.5.5H9.7zM10.9 24.9c-.3 0-.5-.2-.5-.5 0-.1.1-.3.2-.4l1.7-1.7c.2-.2.5-.2.7 0 .2.2.2.5 0 .7l-1.7 1.7c-.1.2-.2.2-.4.2zM14 26.2c-.3 0-.5-.2-.5-.5v-2.4c0-.3.2-.5.5-.5s.5.2.5.5v2.4c0 .3-.2.5-.5.5zM17.1 24.9c-.1 0-.3-.1-.4-.2L15 23.1c-.2-.2-.2-.5 0-.7.2-.2.5-.2.7 0l1.7 1.7c.2.2.2.5 0 .7-.1.1-.2.1-.3.1zM18.3 21.8h-2.4c-.3 0-.5-.2-.5-.5s.2-.5.5-.5h2.4c.3 0 .5.2.5.5.1.3-.2.5-.5.5zM15.3 20.5c-.3 0-.5-.2-.5-.5 0-.1.1-.3.2-.4l1.7-1.7c.2-.2.5-.2.7 0 .2.2.2.5 0 .7l-1.7 1.7c-.1.2-.2.2-.4.2z"></path><path d="M14 26.2c-2.7 0-4.9-2.2-4.9-4.9s2.2-4.9 4.9-4.9 4.9 2.2 4.9 4.9c-.1 2.7-2.2 4.9-4.9 4.9zm0-8.7c-2.1 0-3.8 1.7-3.8 3.8 0 2.1 1.7 3.8 3.8 3.8 2.1 0 3.8-1.7 3.8-3.8 0-2.1-1.7-3.8-3.8-3.8z"></path><path d="M14 23.8c-1.3 0-2.4-1.1-2.4-2.4 0-1.3 1.1-2.4 2.4-2.4 1.3 0 2.4 1.1 2.4 2.4 0 1.3-1.1 2.4-2.4 2.4zm0-3.9c-.8 0-1.4.6-1.4 1.4 0 .8.6 1.4 1.4 1.4.8 0 1.4-.6 1.4-1.4 0-.7-.6-1.4-1.4-1.4zM8.3 18.9c-.1 0-.2 0-.3-.1-2.4-1-2.9-4-2.1-6.5.7-2.2 2.1-3.4 3.6-3 .8.2 1.5.4 2.2.7 1.1.4 1.5.6 2.4.1.4-.2.8 0 1 .3.2.3.1.8-.3 1-1.5.9-2.5.5-3.7 0-.7-.3-1.3-.5-2-.7-.7-.2-1.5.9-1.8 2-.6 1.8-.3 4.1 1.3 4.7.4.2.6.6.4 1-.1.3-.4.5-.7.5z"></path></g></g></svg>;
        break;
      default:
        svg = '';
        break;
    }

    return svg;
  }

  render() {
    return (
      <div className="App">
        <header className="App__header">
          <div className="App__header-logo">
            <svg aria-hidden="true" preserveAspectRatio="xMidYMid meet" viewBox="0 0 274 158" width="32" height="32" class="cb-icon cb-icon--raw cb-icon--glyph-logo"><defs><linearGradient id="logo-gradient" x1="151.5867" x2="270.7755" y1="123.8671" y2="4.6783" gradientTransform="matrix(1 0 0 1 -1.6539 0)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#23b4b7"></stop><stop offset=".8882" stop-color="#23b4b7" stop-opacity="0"></stop></linearGradient></defs><path d="M0 115.56V43.89h18.17c9.96 0 17.14 5.53 17.14 16.28v5.02c0 4.92-2.46 10.55-7.08 12.7 5.13 2.46 7.7 6.96 7.7 13.62v6.14c0 10.75-6.57 17.92-17.55 17.92H0zm12.32-41.67h3.7c4.52 0 6.98-3.17 6.98-7.37v-4.71c0-4.2-2.36-7.58-6.98-7.58h-3.7v19.66zm0 31.33h4.41c4.52 0 6.98-3.07 6.98-7.99V91.3c0-4.81-2.57-7.68-7.19-7.68h-4.21v21.6z"></path><path d="M39.48 115.56V43.89H71.3v10.65H51.8v17.41h12.52V82.6H51.8v22.32h20.22v10.65H39.48z"></path><path d="M98.28 115.56H86.06V54.53H74.97V43.89h34.39v10.65H98.28v61.02z"></path><path fill="url(#logo-gradient)" d="M194.8 158c-43.67 0-79.2-35.44-79.2-79s35.53-79 79.2-79S274 35.44 274 79s-35.53 79-79.2 79zm0-145.33c-36.67 0-66.5 29.76-66.5 66.33s29.83 66.33 66.5 66.33 66.5-29.76 66.5-66.33-29.83-66.33-66.5-66.33z"></path><path d="M144.76 109.09V48.91h20.81v6.96h-12.81v17.2h8.51v6.88h-8.51v22.18h13.16v6.96h-21.16z"></path><path d="M193.51 109.09h-8.08l-1.2-11.52h-6.88l-1.29 11.52h-7.48l7.31-60.19h10.4l7.22 60.19zm-12.55-43.16l-2.92 25.54h5.59l-2.67-25.54z"></path><path d="M217.5 69.03h-7.4v-9.54c0-2.92-1.12-4.38-3.44-4.38-2.06 0-3.27 1.63-3.27 3.96v5.42c0 3.61 1.2 6.53 3.53 8.77l5.33 5.07c3.96 3.7 5.93 8.68 5.93 15.13V98c0 6.96-4.39 11.69-11.52 11.69-7.14 0-11.35-4.39-11.35-11.26V86.82h7.48v11.61c0 2.67 1.29 4.39 3.7 4.39 2.32 0 3.61-1.63 3.61-4.13v-5.5c0-3.96-1.2-6.96-3.53-9.11l-4.99-4.64c-4.21-3.87-6.28-8.86-6.28-14.87V59.5c0-6.88 4.47-11.18 11.26-11.18 7.14 0 10.92 4.3 10.92 10.83v9.88z"></path><path d="M235.72 109.09h-8V84.42l-9.11-35.51h8.68l4.47 22.87 4.9-22.87h8.17l-9.11 35.25v24.93z"></path></svg>
          </div>
          <div className="App__header-racing">
            {this.getSvg(1)}
            <p>Racing</p>
          </div>
        </header>
        <div className="App__content">
          <div className="App__content-title">Next to Jump</div>
          <div className="App__content-selector">
            <div className={this.selectorClassName(0)} onClick={() => this.selectorChange(0)}>All</div>
            <div className={this.selectorClassName(1)} onClick={() => this.selectorChange(1)}>{this.getSvg(1)}</div>
            <div className={this.selectorClassName(2)} onClick={() => this.selectorChange(2)}>{this.getSvg(2)}</div>
            <div className={this.selectorClassName(3)} onClick={() => this.selectorChange(3)}>{this.getSvg(3)}</div>
          </div>
          {this.state.message ? <div className="App__content-message">{this.state.message}</div> : ''}
          <div className="App__content-list">
            {this.state.racesFiltered.map(race =>
              <div className="App__content-list-item" key={race.id}>
                <div className="App__content-list-item-logo">{this.getSvg(race.type)}</div>
                <div className="App__content-list-item-race">
                  <p>{race.name}</p>
                  <p className="App__content-list-item-race-no">Race {race.number}</p>
                </div>
                <TimeTo time={race.time} now={this.state.now}></TimeTo>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
