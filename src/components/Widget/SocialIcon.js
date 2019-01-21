import React from 'react';
import classNames from 'classnames';

import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        padding: '12px',
        border: '1px solid ' + theme.palette.secondary.main,
        margin: '3px',
        borderRadius: '5px',
        cursor: 'pointer',
        display: 'inline-block',
        fontSize: '24px',
    },
    reddit: {

        '&:before': {
            color: '#ff8c39',
        },
        '&:hover': {
            backgroundColor:
                '#ff8c39',

            '&:before': {

                color: 'white',
            }

        }
    },
    youtube: {

        '&:before': {
            color: '#ff342f',
        },
        '&:hover': {
            backgroundColor:
                '#ff342f',
            '&:before': {

                color: 'white',

            }
        }

    },
    twitter: {
        '&:before': {
            color: '#3c16ff',
        },
        '&:hover': {
            backgroundColor: '#3c16ff'
            ,
            '&:before': {
                color: 'white',
            }
        }
    }
    , facebook: {
        '&:before': {
            color: '#5567ff',

        },
        '&:hover': {
            backgroundColor: '#5567ff',
            '&:before': {

                color: 'white',
            }
        }


    },
    whatsapp: {
        '&:before': {
            color: '#74ff57',

        },
        '&:hover': {
            backgroundColor: '#74ff57',
            '&:before': {

                color: 'white',
            }
        }


    }
})

const SocialIcon = (props) => {
    const {classes, type, onClick} = props

    let getIconType = type => {
        switch (type) {
            case 'reddit':
                return 'icon-reddit'
            case 'youtube':
                return 'icon-youtube'
            case 'twitter':
                return 'icon-twitter'
            case 'facebook':
                return 'icon-facebook2'
            case 'whatsapp':
                return 'icon-whatsapp'

            default:
                return null
        }
    }


    return <div onClick={onClick} className={classNames(classes[type], classes.root, getIconType(type),)}/>

}

SocialIcon.propTypes = {
    type: PropTypes.oneOf(['reddit', 'youtube', 'twitter', 'facebook', 'whatsapp']),
    onClick: PropTypes.func,
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SocialIcon);