import React from 'react';
import { Segment, Icon } from 'semantic-ui-react';
import GoogleMapReact from 'google-map-react';

const Marker = ({ text }) => (
  <Icon name="marker" size="big" color="red">
    {text}
  </Icon>
);

const EventDetailedMap = ({ lat, lng }) => {
  return (
    <Segment attached="bottom" style={{ padding: 0 }}>
      <div style={{ height: '300px', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.GOOGLE_MAP_KEY }}
          defaultCenter={{ lat, lng }}
          defaultZoom={14}
        >
          <Marker lat={lat} lng={lng} />
        </GoogleMapReact>
      </div>
    </Segment>
  );
};

export default EventDetailedMap;
