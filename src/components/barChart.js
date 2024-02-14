import * as d3 from "d3";
import { useEffect, useRef } from "react";

function BarChart({ currColName = 'released_month' }) {
	const barChartSvgRef = useRef();
	useEffect(() => {
		// set the dimensions and margins of the graph
		const margin = { top: 10, right: 30, bottom: 90, left: 90 },
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

		// Parse the Data
		d3.csv("static/data/spotify_processed_data.csv", d3.autoType).then(function (data) {
			// var currColName = 'released_year'
			var freqOfValues = new Map()
			for (let i = 0; i < data.length; i++) {
				freqOfValues.set(data[i][currColName], (freqOfValues.get(data[i][currColName]) || 0) + 1);
			}
			// X axis
			const x = d3.scaleBand()
				.range([0, width])
				.domain(data.map(d => (d[currColName])).sort())
				.padding(0.2);
			const xAxis = svg.append("g")
				.attr("transform", `translate(0,${height})`)
				.call(d3.axisBottom(x))
				.selectAll("text")
				.attr("transform", "translate(-10,0)rotate(-45)")
				.style("text-anchor", "end")

			let maxVal = 0;
			for (const [k, v] of freqOfValues) {
				maxVal = Math.max(maxVal, v)
			}
			const y = d3.scaleLinear()
				.domain([0, maxVal * 1.1])
				.range([height, 0]);
			const yAxis = svg.append("g")
				.transition()
				.duration(1000)
				.call(d3.axisLeft(y));

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
				.attr("x", (d, i) => { return x(d[0]) })
				.attr("width", x.bandwidth())
				.attr("fill", "steelblue")
				// no bar at the beginning thus:
				.attr("height", d => height - y(0)) // always equal to 0
				.attr("y", d => y(0))
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
				.attr("y", d => { return y(d[1]) })
				.attr("height", d => height - y(d[1]))
		})
	}, [currColName]);

	return (
		<svg width={600} height={600} id="barchart" ref={barChartSvgRef} />
	);
}

export default BarChart;