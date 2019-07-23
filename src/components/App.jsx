import React, { Component, Fragment } from 'react';
import EventDashboard from './events/EventDashboard';
import Navbar from './nav/Navbar';
import { Container } from 'semantic-ui-react';

class App extends Component {
  render() {
    return (
      <Fragment>
        <h1>Re-vents</h1>
        <Navbar />
        <Container className="main">
          <EventDashboard />
        </Container>
      </Fragment>
    );
  }
}

export default App;
