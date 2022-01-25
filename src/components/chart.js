import React, { useRef, useEffect, useState } from "react";
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
    const width = 800;
    const height = Math.max(300, Math.max.apply(Math, distances));
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .style("background-color", "#d3d3d3")
      .style("margin-top", "20")
      .style("margin-left", "50")
      .style("overflow", "visible");

    // setting up scaling
    const xScale = d3
      .scaleLinear()
      .domain([0, data.length - 1])
      .range([0, width]);
    const yScale = d3.scaleLinear().domain([0, height]).range([height, 0]);
    const generateScaledLine = d3
      .line()
      .x((d, i) => xScale(i))
      .y(yScale)
      .curve(d3.curveCardinal);

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
      );
    svg.append("g").call(yAxis);

    // setting up data for svg
    svg
      .selectAll(".bar")
      .data([data])
      .join("path")
      .attr("d", (d) => generateScaledLine(d))
      .attr("fill", "none")
      .attr("stroke", "black");
  }, [props.fullData]);

  return (
    <div>
      <svg ref={svgRef}></svg>
      {false ? (
        <div className="margin">
          <input
            value="Console distances"
            type="button"
            onClick={() =>
              console.log(Math.max(200, Math.max.apply(Math, distances)))
            }
          ></input>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Chart;
