import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Grid, Typography} from '@material-ui/core';
import BigFeedBox from './BigFeedBox'
import SmallFeedBox from './SmallFeedBox'

const styles = theme => ({
    root: {

        padding: '0 10px',
    },
    smallDiv: {
        height: '200px',

        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    },
    bigDiv: {
        height: '400px',

        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',


    }
});


class FeedsWall extends React.Component {


    render() {
        const {classes, data,} = this.props;

        return (

            <Grid container alignItems={'stretch'} className={classes.root}>
                <Grid item lg={6}>
                    <BigFeedBox
                        backgroundImg={data[2].src}
                        title={'hot trends'}

                    />
                    <SmallFeedBox
                        left={<img
                            style={{width: '100%', height: '180px'}}
                            src={data[0].src}
                        />}
                        right={<Fragment>
                            <Typography
                            variant={'subheading'}
                        >
                            NEW FROM VANS
                        </Typography>
                            <Typography
                                variant={'body2'}
                            >                                The Sk8-Hi MTE revamps

                                the legendary Vans high to
                            </Typography>
                        </Fragment>}

                    />
                </Grid>
                <Grid item lg={6}>
                    <SmallFeedBox
                        right={<img
                            style={{width: '100%', height: '180px'}}
                            src={data[1].src}
                        />}
                        left={<Fragment>
                            <Typography
                                variant={'subheading'}
                            >
                                NEW FROM VANS
                            </Typography>
                            <Typography
                                variant={'body2'}
                            >                                The Sk8-Hi MTE revamps

                                the legendary Vans high to
                            </Typography>
                        </Fragment>}

                    />
                    <BigFeedBox
                        title={
                            "men's fleece"
                        }
                        backgroundImg={data[3].src}

                    />
                </Grid>
            </Grid>
        )
    }
}

FeedsWall.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FeedsWall)