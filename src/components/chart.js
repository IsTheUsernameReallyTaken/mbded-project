import React, { useRef, useEffect } from "react";
import "./chart.css";
import "../App.css";
import * as d3 from "d3";

const Chart = (props) => {
  var fullData = props.fullData;

  var distances = fullData.map(function (i) {
    return i.distance;
  });
  distances = distances.slice(1, distances.length);

  // console.log(distances);
  var data = distances;

  const svgRef = useRef();

  useEffect(() => {
    // setting up svg
    const width = 1500;
    const height = 500;
    const svg = d3
      .select(svgRef.current)
      .attr("width", "95%")
      .attr("height", height)
      .style("background-color", "#FFFFFFF")
      .style("margin-top", "10")
      .style("margin-left", "50")
      .style("overflow", "visible");

    // setting up scaling
    const xScale = d3
      .scaleLinear()
      .domain([0, data.length - 1])
      .range([0, 1500]);
    const yScale = d3
      .scaleLinear()
      .domain([0, Math.max(300, Math.max.apply(Math, distances))])
      .range([height, 0]);
    const generateScaledLine = d3
      .line()
      .x((d, i) => xScale(i))
      .y(yScale)
      .curve(d3.curveStepAfter);

    // setting up axis
    const xAxis = d3
      .axisBottom(xScale)
      .ticks(data.length)
      .tickFormat((i) => i + 1);
    const yAxis = d3.axisLeft(yScale).ticks(5);
    svg
      .append("g")
      .call(xAxis)
      .attr(
        "transform",
        `translate(0, ${Math.max(height, Math.max.apply(Math, distances))})`
      )
      .attr("viewbox", "0 0 960 500")
      .attr("preserveAspectRatio", "xMidYMid meet");
    svg.append("g").call(yAxis);

    // setting up data for svg
    svg
      .selectAll(".bar")
      .data([data])
      .join("path")
      .attr("d", (d) => generateScaledLine(d))
      .attr("fill", "none")
      .attr("stroke", "black")
      .style("stroke-width", 2.5)
      .style("stroke-dasharray", "10,3")
      .style("stroke-linejoin", "round");
  }, [fullData]);

  return (
    <div>
      <svg ref={svgRef}></svg>
      {true ? (
        <div className="row">
          <div className="margin">
            <input
              value="Print all distances"
              type="button"
              onClick={() => {
                if (distances.length === 0) {
                  props.setText(
                    "No locations besides home - therefore, no distances."
                  );
                }
                // console.log(distances);
                else props.setText(distances);
              }}
            ></input>
          </div>

          <div className="margin">
            <input
              value="Print max distance"
              type="button"
              onClick={() => {
                if (distances.length === 0) {
                  props.setText(
                    "No locations besides home - therefore, no max distance."
                  );
                }
                // console.log(distances);
                else
                  props.setText(
                    "maximum distance: " +
                      Math.max.apply(Math, distances) +
                      " km from home"
                  );
                // console.log(Math.max(300, Math.max.apply(Math, distances)));
              }}
            ></input>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Chart;
