import React from 'react';
import {Fab, Grid} from '@material-ui/core'
import {Theme} from '@material-ui/core/styles';
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        margin: 0,
        padding: '6px 0px',
        display: 'inline-block',

    }, color: {
        margin: '5px',
        cursor: 'pointer',
        minHeight: '40px',
        width: '40px',
        borderRadius: '30px',
    }
}));

interface Props {
    onClick: <T extends {}>(x: T) => void,
    selectedColor?: string,
    colors: Array<string>,
}

const ColorPicker: React.FunctionComponent<Props> = props => {
    const classes = useStyles();
    const {colors, selectedColor, onClick} = props;
    return (
        <Grid container>
            {
                colors.map(
                    (n, i) =>
                        <Fab variant={"extended"}
                             children={
                                 selectedColor === n ? <span
                                     className={'icon-checkmark'}/> : <span/>
                             }

                             onClick={() => onClick(n)}
                             key={i} className={classes.color} style={
                            selectedColor === n ? {
                                color: n === 'white' ? 'black' : n,
                                border: '5px solid ' + n,
                                backgroundColor: 'white',
                            } : {
                                backgroundColor: n,
                                color: n,
                                border: '5px solid ' + n,
                            }
                        }
                        />
                )
            }
        </Grid>
    )
};

export default (ColorPicker);