import { Container, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { useState } from "react";


function HistorgramsPage() {
	const [histFeature, setHistFeature] = useState('histFeature');
	const handleChange = (event) => {
		alert('Changing To ' + event.target.value)
		setHistFeature(event.target.value)
	}
	return (
		<Container>
			<Typography variant='h1' align='center'>Histograms Page!</Typography>
			<FormControl fullWidth sx={{ m: 1, width:160, }}>
				<InputLabel id="demo-simple-select-label">Histogram Feature</InputLabel>
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					value={histFeature}
					label="Histogram Feature"
					onChange={handleChange}
				>
					<MenuItem value={10}>Ten</MenuItem>
					<MenuItem value={20}>Twenty</MenuItem>
					<MenuItem value={30}>Thirty</MenuItem>
					<MenuItem value={40}>Forty</MenuItem>
					<MenuItem value={50}>Fifty</MenuItem>
					<MenuItem value={60}>Sixty</MenuItem>
				</Select>
			</FormControl>
		</Container>
	);
}

export default HistorgramsPage;