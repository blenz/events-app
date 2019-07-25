import React, { Component, Fragment } from 'react';
import EventDashboard from './events/EventDashboard';
import Navbar from './nav/Navbar';
import { Container } from 'semantic-ui-react';
import { Route } from 'react-router-dom';
import HomePage from './home/HomePage';
import EventDetailedPage from './events/EventDetailed/EventDetailedPage';
import PeopleDashboard from './user/PeopleDashboard';
import UserDetailed from './user/UserDetailed/UserDetailed';
import SettingsDashboard from './user/Settings/SettingsDashboard';
import EventForm from './events/EventForm/EventForm';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Route exact path="/" component={HomePage} />
        <Route
          path="/(.+)"
          render={() => (
            <Fragment>
              <Navbar />
              <Container className="main">
                <Route path="/events" component={EventDashboard} />
                <Route path="/events/:id" component={EventDetailedPage} />
                <Route path="/people" component={PeopleDashboard} />
                <Route path="/profile/:id" component={UserDetailed} />
                <Route path="/settings" component={SettingsDashboard} />
                <Route path="/createEvent" component={EventForm} />
              </Container>
            </Fragment>
          )}
        />
      </Fragment>
    );
  }
}

export default App;
