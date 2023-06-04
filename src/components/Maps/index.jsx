/* eslint-disable import/no-unresolved */
/* eslint-disable global-require */
import React, { useContext } from 'react';
import {
  GoogleMap, LoadScript, MarkerF, InfoWindowF,
} from '@react-google-maps/api';
import { UserContext } from '../../contexts/UserContext';
import { MAPS_API_KEY } from '../../constants/map';

const containerStyle = {
  position: 'relative',
  width: '100%',
  height: '100%',
};

// const center = {
//   lat: -3.745,
//   lng: -38.523,
// };

// const onLoad = () => {
//   console.log(position);
// };

function Maps(props) {
  const { data } = props;
  const { userData } = useContext(UserContext);
  return (
    <LoadScript googleMapsApiKey={MAPS_API_KEY}>
      <GoogleMap
        id="maps"
        mapContainerStyle={containerStyle}
        center={userData.coordinates}
        zoom={14}
      >
        {data.map((item) => (
          <MarkerF position={item} />
        ))}
        {/* <MarkerF
          title="Testing"
          position={userData.coordinates}
          icon={{
            fillColor: 'black',
          }}
        /> */}
        <InfoWindowF position={userData.coordinates}>
          <div>
            <div style={{ fontSize: 16, fontColor: '#08233B' }}>
              You Are Here
            </div>
          </div>
        </InfoWindowF>
      </GoogleMap>
    </LoadScript>
  );
}

export default React.memo(Maps);
