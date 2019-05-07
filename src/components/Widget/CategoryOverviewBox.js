import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {ButtonBase, Grid} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import {withRouter} from "react-router-dom";
import {redirectUrl} from "../../api/ApiUtils";

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%',
    },
    items: {

        textDecoration: 'none',
        color: theme.palette.primary.light,

    },
    image: {
        position: 'relative',
        height: 200,
        opacity: 0.85,

        [theme.breakpoints.down('xs')]: {
            width: '100% !important', // Overrides inline-style
            height: 100,
        },
        '&:hover, &$focusVisible': {
            zIndex: 1,
            '& $imageBackdrop': {
                opacity: 0.15,
            },
            '& $imageMarked': {
                opacity: 0,
            },
            '& $imageTitle': {
                border: '4px solid currentColor',
            },
        },
    },
    focusVisible: {},
    imageButton: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.common.white,
    },
    imageSrc: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
    },
    imageBackdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.4,
        transition: theme.transitions.create('opacity'),
    },
    imageTitle: {
        fontWeight: 700,
        textTransform: 'uppercase',
        fontSize: '20PX',
        position: 'relative',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme.spacing.unit + 6}px`,
    },
    imageMarked: {
        height: 3,
        width: 18,
        backgroundColor: theme.palette.common.white,
        position: 'absolute',
        bottom: -2,
        left: 'calc(50% - 9px)',
        transition: theme.transitions.create('opacity'),
    },
});

const ButtonBases = (props) => {
    const {classes, history, category} = props;

    return (

        <Grid container alignItems={'center'} spacing={16} justify={'center'} className={classes.root}>
            {category.map((image, i) => (
                <Grid
                    key={i}
                    item sm={10} md={6} lg={4}
                    container
                    onClick={() => redirectUrl(`/products?tags=${image.name}`, history)}
                    className={classes.items}

                >
                    <ButtonBase
                        focusRipple
                        key={image.title}
                        className={classes.image}
                        focusVisibleClassName={classes.focusVisible}
                        style={{
                            width: '100%',
                            minHeight: '500px',
                            margin: '5px',
                        }}
                    >
                        <Grid

                            className={classes.imageSrc}
                            style={{
                                backgroundImage: `url(${image.img})`,
                            }}
                        />
                        <span className={classes.imageBackdrop}/>
                        <span className={classes.imageButton}>
            <Typography
                component="span"
                variant="subtitle1"
                color="inherit"
                className={classes.imageTitle}
            >
              {image.name}
                <span className={classes.imageMarked}/>
            </Typography>
          </span>
                    </ButtonBase>
                </Grid>
            ))}
        </Grid>
    );
};

ButtonBases.propTypes = {

    classes: PropTypes.object.isRequired,


};

export default withRouter(withStyles(styles)(ButtonBases))