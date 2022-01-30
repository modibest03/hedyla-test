import { useEffect, useState } from 'react';
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  DirectionsRenderer,
} from 'react-google-maps';
import styles from './map.module.scss';

const CustomMap = (props: any) => {
  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={new google.maps.LatLng(41.85073, -87.65126)}
    >
      {props.directions !== null && (
        <DirectionsRenderer directions={props.directions} />
      )}
    </GoogleMap>
  );
};

const WrapperMap = withGoogleMap(CustomMap);

const Map = (props: any) => {
  const [directions, setDirections] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const directionsService = new google.maps.DirectionsService();
    directionsService.route(
      {
        origin: props.fromLocation,
        destination: props.toLocation,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result: any, status: any) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          setError(result);
        }
      }
    );
  }, [props.toLocation, props.fromLocation]);

  return (
    <div className={styles.container}>
      <WrapperMap
        // googleMapURL='https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyB4PYjvrGpT3dlTXb3BQY3JhLslRngDWHU'
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        directions={directions}
        isMarkerShown
      />
    </div>
  );
};

export default Map;
