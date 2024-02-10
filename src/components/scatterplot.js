import * as d3 from "d3";
import { useEffect, useRef } from "react";


function Scatterplot({ xAxisFeature, yAxisFeature, xAxisCategorical, yAxisCategorical }) {
	const scatterPlotSvgRef = useRef();

	useEffect(() => {
		var margin = { top: 20, bottom: 80, left: 90, right: 50 };
		var width = 500, height = 500;

		var svgSelected = d3.select('#chart');
		svgSelected.selectAll('*').remove();

		var svg = d3.select(scatterPlotSvgRef.current)
			.append('svg')
			.attr('width', width + margin.left + margin.right)
			.attr('height', height + margin.top + margin.bottom)
			.append('g')
			.attr("transform",
				"translate(" + margin.left + "," + margin.top + ")");

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
			// Add dots
			svg.append('g')
				.selectAll("dot")
				.data(data)
				.enter()
				.append("circle")
				.attr("cx", function (d) { return x(d[xAxisFeature]); })
				.attr("cy", function (d) { return y(d[yAxisFeature]); })
				.attr("r", 3)
				.style("fill", "#69b3a2")
		})

	}, [xAxisFeature, yAxisFeature, xAxisCategorical, yAxisCategorical])

	return (
		<svg width={600} height={600} id="chart" ref={scatterPlotSvgRef}></svg>
	)
}

export default Scatterplot;