import React from 'react';
import {Grid, Typography} from '@material-ui/core';
import List from '../Widget/List'
import Header from '../Layout/Body/Header'
import classNames from 'classnames';
import {connect} from 'react-redux'
import {EDIT_PRODUCT_VIEW_MODE, PRODUCT_EDIT_FILTER, PRODUCT_EDIT_SORT} from "../../constants/actionType";
import {withStyles} from '@material-ui/core/styles';
import WhiteDropDown from '../Widget/WhiteDropDown'
import ProductOverviewListForm from '../Widget/Product/overviewList'
import {arrayToFilter, getTagsCountsArray, numberToPagination, refactorTextLength, sort_by} from "../../api/ApiUtils";
import ProductOverviewBox from '../Widget/Product/overviewBox'

const styles = theme => ({
    productCategory: {
        backgroundColor: '#F7F7F7',

    },
    toolBar: {
        padding: '10px',
        backgroundColor: theme.palette.background.paper,
    },
    icon: {
        padding: '10px',
        cursor: 'pointer',
        alignItems: 'center',
        border: '1px solid black',

    }, listMode: {
        padding: '20px',
    }
})

const mapStateToProps = state => ({
    products: state.product.products,
    viewMode: state.product.viewMode,
    sort: state.product.sort,
    filter: state.product.filter,
});


const mapDispatchToProps = dispatch => ({

        changeViewMode: (mode) =>
            dispatch({
                    type: EDIT_PRODUCT_VIEW_MODE,
                    payload: mode,
                }
            )
        ,
        editProductSort: (key, value) => dispatch({
            type: PRODUCT_EDIT_SORT,
            payload: {
                key: key,
                value: value,
            },
        }),
        editProductFilter: (key, value) => dispatch({
            type: PRODUCT_EDIT_FILTER,
            payload: {
                key: key,
                value: value,
            },
        }),
    }
)

class ShopOverview extends React.Component {



    render() {

        const {classes} = this.props

        return (
            <Grid container justify={'center'}>
                <Grid item sm={12}>
                    <Header
                        title={'Checkout'}

                    />
                </Grid>
            </Grid>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ShopOverview))