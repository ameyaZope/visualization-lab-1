import * as d3 from "d3";
import { useEffect, useRef } from "react";


function Scatterplot({ xAxisFeature, yAxisFeature, xAxisCategorical, yAxisCategorical, xlabel, ylabel }) {
	const scatterPlotSvgRef = useRef();

	useEffect(() => {
		var margin = { top: 40, bottom: 90, left: 90, right: 50 };
		var width = 500, height = 400;

		var svgSelected = d3.select('#chart');
		svgSelected.selectAll('*').remove();

		var svg = d3.select(scatterPlotSvgRef.current)
			.append('svg')
			.attr('width', width + margin.left + margin.right)
			.attr('height', height + margin.top + margin.bottom)
			.append('g')
			.attr("transform",
				"translate(" + margin.left + "," + margin.top + ")");
		svg.append("text")
			.attr("x", width / 2)
			.attr("y", 0 - (margin.top / 2))
			.attr("text-anchor", "middle")
			.style("font-size", "20px")
			.style("text-decoration", "underline")
			.text(`${ylabel} vs ${xlabel}`);

		d3.csv('static/data/spotify_processed_data.csv', d3.autoType).then(function (data) {
			let x, y;
			// create and place the x axis
			if (xAxisCategorical) {
				x = d3.scaleBand()
					.domain(Array.from(new Set(data.map(d => d[xAxisFeature]))))
					.range([0, width])
					.padding(0.2)
				const xAxis = svg.append('g')
					.attr('transform', `translate(0, ${height})`) // used to place the x axis at the bottom of the svg
					.call(d3.axisBottom(x))
				xAxis
					.transition()
					.duration(1000)
					.selectAll('text')
					.attr('transform', 'translate(-10, 0) rotate(-45)')
					.style('text-anchor', 'end')
			}
			else {
				let maxVal = 0
				for (const item of data) {
					maxVal = Math.max(maxVal, item[xAxisFeature])
				}
				x = d3.scaleLinear()
					.domain([0, maxVal * 1.1])
					.range([0, width])
				const xAxis = svg.append('g')
					.call(d3.axisBottom(x))
					.attr('transform', `translate(0, ${height})`) // used to place the x axis at the bottom of the svg
				xAxis
					.transition()
					.duration(1000)
					.selectAll('text')
					.attr('transform', 'translate(-10, 0) rotate(-45)')
					.style('text-anchor', 'end')
			}

			// x axis label
			svg.append('g')
				.append('text')
				.attr("x", width / 2)
				.attr("y", height + 70)
				.attr("fill", "currentColor")
				.attr("text-anchor", "end")
				.text(`${xlabel} →`)

			//create and place the y axis. 
			if (yAxisCategorical) {
				y = d3.scaleBand()
					.domain(Array.from(new Set(data.map(d => d[yAxisFeature]))))
					.range([height, 0])
					.padding(0.2)
				const yAxis = svg.append('g')
					.transition()
					.duration(1000)
					.call(d3.axisLeft(y))
					.selectAll('text')
					.attr('transform', 'translate(-10, 0) rotate(-45)')
					.style('text-anchor', 'end')
			}
			else {
				let maxVal = 0;
				for (const item of data) {
					maxVal = Math.max(maxVal, item[yAxisFeature])
				}
				y = d3.scaleLinear()
					.domain([0, maxVal * 1.1])
					.range([height, 0])
				const yAxis = svg.append('g')
					.transition()
					.duration(1000)
					.call(d3.axisLeft(y))
					.selectAll('text')
					.attr('transform', 'translate(-10, 0) rotate(-45)')
					.style('text-anchor', 'end')
			}
			svg.append("text")
				.attr("transform", "rotate(-90)")
				.attr("y", 0 - margin.left)
				.attr("x", 0 - (height / 2))
				.attr("dy", "1em")
				.style("text-anchor", "middle")
				.text(`${ylabel} →`);

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

			// Add dots
			svg.append('g')
				.selectAll("dot")
				.data(data)
				.enter()
				.append("circle")
				.attr("cx", function (d) {
					let jitter = 0; // Initialize jitter to 0
					// Apply jitter if xAxis is categorical
					if (xAxisCategorical) {
							jitter = (Math.random() - 0.5) * x.bandwidth();
					}
					// Return position with optional jitter
					return x(d[xAxisFeature]) + (xAxisCategorical ? jitter : 0);
			})
			.attr("cy", function (d) {
					let jitter = 0; // Initialize jitter to 0
					// Apply jitter if yAxis is categorical
					if (yAxisCategorical) {
							jitter = (Math.random() - 0.5) * y.bandwidth();
					}
					// Return position with optional jitter
					return y(d[yAxisFeature]) + (yAxisCategorical ? jitter : 0);
			})
				.attr("r", 3)
				.style("fill", "#69b3a2")
				.on('mouseover', function (event, data) {
					tooltip
						.html(
							`<div>Track Name: ${data['track_name']} <br> ${xlabel} : ${data[xAxisFeature]} <br> ${ylabel} : ${data[yAxisFeature]} </div>`
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
		})

	}, [xAxisFeature, yAxisFeature, xAxisCategorical, yAxisCategorical, xlabel, ylabel])

	return (
		<svg width={600} height={600} id="chart" ref={scatterPlotSvgRef}></svg>
	)
}

export default Scatterplot;