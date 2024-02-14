import { Container, Typography } from "@mui/material";
import BarChart from "components/barChart";
import BarOrientationMenu from "components/barOrientationMenu";
import FeatureMenu from "components/featureMenu";
import HorizontalBarChart from "components/horizontalBarChart";
import { useState } from "react";


function getDispName(feature, menuItems) {
	for (const elem of menuItems) {
		if (elem['id'] == feature) {
			console.log('Feature = ' + elem['disp_string']);
			return elem['disp_string']
		}
	}
	console.log('Returning undefined')
	return undefined
}

function BarChartsPage() {
	const barChartMenuItems = [
		{ 'id': 'released_year_categorical', disp_string: 'Released Year' },
		{ 'id': 'released_month', disp_string: 'Released Month' },
		{ 'id': 'released_day', disp_string: 'Released Day' },
		{ 'id': 'bpm_categorical', disp_string: 'Beats Per Minute' },
		{ 'id': 'key', disp_string: 'Key' },
		{ 'id': 'mode', disp_string: 'Mode' },
		{ 'id': 'in_spotify_playlists_categorical', disp_string: 'In Spotify Playlists' },
		{ 'id': 'in_apple_playlists_categorical', disp_string: 'In Apple Playlists' }]

	const [barChartFeatureDispString, setBarChartFeatureDispString] = useState('Released Month');

	const [barChartFeature, setBarChartFeature] = useState('released_month');
	const handleChange = (event) => {
		setBarChartFeature(event.target.value)
		setBarChartFeatureDispString(getDispName(event.target.value, barChartMenuItems))
	}

	const [value, setValue] = useState('vertical_bars');

	const handleChangeRadioButton = (event) => {
		setValue(event.target.value);
	};

	return (
		<Container>
			<Typography variant='h2' align='center'>Bar Chart Page!</Typography>
			<FeatureMenu initialFeature={barChartFeature} handleChange={handleChange} menuItems={barChartMenuItems} labelValue='Bar Chart Feature'/>
			<BarOrientationMenu value={value} handleChange={handleChangeRadioButton} />
			{value === 'vertical_bars' ? <BarChart currColName={barChartFeature} currColDispName={barChartFeatureDispString} /> : <HorizontalBarChart currColName={barChartFeature} />}
		</Container>
	);
}

export default BarChartsPage;