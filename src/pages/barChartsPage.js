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

	return (
		<Container>
			<Typography variant='h2' align='center'>Bar Chart Page!</Typography>
			<FeatureMenu barChartFeature={barChartFeature} handleChange={handleChange} />
			<BarOrientationMenu value={value} handleChange={handleChangeRadioButton} />
			{value === 'vertical_bars' ? <BarChart currColName={barChartFeature} /> : <HorizontalBarChart currColName={barChartFeature} />}
		</Container>
	);
}

export default BarChartsPage;