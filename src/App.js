import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import MapComponent from "./components/map";
import Chart from "./components/chart";
import getDistanceFromLatLonInKm from "./components/distance";

function App() {
  const [data1] = useState([{ id: 1, name: "home", distance: 0, visits: 0 }]);

  const [data, setData] = useState([]);
  var list = [
    {
      id: 1,
      lat: 44.444281738102255,
      lng: 25.976536281058195,
      distance: 0,
      visits: 0,
    },
  ];

  return (
    <div>
      <MapComponent setData={setData} data={data}></MapComponent>
      <div class="row">
        <div class="margin">
          <input
            value="Console log all points"
            type="button"
            onClick={() => console.log(data)}
          ></input>
        </div>

        <div class="margin">
          <input
            value="Reset all points"
            type="button"
            onClick={() => {
              list = [
                {
                  id: 1,
                  lat: 44.444281738102255,
                  lng: 25.976536281058195,
                  distance: 0,
                  visits: 0,
                },
              ];
              setData(list);
            }}
          ></input>
        </div>
      </div>

      <Chart data={data}></Chart>
    </div>
  );
}

export default App;
