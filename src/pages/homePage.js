import { Container, Grid } from '@mui/material';
import MiniDrawer from 'components/miniVariantDrawer';
import * as React from 'react';
import BarChartAndHistogramPage from './barChartAndHistogramPage';
import ScatterplotsPage from './scatterplotsPage';

function HomePage() {
	const [chartType, setChartType] = React.useState('barchartAndHistogram');
	const changeToScatterplot = () => {
		console.log('Handle to scatterplot change')
		setChartType('scatterplot')
	}
	const changeToBarchartAndHistogram = () => {
		console.log('Handle Bar chart click')
		setChartType('barchartAndHistogram');
	}

	return (
		<Container>
			<MiniDrawer handleBarChartClick={changeToBarchartAndHistogram} handleScatterplotClick={changeToScatterplot} />
			<Grid container spacing={2}>
				<Grid xs={12} item={true} alignItems="center" justifyContent="center">
					{chartType === 'barchartAndHistogram' && <BarChartAndHistogramPage />}
					{chartType === 'scatterplot' && <ScatterplotsPage />}
				</Grid>
			</Grid>

		</Container>
	);
}

export default HomePage