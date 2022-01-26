import React, { useState, useEffect } from "react";
import "../App.css";
import MapComponent from "../components/map";
import Chart from "../components/chart";
import { BarChart, AreaChart, BubbleChart } from "react-charts-d3";

function Dashboard(props) {
  var list = [
    {
      id: 1,
      lat: 44.444281738102255,
      lng: 25.976536281058195,
      distance: 0,
      visits: 0,
    },
  ];

  var email = props.match.params.email;

  const [data, setData] = useState(list);

  const data2 = [
    {
      key: "My places popularity",
      values: [
        { x: "Place 1", y: 23 },
        { x: "Place 2", y: 8 },
        { x: "Place 3", y: 15 },
        { x: "Place 4", y: 37 },
        { x: "Place 5", y: 8 },
        { x: "Place 6", y: 15 },
        { x: "Place 7", y: 37 },
        { x: "Place 8", y: 8 },
        { x: "Place 9", y: 15 },
        { x: "Place 10", y: 37 },
        { x: "Place 11", y: 8 },
        { x: "Place 12", y: 15 },
        { x: "Place 13", y: 37 },
      ],
    },
  ];

  const data3 = [
    {
      key: "Place 1",
      values: [{ x: 1, y: 10, r: 5 }],
    },
    {
      key: "Place 2",
      values: [{ x: 2, y: 7, r: 3.5 }],
    },
    {
      key: "Place 3",
      values: [{ x: 3, y: 8, r: 4 }],
    },
    {
      key: "Place 4",
      values: [{ x: 4, y: 9, r: 4.5 }],
    },
    {
      key: "Place 5",
      values: [{ x: 5, y: 10, r: 5 }],
    },
    {
      key: "Place 6",
      values: [{ x: 6, y: 7, r: 3.5 }],
    },
    {
      key: "Place 7",
      values: [{ x: 7, y: 8, r: 4 }],
    },
    {
      key: "Place 8",
      values: [{ x: 8, y: 9, r: 4.5 }],
    },
    {
      key: "Place 9",
      values: [{ x: 9, y: 10, r: 5 }],
    },
    {
      key: "Place 10",
      values: [{ x: 10, y: 7, r: 3.5 }],
    },
    {
      key: "Place 11",
      values: [{ x: 11, y: 8, r: 4 }],
    },
    {
      key: "Place 12",
      values: [{ x: 12, y: 9, r: 4.5 }],
    },
  ];

  const [plot, setPlot] = useState(false);
  const [plotButton, setPlotButton] = useState("Plot distances");

  const [plot1, setPlot1] = useState(false);
  const [plotButton1, setPlotButton1] = useState("Plot ratings");
  const [data1, setData1] = useState([]);

  const [plot2, setPlot2] = useState(false);
  const [plotButton2, setPlotButton2] = useState("Plot popularity");

  const [plot3, setPlot3] = useState(false);
  const [plotButton3, setPlotButton3] = useState("Plot places affordability");

  const [text, setText] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:5000/places/place-ratings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email }),
    }).then((response) =>
      response.json().then((json) => {
        setData1(json);
      })
    );
  }, [email]);

  return (
    <div>
      <h2 style={{ marginTop: "30px", textAlign: "center" }}>Google Maps</h2>
      <MapComponent setData={setData} data={data} list={list}></MapComponent>
      <h3 style={{ marginTop: "20px", textAlign: "center" }}>Menu</h3>
      <div className="row">
        <div className="margin">
          <input
            value={text.length === 0 ? "Print all points" : "Hide textarea"}
            type="button"
            onClick={() => {
              if (text.length === 0) {
                let text01 = "";

                data.forEach((punct) => {
                  if (punct.id === 1) {
                    text01 =
                      text01 +
                      "id: " +
                      punct.id +
                      ", lat: " +
                      punct.lat +
                      ", lng: " +
                      punct.lng +
                      ", distance: " +
                      punct.distance +
                      ", visits: " +
                      punct.visits;
                  } else {
                    text01 =
                      text01 +
                      "\n" +
                      "id: " +
                      punct.id +
                      ", lat: " +
                      punct.lat +
                      ", lng: " +
                      punct.lng +
                      ", distance: " +
                      punct.distance +
                      ", visits: " +
                      punct.visits;
                  }
                });

                setText(text01);
              } else setText("");
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
              setText("");
            }}
          ></input>
        </div>

        <div className="margin">
          <input
            value={plotButton}
            type="button"
            onClick={() => {
              if (plot === false) {
                setPlotButton("Hide distances plot");
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
              value={"Refresh distances plot"}
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

        <div className="margin">
          <input
            value={plotButton1}
            type="button"
            onClick={() => {
              if (plot1 === false) {
                setPlotButton1("Hide ratings plot");
              } else {
                setPlotButton1("Plot ratings");
              }
              setPlot1(!plot1);
            }}
          ></input>
        </div>

        {plot1 ? (
          <div className="margin">
            <input
              value={"Refresh ratings plot"}
              type="button"
              onClick={() => {
                setPlot1(false);
                setTimeout(() => {
                  setPlot1(true);
                }, 250);
              }}
            ></input>
          </div>
        ) : (
          <></>
        )}

        <div className="margin">
          <input
            value={plotButton2}
            type="button"
            onClick={() => {
              if (plot2 === false) {
                setPlotButton2("Hide popularity plot");
              } else {
                setPlotButton2("Plot popularity");
              }
              setPlot2(!plot2);
            }}
          ></input>
        </div>

        {plot2 ? (
          <div className="margin">
            <input
              value={"Refresh popularity plot"}
              type="button"
              onClick={() => {
                setPlot2(false);
                setTimeout(() => {
                  setPlot2(true);
                }, 250);
              }}
            ></input>
          </div>
        ) : (
          <></>
        )}

        <div className="margin">
          <input
            value={plotButton3}
            type="button"
            onClick={() => {
              if (plot3 === false) {
                setPlotButton3("Hide affordability plot");
              } else {
                setPlotButton3("Plot places affordability");
              }
              setPlot3(!plot3);
            }}
          ></input>
        </div>

        {plot3 ? (
          <div className="margin">
            <input
              value={"Refresh affordability plot"}
              type="button"
              onClick={() => {
                setPlot3(false);
                setTimeout(() => {
                  setPlot3(true);
                }, 250);
              }}
            ></input>
          </div>
        ) : (
          <></>
        )}
      </div>

      {text.length !== 0 ? (
        <div style={{ margin: "30px" }}>
          <textarea
            style={{
              resize: "none",
              width: "95%",
              height: "300px",
              fontFamily: "Lucida Console",
              fontSize: "21px",
            }}
            value={text}
          />
        </div>
      ) : (
        <></>
      )}

      <div style={{ marginBottom: "50px" }}>
        {plot ? <Chart fullData={data} setText={setText}></Chart> : <></>}
        {plot2 ? <BarChart data={data2} /> : <></>}
        {plot1 ? <AreaChart data={data1} /> : <></>}
        {plot3 ? <BubbleChart data={data3} /> : <></>}
      </div>
    </div>
  );
}

export default Dashboard;
