import React, {useState} from 'react'
import {Box, Typography, TextField, FormControl, Grid2} from '@mui/material';

import {useForm} from '../../hooks/useForm';


export const Form = ( {inputs} ) => {
    const [ values, setValues ] = useState( {} );
    const {onInputChange} = useForm();

    const FormInput = ( input ) => {
        const handleChange = ( event ) => {
            setValues( {...values, [ input.name ]: event.target.value} );
            onInputChange( event );
        };

        return (
            <Box className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-0">
                <Typography className="w-20">{input.title}</Typography>
                <TextField
                    type={input.type}
                    label={input.label}
                    name={input.name}
                    value={values[ input.name ] || ''}
                    onChange={handleChange}
                    className="grow sm:w-1/2"
                    required={input.required}
                />
            </Box>
        );
    };

    return (
        <FormControl>
            <Grid2 container>
                {inputs.map( ( input, index ) => (
                    <Grid2 key={index} size={{xs: 12}}>
                        <FormInput input={input} />
                    </Grid2>
                ) )}
            </Grid2>
        </FormControl>
    );
};