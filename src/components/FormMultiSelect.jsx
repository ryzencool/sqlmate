import React from 'react'
import {Controller} from 'react-hook-form'
import {FormControl, InputLabel, MenuItem, Select, useTheme} from "@mui/material";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export default function MultipleSelect() {
    const theme = useTheme();
    const [personName, setPersonName] = React.useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <div>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-name-label">Name</InputLabel>
                <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple
                    value={personName}
                    onChange={handleChange}
                    input={<OutlinedInput label="Name" />}
                    MenuProps={MenuProps}
                >
                    {names.map((name) => (
                        <MenuItem
                            key={name}
                            value={name}
                            style={getStyles(name, personName, theme)}
                        >
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}

export default function FormMultiSelect({control, name,  label, choices, hasDefaultNull=false}) {
    let tempChoice
    if(hasDefaultNull) {
        tempChoice = [{key: 0, value: "空"}, ...choices]
    } else {
        tempChoice = choices
    }

    return <Controller render={
        ({field:{onChange, value}}) => {
            return  <FormControl size={'small'} variant="standard" sx={{width: "100%" }}>
                <InputLabel id="demo-simple-select-standard-label">{label}</InputLabel>
                <Select
                    fullWidth
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={value}
                    onChange={onChange}
                    label={label}
                >
                    {tempChoice.map(choice => <MenuItem key={choice.key} value={choice.key}>{choice.value}</MenuItem>)}
                </Select>
            </FormControl>
        }
    } control={control} name={name}/>
}
