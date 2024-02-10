import { FormControl, InputLabel, MenuItem, Select } from "../../node_modules/@mui/material/index";

function FeatureMenu({ barChartFeature, handleChange, menuItems }) {
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
				{menuItems.map(disp_key => <MenuItem key={disp_key['id']} value={disp_key['id']}>{disp_key['disp_string']}</MenuItem>)}
			</Select>
		</FormControl>

	);
}

export default FeatureMenu;