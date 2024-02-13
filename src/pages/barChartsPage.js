import { Container, Typography } from "@mui/material";
import BarChart from "components/barChart";
import BarOrientationMenu from "components/barOrientationMenu";
import FeatureMenu from "components/featureMenu";
import HorizontalBarChart from "components/horizontalBarChart";
import { useState } from "react";


function BarChartsPage() {
	const [barChartFeature, setBarChartFeature] = useState('released_month');
	const handleChange = (event) => {
		setBarChartFeature(event.target.value)
	}

	const [value, setValue] = useState('vertical_bars');

	const handleChangeRadioButton = (event) => {
		setValue(event.target.value);
	};

	const barChartMenuItems = [
		{ 'id': 'released_year', disp_string: 'Released Year' },
		{ 'id': 'released_month', disp_string: 'Released Month' },
		{ 'id': 'released_day', disp_string: 'Released Day' },
		{ 'id': 'bpm_categorical', disp_string: 'Beats Per Minute' },
		{ 'id': 'key', disp_string: 'Key' },
		{ 'id': 'mode', disp_string: 'Mode' },
		{ 'id': 'in_spotify_playlists_categorical', disp_string: 'In Spotify Playlists' },
		{ 'id': 'in_apple_playlists_categorical', disp_string: 'In Apple Playlists' }]
	return (
		<Container>
			<Typography variant='h2' align='center'>Bar Chart Page!</Typography>
			<FeatureMenu barChartFeature={barChartFeature} handleChange={handleChange} menuItems={barChartMenuItems} labelValue='Bar Chart Feature'/>
			<BarOrientationMenu value={value} handleChange={handleChangeRadioButton} />
			{value === 'vertical_bars' ? <BarChart currColName={barChartFeature} /> : <HorizontalBarChart currColName={barChartFeature} />}
		</Container>
	);
}

export default BarChartsPage;