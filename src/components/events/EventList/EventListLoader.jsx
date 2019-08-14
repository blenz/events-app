import React from 'react';
import { Segment, Image } from 'semantic-ui-react';

const EventListLoader = () => {
  return Array(2)
    .fill(null)
    .map((_, i) => (
      <Segment
        style={{ minHeight: '300px' }}
        compact
        loading
        size='massive'
        key={i}
      >
        <Image src='assets/paragraph.png' />
      </Segment>
    ));
};

export default EventListLoader;
