import React from 'react';
import { Grid, Segment, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const UserDetailedSideBar = () => {
  return (
    <Grid.Column width={4}>
      <Segment>
        <Button
          color='teal'
          as={Link}
          to={'/settings'}
          fluid
          basic
          content='Edit Profile'
        />
      </Segment>
    </Grid.Column>
  );
};

export default UserDetailedSideBar;
