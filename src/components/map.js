import React from "react";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  Polyline,
} from "@react-google-maps/api";
import getDistanceFromLatLonInKm from "./distance";

const style = {
  width: "100%",
  height: "70vh",
};

const micuLat = 44.444281738102255;
const micuLng = 25.976536281058195;

const micu = {
  id: 1,
  lat: 44.444281738102255,
  lng: 25.976536281058195,
  distance: 0,
  visits: 0,
};

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

  var list = props.data;

  const pathCoordinates = [
    // { lat: 44.444281738102255, lng: 25.976536281058195 },
    // { lat: 45.444281738102255, lng: 26.976536281058195 },
  ];

  list.forEach((punct) => {
    if (punct.id === 1) {
      return;
    } else {
      pathCoordinates.push([
        { lat: micuLat, lng: micuLng },
        { lat: punct.lat, lng: punct.lng },
      ]);
    }
  });

  return isLoaded ? (
    <GoogleMap
      onClick={(ev) => {
        let alreadyClickedHere = false;
        list.forEach((coord) => {
          if (coord.lat === ev.latLng.lat() && coord.lng === ev.latLng.lng()) {
            alreadyClickedHere = true;
            coord.visits++;
          }
        });

        if (alreadyClickedHere === true) {
          return;
        }

        var id = list.length + 1;

        list.push({
          id: id,
          lat: ev.latLng.lat(),
          lng: ev.latLng.lng(),
          distance: getDistanceFromLatLonInKm(
            micuLat,
            micuLng,
            ev.latLng.lat(),
            ev.latLng.lng()
          ),
          visits: 1,
        });

        console.clear();
        console.log(list);
        props.setData(list);
      }}
      mapContainerStyle={style}
      center={micu}
      zoom={15}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* <Marker position={micu}></Marker> */}

      {pathCoordinates.map((linie) => {
        return (
          <Polyline
            path={linie}
            geodesic={true}
            options={{
              strokeColor: "#ff2527",
              strokeOpacity: 1,
              strokeWeight: 5,
              icons: [
                {
                  // icon: lineSymbol,
                  offset: "0",
                  repeat: "20px",
                },
              ],
            }}
          />
        );
      })}

      {/* <Polyline
        path={pathCoordinates}
        geodesic={true}
        options={{
          strokeColor: "#ff2527",
          strokeOpacity: 1,
          strokeWeight: 3,
          icons: [
            {
              // icon: lineSymbol,
              offset: "0",
              repeat: "20px",
            },
          ],
        }}
      /> */}

      {list.map((punct) => {
        return punct.id === 1 ? (
          <Marker position={{ lat: punct.lat, lng: punct.lng }}></Marker>
        ) : (
          <Marker
            position={{ lat: punct.lat, lng: punct.lng }}
            icon={
              punct.user_id === 1
                ? "http://maps.google.com/mapfiles/ms/icons/yellow.png"
                : punct.user_id === 2
                ? "http://maps.google.com/mapfiles/ms/icons/blue.png"
                : "http://maps.google.com/mapfiles/ms/icons/green.png"
            }
          ></Marker>
        );
      })}

      <></>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default MapComponent;
