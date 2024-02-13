import { Container, Typography } from "@mui/material";
import FeatureMenu from "components/featureMenu";
import Scatterplot from "components/scatterplot";
import { useState } from "react";

function isCategorical(feature, listOfFeatures) {
	for (const item of listOfFeatures) {
		if (item['id']===feature) {
			return item['categorical']
		}
	}
	return false;
}

function getLabel(feature, listOfFeatures) {
	for (const item of listOfFeatures) {
		if(item['id']===feature) {
			return item['disp_string'];
		}
	}
	return undefined;
}

function ScatterplotsPage() {
	const [xAxisFeature, setXAxisFeature] = useState('streams');
	const handleXAxisFeatureChange = (event) => {
		setXAxisFeature(event.target.value)
	}

	const [yAxisFeature, setYAxisFeature] = useState('released_month')
	const handleYAxisFeatureChange = (event) => {
		setYAxisFeature(event.target.value)
	}

	const scatterPlotMenuItems = [
		{ 'id': 'streams', disp_string: 'Streams', 'categorical': false },
		{ 'id': 'danceability_percent', disp_string: 'Danceability Percent', 'categorical': false },
		{ 'id': 'valence_percent', disp_string: 'Valence Percent', 'categorical': false },
		{ 'id': 'energy_percent', disp_string: 'Energy Percent', 'categorical': false },
		{ 'id': 'acousticness_percent', disp_string: 'Acousticness Percent', 'categorical': false },
		{ 'id': 'instrumentalness_percent', disp_string: 'Instrumentalness Percent', 'categorical': false },
		{ 'id': 'liveness_percent', disp_string: 'Liveness Percent', 'categorical': false },
		{ 'id': 'speechiness_percent', disp_string: 'Speechiness Percent', 'categorical': false },
		{ 'id': 'released_year_categorical', disp_string: 'Released Year', 'categorical': true },
		{ 'id': 'released_month', disp_string: 'Released Month', 'categorical': true },
		{ 'id': 'released_day', disp_string: 'Released Day', 'categorical': true },
		{ 'id': 'bpm_categorical', disp_string: 'Beats Per Minute', 'categorical': true },
		{ 'id': 'key', disp_string: 'Key', 'categorical': true },
		{ 'id': 'mode', disp_string: 'Mode', 'categorical': true },
		{ 'id': 'in_spotify_playlists_categorical', disp_string: 'In Spotify Playlists', 'categorical': true },
		{ 'id': 'in_apple_playlists_categorical', disp_string: 'In Apple Playlists', 'categorical': true }]

	return (
		<Container>
			<Typography variant='h2' align='center'>Scatterplots Page!</Typography>
			<FeatureMenu barChartFeature={xAxisFeature} handleChange={handleXAxisFeatureChange} menuItems={scatterPlotMenuItems} labelValue='X Axis Feature' />
			<FeatureMenu barChartFeature={yAxisFeature} handleChange={handleYAxisFeatureChange} menuItems={scatterPlotMenuItems} labelValue='Y Axis Feature' />
			<Scatterplot xAxisFeature={xAxisFeature} yAxisFeature={yAxisFeature} 
			xAxisCategorical={isCategorical(xAxisFeature, scatterPlotMenuItems)} 
			yAxisCategorical={isCategorical(yAxisFeature, scatterPlotMenuItems)}
			xlabel={getLabel(xAxisFeature, scatterPlotMenuItems)}
			ylabel={getLabel(yAxisFeature, scatterPlotMenuItems)}/>
		</Container>
	);
}

export default ScatterplotsPage;