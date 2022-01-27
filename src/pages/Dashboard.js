import React, { useState, useEffect } from "react";
import "../App.css";
import MapComponent from "../components/map";
import Chart from "../components/chart";
import { BarChart, AreaChart, BubbleChart } from "react-charts-d3";

import getDistanceFromLatLonInKm from "../components/distance";

function Dashboard(props) {
  var micuLat = 44.444281738102255;
  var micuLng = 25.976536281058195;

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

  const [plot, setPlot] = useState(false);
  const [plotButton, setPlotButton] = useState("Plot distances");

  const [plot1, setPlot1] = useState(false);
  const [plotButton1, setPlotButton1] = useState("Plot ratings");
  const [data1, setData1] = useState([]);

  const [plot2, setPlot2] = useState(false);
  const [plotButton2, setPlotButton2] = useState("Plot popularity");
  const [data2, setData2] = useState([]);

  const [plot3, setPlot3] = useState(false);
  const [plotButton3, setPlotButton3] = useState("Plot places affordability");
  const [data3, setData3] = useState([]);

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

    fetch("http://127.0.0.1:5000/places/popularity")
      .then((resp) => resp.json())
      .then((data) => setData2(data));

    fetch("http://127.0.0.1:5000/places/price-level", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email }),
    }).then((response) =>
      response.json().then((json) => {
        setData3(json);
      })
    );
  }, [email]);

  function familyPlaces() {
    fetch("http://127.0.0.1:5000/places/family-places", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email }),
    }).then((response) =>
      response.json().then((json) => {
        list = [
          {
            id: 1,
            lat: 44.444281738102255,
            lng: 25.976536281058195,
            distance: 0,
            visits: 0,
          },
        ];

        json.forEach((place) => {
          list.push({
            id: list.length + 1,
            lat: place.lat,
            lng: place.lng,
            distance: getDistanceFromLatLonInKm(
              micuLat,
              micuLng,
              place.lat,
              place.lng
            ),
            visits: 1,
            user_id: place.user_id,
          });
        });

        setData(list);
        setText("");
      })
    );
  }

  return (
    <div>
      <h2 style={{ marginTop: "30px", textAlign: "center" }}>Google Maps</h2>
      <MapComponent setData={setData} data={data} list={list}></MapComponent>
      <h3 style={{ marginTop: "20px", textAlign: "center" }}>Menu</h3>
      <div className="row">
        <div className="margin">
          <input
            value="Get user and family places"
            type="button"
            onClick={() => {
              familyPlaces();
            }}
          ></input>
        </div>

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
