import { Container } from "@mui/material";
import BarChart from "components/barChart";
import BarOrientationMenu from "components/barOrientationMenu";
import BinSlider from "components/binSlider";
import FeatureMenu from "components/featureMenu";
import Histogram from "components/histogram";
import HorizontalBarChart from "components/horizontalBarChart";
import HorizontalHistogram from "components/horizontalHistogram";
import { useState } from "react";

function isCategorical(feature, listOfFeatures) {
	for (const item of listOfFeatures) {
		if (item['id'] === feature) {
			return item['categorical']
		}
	}
	return false;
}

function BarChartAndHistogramPage() {
	const [feature, setFeature] = useState('released_month');
	const handleFeatureChange = (event) => {
		setFeature(event.target.value)
	}

	const [value, setValue] = useState('vertical_bars');
	const handleChangeRadioButton = (event) => {
		setValue(event.target.value);
	};

	const [numBins, setNumBins] = useState(20);
	const handleNumBinsChange = (event) => {
		console.log("Num Bins Changed to " + event.target.value)
		setNumBins(event.target.value)
	};

	const featureItems = [
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
			<FeatureMenu initialFeature={feature} handleChange={handleFeatureChange} menuItems={featureItems} labelValue='Bar Chart Feature' />
			<BarOrientationMenu value={value} handleChange={handleChangeRadioButton} />
			{isCategorical(feature, featureItems) && value === 'vertical_bars' && <BarChart currColName={feature} />}
			{isCategorical(feature, featureItems) && value !== 'vertical_bars' && <HorizontalBarChart currColName={feature} />}
			{!isCategorical(feature, featureItems) && value === 'vertical_bars' && <Container><BinSlider numBins={numBins} handleChange={handleNumBinsChange} /> <Histogram currColName={feature} numBins={numBins} /> </Container>}
			{!isCategorical(feature, featureItems) && value !== 'vertical_bars' && <Container><BinSlider numBins={numBins} handleChange={handleNumBinsChange} /> <HorizontalHistogram currColName={feature} numBins={numBins} /> </Container>}
		</Container>
	);
}

export default BarChartAndHistogramPage;