import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {connect} from "react-redux";
import {Button, CircularProgress, Grid, Typography} from '@material-ui/core'
import {CART_EDIT_BILLING_DETAIL} from "../../constants/actionType";
import InputBar from '../Widget/inputBar'
import agent from '../../agent'
import classNames from 'classnames'
import CountryCode from '../Widget/Input/Country'

import {withSnackbar} from 'notistack';
import {I18nText} from "../Widget/I18nText";
import {keyOfI18n} from "../../constants/locale/interface";
import {useI18nText} from "../../hooks/useI18nText";

const TAX_RATE = 0.07;
const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    }, img: {
        width: '100px',
        margin: '10px',
    }
    ,
    binIcon: {
        cursor: 'pointer',
        '&:hover': {
            '&:before': {
                color: '#ff8173',
            }
        }
    },
    counter: {
        minWidth: '170px',
    },
    block: {
        //   border: ' 1px solid ' + theme.palette.secondary.light,
    },
    shippingOptions: {
        padding: '5px',

        border: '1px solid ' + theme.palette.secondary.light,
    },
    selectedOption: {
        backgroundColor: theme.palette.secondary.light,
        border: '1px solid ' + theme.palette.primary.dark,
    }
});

const mapStateToProps = state => ({
    shoppingCart: state.cart.shoppingCart,
    billingDetail: state.cart.billingDetail,
});


const mapDispatchToProps = dispatch => ({

        editBillingDetail: (key, value) => dispatch({
            type: CART_EDIT_BILLING_DETAIL,
            payload: {
                key: key,
                value: value,
            }
        }),

    }
);

class ShoppingCartTable extends React.Component {

    getRowPrice = product => product.product.variants.find(variant => variant.id === product.variantId).price * product.number;
    getShippingRate = async () => {
        this.props.editBillingDetail(
            'shippingOptions', await agent.Checkout.getShippingRate({

                    items: this.props.shoppingCart.map(n => ({
                            id: n.variantId, qty: n.number,
                        })
                    )
                }
            )
        )
    };
    getShippingMethod = () => {
        const {classes} = this.props;
        let hasValidShippingMethod = (this.props.billingDetail.shippingOptions && this.props.billingDetail.shippingOptions.length > 0);

        return <Grid item container justify={'space-between'} xs={12}>
            {hasValidShippingMethod ? <Grid item xs={12}>
                <Typography variant={'h6'}>
                    <I18nText keyOfI18n={keyOfI18n.SHIPPING_OPTIONS}/> </Typography>
            </Grid> : null}
            {
                hasValidShippingMethod ? this.props.billingDetail.shippingOptions.map((n, i) => {
                        return (

                            <Grid
                                className={classNames(classes.shippingOptions,
                                    (n.courier.id === this.props.billingDetail.selectedShippingMethod) ? classes.selectedOption : null)}
                                item container xs={4}>
                                <Grid item>

                                    <Typography variant={'body1'}>
                                        <I18nText keyOfI18n={keyOfI18n.NAME}/>: {n.courier.name}
                                    </Typography>
                                    <Typography variant={'body1'}>
                                        <I18nText keyOfI18n={keyOfI18n.CHARGE}/>: {n.charge}
                                    </Typography>
                                    <Typography variant={'body1'}>
                                        <I18nText keyOfI18n={keyOfI18n.DELIVERY_TIME}/> :{n.deliveryTime.min}{`${<I18nText keyOfI18n={keyOfI18n.DAYS}/>} ${<I18nText keyOfI18n={keyOfI18n.TO}/>} ${n.deliveryTime.max} ${<I18nText keyOfI18n={keyOfI18n.DAYS}/>}`
                                    } </Typography>
                                </Grid>


                                <Grid item>

                                    <Button
                                        className={classes.button}
                                        variant={'outlined'} color={'primary'}
                                        onClick={() => this.props.editBillingDetail('selectedShippingMethod', n.courier.id)}
                                    ><I18nText keyOfI18n={keyOfI18n.SELECTED}/></Button>
                                </Grid>
                            </Grid>)
                    }
                ) : ((this.props.billingDetail.address && !(this.props.billingDetail.shippingOptions)) ?
                    <CircularProgress size={40}/>
                    : null)
            }


        </Grid>

    };


    componentDidUpdate(prevProps, prevState, snapShot) {

        if (this.props.billingDetail.shippingOptions === undefined && this.props.billingDetail.address) {
            this.getShippingRate()
        }
    }

    render() {
        const {classes, billingDetail, shoppingCart} = this.props;
        return (
            <Grid container spacing={16} className={classes.root}>

                <Grid item xs={6}>
                    <InputBar
                        title={<I18nText keyOfI18n={keyOfI18n.FIRST_NAME}/>}
                        placeholder={useI18nText(keyOfI18n.FIRST_NAME)}
                        onChange={value => this.props.editBillingDetail('firstName', value)}
                        value={billingDetail.firstName}
                    />
                </Grid>

                <Grid item xs={6}>
                    <InputBar
                        title={<I18nText keyOfI18n={keyOfI18n.LAST_NAME}/>}
                        placeholder={useI18nText(keyOfI18n.LAST_NAME)}
                        onChange={value => this.props.editBillingDetail('lastName', value)}
                        value={billingDetail.lastName}

                    />
                </Grid>
                <Grid item xs={6}>
                    <InputBar
                        needValidation={true}

                        title={<I18nText keyOfI18n={keyOfI18n.EMAIL_ADDRESS}/>}
                        placeholder={useI18nText(keyOfI18n.EMAIL_ADDRESS)}


                        onChange={value => this.props.editBillingDetail('email', value)}
                        value={billingDetail.email}
                    />

                </Grid>

                <Grid item xs={6}>
                    <InputBar
                        title={<I18nText keyOfI18n={keyOfI18n.CITY}/>}
                        placeholder={useI18nText(keyOfI18n.CITY)}
                        onChange={value => this.props.editBillingDetail('city', value)}
                        value={billingDetail.city}
                    />

                </Grid> <Grid item xs={6}>
                <InputBar
                    title={<I18nText keyOfI18n={keyOfI18n.COUNTRY}/>}
                    placeholder={useI18nText(keyOfI18n.COUNTRY)}
                    onChange={value => this.props.editBillingDetail('country', value)}
                    value={billingDetail.country}
                />

            </Grid>
                <Grid item xs={6}>
                    <InputBar
                        validation={
                            {
                                format: '###-###',
                            }
                        }
                        title={<I18nText keyOfI18n={keyOfI18n.POSTCODE}/>}
                        placeholder={useI18nText(keyOfI18n.POSTCODE)}
                        onChange={value => this.props.editBillingDetail('zipCode', value)}
                        value={billingDetail.zipCode}
                    />

                </Grid>
                <Grid item xs={6}>
                    <CountryCode
                        value={billingDetail.countryCode}
                        onChange={value => this.props.editBillingDetail('countryCode', value)}
                    />
                </Grid>
                <Grid item xs={6}>
                    <InputBar
                        placeholder={useI18nText(keyOfI18n.CHECKOUT_BILLING_DETAIL_PHONE_PLACEHOLDER)}
                        validation={
                            {
                                prefix: `${billingDetail.countryCode.value}`,
                            }
                        }
                        onChange={value => this.props.editBillingDetail('phone', value)}
                        value={billingDetail.phone}
                    />
                </Grid>
                <Grid item xs={12}>
                    <InputBar
                        title={<I18nText keyOfI18n={keyOfI18n.CHECKOUT_BILLING_STREET_ADDRESS}/>}
                        placeholder={useI18nText(keyOfI18n.CHECKOUT_BILLING_STREET_ADDRESS)}
                        onChange={value => this.props.editBillingDetail('address', value)}
                        value={billingDetail.address}
                    />
                </Grid>

                <Grid item xs={12}>
                    <InputBar
                        validation={
                            {
                                format: '#### #### #### ####',
                            }
                        }
                        title={<I18nText keyOfI18n={keyOfI18n.CARD_NUMBER}/>}
                        placeholder={useI18nText(keyOfI18n.CHECKOUT_BILLING_DETAIL_VISA_PLACEHOLDER)}
                        type="visa"

                        onChange={value => this.props.editBillingDetail('visaNumber', value)}
                        value={billingDetail.visaNumber}

                    />

                </Grid>

                <Grid item xs={6}>
                    <InputBar
                        title={useI18nText(keyOfI18n.EXPIRED_DATE)}
                        placeholder={'MM/YY'}
                        validation={
                            {
                                format: '##/##',
                                mask: ['M', 'M', 'Y', 'Y'],
                            }
                        }
                        onChange={value => this.props.editBillingDetail('expiryDate', value)}
                        value={billingDetail.expiryDate}
                    />
                </Grid>
                <Grid item xs={6}>
                    <InputBar
                        title={useI18nText(keyOfI18n.CSC)}
                        placeholder={'XXX'}
                        type={"password"}
                        onChange={value => {
                            if (value.length <= 3) this.props.editBillingDetail('csc', value)
                        }}
                        value={billingDetail.csc}
                    />
                </Grid>
                {this.getShippingMethod()}
            </Grid>

        )
    }
}

ShoppingCartTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withSnackbar(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ShoppingCartTable)))
