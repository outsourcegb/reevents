import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import { Route } from 'react-router-dom';
import EventDashboard from './../feature/event/EventDashboard/EventDashboard';
import NavBar from './../feature/nav/NavBar/NavBar';


class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Container className="main">
          <Route path="/" component={EventDashboard} />
          <Route path="/events/:id" component={EventDashboard} />
          <Route path="/people" component={EventDashboard} />
          <Route path="/profile/:id" component={EventDashboard} />
          <Route path="/settings" component={EventDashboard} />
          <Route path="/createEvent" component={EventDashboard} />
        </Container>
      </div>
    );
  }
}

export default App;