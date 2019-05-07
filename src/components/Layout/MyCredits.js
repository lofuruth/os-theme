import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import withWidth from "@material-ui/core/withWidth/index";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {Button, Grid, Typography} from '@material-ui/core'
import {CART_OPERATE_SHOPPING_CART, COMMON_EDIT_SEARCH_BAR} from "../../constants/actionType";
import Dialog from '../Widget/Dialog'
import {redirectUrl} from "../../api/ApiUtils";
import swal from '@sweetalert/with-react'
import MyAccount from '../Auth/Accounts/Overview'
import {I18nText} from "../Widget/I18nText";
import {keyOfI18n} from "../../constants/locale/interface";

const styles = theme => ({

    root: {
        paddingRight: '50px',
        position: 'fixed',
        bottom: '40px', height: 0,
        zIndex: 10000,
        '& :hover': {
            color: 'black',

        }
    }, dialog: {
        padding: '40px',
    },
    button: {
        color: 'white',
        transition: '0.2s',
        backgroundColor: 'black',

    },
    textAlign: {
        textAlign: 'center',
        paddingBottom: '20px',
    }

});


const mapStateToProps = state => ({
    shoppingCart: state.cart.shoppingCart,
    keyword: state.common.searchBar,
    user: state.auth.user,
});


const mapDispatchToProps = dispatch => ({
        editShoppingCart: (index) => dispatch({
            type: CART_OPERATE_SHOPPING_CART,
            payload: {
                key: 'remove',
                value: index,
            }
        }),
        editSearchBar: (keyword = null) => dispatch({
            type: COMMON_EDIT_SEARCH_BAR,
            payload: keyword
        }),
    }

);

const MyCredits = props => {

    let dialogRef = useRef();
    const {classes, width, history} = props;

    let logout = () => {
        const {history} = props;

        swal(
            {

                content: (<Grid container alignItems={'center'} direction={'column'}>
                    <Grid item>
                        {false && <span className={'icon-like'}

                                        style={{
                                            fontSize: '80px',
                                            color: 'hsla(100,55%,69%,.5)',
                                            padding: '20px',

                                            display: 'block',
                                            width: '80px',
                                            height: '80px',
                                            border: '4px solid hsla(98,55%,69%,.2)',
                                            borderRadius: '50%',
                                            boxSizing: 'content-box',
                                        }}
                        />}
                    </Grid>
                    <Grid item>
                        <Typography variant={'h4'}>
                            <I18nText keyOfI18n={keyOfI18n.AUTH_ACCOUNTS_SUCCESSFULLY_LOGOUT}/>
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant={'subtitle1'}>
                            <I18nText keyOfI18n={keyOfI18n.AUTH_ACCOUNTS_SEE_YOU}/> </Typography>
                    </Grid>

                </Grid>)
            });
        setTimeout(
            () => redirectUrl('/', history)
            , 1000
        )
    };


    return (
        <Grid container justify={'flex-end'} className={classes.root}>
            <Dialog
                opacity={true}
                ref={dialogRef}
                title={
                    <Button className={classes.button}><I18nText keyOfI18n={keyOfI18n.MY_ACCOUNT}/></Button>
                }
                dialog={<MyAccount
                    dialog={dialogRef.current}
                />}
            />

        </Grid>
    )
};

MyCredits.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withWidth()(withStyles(styles)(MyCredits))))