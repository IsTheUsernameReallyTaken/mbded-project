import React, { useRef, useEffect, useState } from "react";
import "./chart.css";
import * as d3 from "d3";

const Chart = (props) => {
  var data = props.data;
  console.log(data);
  // const [data1] = useState([{ id: 1, name: "home", distance: 0, visits: 0 }]);
  // const [data] = useState([100, 120, 13, 8, 4, 7, 10, 10, 10, 10, 11]);
  const svgRef = useRef();

  useEffect(() => {
    // setting up svg
    const width = 800;
    const height = 200;
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .style("background-color", "#d3d3d3")
      .style("margin-top", "50")
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
    svg.append("g").call(xAxis).attr("transform", `translate(0, ${height})`);
    svg.append("g").call(yAxis);

    // setting up data for svg
    svg
      .selectAll(".line")
      .data([data])
      .join("path")
      .attr("d", (d) => generateScaledLine(d))
      .attr("fill", "none")
      .attr("stroke", "black");
  }, [data]);

  return (
    <div>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default Chart;