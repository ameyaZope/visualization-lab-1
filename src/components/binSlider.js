import { Slider } from "@mui/material"

function BinSlider({numBins, handleChange}) {
	return (
		<Slider 
		aria-label="Default" 
		valueLabelDisplay="auto"
		value={numBins}
		onChange={handleChange} />
	)
}

export default BinSlider