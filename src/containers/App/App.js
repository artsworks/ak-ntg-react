import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import './App.scss';

import Header from '../../components/Header/Header';
import Selector from '../../components/Selector/Selector';
import Message from '../../components/Message/Message';
import List from '../../components/List/List';

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

  render() {
    return (
      <div className="App">
        <Header></Header>
        <div className="App__content">
          <div className="App__content-title">Next to Jump</div>
          <Selector selected={this.state.selected} change={this.selectorChange.bind(this)}></Selector>
          <Message text={this.state.message}></Message>
          <List races={this.state.racesFiltered} now={this.state.now}></List>
        </div>
      </div>
    );
  }
}

export default App;
