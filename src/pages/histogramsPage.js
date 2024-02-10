import { Container, Typography } from "@mui/material";
import BarOrientationMenu from "components/barOrientationMenu";
import BinSlider from "components/binSlider";
import FeatureMenu from "components/featureMenu";
import Histogram from "components/histogram";
import HorizontalHistogram from "components/horizontalHistogram";
import { useState } from "react";


function HistorgramsPage() {
	const [histFeature, setHistFeature] = useState('streams');
	const handleChange = (event) => {
		setHistFeature(event.target.value)
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

	const histogramMenuItems = [
		{ 'id': 'streams', disp_string: 'Streams' },
		{ 'id': 'danceability_percent', disp_string: 'Danceability Percent' },
		{ 'id': 'valence_percent', disp_string: 'Valence Percent' },
		{ 'id': 'energy_percent', disp_string: 'Energy Percent' },
		{ 'id': 'acousticness_percent', disp_string: 'Acousticness Percent' },
		{ 'id': 'instrumentalness_percent', disp_string: 'Instrumentalness Percent' },
		{ 'id': 'liveness_percent', disp_string: 'Liveness Percent' },
		{ 'id': 'speechiness_percent', disp_string: 'Speechiness Percent' }]

	return (
		<Container>
			<Typography variant='h2' align='center'>Histograms Page!</Typography>
			<FeatureMenu barChartFeature={histFeature} handleChange={handleChange} menuItems={histogramMenuItems} />
			<BarOrientationMenu value={value} handleChange={handleChangeRadioButton} />
			<BinSlider numBins={numBins} handleChange={handleNumBinsChange} />
			{value === 'vertical_bars' ? <Histogram currColName={histFeature} numBins={numBins} /> : <HorizontalHistogram currColName={histFeature} numBins={numBins} />}
		</Container>
	);
}

export default HistorgramsPage;