import React, {useState} from 'react';
import {Input} from '@material-ui/core';

import {withStyles} from '@material-ui/core/styles';
import {makeStyles} from "@material-ui/styles";

const useStyles =makeStyles( theme => ({
    root: {
        padding: '8px',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid ' + theme.palette.primary.dark,
    },
    input: {},

    icon: {
        padding: '10px',
        margin: 'auto',
        '&:before': {}
    }
}))

const SearchBar =props=> {
    const classes = useStyles()
        const { placeholder, value, onChange, onKeyPress} = props;

        return <Input
            fullWidth={true}
            classes={{
                root: classes.root,
                input: classes.input,
            }}

            variant={'filled'}
            placeholder={placeholder}
            defaultValue={value ? value : ''}
            disableUnderline={true}
            onChange={e => onChange(e.target.value)}
            onKeyPress={e => onKeyPress ? onKeyPress(e.key) : null}
        />
    }
export default  (SearchBar)