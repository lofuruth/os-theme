import React from 'react';
import {Typography} from '@material-ui/core';
import Slick from './Widget/Slick'
import {I18nText} from "../../Widget/I18nText";
import {keyOfI18n} from "../../../constants/locale/interface";

const TopInterest = props => {

    const {hasProductsToShow, products, width, classes} = props.self;


    return (products) ?
        <section className={classes.section}>
            <div>
                <Typography variant={'h4'} className={classes.title}>
                 <I18nText keyOfI18n={keyOfI18n.TOP_INTERESTING}/>
                </Typography>
            </div>
            <div>
                <Slick
                    self={props.self}

                />
            </div>
        </section> : null

};


export default TopInterest
