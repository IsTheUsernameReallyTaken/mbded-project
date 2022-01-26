import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import MapComponent from "./components/map";
import Chart from "./components/chart";
import Bar from "./components/bar";

function App() {
  var list = [
    {
      id: 1,
      lat: 44.444281738102255,
      lng: 25.976536281058195,
      distance: 0,
      visits: 0,
    },
  ];

  const [data, setData] = useState(list);

  const [plot, setPlot] = useState(false);
  const [plotButton, setPlotButton] = useState("Plot distances");

  return (
    <div>
      <MapComponent setData={setData} data={data} list={list}></MapComponent>
      <div className="row">
        <div className="margin">
          <input
            value="Console log all points"
            type="button"
            onClick={() => {
              console.clear();
              console.log(data);
            }}
          ></input>
        </div>

        <div className="margin">
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

        <div className="margin">
          <input
            value={plotButton}
            type="button"
            onClick={() => {
              if (plot === false) {
                setPlotButton("Hide plot");
              } else {
                setPlotButton("Plot distances");
              }
              setPlot(!plot);
            }}
          ></input>
        </div>

        {plot ? (
          <div className="margin">
            <input
              value={"Refresh data and plot"}
              type="button"
              onClick={() => {
                setPlot(false);
                setTimeout(() => {
                  setPlot(true);
                }, 250);
              }}
            ></input>
          </div>
        ) : (
          <></>
        )}

        {plot === false ? (
          <div className="margin">
            <input value="Plot visits" type="button" onClick={() => {}}></input>
          </div>
        ) : (
          <></>
        )}
      </div>
      {plot ? <Chart fullData={data}></Chart> : <></>}

      {/* <Bar></Bar> */}
    </div>
  );
}

export default App;
