import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "../../node_modules/@mui/material/index";

function BarOrientationMenu({ value, handleChange }) {
	return (
		<FormControl>
			<FormLabel id="demo-row-radio-buttons-group-label">Orientation</FormLabel>
			<RadioGroup
				row
				aria-labelledby="demo-row-radio-buttons-group-label"
				name="row-radio-buttons-group"
				value={value}
				onChange={handleChange}
			>
				<FormControlLabel value="vertical_bars" control={<Radio />} label="Vertical Bars" />
				<FormControlLabel value="horizontal_bars" control={<Radio />} label="Horizontal Bars" />
			</RadioGroup>
		</FormControl>
	);
}

export default BarOrientationMenu;