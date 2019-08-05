import React, { Component, Fragment } from 'react';
import EventDashboard from './events/EventDashboard';
import Navbar from './nav/Navbar';
import { Container } from 'semantic-ui-react';
import { Route, Switch, withRouter } from 'react-router-dom';
import HomePage from './home/HomePage';
import EventDetailedPage from './events/EventDetailed/EventDetailedPage';
import PeopleDashboard from './user/PeopleDashboard';
import UserDetailed from './user/UserDetailed/UserDetailed';
import SettingsDashboard from './user/Settings/SettingsDashboard';
import EventForm from './events/EventForm/EventForm';
import TestComponent from './testarea/TestComponent';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Route exact path='/' component={HomePage} />
        <Route
          path='/(.+)'
          render={() => (
            <Fragment>
              <Navbar />
              <Container className='main'>
                <Switch key={this.props.location.key}>
                  <Route exact path='/events' component={EventDashboard} />
                  <Route path='/events/:id' component={EventDetailedPage} />
                  <Route path='/people' component={PeopleDashboard} />
                  <Route path='/profile/:id' component={UserDetailed} />
                  <Route path='/settings' component={SettingsDashboard} />
                  <Route
                    path={['/createEvent', '/manage/:id']}
                    component={EventForm}
                  />
                  <Route path='/test' component={TestComponent} />
                </Switch>
              </Container>
            </Fragment>
          )}
        />
      </Fragment>
    );
  }
}

export default withRouter(App);
