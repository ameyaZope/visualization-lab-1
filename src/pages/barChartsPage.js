import { Container, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { useState } from "react";
import BarChart from "../components/barChart";

function BarChartsPage() {
	const [barChartFeature, setBarChartFeature] = useState('released_month');
	const handleChange = (event) => {
		setBarChartFeature(event.target.value)
	}

	return (
		<Container>
			<Typography variant='h1' align='center'>Bar Chart Page!</Typography>
			<FormControl fullWidth sx={{ m: 1, width: 160, }}>
				<InputLabel id="demo-simple-select-label">Bar Chart Feature</InputLabel>
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					value={barChartFeature}
					label="Bar Chart Feature"
					onChange={handleChange}
				>
					<MenuItem value={'released_year'}>Release Year</MenuItem>
					<MenuItem value={'released_month'}>Release Month</MenuItem>
					<MenuItem value={'released_day'}>Release Day</MenuItem>
					<MenuItem value={'bpm'}>Beats Per Minute</MenuItem>
					<MenuItem value={'key'}>Key</MenuItem>
					<MenuItem value={'mode'}>Mode</MenuItem>
				</Select>
			</FormControl>
			<BarChart currColName={barChartFeature} />
		</Container>
	);
}

export default BarChartsPage;