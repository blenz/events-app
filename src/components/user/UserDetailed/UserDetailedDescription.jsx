import React from 'react';
import { Grid, Segment, Item, Header, List, Icon } from 'semantic-ui-react';
import format from 'date-fns/format';

const UserDetailedDescription = ({ profile }) => {
  return (
    <Grid.Column width={12}>
      <Segment loading={!profile.isLoaded}>
        <Grid columns={2}>
          <Grid.Column width={10}>
            <Header icon='user circle' content='About Me' />
            <p>
              I am a: <strong>{profile.occupation || 'Unknown'}</strong>
            </p>
            <p>
              Originally from <strong>{profile.city}</strong>
            </p>
            <p>
              Member Since:{' '}
              <strong>
                {profile.createdAt &&
                  format(profile.createdAt.toDate(), 'MMM d yyy')}
              </strong>
            </p>
            <p>{profile.description}</p>
          </Grid.Column>
          <Grid.Column width={6}>
            <Header icon='heart' content='Interests' />
            {profile.interests && profile.interests.length !== 0 ? (
              <List>
                {profile.interests.map((interest, i) => (
                  <Item key={i}>
                    <Icon name='heart' />
                    <Item.Content>{interest}</Item.Content>
                  </Item>
                ))}
              </List>
            ) : (
              <p>No interests listed</p>
            )}
          </Grid.Column>
        </Grid>
      </Segment>
    </Grid.Column>
  );
};

export default UserDetailedDescription;
