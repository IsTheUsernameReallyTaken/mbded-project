import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import MapComponent from "./components/map";
import Chart from "./components/chart";
import getDistanceFromLatLonInKm from "./components/distance";

function App() {
  const [data1] = useState([{ id: 1, name: "home", distance: 0, visits: 0 }]);

  const [data, setData] = useState([]);

  return (
    <div>
      <MapComponent function={setData}></MapComponent>
      <Chart data={data}></Chart>
      <input type="button" onClick={() => console.log(data)}></input>
    </div>
  );
}

export default App;
