import React from 'react';
import { Grid, Segment, Item, Header } from 'semantic-ui-react';
import differenceInYears from 'date-fns/differenceInYears';

const UserDetailedHeader = ({ profile }) => {
  const age = profile.age
    ? differenceInYears(Date.now(), profile.dateOfBirth.toDate())
    : null;
  return (
    <Grid.Column width={12}>
      <Segment loading={!profile.isLoaded}>
        <Item.Group>
          <Item>
            <Item.Image avatar size='small' src={profile.photoURL} />
            <Item.Content verticalAlign='middle'>
              <Header as='h1'>{profile.displayName}</Header>
              <br />
              <Header as='h3'>{profile.occupation}</Header>
              <br />
              <Header as='h3'>
                {age && age + ','} Lives in {profile.city || 'Unknown'}
              </Header>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
    </Grid.Column>
  );
};

export default UserDetailedHeader;
