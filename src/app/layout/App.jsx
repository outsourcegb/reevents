import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import EventDashboard from './../feature/event/EventDashboard/EventDashboard';

class App extends Component {
  render() {
    return (
      <div>
        <h1>Re Event</h1>
        <EventDashboard />
      </div>
    );
  }
}

export default App;