import * as d3 from "d3";
import { useEffect, useRef } from "react";

function HorizontalBarChart({ currColName = 'released_month', currColDispName = 'Released Month' }) {
	const barChartSvgRef = useRef();
	useEffect(() => {
		// set the dimensions and margins of the graph
		const margin = { top: 30, right: 30, bottom: 90, left: 90 },
			width = 500 - margin.left - margin.right,
			height = 500 - margin.top - margin.bottom;

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
		svg.append("text")
			.attr("x", width / 2)
			.attr("y", 0 - (margin.top / 2))
			.attr("text-anchor", "middle")
			.style("font-size", "20px")
			.style("text-decoration", "underline")
			.text(`Frequency vs ${currColDispName}`);

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
			const x = d3.scaleLinear()
				.domain([0, maxVal * 1.1])
				.range([0, width]);
			const xAxis = svg.append("g")
				.attr("transform", "translate(0," + height + ")")
				.call(d3.axisBottom(x))
				.selectAll("text")
				.attr("transform", "translate(-10,0)rotate(-45)")
				.style("text-anchor", "end");
			svg.append("text")
				.attr("transform", `translate(${width / 2}, ${height + margin.bottom - 10})`)
				.style("text-anchor", "middle")
				.text(`Frequency`); 

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
			svg.append("text")
				.attr("transform", "rotate(-90)")
				.attr("y", 0 - margin.left)
				.attr("x", 0 - (height / 2))
				.attr("dy", "1em")
				.style("text-anchor", "middle")
				.text(`${currColDispName}`);

			var tooltip = d3
				.select('body')
				.append('div')
				.attr('class', 'd3-tooltip')
				.style('position', 'absolute')
				.style('z-index', '10')
				.style('visibility', 'hidden')
				.style('padding', '10px')
				.style('background', 'rgba(0,0,0,0.6)')
				.style('border-radius', '4px')
				.style('color', '#fff')
				.text('a simple tooltip');

			// Bars
			svg.selectAll("mybar")
				.data(freqOfValues.entries())
				.join("rect")
				.attr("x", d => x(0))
				.attr("y", (d, i) => { return y(d[0]) })
				.attr("height", y.bandwidth())
				.attr("fill", "steelblue")
				// no bar at the beginning thus:
				.attr("width", d => x(0)) // always equal to 0
				.on('mouseover', function (event, data) {
					tooltip
						.html(
							`<div>Frequency: ${data[1]}</div>`
						)
						.style('visibility', 'visible');
					d3.select(this).transition().attr('fill', '#eec42d');
				})
				.on('mousemove', function (d) {
					tooltip
						.style('top', d.pageY - 10 + 'px')
						.style('left', d.pageX + 10 + 'px');
				})
				.on('mouseout', function () {
					tooltip.html(``).style('visibility', 'hidden');
					d3.select(this).transition().attr('fill', 'steelblue');
				})

			// Animation
			svg.selectAll("rect")
				.transition()
				.duration(800)
				.delay((d, i) => { return i * 20 })
				.attr("width", d => x(d[1]))
		})
	}, [currColName, currColDispName]);

	return (
		<svg width={600} height={600} id="barchart" ref={barChartSvgRef} />
	);
}

export default HorizontalBarChart;