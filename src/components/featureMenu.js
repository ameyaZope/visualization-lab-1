import { FormControl, InputLabel, MenuItem, Select } from "../../node_modules/@mui/material/index";

function FeatureMenu({ barChartFeature, handleChange }) {
	return (
		<FormControl sx={{ m: 1, width: 260, }}>
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
				<MenuItem value={'in_spotify_playlists_categorical'}>Spotify Playlists Popularity</MenuItem>
				<MenuItem value={'in_apple_playlists_categorical'}>Apple Playlists Popularity</MenuItem>
			</Select>
		</FormControl>

	);
}

export default FeatureMenu;