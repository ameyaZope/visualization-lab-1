import * as d3 from "d3";
import { useEffect, useRef } from "react";

function HorizontalBarChart({ currColName = 'released_month' }) {
	const barChartSvgRef = useRef();
	useEffect(() => {
		// set the dimensions and margins of the graph
		const margin = { top: 10, right: 30, bottom: 90, left: 90 },
			width = 600 - margin.left - margin.right,
			height = 600 - margin.top - margin.bottom;

		// below line clears the svg so that next graph can be drawn on it, 
		// else there is overlap of graphs
		var svgSelected = d3.select("#barchart");
		svgSelected.selectAll("*").remove();

		// append the svg object to the body of the page
		const svg = d3.select(barChartSvgRef.current)
			.append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform", `translate(${margin.left},${margin.top})`);

		// Parse the Data
		d3.csv("static/data/spotify_processed_data.csv", d3.autoType).then(function (data) {
			// var currColName = 'released_year'
			var freqOfValues = new Map()
			for (let i = 0; i < data.length; i++) {
				freqOfValues.set(data[i][currColName], (freqOfValues.get(data[i][currColName]) || 0) + 1);
			}

			//X Axis
			let maxVal = 0;
			for (const [k, v] of freqOfValues) {
				maxVal = Math.max(maxVal, v)
			}
			console.log(freqOfValues);
			const x = d3.scaleLinear()
				.domain([0, maxVal * 1.1])
				.range([0, width]);
			const xAxis = svg.append("g")
				.attr("transform", "translate(0," + height + ")")
				.call(d3.axisBottom(x))
				.selectAll("text")
				.attr("transform", "translate(-10,0)rotate(-45)")
				.style("text-anchor", "end");

			// Y axis
			const y = d3.scaleBand()
				.range([0, height])
				.domain(data.map(d => (d[currColName])).sort())
				.padding(0.1);
			const yAxis = svg.append("g")
				.transition()
				.duration(1000)
				.call(d3.axisLeft(y))
				.selectAll("text")
				.attr("transform", "translate(-10,0)rotate(-45)")
				.style("text-anchor", "end");

			// Bars
			svg.selectAll("mybar")
				.data(freqOfValues.entries())
				.join("rect")
				.attr("x", d => x(0))
				.attr("y", (d, i) => { return y(d[0]) })
				.attr("height", y.bandwidth())
				.attr("fill", "#69b3a2")
				// no bar at the beginning thus:
				.attr("width", d => x(0)) // always equal to 0


			// Animation
			svg.selectAll("rect")
				.transition()
				.duration(800)
				.delay((d, i) => { return i * 20 })
				.attr("width", d => x(d[1]))
		})
	}, [currColName]);

	return (
		<svg width={800} height={600} id="barchart" ref={barChartSvgRef} />
	);
}

export default HorizontalBarChart;