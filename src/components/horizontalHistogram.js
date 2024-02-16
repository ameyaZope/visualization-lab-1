import * as d3 from "d3";
import { useEffect, useRef } from "react";

function HorizontalHistogram({ currColName = 'streams', numBins = 20, currColDispName = 'Streams' }) {
	const histogramSvgRef = useRef();
	useEffect(() => {
		var margin = { top: 30, right: 30, bottom: 90, left: 90 },
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
		svg.append("text")
			.attr("x", width / 2)
			.attr("y", 0 - (margin.top / 2))
			.attr("text-anchor", "middle")
			.style("font-size", "20px")
			.style("text-decoration", "underline")
			.text(`Frequency vs ${currColDispName}`);

		// get the data
		d3.csv("static/data/spotify_processed_data.csv", d3.autoType).then(function (data) {

			// Bin the data.
			const bins = d3.bin()
				.thresholds(numBins)
				.value((d) => d[currColName])
				(data);
			console.log(bins);

			// Declare the x (horizontal position) scale.
			const y = d3.scaleLinear()
				.domain([bins[0].x0, bins[bins.length - 1].x1])
				.range([height, 0]);
			//Add the X Axis and The Label
			const yAxis = svg.append("g")
				.transition()
				.duration(1000)
				.call(d3.axisLeft(y))
				.selectAll("text")
				.attr("transform", "translate(-10,0)rotate(-45)")
				.style("text-anchor", "end")
			svg.append("text")
				.attr("transform", "rotate(-90)")
				.attr("y", 0 - margin.left)
				.attr("x", 0 - (height / 2))
				.attr("dy", "1em")
				.style("text-anchor", "middle")
				.text(`${currColDispName}`);

			// Declare the y (vertical position) scale.
			const x = d3.scaleLinear()
				.domain([0, d3.max(bins, (d) => d.length)])
				.range([0, width]);
			//Add y Axis and the label
			const xAxis = svg.append("g")
				.attr("transform", `translate(0,${height})`)
				.call(d3.axisBottom(x))
				.selectAll("text")
				.attr("transform", "translate(-10,0)rotate(-45)")
				.style("text-anchor", "end")
			svg.append("text")
				.attr("transform", `translate(${width / 2}, ${height + margin.bottom - 10})`)
				.style("text-anchor", "middle")
				.text(`Frequency`); 

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

			// Add a rect for each bin.
			svg.append("g")
				.attr("fill", "steelblue")
				.selectAll()
				.data(bins)
				.join("rect")
				.attr("x", x(0))
				.attr("width", (d) => x(0))
				.attr("y", (d) => y(d.x1))
				.attr("height", (d) => Math.abs(y(d.x0) - y(d.x1)))
				.on('mouseover', function (event, data) {
					tooltip
						.html(
							`<div>Frequency: ${data.length} <br> Range: [${data.x0}, ${data.x1})</div>`
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
				});

			// Animation
			svg.selectAll("rect")
				.transition()
				.duration(800)
				.delay((d, i) => { return i * 20 })
				.attr("width", (d) => x(d.length))

		});
	}, [currColName, numBins, currColDispName])

	return (
		<svg width={500} height={500} id="chart" ref={histogramSvgRef} />
	);
}

export default HorizontalHistogram;