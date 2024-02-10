import * as d3 from "d3";
import { useEffect, useRef } from "react";

function Histogram({ currColName = 'streams', numBins = 20 }) {
	const histogramSvgRef = useRef();
	useEffect(() => {
		var margin = { top: 10, right: 30, bottom: 60, left: 40 },
			width = 500 - margin.left - margin.right,
			height = 500 - margin.top - margin.bottom;

		// below line clears the svg so that next graph can be drawn on it, 
		// else there is overlap of graphs
		var svgSelected = d3.select("#chart");
		svgSelected.selectAll("*").remove();

		// append the svg object to the body of the page
		var svg = d3.select(histogramSvgRef.current)
			.append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform",
				"translate(" + margin.left + "," + margin.top + ")");

		// get the data
		d3.csv("static/data/spotify_processed_data.csv", d3.autoType).then(function (data) {

			// Bin the data.
			const bins = d3.bin()
				.thresholds(numBins)
				.value((d) => d[currColName])
				(data);
			console.log(bins);

			// Declare the x (horizontal position) scale.
			const x = d3.scaleLinear()
				.domain([bins[0].x0, bins[bins.length - 1].x1])
				.range([0, width]);
			//Add the X Axis and The Label
			const xAxis = svg.append("g")
				.attr("transform", `translate(0,${height})`)
				.call(d3.axisBottom(x))
				.selectAll("text")
				.attr("transform", "translate(-10,0)rotate(-45)")
				.style("text-anchor", "end")

			// Declare the y (vertical position) scale.
			const y = d3.scaleLinear()
				.domain([0, d3.max(bins, (d) => d.length)])
				.range([height, 0]);
			//Add y Axis and the label
			const yAxis = svg.append("g")
				.transition()
				.duration(1000)
				.call(d3.axisLeft(y))
				.selectAll("text")
				.attr("transform", "translate(-10,0)rotate(-45)")
				.style("text-anchor", "end")

			// Add a rect for each bin.
			svg.append("g")
				.attr("fill", "steelblue")
				.selectAll()
				.data(bins)
				.join("rect")
				.attr("x", (d) => x(d.x0) + 1)
				.attr("width", (d) => x(d.x1) - x(d.x0))
				.attr("y", (d) => y(0))
				.attr("height", (d) => height - y(0));

			// Animation
			svg.selectAll("rect")
				.transition()
				.duration(800)
				.delay((d, i) => { return i * 20 })
				.attr("y", (d) => y(d.length))
				.attr("height", (d) => y(0) - y(d.length))

		});
	}, [currColName, numBins])

	return (
		<svg width={700} height={700} id="chart" ref={histogramSvgRef} />
	);
}

export default Histogram;