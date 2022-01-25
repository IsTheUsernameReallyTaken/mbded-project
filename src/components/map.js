import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const style = {
  width: "100%",
  height: "50vh",
};

// const center = {
//   lat: 44.435122896446295,
//   lng: 26.04789577351546,
// };

const micu = {
  lat: 44.444281738102255,
  lng: 25.976536281058195,
};

var list = [micu];

function MapComponent(props) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBZ7l2jGuWaRGn2rm1TKhW3GjmraDCpEgA",
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      onClick={(ev) => {
        // console.log(ev.latLng.lat());
        // console.log(ev.latLng.lng());

        list.push({
          lat: ev.latLng.lat(),
          long: ev.latLng.lng(),
        });

        console.log(list);

        props.function(list);
      }}
      mapContainerStyle={style}
      center={micu}
      zoom={15}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <Marker position={micu}></Marker>
      <></>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default MapComponent;
