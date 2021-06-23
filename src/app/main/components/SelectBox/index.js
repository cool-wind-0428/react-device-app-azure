import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
	formControl: {
		minWidth: 120,
		width:200
	},
	selectEmpty: {
		marginTop: theme.spacing(2)
	}
}));

export default function SimpleSelect(props) {
	const classes = useStyles();
    const [age, setAge] = React.useState('');
    const { id, data, variant, value, handleChangeValue, validation, disabled, willvalidation, validate, size } = props;

	const handleChange = event => {
		if (willvalidation) {
			if (event.target.value) {
				handleChangeValue({ [validation]: event.target.value, [`${validation}Validation`]: false });
			} else {
				handleChangeValue({ [validation]: event.target.value, [`${validation}Validation`]: true });
			}
		} else {
			handleChangeValue({ [validation]: event.target.value });
		}
	};
	return (
		<FormControl variant="outlined" className={classes.formControl} size="small" error={validate ? true : false}>
			<InputLabel id="demo-simple-select-outlined-label">{props.label}</InputLabel>
			<Select			
				labelId="demo-simple-select-outlined-label"
				id="demo-simple-select-outlined"
				value={value}
				onChange={handleChange}
				label={props.label}
				InputProps={size&&{
					style:{width:size},
					
				}}
				disabled={disabled?disabled:false}
			>
                {data.length>0&&data.map((item, index)=>(
                    <MenuItem value={item.value} key={index}>{item.item}</MenuItem>
                ))}
				
			</Select>
		</FormControl>
	);
}
